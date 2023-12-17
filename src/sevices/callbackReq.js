import axios from "axios"

export const sendCallBackReq=async (userData)=>{
    const res=await axios.post("http://localhost:5004/callback/request",userData);
    // const data= await res.data;
    return res.status
}