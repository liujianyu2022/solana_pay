import { Next, ParameterizedContext } from "koa";
import { AMOUNT_ERROR, PAYER_ADDRESS_ERROR } from "../config/errorTypes";


export const verifyPayerAddress = async (ctx: ParameterizedContext, next: Next) => {
    const { payer } = ctx.request.body

    if(!payer){
        ctx.response.status = 400

        // 第二个参数的错误对象  在app.js统一处理
        ctx.app.emit("error", PAYER_ADDRESS_ERROR, ctx)

        return
    }

    await next()
}

export const verifyAmount = async (ctx: ParameterizedContext, next: Next) => {
    const { amount } = ctx.request.body

    if(!amount){
        ctx.response.status = 400

        // 第二个参数的错误对象  在app.js统一处理
        ctx.app.emit("error", AMOUNT_ERROR, ctx)
        
        return
    }

    await next()
}