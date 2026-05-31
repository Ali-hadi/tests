import { createFileRoute } from "@tanstack/react-router";
import { getToolRouteHead, ToolPageForId } from "./tools.$toolId";

export const Route = createFileRoute("/tools/proposal-generator")({
  head: () => getToolRouteHead("proposal-generator"),
  component: ProposalGeneratorPage,
});

function ProposalGeneratorPage() {
  return <ToolPageForId toolId="proposal-generator" />;
}
