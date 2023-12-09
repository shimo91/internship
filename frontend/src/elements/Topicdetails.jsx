import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import YouTubeIcon from '@material-ui/icons/YouTube';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import axiosInstance from '../Components/axiosinterceptor'

const Topicdetails = () => {
  const [topicDetails, setTopicDetails] = useState(null);
  const { topicId } = useParams();

  useEffect(() => {
    axiosInstance.get(`/topic/view/${topicId}`)
      .then((response) => {
        if (Array.isArray(response.data) && response.data.length > 0) {
          setTopicDetails(response.data[0]);
        } else {
          console.error('Invalid response data:', response.data);
        }
      })
      .catch((error) => {
        console.error('Error fetching topic details:', error);
      });
  }, [topicId]);

  if (!topicDetails) {
    return <div style={{ textAlign: 'center', marginTop: '20px' }}>Loading...</div>;
  }

  return (
    <div>
      {/* Navbar */}
      <div style={{ backgroundColor: '#146e87', padding: '10px 20px', marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link to="/sdashboard" style={{ color: '#fff', textDecoration: 'none' }}>
          Back to Dashboard
        </Link>
      </div>

      {/* Display Topic Details */}
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '5px', backgroundColor: '#f9f9f9' }}>
        <h1 style={{ fontSize: '32px', marginBottom: '20px' }}>{topicDetails.title}</h1>
        
        {/* YouTube Video */}
        {topicDetails.youtube_link && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
            <div style={{ width: '100%' }}>
              <YouTubeIcon style={{ fontSize: '40px', marginRight: '10px' }} />
              <iframe
                width="100%"
                height="315"
                src={`https://www.youtube.com/embed/${topicDetails.youtube_link.split('v=')[1]}`}
                title="YouTube Video"
                frameBorder="0"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        )}

        {/* PDF Link */}
        {topicDetails.topic_link && (
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
            <PictureAsPdfIcon style={{ fontSize: '20px', marginRight: '10px' }} />
            <a href={topicDetails.topic_link} target="_blank" rel="noopener noreferrer">PDF Link</a>
          </div>
        )}

        {/* Topic Details */}
        <div>
          {/* <p style={{ fontSize: '16px', marginBottom: '15px' }}>{topicDetails.project_description}</p>
          <p style={{ fontSize: '14px', color: '#333' }}>YouTube Link: {topicDetails.youtube_link}</p>
          <p style={{ fontSize: '14px', color: '#333' }}>Topic Link: {topicDetails.topic_link}</p> */}
        </div>
      </div>
    </div>
  );
};

export default Topicdetails;
