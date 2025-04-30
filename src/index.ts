import { McpServer, RegisteredTool } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { LinearClient } from '@linear/sdk';
import {
  registerIssueTools,
  registerCommentTools,
  registerLabelTools,
  registerProjectTools,
  registerTeamTools,
  registerUserTools,
} from './tools/index.js';
import { appConfig } from './config.js';
import { z } from 'zod';

// Parse tool options from environment variables
const getEnabledTools = (): string[] => {
  const toolsEnv = process.env.LINEAR_MCP_TOOLS;
  if (!toolsEnv) {
    // Default: all tools enabled
    return ['issues', 'comments', 'labels', 'projects', 'teams', 'users'];
  }
  return toolsEnv.split(',').map((t) => t.trim());
};

// Check if verbose logging is enabled
const isVerboseLogging = (): boolean => {
  return process.env.LINEAR_MCP_VERBOSE === 'true';
};

/**
 * Initialize and start the MCP server for Linear Issues
 */
async function main() {
  try {
    const enabledTools = getEnabledTools();
    const allTools: Record<string, RegisteredTool> = {};
    const verbose = isVerboseLogging();

    if (verbose) {
      console.error('Starting Linear Issues MCP Server with tools:', enabledTools);
    }

    // Create Linear API client
    const linearClient = new LinearClient({
      apiKey: appConfig.linear.apiKey,
    });

    // Create MCP server
    const server = new McpServer({
      name: appConfig.server.name,
      version: appConfig.server.version,
    });

    // Register tools based on options
    if (enabledTools.includes('issues')) {
      if (verbose) {
        console.error('Registering issue tools...');
      }
      const issueTools = registerIssueTools(server, linearClient);
      for (const tool of Object.values(issueTools)) {
        allTools[tool.name] = tool.tool;
        tool.tool.disable();
      }
    }

    if (enabledTools.includes('comments')) {
      if (verbose) {
        console.error('Registering comment tools...');
      }
      const commentTools = registerCommentTools(server, linearClient);
      for (const tool of Object.values(commentTools)) {
        allTools[tool.name] = tool.tool;
        tool.tool.disable();
      }
    }

    if (enabledTools.includes('labels')) {
      if (verbose) {
        console.error('Registering label tools...');
      }
      const labelTools = registerLabelTools(server, linearClient);
      for (const tool of Object.values(labelTools)) {
        allTools[tool.name] = tool.tool;
        tool.tool.disable();
      }
    }

    if (enabledTools.includes('projects')) {
      if (verbose) {
        console.error('Registering project tools...');
      }
      const projectTools = registerProjectTools(server, linearClient);
      for (const tool of Object.values(projectTools)) {
        allTools[tool.name] = tool.tool;
        tool.tool.disable();
      }
    }

    if (enabledTools.includes('teams')) {
      if (verbose) {
        console.error('Registering team tools...');
      }
      const teamTools = registerTeamTools(server, linearClient);
      for (const tool of Object.values(teamTools)) {
        allTools[tool.name] = tool.tool;
        tool.tool.disable();
      }
    }

    if (enabledTools.includes('users')) {
      if (verbose) {
        console.error('Registering user tools...');
      }
      const userTools = registerUserTools(server, linearClient);
      for (const tool of Object.values(userTools)) {
        allTools[tool.name] = tool.tool;
        tool.tool.disable();
      }
    }

    // register getLinearTools tool
    server.tool(
      'getLinearTools',
      'Retrieves a list of all registered tools in the Linear MCP server. Use this tool to get an overview of all available tools and their configurations. This is helpful for understanding the capabilities of the server and for debugging purposes.',
      {},
      async () => {
        const allToolNamesAndDescriptions = Object.entries(allTools).map((tool) => ({
          name: tool[0],
          description: tool[1].description,
        }));

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(allToolNamesAndDescriptions, null, 2),
            },
          ],
        };
      }
    );

    // register enableLinearTool tool
    server.tool(
      'enableLinearTool',
      'Enables a specific tool in the Linear MCP server. Use this tool to activate a tool that has been previously registered but is currently disabled. This is helpful for dynamically enabling tools based on user input or other conditions.',
      {
        toolName: z.string().describe('Name of the tool to enable'),
      },
      async ({ toolName }) => {
        const tool = allTools[toolName];
        if (!tool) {
          throw new Error(`Tool ${toolName} not found`);
        }
        tool.enable();
        return {
          content: [
            {
              type: 'text',
              text: `Tool ${toolName} enabled`,
            },
          ],
        };
      }
    );

    // Create transport
    const transport = new StdioServerTransport();

    // Connect the server to the transport
    if (verbose) {
      console.error('Connecting to transport...');
    }
    await server.connect(transport);

    if (verbose) {
      console.error('Linear Issues MCP Server started successfully');
    }
  } catch (error) {
    console.error('Error starting Linear Issues MCP Server:', error);
    process.exit(1);
  }
}

// Start the server
main().catch((error) => {
  console.error('Unhandled error:', error);
  process.exit(1);
});
