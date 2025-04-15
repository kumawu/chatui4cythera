import { Card } from "@tremor/react";
import { useState } from "react";

// 设备数据类型定义
export interface Device {
  id: string;
  name: string;
  description: string;
  adminState: string;
  operatingState: string;
  labels: string[];
  serviceName: string;
  profileName: string;
  autoEvents?: {
    interval: string;
    onChange: boolean;
    sourceName: string;
  }[];
  protocols: {
    [key: string]: {
      [key: string]: string;
    };
  };
  properties: Record<string, any>;
  created?: number;
  modified?: number;
}

export interface DeviceData {
  apiVersion: string;
  statusCode: number;
  totalCount: number;
  devices: Device[];
}

interface DeviceGridProps {
  deviceData: DeviceData;
}

// 设备状态标签组件
const StatusBadge = ({ status }: { status: string }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "UP":
        return "bg-green-500";
      case "DOWN":
        return "bg-red-500";
      case "UNLOCKED":
        return "bg-blue-500";
      case "LOCKED":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs text-white ${getStatusColor(status)}`}>
      {status}
    </span>
  );
};

// 设备类型图标组件
const DeviceTypeIcon = ({ type }: { type: string }) => {
  const getIconByType = (type: string) => {
    switch (type.toLowerCase()) {
      case "modbus tcp":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
          </svg>
        );
      case "opc ua":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
          </svg>
        );
      case "onvif":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        );
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        );
    }
  };

  return getIconByType(type);
};

// 设备详情弹窗组件
const DeviceDetailModal = ({ device, onClose }: { device: Device | null; onClose: () => void }) => {
  if (!device) return null;

  const getProtocolDetails = () => {
    const protocolEntries = Object.entries(device.protocols);
    if (protocolEntries.length === 0) return "无协议信息";

    const [protocolName, protocolDetails] = protocolEntries[0];
    return (
      <div>
        <h3 className="text-lg font-semibold text-white mb-2">{protocolName}</h3>
        <div className="grid grid-cols-2 gap-2">
          {Object.entries(protocolDetails).map(([key, value]) => (
            <div key={key} className="flex flex-col">
              <span className="text-xs text-gray-400">{key}</span>
              <span className="text-sm text-white">{value}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gradient-to-br from-indigo-950 to-purple-950 rounded-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">{device.name}</h2>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">基本信息</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-gray-400">ID</span>
                <p className="text-white text-sm">{device.id}</p>
              </div>
              <div>
                <span className="text-gray-400">描述</span>
                <p className="text-white text-sm">{device.description}</p>
              </div>
              <div>
                <span className="text-gray-400">管理状态</span>
                <p className="text-white text-sm">
                  <StatusBadge status={device.adminState} />
                </p>
              </div>
              <div>
                <span className="text-gray-400">运行状态</span>
                <p className="text-white text-sm">
                  <StatusBadge status={device.operatingState} />
                </p>
              </div>
              <div>
                <span className="text-gray-400">服务名称</span>
                <p className="text-white text-sm">{device.serviceName}</p>
              </div>
              <div>
                <span className="text-gray-400">配置文件</span>
                <p className="text-white text-sm">{device.profileName}</p>
              </div>
              <div>
                <span className="text-gray-400">标签</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {device.labels.map((label, index) => (
                    <span key={index} className="px-2 py-0.5 bg-indigo-900/50 rounded-full text-xs text-white">
                      {label}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <span className="text-gray-400">创建时间</span>
                <p className="text-white text-sm">
                  {device.created ? new Date(device.created).toLocaleString() : "未知"}
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-2">协议信息</h3>
            {getProtocolDetails()}
          </div>

          {device.autoEvents && device.autoEvents.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">自动事件</h3>
              <div className="space-y-2">
                {device.autoEvents.map((event, index) => (
                  <div key={index} className="bg-white/5 p-3 rounded-lg">
                    <div className="flex justify-between">
                      <span className="text-white">{event.sourceName}</span>
                      <span className="text-blue-400">{event.interval}</span>
                    </div>
                    <div className="text-xs text-gray-400 mt-1">
                      {event.onChange ? "仅在变化时触发" : "定时触发"}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// 设备网格组件
export const DeviceGrid = ({ deviceData }: DeviceGridProps) => {
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);

  if (!deviceData || !deviceData.devices || deviceData.devices.length === 0) {
    return (
      <Card className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-lg p-6">
        <div className="text-center py-8">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-xl font-semibold text-white mb-2">暂无设备数据</h3>
          <p className="text-gray-400">请检查设备连接或刷新页面</p>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-white">设备列表</h2>
        <div className="text-sm text-gray-400">
          共 {deviceData.totalCount} 个设备
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {deviceData.devices.map((device) => (
          <Card 
            key={device.id} 
            className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:bg-white/10 cursor-pointer"
            onClick={() => setSelectedDevice(device)}
          >
            <div className="p-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-white/10 rounded-lg">
                  {device.labels && device.labels.length > 0 ? (
                    <DeviceTypeIcon type={device.labels[0]} />
                  ) : (
                    <DeviceTypeIcon type="" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-white truncate">{device.name}</h3>
                  <p className="text-sm text-gray-400 truncate">{device.description}</p>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <StatusBadge status={device.adminState} />
                <StatusBadge status={device.operatingState} />
              </div>

              <div className="mt-4 text-xs text-gray-400 flex justify-between">
                <span>ID: {device.id.substring(0, 8)}...</span>
                <span>服务: {device.serviceName.replace('device-', '')}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {selectedDevice && (
        <DeviceDetailModal 
          device={selectedDevice} 
          onClose={() => setSelectedDevice(null)} 
        />
      )}
    </div>
  );
};
