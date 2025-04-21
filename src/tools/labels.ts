import { z } from 'zod';
import { LinearClient } from '@linear/sdk';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';

/**
 * Register label-related tools with the MCP server
 */
export function registerLabelTools(server: McpServer, linearClient: LinearClient) {
  // Get labels
  server.tool(
    'getLabels',
    "Retrieves all issue labels available in the Linear workspace. Use this tool when you need to see what labels exist, their IDs, names, and colors. This is useful when you want to add labels to issues or filter issues by label.",
    {
      variables: z
        .custom<Parameters<(typeof linearClient)['issueLabels']>[0]>()
        .optional()
        .describe('Input for fetching labels'),
    },
    async () => {
      try {
        const labels = await linearClient.issueLabels();
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(
                labels.nodes.map((label) => ({
                  id: label.id,
                  name: label.name,
                  color: label.color,
                })),
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
              text: `Error fetching labels: ${errorMessage}`,
            },
          ],
          isError: true,
        };
      }
    }
  );

  // Add label to issue
  server.tool(
    'addIssueLabel',
    "Adds a specific label to an existing Linear issue. Use this tool when you need to categorize or tag an issue with a particular label for organization, filtering, or workflow purposes. You must provide both the issueId and labelId (which can be obtained from the getLabels tool).",
    {
      issueId: z
        .custom<Parameters<(typeof linearClient)['issueAddLabel']>[0]>()
        .describe('ID or identifier of the issue to add the label to'),
      labelId: z
        .custom<Parameters<(typeof linearClient)['issueAddLabel']>[1]>()
        .describe('ID of the label to add to the issue'),
    },
    async ({ issueId, labelId }) => {
      try {
        const issue = await linearClient.issueAddLabel(issueId, labelId);
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
              text: `Error adding label to issue: ${errorMessage}`,
            },
          ],
          isError: true,
        };
      }
    }
  );

  // Remove label from issue
  server.tool(
    'removeIssueLabel',
    "Removes a specific label from an existing Linear issue. Use this tool when an issue has been incorrectly tagged or when the label is no longer relevant to the issue. You must provide both the issueId and labelId to identify which label to remove from which issue.",
    {
      issueId: z
        .custom<Parameters<(typeof linearClient)['issueRemoveLabel']>[0]>()
        .describe('ID or identifier of the issue to remove the label from'),
      labelId: z
        .custom<Parameters<(typeof linearClient)['issueRemoveLabel']>[1]>()
        .describe('ID of the label to remove from the issue'),
    },
    async ({ issueId, labelId }) => {
      try {
        const issue = await linearClient.issueRemoveLabel(issueId, labelId);
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
              text: `Error removing label from issue: ${errorMessage}`,
            },
          ],
          isError: true,
        };
      }
    }
  );
}
