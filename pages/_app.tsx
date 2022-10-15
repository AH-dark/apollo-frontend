import type { AppProps } from "next/app"
import type { NextPage } from "next"
import "@styles/globals.css"
import Head from "next/head"
import wrapper from "@store/wrapper"

const App: NextPage<AppProps> = ({ Component, pageProps }) => {
    return (
        <>
            <Head>
                <meta
                    name={"viewport"}
                    content={"width=device-width, initial-scale=1"}
                />
                <title></title>
            </Head>
            <Component {...pageProps} />
        </>
    )
}

export default wrapper.withRedux(App)
