import { Agent } from "kaibanjs";
import { tavilyTool } from "./tools.js";

const ResearchAgent = new Agent({
  name: "Research Agent",
  role: "The Research Agent",
  goal: "To gather reliable data from online sources.",
  background: "Expert in web research and data extraction.",
  tools: [tavilyTool],
  llmConfig: {
    provider: "google",
    model: "gemini-1.5-pro",
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  },
});

const ContentAgent = new Agent({
  name: "Content Agent",
  role: "The Content Agent",
  goal: "To generate high-quality, context-aware content.",
  background: "Skilled in content creation, writing, and summarization.",
  llmConfig: {
    provider: "google",
    model: "gemini-1.5-pro",
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  },
});

const UIAgent = new Agent({
  name: "UI Agent",
  role: "The UI Agent",
  goal: "To build user-friendly front-end experiences.",
  background: "Experienced in UI/UX design and frontend development.",
  llmConfig: {
    provider: "google",
    model: "gemini-1.5-pro",
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  },
});

const PublicationAgent = new Agent({
  name: "Publication Agent",
  role: "The Publication Agent",
  goal: "To ensure content is published accurately and professionally.",
  background:
    "Experienced in content publishing, SEO, and deployment workflows.",
  llmConfig: {
    provider: "google",
    model: "gemini-1.5-pro",
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  },
});

export { ResearchAgent, ContentAgent, UIAgent, PublicationAgent };