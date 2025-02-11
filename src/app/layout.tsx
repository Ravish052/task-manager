import AuthProvider from "@/context/AuthContext";
import "@/app/globals.css";
import Image from "next/image";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className='mx-auto max-w-screen-2xl p-4'>
        <AuthProvider>
          <Image
            className="dark:invert"
            src="/logo.svg"
            alt="app logo"
            width={180}
            height={38}
            priority
          />
          <div className='flex flex-col items-center justify-center pt-4 md:pt-4'>
                {children}
            </div>
        </AuthProvider>
      </body>
    </html>
  );
}
