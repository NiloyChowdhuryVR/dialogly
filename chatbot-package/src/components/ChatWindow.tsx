import React, { useState, useRef, useEffect } from 'react';
import { Message } from './Message';
import type { ChatMessage } from '../types/types';

interface ChatWindowProps {
  messages: ChatMessage[];
  onSendMessage: (message: string) => void;
  onClose: () => void;
  name: string;
  color: string;
  greeting: string;
  theme: 'light' | 'dark';
  position: 'left' | 'right';
  isLoading: boolean;
  aiMode: boolean;
  quickReplies: import('../types/types').QuickReply[];
}

export const ChatWindow: React.FC<ChatWindowProps> = ({
  messages,
  onSendMessage,
  onClose,
  name,
  color,
  greeting,
  theme,
  position,
  isLoading,
  aiMode,
  quickReplies,
}) => {
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() && !isLoading) {
      onSendMessage(inputValue.trim());
      setInputValue('');
    }
  };

  return (
    <div className={`chat-window position-${position} ${theme === 'dark' ? 'theme-dark' : ''}`}>
      {/* Header */}
      <div className="chat-header" style={{ backgroundColor: color }}>
        <div>
          <div className="chat-header-title">{name}</div>
          <div className="chat-header-status">Online</div>
        </div>
        <button className="chat-close-button" onClick={onClose} aria-label="Close chat">
          ×
        </button>
      </div>

      {/* Messages */}
      <div className={`chat-messages ${theme === 'dark' ? 'theme-dark' : ''}`}>
        {messages.map((message) => (
          <Message key={message.id} message={message} color={color} theme={theme} />
        ))}
        {isLoading && (
          <div className="chat-message assistant">
            <div className={`message-bubble assistant ${theme === 'dark' ? 'theme-dark' : ''}`}>
              <div className="typing-indicator">
                <div className="typing-dot"></div>
                <div className="typing-dot"></div>
                <div className="typing-dot"></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input or Quick Replies */}
      {aiMode ? (
        <form onSubmit={handleSubmit}>
          <div className={`chat-input-container ${theme === 'dark' ? 'theme-dark' : ''}`}>
            <input
              type="text"
              className={`chat-input ${theme === 'dark' ? 'theme-dark' : ''}`}
              placeholder="Type a message..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={isLoading}
            />
            <button
              type="submit"
              className="chat-send-button"
              style={{ backgroundColor: color }}
              disabled={!inputValue.trim() || isLoading}
            >
              Send
            </button>
          </div>
        </form>
      ) : (
        <div className="quick-replies-container">
          {quickReplies.map((reply) => (
            <button
              key={reply.id}
              className="quick-reply-button"
              style={{ borderColor: color, color: color }}
              onClick={() => onSendMessage(reply.response)}
              disabled={isLoading}
            >
              {reply.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
