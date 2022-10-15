import type { AppProps } from "next/app"
import type { NextPage } from "next"
import "@styles/globals.css"
import Head from "next/head"
import wrapper from "@store/wrapper"
import { useSelector } from "@/store"
import { useGetBasicSiteInfoQuery } from "@/services/api"
import { useMemo } from "react"
import { useRouter } from "next/router"

const App: NextPage<AppProps> = ({ Component, pageProps }) => {
    const titleSet = useSelector((state) => state.view.title)
    const { data: siteConfig } = useGetBasicSiteInfoQuery()

    const title = useMemo<string>(() => {
        if (titleSet) {
            return `${titleSet} - ${siteConfig?.settings.site_name}`
        }

        if (!siteConfig) {
            return "Loading..."
        }

        return `${siteConfig?.settings.site_name} - ${siteConfig?.settings.site_description}`
    }, [siteConfig, titleSet])

    const router = useRouter()

    return (
        <>
            <Head>
                <meta
                    name={"viewport"}
                    content={"width=device-width, initial-scale=1"}
                />

                <title>{title}</title>
                <meta
                    name={"description"}
                    content={siteConfig?.settings.site_description}
                />
                <meta property={"og:title"} content={title} />
                <meta
                    property={"og:description"}
                    content={siteConfig?.settings.site_description}
                />
                <meta property={"og:type"} content={"website"} />
                <meta
                    property={"og:url"}
                    content={
                        new URL(
                            router.asPath,
                            siteConfig?.settings.site_url ||
                                "https://example.com/"
                        ).href
                    }
                />
            </Head>
            <Component {...pageProps} />
        </>
    )
}

export default wrapper.withRedux(App)
