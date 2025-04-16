import { z } from 'zod';
import { LinearClient, LinearTeamsClient } from '../linear/index.js';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';

/**
 * Register issue-related tools with the MCP server
 */
export function registerIssueTools(server: McpServer, linearClient: LinearClient) {
  // Create teams client for team operations
  const teamsClient = new LinearTeamsClient(linearClient);

  // Get issues list
  server.tool(
    'getIssues',
    {
      limit: z.number().optional().default(25).describe('Maximum number of issues to return'),
    },
    async ({ limit }) => {
      try {
        const issues = await linearClient.getIssues(limit);
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(issues, null, 2),
            },
          ],
        };
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        return {
          content: [
            {
              type: 'text',
              text: `Error fetching issues: ${errorMessage}`,
            },
          ],
          isError: true,
        };
      }
    }
  );

  // Get issue by ID
  server.tool(
    'getIssueById',
    {
      id: z.string().describe('The ID or identifier of the issue'),
    },
    async ({ id }) => {
      try {
        const issue = await linearClient.getIssueById(id);
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(issue, null, 2),
            },
          ],
        };
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        return {
          content: [
            {
              type: 'text',
              text: `Error fetching issue: ${errorMessage}`,
            },
          ],
          isError: true,
        };
      }
    }
  );

  // Search issues
  server.tool(
    'searchIssues',
    {
      query: z.string().optional().describe('Text to search for in issue title or description'),
      teamId: z.string().optional().describe('Filter issues by team ID'),
      assigneeId: z.string().optional().describe('Filter issues by assignee ID'),
      stateId: z.string().optional().describe('Filter issues by state ID'),
      labelIds: z.array(z.string()).optional().describe('Filter issues by label IDs'),
      limit: z.number().optional().default(25).describe('Maximum number of issues to return'),
    },
    async (params) => {
      try {
        const issues = await linearClient.searchIssues(params);
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(issues, null, 2),
            },
          ],
        };
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        return {
          content: [
            {
              type: 'text',
              text: `Error searching issues: ${errorMessage}`,
            },
          ],
          isError: true,
        };
      }
    }
  );

  // Create issue
  server.tool(
    'createIssue',
    {
      title: z.string().describe('Title of the issue'),
      description: z.string().optional().describe('Description of the issue (Markdown supported)'),
      teamId: z.string().describe('ID of the team the issue belongs to'),
      assigneeId: z.string().optional().describe('ID of the user to assign the issue to'),
      stateId: z.string().optional().describe('ID of the workflow state for the issue'),
      priority: z.number().optional().describe('Priority of the issue (0-4)'),
      estimate: z.number().optional().describe('The estimated complexity/points for the issue'),
      labelIds: z.array(z.string()).optional().describe('IDs of the labels to attach to the issue'),
    },
    async (params) => {
      try {
        const { teamId: providedTeamId, ...rest } = params;
        
        // If no teamId is provided, fetch the first available team
        let teamId = providedTeamId;
        if (!teamId) {
          const teams = await teamsClient.getTeams();
          if (teams.length === 0) {
            throw new Error('No teams found. A team ID is required to create an issue.');
          }
          teamId = teams[0].id;
        }
        
        const issue = await linearClient.createIssue({
          ...rest,
          teamId
        });
        
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(issue, null, 2),
            },
          ],
        };
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        return {
          content: [
            {
              type: 'text',
              text: `Error creating issue: ${errorMessage}`,
            },
          ],
          isError: true,
        };
      }
    }
  );

  // Update issue
  server.tool(
    'updateIssue',
    {
      id: z.string().describe('ID or identifier of the issue to update'),
      title: z.string().optional().describe('New title for the issue'),
      description: z.string().optional().describe('New description for the issue'),
      stateId: z.string().optional().describe('ID of the new state for the issue'),
      assigneeId: z
        .string()
        .optional()
        .describe('ID of the user to assign the issue to, null to unassign'),
      priority: z.number().optional().describe('New priority for the issue (0-4)'),
      estimate: z.number().optional().describe('The estimated complexity/points for the issue'),
      labelIds: z.array(z.string()).optional().describe('IDs of the labels to set on the issue'),
      teamId: z.string().optional().describe('ID of the team to move the issue to'),
    },
    async (params) => {
      try {
        const issue = await linearClient.updateIssue(params);
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(issue, null, 2),
            },
          ],
        };
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        return {
          content: [
            {
              type: 'text',
              text: `Error updating issue: ${errorMessage}`,
            },
          ],
          isError: true,
        };
      }
    }
  );

  // Delete issue
  server.tool(
    'deleteIssue',
    {
      id: z.string().describe('ID or identifier of the issue to delete'),
    },
    async ({ id }) => {
      try {
        const success = await linearClient.deleteIssue(id);
        return {
          content: [
            {
              type: 'text',
              text: success ? `Issue ${id} successfully deleted` : `Failed to delete issue ${id}`,
            },
          ],
        };
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        return {
          content: [
            {
              type: 'text',
              text: `Error deleting issue: ${errorMessage}`,
            },
          ],
          isError: true,
        };
      }
    }
  );

  // Assign issue
  server.tool(
    'assignIssue',
    {
      issueId: z.string().describe('ID or identifier of the issue to assign'),
      assigneeId: z
        .string()
        .nullable()
        .describe('ID of the user to assign the issue to, or null to unassign'),
    },
    async ({ issueId, assigneeId }) => {
      try {
        const issue = await linearClient.assignIssue(issueId, assigneeId);
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(issue, null, 2),
            },
          ],
        };
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        return {
          content: [
            {
              type: 'text',
              text: `Error assigning issue: ${errorMessage}`,
            },
          ],
          isError: true,
        };
      }
    }
  );

  // Set issue priority
  server.tool(
    'setIssuePriority',
    {
      issueId: z.string().describe('ID or identifier of the issue'),
      priority: z
        .number()
        .min(0)
        .max(4)
        .describe('Priority level (0 = No priority, 1 = Urgent, 2 = High, 3 = Normal, 4 = Low)'),
    },
    async ({ issueId, priority }) => {
      try {
        const issue = await linearClient.updateIssue({
          id: issueId,
          priority,
        });
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(issue, null, 2),
            },
          ],
        };
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        return {
          content: [
            {
              type: 'text',
              text: `Error setting issue priority: ${errorMessage}`,
            },
          ],
          isError: true,
        };
      }
    }
  );

  // Get issue history
  server.tool(
    'getIssueHistory',
    {
      issueId: z.string().describe('ID or identifier of the issue'),
      limit: z
        .number()
        .optional()
        .default(10)
        .describe('Maximum number of history events to return'),
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async ({ issueId, limit }) => {
      try {
        // This is just a placeholder as this would need a custom implementation
        // The Linear API doesn't have a straightforward way to get issue history
        return {
          content: [
            {
              type: 'text',
              text: `Issue history for ${issueId} is not yet implemented`,
            },
          ],
        };
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        return {
          content: [
            {
              type: 'text',
              text: `Error fetching issue history: ${errorMessage}`,
            },
          ],
          isError: true,
        };
      }
    }
  );
}

