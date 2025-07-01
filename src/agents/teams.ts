import { Team } from "kaibanjs";
import {
  ResearchAgent,
  ContentAgent,
  UIAgent,
  GitHubAgent,
  PublicationAgent,
} from "./agents.js";
import {
  searchTask,
  contentTask,
  uiTask,
  githubTask,
  publicationTask,
} from "./tasks.js";

const TechBlogTeam = new Team({
  name: "Tech Blog Team",
  agents: [ResearchAgent, ContentAgent, UIAgent, GitHubAgent, PublicationAgent],
  tasks: [searchTask, contentTask, uiTask, githubTask, publicationTask],
  inputs: {
    query:
      "The technology topic to be researched and blogged about (e.g., 'Quantum Computing', 'WebAssembly') {query}",
  },
  env: {
    GOOGLE_API_KEY: import.meta.env.VITE_GOOGLE_API_KEY,
  },
  logLevel: "warn",
});

export { TechBlogTeam };
