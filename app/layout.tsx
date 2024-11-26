import { ReactNode } from 'react';
import '../styles/global.css';

export const metadata = {
  title: 'Blog Manager App',
  description: 'Manage your blogs seamlessly',
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{metadata.title}</title>
      </head>
      <body>
        {/* Render the children (other pages/content) */}
        {children}
      </body>
    </html>
  );
}
