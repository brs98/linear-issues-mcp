import { z } from 'zod';
import { LinearClient } from '@linear/sdk';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';

/**
 * Register team-related tools with the MCP server
 */
export function registerUserTools(server: McpServer, linearClient: LinearClient) {
  server.tool(
    'getUserById',
    {
      userId: z.custom<Parameters<(typeof linearClient)['user']>[0]>(),
    },
    async ({ userId }) => {
      try {
        const user = await linearClient.user(userId);
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(user, null, 2),
            },
          ],
        };
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        return {
          content: [
            {
              type: 'text',
              text: `Error fetching user: ${errorMessage}`,
            },
          ],
          isError: true,
        };
      }
    }
  );

  server.tool(
    'getUsers',
    {
      variables: z.custom<Parameters<(typeof linearClient)['users']>[0]>().optional(),
    },
    async ({ variables }) => {
      try {
        const users = await linearClient.users(variables);
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(users, null, 2),
            },
          ],
        };
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        return {
          content: [
            {
              type: 'text',
              text: `Error fetching users: ${errorMessage}`,
            },
          ],
          isError: true,
        };
      }
    }
  );
}
