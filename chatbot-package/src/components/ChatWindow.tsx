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
  onQuickReply: (question: string, answer: string) => void;
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
  onQuickReply,
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
      {/* Header with Avatar */}
      <div className="chat-header" style={{ background: `linear-gradient(135deg, ${color} 0%, ${adjustColor(color, -20)} 100%)` }}>
        <div className="chat-header-content">
          <div className="chat-avatar">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 5C13.66 5 15 6.34 15 8C15 9.66 13.66 11 12 11C10.34 11 9 9.66 9 8C9 6.34 10.34 5 12 5ZM12 19.2C9.5 19.2 7.29 17.92 6 15.98C6.03 13.99 10 12.9 12 12.9C13.99 12.9 17.97 13.99 18 15.98C16.71 17.92 14.5 19.2 12 19.2Z" fill="white"/>
            </svg>
          </div>
          <div className="chat-header-info">
            <div className="chat-header-title">{name}</div>
            <div className="chat-header-status">You can ask me anything</div>
          </div>
        </div>
        <div className="chat-header-actions">
          <button className="chat-action-button" onClick={onClose} aria-label="Minimize">−</button>
        </div>
      </div>

      {/* Messages */}
      <div className={`chat-messages ${theme === 'dark' ? 'theme-dark' : ''}`}>
        {messages.map((message) => (
          <Message key={message.id} message={message} color={color} theme={theme} />
        ))}
        
        {/* Show quick replies as assistant message when AI mode is OFF */}
        {!aiMode && !isLoading && (
          <div className="chat-message assistant">
            <div className="quick-replies-message">
              <div className="quick-replies-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', padding: '0 4px' }}>
                {quickReplies.map((reply) => (
                  <button
                    key={reply.id}
                    className="quick-reply-button"
                    style={{ 
                      borderColor: color,
                      color: color,
                      borderStyle: 'dashed',
                      borderWidth: '2px',
                      backgroundColor: 'white',
                      borderRadius: '10px',
                      padding: '8px 12px',
                      width: '100%',
                      minHeight: '36px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      fontWeight: 500,
                      boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                      transition: 'all 0.2s ease',
                      fontSize: '13px',
                      lineHeight: '1.2',
                      marginBottom: '0',
                      textAlign: 'center'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-1px)';
                      e.currentTarget.style.boxShadow = '0 3px 8px rgba(0,0,0,0.1)';
                      e.currentTarget.style.backgroundColor = '#f8f9fa';
                      e.currentTarget.style.borderStyle = 'solid';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'none';
                      e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.05)';
                      e.currentTarget.style.backgroundColor = 'white';
                      e.currentTarget.style.borderStyle = 'dashed';
                    }}
                    onClick={() => onQuickReply(reply.label, reply.response)}
                    disabled={isLoading}
                  >
                    {reply.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
        
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

      {/* Input - only show when AI mode is ON */}
      {aiMode && (
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
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.01 21L23 12L2.01 3L2 10L17 12L2 14L2.01 21Z" fill="white"/>
              </svg>
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

// Helper function to adjust color brightness
function adjustColor(color: string, amount: number): string {
  const num = parseInt(color.replace('#', ''), 16);
  const r = Math.max(0, Math.min(255, (num >> 16) + amount));
  const g = Math.max(0, Math.min(255, ((num >> 8) & 0x00FF) + amount));
  const b = Math.max(0, Math.min(255, (num & 0x0000FF) + amount));
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
}

