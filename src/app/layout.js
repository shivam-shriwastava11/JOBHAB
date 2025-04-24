import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/header";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });


export const metadata = {
  title: "JOBHUB:- Carrer Coach",
  description: "(give some discription)",
};





export default function RootLayout({ children }) {
  return (

    <>
      <ClerkProvider appearance={{
        baseTheme:dark,
      }}>
        <html lang="en" suppressHydrationWarning>
          <head />
          <body className={'${inter.className}'}>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {/* header */}
              <Header />
              <main className="min-h-screen"> {children} </main>
              <Toaster richColors />


              {/* footer */}
              <footer className="bg-white/50 py-12">
                <div className="container mx-auto px-4 text-center text-gray-200">
                  <p>💕"Built with brilliance by TechNinjas"💕</p>
                </div>

              </footer>

            </ThemeProvider>
          </body>
        </html>
      </ClerkProvider>
    </>
  )
}

