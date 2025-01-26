const { Connection, PublicKey, SystemProgram, Transaction } = require('@solana/web3.js');

const DEVNET_QUICK_NODE = "https://young-restless-bridge.solana-devnet.quiknode.pro/64df14141046ed00f4320d627db7e1119aef0b52"

export async function makeTransaction(payer: string, amount: number): Promise<string> {

        const connection = new Connection(DEVNET_QUICK_NODE, 'confirmed')               // Initialize Solana connection

        const { blockhash } = await connection.getRecentBlockhash()                     // Fetch the latest blockhash from the network

        const payerPublicKey = new PublicKey(payer);

        // 固定的收款钱包地址
        const recipientPublicKey = new PublicKey("B4qVU2oAR3kPaL8a5C8HpkWiQjEigjtpTXD9LJq2K24t");

        // Define the amount of SOL to transfer (e.g., 0.001 SOL)
        const lamports = amount * 1e9

        // Create a Solana transfer transaction
        const transaction = new Transaction({
            recentBlockhash: blockhash,                             // Set the blockhash
            feePayer: payerPublicKey,                                // 用户的钱包将支付交易费用
        }).add(
            SystemProgram.transfer({
                fromPubkey: payerPublicKey,                          // 使用用户的钱包作为发送方
                toPubkey: recipientPublicKey,                       // 使用固定的收款钱包地址,
                lamports,
            })
        );

        // Serialize the transaction and encode it as Base64
        const serializedTransaction = transaction.serialize({ requireAllSignatures: false });
        const base64Transaction = serializedTransaction.toString('base64')

        return base64Transaction
}