module.exports = {

"[project]/.next-internal/server/app/api/chat-bot4/route/actions.js [app-rsc] (server actions loader, ecmascript)": (function(__turbopack_context__) {

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
"[project]/src/app/api/chat-bot4/route.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "POST": (()=>POST)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
;
// Dify API 配置
const DIFY_API_URL = 'http://haf.api.weibo.com/v1/chat-messages';
const DIFY_API_KEY = process.env.DIFY_API_KEY || 'app-eIojnVljpRicGH1Y1MMRBgzC'; // 建议使用环境变量
async function POST(request) {
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
                language: language || 'en-US' // 默认使用英文
            },
            query: message,
            response_mode: "streaming",
            conversation_id: conversationId,
            user: role || "default_user" // 用户标识，这里使用角色名称
        };
        // 发送请求到 Dify API
        const difyResponse = await fetch(DIFY_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${DIFY_API_KEY}`,
                'Accept': 'text/event-stream'
            },
            body: JSON.stringify(difyRequestBody)
        });
        if (!difyResponse.ok) {
            const errorData = await difyResponse.json();
            console.error("Dify API 错误:", errorData);
            throw new Error(`Dify API 请求失败: ${difyResponse.status} ${difyResponse.statusText}`);
        }
        // 当使用流式响应时，直接返回流
        const responseStream = difyResponse.body;
        if (!responseStream) {
            throw new Error('无法获取响应流');
        }
        // 创建一个新的 ReadableStream
        const stream = new ReadableStream({
            async start (controller) {
                // 创建一个读取器来处理流数据
                const reader = responseStream.getReader();
                let conversationId = null;
                try {
                    while(true){
                        const { done, value } = await reader.read();
                        if (done) break;
                        // 将 Uint8Array 转换为文本
                        const chunk = new TextDecoder().decode(value);
                        const lines = chunk.split('\n').filter((line)=>line.trim() !== '');
                        for (const line of lines){
                            if (line.startsWith('data: ')) {
                                const data = line.slice(6);
                                if (data === '[DONE]') continue;
                                try {
                                    const parsedData = JSON.parse(data);
                                    // 保存会话 ID
                                    if (parsedData.conversation_id && !conversationId) {
                                        conversationId = parsedData.conversation_id;
                                    }
                                    // 将数据发送到客户端
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
                                    controller.enqueue(new TextEncoder().encode(`data: ${JSON.stringify(responseChunk)}\n\n`));
                                } catch (e) {
                                    console.error('解析流数据错误:', e, data);
                                }
                            }
                        }
                    }
                } catch (error) {
                    console.error('读取流错误:', error);
                    controller.error(error);
                } finally{
                    controller.close();
                }
            }
        });
        // 返回流式响应
        return new Response(stream, {
            headers: {
                'Content-Type': 'text/event-stream',
                'Cache-Control': 'no-cache',
                'Connection': 'keep-alive'
            }
        });
    } catch (error) {
        console.error('Chat API 错误:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: '处理请求时出错',
            message: error instanceof Error ? error.message : '未知错误'
        }, {
            status: 500
        });
    }
}
}}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__c62181ed._.js.map