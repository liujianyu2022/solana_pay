import React from "react"
import ReactDOM from "react-dom/client"

import { BrowserRouter, HashRouter } from "react-router-dom"

import App from "./App"

import { Provider } from "react-redux"
import store from "./store/store"

import "./styles/index.less"
import "./styles/tailwind.css"

require('@solana/wallet-adapter-react-ui/styles.css')

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)

root.render(
    <Provider store={store}>
        <HashRouter>
            <App />
        </HashRouter>
    </Provider>
)