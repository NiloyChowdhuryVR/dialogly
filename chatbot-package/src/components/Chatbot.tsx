import React, { useState, useEffect } from 'react';
import { ChatButton } from './ChatButton';
import { ChatWindow } from './ChatWindow';
import { sendChatMessage, fetchChatbotSettings } from '../lib/api';
import { injectStyles } from '../lib/injectStyles';
import type { ChatbotProps, ChatMessage } from '../types/types';


export const Chatbot: React.FC<ChatbotProps> = ({
  apiKey,
  theme,
  position,
  greeting,
  name,
  color,
  apiUrl,
  testMode = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  // State for fetched settings
  const [fetchedTheme, setFetchedTheme] = useState<'light' | 'dark'>('light');
  const [fetchedPosition, setFetchedPosition] = useState<'left' | 'right'>('right');
  const [fetchedGreeting, setFetchedGreeting] = useState('Hello! How can I help you today?');
  const [fetchedName, setFetchedName] = useState('AI Assistant');
  const [fetchedColor, setFetchedColor] = useState('#22c55e');
  const [fetchedAiMode, setFetchedAiMode] = useState(true);
  const [fetchedQuickReplies, setFetchedQuickReplies] = useState<import('../types/types').QuickReply[]>([]);

  // Use props if provided, otherwise use fetched settings
  const activeTheme = theme || fetchedTheme;
  const activePosition = position || fetchedPosition;
  const activeGreeting = greeting || fetchedGreeting;
  const activeName = name || fetchedName;
  const activeColor = color || fetchedColor;
  const activeAiMode = fetchedAiMode;
  const activeQuickReplies = fetchedQuickReplies;

  // Inject styles on mount
  useEffect(() => {
    injectStyles();
  }, []);

  // Fetch chatbot settings on mount
  useEffect(() => {
    const loadSettings = async () => {
      const settings = await fetchChatbotSettings(apiKey, apiUrl, testMode);
      if (settings) {
        setFetchedTheme(settings.theme);
        setFetchedPosition(settings.position);
        setFetchedGreeting(settings.greeting);
        setFetchedName(settings.name);
        setFetchedColor(settings.color);
        setFetchedAiMode(settings.aiMode);
        setFetchedQuickReplies(settings.quickReplies || []);
      }
    };

    loadSettings();
  }, [apiKey, apiUrl, testMode]);

  useEffect(() => {
    // Add or update initial greeting message
    if (messages.length === 0) {
      setMessages([
        {
          id: '1',
          role: 'assistant',
          content: activeGreeting,
          timestamp: new Date(),
        },
      ]);
    } else if (messages[0]?.role === 'assistant' && messages[0]?.id === '1') {
      // Update the greeting if it's still the first message
      setMessages((prev) => [
        {
          ...prev[0],
          content: activeGreeting,
        },
        ...prev.slice(1),
      ]);
    }
  }, [activeGreeting]);

  const handleSendMessage = async (content: string) => {
    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Send to API
      const response = await sendChatMessage(content, apiKey, apiUrl, testMode);

      // Add assistant response
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.message,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Failed to send message:', error);
      
      // Add error message
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickReply = (question: string, answer: string) => {
    // Add user message (Question)
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: question,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    // Simulate delay then add assistant response (Answer)
    setTimeout(() => {
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: answer,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 600);
  };

  return (
    <div className={`chatbot-container position-${activePosition}`}>
      {isOpen && (
        <ChatWindow
          messages={messages}
          onSendMessage={handleSendMessage}
          onQuickReply={handleQuickReply}
          onClose={() => setIsOpen(false)}
          name={activeName}
          color={activeColor}
          greeting={activeGreeting}
          theme={activeTheme}
          position={activePosition}
          isLoading={isLoading}
          aiMode={activeAiMode}
          quickReplies={activeQuickReplies}
        />
      )}
      {!isOpen && (
        <ChatButton onClick={() => setIsOpen(true)} color={activeColor} position={activePosition} />
      )}
    </div>
  );
};
