import React, { useEffect, useRef, useState } from "react"
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/swiper-bundle.css"
import NFTBox from "./NFTBox"
import useWindowDimensions from "../hooks/useWindowsDimensions"

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y])

const Carousel = ({ nfts }) => {
    const swiperRef = useRef(null)
    const { windowWidth } = useWindowDimensions()
    const [slidesPerView, setSlidesPerView] = useState(5)
    const goNext = () => {
        if (swiperRef.current) {
            swiperRef.current.swiper.slideNext()
        }
    }
    useEffect(() => {
        if (windowWidth < 640) {
            setSlidesPerView(1)
        }
        if (640 <= windowWidth && windowWidth <= 1280) {
            setSlidesPerView(3)
        }
        if (windowWidth > 1280) {
            setSlidesPerView(5)
        }
    }, [windowWidth])

    const goPrev = () => {
        if (swiperRef.current) {
            swiperRef.current.swiper.slidePrev()
        }
    }

    return (
        <Swiper
            ref={swiperRef}
            spaceBetween={10}
            slidesPerView={slidesPerView}
            navigation={{
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            }}
            pagination={{ type: "bullets", clickable: true }}
            scrollbar={false}
            className="customed-double-gardient "
        >
            {nfts.map((nft, index) => {
                const { price, nftAddress, tokenId, seller } = nft
                return (
                    <SwiperSlide
                        key={`${nftAddress}${tokenId}`}
                        className="customed-double-gardient py-1 "
                    >
                        <NFTBox
                            price={price}
                            nftAddress={nftAddress}
                            tokenId={tokenId}
                            seller={seller}
                        />
                    </SwiperSlide>
                )
            })}
            <button className="swiper-button-prev !text-secondary " onClick={goPrev}></button>
            <button className="swiper-button-next !text-secondary" onClick={goNext}></button>
        </Swiper>
    )
}

export default Carousel
