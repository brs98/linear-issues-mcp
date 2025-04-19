import { z } from 'zod';
import { LinearClient } from '@linear/sdk';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';

/**
 * Register user-related tools with the MCP server
 */
export function registerUserTools(server: McpServer, linearClient: LinearClient) {
  server.tool(
    'getUserById',
    {
      userId: z
        .custom<Parameters<(typeof linearClient)['user']>[0]>()
        .describe('ID of the user to fetch'),
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
      variables: z
        .custom<Parameters<(typeof linearClient)['users']>[0]>()
        .optional()
        .describe('Input for fetching users'),
    },
    async ({ variables }) => {
      try {
        const users = await linearClient.users(variables);
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(
                users.nodes.reduce<
                  Record<
                    string,
                    {
                      id: string;
                      name: string;
                      email: string | undefined;
                      displayName: string | undefined;
                      teams: Promise<{ id: string; name: string }[]>;
                    }
                  >
                >((acc, user) => {
                  acc[user.id] = {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    displayName: user.displayName,
                    teams: user.teams().then((teams) =>
                      teams.nodes.map((team) => {
                        return {
                          id: team.id,
                          name: team.name,
                        };
                      })
                    ),
                  };
                  return acc;
                }, {}),
                null,
                2
              ),
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
