import { useEffect, useState } from "react";
import "./YoutubeVideos.css";

function YoutubeVideos() {
  const [appleVideos, setAppleVideos] = useState([]);
  // fetch the all 9 Videos
  useEffect(() => {
    try {
      const fetchVideos = async () => {
        const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;
        const response = await fetch(
          `https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=UCE_M8A5yxnLfW0KghEeajjw&maxResults=9&order=date&key=${apiKey}`,
        );
        const data = await response.json();
        console.log(data.items);
        setAppleVideos(data.items);
      };

      fetchVideos();
    } catch (error) {
      console.log("Error fetching videos", error);
    }
  }, []);
  console.log(appleVideos);
  return (
    <>
      <section className="youtube-video-wrapper">
        <div className="container">
          <div className="row justify-content-center text-center">
            <div className="col-12">
              <div className="title-wrapper">
                <h1>Latest Videos</h1>
              </div>
            </div>

            {appleVideos?.map((video) => {
              return (
                <div key={video.id.videoId} className="col-md-4">
                  <div className="video-wrapper">
                    <div className="thumbnail">
                      <a href="">
                        <img
                          src={video?.snippet?.thumbnails?.high.url}
                          alt={video.snippet.title}
                        />
                      </a>
                    </div>
                    <div className="video-info">
                      <div className="title">{video?.snippet?.title}</div>
                      <div className="description">
                        {video?.snippet?.description}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

export default YoutubeVideos;
