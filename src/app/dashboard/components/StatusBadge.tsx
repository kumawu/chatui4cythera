'use client';

interface StatusBadgeProps {
  status: string;
}

// 设备状态标签组件
export const StatusBadge = ({ status }: StatusBadgeProps) => {
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
