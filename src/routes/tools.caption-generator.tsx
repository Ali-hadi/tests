import { createFileRoute } from "@tanstack/react-router";
import { getToolRouteHead, ToolPageForId } from "./tools.$toolId";

export const Route = createFileRoute("/tools/caption-generator")({
  head: () => getToolRouteHead("caption-generator"),
  component: CaptionGeneratorPage,
});

function CaptionGeneratorPage() {
  return <ToolPageForId toolId="caption-generator" />;
}
