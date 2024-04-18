import { useQuery, gql } from "@apollo/client"
import Carousel from "./Carousel"
import { useState, useEffect } from "react"

const GET_ACTIVE_ITEMS = gql`
    {
        activeItems(first: 50, where: { buyer: "0x0000000000000000000000000000000000000000" }) {
            id
            buyer
            seller
            nftAddress
            tokenId
            price
        }
    }
`
export default function GraphQueries() {
    const { loading, error, data: listedNfts } = useQuery(GET_ACTIVE_ITEMS)
    const [groupedNfts, setGroupedNfts] = useState([])
    useEffect(() => {
        setGroupedNfts(
            listedNfts?.activeItems.reduce((acc, obj) => {
                const key = obj.nftAddress
                if (!acc[key]) {
                    acc[key] = []
                }
                acc[key].push(obj)
                return acc
            }, {})
        )
    }, [listedNfts])

    return (
        <div className="space-y-10 m-4 ">
            {loading || !groupedNfts ? (
                <div>Loading...</div>
            ) : (
                Object.keys(groupedNfts).map((nftAddress) => {
                    return <Carousel key={nftAddress} nfts={groupedNfts[nftAddress]} />
                })
            )}
        </div>
    )
}
