import { Card } from "@tremor/react";
import { useState } from "react";
import { useTranslation } from 'react-i18next';
import '../../../i18n';
import { DeviceDetailModal } from './DeviceDetailModal';
import { StatusBadge } from './StatusBadge';
import { DeviceTypeIcon } from './DeviceTypeIcon';

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







// 设备网格组件
export const DeviceGrid = ({ deviceData }: DeviceGridProps) => {
  const { t } = useTranslation('translation');
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);

  if (!deviceData || !deviceData.devices || deviceData.devices.length === 0) {
    return (
      <Card className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-lg p-6">
        <div className="text-center py-8">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-xl font-semibold text-white mb-2">{t('device.noData')}</h3>
          <p className="text-gray-400">{t('device.checkConnection')}</p>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-white">{t('device.list')}</h2>
        <div className="text-sm text-gray-400">
          {t('device.total', { count: deviceData.totalCount })}
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
                <span>{t('device.service')}: {device.serviceName.replace('device-', '')}</span>
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
