'use client';

import { useEffect, useState } from 'react';

interface Settings {
  name: string;
  color: string;
  greeting: string;
  position: string;
}

export default function CustomizePage() {
  const [settings, setSettings] = useState<Settings>({
    name: 'AI Assistant',
    color: '#3b82f6',
    greeting: 'Hello! How can I help you today?',
    position: 'right',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await fetch('/api/settings');
      if (response.ok) {
        const data = await response.json();
        if (data.settings) {
          setSettings(data.settings);
        }
      }
    } catch (error) {
      console.error('Failed to fetch settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    try {
      const response = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });
      if (response.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      }
    } catch (error) {
      console.error('Failed to save settings:', error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Customize Chatbot</h1>
        <p className="mt-2 text-gray-400">
          Personalize your chatbot's appearance and behavior
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Settings Form */}
        <div className="space-y-6">
          <div className="rounded-lg bg-gradient-to-br from-dark-50 to-dark-100 border border-primary-900/20 p-6 shadow-xl">
            <h2 className="mb-4 text-xl font-semibold text-white">Settings</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                  Chatbot Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={settings.name}
                  onChange={(e) => setSettings({ ...settings, name: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-primary-800 bg-dark-200 px-4 py-2 text-white placeholder-gray-500 focus:border-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-600"
                />
              </div>

              <div>
                <label htmlFor="color" className="block text-sm font-medium text-gray-300">
                  Primary Color
                </label>
                <div className="mt-1 flex gap-2">
                  <input
                    type="color"
                    id="color"
                    value={settings.color}
                    onChange={(e) => setSettings({ ...settings, color: e.target.value })}
                    className="h-10 w-20 cursor-pointer rounded-lg border border-primary-800"
                  />
                  <input
                    type="text"
                    value={settings.color}
                    onChange={(e) => setSettings({ ...settings, color: e.target.value })}
                    className="flex-1 rounded-lg border border-primary-800 bg-dark-200 px-4 py-2 font-mono text-sm text-white placeholder-gray-500 focus:border-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-600"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="greeting" className="block text-sm font-medium text-gray-300">
                  Greeting Message
                </label>
                <textarea
                  id="greeting"
                  rows={3}
                  value={settings.greeting}
                  onChange={(e) => setSettings({ ...settings, greeting: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-primary-800 bg-dark-200 px-4 py-2 text-white placeholder-gray-500 focus:border-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300">
                  Widget Position
                </label>
                <div className="mt-2 flex gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="position"
                      value="left"
                      checked={settings.position === 'left'}
                      onChange={(e) => setSettings({ ...settings, position: e.target.value })}
                      className="h-4 w-4 text-blue-600"
                    />
                    <span className="text-sm text-gray-300">Left</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="position"
                      value="right"
                      checked={settings.position === 'right'}
                      onChange={(e) => setSettings({ ...settings, position: e.target.value })}
                      className="h-4 w-4 text-blue-600"
                    />
                    <span className="text-sm text-gray-300">Right</span>
                  </label>
                </div>
              </div>

              <div className="flex items-center gap-4 pt-4">
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="rounded-lg bg-primary-600 px-6 py-3 font-semibold text-white transition hover:bg-primary-700 disabled:opacity-50"
                >
                  {saving ? 'Saving...' : 'Save Settings'}
                </button>
                {saved && (
                  <span className="text-sm font-medium text-green-600">
                    ✓ Saved successfully!
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Preview */}
        <div className="rounded-lg bg-gradient-to-br from-dark-50 to-dark-100 border border-primary-900/20 p-6 shadow-xl">
          <h2 className="mb-4 text-xl font-semibold text-white">Preview</h2>
          <div className="relative h-[600px] overflow-hidden rounded-lg border-2 border-primary-900/20 bg-dark-200">
            {/* Chat Button Preview */}
            <div
              className={`absolute bottom-4 ${
                settings.position === 'left' ? 'left-4' : 'right-4'
              }`}
            >
              <button
                style={{ backgroundColor: settings.color }}
                className="flex h-14 w-14 items-center justify-center rounded-full text-2xl text-white shadow-lg transition hover:scale-110"
              >
                💬
              </button>
            </div>

            {/* Chat Window Preview */}
            <div
              className={`absolute bottom-20 ${
                settings.position === 'left' ? 'left-4' : 'right-4'
              } w-80 rounded-lg bg-white shadow-xl`}
            >
              {/* Header */}
              <div
                style={{ backgroundColor: settings.color }}
                className="rounded-t-lg p-4 text-white"
              >
                <h3 className="font-semibold">{settings.name}</h3>
                <p className="text-xs opacity-90">Online</p>
              </div>

              {/* Messages */}
              <div className="h-64 space-y-3 overflow-y-auto p-4">
                <div className="flex justify-start">
                  <div className="max-w-xs rounded-lg bg-gray-100 px-4 py-2">
                    <p className="text-sm text-gray-800">{settings.greeting}</p>
                  </div>
                </div>
                <div className="flex justify-end">
                  <div
                    style={{ backgroundColor: settings.color }}
                    className="max-w-xs rounded-lg px-4 py-2"
                  >
                    <p className="text-sm text-white">Hello!</p>
                  </div>
                </div>
              </div>

              {/* Input */}
              <div className="border-t p-3">
                <input
                  type="text"
                  placeholder="Type a message..."
                  className="w-full rounded-lg border px-3 py-2 text-sm"
                  disabled
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
