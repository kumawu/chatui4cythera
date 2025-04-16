import { NextResponse } from 'next/server';

// 设备 API 配置
const DEVICE_API_URL = 'http://10.222.96.88:4000/core-metadata/api/v3/device/all';

export async function GET(request: Request) {
  try {
    // 获取查询参数
    const { searchParams } = new URL(request.url);
    const offset = searchParams.get('offset') || '0';
    const limit = searchParams.get('limit') || '10';
    
    console.log("设备 API 请求:", { offset, limit });
    
    // 构建 URL
    const apiUrl = `${DEVICE_API_URL}?offset=${offset}&limit=${limit}`;
    
    // 发送请求到设备 API
    const deviceResponse = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
    
    if (!deviceResponse.ok) {
      const errorData = await deviceResponse.json();
      console.error("设备 API 错误:", errorData);
      throw new Error(`设备 API 请求失败: ${deviceResponse.status} ${deviceResponse.statusText}`);
    }
    
    // 处理设备 API 响应
    const data = await deviceResponse.json();
    console.log("设备 API 响应:", data);
    
    // 返回设备数据
    return NextResponse.json(data);
  } catch (error) {
    console.error('设备 API 错误:', error);
    return NextResponse.json(
      { 
        error: '处理请求时出错',
        message: error instanceof Error ? error.message : '未知错误'
      },
      { status: 500 }
    );
  }
}
