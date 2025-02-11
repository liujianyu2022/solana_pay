import Koa, { ParameterizedContext } from "koa";
import { koaBody } from "koa-body"
import cors from "koa-cors"
import indexRouter from "../routers/indexRouter"
import transactionRouter from "../routers/transactionRouter"

const app = new Koa()

app.use(koaBody());                 // 解析body的参数

// 使用 cors 中间件
app.use(cors({
    origin: "*"
}))

app.use(indexRouter.routes())
app.use(transactionRouter.routes())

// 统一的错误处理
// error对象是自己定义的， {code:xxx, message:""}
app.on("error", (error, ctx: ParameterizedContext) => {     
    ctx.response.body = error
})

export default app
