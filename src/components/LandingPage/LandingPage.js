import React, { useState } from 'react';
import { getvideoDetails,getSubscriberDetails,saveVideoDetails } from '../../sevices/videoServices';
import { useNavigate } from 'react-router-dom';


function LandingPage() {
    const [videoLink,setVideoLink]=useState('');
    const [allVideo,setAllVideo]=useState({});
    const navigate=useNavigate();

    function extractVideoId(link) {
        const match = link.match(/[?&]v=([^?&]+)/);
        return match && match[1];
      }

    const handleAnalysis=async()=>{
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
    }catch(err){
        console.log('error while fetching data',err);
    }
        
    }

  return (
    <div>
        <div>
            <h1>Discover Your earning potential</h1>
            <p>Turn your youtube expertise into a lucrative income through resource sharing</p>
        </div>
        <div>
            <input type='text' placeholder='enter youtube video link' value={videoLink} onChange={(e)=>{
                setVideoLink(e.target.value)
            }}/>
            <button onClick={handleAnalysis}>Start Analysis</button>
        </div>
    </div>
  )
}

export default LandingPage