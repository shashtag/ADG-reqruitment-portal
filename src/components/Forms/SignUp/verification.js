import React from 'react';
import {Link} from "react-router-dom";


function Verification(props) {
    return (
        <div>
            <div className='heading'>You are all set</div>
            <div className='sub-heading'>Verification mail sent</div>
            <div style={{display: 'flex'}}>
                <div
                    className='btn btn-blue lgn-btn'
                    onClick={(event) => {
                    }}>
                    Resend mail
                </div>
                <Link to='/login' className='btn btn-blue lgn-btn'>
                    Log In
                </Link>
            </div>
        </div>
    )
}

export default Verification;