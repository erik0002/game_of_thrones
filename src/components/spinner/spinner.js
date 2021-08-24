import React from "react";
import s from './spinner.module.css';


const Spinner = () => {
    return (
        <div className={s.loadingioSpinnerPulse}>
            <div className={s.ldio}>
                <div/>
                <div/>
                <div/>
            </div>
        </div>
    )
}

export default Spinner;
