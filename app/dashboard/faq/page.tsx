'use client';

import { useEffect, useState } from 'react';
import type { FAQ } from '@/lib/types';

export default function FAQPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    fetchFAQs();
  }, []);

  const fetchFAQs = async () => {
    try {
      const response = await fetch('/api/faq');
      if (response.ok) {
        const data = await response.json();
        setFaqs(data.faqs || []);
      }
    } catch (error) {
      console.error('Failed to fetch FAQs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (question: string, answer: string) => {
    try {
      const response = await fetch('/api/faq', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question, answer }),
      });
      if (response.ok) {
        await fetchFAQs();
        setShowAddForm(false);
      }
    } catch (error) {
      console.error('Failed to add FAQ:', error);
    }
  };

  const handleUpdate = async (id: string, question: string, answer: string) => {
    try {
      const response = await fetch('/api/faq', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, question, answer }),
      });
      if (response.ok) {
        await fetchFAQs();
        setEditingId(null);
      }
    } catch (error) {
      console.error('Failed to update FAQ:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this FAQ?')) return;
    
    try {
      const response = await fetch('/api/faq', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      if (response.ok) {
        await fetchFAQs();
      }
    } catch (error) {
      console.error('Failed to delete FAQ:', error);
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">FAQ Management</h1>
          <p className="mt-2 text-gray-400">
            Add frequently asked questions for instant responses
          </p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="rounded-lg bg-primary-600 px-6 py-3 font-semibold text-white transition hover:bg-primary-700"
        >
          + Add FAQ
        </button>
      </div>

      {/* Add Form */}
      {showAddForm && (
        <FAQForm
          onSubmit={handleAdd}
          onCancel={() => setShowAddForm(false)}
        />
      )}

      {/* FAQ List */}
      <div className="space-y-4">
        {faqs.length === 0 ? (
          <div className="rounded-lg bg-gradient-to-br from-dark-50 to-dark-100 border border-primary-900/20 p-12 text-center shadow-xl">
            <p className="text-gray-400">No FAQs added yet</p>
            <button
              onClick={() => setShowAddForm(true)}
              className="mt-4 text-primary-400 hover:text-primary-300 hover:underline"
            >
              Add your first FAQ
            </button>
          </div>
        ) : (
          faqs.map((faq) => (
            <div key={faq.id} className="rounded-lg bg-gradient-to-br from-dark-50 to-dark-100 border border-primary-900/20 p-6 shadow-xl">
              {editingId === faq.id ? (
                <FAQForm
                  initialQuestion={faq.question}
                  initialAnswer={faq.answer}
                  onSubmit={(q, a) => handleUpdate(faq.id, q, a)}
                  onCancel={() => setEditingId(null)}
                />
              ) : (
                <div className="space-y-3">
                  <div>
                    <h3 className="font-semibold text-white">Q: {faq.question}</h3>
                    <p className="mt-2 text-gray-400">A: {faq.answer}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setEditingId(faq.id)}
                      className="rounded-lg bg-primary-900/30 border border-primary-700/50 px-4 py-2 text-sm font-medium text-primary-300 transition hover:bg-primary-900/50"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(faq.id)}
                      className="rounded-lg bg-red-50 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-100"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function FAQForm({
  initialQuestion = '',
  initialAnswer = '',
  onSubmit,
  onCancel,
}: {
  initialQuestion?: string;
  initialAnswer?: string;
  onSubmit: (question: string, answer: string) => void;
  onCancel: () => void;
}) {
  const [question, setQuestion] = useState(initialQuestion);
  const [answer, setAnswer] = useState(initialAnswer);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim() || !answer.trim()) return;

    setSubmitting(true);
    await onSubmit(question, answer);
    setSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-lg bg-gradient-to-br from-dark-50 to-dark-100 border border-primary-900/20 p-6 shadow-xl">
      <div className="space-y-4">
        <div>
          <label htmlFor="question" className="block text-sm font-medium text-gray-300">
            Question
          </label>
          <input
            type="text"
            id="question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="What is your return policy?"
            className="mt-1 w-full rounded-lg border border-primary-800 bg-dark-200 px-4 py-2 text-white placeholder-gray-500 focus:border-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-600"
            required
          />
        </div>

        <div>
          <label htmlFor="answer" className="block text-sm font-medium text-gray-300">
            Answer
          </label>
          <textarea
            id="answer"
            rows={4}
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="We offer a 30-day money-back guarantee..."
            className="mt-1 w-full rounded-lg border border-primary-800 bg-dark-200 px-4 py-2 text-white placeholder-gray-500 focus:border-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-600"
            required
          />
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            disabled={submitting || !question.trim() || !answer.trim()}
            className="rounded-lg bg-primary-600 px-6 py-2 font-semibold text-white transition hover:bg-primary-700 disabled:opacity-50"
          >
            {submitting ? 'Saving...' : 'Save FAQ'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg border border-primary-800 bg-dark-200 px-6 py-2 font-semibold text-white transition hover:bg-dark-300"
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
}
