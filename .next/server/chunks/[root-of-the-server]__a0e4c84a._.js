module.exports = {

"[project]/.next-internal/server/app/api/chat-bot1/route/actions.js [app-rsc] (server actions loader, ecmascript)": (function(__turbopack_context__) {

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
async function handleChatRequest(request, apiKey) {
    try {
        const { message, role, conversationId, language } = await request.json();
        console.log("Chat API 请求:", {
            message,
            role,
            conversationId,
            language
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
        // 异步处理流
        (async ()=>{
            try {
                while(true){
                    const { done, value } = await reader.read();
                    if (done) {
                        await writer.close();
                        break;
                    }
                    // 解码二进制数据
                    const chunk = new TextDecoder().decode(value);
                    const lines = chunk.split("\n");
                    for (const line of lines){
                        if (line.startsWith("data: ") && line.length > 6) {
                            const data = line.slice(6);
                            if (data === "[DONE]") {
                                continue;
                            }
                            try {
                                const parsedData = JSON.parse(data);
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
                                console.error('解析流数据错误:', e, data);
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
"[project]/src/app/api/chat-bot1/route.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "POST": (()=>POST)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$api$2f$utils$2f$chatApiHandler$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/api/utils/chatApiHandler.ts [app-route] (ecmascript)");
;
async function POST(request) {
    // 使用通用处理函数，传入特定的API密钥
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$api$2f$utils$2f$chatApiHandler$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["handleChatRequest"])(request, process.env.DIFY_API_KEY_1 || '');
}
}}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__a0e4c84a._.js.map