import React from "react";
import Image from "next/image";


const Member = ({ member }) => {

    const { pfp, info: { name, profession }, links } = member;

    return (
        <div className="member">
            <div className="profile">
                <Image className="pfp" src={pfp} />
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
                        <i className="fa-brands fa-instagram"></i>
                    }
                </a>
            </nav>
        </div>
    );
};


export default Member;