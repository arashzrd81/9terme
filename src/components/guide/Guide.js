import React from "react";
import logo from "../../assets/images/logo.svg";
import calculatorIcon from "../../assets/images/icon-calculator.svg";
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
        links: {
            email: "#",
            linkedin: "#",
            github: "#"
        }
    },
    {
        pfp: arashPfp,
        info: {
            name: "آرش پیرحیاتی",
            profession: "توسعه‌دهنده‌ فرانت‌اند و وب 3"
        },
        links: {
            email: "#",
            linkedin: "#",
            github: "#"
        }
    },
    {
        pfp: amirPfp,
        info: {
            name: "امیرحسین قیصربیگی",
            profession: "مهندس هوش مصنوعی"
        },
        links: {
            email: "#",
            linkedin: "#",
            github: "#"
        }
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
            <span className="dividing-line"></span>
            <div className="team">
                <h2>تیم ۹ ترمه</h2>
                {
                    members.map((member, index) => (
                        <Member
                            key={index}
                            pfp={member.pfp}
                            info={member.info}
                            links={member.links}
                        />
                    ))
                }
            </div>
        </section>
    );
};


const Member = ({pfp, info, links}) => {
    return (
        <div className="member">
            <div className="profile">
                <img src={pfp} alt="" />
                <div className="info">
                    <span>{info.name}</span>
                    <span>{info.profession}</span>
                </div>
            </div>
            <nav>
                <a href={links.email} target="blank">
                    <i class="fa-solid fa-envelope"></i>
                </a>
                <a href={links.linkedin} target="blank">
                    <i class="fa-brands fa-linkedin"></i>
                </a>
                <a href={links.github} target="blank">
                    <i class="fa-brands fa-github"></i>
                </a>
            </nav>
        </div>
    );
};


export default Guide;