import { NextResponse } from 'next/server';

// Dify API 配置
const DIFY_API_URL = 'http://haf.api.weibo.com/v1/chat-messages';
const DIFY_API_KEY = process.env.DIFY_API_KEY || 'app-pui2BWBJ0BbbA4ikHUoSfkZX'; // 建议使用环境变量

export async function POST(request: Request) {
  try {
    const { message, role, conversationId } = await request.json();
    
    console.log("Chat API 请求:", { message, role, conversationId });
    
    // 构建发送到 Dify 的请求体
    const difyRequestBody = {
      inputs: {}, // 可选的输入参数
      query: message,
      response_mode: "streaming", // 流式响应
      conversation_id: conversationId, // 如果有会话ID则传递
      user: role || "default_user" // 用户标识，这里使用角色名称
    };
    
    // 发送请求到 Dify API
    const difyResponse = await fetch(DIFY_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DIFY_API_KEY}`,
        'Accept': 'text/event-stream'
      },
      body: JSON.stringify(difyRequestBody)
    });
    
    if (!difyResponse.ok) {
      const errorData = await difyResponse.json();
      console.error("Dify API 错误:", errorData);
      throw new Error(`Dify API 请求失败: ${difyResponse.status} ${difyResponse.statusText}`);
    }
    
    // 当使用流式响应时，直接返回流
    const responseStream = difyResponse.body;
    if (!responseStream) {
      throw new Error('无法获取响应流');
    }
    
    // 创建一个新的 ReadableStream
    const stream = new ReadableStream({
      async start(controller) {
        // 创建一个读取器来处理流数据
        const reader = responseStream.getReader();
        let conversationId: string | null = null;
        
        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            
            // 将 Uint8Array 转换为文本
            const chunk = new TextDecoder().decode(value);
            const lines = chunk.split('\n').filter(line => line.trim() !== '');
            
            for (const line of lines) {
              if (line.startsWith('data: ')) {
                const data = line.slice(6);
                if (data === '[DONE]') continue;
                
                try {
                  const parsedData = JSON.parse(data);
                  
                  // 保存会话 ID
                  if (parsedData.conversation_id && !conversationId) {
                    conversationId = parsedData.conversation_id;
                  }
                  
                  // 将数据发送到客户端
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
                  
                  controller.enqueue(new TextEncoder().encode(`data: ${JSON.stringify(responseChunk)}\n\n`));
                } catch (e) {
                  console.error('解析流数据错误:', e, data);
                }
              }
            }
          }
        } catch (error) {
          console.error('读取流错误:', error);
          controller.error(error);
        } finally {
          controller.close();
        }
      }
    });
    
    // 返回流式响应
    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
      }
    });
    
  } catch (error) {
    console.error('Chat API 错误:', error);
    return NextResponse.json(
      { 
        error: '处理请求时出错',
        message: error instanceof Error ? error.message : '未知错误'
      },
      { status: 500 }
    );
  }
}
