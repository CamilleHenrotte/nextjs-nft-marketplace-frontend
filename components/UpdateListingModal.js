import { useState } from "react"
import { Input, useNotification } from "web3uikit"
import { useWeb3Contract } from "react-moralis"
import nftMarketplaceAbi from "../constants/NftMarketplace.json"
import { ethers } from "ethers"
import useVariables from "../hooks/useVariables"
import { Modal, Button } from "flowbite-react"

export default function UpdateListingModal({ nftAddress, tokenId, isVisible, onClose }) {
    const [priceToUpdateListingWith, setPriceToUpdateListingWith] = useState(0)
    const { marketplaceAddress } = useVariables()
    const { runContractFunction: updateListing } = useWeb3Contract({
        abi: nftMarketplaceAbi,
        contractAddress: marketplaceAddress,
        functionName: "updateListing",
        params: {
            nftAddress: nftAddress,
            tokenId: tokenId,
            newPrice: ethers.utils.parseEther(priceToUpdateListingWith || "0"),
        },
    })
    const dispatch = useNotification()
    const handleUpdateListingSuccess = async (tx) => {
        await tx.wait(1)
        dispatch({
            type: "success",
            message: "listing updated",
            title: "Listing updated - please refresh (and move blocks)",
            position: "topR",
        })
        onClose && onClose()
        setPriceToUpdateListingWith("0")
    }
    return (
        <Modal show={isVisible} onClose={onClose}>
            <Modal.Header>
                <p className="!text-primary">{`Update the price of nft #${tokenId}`}</p>
            </Modal.Header>
            <Modal.Body className="space-y-5  font-semibold text-grey">
                <p>Insert the new price in ETH:</p>
                <Input
                    label=" price "
                    name="New Listing price"
                    type="number"
                    onChange={(event) => {
                        setPriceToUpdateListingWith(event.target.value)
                    }}
                ></Input>
                <div className="flex justify-end">
                    <Button
                        color="gray"
                        onClick={() => {
                            updateListing({
                                onError: (error) => console.log(error),
                                onSuccess: handleUpdateListingSuccess,
                            })
                        }}
                        className="text-grey"
                    >
                        ok
                    </Button>
                </div>
            </Modal.Body>
        </Modal>
    )
}
