import { TechBlogTeam } from "./agents/teams.js";
import Markdown from "react-markdown";
import { useState } from "react";

const App = () => {
  const [query, setQuery] = useState("");
  const useTeamStore = TechBlogTeam.useStore();

  const { agents, workflowResult, teamWorkflowStatus, tasks } = useTeamStore(
    (state) => ({
      agents: state.agents,
      workflowResult: state.workflowResult,
      teamWorkflowStatus: state.teamWorkflowStatus,
      tasks: state.tasks,
    })
  );

  const handleStartWorkflow = () => {
    TechBlogTeam.start({ query });
  };

  return (
    <div className="max-w-5xl mx-auto py-10 px-6 font-sans">
      {/* Input + Button */}
      <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter a tech topic (e.g., WebAssembly)"
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleStartWorkflow}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-5 rounded-lg transition"
        >
          🚀 Create Blog
        </button>
      </div>

      {/* Workflow Status */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-1">
          Workflow Status:
        </h2>
        <p className="text-gray-700 bg-gray-100 px-4 py-2 rounded shadow-sm inline-block">
          {teamWorkflowStatus || "Not started"}
        </p>
      </div>

      {/* Final Blog Output */}
      <div className="mb-10">
        <h2 className="text-xl font-bold text-gray-800 mb-3">📄 Final Blog Output</h2>
        <div className="prose max-w-none bg-white p-6 border border-gray-200 rounded-lg shadow">
          {typeof workflowResult === "string" ? (
            <Markdown>{workflowResult}</Markdown>
          ) : workflowResult ? (
            <pre className="whitespace-pre-wrap text-sm text-gray-800">
              {JSON.stringify(workflowResult, null, 2)}
            </pre>
          ) : (
            <p className="text-gray-500 italic">Not generated yet</p>
          )}
        </div>
      </div>

      {/* Agents Status */}
      <div className="mb-10">
        <h2 className="text-xl font-bold text-gray-800 mb-3">🧠 Agent Status</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {agents.map((agent) => (
            <li
              key={agent.id}
              className="bg-gray-50 border border-gray-200 p-4 rounded-lg shadow-sm"
            >
              <p className="text-md font-medium text-gray-900">
                {agent.name}
              </p>
              <p className="text-sm text-gray-600">Status: {agent.status}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Task Results */}
      <div className="mb-10">
        <h2 className="text-xl font-bold text-gray-800 mb-3">📦 Task Results</h2>
        {tasks.length === 0 ? (
          <p className="text-gray-500 italic">No tasks executed yet</p>
        ) : (
          tasks.map((task) => (
            <div
              key={task.id}
              className="mb-6 border border-gray-200 rounded-lg bg-white p-5 shadow-sm"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold text-gray-800">
                  {task.title}
                </h3>
                <span className="text-sm px-2 py-1 bg-gray-100 rounded font-medium text-gray-700">
                  {task.status}
                </span>
              </div>
              <div className="text-gray-700 text-sm whitespace-pre-wrap">
                {typeof task.result === "string" ? (
                  <Markdown>
                    {task.result}
                  </Markdown>
                ) : (
                  <pre className="bg-gray-50 p-3 rounded text-xs overflow-auto">
                    {JSON.stringify(task.result, null, 2)}
                  </pre>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default App;