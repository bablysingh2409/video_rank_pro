import React, { useState } from 'react'
import style from './RequestCallBackPopup.module.css'
import { sendCallBackReq } from '../../sevices/callbackReq';
import { useNavigate } from 'react-router-dom';

function RequestCallBackPopup({ setPopupBtn }) {
    const [name, setName] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [showSuccessMsg, setShowSuccessMsg] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async () => {
        if (!name || !contactNumber) {
            return alert("both input field are required");
        }
        try {
            const statusCode = await sendCallBackReq({ name, contactNumber });
            if (statusCode == 200) {
                setShowSuccessMsg(true);

            }
            else {
                alert('your request has not sent to user');
                setPopupBtn(false);
                setShowSuccessMsg(false);

            }
        }
        catch (err) {
            alert('your call request is rejected');
        }
    }

    const handleClick = () => {
        setPopupBtn(false);
        navigate('/');

    }

    return (
        <div className={style.callBack_popup_container}>
            <h1>Request a Callback </h1>
            {showSuccessMsg ? <>
                <img className={style.success_img} src='https://www.shutterstock.com/image-vector/check-mark-icon-symbols-vector-600nw-1906113508.jpg' alt='img' />
                <p className={style.success_para}>our team will call you shortly in 12 to 24 hrs can't you wait for call?</p>
                <button className={style.success_btn} onClick={handleClick}>Check another video</button>
            </> :

                <form className={style.popup_form}>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder='Enter Name' required />
                    <input type="text" value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} placeholder='Enter Mobile Number' required />
                    <button type="button" onClick={handleSubmit}>Request a call back</button>
                </form>
            }
        </div>
    )
}

export default RequestCallBackPopup