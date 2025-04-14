import { z } from 'zod';
import { LinearClient, LinearTeamsClient } from '../linear/index.js';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';

/**
 * Register team-related tools with the MCP server
 */
export function registerTeamTools(server: McpServer, linearClient: LinearClient) {
  // Create teams client
  const teamsClient = new LinearTeamsClient(linearClient);

  // Get teams
  server.tool(
    'getTeams',
    {},
    async () => {
      try {
        const teams = await teamsClient.getTeams();
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(teams, null, 2)
            }
          ]
        };
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        return {
          content: [
            {
              type: 'text',
              text: `Error fetching teams: ${errorMessage}`
            }
          ],
          isError: true,
        };
      }
    }
  );

  // Get team by ID
  server.tool(
    'getTeamById',
    {
      id: z.string().describe('The ID of the team')
    },
    async ({ id }) => {
      try {
        const team = await teamsClient.getTeamById(id);
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(team, null, 2)
            }
          ]
        };
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        return {
          content: [
            {
              type: 'text',
              text: `Error fetching team: ${errorMessage}`
            }
          ],
          isError: true,
        };
      }
    }
  );

  // Create team
  server.tool(
    'createTeam',
    {
      name: z.string().describe('Name of the team'),
      key: z.string().describe('Key of the team (used in issue identifiers, e.g., "ENG")'),
      description: z.string().optional().describe('Description of the team'),
      icon: z.string().optional().describe('Icon for the team'),
      color: z.string().optional().describe('Color of the team')
    },
    async (params) => {
      try {
        const team = await teamsClient.createTeam(params);
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(team, null, 2)
            }
          ]
        };
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        return {
          content: [
            {
              type: 'text',
              text: `Error creating team: ${errorMessage}`
            }
          ],
          isError: true,
        };
      }
    }
  );

  // Update team
  server.tool(
    'updateTeam',
    {
      id: z.string().describe('ID of the team to update'),
      name: z.string().optional().describe('New name for the team'),
      description: z.string().optional().describe('New description for the team'),
      icon: z.string().optional().describe('New icon for the team'),
      color: z.string().optional().describe('New color for the team')
    },
    async (params) => {
      try {
        const team = await teamsClient.updateTeam(params);
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(team, null, 2)
            }
          ]
        };
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        return {
          content: [
            {
              type: 'text',
              text: `Error updating team: ${errorMessage}`
            }
          ],
          isError: true,
        };
      }
    }
  );

  // Get team members
  server.tool(
    'getTeamMembers',
    {
      teamId: z.string().describe('ID of the team')
    },
    async ({ teamId }) => {
      try {
        const members = await teamsClient.getTeamMembers(teamId);
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(members, null, 2)
            }
          ]
        };
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        return {
          content: [
            {
              type: 'text',
              text: `Error fetching team members: ${errorMessage}`
            }
          ],
          isError: true,
        };
      }
    }
  );
} 