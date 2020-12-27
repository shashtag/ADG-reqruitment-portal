import React from 'react';
import moment from 'moment';

const Countdown = ({ countdown,}) => {
    let dateValue= '12-28-2020';
    let timeValue= '12:00';
    let ampmValue= 'pm';
    const unixEnddate = Number(moment(`${dateValue} ${timeValue} ${ampmValue}`, 'MM-DD-YYYY hh:mm A').format('X'));
    // console.log(moment.unix(unixEnddate).format('dddd, MMMM Do, YYYY | h:mm A'));
    return (
        <div className="countdown">
            <div className="card">
                <div className="countdown-value">{countdown.days}</div>
                <div className="countdown-unit">Days</div>
            </div>
            <div className="card">
                <div className="countdown-value">{countdown.hours}</div>
                <div className="countdown-unit">Hours</div>
            </div>
            <div className="card">
                <div className="countdown-value">{countdown.mins}</div>
                <div className="countdown-unit">Mins</div>
            </div>
            <div className="card">
                <div className="countdown-value">{countdown.secs}</div>
                <div className="countdown-unit">Secs</div>
            </div>
            <p>Counting down to {moment.unix(unixEnddate).format('dddd, MMMM Do, YYYY | h:mm A')}</p>
        </div>
    );
}

export default Countdown;






// import React from "react";
// import Countdown from "react-countdown";
//
// function CountdownRec() {
//     return (
//         <Countdown date={"2020-12-23T14:00:00"} />
//     )
// }
//
// export default CountdownRec;