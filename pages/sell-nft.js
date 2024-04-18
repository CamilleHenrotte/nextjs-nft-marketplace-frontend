import { Form, useNotification } from "web3uikit"
import { useMoralis, useWeb3Contract } from "react-moralis"
import { ethers } from "ethers"
import { useEffect, useState } from "react"
import nftAbi from "../constants/BasicNft.json"
import nftMarketplaceAbi from "../constants/NftMarketplace.json"
import WrongNetworkBanner from "../components/WrongNetworkBanner"
import useVariables from "../hooks/useVariables"
import ButtonSecondary from "../components/Buttons/button-secondary"
import SellNFTForm from "../components/SellNftForm"

export default function SellNft() {
    const { runContractFunction } = useWeb3Contract()
    const { chainId, account, isWeb3Enabled } = useMoralis()
    const dispatch = useNotification()
    const [proceeds, setProceeds] = useState("0")
    const { marketplaceAddress, showErrorWrongNetwork } = useVariables()

    const handleWithdrawSuccess = () => {
        dispatch({
            type: "success",
            message: "Withdrawing proceeds",
            position: "topR",
        })
    }

    async function setupUI() {
        const returnedProceeds = await runContractFunction({
            params: {
                abi: nftMarketplaceAbi,
                contractAddress: marketplaceAddress,
                functionName: "getProceeds",
                params: {
                    seller: account,
                },
            },
            onError: (error) => console.log(error),
        })
        if (returnedProceeds) {
            setProceeds(returnedProceeds.toString())
        }
    }

    useEffect(() => {
        setupUI()
    }, [proceeds, account, isWeb3Enabled, chainId])

    return (
        <div className="container mx-auto space-y-10 px-4">
            <div className="w-[100%] max-w-[650px] space-y-6 ">
                {showErrorWrongNetwork && <WrongNetworkBanner chainId={chainId} />}
                <div className="text-grey font-bold text-[22px] ">Sell your Nft</div>
                <SellNFTForm />
            </div>
            <div className="space-y-6 ">
                <div className="text-grey font-bold text-[22px] ">
                    Withdraw {ethers.utils.formatUnits(proceeds, "ether") + " ETH"} proceeds
                </div>
                {proceeds != "0" ? (
                    <ButtonSecondary
                        onClick={() => {
                            runContractFunction({
                                params: {
                                    abi: nftMarketplaceAbi,
                                    contractAddress: marketplaceAddress,
                                    functionName: "withdrawProceeds",
                                    params: {},
                                },
                                onError: (error) => console.log(error),
                                onSuccess: () => handleWithdrawSuccess,
                            })
                        }}
                        text=""
                        type="button"
                    >
                        Withdraw
                    </ButtonSecondary>
                ) : (
                    <div className="text-grey">No proceeds detected</div>
                )}
            </div>
        </div>
    )
}
