import { createFileRoute } from "@tanstack/react-router";
import { getToolRouteHead, ToolPageForId } from "./tools.$toolId";

export const Route = createFileRoute("/tools/ai-humanizer")({
  head: () => getToolRouteHead("ai-humanizer"),
  component: AiHumanizerPage,
});

function AiHumanizerPage() {
  return <ToolPageForId toolId="ai-humanizer" />;
}
