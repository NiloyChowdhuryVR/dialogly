'use client';

import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface Stats {
  totalMessages: number;
  messagesPerDay: { date: string; count: number }[];
}

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/stats');
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-primary-400">Loading...</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <p className="mt-2 text-gray-400">Overview of your chatbot performance</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <StatCard
          title="Total Messages"
          value={stats?.totalMessages || 0}
          icon="💬"
          color="primary"
        />
        <StatCard
          title="Today's Messages"
          value={stats?.messagesPerDay?.[0]?.count || 0}
          icon="📈"
          color="green"
        />
        <StatCard
          title="Active Days"
          value={stats?.messagesPerDay?.length || 0}
          icon="📅"
          color="emerald"
        />
      </div>

      {/* Chart */}
      <div className="rounded-2xl border border-primary-900/20 bg-gradient-to-br from-dark-50 to-black p-6">
        <h2 className="mb-4 text-xl font-semibold text-white">
          Messages Per Day
        </h2>
        {stats && stats.messagesPerDay.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={stats.messagesPerDay}>
              <CartesianGrid strokeDasharray="3 3" stroke="#14532d" />
              <XAxis dataKey="date" stroke="#4ade80" />
              <YAxis stroke="#4ade80" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0a0a0a',
                  border: '1px solid #14532d',
                  borderRadius: '8px',
                  color: '#fff',
                }}
              />
              <Bar dataKey="count" fill="#22c55e" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex h-64 items-center justify-center text-gray-500">
            No message data available yet
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="rounded-2xl border border-primary-900/20 bg-gradient-to-br from-dark-50 to-black p-6">
        <h2 className="mb-4 text-xl font-semibold text-white">Quick Actions</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <QuickAction
            title="Generate API Key"
            description="Create a new API key for your chatbot"
            href="/dashboard/api-key"
            icon="🔑"
          />
          <QuickAction
            title="Add FAQs"
            description="Manage frequently asked questions"
            href="/dashboard/faq"
            icon="❓"
          />
          <QuickAction
            title="Customize Chatbot"
            description="Change appearance and settings"
            href="/dashboard/customize"
            icon="🎨"
          />
          <QuickAction
            title="Update Website Info"
            description="Edit your website description"
            href="/dashboard/website"
            icon="🌐"
          />
        </div>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  icon,
  color,
}: {
  title: string;
  value: number;
  icon: string;
  color: string;
}) {
  const colorClasses = {
    primary: 'from-primary-600/20 to-primary-700/20 text-primary-400',
    green: 'from-green-600/20 to-green-700/20 text-green-400',
    emerald: 'from-emerald-600/20 to-emerald-700/20 text-emerald-400',
  };

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-primary-900/20 bg-gradient-to-br from-dark-50 to-black p-6 transition hover:border-primary-600/50">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-600/5 to-transparent opacity-0 transition group-hover:opacity-100"></div>
      <div className="relative flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-400">{title}</p>
          <p className="mt-2 text-3xl font-bold text-white">{value}</p>
        </div>
        <div className={`rounded-2xl bg-gradient-to-br p-4 text-3xl ${colorClasses[color as keyof typeof colorClasses]}`}>
          {icon}
        </div>
      </div>
    </div>
  );
}

function QuickAction({
  title,
  description,
  href,
  icon,
}: {
  title: string;
  description: string;
  href: string;
  icon: string;
}) {
  return (
    <a
      href={href}
      className="group relative overflow-hidden flex items-start gap-4 rounded-xl border border-primary-900/20 bg-gradient-to-br from-dark-50 to-black p-4 transition hover:border-primary-600/50"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary-600/5 to-transparent opacity-0 transition group-hover:opacity-100"></div>
      <div className="relative text-3xl">{icon}</div>
      <div className="relative">
        <h3 className="font-semibold text-white group-hover:text-primary-400 transition">{title}</h3>
        <p className="text-sm text-gray-400">{description}</p>
      </div>
    </a>
  );
}
