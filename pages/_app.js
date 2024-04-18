import Head from "next/head"
import { MoralisProvider } from "react-moralis"
import Header from "../components/Header"
import "../styles/global.css"
import { NotificationProvider } from "web3uikit"
import "tailwindcss/tailwind.css"
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client"
import { NftUrlProvider } from "../hooks/useNftUrl"
import { VariablesProvider } from "../hooks/useVariables"
import { useRouter } from "next/router"
import { customTheme } from "../styles/FlowBiteTheme"
import { Flowbite } from "flowbite-react"

const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: "https://api.studio.thegraph.com/query/68005/nft-marketplace/version/latest",
})

export default function MyApp({ Component, pageProps }) {
    const router = useRouter()
    const { hostname } = router.query
    return (
        <div>
            <Head>
                <title>NFT Marketplace</title>
                <meta name="description" content="NFT Marketplace" />
                <link rel="icon" href="/ethereum_icon.ico" />
                <link
                    rel="stylesheet"
                    href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css"
                />

                <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
            </Head>
            <MoralisProvider initializeOnMount={false}>
                <ApolloProvider client={client}>
                    <NotificationProvider>
                        <NftUrlProvider>
                            <VariablesProvider>
                                <Flowbite theme={{ theme: customTheme }}>
                                    <Header />
                                    <Component {...pageProps} />
                                </Flowbite>
                            </VariablesProvider>
                        </NftUrlProvider>
                    </NotificationProvider>
                </ApolloProvider>
            </MoralisProvider>
        </div>
    )
}
