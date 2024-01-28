import React from "react";
import Image from "next/image";
import clearIcon from "@/public/images/icon-clear.svg";


const Field = ({ fieldAttributes }) => {

    const { label, state, setState } = fieldAttributes;

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
                    <Image
                        className="clear-icon"
                        src={clearIcon}
                        onClick={() => setState({
                            ...state,
                            value: ""
                        })}
                    />
                }
                {
                    state.error &&
                    <i className="fa-solid fa-triangle-exclamation"></i>
                }
            </div>
        </div>
    );
};


export default Field;