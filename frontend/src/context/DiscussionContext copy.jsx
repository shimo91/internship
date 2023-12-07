import React, { createContext, useContext, useState, useEffect } from 'react';

const DiscussionContext = createContext();

const DiscussionProvider = ({ children }) => {
  const [discussionId, setDiscussionId] = useState(null);

  // Retrieve discussionId from localStorage on component mount
  useEffect(() => {
    const storedDiscussionId = localStorage.getItem('discussionId');
    if (storedDiscussionId) {
      setDiscussionId(storedDiscussionId);
    }
  }, []);

  // Update localStorage when discussionId changes
  useEffect(() => {
    if (discussionId) {
      localStorage.setItem('discussionId', discussionId);
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