import { Card, Metric, Text } from "@tremor/react";

// 卡片数据类型定义
export interface CardData {
  title: string;
  value: string | number;
  trend?: string;
}

interface CardGridProps {
  cardData: CardData[];
}

// 卡片网格组件
export const CardGrid = ({ cardData }: CardGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {cardData.map((card, index) => (
        <Card key={index} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
          <Text className="text-gray-300">{card.title}</Text>
          <Metric className="text-white">{card.value}</Metric>
          {card.trend && (
            <div className={`text-xs mt-2 ${card.trend.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
              {card.trend}
            </div>
          )}
        </Card>
      ))}
    </div>
  );
};
