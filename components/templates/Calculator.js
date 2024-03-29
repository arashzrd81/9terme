import React, { useState, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import Field from "@/components/modules/Field";
import logo from "@/public/images/logo.svg";
import guideIcon from "@/public/images/icon-guide.svg";
import lineIcon from "@/public/images/icon-line.svg";
import arrowIcon from "@/public/images/icon-arrow.svg";


const intRegex = /^[\u06F0-\u06F90-9]+$/;

const Calculator = ({ swap }) => {

    const [firstTime, setFirstTime] = useState(true);
    const [currentGPA, setCurrentGPA] = useState({
        value: "",
        error: false
    });
    const [unitsPassed, setUnitsPassed] = useState({
        value: "",
        error: false
    });
    const [wholeUnits, setWholeUnits] = useState({
        value: "",
        error: false
    });
    const [goalGPA, setGoalGPA] = useState({
        value: "",
        error: false
    });
    const [errorMessage, setErrorMessage] = useState("");
    const [minGPA, setMinGPA] = useState(0);

    const fieldsAttributes = [
        {
            label: "معدل کل",
            state: currentGPA,
            setState: setCurrentGPA
        },
        {
            label: "تعداد واحدهایی که پاس کردی",
            state: unitsPassed,
            setState: setUnitsPassed
        },
        {
            label: "تعداد واحدهای رشته (مثلا برق 140)",
            state: wholeUnits,
            setState: setWholeUnits
        },
        {
            label: "معدل کل هدفت",
            state: goalGPA,
            setState: setGoalGPA
        }
    ];

    useEffect(() => {
        if (firstTime) {
            if (currentGPA.value && unitsPassed.value && wholeUnits.value && goalGPA.value) {
                gsap.to(".line-cover", {
                    duration: 0.35,
                    scaleY: 0,
                    transformOrigin: "center bottom"
                });
                setFirstTime(false);
            }
        }
    }, [firstTime, currentGPA.value, unitsPassed.value, wholeUnits.value, goalGPA.value]);

    const handleValidate = () => {
        let errors = [false, false, false, false];
        fieldsAttributes.forEach((fieldAttributes, index) => {
            if (!fieldAttributes.state.value) {
                fieldAttributes.setState({
                    ...fieldAttributes.state,
                    error: true
                });
                errors[index] = true;
                setErrorMessage("لطفا فیلدها رو پر کن");
            }
        });
        if (!errors.includes(true)) {
            if (!intRegex.test(unitsPassed.value)) {
                setUnitsPassed({
                    ...unitsPassed,
                    error: true
                });
                errors[1] = true;
                setErrorMessage("تعداد واحد نمیتونه اعشاری باشه");
            }
            if (!intRegex.test(wholeUnits.value)) {
                setWholeUnits({
                    ...wholeUnits,
                    error: true
                });
                errors[2] = true;
                setErrorMessage("تعداد واحد نمیتونه اعشاری باشه");
            }
            if (!errors.includes(true)) {
                if (Number(wholeUnits.value) < Number(unitsPassed.value)) {
                    setUnitsPassed({
                        ...unitsPassed,
                        error: true
                    });
                    errors[1] = true;
                    setWholeUnits({
                        ...wholeUnits,
                        error: true
                    });
                    errors[2] = true;
                    setErrorMessage("واحدهای رشته کمتر از واحدهای پاس کرده هستن");
                } else {
                    setErrorMessage("");
                }
            }
        }
        fieldsAttributes.forEach((fieldAttributes, index) => {
            if (!errors[index]) {
                fieldAttributes.setState({
                    ...fieldAttributes.state,
                    error: false
                });
            }
        });

        return errors;
    };

    const handleCalculate = () => {
        const unitsDiff = Number(wholeUnits.value) - Number(unitsPassed.value);
        const result = (
            (Number(goalGPA.value) * Number(wholeUnits.value)) -
            (Number(unitsPassed.value) * Number(currentGPA.value))
        ) / unitsDiff;

        return { unitsDiff, result };
    };

    const handleTransitions = (unitsDiff, result) => {
        gsap.to(".arrow-cover", {
            duration: 0.35,
            scaleY: 0,
            transformOrigin: "center bottom"
        });
        gsap.to([".result-possible *", ".result-impossible"], {
            duration: 0,
            display: "flex",
            opacity: 0
        });
        if (
            !(
                0 < unitsDiff && unitsDiff % 1 === 0
                && 0 <= result && result <= 20
            )
        ) {
            gsap.to(".result-possible *", {
                duration: 0,
                display: "none"
            });
            gsap.to(".result-impossible", {
                duration: 0.35,
                delay: 0.35,
                opacity: 1
            });
        } else {
            [".result-possible :nth-child(1)", ".result-possible :nth-child(2)"].forEach(
                (element, index) => {
                    gsap.to(element, {
                        duration: 0.35,
                        delay: index * 0.35 + 0.35,
                        opacity: 1
                    });
                }
            )
        }
    };

    const handleSubmit = async event => {
        event.preventDefault();
        const errors = handleValidate();
        if (!errors.includes(true)) {
            const {unitsDiff, result} = handleCalculate();
            if (result !== minGPA) {
                setMinGPA(result);
                handleTransitions(unitsDiff, result);
                await fetch("/api", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    }
                });
            }
        } else {
            setMinGPA(0);
            gsap.to(".arrow-cover", {
                duration: 0,
                scaleY: 1
            });
            gsap.to([".result-possible *", ".result-impossible"], {
                duration: 0,
                opacity: 0
            });
        }
    };

    return (
        <div className="calculator-wrapper">
            <Image className="guide-icon" src={guideIcon} onClick={swap} />
            <Image className="logo" src={logo} />
            <form onSubmit={handleSubmit} noValidate={true}>
                {
                    fieldsAttributes.map((fieldAttributes, index) =>
                        <Field key={index} fieldAttributes={fieldAttributes} />
                    )
                }
                <div className="line-wrapper">
                    <Image className="line-icon" src={lineIcon} />
                    <span className="line-cover"></span>
                </div>
                <button type="submit">محاسبه</button>
                {
                    errorMessage &&
                    <div className="error">
                        <i className="fa-solid fa-triangle-exclamation"></i>
                        <span>{errorMessage}</span>
                    </div>
                }
                <div className="arrow-wrapper">
                    <Image className="arrow-icon" src={arrowIcon} />
                    <span className="arrow-cover"></span>
                </div>
            </form>
            <div className="result-possible">
                <span>{minGPA.toFixed(2)}</span>
                <span>(معدل هدفت برای ترمای باقی‌مونده)</span>
            </div>
            <span className="result-impossible">
                با نمرات الانت نمیتونی به هدفت برسی :(
            </span>
        </div>
    );
};


export default Calculator;