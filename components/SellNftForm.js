import { useState } from "react"
import ButtonSecondary from "./Buttons/button-secondary"
import { useNotification } from "web3uikit"
import { useMoralis, useWeb3Contract } from "react-moralis"
import { ethers } from "ethers"
import nftAbi from "../constants/BasicNft.json"
import nftMarketplaceAbi from "../constants/NftMarketplace.json"
import useVariables from "../hooks/useVariables"

const SellNFTForm = () => {
    const { runContractFunction } = useWeb3Contract()
    const { enableWeb3, isWeb3Enabled } = useMoralis()
    const dispatch = useNotification()
    const { marketplaceAddress } = useVariables()
    const [formData, setFormData] = useState({
        nftAddress: "",
        tokenId: "",
        price: 0,
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const handleSubmit = async (event) => {
        console.log("a")
        event.preventDefault()
        if (!isWeb3Enabled) {
            await enableWeb3() // Ensure Web3 is enabled
        }
        if (!isWeb3Enabled) {
            handleErrorNotConnected()
            return
        }
        console.log("Approving...")
        const nftAddress = formData.nftAddress.replace(/^\s+|\s+$/gm, "")
        if (!ethers.utils.isAddress(nftAddress)) {
            return dispatch({
                type: "error",
                title: "Error : invalid NFT address!",
                position: "topR",
            })
        }
        const tokenId = formData.tokenId
        const price = ethers.utils.parseUnits(formData.price, "ether").toString()
        const approveOptions = {
            abi: nftAbi,
            contractAddress: nftAddress,
            functionName: "approve",
            params: {
                to: marketplaceAddress,
                tokenId: tokenId,
            },
        }
        await runContractFunction({
            params: approveOptions,
            onSuccess: () => handleApproveSuccess(nftAddress, tokenId, price),
            onError: (error) => {
                handleErrorApproving()
                console.log(error)
            },
        })
    }
    async function handleApproveSuccess(nftAddress, tokenId, price) {
        console.log("Ok! Now time to list")
        const listOptions = {
            abi: nftMarketplaceAbi,
            contractAddress: marketplaceAddress,
            functionName: "listItem",
            params: {
                nftAddress: nftAddress,
                tokenId: tokenId,
                price: price,
            },
        }
        await runContractFunction({
            params: listOptions,
            onSuccess: () => handleListSuccess(),
            onError: (error) => {
                console.log(error)
                handleErrorListing(error)
            },
        })
    }

    function handleListSuccess() {
        dispatch({ type: "success", message: "NFT listing", title: "Nft listed", position: "topR" })
    }
    function handleErrorApproving(error) {
        dispatch({
            type: "error",
            message: `Error approving the marketplace address to use the nft : ${error}`,
            title: "Error",
            position: "topR",
        })
    }
    function handleErrorListing(error) {
        dispatch({
            type: "error",
            message: `Error listing the nft on the marketplace ${error}`,
            title: "Error",
            position: "topR",
        })
    }
    function handleErrorNotConnected() {
        dispatch({
            type: "error",
            message: "Please connect your wallet before listing an NFT.",
            title: "Wallet Not Connected",
            position: "topR",
        })
    }
    return (
        <form onSubmit={handleSubmit} className="space-y-3 text-gray-500">
            <input
                type="text"
                id="nftAddress"
                name="nftAddress"
                value={formData.nftAddress}
                onChange={handleChange}
                required
                className=" border border-gray-300 rounded-full px-4 py-2 w-full placeholder-gray-500  focus:outline-none focus:ring-2 focus:ring-lightgreen1 focus:border-0"
                placeholder="NFT Address"
            />

            <input
                type="number"
                id="tokenId"
                name="tokenId"
                value={formData.tokenId}
                onChange={handleChange}
                required
                className="border border-gray-300 rounded-full px-4 py-2 w-full placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-lightgreen1 focus:border-0"
                placeholder="Token ID"
            />

            <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                className="border border-gray-300 rounded-full px-4 py-2 w-full placeholder-gray-500  focus:outline-none focus:ring-2 focus:ring-lightgreen1 focus:border-0"
                placeholder="Price (in ETH)"
                // Disable arrows for number input
                onWheel={(e) => e.preventDefault()}
            />

            <button
                type="submit"
                className="text-[16px] text-secondary   bg-lightgreen1 hover:bg-lightgreen2    font-medium rounded-full text-sm px-4 py-1.5 focus:outline-none focus:border-0 "
            >
                Sell NFT
            </button>
        </form>
    )
}

export default SellNFTForm
