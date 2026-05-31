import { createFileRoute } from "@tanstack/react-router";
import { getToolRouteHead, ToolPageForId } from "./tools.$toolId";

export const Route = createFileRoute("/tools/domain-generator")({
  head: () => getToolRouteHead("domain-generator"),
  component: DomainGeneratorPage,
});

function DomainGeneratorPage() {
  return <ToolPageForId toolId="domain-generator" />;
}
