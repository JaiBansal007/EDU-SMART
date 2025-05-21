'use client';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

interface PageLayoutProps {
  children: ReactNode;
  footer?: ReactNode;
}

export default function PageLayout({ children, footer }: PageLayoutProps) {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        {children}
      </main>
      {isHomePage && footer}
    </div>
  );
} 