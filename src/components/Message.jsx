import React from 'react';
import '../styles/Message.css';

const Message = ({ text }) => {
  return <p className="message">{text}</p>;
};

export default Message;
