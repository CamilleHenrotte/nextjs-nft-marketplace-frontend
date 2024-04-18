import { Modal } from "flowbite-react"
import { ethers } from "ethers"
export default function ShowDescriptionModal({
    nftAddress,
    tokenId,
    tokenName,
    tokenDescription,
    seller,
    price,
    isVisible,
    onClose,
}) {
    return (
        <Modal show={isVisible} onClose={onClose}>
            <Modal.Header>{tokenName}</Modal.Header>
            <Modal.Body>
                <div className="space-y-2 text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    <p>description : {tokenDescription}</p>
                    <p>tokenId : {tokenId}</p>
                    <p>seller : {seller}</p>
                    <p>address of the nft contract : {nftAddress}</p>
                    <p>price : {ethers.utils.formatUnits(price, "ether")} ETH</p>
                </div>
            </Modal.Body>
        </Modal>
    )
}
