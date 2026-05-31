import { createFileRoute } from "@tanstack/react-router";
import { getToolRouteHead, ToolPageForId } from "./tools.$toolId";

export const Route = createFileRoute("/tools/portfolio-builder")({
  head: () => getToolRouteHead("portfolio-builder"),
  component: PortfolioBuilderPage,
});

function PortfolioBuilderPage() {
  return <ToolPageForId toolId="portfolio-builder" />;
}
