import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getVideoRankWise } from '../../sevices/videoServices';
import style from './ResultPage.module.css'

function ResultPage() {
    const { id } = useParams();
    const [rankWiseVideo, setRankWiseVideo] = useState([]);

    useEffect(() => {
        const getVideo = async function () {
            const video = await getVideoRankWise();
            setRankWiseVideo([...video]);
        }
        getVideo();
    }, [])

    return (
        <div className={style.video_container} >
            <div>
                {rankWiseVideo.length > 0 &&
                    <div className={style.rankOne_container}>
                        <div className={style.topVideo_thumb}>
                            <h3>Top Earning Video</h3>
                            <img src={rankWiseVideo[0].thumbnail} />
                            <p>Uploaded On-{new Date(rankWiseVideo[0].updatedAt).toLocaleDateString()}</p>
                        </div>
                        <div className={style.top_video_details}>
                            <h3>{rankWiseVideo[0].title}</h3>
                            <p>views-{rankWiseVideo[0].views}</p>
                            <p>Likes-{rankWiseVideo[0].likes}</p>
                            <p>comments-{rankWiseVideo[0].comments}</p>
                        </div>
                        <div className={style.Top_video_earning}>
                            <h2>₹{rankWiseVideo[0].estimatedEarning}</h2>
                        </div>
                    </div>}
            </div>


            <div className={style.table_main_Conatiner}>

                {
                    rankWiseVideo.length > 0 &&
                    <table className={style.table_container}>
                        {/* <p>Other Video Potentials</p> */}
                        <thead className={style.table_headings}>
                            <th>Rank</th>
                            <th>Title</th>
                            <th>Thumbnail</th>
                            <th>Views</th>
                            <th>Likes</th>
                            <th>Comments</th>
                            <th>Uploaded On</th>
                            <th>estimated Earning</th>
                        </thead>
                        <tbody className={style.table_body}>
                            {rankWiseVideo.map((video) => {
                                if (video.rank !== 1) {
                                    return <tr key={video._id} className={style.table_row}>
                                        {/* ? <div > */}
                                        <td>{video.rank}</td>
                                        <td>{video.title.slice(0, 10)}</td>
                                        <td><img src={video.thumbnail} /></td>
                                        <td>{video.views}</td>
                                        <td>{video.likes}</td>
                                        <td>{video.comments}</td>
                                        <td>{new Date(video.updatedAt).toLocaleDateString()}</td>
                                        <td>{video.estimatedEarning}</td>
                                        {/* </div> */}
                                    </tr>
                                }
                            })
                            }
                        </tbody>

                    </table>
                }
            </div>

        </div>
    )
}

export default ResultPage