import React from 'react'
import { Box, Image, AspectRatio } from "@chakra-ui/react";

import img15 from '../../assets/images/img15.jpg'
import img2 from '../../assets/images/img2.jpg'
import img3 from '../../assets/images/img3.jpg'
import img4 from '../../assets/images/Img4.jpg'
import img5 from '../../assets/images/img5.jpg'
import img6 from '../../assets/images/img6.jpg'
import img7 from '../../assets/images/img7.jpg'
import img8 from '../../assets/images/img8.jpg'
import img9 from '../../assets/images/img9.jpg'
import img13 from '../../assets/images/img13.jpg'

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination, Autoplay, EffectCoverflow } from "swiper";
import { motion } from "framer-motion";

// Import Swiper styles
import "swiper/swiper-bundle.min.css";

// Install Swiper modules
SwiperCore.use([Navigation, Pagination, Autoplay, EffectCoverflow]);

const images = [
    img15,
    img2,
    img3,
    img4,
    img5,
    img6,
    img7,
    img8,
    img9,
    img13,
    // ... add more image paths
];
export default function PortfolioGallery() {

    return (
        <Box padding="2rem" background="dark">
            <Swiper
                effect="coverflow"
                spaceBetween={10}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 3000 }}
                loop
                coverflowEffect={{
                    rotate: 50,
                    slideShadows: false,
                    depth: 100,
                    modifier: 1,
                }}
                breakpoints={{
                    640: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 30,
                    },
                }}
            >
                {images.map((src, index) => (
                    <SwiperSlide key={index}>
                        <motion.div>
                            <AspectRatio ratio={1}>
                                <Image src={src} alt="Portfolio image" borderRadius="lg" objectFit="cover" />
                            </AspectRatio>
                        </motion.div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </Box>
    )
}
