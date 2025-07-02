import { Task } from "kaibanjs";
import { z } from "zod";
import {
  ResearchAgent,
  ContentAgent,
  UIAgent,
  GitHubAgent,
  PublicationAgent,
} from "./agents.js";

// 🧠 Research Task
const searchTask = new Task({
  title: "Research Task",
  description: `
You are a research assistant. Conduct thorough and up-to-date research on the technology topic: "{query}".
Your goal is to gather high-quality, reliable content suitable for a Medium blog post.

Return the response strictly in the following JSON format:
{
  "title": "A catchy, SEO-friendly blog title",
  "content": "Full research summary including: overview, key contributors, history, trends, and cited sources."
}
  `.trim(),
  expectedOutput: `
A valid JSON object containing:
- "title": Blog post title (string)
- "content": Well-structured and referenced text content (string)
  `.trim(),
  outputSchema: z.object({
    title: z.string().describe("Blog post title"),
    content: z.string().describe("Well-structured and referenced text content"),
  }),
  agent: ResearchAgent,
});

// ✍️ Content Generation Task
const contentTask = new Task({
  title: "Content Generation Task",
  description: `
You are a professional tech writer. Based on the research data provided below from {taskResult:task1}, write a Medium-style blog post.

Research JSON: {taskResult:task1}

Follow this structure:
- Title (use or improve the given one)
- Engaging introduction
- Clear headings and subheadings
- Insights, examples, and quotes (if any)
- Visual suggestions (code, infographics)
- Reflective conclusion
- Use clean Markdown format.
  `.trim(),

  expectedOutput: `
A complete Medium-style blog post in **Markdown format**, including:
- SEO-optimized title
- Proper markdown headings
- Well-formatted sections
- Embedded code or links as needed

Example:
# The Future of WebAssembly in 2025

WebAssembly (Wasm) is redefining the way browsers execute code...
  `.trim(),

  agent: ContentAgent,
});

// 🎨 UI Layout Task
const uiTask = new Task({
  title: "UI Layout Task",
  description: `
You are a frontend designer. Convert the blog post below from {taskResult:task2} into a visually engaging HTML layout.

Markdown content: {taskResult:task2}

Make it:
- Mobile-friendly
- Medium-like in style
- Accessible and easy to read
  `.trim(),
  expectedOutput: `
A Valid JSON object containing:
- "repoName": The name of the GitHub repo to create
- "content": The HTML content for a blog post and name of the repo.
  `.trim(),
  outputSchema: z.object({
    repoName: z
      .string()
      .min(1, { message: "The repository name should not be empty" })
      .max(10, { message: "The repository name should be shorter than 10 characters" })
      .regex(/^[a-z]+$/, { message: "The repository name should only contain lowercase letters" })
      .describe("The name of the GitHub repo to create it should be unique and short less that 10 characters all lowercase"),
    content: z.string().describe("The HTML content for a blog post"),
  }),
  agent: UIAgent,
});

// 🐙 GitHub Publishing Task
const githubTask = new Task({
  title: "GitHub Publishing Task",
  description: `
You are a GitHub publishing assistant. Use the following JSON format of {taskResult:task3} to:
- Create a new GitHub repository using the provided repoName.
- Commit the HTML as an \`index.html\` file in the repo root.
- Ensure it's published and public.
  `.trim(),

  expectedOutput: `
Return a valid JSON object representing the created repo:
- "name": The name of the GitHub repo
- "url": The URL of the GitHub repo
  `.trim(),
  outputSchema: z.object({
    name: z.string().describe("The name of the GitHub repo"),
    url: z.string().describe("The URL of the GitHub repo"),
  }),
  agent: GitHubAgent,
});

// 🚀 Vercel Deployment Task
const publicationTask = new Task({
  title: "Vercel Deployment Task",
  description: `
You are a deployment assistant. Deploy the blog post below (from Task 4) to Vercel using the correct project and settings.
HTML content: {taskResult:task4}
  `.trim(),

  expectedOutput: `
A JSON object with deployment status and link:
- "status": "success" or "error"
- "url": The URL of the deployed blog
  `.trim(),
  outputSchema: z.object({
    status: z.enum(["success", "error"]).describe("Deployment status"),
    url: z.string().describe("The URL of the deployed blog"),
  }),
  agent: PublicationAgent,
});

export { searchTask, contentTask, uiTask, githubTask, publicationTask };
