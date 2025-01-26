import React from "react";
import { HomepageIProps } from "../../types/HomepageTypes";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";
import Products from "../../components/Products/Products";

const HomePage: React.FC<HomepageIProps> = (props) => {
    const { publicKey } = useWallet()

    return (
        <div className="m-auto flex max-w-4xl flex-col items-stretch gap-8 pt-24">

            {/* We add the Solana wallet connect button */}
            <div className="basis-1/4">
                <WalletMultiButton className="!bg-gray-900 hover:scale-105" />
            </div>

            {/* We disable checking out without a connected wallet */}
            {/* Also the submitTarget is /buy/transaction instead of /checkout */}
            <Products enabled={publicKey !== null} />
        </div>
    )
}

export default HomePage