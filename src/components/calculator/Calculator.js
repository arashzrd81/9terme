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
    const [currentGPA, setCurrentGPA] = useState({
        value: "",
        error: ""
    });
    const [unitsPassed, setUnitsPassed] = useState({
        value: "",
        error: ""
    });
    const [wholeUnits, setWholeUnits] = useState({
        value: "",
        error: ""
    });
    const [goalGPA, setGoalGPA] = useState({
        value: "",
        error: ""
    });
    const [minGPA, setMinGPA] = useState(0);

    const fieldsAttributes = [
        {
            label: "معدل کل الانت",
            state: currentGPA,
            setState: setCurrentGPA
        },
        {
            label: "تعداد واحدایی که پاس کردی",
            state: unitsPassed,
            setState: setUnitsPassed
        },
        {
            label: "تعداد واحدایی که برای فارغ‌التحصیلی باید پاس کنی",
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
                    duration: 1.5,
                    scaleY: 0,
                    transformOrigin: "center bottom"
                });
                setFirstTime(false);
            }
        }
    }, [firstTime, currentGPA.value, unitsPassed.value, wholeUnits.value, goalGPA.value]);

    const handleValidate = () => {
        let errors = [false, false, false, false];
        if (!intRegex.test(unitsPassed.value)) {
            setUnitsPassed({
                ...unitsPassed,
                error: "تعداد واحد نامعتبر"
            });
            errors[1] = true;
        }
        if (!intRegex.test(wholeUnits.value)) {
            setWholeUnits({
                ...wholeUnits,
                error: "تعداد واحد نامعتبر"
            });
            errors[2] = true;
        }
        fieldsAttributes.forEach((fieldAttributes, index) => {
            if (!fieldAttributes.state.value) {
                fieldAttributes.setState({
                    ...fieldAttributes.state,
                    error: "لطفا فیلد رو پر کن"
                });
                errors[index] = true;
            }
        });
        fieldsAttributes.forEach((fieldAttributes, index) => {
            if (!errors[index]) {
                fieldAttributes.setState({
                    ...fieldAttributes.state,
                    error: ""
                });
            }
        });
        return errors;
    };

    const handleCalculate = () => {
        const unitsDiff = wholeUnits.value - unitsPassed.value;
        const result = ((goalGPA.value * wholeUnits.value) - (unitsPassed.value * currentGPA.value)) / unitsDiff;
        return {
            unitsDiff,
            result
        };
    };

    const handleTransitions = (unitsDiff, result) => {
        gsap.to(".arrow-cover", {
            duration: 1.5,
            scaleY: 0,
            transformOrigin: "center bottom"
        });
        gsap.to([".result-possible", ".result-impossible"], {
            duration: 0.001,
            display: "flex",
            opacity: 0
        });
        let element = ".result-possible";
        if (
            !(
                0 < unitsDiff && unitsDiff % 1 === 0
                && 0 <= result && result <= 20
            )
        ) {
            element = ".result-impossible"
            gsap.to(".result-possible", {
                display: "none"
            });
        }
        gsap.to(element, {
            duration: 1,
            delay: 1.5,
            opacity: 1
        });
    };

    const handleSubmit = event => {
        event.preventDefault();
        const errors = handleValidate();
        if (!errors.includes(true)) {
            const {unitsDiff, result} = handleCalculate();
            if (minGPA !== result) {
                setMinGPA(result);
                handleTransitions(unitsDiff, result);
            }
        }
    };

    return (
        <section className="calculator-wrapper">
            <img className="guide-icon" src={guideIcon} alt="" onClick={swap} />
            <img className="logo" src={logo} alt="" />
            <form onSubmit={handleSubmit} noValidate={true}>
                {
                    fieldsAttributes.map((fieldAttributes, index) =>
                        <Field key={index} fieldAttributes={fieldAttributes} />
                    )
                }
                <div className="line-wrapper">
                    <img className="line-icon" src={lineIcon} alt="" />
                    <span className="line-cover"></span>
                </div>
                <button type="submit">محاسبه</button>
                <div className="arrow-wrapper">
                    <img className="arrow-icon" src={arrowIcon} alt="" />
                    <span className="arrow-cover"></span>
                </div>
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


const Field = ({fieldAttributes}) => {

    const {label, state, setState} = fieldAttributes;

    return (
        <div className="field">
            <label>{label}:</label>
            <div className="main">
                <input
                    type="number"
                    value={state.value}
                    onChange={event => setState({
                        ...state,
                        value: event.target.value
                    })}
                />
                {
                    state.value &&
                    <img
                        className="clear-icon"
                        src={clearIcon}
                        alt=""
                        onClick={() => setState({
                            ...state,
                            value: ""
                        })}
                    />
                }
                {
                    state.error &&
                    <div className="error">
                        <i className="fa-solid fa-triangle-exclamation"></i>
                        <span>{state.error}</span>
                    </div>
                }
            </div>
        </div>
    );
};


export default Calculator;