import { createFileRoute } from "@tanstack/react-router";
import { getToolRouteHead, ToolPageForId } from "./tools.$toolId";

export const Route = createFileRoute("/tools/thumbnail-generator")({
  head: () => getToolRouteHead("thumbnail-generator"),
  component: ThumbnailGeneratorPage,
});

function ThumbnailGeneratorPage() {
  return <ToolPageForId toolId="thumbnail-generator" />;
}
