'use client';

import { useEffect, useState } from 'react';

export default function ApiKeyPage() {
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetchApiKey();
  }, []);

  const fetchApiKey = async () => {
    try {
      const response = await fetch('/api/apikey');
      if (response.ok) {
        const data = await response.json();
        setApiKey(data.apiKey);
      }
    } catch (error) {
      console.error('Failed to fetch API key:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateApiKey = async () => {
    setGenerating(true);
    try {
      const response = await fetch('/api/apikey', {
        method: 'POST',
      });
      if (response.ok) {
        const data = await response.json();
        setApiKey(data.apiKey);
      }
    } catch (error) {
      console.error('Failed to generate API key:', error);
    } finally {
      setGenerating(false);
    }
  };

  const copyToClipboard = () => {
    if (apiKey) {
      navigator.clipboard.writeText(apiKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
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
        <h1 className="text-3xl font-bold text-white">API Key</h1>
        <p className="mt-2 text-gray-400">
          Manage your API key for chatbot integration
        </p>
      </div>

      <div className="rounded-lg bg-gradient-to-br from-dark-50 to-dark-100 border border-primary-900/20 p-6 shadow-xl">
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-white">Your API Key</h2>
            <p className="mt-1 text-sm text-gray-400">
              Use this key to authenticate your chatbot requests
            </p>
          </div>

          {apiKey ? (
            <div className="space-y-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={apiKey}
                  readOnly
                  className="flex-1 rounded-lg border border-primary-800 bg-dark-200 px-4 py-2 font-mono text-sm text-white placeholder-gray-500"
                />
                <button
                  onClick={copyToClipboard}
                  className="rounded-lg bg-primary-600 px-6 py-2 font-semibold text-white transition hover:bg-primary-700"
                >
                  {copied ? '✓ Copied!' : 'Copy'}
                </button>
              </div>

              <button
                onClick={generateApiKey}
                disabled={generating}
                className="rounded-lg border border-red-300 bg-red-50 px-6 py-2 font-semibold text-red-600 transition hover:bg-red-100 disabled:opacity-50"
              >
                {generating ? 'Generating...' : 'Regenerate API Key'}
              </button>

              <div className="rounded-lg bg-yellow-900/20 border border-yellow-700/30 p-4">
                <p className="text-sm text-yellow-200">
                  ⚠️ Warning: Regenerating your API key will invalidate the current
                  key. Update your chatbot integration with the new key.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="rounded-lg bg-dark-200 p-8 text-center">
                <p className="text-gray-400">No API key generated yet</p>
              </div>

              <button
                onClick={generateApiKey}
                disabled={generating}
                className="w-full rounded-lg bg-primary-600 px-6 py-3 font-semibold text-white transition hover:bg-primary-700 disabled:opacity-50"
              >
                {generating ? 'Generating...' : 'Generate API Key'}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Integration Guide */}
      <div className="rounded-lg bg-gradient-to-br from-dark-50 to-dark-100 border border-primary-900/20 p-6 shadow-xl">
        <h2 className="mb-4 text-xl font-semibold text-white">
          Integration Guide
        </h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-white">1. Install the package</h3>
            <pre className="mt-2 rounded-lg bg-gray-900 p-4 text-sm text-white">
              npm install dialogly
            </pre>
          </div>

          <div>
            <h3 className="font-semibold text-white">2. Add to your website</h3>
            <pre className="mt-2 rounded-lg bg-gray-900 p-4 text-sm text-white">
              {`import { Chatbot } from 'dialogly';

<Chatbot apiKey="${apiKey || 'YOUR_API_KEY'}" />

// Chatbot automatically fetches your customization from dashboard!`}
            </pre>
          </div>

          <div>
            <h3 className="font-semibold text-white">3. That's it!</h3>
            <p className="mt-2 text-sm text-gray-400">
              The chatbot will automatically use your customization settings from the dashboard.
              You can override them by passing props if needed:
            </p>
            <pre className="mt-2 rounded-lg bg-gray-900 p-4 text-sm text-white">
              {`<Chatbot
  apiKey="${apiKey || 'YOUR_API_KEY'}"
  color="#10b981"  // Optional: override dashboard color
/>`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
