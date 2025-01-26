
import { useWallet } from '@solana/wallet-adapter-react'

import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { Connection, Transaction } from '@solana/web3.js'

import { DEVNET_QUICK_NODE } from '../../api/constants'
import { useLocation, useNavigate } from 'react-router-dom'

import { makeTransaction } from '../../api/checkout'
import React from 'react'

// Read the URL query (which includes our chosen products)
// const searchParams = new URLSearchParams()

export default function Checkout() {
    const navigate = useNavigate()
    const location = useLocation()

    const { publicKey, sendTransaction } = useWallet()

    // State to hold API response fields
    const [transaction, setTransaction] = React.useState<Transaction | null>(null)

    const [message, setMessage] = React.useState<string | null>(null)

    const connection = React.useMemo(() => new Connection(DEVNET_QUICK_NODE, 'confirmed'), []);


    // React.useEffect(() => {
    //     location.state.forEach((item: { name: string, number: number }) => {
    //         searchParams.append(item.name, String(item.number))
    //     })
    // }, [])

    React.useEffect(() => {
        if (publicKey){
            // makeTransactions({ account: publicKey.toString() })
            // console.log("searchParams = ", searchParams)
        } 
    }, [publicKey])

    // Send the transaction once it's fetched
    React.useEffect(() => {
        if (transaction) trySendTransaction()
    }, [transaction])


    // Use our API to fetch the transaction for the selected items
    const makeTransactions = async (obj: { account: string }) => {
        try {
            const response = await makeTransaction(obj)

            if (response.status === 200) {

                // Deserialize the transaction from the response
                const transaction = Transaction.from(
                    Buffer.from(response.data.transaction, 'base64')
                )
                setTransaction(transaction)
                setMessage(response.data.message)

                console.log("transaction = ", transaction)

            } else {
                throw Error(response.data)
            }
        } catch (error: any) {
            console.log("error = ", error)
        }
    }

    // Send the fetched transaction to the connected wallet
    const trySendTransaction = async () => {

        try {
            if (!publicKey) {
                console.error("Wallet is not connected");
                setMessage("Please connect your wallet");
                return;
            }

 
            // Check wallet balance before sending the transaction
            const balance = await connection.getBalance(publicKey);
            console.log('Wallet balance:', balance / 1e9)


            // Proceed with sending the transaction if balance is sufficient
            const transactionSignature = await sendTransaction(transaction!, connection);

            console.log("transactionSignature = ", transactionSignature)

            const signatureInfo = await connection.getSignaturesForAddress(publicKey)

            if (signatureInfo.length === 0) throw new Error('Transaction not found')

            navigate('/confirmed')
        } catch (error: any) {
            console.error("trySendTransaction = ", error);
        }
    }

    if (!publicKey) {
        return (
            <div className="flex flex-col items-center gap-8">
                <div>Cancel</div>
                <WalletMultiButton />
                <p>You need to connect your wallet to make transactions</p>
            </div>
        )
    }

    return (
        <div className="flex flex-col items-center gap-8">
            <WalletMultiButton />
            {
                message ? <p>{message} Please approve the transaction using your wallet</p> : <p>Creating transaction... </p>
            }
        </div>
    )
}
