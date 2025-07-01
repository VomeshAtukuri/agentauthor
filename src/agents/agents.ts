import { Agent } from "kaibanjs";
import { TavilyTool, GitHubTool, VercelTool } from "./tools.ts";

const githubTool = new GitHubTool({
  apiKey: import.meta.env.VITE_GITHUB_API_KEY,
});

const vercelTool = new VercelTool({
  apiKey: import.meta.env.VITE_VERCEL_API_KEY,
});

const tavilyTool = new TavilyTool({
  apiKey: import.meta.env.VITE_TAVILY_API_KEY,
});

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
  goal: "To generate high-quality, context-aware content give data in json format.",
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
  goal: "To build user-friendly front-end experiences, including crafting clean and professional UI layouts.",
  background: "Experienced in UI/UX design and frontend development.",
  llmConfig: {
    provider: "google",
    model: "gemini-1.5-pro",
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  },
});

const GitHubAgent = new Agent({
  name: "Github Agent",
  role: "The Github Agent",
  goal: "To ensure content is published accurately and professionally using the tool provided.",
  background: "Experienced in publishing content into a GitHub repository.",
  
  llmConfig: {
    provider: "google",
    model: "gemini-1.5-pro",
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  },
  tools: [githubTool], // Use the class or a compatible instance, not the constructed object
});

const PublicationAgent = new Agent({
  name: "Publication Agent",
  role: "The Publication Agent",
  goal: "To ensure content is published accurately and professionally using the tool provided.",
  background:
    "Experienced in content publishing, SEO, and deployment workflows.",
  llmConfig: {
    provider: "google",
    model: "gemini-1.5-pro",
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  },
  tools: [vercelTool],
});

export { ResearchAgent, ContentAgent, UIAgent, GitHubAgent, PublicationAgent };
