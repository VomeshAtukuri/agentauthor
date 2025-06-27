import { Task } from "kaibanjs";
import { ResearchAgent, ContentAgent, UIAgent, PublicationAgent } from "./agents.js";

const searchTask = new Task({
  description: 'Research detailed and up-to-date information about the technology topic: {query}, suitable for writing an engaging Medium blog post.',
  expectedOutput: `A comprehensive research summary on "{query}" including:
  - A brief and clear overview
  - Key players or companies involved
  - Important milestones or historical context
  - Current trends, innovations, or use cases
  - Relevant statistics or quotes (if available)`,
  agent: ResearchAgent
});

const contentTask = new Task({
  description: 'Create a Medium-style blog post based on the research data from task1: {taskResult:task1}.',
  expectedOutput: `A Medium-friendly blog article including:
  - A catchy title and engaging introduction
  - A clear structure with headings and sections
  - Insights about the technology, its impact, and future relevance
  - Visual suggestions (images, code snippets, infographics)
  - A personal or thoughtful conclusion`,
  agent: ContentAgent
});

const uiTask = new Task({
  description: 'Design and structure the blog post UI for Medium formatting based on task2: {taskResult:task2}.',
  expectedOutput: `A layout or content structure tailored for Medium:
  - Markdown or Medium-compatible formatting
  - Embedded elements (code, quotes, links) with appropriate styling
  - Clear content flow (intro, body, conclusion)
  - Optional call-to-action or author bio section`,
  agent: UIAgent
});

const publicationTask = new Task({
  description: 'Publish the blog post on Medium using the final content and UI structure from task3: {taskResult:task3}.',
  expectedOutput: `A live Medium blog post with:
  - Proper formatting and clean visual presentation
  - SEO-optimized title, tags, and summary
  - Author attribution and publication under appropriate Medium publication (if applicable)
  - Shareable URL of the published article`,
  agent: PublicationAgent
});

export { searchTask, contentTask, uiTask, publicationTask };