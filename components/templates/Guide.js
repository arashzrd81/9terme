import React from "react";
import Image from "next/image";
import Member from "@/components/modules/Member";
import logo from "@/public/images/logo.svg";
import calculatorIcon from "@/public/images/icon-calculator.svg";
import teamIcon from "@/public/images/icon-team.svg";
import hesamPfp from "@/public/images/pfp-hesam.png";
import arashPfp from "@/public/images/pfp-arash.png";
import amirPfp from "@/public/images/pfp-amir.png";


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
            profession: "توسعه دهنده‌ی Full-Stack"
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
            name: "امیر قیصربیگی",
            profession: "طراح الگوریتم و دانشمند داده"
        },
        links: [
            "amir.gheysarbeygi@gmail.com",
            "https://linkedin.com/in/amir-qeysarbeigi-177247225",
            "https://github.com/amirqeysarbeigi"
        ]
    }
];

const Guide = ({ swap }) => {
    return (
        <div className="guide-wrapper">
            <Image className="calculator-icon" src={calculatorIcon} onClick={swap} />
            <Image className="logo" src={logo} />
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
                    خب 9 ترمه با گرفتن یه سری اطلاعات ازت، همین ‌کار رو انجام میده!
                </p>
                <p>
                    حتی میتونی برای درس‌ها و ترم فعلیت هم ازش استفاده کنی!
                </p>
                <p>
                    فقط باید جای تعداد کل واحدهای رشته، واحدهای ترمت رو بذاری.
                </p>
            </div>
            <div className="team">
                <Image className="team-icon" src={teamIcon} />
                {
                    members.map((member, index) => (
                        <Member key={index} member={member} />
                    ))
                }
            </div>
        </div>
    );
};


export default Guide;