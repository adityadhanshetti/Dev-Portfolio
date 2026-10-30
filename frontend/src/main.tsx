import { StrictMode, lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import { RootLayout } from "@/app/RootLayout";
import { HomePage } from "@/app/HomePage";
import { NotFound } from "@/app/NotFound";
import "./index.css";

const CaseStudyPage = lazy(() =>
  import("@/app/CaseStudyPage").then((m) => ({ default: m.CaseStudyPage }))
);
const PersonalityPage = lazy(() =>
  import("@/app/PersonalityPage").then((m) => ({ default: m.PersonalityPage }))
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "work/:slug",
        element: (
          <Suspense fallback={<div className="min-h-screen" />}>
            <CaseStudyPage />
          </Suspense>
        ),
      },
      {
        path: "me",
        element: (
          <Suspense fallback={<div className="min-h-screen" />}>
            <PersonalityPage />
          </Suspense>
        ),
      },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

