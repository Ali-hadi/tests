import { createFileRoute } from "@tanstack/react-router";
import { getToolRouteHead, ToolPageForId } from "./tools.$toolId";

export const Route = createFileRoute("/tools/ai-detector")({
  head: () => getToolRouteHead("ai-detector"),
  component: AiDetectorToolPage,
});

function AiDetectorToolPage() {
  return <ToolPageForId toolId="ai-detector" />;
}
