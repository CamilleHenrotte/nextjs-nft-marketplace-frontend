const ButtonSecondary = ({ children }) => {
    return (
        <button
            type="button"
            className="text-[16px] text-secondary   bg-lightgreen1 hover:bg-lightgreen2    font-medium rounded-full text-sm px-4 py-1.5 focus:outline-none focus:border-0 "
        >
            {children}
        </button>
    )
}

export default ButtonSecondary
