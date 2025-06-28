import { z } from "zod";
import { Tool } from "@langchain/core/tools";

console.log("TavilyTool----------------");

class TavilyTool extends Tool {
  apiKey: string;
  name: string;
  description: string;
  constructor(fields: any) {
    super(fields);
    this.apiKey = fields?.apiKey || "";
    this.name = "Tavily Search";
    this.description =
      "This tool allows you to search for information in Tavily.";
    this.schema = z
      .object({ input: z.string().optional().describe("Describe the expected input") })
      .transform((val) => val.input);
  }

  async _call(input: string) {
    console.log("TavilySearchInput:", input);
    const url = "https://api.tavily.com/search";
    const body = JSON.stringify({
      query: input,
      auto_parameters: false,
      topic: "general",
      search_depth: "advanced",
      chunks_per_source: 3,
      max_results: 1,
      time_range: null,
      days: 7,
      include_answer: true,
      include_raw_content: true,
      include_images: true,
      include_image_descriptions: false,
      include_domains: [],
      exclude_domains: [],
      country: null,
    });
    console.log("TavilySearchBody:", body);
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKey}`,
      },
      
      body: body,
    }).then((res) => res.json());

    console.log("TavilySearchResults:", res.query, res.answer);
    return res;
  }
}

export { TavilyTool };
// class GitHubTool extends Tool {
//   apiKey: string;
//   name: string;
//   description: string;
//   constructor(fields: any) {
//     super(fields);
//     this.name = "GitHub Search";
//     this.description =
//       "This tool allows you to search for information in GitHub.";
//     this.schema = z
//       .object({
//         input: z.string().optional().describe("Describe the expected input"),
//       })
//       .transform((val) => val.input);
//   }
//   async _call(input: string) {
//     const url = "https://api.github.com/users/VomeshAtukuri/repos";
//     // const body = JSON.stringify({
//     //   name: input,
//     //   description: "This is a sample description.",
//     //   homepage: "https://github.com",
//     //   private: false,
//     //   is_template: true,
//     // });

//     const res = await fetch(url, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         "X-GitHub-Api-Version": "2022-11-28",
//         Authorization: `Bearer ${this.apiKey}`,
//       },
//       // body: body,
//     }).then((res) => res.json());

//     console.log("GitHubSearchResults:", res);
//     return res;
//   }
// }

// (async () => {
//   const githubTool = new GitHubTool({
//     apiKey:
//   });

//   const result = await githubTool._call("Hello-World");
//   console.log("Final Result:", result);
// })();

// Instantiate and run
// (async () => {
//   const tavilyTool = new TavilyTool({
//     apiKey: // replace with actual API key
//   });

//   const result = await tavilyTool._call("About Kannappa movie 2025");
//   console.log("Final Result:", result);
// })();
