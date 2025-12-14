'use client';

import { UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-black">
      {/* Sidebar */}
      <aside className="w-64 border-r border-primary-900/20 bg-gradient-to-b from-dark-50 to-black">
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="border-b border-primary-900/20 p-6">
            <Link href="/dashboard" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary-500 to-primary-700"></div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
                Dialogly
              </h1>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 p-4">
            <NavLink href="/dashboard" icon="📊">
              Dashboard
            </NavLink>
            <NavLink href="/dashboard/api-key" icon="🔑">
              API Key
            </NavLink>
            <NavLink href="/dashboard/faq" icon="❓">
              FAQs
            </NavLink>
            <NavLink href="/dashboard/customize" icon="🎨">
              Customize
            </NavLink>
          </nav>

          {/* User Profile */}
          <div className="border-t border-primary-900/20 p-4">
            <div className="flex items-center gap-3">
              <UserButton afterSignOutUrl="/" />
              <span className="text-sm text-gray-400">Account</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="mx-auto max-w-7xl p-8">{children}</div>
      </main>
    </div>
  );
}

function NavLink({
  href,
  icon,
  children,
}: {
  href: string;
  icon: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`flex items-center gap-3 rounded-lg px-4 py-3 transition ${
        isActive
          ? 'bg-primary-600/20 text-primary-400 font-semibold'
          : 'text-gray-400 hover:bg-primary-600/10 hover:text-primary-400'
      }`}
    >
      <span className="text-xl">{icon}</span>
      <span className="font-medium">{children}</span>
    </Link>
  );
}
