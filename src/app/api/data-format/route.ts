import { NextResponse } from 'next/server';

// Dify API 配置
const DIFY_API_URL = 'http://haf.api.weibo.com/v1/workflows/run';
const DIFY_API_KEY = 'app-ZzIiSaGBR6u4zqHsRHXgXXCv';

export async function POST(request: Request) {
  try {
    const { message, role } = await request.json();
    
    console.log("Dify Query API 请求:", { message, role });
    
    // 构建发送到 Dify 的请求体
    const difyRequestBody = {
      inputs: {
        content: message
      }, // 可选的输入参数
      response_mode: "blocking", // 阻塞模式
      user: role || "default_user" // 用户标识，这里使用角色名称
    };
    
    // 发送请求到 Dify API
    const difyResponse = await fetch(DIFY_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DIFY_API_KEY}`
      },
      body: JSON.stringify(difyRequestBody)
    });
    
    if (!difyResponse.ok) {
      const errorData = await difyResponse.json();
      console.error("Dify API 错误:", errorData);
      throw new Error(`Dify API 请求失败: ${difyResponse.status} ${difyResponse.statusText}`);
    }
    
    // 处理 Dify 响应
    const data = await difyResponse.json();
    console.log("Dify API 响应:", data.data.outputs);
    
    // 构建返回给前端的响应
    const response = data.data.outputs.data;
    
    return NextResponse.json(response);
  } catch (error) {
    console.error('Dify Query API 错误:', error);
    return NextResponse.json(
      { 
        error: '处理请求时出错',
        message: error instanceof Error ? error.message : '未知错误'
      },
      { status: 500 }
    );
  }
}
