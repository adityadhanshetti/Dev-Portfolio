import { Link } from "react-router";
import { Button } from "@/components/ui/Button";

/**
 * NotFound — custom 404 matching the design system.
 */
export function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <span className="eyebrow mb-6">Error 404</span>
      <h1
        className="font-display mb-4"
        style={{ fontSize: "var(--text-h1)" }}
      >
        Signal lost
      </h1>
      <p className="text-text-muted mb-8 max-w-md">
        This page doesn't exist in the session log.
        Let's get you back to the main feed.
      </p>
      <Button as="a" href="/" variant="primary">
        ← Return to session
      </Button>
    </div>
  );
}

