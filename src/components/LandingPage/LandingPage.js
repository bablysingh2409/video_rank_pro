import React, { useState } from 'react';
import { getvideoDetails,getSubscriberDetails,saveVideoDetails } from '../../sevices/videoServices';
import { useNavigate } from 'react-router-dom';
import style from './LandingPage.module.css'
import Loader from '../Loader';


function LandingPage() {
    const [videoLink,setVideoLink]=useState('');
    const [allVideo,setAllVideo]=useState({});
    const [loading,setLoading]=useState(false)
    const navigate=useNavigate();

    function extractVideoId(link) {
        const match = link.match(/[?&]v=([^?&]+)/);
        return match && match[1];
      }

    const handleAnalysis=async()=>{
        if(!videoLink){
            return alert('input link must be filled');
        }
        setLoading(true);
        try{
       const videoId= extractVideoId(videoLink);
       const data= await getvideoDetails(videoId);
       const dataInfo=data.items[0];
       const channelId= dataInfo.snippet.channelId;
       const subscriberCount=await getSubscriberDetails(channelId);
       const  uploadedOn=dataInfo.snippet.publishedAt;
       const date=new Date(uploadedOn).toLocaleDateString();
      const views= dataInfo.statistics.viewCount;
       const likes= dataInfo.statistics.likeCount;
      const  comments= dataInfo.statistics.commentCount;
       const estimatedEarning=Math.min(subscriberCount,views)+10*comments+5*likes;
        const allVideoCollection={
            title:dataInfo.snippet.title,
            thumbnail:dataInfo.snippet.thumbnails.default.url,
            views,
            likes,
            comments,
            estimatedEarning,
            date
        }
       const _id= await saveVideoDetails(allVideoCollection)
    //    console.log(_id)
        setAllVideo({...allVideoCollection})
        navigate(`/result/${_id}`)
        setLoading(false);
    }catch(err){
        alert('error while fetching data',err);
        setLoading(false);
    }
        
    }

    if(loading){
        return <Loader/>
    }

  return (
    <div className={style.landingPage_container}>
        <div className={style.landingPage_heading}>
            <h1>Discover Your earning potential</h1>
            <p>Turn your youtube expertise into a lucrative income through resource sharing</p>
        </div>
        <div className={style.landingPage_input_container}>
            <input type='text' placeholder='enter youtube video link' value={videoLink} onChange={(e)=>{
                setVideoLink(e.target.value)
            }} required/>
            <button onClick={handleAnalysis}>Start Analysis</button>
        </div>
    </div>
  )
}

export default LandingPage