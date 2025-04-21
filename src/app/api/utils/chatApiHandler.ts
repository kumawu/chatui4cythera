import { NextResponse } from 'next/server';

/**
 * 通用聊天API处理函数
 * @param requestData 已解析的请求数据
 * @param apiKey Dify API密钥
 * @returns 流式响应
 */
export async function handleChatRequest(requestData: any, apiKey: string) {
  try {
    // 从请求数据中提取需要的字段
    const { message, role, conversationId, language, assistantIndex } = requestData;
    
    console.log("Chat API 请求:", { message, role, conversationId, language, assistantIndex });
    
    // 构建发送到 Dify 的请求体
    const difyRequestBody = {
      inputs: {
        language: language || 'zh-CN' // 使用请求中的语言或默认值
      },
      query: message,
      response_mode: "streaming", // 流式响应
      conversation_id: conversationId, // 如果有会话ID则传递
      user: role || "default_user" // 用户标识，这里使用角色名称
    };

    // 发送请求到 Dify API
    const difyResponse = await fetch(process.env.DIFY_API_URL || "https://api.dify.ai/v1/chat-messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify(difyRequestBody)
    });

    if (!difyResponse.ok) {
      const errorText = await difyResponse.text();
      console.error(`Dify API 错误 (${difyResponse.status}):`, errorText);
      return NextResponse.json(
        { error: `Dify API 请求失败: ${difyResponse.status} ${difyResponse.statusText}` },
        { status: difyResponse.status }
      );
    }

    // 创建一个 TransformStream 来处理流式响应
    const { readable, writable } = new TransformStream();
    const writer = writable.getWriter();
    const encoder = new TextEncoder();

    // 处理 Dify 的流式响应
    const reader = difyResponse.body?.getReader();
    if (!reader) {
      throw new Error("无法读取响应流");
    }
    
    // 用于累积不完整的 JSON 数据
    let accumulatedJson = '';
    // 用于累积不完整的行数据
    let partialLine = '';

    // 异步处理流
    (async () => {
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            // 处理可能剩余的不完整数据
            if (partialLine && partialLine.startsWith("data: ") && partialLine.length > 6) {
              const data = partialLine.slice(6);
              console.log('处理剩余的不完整行:', data);
              // 尝试处理最后一个不完整的数据
              try {
                const jsonToProcess = accumulatedJson + data;
                const parsedData = JSON.parse(jsonToProcess);
                const responseChunk = {
                  type: 'text',
                  content: parsedData.answer || '',
                  delta: parsedData.delta || '',
                  position: 'left',
                  metadata: {
                    conversation_id: conversationId,
                    event_type: 'message_end', // 标记为结束消息
                    created_at: new Date().toISOString()
                  }
                };
                await writer.write(encoder.encode(`data: ${JSON.stringify(responseChunk)}\n\n`));
              } catch (e) {
                console.error('处理最后一个数据块时出错:', e);
              }
            }
            await writer.close();
            break;
          }

          // 解码二进制数据
          const chunk = new TextDecoder().decode(value);
          
          // 处理可能跨块的行
          const fullData = partialLine + chunk;
          partialLine = ''; // 重置部分行
          
          // 按行分割，但保留可能不完整的最后一行
          const lines = fullData.split("\n");
          if (!fullData.endsWith("\n") && lines.length > 0) {
            partialLine = lines.pop() || '';
          }

          for (const line of lines) {
            if (line.startsWith("data: ") && line.length > 6) {
              const data = line.slice(6);
              
              if (data === "[DONE]") {
                continue;
              }

              // 尝试累积并解析 JSON 数据
              try {
                // 检查数据是否是有效的 JSON 格式
                if (!data || data.trim() === '') {
                  console.warn('收到空数据块，跳过处理');
                  continue;
                }
                
                // 合并之前累积的数据（如果有）
                const jsonToProcess = accumulatedJson + data;
                let parsedData;
                
                try {
                  // 尝试解析合并后的数据
                  parsedData = JSON.parse(jsonToProcess);
                  
                  // 解析成功，重置累积的数据
                  accumulatedJson = '';
                  console.log('JSON 解析成功');
                } catch (parseError) {
                  // 解析失败，检查是否是因为 JSON 不完整
                  if (parseError instanceof SyntaxError && parseError.message.includes('Unexpected end of JSON input')) {
                    // 可能是不完整的 JSON，累积数据等待下一个数据块
                    accumulatedJson = jsonToProcess;
                    console.log('累积不完整的 JSON 数据，等待下一个数据块');
                    continue; // 跳过当前数据块，等待更多数据
                  } else {
                    // 其他类型的错误
                    console.error('JSON 格式错误且无法修复');
                    accumulatedJson = ''; // 重置累积数据
                    continue;
                  }
                }
                
                // 验证解析后的数据是否有效
                if (!parsedData || typeof parsedData !== 'object') {
                  console.warn('解析后的数据无效:', parsedData);
                  continue;
                }
                
                const responseChunk = {
                  type: 'text',
                  content: parsedData.answer || '',
                  delta: parsedData.delta || '',
                  position: 'left',
                  metadata: {
                    conversation_id: conversationId,
                    event_type: parsedData.event || 'message',
                    created_at: new Date().toISOString()
                  }
                };
                
                await writer.write(encoder.encode(`data: ${JSON.stringify(responseChunk)}\n\n`));
              } catch (e) {
                console.error('处理数据时出现意外错误:', e);
                console.log('原始数据:', data);
                
                // 重置累积数据，避免错误累积
                accumulatedJson = '';
                
                // 如果数据包含 tools_data_result 标签，尝试发送一个特殊的消息通知客户端处理
                if (data.includes('<tools_data_result>')) {
                  try {
                    const specialMessage = {
                      type: 'text',
                      content: data, // 直接传递原始数据，客户端可以处理
                      position: 'left',
                      metadata: {
                        conversation_id: conversationId,
                        event_type: 'message_end', // 标记为结束消息，触发客户端处理
                        created_at: new Date().toISOString()
                      }
                    };
                    
                    await writer.write(encoder.encode(`data: ${JSON.stringify(specialMessage)}\n\n`));
                    console.log('发送了特殊消息处理 tools_data_result');
                  } catch (specialError) {
                    console.error('发送特殊消息失败:', specialError);
                  }
                }
                
                // 继续处理下一个数据块，不中断流程
              }
            }
          }
        }
      } catch (error) {
        console.error('读取流错误:', error);
        await writer.abort(error as Error);
      }
    })();

    // 返回流式响应
    return new Response(readable, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive"
      }
    });
  } catch (error) {
    console.error("处理聊天请求时出错:", error);
    return NextResponse.json(
      { error: "处理请求时发生错误" },
      { status: 500 }
    );
  }
}
