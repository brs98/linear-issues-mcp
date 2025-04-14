import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { LinearClient } from './linear/index.js';
import { registerIssueTools, registerCommentTools, registerLabelTools } from './tools/index.js';
import { appConfig } from './config.js';

/**
 * Initialize and start the MCP server for Linear Issues
 */
async function main() {
  try {
    console.error('Starting Linear Issues MCP Server...');

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

    // Register tools
    registerIssueTools(server, linearClient);
    registerCommentTools(server, linearClient);
    registerLabelTools(server, linearClient);

    // Create transport
    const transport = new StdioServerTransport();

    // Connect the server to the transport
    console.error('Connecting to transport...');
    await server.connect(transport);
    console.error('Linear Issues MCP Server started successfully');
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