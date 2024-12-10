const ButtonPrimary = ({ children, onClick }) => {
    return (
        <button
            type="button"
            className="text-secondary  font-bold border-secondary border-2 bg-white hover:bg-lightgreen1 focus:ring-4 focus:ring-primary rounded-full text-sm px-4 py-[4px] focus:outline-none dark:focus:ring-primary"
            onClick={onClick}
        >
            {children}
        </button>
    )
}

export default ButtonPrimary
