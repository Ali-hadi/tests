import { siteConfig } from "@/lib/seo";
import type { ReactNode } from "react";

type EmailActionProps = {
  className?: string;
  children: ReactNode;
};

export function EmailAction({ className, children }: EmailActionProps) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => window.location.assign(`mailto:${siteConfig.email}`)}
    >
      {children}
    </button>
  );
}
