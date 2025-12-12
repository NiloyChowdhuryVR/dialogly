import React from 'react';
import type { ChatMessage } from '../types/types';

interface MessageProps {
  message: ChatMessage;
  color: string;
  theme: 'light' | 'dark';
}

export const Message: React.FC<MessageProps> = ({ message, color, theme }) => {
  const isUser = message.role === 'user';

  return (
    <div className={`chat-message ${message.role}`}>
      <div
        className={`message-bubble ${message.role} ${theme === 'dark' ? 'theme-dark' : ''}`}
        style={isUser ? { backgroundColor: color } : {}}
      >
        {message.content}
      </div>
    </div>
  );
};
