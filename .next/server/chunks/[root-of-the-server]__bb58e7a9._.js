module.exports = {

"[project]/.next-internal/server/app/api/daily-report/route/actions.js [app-rsc] (server actions loader, ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
}}),
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}}),
"[project]/src/app/api/daily-report/route.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "POST": (()=>POST)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
;
// 生成分析报告，返回带有 markdown 内容和 DSL 配置的响应
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
    ].map((rec)=>`- ${rec}`).join('\n')}
`;
    // 创建符合 ThinkData 结构的 DSL 内容
    const dslContent = {
        layout: "grid(2, 2)",
        cards: [
            {
                type: "summary",
                metrics: [
                    {
                        title: "总候选人",
                        value: 280,
                        trend: "+12%"
                    },
                    {
                        title: "热门职位",
                        value: "工程师"
                    },
                    {
                        title: "平均薪资",
                        value: "18k"
                    }
                ]
            }
        ],
        charts: [
            {
                type: "bar",
                data: [
                    {
                        name: "1月",
                        value: 120
                    },
                    {
                        name: "2月",
                        value: 150
                    },
                    {
                        name: "3月",
                        value: 180
                    },
                    {
                        name: "4月",
                        value: 200
                    },
                    {
                        name: "5月",
                        value: 220
                    },
                    {
                        name: "6月",
                        value: 250
                    },
                    {
                        name: "7月",
                        value: 280
                    }
                ],
                title: "月度候选人趋势",
                xAxis: "月份",
                yAxis: "人数"
            },
            {
                type: "pie",
                data: [
                    {
                        name: "engineering",
                        value: 100
                    },
                    {
                        name: "marketing",
                        value: 60
                    },
                    {
                        name: "sales",
                        value: 50
                    },
                    {
                        name: "design",
                        value: 25
                    },
                    {
                        name: "hr",
                        value: 45
                    }
                ],
                title: "职位分布"
            },
            {
                type: "radar",
                data: [
                    {
                        skill: "javascript",
                        value: 90
                    },
                    {
                        skill: "python",
                        value: 55
                    },
                    {
                        skill: "java",
                        value: 50
                    },
                    {
                        skill: "react",
                        value: 60
                    },
                    {
                        skill: "sql",
                        value: 45
                    }
                ],
                title: "技能分布"
            }
        ]
    };
    // 创建 ThinkData 对象
    const thinkData = {
        content: markdownContent,
        parsedContent: dslContent,
        metadata: {
            title: "招聘数据分析",
            timestamp: new Date().toISOString()
        }
    };
    return [
        {
            type: 'markdown',
            content: markdownContent,
            position: 'left'
        },
        {
            type: 'think',
            content: thinkData,
            position: 'pop'
        }
    ];
}
// 生成能源数据报告
function generateEnergyReport() {
    const currentDate = new Date().toLocaleDateString('zh-CN');
    const markdownContent = `
# 📊 能源消耗数据分析报告
**日期:** ${currentDate}

## 关键指标
| 指标 | 值 |
|------|----|  
| 总能耗 | 12,500 kWh |
| 节能率 | 15% |
| 高峰时段 | 14:00-16:00 |
| 异常设备 | 3号空调系统 |

## 趋势分析
- **月度节能:** 15%
- **设备能效:**
  - 照明系统: 优
  - 空调系统: 良
  - 生产设备: 中
`;
    // 创建符合 ThinkData 结构的 DSL 内容
    // const dslContent = {
    //   layout: "grid(2, 2)",
    //   cards: [
    //     {
    //       type: "summary",
    //       metrics: [
    //         { title: "总能耗", value: "12,500 kWh", trend: "-15%" },
    //         { title: "节能率", value: "15%" },
    //         { title: "异常设备", value: "3号空调" }
    //       ]
    //     }
    //   ],
    //   charts: [
    //     {
    //       type: "bar",
    //       data: [
    //         { name: "照明", value: 3200 },
    //         { name: "空调", value: 4500 },
    //         { name: "生产", value: 3800 },
    //         { name: "其他", value: 1000 }
    //       ],
    //       title: "能耗分布",
    //       xAxis: "设备类型",
    //       yAxis: "能耗(kWh)"
    //     },
    //     {
    //       type: "pie",
    //       data: [
    //         { name: "engineering", value: 120 },
    //         { name: "marketing", value: 40 },
    //         { name: "sales", value: 30 },
    //         { name: "design", value: 15 },
    //         { name: "hr", value: 25 }
    //       ],
    //       title: "部门能耗占比"
    //     }
    //   ]
    // };
    const dslContent = {
        "layout": "grid(2, 2)",
        "cards": [
            {
                "type": "summary",
                "metrics": [
                    {
                        "title": "每日用电量波动范围",
                        "value": "1200 - 1880 kWh"
                    },
                    {
                        "title": "4月11日用电量",
                        "value": "1880 kWh",
                        "trend": "相较于其他日期偏高，可能存在异常波动"
                    },
                    {
                        "title": "历史基准照明日用电量",
                        "value": "320 kWh"
                    }
                ]
            }
        ],
        "charts": [
            {
                "type": "bar",
                "data": [
                    {
                        "name": "2025-04-08",
                        "value": 1280
                    },
                    {
                        "name": "2025-04-09",
                        "value": 1420
                    },
                    {
                        "name": "2025-04-10",
                        "value": 1350
                    },
                    {
                        "name": "2025-04-11",
                        "value": 1880
                    },
                    {
                        "name": "2025-04-12",
                        "value": 1200
                    },
                    {
                        "name": "2025-04-13",
                        "value": 1255
                    },
                    {
                        "name": "2025-04-14",
                        "value": 1210
                    }
                ],
                "title": "最近7天照明系统能耗趋势",
                "xAxis": "日期",
                "yAxis": "电量(kWh)"
            },
            {
                "type": "pie",
                "data": [
                    {
                        "name": "办公区南侧",
                        "value": 780
                    },
                    {
                        "name": "研发区",
                        "value": 540
                    },
                    {
                        "name": "地下车库",
                        "value": 1200
                    },
                    {
                        "name": "屋顶空调设备区",
                        "value": 300
                    }
                ],
                "title": "主要能耗区域构成比例"
            }
        ]
    };
    // 创建 ThinkData 对象
    const thinkData = {
        content: markdownContent,
        parsedContent: dslContent,
        metadata: {
            title: "能源消耗分析",
            timestamp: new Date().toISOString()
        }
    };
    return [
        {
            type: 'markdown',
            content: markdownContent,
            position: 'left'
        },
        {
            type: 'think',
            content: thinkData,
            position: 'pop'
        }
    ];
}
// 生成冷库监控报告
function generateColdStorageReport() {
    const currentDate = new Date().toLocaleDateString('zh-CN');
    const markdownContent = `
# 🧊 冷库温度监控报告
**日期:** ${currentDate}

## 关键指标
| 指标 | 值 |
|------|----|  
| 平均温度 | -18.5°C |
| 温度波动 | ±1.2°C |
| 湿度 | 45% |
| 异常区域 | B3区域 |

## 分析
- **B3区域温度波动超出预设范围**
- **建议检查制冷系统**
- **优化照明使用，减少热量产生**
`;
    // 创建符合 ThinkData 结构的 DSL 内容
    const dslContent = {
        layout: "grid(2, 2)",
        cards: [
            {
                type: "summary",
                metrics: [
                    {
                        title: "平均温度",
                        value: "-18.5°C",
                        trend: "+1.2°C"
                    },
                    {
                        title: "湿度",
                        value: "45%"
                    },
                    {
                        title: "异常区域",
                        value: "B3区域"
                    }
                ]
            }
        ],
        charts: [
            {
                type: "bar",
                data: [
                    {
                        name: "A1区",
                        value: -20.1
                    },
                    {
                        name: "A2区",
                        value: -19.8
                    },
                    {
                        name: "B1区",
                        value: -19.2
                    },
                    {
                        name: "B2区",
                        value: -18.9
                    },
                    {
                        name: "B3区",
                        value: -16.5
                    }
                ],
                title: "各区域温度",
                xAxis: "区域",
                yAxis: "温度(°C)"
            }
        ]
    };
    // 创建 ThinkData 对象
    const thinkData = {
        content: markdownContent,
        parsedContent: dslContent,
        metadata: {
            title: "冷库温度监控",
            timestamp: new Date().toISOString()
        }
    };
    return [
        {
            type: 'markdown',
            content: markdownContent,
            position: 'left'
        },
        {
            type: 'think',
            content: thinkData,
            position: 'pop'
        }
    ];
}
// 生成安防监控报告
function generateSecurityReport() {
    const currentDate = new Date().toLocaleDateString('zh-CN');
    const markdownContent = `
# 🔐 安防监控报告
**日期:** ${currentDate}

## 关键指标
| 指标 | 值 |
|------|----|  
| 安防警报 | 3次 |
| 异常人员 | 1人次 |
| 系统状态 | 正常 |
| 监控覆盖率 | 98.5% |

## 分析
- **安防警报分析:** 非工作时间进入区域
- **建议加强入口管理**
- **定期检查监控设备**
`;
    // 创建符合 ThinkData 结构的 DSL 内容
    const dslContent = {
        layout: "grid(2, 2)",
        cards: [
            {
                type: "summary",
                metrics: [
                    {
                        title: "安防警报",
                        value: "3次",
                        trend: "+1次"
                    },
                    {
                        title: "异常人员",
                        value: "1人次"
                    },
                    {
                        title: "监控覆盖率",
                        value: "98.5%"
                    }
                ]
            }
        ],
        charts: [
            {
                type: "bar",
                data: [
                    {
                        name: "A区",
                        value: 1
                    },
                    {
                        name: "B区",
                        value: 2
                    },
                    {
                        name: "C区",
                        value: 0
                    },
                    {
                        name: "D区",
                        value: 0
                    }
                ],
                title: "各区域警报次数",
                xAxis: "区域",
                yAxis: "次数"
            }
        ]
    };
    // 创建 ThinkData 对象
    const thinkData = {
        content: markdownContent,
        parsedContent: dslContent,
        metadata: {
            title: "安防监控报告",
            timestamp: new Date().toISOString()
        }
    };
    return [
        {
            type: 'markdown',
            content: markdownContent,
            position: 'left'
        },
        {
            type: 'think',
            content: thinkData,
            position: 'pop'
        }
    ];
}
// 生成设备健康报告
function generateDeviceHealthReport() {
    const currentDate = new Date().toLocaleDateString('zh-CN');
    const markdownContent = `
# 🔧 设备健康状态报告
**日期:** ${currentDate}

## 关键指标
| 指标 | 值 |
|------|----|  
| 设备总数 | 42台 |
| 健康设备 | 38台 |
| 预警设备 | 3台 |
| 故障设备 | 1台 |

## 分析
- **预警设备:** 2号生产线、空调主机、库房传送带
- **故障设备:** 3号包装机
- **建议安排维修人员检查故障设备**
`;
    // 创建符合 ThinkData 结构的 DSL 内容
    const dslContent = {
        layout: "grid(2, 2)",
        cards: [
            {
                type: "summary",
                metrics: [
                    {
                        title: "设备总数",
                        value: "42台"
                    },
                    {
                        title: "健康率",
                        value: "90.5%",
                        trend: "-2.3%"
                    },
                    {
                        title: "故障设备",
                        value: "1台"
                    }
                ]
            }
        ],
        charts: [
            {
                type: "pie",
                data: [
                    {
                        name: "健康",
                        value: 38
                    },
                    {
                        name: "预警",
                        value: 3
                    },
                    {
                        name: "故障",
                        value: 1
                    }
                ],
                title: "设备健康状态分布"
            }
        ]
    };
    // 创建 ThinkData 对象
    const thinkData = {
        content: markdownContent,
        parsedContent: dslContent,
        metadata: {
            title: "设备健康状态",
            timestamp: new Date().toISOString()
        }
    };
    return [
        {
            type: 'markdown',
            content: markdownContent,
            position: 'left'
        },
        {
            type: 'think',
            content: thinkData,
            position: 'pop'
        }
    ];
}
// 生成综合运营报告
function generateOperationReport() {
    const currentDate = new Date().toLocaleDateString('zh-CN');
    const markdownContent = `
# 📈 综合运营报告
**日期:** ${currentDate}

## 关键指标
| 指标 | 值 |
|------|----|  
| 生产效率 | 92.3% |
| 设备利用率 | 85.7% |
| 能源利用率 | 78.2% |
| 安全事故 | 0次 |

## 分析
- **生产效率提升 2.1%**
- **能源利用率下降 1.5%**
- **建议优化能源调度策略**
`;
    // 创建符合 ThinkData 结构的 DSL 内容
    const dslContent = {
        layout: "grid(2, 2)",
        cards: [
            {
                type: "summary",
                metrics: [
                    {
                        title: "生产效率",
                        value: "92.3%",
                        trend: "+2.1%"
                    },
                    {
                        title: "设备利用率",
                        value: "85.7%"
                    },
                    {
                        title: "能源利用率",
                        value: "78.2%",
                        trend: "-1.5%"
                    }
                ]
            }
        ],
        charts: [
            {
                type: "bar",
                data: [
                    {
                        name: "生产部",
                        value: 92.3
                    },
                    {
                        name: "物流部",
                        value: 88.5
                    },
                    {
                        name: "采购部",
                        value: 95.2
                    },
                    {
                        name: "质检部",
                        value: 91.7
                    }
                ],
                title: "各部门效率对比",
                xAxis: "部门",
                yAxis: "效率(%)"
            }
        ]
    };
    // 创建 ThinkData 对象
    const thinkData = {
        content: markdownContent,
        parsedContent: dslContent,
        metadata: {
            title: "综合运营报告",
            timestamp: new Date().toISOString()
        }
    };
    return [
        {
            type: 'markdown',
            content: markdownContent,
            position: 'left'
        },
        {
            type: 'think',
            content: thinkData,
            position: 'pop'
        }
    ];
}
async function POST(request) {
    try {
        const { message, role } = await request.json();
        let response;
        console.log("daily-report: ", message, role);
        // 根据角色和消息内容返回不同的报告
        if (role === '数字能效分析师') {
            // 能效分析师角色
            response = generateEnergyReport();
        } else if (role === '数字环境专员') {
            // 环境专员角色
            response = generateColdStorageReport();
        } else if (role === '数字安防监控员') {
            // 安防监控员角色
            response = generateSecurityReport();
        } else if (role === '数字设备健康主管') {
            // 设备健康主管角色
            response = generateDeviceHealthReport();
        } else if (role === '数字综合运营协调员') {
            // 综合运营协调员角色
            response = generateOperationReport();
        } else {
            // 默认返回 综合运营协调员角色数据
            response = generateOperationReport();
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(Array.isArray(response) ? response : [
            response
        ]);
    } catch (error) {
        console.error('API错误:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: '处理请求时出错'
        }, {
            status: 500
        });
    }
}
}}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__bb58e7a9._.js.map