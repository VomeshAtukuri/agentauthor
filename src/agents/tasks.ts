import { Task } from "kaibanjs";
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
Example:
{
  "title": "The Future of WebAssembly in 2025",
  "content": "WebAssembly (Wasm) is a binary instruction format..."
}
  `.trim(),

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
Return a complete HTML document, with:
- Title tag matching the blog title
- Semantic HTML structure (h1-h6, p, blockquote, etc.)
- Styling placeholders (class names or inline styles ok)
- Optional: comments suggesting where to place images or embeds
Example:
{
  "name": "WebAssembly in 2025",
  "content": "<html>
  <head><title>The Future of WebAssembly in 2025</title></head>
  <body>
    <h1>The Future of WebAssembly in 2025</h1>
    <p>WebAssembly (Wasm) is redefining...</p>
  </body>
</html>"
}
  `.trim(),
  agent: UIAgent,
});

// 🐙 GitHub Publishing Task
const githubTask = new Task({
  title: "GitHub Publishing Task",
  description: `
You are a GitHub publishing assistant. Use the following HTML blog post (from Task 3) to:

1. Create a new GitHub repository (name derived from title or use "ai-blog").
2. Commit the HTML as an \`index.html\` file in the repo root.
3. Ensure it's published and public.

HTML content: {taskResult:task3}
  `.trim(),

  expectedOutput: `
Return a valid JSON object representing the created repo:

Example:
{
  "id": 123456789,
  "name": "ai-blog",
  "html_url": "https://github.com/username/ai-blog"
}
  `.trim(),

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

Example:
{
  "status": "success",
  "url": "https://ai-blog.vercel.app"
}
  `.trim(),

  agent: PublicationAgent,
});

export { searchTask, contentTask, uiTask, githubTask, publicationTask };
