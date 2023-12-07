import React from "react";
import { useTimer } from "react-timer-hook";

function MyTimer({ expiryTimestamp }) {
    const {
        seconds,
        minutes,
        restart,
    } = useTimer({
        expiryTimestamp,
        onExpire: () => console.warn("onExpire called"),
    });

    return (
        <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "400%" }}>
                <span>{minutes}</span>:<span>{seconds}</span>
            </div>
            <a
                onClick={() => {
                    const time = new Date();
                    time.setSeconds(time.getSeconds() + 60);
                    restart(time);
                }}
            >
                Restart
            </a>
        </div>
    );
}

export default function Timer() {
    const time = new Date();
    time.setSeconds(time.getSeconds() + 60); 
    return (
        <div>
            <MyTimer expiryTimestamp={time} />
        </div>
    );
}
