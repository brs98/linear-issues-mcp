import { z } from 'zod';
import { LinearClient, LinearCyclesClient } from '../linear/index.js';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';

/**
 * Register cycle-related tools with the MCP server
 */
export function registerCycleTools(server: McpServer, linearClient: LinearClient) {
  // Create cycles client
  const cyclesClient = new LinearCyclesClient(linearClient);

  // Get all cycles
  server.tool(
    'getCycles',
    {
      teamId: z.string().optional().describe('ID of the team to get cycles for (optional)'),
      limit: z.number().optional().default(25).describe('Maximum number of cycles to return')
    },
    async ({ teamId, limit }) => {
      try {
        const cycles = await cyclesClient.getCycles(teamId, limit);
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(cycles, null, 2)
            }
          ]
        };
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        return {
          content: [
            {
              type: 'text',
              text: `Error fetching cycles: ${errorMessage}`
            }
          ],
          isError: true,
        };
      }
    }
  );

  // Get cycle by ID
  server.tool(
    'getCycleById',
    {
      id: z.string().describe('The ID of the cycle')
    },
    async ({ id }) => {
      try {
        const cycle = await cyclesClient.getCycleById(id);
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(cycle, null, 2)
            }
          ]
        };
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        return {
          content: [
            {
              type: 'text',
              text: `Error fetching cycle: ${errorMessage}`
            }
          ],
          isError: true,
        };
      }
    }
  );

  // Get active cycle
  server.tool(
    'getActiveCycle',
    {
      teamId: z.string().describe('ID of the team to get the active cycle for')
    },
    async ({ teamId }) => {
      try {
        const cycle = await cyclesClient.getActiveCycle(teamId);
        if (!cycle) {
          return {
            content: [
              {
                type: 'text',
                text: `No active cycle found for team ${teamId}`
              }
            ]
          };
        }
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(cycle, null, 2)
            }
          ]
        };
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        return {
          content: [
            {
              type: 'text',
              text: `Error fetching active cycle: ${errorMessage}`
            }
          ],
          isError: true,
        };
      }
    }
  );

  // Create cycle
  server.tool(
    'createCycle',
    {
      name: z.string().describe('Name of the cycle'),
      teamId: z.string().describe('ID of the team this cycle belongs to'),
      description: z.string().optional().describe('Description of the cycle'),
      startsAt: z.string().describe('Start date of the cycle (ISO format)'),
      endsAt: z.string().describe('End date of the cycle (ISO format)')
    },
    async (params) => {
      try {
        const cycle = await cyclesClient.createCycle(params);
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(cycle, null, 2)
            }
          ]
        };
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        return {
          content: [
            {
              type: 'text',
              text: `Error creating cycle: ${errorMessage}`
            }
          ],
          isError: true,
        };
      }
    }
  );

  // Update cycle
  server.tool(
    'updateCycle',
    {
      id: z.string().describe('ID of the cycle to update'),
      name: z.string().optional().describe('New name for the cycle'),
      description: z.string().optional().describe('New description for the cycle'),
      startsAt: z.string().optional().describe('New start date for the cycle (ISO format)'),
      endsAt: z.string().optional().describe('New end date for the cycle (ISO format)'),
    },
    async (params) => {
      try {
        const cycle = await cyclesClient.updateCycle(params);
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(cycle, null, 2)
            }
          ]
        };
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        return {
          content: [
            {
              type: 'text',
              text: `Error updating cycle: ${errorMessage}`
            }
          ],
          isError: true,
        };
      }
    }
  );

  // Get cycle issues
  server.tool(
    'getCycleIssues',
    {
      cycleId: z.string().describe('ID of the cycle'),
      limit: z.number().optional().default(25).describe('Maximum number of issues to return')
    },
    async ({ cycleId, limit }) => {
      try {
        const issues = await cyclesClient.getCycleIssues(cycleId, limit);
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(issues, null, 2)
            }
          ]
        };
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        return {
          content: [
            {
              type: 'text',
              text: `Error fetching cycle issues: ${errorMessage}`
            }
          ],
          isError: true,
        };
      }
    }
  );

  // Add issue to cycle
  server.tool(
    'addIssueToCycle',
    {
      issueId: z.string().describe('ID of the issue'),
      cycleId: z.string().describe('ID of the cycle')
    },
    async ({ issueId, cycleId }) => {
      try {
        const issue = await cyclesClient.addIssueToCycle(issueId, cycleId);
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(issue, null, 2)
            }
          ]
        };
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        return {
          content: [
            {
              type: 'text',
              text: `Error adding issue to cycle: ${errorMessage}`
            }
          ],
          isError: true,
        };
      }
    }
  );

  // Remove issue from cycle
  server.tool(
    'removeIssueFromCycle',
    {
      issueId: z.string().describe('ID of the issue to remove from its cycle')
    },
    async ({ issueId }) => {
      try {
        const issue = await cyclesClient.removeIssueFromCycle(issueId);
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(issue, null, 2)
            }
          ]
        };
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        return {
          content: [
            {
              type: 'text',
              text: `Error removing issue from cycle: ${errorMessage}`
            }
          ],
          isError: true,
        };
      }
    }
  );
} 