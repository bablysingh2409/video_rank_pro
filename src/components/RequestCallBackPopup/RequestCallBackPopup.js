import React, { useState } from 'react'
import style from './RequestCallBackPopup.module.css'

function RequestCallBackPopup({setPopupBtn}) {
    const [name,setName]=useState('');
    const [contactNumber,setContactNumber]=useState('');

    const handleSubmit=()=>{
        setPopupBtn(false);
    }

  return (
    <div className={style.callBack_popup_container}>
         <h1>Request a Callback </h1>
      <form  className={style.popup_form}> 
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder='Enter Name' />
        <input type="text" value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} placeholder='Enter Mobile Number' />
        <button type="button" onClick={handleSubmit}>Request a call back</button>
      </form>
    </div>
  )
}

export default RequestCallBackPopup