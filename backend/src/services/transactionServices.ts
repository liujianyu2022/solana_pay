import { Connection, PublicKey, SystemProgram, Transaction } from '@solana/web3.js';

const DEVNET_QUICK_NODE = "https://young-restless-bridge.solana-devnet.quiknode.pro/64df14141046ed00f4320d627db7e1119aef0b52";

// service 处理业务逻辑
// 如果需要进行数据库操作，就是在这里
export async function makeTransaction(payer: string, amount: number): Promise<{ transaction: string, message: string }> {
    const connection = new Connection(DEVNET_QUICK_NODE, 'confirmed');

    // const { blockhash } = await connection.getRecentBlockhash();
    const { blockhash } = await connection.getLatestBlockhash()

    const payerPublicKey = new PublicKey(payer);
    const recipientPublicKey = new PublicKey("B4qVU2oAR3kPaL8a5C8HpkWiQjEigjtpTXD9LJq2K24t");

    // 确保 lamports 是一个整数并转换为 BigInt
    const lamports = BigInt(Math.trunc(amount * 1e9))

    // const transaction = new Transaction({
    //     recentBlockhash: blockhash,
    //     feePayer: payerPublicKey,
    // }).add(
    //     SystemProgram.transfer({
    //         fromPubkey: payerPublicKey,
    //         toPubkey: recipientPublicKey,
    //         lamports,
    //     })
    // );

    const transaction = new Transaction();
    transaction.recentBlockhash = blockhash;                      // Set the blockhash
    transaction.feePayer = payerPublicKey;                        // 用户的钱包将支付交易费用

    transaction.add(
        SystemProgram.transfer({
            fromPubkey: payerPublicKey,                           // 使用用户的钱包作为发送方
            toPubkey: recipientPublicKey,                         // 使用固定的收款钱包地址,
            lamports,
        })
    );

    const serializedTransaction = transaction.serialize({ requireAllSignatures: false });
    const base64Transaction = serializedTransaction.toString('base64');

    return {
        transaction: base64Transaction,
        message: `You are about to receive ${amount} SOL from our test backend wallet.`,
    };
}