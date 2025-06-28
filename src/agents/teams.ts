import { Team } from "kaibanjs";
import { ResearchAgent, ContentAgent, UIAgent, PublicationAgent } from "./agents.js";
import { searchTask, contentTask, uiTask, publicationTask } from "./tasks.js";

const TechBlogTeam = new Team({
  name: "Tech Blog Team",
  agents: [ResearchAgent, ContentAgent, UIAgent],
  tasks: [searchTask, contentTask, uiTask],
  inputs: {
    query: "The technology topic to be researched and blogged about (e.g., 'Quantum Computing', 'WebAssembly') {query}"
  },
  env: {
    GOOGLE_API_KEY: import.meta.env.VITE_GOOGLE_API_KEY
  },
  logLevel: "warn",
});

export { TechBlogTeam };