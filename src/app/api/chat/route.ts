import { NextResponse } from 'next/server';
import { handleChatRequest } from '../utils/chatApiHandler';

// 根据助手索引获取对应的API密钥
function getApiKeyByIndex(index: number): string {
  switch (index) {
    case 0: // 数字能效分析师
      return process.env.DIFY_API_KEY_1 || '';
    case 1: // 数字环境专员
      return process.env.DIFY_API_KEY_2 || '';
    case 2: // 数字设备健康主管
      return process.env.DIFY_API_KEY_3 || '';
    case 3: // 数字综合运营协调员
      return process.env.DIFY_API_KEY_4 || '';
    default: // 默认使用第4个API密钥
      return process.env.DIFY_API_KEY_4 || '';
  }
}

export async function POST(request: Request) {
  try {
    const requestData = await request.json();
    const { assistantIndex = -1 } = requestData;
    
    console.log("统一聊天API请求:", requestData);
    
    // 根据助手索引获取对应的API密钥
    const apiKey = getApiKeyByIndex(typeof assistantIndex === 'number' ? assistantIndex : -1);
    
    // 使用通用处理函数处理请求，传递已解析的请求数据
    return handleChatRequest(requestData, apiKey);
  } catch (error) {
    console.error("处理聊天请求时出错:", error);
    return NextResponse.json(
      { error: "处理请求时发生错误" },
      { status: 500 }
    );
  }
}
