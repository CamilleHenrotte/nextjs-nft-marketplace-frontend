import React, { useMemo, createContext, useContext } from "react"
import dotenv from "dotenv"
dotenv.config()
const NftUrlContext = createContext({})
const hostname = process.env.NEXT_PUBLIC_HOST_NAME
export function NftUrlProvider({ children }) {
    const putNftUrl = async (nftAddress, tokenId, data) => {
        try {
            const path = `/api/nfts`
            let options = {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json;charset=UTF-8",
                },
            }
            let url
            if (hostname == "localhost") {
                url = `http://${hostname}:3001${path}/${nftAddress}/${tokenId}`
            } else {
                url = `https://${hostname}${path}/${nftAddress}/${tokenId}`
            }
            options["method"] = "PUT"
            options["body"] = JSON.stringify(data)
            let response = await fetch(url, options)
            response = await response.json()

            return response
        } catch (error) {
            console.log(error)
        }
    }
    const getNftUrl = async (nftAddress, tokenId) => {
        try {
            const path = `/api/nfts`
            let options = {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json;charset=UTF-8",
                },
            }
            let url
            if (hostname == "localhost") {
                url = `http://${hostname}:3001${path}/${nftAddress}/${tokenId}`
            } else {
                url = `https://${hostname}${path}/${nftAddress}/${tokenId}`
            }
            options["method"] = "GET"
            let response = await fetch(url, options)
            response = await response.json()

            return response
        } catch (error) {
            console.log(error)
        }
    }

    const memodValue = useMemo(
        () => ({
            putNftUrl,
            getNftUrl,
        }),
        []
    )
    return <NftUrlContext.Provider value={memodValue}>{children}</NftUrlContext.Provider>
}
export default function useNftUrl() {
    return useContext(NftUrlContext)
}
