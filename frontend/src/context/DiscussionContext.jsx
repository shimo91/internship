import React, { createContext, useContext, useState, useEffect } from 'react';

const DiscussionContext = createContext();

const DiscussionProvider = ({ children }) => {
  const [discussionId, setDiscussionId] = useState(null);

  // Retrieve discussionId from sessionStorage on component mount
  useEffect(() => {
    const storedDiscussionId = sessionStorage.getItem('discussionId');
    if (storedDiscussionId) {
      setDiscussionId(storedDiscussionId);
    }
  }, []);

  // Update sessionStorage when discussionId changes
  useEffect(() => {
    if (discussionId) {
      sessionStorage.setItem('discussionId', discussionId);
    }
  }, [discussionId]);

  const setDiscussion = (id) => {
    setDiscussionId(id);
  };
  
  return (
    <DiscussionContext.Provider value={{ discussionId, setDiscussion }}>
      {children}
    </DiscussionContext.Provider>
  );
};

const useDiscussion = () => {
  const context = useContext(DiscussionContext);
  if (!context) {
    throw new Error('useDiscussion must be used within a DiscussionProvider');
  }
  return context;
};

export { DiscussionProvider, useDiscussion };