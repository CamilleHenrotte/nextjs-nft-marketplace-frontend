import React, { useMemo, createContext, useContext, useState, useEffect } from "react"

import { useMoralis } from "react-moralis"
import networkMapping from "../constants/networkMapping.json"
import dotenv from "dotenv"
dotenv.config()

const VariablesContext = createContext({})
const hostname = process.env.NEXT_PUBLIC_HOST_NAME

export function VariablesProvider({ children }) {
    const [marketplaceAddress, setMarketplaceAddress] = useState("")
    const [showErrorWrongNetwork, setShowErrorWrongNetwork] = useState(false)
    const { isWeb3Enabled } = useMoralis()
    const { chainId } = useMoralis()
    useEffect(() => {
        const chainIdString = chainId ? parseInt(chainId).toString() : "31337"

        try {
            setMarketplaceAddress(networkMapping[chainIdString].NftMarketplace[0])
        } catch {
            setShowErrorWrongNetwork(true)
        }
    }, [chainId])
    useEffect(() => {
        if (!isWeb3Enabled) {
            setShowErrorWrongNetwork(false)
        }
    }, [isWeb3Enabled])
    const memodValue = useMemo(
        () => ({
            showErrorWrongNetwork,
            marketplaceAddress,
            chainId,
        }),
        [showErrorWrongNetwork, marketplaceAddress, chainId]
    )
    return <VariablesContext.Provider value={memodValue}>{children}</VariablesContext.Provider>
}

export default function useVariables() {
    return useContext(VariablesContext)
}
