import TransactionRouter from "koa-router"

import { verifyPayerAddress, verifyAmount } from "../middleware/transactionMiddleware"

import { handleMakeTransaction } from "../controller/transactionController"

let transactionRouter = new TransactionRouter({prefix: "/api"})

transactionRouter.post("/makeTransaction", verifyPayerAddress, verifyAmount, handleMakeTransaction)


export default transactionRouter