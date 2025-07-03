"use client";

import { TechBlogTeam } from "./agents/teams.js";
import Markdown from "react-markdown";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Rocket, FileText, Users, Loader2, Zap, Settings } from "lucide-react";
import React from "react";
import { getStatusConfig } from "./lib/color";
import { set } from "zod";

const App = () => {
  const [query, setQuery] = useState("");
  const useTeamStore = TechBlogTeam.useStore();
  const [create, setCreate] = useState(false);

  const { agents, workflowResult, teamWorkflowStatus, tasks } = useTeamStore(
    (state) => ({
      agents: state.agents,
      workflowResult: state.workflowResult,
      teamWorkflowStatus: state.teamWorkflowStatus,
      tasks: state.tasks,
    })
  );

  const handleStartWorkflow = () => {
    setCreate(true);
    TechBlogTeam.start({ query });
  };

  const completedTasks = tasks.filter((task) =>
    ["DONE", "TASK_COMPLETED"].includes(task.status.toUpperCase())
  ).length;
  const totalTasks = tasks.length;
  const progressPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
  useEffect(() => {
    if (progressPercentage === 100 && create) {
      setCreate(false);
      setQuery("");
    }
  }, [progressPercentage, create]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            AI Tech Blog Generator
          </h1>
          <p className="text-lg text-gray-600">
            Create comprehensive tech blogs with our AI agent team
          </p>
        </div>

        <Card className="mb-8 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Enter a tech topic (e.g., WebAssembly, Machine Learning, Blockchain)"
                  className="h-12 text-lg border-2 focus:border-blue-500 transition-colors"
                  disabled={create}
                />
              </div>
              <Button
                onClick={handleStartWorkflow}
                disabled={create}
                size="lg"
                className="h-12 px-8 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
              >
                {!create ? (
                  <>
                    <Rocket className="w-5 h-5 mr-2" />
                    Create Blog
                  </>
                ) : (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Generating...
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {teamWorkflowStatus && (
          <Card className="mb-8 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <Zap className="w-6 h-6 text-blue-600" />
                  <h2 className="text-xl font-semibold text-gray-900">
                    Workflow Status
                  </h2>
                </div>
                <Badge
                  variant={getStatusConfig(teamWorkflowStatus).variant}
                  className={`${
                    getStatusConfig(teamWorkflowStatus).color
                  } px-3 py-1 text-sm font-medium`}
                >
                  {React.createElement(
                    getStatusConfig(teamWorkflowStatus).icon,
                    { className: "w-4 h-4 mr-1" }
                  )}
                  {teamWorkflowStatus}
                </Badge>
              </div>

              {totalTasks > 0 && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Progress</span>
                    <span>
                      {completedTasks} of {totalTasks} tasks completed
                    </span>
                  </div>
                  <Progress value={progressPercentage} className="h-2" />
                </div>
              )}
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-2 space-y-8">
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <FileText className="w-6 h-6 text-green-600" />
                  Final Blog Output
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="min-h-[200px] max-h-[600px] overflow-y-auto">
                  {typeof workflowResult === "string" ? (
                    <div className="prose prose-lg max-w-none">
                      <Markdown>{workflowResult}</Markdown>
                    </div>
                  ) : workflowResult ? (
                    <pre className="bg-gray-50 p-4 rounded-lg text-sm overflow-auto border">
                      {JSON.stringify(workflowResult, null, 2)}
                    </pre>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <FileText className="w-16 h-16 text-gray-300 mb-4" />
                      <p className="text-gray-500 text-lg">
                        Blog content will appear here
                      </p>
                      <p className="text-gray-400 text-sm mt-2">
                        Enter a topic and click "Create Blog" to get started
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <Settings className="w-6 h-6 text-blue-600" />
                  Task Results
                </CardTitle>
              </CardHeader>
              <CardContent>
                {tasks.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <Settings className="w-16 h-16 text-gray-300 mb-4" />
                    <p className="text-gray-500 text-lg">
                      No tasks executed yet
                    </p>
                    <p className="text-gray-400 text-sm mt-2">
                      Tasks will appear here as the workflow progresses
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {tasks.map((task, index) => {
                      const statusConfig = getStatusConfig(task.status);
                      return (
                        <Card
                          key={task.id}
                          className="border border-gray-200 hover:shadow-md transition-shadow"
                        >
                          <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-sm">
                                  {index + 1}
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900">
                                  {task.title}
                                </h3>
                              </div>
                              <Badge
                                variant={statusConfig.variant}
                                className={`${statusConfig.color} px-2 py-1 text-xs font-medium`}
                              >
                                {React.createElement(statusConfig.icon, {
                                  className: "w-3 h-3 mr-1",
                                })}
                                {task.status}
                              </Badge>
                            </div>
                          </CardHeader>
                          <CardContent className="pt-0">
                            <div className="max-h-64 overflow-y-auto">
                              {typeof task.result === "string" ? (
                                <div className="prose prose-sm max-w-none">
                                  <Markdown>{task.result}</Markdown>
                                </div>
                              ) : (
                                <pre className="bg-gray-50 p-3 rounded text-xs overflow-auto border text-gray-700">
                                  {JSON.stringify(task.result, null, 2)}
                                </pre>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-8">
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <Users className="w-6 h-6 text-purple-600" />
                  Agent Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                {agents.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <Users className="w-12 h-12 text-gray-300 mb-3" />
                    <p className="text-gray-500">No agents active</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {agents.map((agent) => {
                      const statusConfig = getStatusConfig(agent.status);
                      return (
                        <Card
                          key={agent.id}
                          className="border border-gray-100 hover:border-gray-200 transition-colors"
                        >
                          <CardContent className="p-4">
                            <div className="flex items-center gap-3 mb-2">
                              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                                {agent.name.charAt(0)}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="font-medium text-gray-900 truncate">
                                  {agent.name}
                                </p>
                                <Badge
                                  variant={statusConfig.variant}
                                  className={`${statusConfig.color} px-2 py-0.5 text-xs font-medium mt-1`}
                                >
                                  {React.createElement(statusConfig.icon, {
                                    className: "w-3 h-3 mr-1",
                                  })}
                                  {agent.status}
                                </Badge>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>

            {(tasks.length > 0 || agents.length > 0) && (
              <Card className="shadow-lg border-0 bg-gradient-to-br from-blue-50 to-purple-50">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl text-gray-900">
                    Statistics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Active Agents</span>
                    <span className="font-semibold text-lg text-blue-600">
                      {agents.length}
                    </span>
                  </div>
                  <Separator />
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Tasks</span>
                    <span className="font-semibold text-lg text-purple-600">
                      {totalTasks}
                    </span>
                  </div>
                  <Separator />
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Completed</span>
                    <span className="font-semibold text-lg text-green-600">
                      {completedTasks}
                    </span>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
