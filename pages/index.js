import React, { useRef } from "react";
import Calculator from "@/components/templates/Calculator";
import Guide from "@/components/templates/Guide";


const Index = () => {

    const containerRef = useRef();

    const swap = event => {
        const clickedCard = event.target.parentNode;
        const backCard = containerRef.current.firstChild;
        const frontCard = containerRef.current.lastChild;
        if (clickedCard === frontCard) {
            backCard.style.animation = "back-card-sliding 1500ms forwards";
            frontCard.style.animation = "front-card-sliding 1500ms forwards";
            setTimeout(() => {
                backCard.style.animation = "";
                frontCard.style.animation = "";
                containerRef.current.prepend(frontCard);
            }, 1500);
        }
    };

    return (
        <div ref={containerRef} className="container">
            <Guide swap={swap} />
            <Calculator swap={swap} />
        </div>
    );
};


export default Index;