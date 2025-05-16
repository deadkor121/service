// src/components/Chat/Chat.jsx
import React, { useEffect, useState } from 'react';
import { fetchMessages, sendMessage } from '../../services/api'; // Функции для работы с API
import PropTypes from 'prop-types'; 

const Chat = ({ taskId, receiver }) => {
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState('');

  useEffect(() => {
    // Загружаем все сообщения при монтировании компонента
    fetchMessages(taskId)
      .then((data) => setMessages(data))
      .catch((err) => console.error('Error fetching messages', err));
  }, [taskId]);

  const handleSendMessage = () => {
    if (!messageText) return;

    sendMessage({ taskId, receiver, text: messageText })
      .then((newMessage) => setMessages((prevMessages) => [...prevMessages, newMessage]))
      .catch((err) => console.error('Error sending message', err));

    setMessageText('');
  };

  return (
    <div className="chat">
      <div className="chat-messages">
        {messages.map((message) => (
          <div key={message._id} className="message">
            <strong>{message.sender.name}: </strong>
            <span>{message.text}</span>
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          placeholder="Напишите сообщение..."
        />
        <button onClick={handleSendMessage}>Отправить</button>
      </div>
    </div>
  );
};


Chat.propTypes = {
  taskId: PropTypes.string.isRequired,
  receiver: PropTypes.string.isRequired,
};

export default Chat;
