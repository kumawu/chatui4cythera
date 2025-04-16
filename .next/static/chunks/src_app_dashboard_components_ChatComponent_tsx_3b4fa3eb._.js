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
    '数字能效分析师': [
        {
            name: '💡照明系统是不是开得太久了？有节省空间吗？🤔'
        },
        {
            name: '💨这几天挺热🌡️，我想知道空调用电是不是超了？🤔'
        }
    ],
    '数字环境专员': [
        {
            name: '📡冷库环境最近波动大，是不是外面太热？'
        },
        {
            name: '🚨有没有严重告警要立即处理？'
        }
    ],
    '数字设备健康主管': [
        {
            name: '🔍调出最近3天空调用电趋势，我看看变化。'
        },
        {
            name: '🛠有没有哪台空调的能耗曲线特别奇怪？'
        }
    ],
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
                // 根据 currentRole 来选择不同的 API 端点
                switch(currentRole){
                    case '数字能效分析师':
                        chatBot = '/api/chat-bot1';
                        break;
                    case '数字环境专员':
                        chatBot = '/api/chat-bot2';
                        break;
                    case '数字设备健康主管':
                        chatBot = '/api/chat-bot3';
                        break;
                    case '数字综合运营协调员':
                        chatBot = '/api/chat-bot4';
                        break;
                    default:
                        chatBot = '/api/chat-bot4';
                        break;
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
                        className: "flex items-center space-x-2 p-2",
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
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-2 h-2 rounded-full bg-indigo-400 animate-pulse",
                                        style: {
                                            animationDelay: '300ms'
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/components/ChatComponent.tsx",
                                        lineNumber: 313,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-2 h-2 rounded-full bg-indigo-400 animate-pulse",
                                        style: {
                                            animationDelay: '600ms'
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/components/ChatComponent.tsx",
                                        lineNumber: 314,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/dashboard/components/ChatComponent.tsx",
                                lineNumber: 311,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-sm text-indigo-300",
                                children: "正在生成响应..."
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/components/ChatComponent.tsx",
                                lineNumber: 316,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/dashboard/components/ChatComponent.tsx",
                        lineNumber: 310,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/dashboard/components/ChatComponent.tsx",
                    lineNumber: 309,
                    columnNumber: 9
                }, this);
            }
            if (type === 'text' && content?.text) {
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chatui$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Bubble"], {
                    content: content.text
                }, void 0, false, {
                    fileName: "[project]/src/app/dashboard/components/ChatComponent.tsx",
                    lineNumber: 323,
                    columnNumber: 14
                }, this);
            }
            if (type === 'markdown' && content) {
                const text = typeof content === 'string' ? content : content?.text || '';
                const html = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$marked$2f$lib$2f$marked$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["marked"].parse(text);
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "markdown-content p-6 bg-white/5 rounded-lg",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            dangerouslySetInnerHTML: {
                                __html: html
                            }
                        }, void 0, false, {
                            fileName: "[project]/src/app/dashboard/components/ChatComponent.tsx",
                            lineNumber: 332,
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
                                            lineNumber: 337,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-2 h-2 rounded-full bg-indigo-400 animate-pulse",
                                            style: {
                                                animationDelay: '300ms'
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/components/ChatComponent.tsx",
                                            lineNumber: 338,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-2 h-2 rounded-full bg-indigo-400 animate-pulse",
                                            style: {
                                                animationDelay: '600ms'
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/components/ChatComponent.tsx",
                                            lineNumber: 339,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/dashboard/components/ChatComponent.tsx",
                                    lineNumber: 336,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-sm text-indigo-300",
                                    children: "正在生成..."
                                }, void 0, false, {
                                    fileName: "[project]/src/app/dashboard/components/ChatComponent.tsx",
                                    lineNumber: 341,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/dashboard/components/ChatComponent.tsx",
                            lineNumber: 335,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/dashboard/components/ChatComponent.tsx",
                    lineNumber: 331,
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
    // 根据当前角色获取对应的快速回复选项
    const getQuickRepliesByRole = ()=>{
        return ROLE_QUICK_REPLIES[currentRole] || DEFAULT_QUICK_REPLIES;
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "h-full flex flex-col bg-transparent",
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
                                    lineNumber: 455,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-1.5 h-1.5 rounded-full bg-gray-400 animate-pulse",
                                    style: {
                                        animationDelay: '300ms'
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/src/app/dashboard/components/ChatComponent.tsx",
                                    lineNumber: 456,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-1.5 h-1.5 rounded-full bg-gray-400 animate-pulse",
                                    style: {
                                        animationDelay: '600ms'
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/src/app/dashboard/components/ChatComponent.tsx",
                                    lineNumber: 457,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/dashboard/components/ChatComponent.tsx",
                            lineNumber: 454,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: "对方正在输入..."
                        }, void 0, false, {
                            fileName: "[project]/src/app/dashboard/components/ChatComponent.tsx",
                            lineNumber: 459,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/dashboard/components/ChatComponent.tsx",
                    lineNumber: 453,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/dashboard/components/ChatComponent.tsx",
                lineNumber: 452,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$chatui$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                navbar: {
                    title: ''
                },
                messages: messages,
                renderMessageContent: renderMessageContent,
                onSend: isStreaming ? ()=>{} : handleSend,
                locale: "zh-CN",
                placeholder: isStreaming ? "正在生成响应..." : "请输入...",
                ref: chatRef,
                toolbar: [],
                quickReplies: isStreaming ? [] : getQuickRepliesByRole(),
                onQuickReplyClick: isStreaming ? ()=>{} : handleQuickReplyClick
            }, void 0, false, {
                fileName: "[project]/src/app/dashboard/components/ChatComponent.tsx",
                lineNumber: 463,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/dashboard/components/ChatComponent.tsx",
        lineNumber: 450,
        columnNumber: 5
    }, this);
}
_s(ChatComponent, "ghwscTqYygpxWe7nlogZOXoxSw0=", false, function() {
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