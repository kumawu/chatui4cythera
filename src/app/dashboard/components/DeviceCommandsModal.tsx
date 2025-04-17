'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import '../../../i18n';

interface Parameter {
  resourceName: string;
  valueType: string;
}

interface Command {
  name: string;
  get?: boolean;
  set?: boolean;
  path?: string;
  url?: string;
  parameters?: Parameter[];
}

interface DeviceCommandsData {
  deviceName: string;
  commands: Command[];
}

interface DeviceCommandsModalProps {
  deviceName: string;
  onClose: () => void;
}

export const DeviceCommandsModal = ({ deviceName, onClose }: DeviceCommandsModalProps) => {
  const { t } = useTranslation('translation');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [commandsData, setCommandsData] = useState<DeviceCommandsData | null>(null);

  useEffect(() => {
    const fetchDeviceCommands = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/device-commands?deviceName=${encodeURIComponent(deviceName)}`);
        
        if (!response.ok) {
          throw new Error(`API 请求失败: ${response.status}`);
        }
        
        const data = await response.json();
        const deviceCoreCommands = data.deviceCoreCommand;
        setCommandsData({
          deviceName: deviceCoreCommands.deviceName || deviceName,
          commands: deviceCoreCommands.coreCommands || []
        });
      } catch (error) {
        console.error("获取设备指令失败:", error);
        setError(t('device.commandsError', '获取设备指令失败'));
      } finally {
        setLoading(false);
      }
    };

    fetchDeviceCommands();
  }, [deviceName, t]);

  // 获取命令类型的标签
  const getCommandTypeBadge = (command: Command) => {
    const badges = [];
    
    if (command.get) {
      badges.push(
        <span key="get" className="px-2 py-1 bg-indigo-700/50 rounded-md text-xs text-white">
          GET
        </span>
      );
    }
    
    if (command.set) {
      badges.push(
        <span key="set" className="px-2 py-1 bg-green-700/50 rounded-md text-xs text-white">
          SET
        </span>
      );
    }
    
    if (!command.get && !command.set) {
      badges.push(
        <span key="other" className="px-2 py-1 bg-purple-700/50 rounded-md text-xs text-white">
          OTHER
        </span>
      );
    }
    
    return badges;
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gradient-to-br from-indigo-900/90 to-purple-900/90 rounded-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-2xl font-bold text-white">
            {t('device.commandsTitle', '设备指令文档')}: {deviceName}
          </h2>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="mb-4">
          <p className="text-gray-300">
            {t('device.commandsDescription', '以下是该设备支持的所有指令和操作。您可以通过这些指令控制和管理设备。')}
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : error ? (
          <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4 text-center">
            <p className="text-red-300">{error}</p>
          </div>
        ) : commandsData && commandsData.commands.length > 0 ? (
          <div className="space-y-4">
            {commandsData.commands.map((command, index) => (
              <div key={index} className="bg-white/5 border border-indigo-500/20 rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-semibold text-white">{command.name}</h3>
                  <div className="flex gap-2">
                    {getCommandTypeBadge(command)}
                  </div>
                </div>
                
                {command.path && (
                  <div className="mt-2">
                    <span className="text-xs text-gray-400">{t('device.endpoint', '接口路径')}:</span>
                    <code className="ml-2 px-2 py-1 bg-black/30 rounded text-sm text-green-300 font-mono">
                      {command.path}
                    </code>
                  </div>
                )}
                
                {command.url && (
                  <div className="mt-2">
                    <span className="text-xs text-gray-400">URL:</span>
                    <code className="ml-2 px-2 py-1 bg-black/30 rounded text-sm text-blue-300 font-mono break-all">
                      {command.url.replace(/edgex/g, 'cythera')}
                    </code>
                  </div>
                )}
                
                {command.parameters && command.parameters.length > 0 && (
                  <div className="mt-3">
                    <h4 className="text-sm font-medium text-white mb-2">{t('device.parameters', '参数')}:</h4>
                    <div className="bg-black/20 rounded-lg overflow-hidden">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="bg-indigo-900/30">
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-300">
                              {t('device.resourceName', '资源名称')}
                            </th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-300">
                              {t('device.valueType', '值类型')}
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-indigo-900/30">
                          {command.parameters.map((param, paramIndex) => (
                            <tr key={paramIndex} className="hover:bg-indigo-900/10">
                              <td className="px-4 py-2 text-white">{param.resourceName}</td>
                              <td className="px-4 py-2 text-indigo-300">{param.valueType}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-indigo-900/20 border border-indigo-500/30 rounded-lg p-8 text-center">
            <p className="text-gray-300">{t('device.noCommands', '该设备没有可用的指令')}</p>
          </div>
        )}
      </div>
    </div>
  );
};
