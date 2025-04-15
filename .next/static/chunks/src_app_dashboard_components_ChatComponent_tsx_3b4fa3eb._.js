(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/src/app/dashboard/components/ChatComponent.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>ChatComponent)
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
        fileName: "[project]/src/app/dashboard/components/ChatComponent.tsx",
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
            name: '💡照明系统是不是开得太久了？有节省空间吗？🤔'
        },
        {
            name: '💨这几天挺热🌡️，我想知道空调用电是不是超了？🤔'
        }
    ],
    // 数字环境专员
    '数字环境专员': [
        {
            name: '📡冷库环境最近波动大，是不是外面太热？'
        },
        {
            name: '🚨有没有严重告警要立即处理？'
        }
    ],
    // 数字安防监控员
    '数字安防监控员': [],
    // 数字设备健康主管
    '数字设备健康主管': [
        {
            name: '🔍调出最近3天空调用电趋势，我看看变化。'
        },
        {
            name: '🛠有没有哪台空调的能耗曲线特别奇怪？'
        }
    ],
    // 数字综合运营协调员
    '数字综合运营协调员': [
        {
            name: '🔎 今天整体状况如何？'
        },
        {
            name: '📈 最近总能耗趋势怎么样？'
        }
    ]
};
// 默认快速回复选项
const DEFAULT_QUICK_REPLIES = [];
function ChatComponent({ currentRole = '数字能效分析师' }) {
    _s();
    const { messages, appendMsg, updateMsg } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chatui$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMessages"])([]);
    const { setThinkData } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$dashboard$2f$ThinkContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useThinkContext"])();
    const [isTyping, setIsTyping] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const chatRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const thinkContentRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ChatComponent.useEffect": ()=>{
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
                                        "ChatComponent.useEffect": (chart)=>({
                                                ...chart,
                                                data: typeof chart.data === 'string' ? chart.data : JSON.stringify(chart.data)
                                            })
                                    }["ChatComponent.useEffect"])
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
                } catch (error) {
                    console.error('Think内容更新错误:', error);
                }
            }
        }
    }["ChatComponent.useEffect"], [
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
                // 初始化一个空的回复消息
                const messageId = Date.now().toString();
                appendMsg({
                    _id: messageId,
                    type: 'text',
                    content: {
                        text: ''
                    },
                    position: 'left'
                });
                const currentMessageId = messageId;
                // 调用 chat API，使用流式响应
                const chatResponse = await fetch('/api/chat', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        message: val,
                        role: currentRole
                    })
                });
                if (!chatResponse.ok) {
                    throw new Error('Chat API 请求失败');
                }
                // 处理流式响应
                const reader = chatResponse.body?.getReader();
                if (!reader) {
                    throw new Error('无法获取响应流');
                }
                let accumulatedContent = '';
                let noDataContent = '';
                let conversationId = null;
                let finishFlag = false;
                // 读取流数据
                while(true){
                    const { done, value } = await reader.read();
                    if (done) break;
                    // 将数据转换为文本
                    const chunk = new TextDecoder().decode(value);
                    const lines = chunk.split('\n\n').filter((line)=>line.trim() !== '');
                    for (const line of lines){
                        if (line.startsWith('data: ')) {
                            const data = line.slice(6);
                            try {
                                const parsedData = JSON.parse(data);
                                // 保存会话 ID
                                if (parsedData.metadata?.conversation_id && !conversationId) {
                                    conversationId = parsedData.metadata.conversation_id;
                                }
                                accumulatedContent += parsedData.content;
                                // 累积内容
                                // if (parsedData.delta) {
                                //   accumulatedContent += parsedData.delta;
                                // } else if (parsedData.content) {
                                //   accumulatedContent = parsedData.content;
                                // }
                                if (currentMessageId && !finishFlag) {
                                    // 如果收到了<tools_data_result>就停止更新message
                                    if (accumulatedContent.includes('<tools_data_result>')) {
                                        finishFlag = true;
                                        noDataContent = accumulatedContent.replace('<tools_data_result>', '');
                                        updateMsg(currentMessageId, {
                                            type: 'markdown',
                                            content: {
                                                text: noDataContent
                                            },
                                            position: 'left'
                                        });
                                    } else {
                                        updateMsg(currentMessageId, {
                                            type: 'markdown',
                                            content: {
                                                text: accumulatedContent
                                            },
                                            position: 'left'
                                        });
                                    }
                                }
                                // 如果收到结束事件，则保存完整回复
                                if (parsedData.metadata?.event_type === 'message_end') {
                                    // 将消息内容存入 Think 上下文
                                    console.log('完整响应:', accumulatedContent);
                                    // 调用 data-format 接口获取格式化数据
                                    fetch('/api/data-format', {
                                        method: 'POST',
                                        headers: {
                                            'Content-Type': 'application/json'
                                        },
                                        body: JSON.stringify({
                                            message: accumulatedContent,
                                            role: 'user'
                                        })
                                    }).then((response)=>response.json()).then((data)=>{
                                        // 从 data-format 接口响应中获取内容并设置到 thinkContentRef.current
                                        // thinkContentRef.current = noDataContent;
                                        setThinkData({
                                            content: noDataContent,
                                            parsedContent: {
                                                layout: 'grid(2, 2)',
                                                cards: data.cards,
                                                charts: data.charts?.map((chart)=>({
                                                        ...chart,
                                                        data: typeof chart.data === 'string' ? chart.data : JSON.stringify(chart.data)
                                                    }))
                                            },
                                            metadata: {
                                                type: 'dashboard',
                                                timestamp: new Date().toISOString()
                                            }
                                        });
                                    }).catch((error)=>{
                                        console.error('调用 data-format 接口出错:', error);
                                    });
                                    break;
                                }
                            } catch (e) {
                                console.error('解析流数据错误:', e, data);
                            }
                        }
                    }
                }
                // 流式响应已处理完毕，不需要再调用 daily-report API
                // 如果需要将 Think 内容转换为图表数据，可以在这里处理
                if (thinkContentRef.current) {
                    try {
                    // 尝试解析 Think 内容中的图表数据
                    // const parsedContent = parseDashboardDSL(thinkContentRef.current);
                    // if (parsedContent) {
                    //   console.log('解析后的图表数据:', parsedContent);
                    //   // 更新 Think 上下文
                    //   setThinkData({
                    //     content: thinkContentRef.current,
                    //     parsedContent: {
                    //       layout: parsedContent.layout,
                    //       cards: parsedContent.cards,
                    //       charts: parsedContent.charts?.map(chart => ({
                    //         ...chart,
                    //         data: JSON.stringify(chart.data)
                    //       }))
                    //     },
                    //     metadata: {
                    //       type: 'dashboard',
                    //       timestamp: new Date().toISOString()
                    //     }
                    //   });
                    // }
                    } catch (error) {
                        console.error('解析 Think 内容错误:', error);
                    }
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
        "ChatComponent.useCallback[renderMessageContent]": (msg)=>{
            const { type, content } = msg;
            console.log('msg', msg);
            if (type === 'text' && content?.text) {
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chatui$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Bubble"], {
                    content: content.text
                }, void 0, false, {
                    fileName: "[project]/src/app/dashboard/components/ChatComponent.tsx",
                    lineNumber: 334,
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
                        fileName: "[project]/src/app/dashboard/components/ChatComponent.tsx",
                        lineNumber: 343,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/dashboard/components/ChatComponent.tsx",
                    lineNumber: 342,
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
                                fileName: "[project]/src/app/dashboard/components/ChatComponent.tsx",
                                lineNumber: 366,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/dashboard/components/ChatComponent.tsx",
                            lineNumber: 365,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/dashboard/components/ChatComponent.tsx",
                        lineNumber: 364,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/dashboard/components/ChatComponent.tsx",
                    lineNumber: 363,
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
                                fileName: "[project]/src/app/dashboard/components/ChatComponent.tsx",
                                lineNumber: 394,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/dashboard/components/ChatComponent.tsx",
                            lineNumber: 393,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/dashboard/components/ChatComponent.tsx",
                        lineNumber: 392,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/dashboard/components/ChatComponent.tsx",
                    lineNumber: 391,
                    columnNumber: 9
                }, this);
            }
            return null;
        }
    }["ChatComponent.useCallback[renderMessageContent]"], []); // 空依赖数组，表示这个函数只会创建一次
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
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chatui$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
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
            fileName: "[project]/src/app/dashboard/components/ChatComponent.tsx",
            lineNumber: 623,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/dashboard/components/ChatComponent.tsx",
        lineNumber: 621,
        columnNumber: 5
    }, this);
}
_s(ChatComponent, "V010sRfmqKn4nrsMfpg9tlNdl/Y=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chatui$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMessages"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$dashboard$2f$ThinkContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useThinkContext"]
    ];
});
_c1 = ChatComponent;
var _c, _c1;
__turbopack_context__.k.register(_c, "Sync");
__turbopack_context__.k.register(_c1, "ChatComponent");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/dashboard/components/ChatComponent.tsx [app-client] (ecmascript, next/dynamic entry)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/dashboard/components/ChatComponent.tsx [app-client] (ecmascript)"));
}}),
}]);

//# sourceMappingURL=src_app_dashboard_components_ChatComponent_tsx_3b4fa3eb._.js.map