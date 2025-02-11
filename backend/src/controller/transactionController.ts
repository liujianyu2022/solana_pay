import { Next, ParameterizedContext } from "koa";
import { makeTransaction } from "../services/transactionServices";

export const handleMakeTransaction = async (ctx: ParameterizedContext, next: Next) => {
    try {
        const { payer, amount } = ctx.request.body;             // 直接从 ctx.request.body 获取参数
        const result = await makeTransaction(payer, amount);

        ctx.status = 200;
        ctx.body = JSON.stringify(result);

    } catch (err: any) {
        console.error('Error handling request:', err);
        ctx.status = 500;
        ctx.body = JSON.stringify({ error: 'Internal Server Error', details: err.message });
    }
}


