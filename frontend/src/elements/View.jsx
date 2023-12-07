// TopicDetails.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const View = ({ topicId }) => {
  const [topicDetails, setTopicDetails] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:4000/sdashboard/topic/topic/${topicId}`)
      .then((response) => {
        setTopicDetails(response.data);
      })
      .catch((error) => {
        console.error('Error fetching topic details:', error);
      });
  }, [topicId]);

  if (!topicDetails) {
    return <div>Loading...</div>; // You can replace this with a loading spinner or message
  }

  return (
    <div>
      <h2>{topicDetails.project_topic}</h2>
      <p>{topicDetails.project_description}</p>
      <p>YouTube Link: {topicDetails.youtube_link}</p>
      <p>Topic Link: {topicDetails.topic_link}</p>
      {/* Add more details as needed */}
    </div>
  );
};

export default View;