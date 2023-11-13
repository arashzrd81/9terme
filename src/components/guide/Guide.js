import React from "react";
import logo from "../../assets/images/logo.svg";
import calculatorIcon from "../../assets/images/icon-calculator.svg";
import teamIcon from "../../assets/images/icon-team.svg";
import hesamPfp from "../../assets/images/pfp-hesam.png";
import arashPfp from "../../assets/images/pfp-arash.png";
import amirPfp from "../../assets/images/pfp-amir.png";
import "./Guide.css";


const members = [
    {
        pfp: hesamPfp,
        info: {
            name: "سید حسام‌الدین حسینی غنچه",
            profession: "طراح گرافیک، رابط و تجربه‌ی کاربری"
        },
        links: [
            "Hesamtek@gmail.com",
            "https://www.linkedin.com/in/hesam-hosseini-518732270?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
            "https://instagram.com/hesam_hosseini_design?igshid=YmhybzA5dWE3N2Jo"
        ]
    },
    {
        pfp: arashPfp,
        info: {
            name: "آرش پیرحیاتی",
            profession: "توسعه‌دهنده‌ی فرانت‌اند و بلاکچین"
        },
        links: [
            "ArashPirhayati1381@gmail.com",
            "https://linkedin.com/in/arashzrd81",
            "https://github.com/arashzrd81"
        ]
    },
    {
        pfp: amirPfp,
        info: {
            name: "امیرحسین قیصربیگی",
            profession: "طراح الگوریتم و دانشمند داده"
        },
        links: [
            "amir.gheysarbeygi@gmail.com",
            "https://linkedin.com/in/amir-qeysarbeigi-177247225",
            "https://github.com/amirqeysarbeigi"
        ]
    }
];

const Guide = ({swap}) => {
    return (
        <section className="guide-wrapper">
            <img className="calculator-icon" src={calculatorIcon} alt="" onClick={swap} />
            <img className="logo" src={logo} alt="" />
            <div className="text">
                <p>
                    9 ترمه قراره بهت کمک کنه متوجه
                    اوضاع نمره‌هات توی دانشگاه بشی. چجوری؟
                </p>
                <p>
                    <span>تابحال شده فکر کنی که </span>
                    <span>
                        با معدلی که الان داری، باید برای ترم‌های
                        بعد چه معدلی بیاری تا به نمره هدفت برسی؟
                    </span>
                </p>
                <p>
                    خب 9 ترمه با گرفتن یه سری اطلاعات ازت همین ‌کار رو انجام میده!
                </p>
                <p>
                    حتی میتونی برای درس ها و ترم فعلیت هم استفاده‌ش کنی!
                </p>
                <p>
                    فقط باید جای کل واحد های فارغ‌التحصیلی واحد های ترمت رو بذاری.
                </p>
            </div>
            <div className="team">
                <img className="team-icon" src={teamIcon} alt="" />
                {
                    members.map((member, index) => (
                        <Member key={index} member={member} />
                    ))
                }
            </div>
        </section>
    );
};


const Member = ({member}) => {

    const {pfp, info: {name, profession}, links} = member;

    return (
        <div className="member">
            <div className="profile">
                <img className="pfp" src={pfp} alt="" />
                <div className="info">
                    <span>{name}</span>
                    <span>{profession}</span>
                </div>
            </div>
            <nav>
                <a href={`mailto:${links[0]}`} target="blank">
                    <i className="fa-solid fa-envelope"></i>
                </a>
                <a href={links[1]} target="blank">
                    <i className="fa-brands fa-linkedin"></i>
                </a>
                <a href={links[2]} target="blank">
                    {
                        links[2].includes("github") ?
                        <i className="fa-brands fa-github"></i> :
                        <i class="fa-brands fa-instagram"></i>
                    }
                </a>
            </nav>
        </div>
    );
};


export default Guide;