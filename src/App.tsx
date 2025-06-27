import { TechBlogTeam } from "./agents/teams.js";

import { useState } from "react";

const App = () => {
  const [query, setQuery] = useState("");
  const useTeamStore = TechBlogTeam.useStore();

  const { agents, workflowResult,teamWorkflowStatus, tasks } = useTeamStore((state) => ({
    agents: state.agents,
    workflowResult: state.workflowResult,
    teamWorkflowStatus: state.teamWorkflowStatus,
    tasks: state.tasks,
  }));

  function handleStartWorkflow() {
    TechBlogTeam.start({ query });
  }

  return (
    <div className="max-w-4xl mx-auto pt-10 bg-amber-400 p-4">
      <div className="flex flex-row mb-4 gap-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter a topic"
          className="flex-1 px-4 py-2 border border-gray-300 rounded"
        />
        <button
          onClick={handleStartWorkflow}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Start Team Workflow
        </button>
      </div>
      <p>
        Workflow Result:{" "}
        {workflowResult ? JSON.stringify(workflowResult) : "Not started"}
      </p>
      <p>Workflow Status: {teamWorkflowStatus}</p>
      <div>
        <h2>🕵️‍♂️ Agents</h2>+
        {agents.map((agent) => (
          <div key={agent.role}>
            <h3>
              {agent.name}--{agent.status}
            </h3>
          </div>
        ))}
        <p>Tasks:</p>
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2 text-gray-700">
            📦 Task Results
          </h2>
          {tasks.map((task) => (
            <div
              key={task.title}
              className="mb-4 border border-gray-200 rounded-lg bg-gray-50 p-4 shadow-sm"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-lg text-gray-800">
                  {task.title}
                </h3>
                <span className="text-sm font-medium">{task.status}</span>
              </div>
              <p>
                {task.result
                  ? JSON.stringify(task.result, null, 2)
                  : "*Awaiting result...*"}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
