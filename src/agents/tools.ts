import { TavilySearchResults } from '@kaibanjs/tools';

const tavilyTool = new TavilySearchResults({ 
    apiKey: import.meta.env.VITE_TAVILY_API_KEY,
    maxResults: 5 
});

export { tavilyTool };