import { z } from 'zod';
import { LinearClient } from '@linear/sdk';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { userFilterSchema } from '../../zod-schemas.js';

/**
 * Register user-related tools with the MCP server
 */
export function registerUserTools(server: McpServer, linearClient: LinearClient) {
  const getUserById = server.tool(
    'getUserById',
    'Retrieves detailed information about a specific Linear user by their ID. Use this tool when you need to look up information about a particular user, such as their name, email, display name, or team memberships. This is useful when assigning issues, identifying team members, or determining user roles.',
    {
      userId: z.string().describe('ID of the user to fetch'),
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

  const getUsers = server.tool(
    'getUsers',
    'Retrieves a list of all users in the Linear workspace with optional filtering parameters. Use this tool when you need to browse or search through all available users. This is helpful when you need to identify users for issue assignment, find team members, or look up user IDs for other operations.',
    {
      filter: userFilterSchema.describe('Input for fetching users'),
    },
    async ({ filter }) => {
      try {
        const users = await linearClient.users({ filter });
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

  return {
    getUserById: {
      name: 'getUserById',
      tool: getUserById,
    },
    getUsers: {
      name: 'getUsers',
      tool: getUsers,
    },
  };
}
