import { NextResponse } from 'next/server';

function generateAnalysisReport() {
  const currentDate = new Date().toLocaleDateString('zh-CN');
  const monthlyGrowth = ((280 - 250) / 250 * 100).toFixed(1);
  
  const markdownContent = `
# 📊 招聘数据分析报告
**日期:** ${currentDate}

## 关键指标
| 指标 | 值 |
|------|----|
| 总候选人 | 280 |
| 热门职位 | 工程师 |
| 热门技能 | JavaScript |
| 平均薪资 | 18k |

## 趋势分析
- **月度增长:** ${monthlyGrowth}%
- **技能需求:**
  - JavaScript: 90
  - Python: 55
  - React: 60
- **薪资分布:**
  - 10-20k: 110
  - 20-30k: 90
  - 30k+: 50

## 建议
${[
  '加强工程师岗位招聘力度',
  '增加JavaScript相关培训资源',
  '关注10-20k薪资区间候选人'
].map(rec => `- ${rec}`).join('\n')}
`;

  const dslContent = {
    component_name: "dashboard",
    content: {
      // layout: "grid(2, 2)",
      cards: [

            { title: "总候选人", value: 280, trend: "up" },
            { title: "热门职位", value: "工程师" },
            { title: "平均薪资", value: "18k" }

      ],
      charts: [
        {
          type: "bar",
          data: [
            { name: "1月", value: 120 },
            { name: "2月", value: 150 },
            { name: "3月", value: 180 },
            { name: "4月", value: 200 },
            { name: "5月", value: 220 },
            { name: "6月", value: 250 },
            { name: "7月", value: 280 }
          ],
          title: "月度候选人趋势",
          xAxis: "月份",
          yAxis: "人数"
        },
        {
          type: "line",
          data: [
            { range: "0-10k", count: 50 },
            { range: "10-20k", count: 110 },
            { range: "20-30k", count: 90 },
            { range: "30k+", count: 50 }
          ],
          title: "薪资分布",
          xAxis: "薪资区间",
          yAxis: "人数"
        },
        {
          type: "pie",
          data: [
            { name: "工程师", value: 100 },
            { name: "市场", value: 60 },
            { name: "销售", value: 50 },
            { name: "设计", value: 25 },
            { name: "HR", value: 45 }
          ],
          title: "职位分布"
        },
        {
          type: "radar",
          data: [
            { skill: "JavaScript", level: 90 },
            { skill: "Python", level: 55 },
            { skill: "Java", level: 50 },
            { skill: "React", level: 60 },
            { skill: "SQL", level: 45 }
          ],
          title: "技能分布"
        }
      ]
    }
  };

  return [
    {
      type: 'markdown',
      content: markdownContent,
      position: 'left'
    },
    {
      type: 'dsl',
      content: dslContent,
      position: 'pop'
    }
  ];
}

export async function POST(request: Request) {
  try {
    const { message } = await request.json();
    
    let response;
    if (message.includes('日报')) {
      response = {
        type: 'text',
        content: `这是日报助手返回的内容，日期：${new Date().toISOString()}`,
        position: 'left'
      };
    } else {
      response = generateAnalysisReport();
    }
    
    return NextResponse.json(Array.isArray(response) ? response : [response]);
  } catch (error) {
    return NextResponse.json(
      { error: '处理请求时出错' },
      { status: 500 }
    );
  }
}