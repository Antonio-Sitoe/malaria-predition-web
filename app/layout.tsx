import './globals.css';
import Header from '@/components/layout/header';
import Sidebar from '@/components/layout/sidebar';
import type { Metadata } from 'next';

import { Provider } from './provider';

export const metadata: Metadata = {
  title: 'Next Shadcn Dashboard Starter',
  description: 'Basic dashboard with Next.js and Shadcn'
};

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <Header />
        <div className="flex h-screen overflow-hidden">
          <Sidebar />
          <Provider>
            <main className="flex-1 overflow-hidden pt-16">{children}</main>
          </Provider>
        </div>
      </body>
    </html>
  );
}
