/* eslint-disable @next/next/no-img-element */
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Metadata } from "next";
import Script from "next/script";
import PixelTrackerClient from "@/components/PixelTrackerClient";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AyurvedicbyAdivashi",
  icons: "./favicon.ico",
  description:
    "আমাদের সুপার সেল কোম্ব প্যাকেজ: ২০০ মিলি আয়ুর্বেদিক হেয়ার অয়েল ও ১৫০ মিলি আয়ুর্বেদিক রিলিফ অয়েলের সাথে ২০০ গ্রাম আয়ুর্বেদিক হেয়ার স্পা প‍্যাক ফ্রি।",
  openGraph: {
    url: "https://www.ayurvedicbyadivashi.com/",
    type: "website",
    title: "AyurvedicbyAdivashi",
    description:
      "আমাদের সুপার সেল কোম্ব প্যাকেজ: ২০০ মিলি আয়ুর্বেদিক হেয়ার অয়েল ও ১৫০ মিলি আয়ুর্বেদিক রিলিফ অয়েলের সাথে ২০০ গ্রাম আয়ুর্বেদিক হেয়ার স্পা প‍্যাক ফ্রি।",
    images: [
      {
        url: "https://www.ayurvedicbyadivashi.com/opengraph-image.png",
        width: 1200,
        height: 1200,
        alt: "AyurvedicbyAdivashi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@yourtwitterhandle",
    title: "AyurvedicbyAdivashi",
    description:
      "আমাদের সুপার সেল কোম্ব প্যাকেজ: ২০০ মিলি আয়ুর্বেদিক হেয়ার অয়েল ও ১৫০ মিলি আয়ুর্বেদিক রিলিফ অয়েলের সাথে ২০০ গ্রাম আয়ুর্বেদিক হেয়ার স্পা প‍্যাক ফ্রি।",
    images: ["https://www.ayurvedicbyadivashi.com/opengraph-image.png"],
  },
  alternates: {
    canonical: "https://www.ayurvedicbyadivashi.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google tag (gtag.js) */}

        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTIC_ID}`}
          strategy="afterInteractive"
        />

        <Script id="google-analytics" strategy="afterInteractive">
          {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTIC_ID}');
  `}
        </Script>

        {/* Facebook Pixel Script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?                         
              n.callMethod.apply(n,arguments):n.queue.push(arguments)}; 
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;
              s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}
              (window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', ${process.env.NEXT_PUBLIC_PIXEL_ID});
              fbq('track', 'PageView');
            `,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src={`https://www.facebook.com/tr?id=${process.env.NEXT_PUBLIC_PIXEL_ID}&ev=PageView&noscript=1`}
            alt="Facebook Pixel"
          />
        </noscript>

        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
    (function(c,l,a,r,i,t,y){
      c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
      t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
      y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "r7ozz862qv");
  `}
        </Script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <PixelTrackerClient />
        {children}
      </body>
    </html>
  );
}
