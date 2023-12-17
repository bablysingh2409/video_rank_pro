import React, { useState } from 'react'
import style from './Navbar.module.css'
import { Outlet } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import RequestCallBackPopup from '../RequestCallBackPopup/RequestCallBackPopup'


function Navbar() {
  const {id}=useParams();
  const [popupBtn,setPopupBtn]=useState(false)

  return (
    <>
    <div className={style.nav_container}>
        <h1 className={style.nav_logo}>anchors</h1>
        <p style={{display:(!id?'none':'block')}} onClick={()=>setPopupBtn(true)}>Request a call back</p>
        {popupBtn?<RequestCallBackPopup setPopupBtn={setPopupBtn}/> :null}      
    </div>
    <Outlet/>
    </>
  )
}

export default Navbar