// Inject styles into the document head
export function injectStyles() {
  // Check if styles are already injected
  if (document.getElementById('dialogly-styles')) {
    return;
  }

  const styleElement = document.createElement('style');
  styleElement.id = 'dialogly-styles';
  styleElement.textContent = `
    /* Dialogly Chatbot Styles */
    .chatbot-container {
      position: fixed;
      bottom: 20px;
      z-index: 9999;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }

    .chatbot-container.position-right {
      right: 20px;
    }

    .chatbot-container.position-left {
      left: 20px;
    }

    /* Chat Button */
    .chat-button {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      border: none;
      cursor: pointer;
      font-size: 24px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      transition: transform 0.2s, box-shadow 0.2s;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .chat-button:hover {
      transform: scale(1.05);
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
    }

    /* Chat Window */
    .chat-window {
      position: fixed;
      bottom: 90px;
      width: 380px;
      height: 600px;
      max-height: calc(100vh - 120px);
      background: white;
      border-radius: 16px;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
      display: flex;
      flex-direction: column;
      overflow: hidden;
      animation: slideUp 0.3s ease-out;
    }

    .chat-window.position-right {
      right: 20px;
    }

    .chat-window.position-left {
      left: 20px;
    }

    .chat-window.theme-dark {
      background: #1a202c;
      color: #e2e8f0;
    }

    @keyframes slideUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    /* Chat Header */
    .chat-header {
      padding: 20px;
      color: white;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-shrink: 0;
      border-radius: 16px 16px 0 0;
    }

    .chat-header-content {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .chat-avatar {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.2);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .chat-header-info {
      display: flex;
      flex-direction: column;
    }

    .chat-header-title {
      font-size: 16px;
      font-weight: 600;
      margin-bottom: 2px;
    }

    .chat-header-status {
      font-size: 12px;
      opacity: 0.9;
    }

    .chat-header-actions {
      display: flex;
      gap: 8px;
    }

    .chat-action-button {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.2);
      border: none;
      color: white;
      font-size: 20px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 0.2s;
    }

    .chat-action-button:hover {
      background: rgba(255, 255, 255, 0.3);
    }

    /* Chat Messages */
    .chat-messages {
      flex: 1;
      overflow-y: auto;
      padding: 20px;
      background: #f7fafc;
    }

    .chat-messages.theme-dark {
      background: #2d3748;
    }

    .chat-message {
      margin-bottom: 16px;
      display: flex;
    }

    .chat-message.user {
      justify-content: flex-end;
    }

    .chat-message.assistant {
      justify-content: flex-start;
    }

    .message-bubble {
      max-width: 75%;
      padding: 12px 16px;
      border-radius: 12px;
      word-wrap: break-word;
      line-height: 1.5;
    }

    .message-bubble.user {
      background: #3b82f6;
      color: white;
      border-bottom-right-radius: 4px;
    }

    .message-bubble.assistant {
      background: white;
      color: #1a202c;
      border-bottom-left-radius: 4px;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
    }

    .message-bubble.assistant.theme-dark {
      background: #4a5568;
      color: #e2e8f0;
    }

    /* Typing Indicator */
    .typing-indicator {
      display: flex;
      gap: 4px;
      padding: 4px 0;
    }

    .typing-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #94a3b8;
      animation: typing 1.4s infinite;
    }

    .typing-dot:nth-child(2) {
      animation-delay: 0.2s;
    }

    .typing-dot:nth-child(3) {
      animation-delay: 0.4s;
    }

    @keyframes typing {
      0%, 60%, 100% {
        transform: translateY(0);
      }
      30% {
        transform: translateY(-10px);
      }
    }

    /* Chat Input */
    .chat-input-container {
      padding: 16px;
      background: white;
      border-top: 1px solid #e2e8f0;
      display: flex;
      gap: 8px;
      flex-shrink: 0;
    }

    .chat-input-container.theme-dark {
      background: #2d3748;
      border-top-color: #4a5568;
    }

    .chat-input {
      flex: 1;
      padding: 10px 14px;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      font-size: 14px;
      outline: none;
      transition: border-color 0.2s;
      color: #1a202c;
      background: white;
    }

    .chat-input::placeholder {
      color: #a0aec0;
    }

    .chat-input:focus {
      border-color: #3b82f6;
    }

    .chat-input.theme-dark {
      background: #4a5568;
      border-color: #4a5568;
      color: #e2e8f0;
    }

    .chat-input.theme-dark::placeholder {
      color: #a0aec0;
    }

    .chat-send-button {
      padding: 0;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      border: none;
      color: white;
      cursor: pointer;
      transition: opacity 0.2s;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .chat-send-button:hover:not(:disabled) {
      opacity: 0.9;
    }

    .chat-send-button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    /* Mobile Responsive */
    @media (max-width: 480px) {
      .chat-window {
        width: calc(100vw - 40px);
        height: calc(100vh - 120px);
        bottom: 80px;
      }

      /* Quick Replies */
      .quick-replies-message {
        width: 100%;
        max-width: 360px;
        padding: 4px;
      }

      .quick-replies-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 12px;
        padding: 8px;
      }

      .quick-reply-button {
        width: 100%;
        min-height: 50px;
        padding: 12px 16px;
        border-width: 2px !important;
        border-style: dashed !important;
        /* borderColor is set via inline style */
        border-radius: 12px !important;
        background-color: #ffffff !important;
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        line-height: 1.3;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.08) !important;
      }

      .quick-reply-button:hover:not(:disabled) {
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.12) !important;
        background-color: #f8f9fa !important;
        border-style: solid !important;
      }

      .quick-reply-button:active:not(:disabled) {
        transform: translateY(0);
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08) !important;
      }

      .quick-reply-button:disabled {
        opacity: 0.6;
        cursor: not-allowed;
        box-shadow: none !important;
      }

      /* Chat Window Animation */
      .chat-window {
        animation: scaleIn 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }

      @keyframes scaleIn {
        from {
          transform: scale(0.9);
          opacity: 0;
        }
        to {
          transform: scale(1);
          opacity: 1;
        }
      }

      /* Chat Button Animation */
      .chat-button {
        transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }

      .chat-button:active {
        transform: scale(0.9);
      }

      .chatbot-container.position-right,
      .chatbot-container.position-left {
        right: 20px;
        left: auto;
      }

      .chat-window.position-right,
      .chat-window.position-left {
        right: 20px;
        left: auto;
      }
    }
  `;

  document.head.appendChild(styleElement);
}
