import { z } from 'zod';
import { LinearClient } from '@linear/sdk';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';

/**
 * Register issue-related tools with the MCP server
 */
export function registerIssueTools(server: McpServer, linearClient: LinearClient) {
  server.tool(
    'getIssue',
    {
      // linearClient.issue
      issueId: z
        .custom<Parameters<(typeof linearClient)['issue']>[0]>()
        .describe('ID or identifier of the issue to fetch'),
    },
    async ({ issueId }) => {
      try {
        const issue = await linearClient.issue(issueId);
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

  server.tool(
    'getIssues',
    {
      // linearClient.issues
      params: z
        .custom<Parameters<(typeof linearClient)['issues']>[0]>()
        .optional()
        .default({})
        .describe('Parameters for issue listing (pagination, filtering)'),
    },
    async ({ params }) => {
      try {
        const issues = await linearClient.issues(params);
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

  server.tool(
    'createIssue',
    {
      // linearClient.createIssue
      issueData: z
        .custom<Parameters<(typeof linearClient)['createIssue']>[0]>()
        .describe('Issue data for creation'),
    },
    async ({ issueData }) => {
      try {
        const issue = await linearClient.createIssue(issueData);
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

  server.tool(
    'updateIssue',
    {
      // First get the issue, then update it
      id: z
        .custom<Parameters<(typeof linearClient)['updateIssue']>[0]>()
        .describe('ID or identifier of the issue to update'),
      updateData: z
        .custom<Parameters<(typeof linearClient)['updateIssue']>[1]>()
        .describe('Data to update the issue with'),
    },
    async ({ id, updateData }) => {
      try {
        const updatedIssue = await linearClient.updateIssue(id, updateData);

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(updatedIssue, null, 2),
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

  server.tool(
    'deleteIssue',
    {
      issueId: z
        .custom<Parameters<(typeof linearClient)['deleteIssue']>[0]>()
        .describe('ID or identifier of the issue to delete'),
    },
    async ({ issueId }) => {
      try {
        const { success } = await linearClient.deleteIssue(issueId);

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify({ success }, null, 2),
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

  server.tool(
    'createIssueBatch',
    {
      // Array of linearClient.createIssue inputs
      issues: z
        .custom<Parameters<(typeof linearClient)['createIssueBatch']>[0][]>()
        .describe('Array of issue data for batch creation'),
    },
    async ({ issues }) => {
      try {
        const results = await Promise.all(
          issues.map((issueData) => linearClient.createIssueBatch(issueData))
        );

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(results, null, 2),
            },
          ],
        };
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        return {
          content: [
            {
              type: 'text',
              text: `Error creating issues in batch: ${errorMessage}`,
            },
          ],
          isError: true,
        };
      }
    }
  );
}
