import { z } from 'zod';
import { LinearClient } from '../linear/client.js';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';

/**
 * Register label-related tools with the MCP server
 */
export function registerLabelTools(server: McpServer, linearClient: LinearClient) {
  // Get labels
  server.tool(
    'getLabels',
    {},
    async () => {
      try {
        const labels = await linearClient.getLabels();
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(labels, null, 2)
            }
          ]
        };
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        return {
          content: [
            {
              type: 'text',
              text: `Error fetching labels: ${errorMessage}`
            }
          ],
          isError: true,
        };
      }
    }
  );

  // Add label to issue
  server.tool(
    'addIssueLabel',
    {
      issueId: z.string().describe('ID or identifier of the issue to add the label to'),
      labelId: z.string().describe('ID of the label to add to the issue')
    },
    async ({ issueId, labelId }) => {
      try {
        const issue = await linearClient.addIssueLabel(issueId, labelId);
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
              text: `Error adding label to issue: ${errorMessage}`
            }
          ],
          isError: true,
        };
      }
    }
  );

  // Remove label from issue
  server.tool(
    'removeIssueLabel',
    {
      issueId: z.string().describe('ID or identifier of the issue to remove the label from'),
      labelId: z.string().describe('ID of the label to remove from the issue')
    },
    async ({ issueId, labelId }) => {
      try {
        const issue = await linearClient.removeIssueLabel(issueId, labelId);
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
              text: `Error removing label from issue: ${errorMessage}`
            }
          ],
          isError: true,
        };
      }
    }
  );
} 