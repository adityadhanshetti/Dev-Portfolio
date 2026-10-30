import { Outlet } from "react-router";
import { SmoothScrollProvider } from "@/components/motion/SmoothScrollProvider";
import { Navbar } from "@/components/dovv/Navbar";
import { Footer } from "@/components/sections/Footer";
import { CustomCursor } from "@/components/motion/CustomCursor";
import { Preloader } from "@/components/motion/Preloader";
import { FloatingAmbientCards } from "@/components/motion/FloatingAmbientCards";
import { PreloaderProvider } from "@/lib/preloader-context";

/**
 * RootLayout — Shell wrapping all routes.
 * Includes fixed DOVV Studio top navbar and full-width layout.
 */
export function RootLayout() {
  return (
    <PreloaderProvider>
      <SmoothScrollProvider>
        <Preloader />
        <CustomCursor />

        {/* Top Navbar — DOVV Studio style */}
        <Navbar />

        {/* Skip link — accessibility */}
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>

        {/* Floating parallax ambient photo cards in background */}
        <FloatingAmbientCards />

        {/* Main content area */}
        <main id="main-content" className="w-full">
          <Outlet />
        </main>

        {/* Footer */}
        <Footer />
      </SmoothScrollProvider>
    </PreloaderProvider>
  );
}
