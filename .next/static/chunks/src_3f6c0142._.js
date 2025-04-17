(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/src/config/quickReplies.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "getQuickRepliesByRole": (()=>getQuickRepliesByRole)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/i18n.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$assistants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/config/assistants.ts [app-client] (ecmascript)");
;
;
const getQuickRepliesByRole = (role)=>{
    const { t } = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"];
    // 获取助手名称数组
    const assistantNames = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$assistants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAssistantNames"])();
    // 根据角色名称返回对应的快速回复选项
    const quickRepliesMap = {
        // 数字能效分析师
        [assistantNames[0]]: [
            {
                name: t('quickReplies.energyAnalyst.lighting', '💡照明系统是不是开得太久了？有节省空间吗？🤔')
            },
            {
                name: t('quickReplies.energyAnalyst.ac', '💨这几天挺热🌡️，我想知道空调用电是不是超了？🤔')
            }
        ],
        // 数字环境专员
        [assistantNames[1]]: [
            {
                name: t('quickReplies.envSpecialist.coldStorage', '📡冷库环境最近波动大，是不是外面太热？')
            },
            {
                name: t('quickReplies.envSpecialist.alerts', '🚨有没有严重告警要立即处理？')
            }
        ],
        // 数字设备健康主管
        [assistantNames[2]]: [
            {
                name: t('quickReplies.healthManager.trend', '🔍调出最近3天空调用电趋势，我看看变化。')
            },
            {
                name: t('quickReplies.healthManager.abnormal', '🛠有没有哪台空调的能耗曲线特别奇怪？')
            }
        ],
        // 数字综合运营协调员
        [assistantNames[3]]: [
            {
                name: t('quickReplies.coordinator.status', '🔎 今天整体状况如何？')
            },
            {
                name: t('quickReplies.coordinator.trend', '📈 最近总能耗趋势怎么样？')
            }
        ]
    };
    return quickRepliesMap[role] || [];
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
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
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/i18n.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/react-i18next/dist/es/index.js [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$useTranslation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-i18next/dist/es/useTranslation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$quickReplies$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/config/quickReplies.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$assistants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/config/assistants.ts [app-client] (ecmascript)");
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
;
;
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
function ChatComponent({ currentRole = '' }) {
    _s();
    const { t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$useTranslation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslation"])('translation');
    const { messages, appendMsg, updateMsg } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chatui$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMessages"])([]);
    const { setThinkData } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$dashboard$2f$ThinkContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useThinkContext"])();
    const [isTyping, setIsTyping] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isStreaming, setIsStreaming] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false); // 添加流式响应状态
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
                        console.log('直接解析失败');
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
            setIsTyping(true); // 设置正在输入状态
            setIsStreaming(true); // 设置流式响应状态为 true
            try {
                // 初始化一个空的回复消息，空消息会自动显示为 loading 状态
                const messageId = Date.now().toString();
                appendMsg({
                    _id: messageId,
                    type: 'markdown',
                    content: {
                        text: ''
                    },
                    position: 'left'
                });
                const currentMessageId = messageId;
                // 根据当前角色选择对应的 chatBot API
                let chatBot = '/api/chat-bot1'; // 默认值
                // 获取当前语言的助手名称数组
                const assistantNames = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$assistants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAssistantNames"])();
                // 根据助手名称选择对应的API端点
                if (currentRole === assistantNames[0]) {
                    chatBot = '/api/chat-bot1'; // 数字能效分析师
                } else if (currentRole === assistantNames[1]) {
                    chatBot = '/api/chat-bot2'; // 数字环境专员
                } else if (currentRole === assistantNames[2]) {
                    chatBot = '/api/chat-bot3'; // 数字设备健康主管
                } else if (currentRole === assistantNames[3]) {
                    chatBot = '/api/chat-bot4'; // 数字综合运营协调员
                } else {
                    chatBot = '/api/chat-bot4'; // 默认
                }
                console.log(`当前角色: ${currentRole}, 使用 API: ${chatBot}`);
                const chatResponse = await fetch(chatBot, {
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
                                        // 每次更新都保持使用 markdown 类型
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
                                        // 从 data-format 接口响应中获取内容并设置到 
                                        // 流式响应完成，获取数据完成，设置状态为 false
                                        setIsStreaming(false);
                                        setIsTyping(false); // 同时关闭打字指示器
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
            } catch (error) {
                console.error('发送消息时出错:', error);
                appendMsg({
                    type: 'text',
                    content: {
                        text: '处理请求时出错'
                    },
                    position: 'left'
                });
                // 发生错误时，重置所有状态
                setIsStreaming(false);
            }
            setIsTyping(false); // 关闭打字指示器
        }
    }
    function handleQuickReplyClick(item) {
        handleSend('text', item.name);
    }
    const renderMessageContent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ChatComponent.useCallback[renderMessageContent]": (msg)=>{
            const { type, content } = msg;
            console.log('msg', msg);
            // 如果消息内容为空且正在流式响应中，显示自定义的 loading 指示器
            if (type === 'markdown' && (!content?.text || content.text === '') && isStreaming && msg.position === 'left') {
                console.log('显示 loading 指示器', msg);
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chatui$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Bubble"], {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center space-x-2 p-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex space-x-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-2 h-2 rounded-full bg-indigo-400 animate-pulse",
                                        style: {
                                            animationDelay: '0ms'
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/components/ChatComponent.tsx",
                                        lineNumber: 287,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-2 h-2 rounded-full bg-indigo-400 animate-pulse",
                                        style: {
                                            animationDelay: '300ms'
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/components/ChatComponent.tsx",
                                        lineNumber: 288,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-2 h-2 rounded-full bg-indigo-400 animate-pulse",
                                        style: {
                                            animationDelay: '600ms'
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/components/ChatComponent.tsx",
                                        lineNumber: 289,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/dashboard/components/ChatComponent.tsx",
                                lineNumber: 286,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-sm text-indigo-300 p-2",
                                children: t('chat.generating')
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/components/ChatComponent.tsx",
                                lineNumber: 291,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/dashboard/components/ChatComponent.tsx",
                        lineNumber: 285,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/dashboard/components/ChatComponent.tsx",
                    lineNumber: 284,
                    columnNumber: 9
                }, this);
            }
            if (type === 'text' && content?.text) {
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chatui$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Bubble"], {
                    content: content.text
                }, void 0, false, {
                    fileName: "[project]/src/app/dashboard/components/ChatComponent.tsx",
                    lineNumber: 298,
                    columnNumber: 14
                }, this);
            }
            if (type === 'markdown' && content) {
                const text = typeof content === 'string' ? content : content?.text || '';
                const html = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$marked$2f$lib$2f$marked$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["marked"].parse(text);
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        padding: '0.8rem'
                    },
                    className: "markdown-content bg-white/5 rounded-lg",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            dangerouslySetInnerHTML: {
                                __html: html
                            }
                        }, void 0, false, {
                            fileName: "[project]/src/app/dashboard/components/ChatComponent.tsx",
                            lineNumber: 307,
                            columnNumber: 11
                        }, this),
                        isStreaming && msg.position === 'left' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center space-x-2 mt-3 border-t border-white/10 pt-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex space-x-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-2 h-2 rounded-full bg-indigo-400 animate-pulse",
                                            style: {
                                                animationDelay: '0ms'
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/components/ChatComponent.tsx",
                                            lineNumber: 312,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-2 h-2 rounded-full bg-indigo-400 animate-pulse",
                                            style: {
                                                animationDelay: '300ms'
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/components/ChatComponent.tsx",
                                            lineNumber: 313,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-2 h-2 rounded-full bg-indigo-400 animate-pulse",
                                            style: {
                                                animationDelay: '600ms'
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/components/ChatComponent.tsx",
                                            lineNumber: 314,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/dashboard/components/ChatComponent.tsx",
                                    lineNumber: 311,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-sm text-indigo-300",
                                    children: t('chat.generating')
                                }, void 0, false, {
                                    fileName: "[project]/src/app/dashboard/components/ChatComponent.tsx",
                                    lineNumber: 316,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/dashboard/components/ChatComponent.tsx",
                            lineNumber: 310,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/dashboard/components/ChatComponent.tsx",
                    lineNumber: 306,
                    columnNumber: 9
                }, this);
            }
            // 处理 think 类型消息
            if (type === 'think' && content) {
                console.log('Think 消息接收到:', content);
                try {
                    // 将 think 内容保存到 ref 中，这样 useEffect 可以检测到并更新 ThinkContext
                    if (content.parsedContent) {
                        // thinkContentRef.current = JSON.stringify(content.parsedContent);
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
                                lineNumber: 341,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/dashboard/components/ChatComponent.tsx",
                            lineNumber: 340,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/dashboard/components/ChatComponent.tsx",
                        lineNumber: 339,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/dashboard/components/ChatComponent.tsx",
                    lineNumber: 338,
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
                                lineNumber: 369,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/dashboard/components/ChatComponent.tsx",
                            lineNumber: 368,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/dashboard/components/ChatComponent.tsx",
                        lineNumber: 367,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/dashboard/components/ChatComponent.tsx",
                    lineNumber: 366,
                    columnNumber: 9
                }, this);
            }
            return null;
        }
    }["ChatComponent.useCallback[renderMessageContent]"], [
        isStreaming
    ]); // 添加 isStreaming 作为依赖项，确保状态变化时函数重新创建
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
    // 使用全局配置文件中的函数获取快速回复选项
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "h-full flex flex-col bg-transparent p-4",
        children: [
            isTyping && !isStreaming && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "px-4 py-2 text-xs text-gray-500",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex space-x-1 mr-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-1.5 h-1.5 rounded-full bg-gray-400 animate-pulse",
                                    style: {
                                        animationDelay: '0ms'
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/src/app/dashboard/components/ChatComponent.tsx",
                                    lineNumber: 427,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-1.5 h-1.5 rounded-full bg-gray-400 animate-pulse",
                                    style: {
                                        animationDelay: '300ms'
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/src/app/dashboard/components/ChatComponent.tsx",
                                    lineNumber: 428,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-1.5 h-1.5 rounded-full bg-gray-400 animate-pulse",
                                    style: {
                                        animationDelay: '600ms'
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/src/app/dashboard/components/ChatComponent.tsx",
                                    lineNumber: 429,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/dashboard/components/ChatComponent.tsx",
                            lineNumber: 426,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: t('chat.typing', '对方正在输入...')
                        }, void 0, false, {
                            fileName: "[project]/src/app/dashboard/components/ChatComponent.tsx",
                            lineNumber: 431,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/dashboard/components/ChatComponent.tsx",
                    lineNumber: 425,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/dashboard/components/ChatComponent.tsx",
                lineNumber: 424,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chatui$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                navbar: {
                    title: ''
                },
                messages: messages,
                renderMessageContent: renderMessageContent,
                onSend: isStreaming ? ()=>{} : handleSend,
                locale: "en",
                placeholder: isStreaming ? t('chat.placeholder') : t('chat.placeholder'),
                ref: chatRef,
                toolbar: [],
                quickReplies: isStreaming ? [] : (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$quickReplies$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getQuickRepliesByRole"])(currentRole),
                onQuickReplyClick: isStreaming ? ()=>{} : handleQuickReplyClick
            }, void 0, false, {
                fileName: "[project]/src/app/dashboard/components/ChatComponent.tsx",
                lineNumber: 435,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/dashboard/components/ChatComponent.tsx",
        lineNumber: 422,
        columnNumber: 5
    }, this);
}
_s(ChatComponent, "z/i/4X2iCeoX1d/5v8SR1520EzM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$useTranslation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslation"],
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

//# sourceMappingURL=src_3f6c0142._.js.map