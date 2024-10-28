import { FC } from 'react';

export const metadata = {
  // title: 'Next.js',
  // description: 'Generated by Next.js',
};

const RootLayout: FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
