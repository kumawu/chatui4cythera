(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/src/app/dashboard/components/Chat.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>Chat)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$marked$2f$lib$2f$marked$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/marked/lib/marked.esm.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chatui$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@chatui/core/dist/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$dashboard$2f$ThinkContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/dashboard/ThinkContext.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
const Sync = ({ isDone, thinkTime, children })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "sync-container",
        children: children
    }, void 0, false, {
        fileName: "[project]/src/app/dashboard/components/Chat.tsx",
        lineNumber: 9,
        columnNumber: 5
    }, this);
};
_c = Sync;
'use client';
;
;
// 配置marked支持表格等复杂markdown元素
__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$marked$2f$lib$2f$marked$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["marked"].setOptions({
    gfm: true,
    breaks: true,
    pedantic: false // 不严格遵循原始Markdown
});
;
;
;
;
;
// 根据不同角色定义快速回复选项
const ROLE_QUICK_REPLIES = {
    // 数字能效分析师
    '数字能效分析师': [
        {
            name: '分析能耗数据',
            isNew: true
        },
        {
            name: '查看节能报告',
            isHighlight: true
        },
        {
            name: '设备能效对比'
        },
        {
            name: '能耗异常检测'
        }
    ],
    // 数字环境专员
    '数字环境专员': [
        {
            name: '监控冷库温度',
            isNew: true
        },
        {
            name: '环境指标报告',
            isHighlight: true
        },
        {
            name: '光照优化建议'
        },
        {
            name: '湿度异常检测'
        }
    ],
    // 数字安防监控员
    '数字安防监控员': [
        {
            name: '监控区域状态',
            isNew: true
        },
        {
            name: '异常人员检测',
            isHighlight: true
        },
        {
            name: '安防系统状态'
        },
        {
            name: '查看安全报告'
        }
    ],
    // 数字设备健康主管
    '数字设备健康主管': [
        {
            name: '设备状态检测',
            isNew: true
        },
        {
            name: '预测性维护提醒',
            isHighlight: true
        },
        {
            name: '设备故障分析'
        },
        {
            name: '维修记录查询'
        }
    ],
    // 数字综合运营协调员
    '数字综合运营协调员': [
        {
            name: '整合多源数据',
            isNew: true
        },
        {
            name: '运营状态监控',
            isHighlight: true
        },
        {
            name: '部门协作效率'
        },
        {
            name: '生成月度报告'
        }
    ]
};
// 默认快速回复选项
const DEFAULT_QUICK_REPLIES = [
    {
        name: '你好！',
        isNew: true
    },
    {
        name: '我需要技术支持',
        isHighlight: true
    },
    {
        name: '我想了解产品信息'
    }
];
function Chat({ currentRole = '数字能效分析师' }) {
    _s();
    const { messages, appendMsg } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chatui$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMessages"])([]);
    const { setThinkData } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$dashboard$2f$ThinkContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useThinkContext"])();
    const [isTyping, setIsTyping] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const chatRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const thinkContentRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Chat.useEffect": ()=>{
            console.log('thinkContentRef 更新检测:', thinkContentRef.current);
            if (thinkContentRef.current) {
                try {
                    // 尝试直接解析 JSON
                    let parsedData;
                    try {
                        parsedData = JSON.parse(thinkContentRef.current);
                        console.log('直接解析成功:', parsedData);
                        // 如果已经是结构化数据，直接使用
                        if (parsedData.cards || parsedData.charts) {
                            console.log('使用预先解析的数据更新 ThinkData');
                            setThinkData({
                                content: thinkContentRef.current,
                                parsedContent: {
                                    layout: parsedData.layout,
                                    cards: parsedData.cards,
                                    charts: parsedData.charts?.map({
                                        "Chat.useEffect": (chart)=>({
                                                ...chart,
                                                data: typeof chart.data === 'string' ? chart.data : JSON.stringify(chart.data)
                                            })
                                    }["Chat.useEffect"])
                                },
                                metadata: {
                                    type: 'dashboard',
                                    timestamp: new Date().toISOString()
                                }
                            });
                            return;
                        }
                    } catch (e) {
                        console.log('直接解析失败，尝试使用 DSL 解析器');
                    }
                // 如果直接解析失败或不是预期的格式，尝试使用 DSL 解析器
                // const parsedContent = parseDashboardDSL(thinkContentRef.current);
                // console.groupCollapsed('Think内容更新');
                // console.log('原始内容:', thinkContentRef.current);
                // console.log('解析后的配置:', parsedContent);
                // console.groupEnd();
                // setThinkData({
                //   content: thinkContentRef.current,
                //   parsedContent: parsedContent ? {
                //     layout: parsedContent.layout,
                //     cards: parsedContent.cards,
                //     charts: parsedContent.charts?.map(chart => ({
                //       ...chart,
                //       data: JSON.stringify(chart.data)
                //     }))
                //   } : undefined,
                //   metadata: {
                //     type: 'dashboard',
                //     timestamp: new Date().toISOString()
                //   }
                // });
                } catch (error) {
                    console.error('Think内容更新错误:', error);
                }
            }
        }
    }["Chat.useEffect"], [
        messages,
        setThinkData
    ]);
    async function handleSend(type, val) {
        if (type === 'text' && val.trim()) {
            appendMsg({
                type: 'text',
                content: {
                    text: val
                },
                position: 'right'
            });
            setIsTyping(true);
            try {
                // 将当前角色信息添加到请求中
                const response = await fetch('/api/daily-report', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        message: val,
                        role: currentRole
                    })
                });
                if (!response.ok) {
                    throw new Error('请求失败');
                }
                const responseData = await response.json();
                console.log('Response:', responseData);
                // 检查response是否为数组
                if (Array.isArray(responseData)) {
                    // 如果是数组，依次添加每个消息
                    responseData.forEach((msg)=>{
                        console.log('添加消息:', msg.type, msg);
                        appendMsg({
                            type: msg.type,
                            content: typeof msg.content === 'string' ? {
                                text: msg.content
                            } : msg.content,
                            position: msg.position
                        });
                    });
                } else {
                    // 如果不是数组，按原来的方式处理
                    appendMsg({
                        type: responseData.type,
                        content: {
                            text: responseData.content
                        },
                        position: responseData.position
                    });
                }
            } catch (error) {
                console.error('发送消息时出错:', error);
                appendMsg({
                    type: 'text',
                    content: {
                        text: '处理请求时出错'
                    },
                    position: 'left'
                });
            }
            setIsTyping(false);
        }
    }
    function handleQuickReplyClick(item) {
        handleSend('text', item.name);
    }
    const renderMessageContent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "Chat.useCallback[renderMessageContent]": (msg)=>{
            const { type, content } = msg;
            console.log('msg', msg);
            if (type === 'text' && content?.text) {
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chatui$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Bubble"], {
                    content: content.text
                }, void 0, false, {
                    fileName: "[project]/src/app/dashboard/components/Chat.tsx",
                    lineNumber: 287,
                    columnNumber: 14
                }, this);
            }
            if (type === 'markdown' && content) {
                const text = typeof content === 'string' ? content : content?.text || '';
                const html = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$marked$2f$lib$2f$marked$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["marked"].parse(text);
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "markdown-content p-4 bg-white/5 rounded-lg",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        dangerouslySetInnerHTML: {
                            __html: html
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/app/dashboard/components/Chat.tsx",
                        lineNumber: 296,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/dashboard/components/Chat.tsx",
                    lineNumber: 295,
                    columnNumber: 9
                }, this);
            }
            // 处理 think 类型消息
            if (type === 'think' && content) {
                console.log('Think 消息接收到:', content);
                try {
                    // 将 think 内容保存到 ref 中，这样 useEffect 可以检测到并更新 ThinkContext
                    if (content.parsedContent) {
                        thinkContentRef.current = JSON.stringify(content.parsedContent);
                        console.log('设置 thinkContentRef:', thinkContentRef.current);
                    }
                } catch (error) {
                    console.error('处理 Think 消息失败:', error);
                }
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chatui$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Bubble"], {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chatui$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Think"], {
                        isDone: true,
                        thinkTime: 3,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-4",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("pre", {
                                children: JSON.stringify(content, null, 2)
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/components/Chat.tsx",
                                lineNumber: 319,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/dashboard/components/Chat.tsx",
                            lineNumber: 318,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/dashboard/components/Chat.tsx",
                        lineNumber: 317,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/dashboard/components/Chat.tsx",
                    lineNumber: 316,
                    columnNumber: 9
                }, this);
            }
            // 处理旧的 dsl 类型消息（兼容性）
            if (type === 'dsl' && content) {
                console.log('DSL 消息接收到:', content);
                try {
                    if ("component_name" in content && content["component_name"] === "dashboard") {
                        console.log('dashboard', content);
                        updateTremorDashboard(content["content"]);
                        // 将 DSL 内容保存到 ref 中
                        thinkContentRef.current = JSON.stringify(content["content"]);
                        console.log('设置 thinkContentRef (DSL):', thinkContentRef.current);
                    }
                } catch (error) {
                    console.error('解析DSL失败:', error);
                }
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chatui$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Bubble"], {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chatui$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Think"], {
                        isDone: true,
                        thinkTime: 3,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-4",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("pre", {
                                children: thinkContentRef.current
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/components/Chat.tsx",
                                lineNumber: 347,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/dashboard/components/Chat.tsx",
                            lineNumber: 346,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/dashboard/components/Chat.tsx",
                        lineNumber: 345,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/dashboard/components/Chat.tsx",
                    lineNumber: 344,
                    columnNumber: 9
                }, this);
            }
            return null;
        }
    }["Chat.useCallback[renderMessageContent]"], []); // 空依赖数组，表示这个函数只会创建一次
    function updateTremorDashboard(config) {
        // 这里实现更新Tremor大屏的逻辑
        console.log('更新Tremor大屏配置:', config);
        // 示例：更新卡片数据
        if (config.cards) {
            config.cards.forEach((card)=>{
                console.log('更新卡片:', card);
            // 实际更新逻辑需要根据具体UI框架实现
            });
        }
        // 示例：更新图表数据
        if (config.charts) {
            config.charts.forEach((chart)=>{
                console.log('更新图表:', chart.type, chart.data);
            // 实际更新逻辑需要根据具体UI框架实现
            });
        }
    }
    // 辅助函数：解析Dashboard DSL配置
    function parseDashboardDSL(dslContent) {
        // 提取dashboard配置块
        const dashboardRegex = /dashboard\s*{([\s\S]*?)}/;
        const dashboardMatch = dslContent.match(dashboardRegex);
        if (!dashboardMatch) {
            return null;
        }
        const configContent = dashboardMatch[1];
        try {
            const result = {};
            // 提取layout
            const layoutMatch = configContent.match(/layout:\s*([^\s;]+)/);
            if (layoutMatch) {
                result.layout = layoutMatch[1];
            }
            // 提取cards
            const cardRegex = /card\s*{([\s\S]*?)}/g;
            let cardMatch;
            result.cards = [];
            while((cardMatch = cardRegex.exec(configContent)) !== null){
                const cardContent = cardMatch[1];
                const typeMatch = cardContent.match(/type:\s*"([^"]+)"/);
                const metricsMatch = cardContent.match(/metrics:\s*\[([\s\S]*?)\]/);
                if (typeMatch && metricsMatch) {
                    const metrics = metricsMatch[1].split('},').map((metricStr)=>{
                        const titleMatch = metricStr.match(/title:\s*"([^"]+)"/);
                        const valueMatch = metricStr.match(/value:\s*([^,}]+)/);
                        const trendMatch = metricStr.match(/trend:\s*"([^"]+)"/);
                        const metric = {
                            title: titleMatch ? titleMatch[1] : '',
                            value: valueMatch ? valueMatch[1].replace(/"/g, '') : ''
                        };
                        if (trendMatch) {
                            metric.trend = trendMatch[1];
                        }
                        // 尝试将value转换为数字
                        if (!isNaN(Number(metric.value))) {
                            metric.value = Number(metric.value);
                        }
                        return metric;
                    });
                    result.cards.push({
                        type: typeMatch[1],
                        metrics
                    });
                }
            }
            // 提取charts
            const chartRegex = /chart\s*{([\s\S]*?)}/g;
            let chartMatch;
            result.charts = [];
            while((chartMatch = chartRegex.exec(configContent)) !== null){
                const chartContent = chartMatch[1];
                const typeMatch = chartContent.match(/type:\s*"([^"]+)"/);
                const titleMatch = chartContent.match(/title:\s*"([^"]+)"/);
                const xAxisMatch = chartContent.match(/xAxis:\s*"([^"]+)"/);
                const yAxisMatch = chartContent.match(/yAxis:\s*"([^"]+)"/);
                const chart = {
                    type: typeMatch ? typeMatch[1] : '',
                    data: [],
                    title: titleMatch ? titleMatch[1] : ''
                };
                if (xAxisMatch) {
                    chart.xAxis = xAxisMatch[1];
                }
                if (yAxisMatch) {
                    chart.yAxis = yAxisMatch[1];
                }
                // 根据图表类型生成示例数据
                let data = [];
                if (chart.type === 'bar') {
                    data = [
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
                    ];
                } else if (chart.type === 'line') {
                    data = [
                        {
                            range: "0-10k",
                            count: 50
                        },
                        {
                            range: "10-20k",
                            count: 110
                        },
                        {
                            range: "20-30k",
                            count: 90
                        },
                        {
                            range: "30k+",
                            count: 50
                        }
                    ];
                } else if (chart.type === 'pie' || chart.type === 'radar') {
                    data = [
                        {
                            name: "工程师",
                            value: 100
                        },
                        {
                            name: "市场",
                            value: 60
                        },
                        {
                            name: "销售",
                            value: 50
                        },
                        {
                            name: "设计",
                            value: 25
                        },
                        {
                            name: "HR",
                            value: 45
                        }
                    ];
                }
                result.charts.push({
                    ...chart,
                    data
                });
            }
            return result;
        } catch (error) {
            console.error('DSL解析错误:', error);
            return null;
        }
    }
    // 辅助函数：从DSL内容中提取特定属性值
    function extractValue(content, key) {
        const regex = new RegExp(`${key}\\s*:\\s*["']?([^,"'\\n\\r}]*)["']?`, 'i');
        const match = content.match(regex);
        return match ? match[1].trim() : null;
    }
    // 辅助函数：提取指标数组
    function extractMetrics(content) {
        if (!content.includes('metrics')) {
            return [];
        }
        const metricsStart = content.indexOf('metrics');
        const metricsEnd = content.indexOf(']', metricsStart);
        if (metricsStart === -1 || metricsEnd === -1) {
            return [];
        }
        const metricsContent = content.substring(metricsStart, metricsEnd + 1);
        const metricObjects = metricsContent.match(/{([^}]*)}/g) || [];
        return metricObjects.map((metricStr)=>{
            return {
                title: extractValue(metricStr, 'title'),
                value: extractValue(metricStr, 'value'),
                trend: extractValue(metricStr, 'trend')
            };
        });
    }
    // 根据当前角色获取对应的快速回复选项
    const getQuickRepliesByRole = ()=>{
        return ROLE_QUICK_REPLIES[currentRole] || DEFAULT_QUICK_REPLIES;
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "h-full flex flex-col bg-transparent",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Chat, {
            navbar: {
                title: ''
            },
            messages: messages,
            renderMessageContent: renderMessageContent,
            onSend: handleSend,
            locale: "zh-CN",
            placeholder: "请输入...",
            ref: chatRef,
            toolbar: [],
            quickReplies: getQuickRepliesByRole(),
            onQuickReplyClick: handleQuickReplyClick
        }, void 0, false, {
            fileName: "[project]/src/app/dashboard/components/Chat.tsx",
            lineNumber: 576,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/dashboard/components/Chat.tsx",
        lineNumber: 574,
        columnNumber: 5
    }, this);
}
_s(Chat, "ZHjAajmTdyi4jAI711xwttx/tLg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chatui$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMessages"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$dashboard$2f$ThinkContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useThinkContext"]
    ];
});
_c1 = Chat;
var _c, _c1;
__turbopack_context__.k.register(_c, "Sync");
__turbopack_context__.k.register(_c1, "Chat");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/dashboard/components/Chat.tsx [app-client] (ecmascript, next/dynamic entry)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/dashboard/components/Chat.tsx [app-client] (ecmascript)"));
}}),
}]);

//# sourceMappingURL=src_app_dashboard_components_Chat_tsx_78ef7270._.js.map