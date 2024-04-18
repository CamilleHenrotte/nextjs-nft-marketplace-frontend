export default function ({ chainId }) {
    return (
        <div
            class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
        >
            <span class="font-medium">Error </span>
            <br />
            Network with chain id {parseInt(chainId).toString()} is not supported switch to{" "}
            <span class="font-medium">sepolia </span>network with chain id 11155111
        </div>
    )
}
