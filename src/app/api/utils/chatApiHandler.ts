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

    // 异步处理流
    (async () => {
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            await writer.close();
            break;
          }

          // 解码二进制数据
          const chunk = new TextDecoder().decode(value);
          const lines = chunk.split("\n");

          for (const line of lines) {
            if (line.startsWith("data: ") && line.length > 6) {
              const data = line.slice(6);
              
              if (data === "[DONE]") {
                continue;
              }

              try {
                const parsedData = JSON.parse(data);
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
                console.error('解析流数据错误:', e, data);
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
