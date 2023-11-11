import React, { useState, useEffect } from "react";
import gsap from "gsap";
import logo from "../../assets/images/logo.svg";
import guideIcon from "../../assets/images/icon-guide.svg";
import clearIcon from "../../assets/images/icon-clear.svg";
import lineIcon from "../../assets/images/icon-line.svg";
import arrowIcon from "../../assets/images/icon-arrow.svg";
import "./Calculator.css";


const intRegex = /^[\u06F0-\u06F90-9]+$/;

const Calculator = ({swap}) => {

    const [firstTime, setFirstTime] = useState(true);
    const [currentGPA, setCurrentGPA] = useState();
    const [unitsPassed, setUnitsPassed] = useState();
    const [wholeUnits, setWholeUnits] = useState();
    const [goalGPA, setGoalGPA] = useState();
    const [minGPA, setMinGPA] = useState(0);

    const fieldsAttributes = [
        {
            label: "معدل کل الانت",
            value: currentGPA,
            setValue: setCurrentGPA
        },
        {
            label: "تعداد واحدایی که پاس کردی",
            value: unitsPassed,
            setValue: setUnitsPassed
        },
        {
            label: "تعداد واحدایی که برای فارغ‌التحصیلی باید پاس کنی",
            value: wholeUnits,
            setValue: setWholeUnits
        },
        {
            label: "معدل کل هدفت",
            value: goalGPA,
            setValue: setGoalGPA
        }
    ];

    useEffect(() => {
        if (currentGPA && unitsPassed && wholeUnits && goalGPA) {
            gsap.to(".line-icon", {
                duration: 1.5,
                ease: "power2.out",
                scale: 1
            });
        } else {
            gsap.to(".line-icon", {
                duration: 0.75,
                ease: "power2.in",
                scale: 0
            });
        }
    }, [currentGPA, unitsPassed, wholeUnits, goalGPA]);

    const handleSubmit = event => {
        event.preventDefault();
        setFirstTime(false);
        if (currentGPA && intRegex.test(unitsPassed) && intRegex.test(wholeUnits) && goalGPA) {
            gsap.to([".result-possible", ".result-impossible"], {
                duration: 0.001,
                display: "flex",
                opacity: 0
            });
            gsap.fromTo(".arrow-icon",
            {
                scale: 0
            },
            {
                duration: 0.75,
                ease: "power2.out",
                scale: 1
            });
            const temp1 = wholeUnits - unitsPassed;
            const temp2 = ((goalGPA * wholeUnits) - (unitsPassed * currentGPA)) / temp1;
            setMinGPA(temp2);
            let element = ".result-possible";
            if (
                !(
                    0 < temp1 && temp1 % 1 === 0
                    && 0 <= temp2 && temp2 <= 20
                )
            ) {
                element = ".result-impossible"
                gsap.to(".result-possible", {
                    display: "none"
                });
            }
            gsap.fromTo(element,
            {
                opacity: 0
            },
            {
                duration: 1.5,
                delay: 0.75,
                ease: "power2.out",
                opacity: 1
            });
        }
    };

    return (
        <section className="calculator-wrapper">
            <img className="guide-icon" src={guideIcon} alt="" onClick={swap} />
            <img className="logo" src={logo} alt="" />
            <form onSubmit={handleSubmit} noValidate={true}>
                {
                    fieldsAttributes.map((fieldAttributes, index) =>
                        <Field
                            key={index}
                            firstTime={firstTime}
                            label={fieldAttributes.label}
                            value={fieldAttributes.value}
                            setValue={fieldAttributes.setValue}
                        />
                    )
                }
                <img className="line-icon" src={lineIcon} alt="" />
                <button type="submit">محاسبه</button>
                <img className="arrow-icon" src={arrowIcon} alt="" />
            </form>
            <div className="result-possible">
                <span>{minGPA.toFixed(2)}</span>
                <span>معدل هدفت برای ترمای باقی مونده‌ست!</span>
            </div>
            <span className="result-impossible">
                با نمرات الانت نمیتونی به هدفت برسی :(
            </span>
        </section>
    );
};


const Field = ({firstTime, label, value, setValue}) => {
    return (
        <div className="field">
            <label>{label}:</label>
            <div className="main">
                <input
                    type="number"
                    value={value}
                    onChange={event => setValue(event.target.value)}
                />
                {
                    value &&
                    <img className="clear-icon" src={clearIcon} alt="" onClick={() => setValue("")} />
                }
                <div className="error">
                    {
                        ((!firstTime && !value) ||
                        (!firstTime && label.includes("واحدایی") && !intRegex.test(value))) &&
                        <i className="fa-solid fa-triangle-exclamation"></i>
                    }
                    <span>
                        {
                            !firstTime && !value ?
                            "لطفا فیلد رو پر کن" :
                            !firstTime && label.includes("واحدایی") && !intRegex.test(value) &&
                            "تعداد واحد نامعتبر"
                        }
                    </span>
                </div>
            </div>
        </div>
    );
};


export default Calculator;