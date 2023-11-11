import React, { useRef } from "react";
import Calculator from "./components/calculator/Calculator";
import Guide from "./components/guide/Guide";
import "./App.css";


const App = () => {

    const containerRef = useRef();

    const swap = event => {
        const clickedCard = event.target.parentNode;
        const backCard = containerRef.current.firstChild;
        const frontCard = containerRef.current.lastChild;
        if (clickedCard === frontCard) {
            backCard.style.animation = "back-card-sliding 1200ms forwards";
            frontCard.style.animation = "front-card-sliding 1200ms forwards";
            setTimeout(() => {
                backCard.style.animation = "";
                frontCard.style.animation = "";
                containerRef.current.prepend(frontCard);
            }, 1200);
        }
    };

    return (
        <main ref={containerRef} className="container">
            <Guide swap={swap} />
            <Calculator swap={swap} />
        </main>
    );
};


export default App;