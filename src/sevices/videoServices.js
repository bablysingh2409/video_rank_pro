import axios from "axios";
const apiKey="AIzaSyALHEN3TY-5y_693FCjBM7ckWZDS_BCaAc";
const baseUrl='https://www.googleapis.com/youtube/v3/'

export const getvideoDetails=async(videoId)=>{
    const apiUrl = `${baseUrl}videos?id=${videoId}&key=${apiKey}&part=snippet,contentDetails,statistics`;
    const res=await axios.get(apiUrl);
     const data=await res.data;
     return data;   
    
}

export const getSubscriberDetails=async(channelId)=>{
    const apiUrl=`${baseUrl}channels?id=${channelId}&key=${apiKey}&part=statistics`;
    const res=await axios.get(apiUrl);
    const data=await res.data;
    return data.items[0].statistics.subscriberCount;

}