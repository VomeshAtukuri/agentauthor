import { Task } from "kaibanjs";
import {
  ResearchAgent,
  ContentAgent,
  UIAgent,
  GitHubAgent,
  PublicationAgent,
} from "./agents.js";

const searchTask = new Task({
  description: `Conduct thorough and up-to-date research on the topic: "{query}".
Your goal is to gather comprehensive and credible information suitable for creating an informative and engaging Medium blog post.`,

  expectedOutput: `Detailed research summary on "{query}" including:
- A concise and clear topic overview
- Key contributors (companies, tools, thought leaders)
- Historical background and major milestones
- Current trends, innovations, or use cases
- Supporting data, statistics, or quotes with source attribution
- JSON format example for easy integration: { "title": "Blog Post Title", "content": "Blog Post Content" }`,

  agent: ResearchAgent,
});

const contentTask = new Task({
  description: `Use the research from task1: {taskResult:task1} to write a professional Medium-style blog post.
The tone should be friendly, informative, and engaging — suitable for a tech-savvy general audience.`,

  expectedOutput: `A Medium-style blog post including:
- Catchy and SEO-friendly title
- Engaging introduction that hooks readers
- Structured content with clear section headings
- Insightful discussion with data and real-world examples
- Visual suggestions (images, infographics, code snippets)
- Reflective or forward-looking conclusion
- Clean and well-structured Markdown format`,

  agent: ContentAgent,
});

const uiTask = new Task({
  description: `Design a clean and visually engaging blog post layout based on the article from task2: {taskResult:task2}.
Ensure it fits Mediums aesthetic style and promotes readability.`,

  expectedOutput: `A Medium-compatible blog layout with:
- Proper heading hierarchy and text formatting
- Highlighted key quotes or callouts
- Style suggestions for code blocks or lists
- Visual layout placeholders (e.g., images, embeds)
- Clear structure with good spacing and alignment
- Mobile-friendly and accessible formatting
- HTML format example: <html><head><title>Blog Post Title</title></head><body><h1>Blog Post Title</h1><p>Blog Post Content</p></body></html>`,
  agent: UIAgent,
});

const githubTask = new Task({
  description: `Publish the blog post using content and layout from task3: {taskResult:task3} on a markdown-compatible site (e.g., GitHub Pages).
Ensure the formatting remains intact and visually clean.`,

  expectedOutput: `Deployed blog post that includes:
- Markdown or HTML version with correct styling
- Integrated visuals and code formatting
- Metadata (title, summary, tags) for SEO
- Clean, public-facing URL
- Notes on deployment method (e.g., CI/CD, GitHub Pages)
- JSON format example:
{
  "id": 1296269,
  "node_id": "MDEwOlJlcG9zaXRvcnkxMjk2MjY5",
  "name": "Hello-World",
  "full_name": "octocat/Hello-World",
  "private": false,
  "html_url": "https://github.com/octocat/Hello-World"
}`,

  agent: GitHubAgent,
});

const publicationTask = new Task({
  description: `Publish the final blog post to Medium using content and layout from task4: {taskResult:task4}.
Ensure the post is cleanly formatted, searchable, and attributed properly.`,

  expectedOutput: `Live Medium article including:
- Fully formatted and visually polished content
- Engaging SEO title and relevant tags
- Author attribution and publication context (if applicable)
- Embedded media or code if included in layout
- Public Medium URL ready to be shared`,

  agent: PublicationAgent,
});

export { searchTask, contentTask, uiTask, githubTask, publicationTask };
