import { z } from 'zod';
import { LinearClient } from '@linear/sdk';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';

/**
 * Register team-related tools with the MCP server
 */
export function registerTeamTools(server: McpServer, linearClient: LinearClient) {
  // Get team by ID
  server.tool(
    'getTeamById',
    {
      id: z
        .custom<Parameters<(typeof linearClient)['team']>[0]>()
        .describe('ID of the team to fetch'),
    },
    async ({ id }) => {
      try {
        const team = await linearClient.team(id);
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(team, null, 2),
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
    {
      variables: z
        .custom<Parameters<(typeof linearClient)['teams']>[0]>()
        .optional()
        .describe('Input for fetching teams'),
    },
    async ({ variables }) => {
      try {
        const teams = await linearClient.teams(variables);
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(teams, null, 2),
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

  // Get team members
  server.tool(
    'getTeamMembers',
    {
      variables: z
        .custom<Parameters<(typeof linearClient)['teamMemberships']>[0]>()
        .describe('Input for fetching team members'),
    },
    async ({ variables }) => {
      try {
        const members = await linearClient.teamMemberships(variables);
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(members, null, 2),
            },
          ],
        };
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        return {
          content: [
            {
              type: 'text',
              text: `Error fetching team members: ${errorMessage}`,
            },
          ],
          isError: true,
        };
      }
    }
  );
}

