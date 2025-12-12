import React from 'react';

interface ChatButtonProps {
  onClick: () => void;
  color: string;
  position: 'left' | 'right';
}

export const ChatButton: React.FC<ChatButtonProps> = ({ onClick, color, position }) => {
  return (
    <button
      className="chat-button"
      onClick={onClick}
      style={{ backgroundColor: color }}
      aria-label="Open chat"
    >
      💬
    </button>
  );
};
