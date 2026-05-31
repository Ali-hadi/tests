import { createFileRoute } from "@tanstack/react-router";
import { getToolRouteHead, ToolPageForId } from "./tools.$toolId";

export const Route = createFileRoute("/tools/chatbot-saas")({
  head: () => getToolRouteHead("chatbot-saas"),
  component: ChatbotSaasPage,
});

function ChatbotSaasPage() {
  return <ToolPageForId toolId="chatbot-saas" />;
}
