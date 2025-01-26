import { makeTransaction } from "./makeTransaction";

const { createServer, IncomingMessage, ServerResponse } = require('http');


// Utility to parse JSON request body
const parseRequestBody = async (req: typeof IncomingMessage): Promise<any> => {
    return new Promise((resolve, reject) => {
        let body = '';
        req.on('data', (chunk: any) => (body += chunk));
        req.on('end', () => {
            try {
                resolve(JSON.parse(body));
            } catch (err) {
                reject(err);
            }
        });
    });
}


// Handle HTTP requests
const requestHandler = async (req: typeof IncomingMessage, res: typeof ServerResponse) => {

    // Add CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

    // Handle OPTIONS preflight requests
    if (req.method === 'OPTIONS') {
        res.writeHead(204, { 'Content-Type': 'text/plain' })
        res.end()
        return
    }

    // Handle POST request
    if (req.method === 'POST' && req.url.startsWith('/api/makeTransaction')) {
        try {
            
            const body = await parseRequestBody(req)            // Parse the request body
            const payer = body?.payer                           // 用户钱包地址
            const amount = body?.amount                         // 支付的金额, 单位为SOL

            // Validate the input
            if (!payer || !amount) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Missing "payer" or "amount" in request body' }));
                return
            }

            const base64Transaction = await makeTransaction(payer, amount)

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(
                JSON.stringify({
                    transaction: base64Transaction,
                    message: `You are about to receive ${amount} SOL from our test backend wallet.`,
                })
            );

        } catch (err: any) {
            console.error('Error handling request:', err);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Internal Server Error', details: err.message }));
        }
    } else {

        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Not Found' }));
    }
};

// Create and start the server
const PORT = 3005;
const server = createServer(requestHandler);

server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
