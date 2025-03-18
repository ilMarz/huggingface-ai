'use client';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import {LoadingProvider } from "@/lib/utils/context/LoadingContext";
import { Loader } from "@/components/Loader";
import { Analytics } from '@vercel/analytics/next';

export default function RootLayout({ children }: {children:  React.ReactNode;}) {
  return (
      <html>
      <head>
        <title>Huggingface AI</title>
      </head>
      <body className={"bg-white font-fontRounded"}>
        <Toaster position="top-center" />
          <div className={"w-full h-screen flex"}>
              <LoadingProvider>
                  <Loader />
                  <main className="flex-grow overflow-auto">{children}</main>
              </LoadingProvider>
          </div>
        <Analytics />
      </body>
      </html>
  );
}
