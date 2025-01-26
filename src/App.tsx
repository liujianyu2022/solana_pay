
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react'
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui'
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base'
import { PhantomWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets'
import { DEVNET_QUICK_NODE } from './api/constants'
import { useRoutes } from 'react-router-dom'
import routes from './router/router'

function App() {
  // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
  const network = WalletAdapterNetwork.Devnet;

  console.log("network = ", network)

  const elements = useRoutes(routes)

  // @solana/wallet-adapter-wallets includes all the adapters but supports tree shaking and lazy loading --
  // Only the wallets you configure here will be compiled into your application, and only the dependencies
  // of wallets that your users connect to will be loaded.
  const wallets = [
    new PhantomWalletAdapter(),
    new SolflareWalletAdapter({ network }),
  ];

  return (
    <ConnectionProvider endpoint={DEVNET_QUICK_NODE}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          {elements}
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
}

export default App