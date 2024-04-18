import WrongNetworkBanner from "../components/WrongNetworkBanner"
import GraphQueries from "../components/graphQueries"
import useVariables from "../hooks/useVariables"

export default function Home() {
    const { showErrorWrongNetwork, chainId } = useVariables()
    return (
        <div className="container mx-auto">
            {showErrorWrongNetwork && <WrongNetworkBanner chainId={chainId} />}
            <h1 className="py-4 px-4 font-bold text-2xl text-grey">Recently listed</h1>
            <div className="">
                <GraphQueries />
            </div>
        </div>
    )
}
