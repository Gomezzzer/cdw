import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Mulish, Roboto } from "next/font/google"; 
import { cn } from "@/lib/utils";
import { Toaster } from 'sonner'; 
import NextTopLoader from "nextjs-toploader"; 
import { NuqsAdapter } from "nuqs/adapters/next/app";
 
export const metadata: Metadata = {
  title: "Car Dealer Website",
  description: "A sick car dealer website with AI.", 
};

const mulish = Mulish({
  weight: "variable",
  subsets: ["latin"],
  variable: "--font-heading", 
  display: "swap", 
})  

const roboto = Roboto({
  weight: "400", 
  subsets: ["latin"],
  variable: "--font-body",  
  display: "swap", 
})  


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
		<html lang="en">
			<body
				className={cn(
					"antialiased overscroll-none bg-background font-heading",
					roboto.variable,
					mulish.variable,
				)}
			>
        <NextTopLoader showSpinner={false} /> 
        <NuqsAdapter>{children}</NuqsAdapter>
        <Toaster /> 
			</body>
		</html>
	);
}
