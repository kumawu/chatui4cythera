import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // 获取查询参数
    const { searchParams } = new URL(request.url);
    const deviceName = searchParams.get('deviceName');
    
    if (!deviceName) {
      return NextResponse.json(
        { error: '设备名称不能为空' },
        { status: 400 }
      );
    }
    
    console.log("设备指令 API 请求:", { deviceName });
    
    // 调用外部 API
    const apiUrl = `http://10.222.96.88:4000/core-command/api/v3/device/name/${encodeURIComponent(deviceName)}`;
    const response = await fetch(apiUrl);
    
    if (!response.ok) {
      throw new Error(`外部 API 请求失败: ${response.status}`);
    }
    
    const data = await response.json();
    console.log("设备指令 API 响应:", data);
    
    return NextResponse.json(data);
  } catch (error) {
    console.error("设备指令 API 错误:", error);
    return NextResponse.json(
      { error: `获取设备指令失败: ${error}` },
      { status: 500 }
    );
  }
}
