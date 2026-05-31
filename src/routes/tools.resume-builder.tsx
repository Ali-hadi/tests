import { createFileRoute } from "@tanstack/react-router";
import { AiResumeBuilderPage } from "@/components/tools/AiResumeBuilderPage";
import { getToolRouteHead } from "./tools.$toolId";

export const Route = createFileRoute("/tools/resume-builder")({
  head: () => getToolRouteHead("resume-builder"),
  component: ResumeBuilderPage,
});

function ResumeBuilderPage() {
  return <AiResumeBuilderPage />;
}
