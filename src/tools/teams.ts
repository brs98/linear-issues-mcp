import { z } from 'zod';
import { LinearClient } from '@linear/sdk';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { teamFilterSchema } from '../../zod-schemas.js';

/**
 * Register team-related tools with the MCP server
 */
export function registerTeamTools(server: McpServer, linearClient: LinearClient) {
  // Get team by ID
  server.tool(
    'getTeamById',
    "Retrieves detailed information about a specific Linear team by its ID. Use this tool when you need to look up a team's details, such as its name, description, and member list. This is useful when creating issues that need to be assigned to a specific team or when you need to reference team-specific information.",
    {
      id: z.string().describe('ID of the team to fetch'),
    },
    async ({ id }) => {
      try {
        const team = await linearClient.team(id);
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(
                {
                  id: team.id,
                  name: team.name,
                  description: team.description,
                  members: await team.members().then((m) =>
                    m.nodes.map((member) => ({
                      id: member.id,
                      name: member.name,
                    }))
                  ),
                },
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
              text: `Error fetching team: ${errorMessage}`,
            },
          ],
          isError: true,
        };
      }
    }
  );

  // Get teams
  server.tool(
    'getTeams',
    'Retrieves a list of all teams in the Linear workspace with optional filtering parameters. Use this tool when you need to browse or search through all available teams. This is helpful when you need to identify the appropriate team for issue assignment, determine which teams exist in the organization, or find team IDs for other operations.',
    {
      filter: teamFilterSchema.describe('Input for fetching teams'),
    },
    async ({ filter }) => {
      try {
        const teams = await linearClient.teams({ filter });
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(
                teams.nodes.reduce<
                  Record<
                    string,
                    {
                      id: string;
                      name: string;
                      description: string | undefined;
                      members: Promise<{ id: string; name: string }[]>;
                    }
                  >
                >((acc, team) => {
                  acc[team.id] = {
                    id: team.id,
                    name: team.name,
                    description: team.description,
                    members: team.members().then((m) =>
                      m.nodes.map((member) => ({
                        id: member.id,
                        name: member.name,
                      }))
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
              text: `Error fetching teams: ${errorMessage}`,
            },
          ],
          isError: true,
        };
      }
    }
  );
}
