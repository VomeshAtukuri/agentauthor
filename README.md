# AgentAuthor ✍️🤖

**AgentAuthor** is an autonomous blog-generation platform powered by multi-agent systems. Simply give a topic name, and AgentAuthor will handle everything — from research to writing, HTML generation, GitHub commits, and live publishing on Vercel. All with minimal human input.

## 🌟 Features

- 🧠 **Research Agent**: Gathers contextual data using [Tavily API](https://www.tavily.com/).
- 🗣️ **Content Agent**: Rewrites content to be more friendly and engaging using Google LLMs.
- 🎨 **UI Agent**: Converts content into a full HTML blog page.
- 🛠️ **GitHub Agent**: Pushes the generated HTML file to a GitHub repository.
- 🚀 **Publishing Agent**: Deploys the blog to [Vercel](https://vercel.com/) for public access.

## ⚙️ Technologies Used

- **React** – Frontend framework for building the user interface.
- **Kaiban.js** – Agent orchestration and task management framework.
- **Google API (LLMs)** – Used for content generation and rewriting.
- **Tavily API** – Performs contextual and intelligent web search.
- **Vercel** – For seamless blog deployment.
- **GitHub API** – Used to commit and push blog files automatically.

## 🧠 How It Works

1. **User Input**: You provide a topic and click "Create Blog".
2. **Tavily Agent**: Researches the topic from the web.
3. **Content Agent**: Rewrites the researched content in a friendly, engaging tone.
4. **UI Agent**: Generates an HTML version of the blog.
5. **GitHub Agent**: Pushes the blog page to a GitHub repo.
6. **Publishing Agent**: Deploys the blog to Vercel.

## 🤖 Understanding Kaiban.js Concepts

Kaiban.js powers the multi-agent logic in AgentAuthor. Here's how it works:

### 🧑‍🤝‍🧑 Teams
A **Team** is a group of agents working collaboratively toward a shared goal. In AgentAuthor, teams are formed dynamically based on the task (e.g., writing a blog, publishing it).

### 🤖 Agents
An **Agent** is an autonomous unit responsible for a specific task. Each agent has skills, tools, and a role. Examples:
- `ResearchAgent`
- `ContentAgent`
- `UIAgent`
- `GithubAgent`
- `PublishingAgent`

### 🛠️ Tools
**Tools** are external utilities or APIs that an agent can use. For example:
- Tavily API (used by ResearchAgent)
- Google LLMs (used by ContentAgent)
- GitHub API (used by GithubAgent)

### 📋 Tasks
**Tasks** are atomic units of work that agents complete. Tasks are assigned by the team or a coordinating agent. For example:
- "Search for latest info on climate change"
- "Rewrite paragraph to be friendly"
- "Create an HTML page with blog content"
- "Push file to GitHub"
- "Deploy site to Vercel"

---

## 🚀 Getting Started

Coming soon...

(You can expand this with setup instructions, API key setup, etc.)

## 🙌 Contributing

Contributions are welcome! Feel free to submit issues or pull requests.

## 📫 Contact

For questions or collaboration, feel free to reach out.


