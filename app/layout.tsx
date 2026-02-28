import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Student Management System',
  description: 'A modern and professional student management application',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
