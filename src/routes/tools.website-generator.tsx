import { createFileRoute } from "@tanstack/react-router";
import { getToolRouteHead, ToolPageForId } from "./tools.$toolId";

export const Route = createFileRoute("/tools/website-generator")({
  head: () => getToolRouteHead("website-generator"),
  component: WebsiteGeneratorPage,
});

function WebsiteGeneratorPage() {
  return <ToolPageForId toolId="website-generator" />;
}
