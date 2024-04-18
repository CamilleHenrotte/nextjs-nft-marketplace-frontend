import React, { useState } from "react"

const TruncatedString = ({ text, maxLength }) => {
    const [isHovered, setIsHovered] = useState(false)

    const handleMouseEnter = () => {
        setIsHovered(true)
    }

    const handleMouseLeave = () => {
        setIsHovered(false)
    }

    const truncatedText = text?.length > maxLength ? text.slice(0, maxLength) + "..." : text

    return (
        <span
            title={text}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="!text-grey"
        >
            {isHovered ? text : truncatedText}
        </span>
    )
}

export default TruncatedString
