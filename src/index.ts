import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { LinearClient } from './linear/index.js';
import { registerIssueTools, registerCommentTools, registerLabelTools } from './tools/index.js';
import { appConfig } from './config.js';

// Parse tool options from environment variables
const getEnabledTools = (): string[] => {
  const toolsEnv = process.env.LINEAR_MCP_TOOLS;
  if (!toolsEnv) {
    // Default: all tools enabled
    return ['issues', 'comments', 'labels'];
  }
  return toolsEnv.split(',').map(t => t.trim());
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
    const verbose = isVerboseLogging();
    
    if (verbose) {
      console.error('Starting Linear Issues MCP Server with tools:', enabledTools);
    }

    // Create Linear API client
    const linearClient = new LinearClient({
      apiKey: appConfig.linear.apiKey,
      baseUrl: appConfig.linear.baseUrl,
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
      registerIssueTools(server, linearClient);
    }
    
    if (enabledTools.includes('comments')) {
      if (verbose) {
        console.error('Registering comment tools...');
      }
      registerCommentTools(server, linearClient);
    }
    
    if (enabledTools.includes('labels')) {
      if (verbose) {
        console.error('Registering label tools...');
      }
      registerLabelTools(server, linearClient);
    }

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