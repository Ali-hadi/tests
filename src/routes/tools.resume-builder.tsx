import { createFileRoute } from "@tanstack/react-router";
import { getToolRouteHead, ToolPageForId } from "./tools.$toolId";

export const Route = createFileRoute("/tools/resume-builder")({
  head: () => getToolRouteHead("resume-builder"),
  component: ResumeBuilderPage,
});

function ResumeBuilderPage() {
  return <ToolPageForId toolId="resume-builder" />;
}
