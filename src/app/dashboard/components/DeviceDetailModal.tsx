'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import '../../../i18n';
import { Device } from './DeviceGrid';
import { DeviceCommandsModal } from './DeviceCommandsModal';

// 设备状态标签组件
interface StatusBadgeProps {
  status: string;
}

const StatusBadge = ({ status }: StatusBadgeProps) => {
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

interface DeviceDetailModalProps {
  device: Device | null;
  onClose: () => void;
}

// 设备详情弹窗组件
export const DeviceDetailModal = ({ device, onClose }: DeviceDetailModalProps) => {
  const { t } = useTranslation('translation');
  const [showCommandsModal, setShowCommandsModal] = useState(false);
  
  if (!device) return null;

  const getProtocolDetails = () => {
    const protocolEntries = Object.entries(device.protocols);
    if (protocolEntries.length === 0) return t('device.noProtocol');

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
      {showCommandsModal && (
        <DeviceCommandsModal 
          deviceName={device.name}
          onClose={() => setShowCommandsModal(false)}
        />
      )}
      <div className="bg-gradient-to-br from-indigo-900/90 to-purple-900/90 rounded-2xl p-6 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-2xl font-bold text-white">{t('device.details')}: {device.name}</h2>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">{t('device.basicInfo')}</h3>
            <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-xs text-gray-400">{t('device.name')}</span>
                  <p className="text-white">{device.name}</p>
                </div>
                <div>
                  <span className="text-xs text-gray-400">{t('device.status')}</span>
                  <div className="flex gap-2 mt-1">
                    <StatusBadge status={device.adminState} />
                    <StatusBadge status={device.operatingState} />
                  </div>
                </div>
                <div>
                  <span className="text-xs text-gray-400">{t('device.description')}</span>
                  <p className="text-white">{device.description}</p>
                </div>
                <div>
                  <span className="text-xs text-gray-400">{t('device.service')}</span>
                  <p className="text-white">{device.serviceName}</p>
                </div>
                <div>
                  <span className="text-xs text-gray-400">{t('device.profile')}</span>
                  <p className="text-white">{device.profileName}</p>
                </div>
                <div>
                  <span className="text-xs text-gray-400">ID</span>
                  <p className="text-white text-xs break-all">{device.id}</p>
                </div>
                <div>
                  <span className="text-xs text-gray-400">{t('device.labels')}</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {device.labels.map((label, index) => (
                      <span key={index} className="px-2 py-0.5 bg-indigo-900/50 rounded-full text-xs text-white">
                        {label}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="text-xs text-gray-400">{t('device.created')}</span>
                  <p className="text-white text-sm">
                    {device.created ? new Date(device.created).toLocaleString() : t('device.unknown')}
                  </p>
                </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-2">{t('device.protocolInfo')}</h3>
            {getProtocolDetails()}
            
            {/* 设备指令详情入口 */}
            <div 
              className="mt-6 border-2 border-indigo-500/30 rounded-lg p-4 bg-indigo-900/20 hover:bg-indigo-800/30 transition-colors cursor-pointer"
              onClick={() => setShowCommandsModal(true)}
            >
              <h3 className="text-lg font-semibold text-white mb-2">{t('device.commands', '设备指令')}</h3>
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-300">{t('device.viewCommands', '查看该设备支持的指令和操作')}</p>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-indigo-700/50 rounded-md text-xs text-white">GET</span>
                <span className="px-2 py-1 bg-green-700/50 rounded-md text-xs text-white">SET</span>
                <span className="px-2 py-1 bg-purple-700/50 rounded-md text-xs text-white">RESET</span>
              </div>
            </div>
          </div>

          {device.autoEvents && device.autoEvents.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">{t('device.autoEvents')}</h3>
              <div className="space-y-2">
                {device.autoEvents.map((event, index) => (
                  <div key={index} className="bg-white/5 p-3 rounded-lg">
                    <div className="flex justify-between">
                      <span className="text-white">{event.sourceName}</span>
                      <span className="text-blue-400">{event.interval}</span>
                    </div>
                    <div className="text-xs text-gray-400 mt-1">
                      {event.onChange ? t('device.onChangeOnly') : t('device.scheduled')}
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
