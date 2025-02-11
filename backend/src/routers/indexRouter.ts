import { Next, ParameterizedContext } from "koa"
import IndexRouter from "koa-router"

// const IndexRouter = require("koa-router")

let indexRouter = new IndexRouter({prefix: ""})

indexRouter.get("/", (ctx: ParameterizedContext, next: Next)=>{
    // 你的处理逻辑
    ctx.body = { message: 'Specific route!' }
    next()
})

export default indexRouter