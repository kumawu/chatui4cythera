module.exports = {

"[project]/.next-internal/server/app/api/chat/route/actions.js [app-rsc] (server actions loader, ecmascript)": (function(__turbopack_context__) {

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
"[project]/src/app/api/utils/chatApiHandler.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "handleChatRequest": (()=>handleChatRequest)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
;
async function handleChatRequest(requestData, apiKey) {
    try {
        // 从请求数据中提取需要的字段
        const { message, role, conversationId, language, assistantIndex } = requestData;
        console.log("Chat API 请求:", {
            message,
            role,
            conversationId,
            language,
            assistantIndex
        });
        // 构建发送到 Dify 的请求体
        const difyRequestBody = {
            inputs: {
                language: language || 'zh-CN' // 使用请求中的语言或默认值
            },
            query: message,
            response_mode: "streaming",
            conversation_id: conversationId,
            user: role || "default_user" // 用户标识，这里使用角色名称
        };
        // 发送请求到 Dify API
        const difyResponse = await fetch(process.env.DIFY_API_URL || "https://api.dify.ai/v1/chat-messages", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`
            },
            body: JSON.stringify(difyRequestBody)
        });
        if (!difyResponse.ok) {
            const errorText = await difyResponse.text();
            console.error(`Dify API 错误 (${difyResponse.status}):`, errorText);
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: `Dify API 请求失败: ${difyResponse.status} ${difyResponse.statusText}`
            }, {
                status: difyResponse.status
            });
        }
        // 创建一个 TransformStream 来处理流式响应
        const { readable, writable } = new TransformStream();
        const writer = writable.getWriter();
        const encoder = new TextEncoder();
        // 处理 Dify 的流式响应
        const reader = difyResponse.body?.getReader();
        if (!reader) {
            throw new Error("无法读取响应流");
        }
        // 用于累积不完整的 JSON 数据
        let accumulatedJson = '';
        // 用于累积不完整的行数据
        let partialLine = '';
        // 异步处理流
        (async ()=>{
            try {
                while(true){
                    const { done, value } = await reader.read();
                    if (done) {
                        // 处理可能剩余的不完整数据
                        if (partialLine && partialLine.startsWith("data: ") && partialLine.length > 6) {
                            const data = partialLine.slice(6);
                            console.log('处理剩余的不完整行:', data);
                            // 尝试处理最后一个不完整的数据
                            try {
                                const jsonToProcess = accumulatedJson + data;
                                const parsedData = JSON.parse(jsonToProcess);
                                const responseChunk = {
                                    type: 'text',
                                    content: parsedData.answer || '',
                                    delta: parsedData.delta || '',
                                    position: 'left',
                                    metadata: {
                                        conversation_id: conversationId,
                                        event_type: 'message_end',
                                        created_at: new Date().toISOString()
                                    }
                                };
                                await writer.write(encoder.encode(`data: ${JSON.stringify(responseChunk)}\n\n`));
                            } catch (e) {
                                console.error('处理最后一个数据块时出错:', e);
                            }
                        }
                        await writer.close();
                        break;
                    }
                    // 解码二进制数据
                    const chunk = new TextDecoder().decode(value);
                    // 处理可能跨块的行
                    const fullData = partialLine + chunk;
                    partialLine = ''; // 重置部分行
                    // 按行分割，但保留可能不完整的最后一行
                    const lines = fullData.split("\n");
                    if (!fullData.endsWith("\n") && lines.length > 0) {
                        partialLine = lines.pop() || '';
                    }
                    for (const line of lines){
                        if (line.startsWith("data: ") && line.length > 6) {
                            const data = line.slice(6);
                            if (data === "[DONE]") {
                                continue;
                            }
                            // 尝试累积并解析 JSON 数据
                            try {
                                // 检查数据是否是有效的 JSON 格式
                                if (!data || data.trim() === '') {
                                    console.warn('收到空数据块，跳过处理');
                                    continue;
                                }
                                // 合并之前累积的数据（如果有）
                                const jsonToProcess = accumulatedJson + data;
                                let parsedData;
                                try {
                                    // 尝试解析合并后的数据
                                    parsedData = JSON.parse(jsonToProcess);
                                    // 解析成功，重置累积的数据
                                    accumulatedJson = '';
                                    console.log('JSON 解析成功');
                                } catch (parseError) {
                                    // 解析失败，检查是否是因为 JSON 不完整
                                    if (parseError instanceof SyntaxError && parseError.message.includes('Unexpected end of JSON input')) {
                                        // 可能是不完整的 JSON，累积数据等待下一个数据块
                                        accumulatedJson = jsonToProcess;
                                        console.log('累积不完整的 JSON 数据，等待下一个数据块');
                                        continue; // 跳过当前数据块，等待更多数据
                                    } else {
                                        // 其他类型的错误，尝试修复
                                        console.warn('JSON 解析失败，尝试修复数据');
                                    // // 检查字符串结构，计算左右括号数量
                                    // const leftBraces = (jsonToProcess.match(/\{/g) || []).length;
                                    // const rightBraces = (jsonToProcess.match(/\}/g) || []).length;
                                    // const missingBraces = leftBraces - rightBraces;
                                    // if (missingBraces > 0) {
                                    //   // 添加缺失的右括号
                                    //   const fixedData = jsonToProcess + '}'.repeat(missingBraces);
                                    //   console.warn(`添加了 ${missingBraces} 个右括号尝试修复 JSON`);
                                    //   try {
                                    //     parsedData = JSON.parse(fixedData);
                                    //     accumulatedJson = ''; // 重置累积数据
                                    //     console.log('修复成功！');
                                    //   } catch (fixError) {
                                    //     // 修复失败，检查是否包含 tools_data_result
                                    //     if (jsonToProcess.includes('<tools_data_result>')) {
                                    //       // 如果包含工具数据，尝试发送特殊消息
                                    //       try {
                                    //         const specialMessage = {
                                    //           type: 'text',
                                    //           content: jsonToProcess,
                                    //           position: 'left',
                                    //           metadata: {
                                    //             conversation_id: conversationId,
                                    //             event_type: 'message_end',
                                    //             created_at: new Date().toISOString()
                                    //           }
                                    //         };
                                    //         await writer.write(encoder.encode(`data: ${JSON.stringify(specialMessage)}\n\n`));
                                    //         accumulatedJson = ''; // 重置累积数据
                                    //         console.log('发送了包含 tools_data_result 的特殊消息');
                                    //         continue;
                                    //       } catch (specialError) {
                                    //         console.error('发送特殊消息失败:', specialError);
                                    //       }
                                    //     }
                                    //     // 如果不包含工具数据或特殊处理失败，尝试构造最小可用对象
                                    //     if (jsonToProcess.includes('"event":') && jsonToProcess.includes('"conversation_id":')) {
                                    //       try {
                                    //         const minimalData = `{"event": "message", "conversation_id": "${conversationId || 'unknown'}", "answer": "", "delta": ""}`;
                                    //         parsedData = JSON.parse(minimalData);
                                    //         accumulatedJson = ''; // 重置累积数据
                                    //         console.log('使用最小化数据替代');
                                    //       } catch (e) {
                                    //         console.error('无法构造最小可用数据');
                                    //         accumulatedJson = ''; // 重置累积数据，放弃这个数据块
                                    //         continue;
                                    //       }
                                    //     } else {
                                    //       accumulatedJson = ''; // 重置累积数据，放弃这个数据块
                                    //       continue;
                                    //     }
                                    //   }
                                    // } else {
                                    //   // 括号数量匹配但仍然解析失败，放弃这个数据块
                                    //   console.error('JSON 格式错误且无法修复');
                                    //   accumulatedJson = ''; // 重置累积数据
                                    //   continue;
                                    // }
                                    }
                                }
                                // 验证解析后的数据是否有效
                                if (!parsedData || typeof parsedData !== 'object') {
                                    console.warn('解析后的数据无效:', parsedData);
                                    continue;
                                }
                                const responseChunk = {
                                    type: 'text',
                                    content: parsedData.answer || '',
                                    delta: parsedData.delta || '',
                                    position: 'left',
                                    metadata: {
                                        conversation_id: conversationId,
                                        event_type: parsedData.event || 'message',
                                        created_at: new Date().toISOString()
                                    }
                                };
                                await writer.write(encoder.encode(`data: ${JSON.stringify(responseChunk)}\n\n`));
                            } catch (e) {
                                console.error('处理数据时出现意外错误:', e);
                                console.log('原始数据:', data);
                                // 重置累积数据，避免错误累积
                                accumulatedJson = '';
                                // 如果数据包含 tools_data_result 标签，尝试发送一个特殊的消息通知客户端处理
                                if (data.includes('<tools_data_result>')) {
                                    try {
                                        const specialMessage = {
                                            type: 'text',
                                            content: data,
                                            position: 'left',
                                            metadata: {
                                                conversation_id: conversationId,
                                                event_type: 'message_end',
                                                created_at: new Date().toISOString()
                                            }
                                        };
                                        await writer.write(encoder.encode(`data: ${JSON.stringify(specialMessage)}\n\n`));
                                        console.log('发送了特殊消息处理 tools_data_result');
                                    } catch (specialError) {
                                        console.error('发送特殊消息失败:', specialError);
                                    }
                                }
                            // 继续处理下一个数据块，不中断流程
                            }
                        }
                    }
                }
            } catch (error) {
                console.error('读取流错误:', error);
                await writer.abort(error);
            }
        })();
        // 返回流式响应
        return new Response(readable, {
            headers: {
                "Content-Type": "text/event-stream",
                "Cache-Control": "no-cache",
                "Connection": "keep-alive"
            }
        });
    } catch (error) {
        console.error("处理聊天请求时出错:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "处理请求时发生错误"
        }, {
            status: 500
        });
    }
}
}}),
"[project]/src/app/api/chat/route.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "POST": (()=>POST)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$api$2f$utils$2f$chatApiHandler$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/api/utils/chatApiHandler.ts [app-route] (ecmascript)");
;
;
// 根据助手索引获取对应的API密钥
function getApiKeyByIndex(index) {
    switch(index){
        case 0:
            return process.env.DIFY_API_KEY_1 || '';
        case 1:
            return process.env.DIFY_API_KEY_2 || '';
        case 2:
            return process.env.DIFY_API_KEY_3 || '';
        case 3:
            return process.env.DIFY_API_KEY_4 || '';
        default:
            return process.env.DIFY_API_KEY_4 || '';
    }
}
async function POST(request) {
    try {
        const requestData = await request.json();
        const { assistantIndex = -1 } = requestData;
        console.log("统一聊天API请求:", requestData);
        // 根据助手索引获取对应的API密钥
        const apiKey = getApiKeyByIndex(typeof assistantIndex === 'number' ? assistantIndex : -1);
        // 使用通用处理函数处理请求，传递已解析的请求数据
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$api$2f$utils$2f$chatApiHandler$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["handleChatRequest"])(requestData, apiKey);
    } catch (error) {
        console.error("处理聊天请求时出错:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "处理请求时发生错误"
        }, {
            status: 500
        });
    }
}
}}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__23ccd22b._.js.map