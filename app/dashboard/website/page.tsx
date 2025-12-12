'use client';

import { useEffect, useState } from 'react';

export default function WebsitePage() {
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetchWebsiteData();
  }, []);

  const fetchWebsiteData = async () => {
    try {
      const response = await fetch('/api/website');
      if (response.ok) {
        const data = await response.json();
        setDescription(data.description || '');
      }
    } catch (error) {
      console.error('Failed to fetch website data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    try {
      const response = await fetch('/api/website', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ description }),
      });
      if (response.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      }
    } catch (error) {
      console.error('Failed to save website data:', error);
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
        <h1 className="text-3xl font-bold text-white">Website Information</h1>
        <p className="mt-2 text-gray-400">
          Describe your website to help the AI provide better responses
        </p>
      </div>

      <div className="rounded-lg bg-gradient-to-br from-dark-50 to-dark-100 border border-primary-900/20 p-6 shadow-xl">
        <div className="space-y-4">
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-300"
            >
              Website Description
            </label>
            <p className="mt-1 text-sm text-gray-500">
              Provide details about your business, products, services, and target
              audience. This helps the AI understand context and provide relevant
              answers.
            </p>
            <textarea
              id="description"
              rows={12}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Example: We are a SaaS company that provides AI-powered chatbot solutions for businesses. Our platform helps companies automate customer support and improve user engagement..."
              className="mt-2 w-full rounded-lg border border-primary-800 bg-dark-200 px-4 py-3 text-white placeholder-gray-500 focus:border-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-600"
            />
            <p className="mt-1 text-sm text-gray-500">
              {description.length} / 10,000 characters
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={handleSave}
              disabled={saving || !description.trim()}
              className="rounded-lg bg-primary-600 px-6 py-3 font-semibold text-white transition hover:bg-primary-700 disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Save Description'}
            </button>
            {saved && (
              <span className="text-sm font-medium text-green-600">
                ✓ Saved successfully!
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Tips */}
      <div className="rounded-lg bg-gradient-to-br from-primary-900/20 to-primary-800/10 border border-primary-700/30 p-6">
        <h2 className="mb-3 text-lg font-semibold text-primary-400">
          💡 Tips for a great description
        </h2>
        <ul className="space-y-2 text-sm text-gray-300">
          <li>• Include your company's mission and values</li>
          <li>• Describe your main products or services</li>
          <li>• Mention your target audience and their needs</li>
          <li>• Add any unique selling points or differentiators</li>
          <li>• Include common use cases or customer scenarios</li>
        </ul>
      </div>
    </div>
  );
}
