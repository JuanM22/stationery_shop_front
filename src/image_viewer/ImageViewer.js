import React, { useRef, useEffect } from "react";
import { Carousel as NativeCarousel } from "@fancyapps/ui/src/Carousel/Carousel";
import './ImageViewer.css';

function ImageViewer(props) {

    const pictures = props.productPics.map((item, index) => {
        return (
            "<img data-fancybox class='img-fluid border border-info border-3 rounded float-start' src='" + item + "' alt='pic_1' />"
        )
    });

    const wrapper = useRef(null);

    useEffect(() => {
        const items = pictures || [];
        const opts = props.options || {};

        opts.slides = [...items].map((val) => {
            return {
                html: val,
                center: true,
                fill: true,
                friction: 0.8
            };
        });

        const instance = new NativeCarousel(wrapper.current, opts);

        return () => {
            instance.destroy();
        };
    });

    return <div id="pictures_container" className={`carousel ${props.class || ""}`} ref={wrapper}></div>;
}

export default ImageViewer;