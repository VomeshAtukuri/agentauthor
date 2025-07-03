import { CheckCircle, Clock, AlertCircle, Pause, RotateCcw, Brain, Settings, Eye, XCircle } from 'lucide-react';
export function getStatusConfig(status: string) {
    const statusUpper = status.toUpperCase();
    switch (statusUpper) {
      case "TASK_COMPLETED":
      case "DONE":
      case "VALIDATED":
        return { 
          color: "bg-green-100 text-green-800 border-green-200", 
          icon: CheckCircle,
          variant: "default" as const
        };
      case "USING_TOOL":
      case "DOING":
      case "RESUMED":
        return { 
          color: "bg-blue-100 text-blue-800 border-blue-200", 
          icon: Settings,
          variant: "secondary" as const
        };
      case "THINKING":
        return { 
          color: "bg-yellow-100 text-yellow-800 border-yellow-200", 
          icon: Brain,
          variant: "outline" as const
        };
      case "NOT_STARTED":
      case "TODO":
        return { 
          color: "bg-gray-100 text-gray-600 border-gray-200", 
          icon: Clock,
          variant: "outline" as const
        };
      case "BLOCKED":
      case "ABORTED":
        return { 
          color: "bg-red-100 text-red-800 border-red-200", 
          icon: XCircle,
          variant: "destructive" as const
        };
      case "PAUSED":
        return { 
          color: "bg-orange-100 text-orange-800 border-orange-200", 
          icon: Pause,
          variant: "outline" as const
        };
      case "REVISE":
        return { 
          color: "bg-purple-100 text-purple-800 border-purple-200", 
          icon: RotateCcw,
          variant: "outline" as const
        };
      case "AWAITING_VALIDATION":
        return { 
          color: "bg-indigo-100 text-indigo-800 border-indigo-200", 
          icon: Eye,
          variant: "secondary" as const
        };
      default:
        return { 
          color: "bg-gray-100 text-gray-600 border-gray-200", 
          icon: AlertCircle,
          variant: "outline" as const
        };
    }
  }