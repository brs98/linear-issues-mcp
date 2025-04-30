import { z } from 'zod';
import { LinearClient } from '@linear/sdk';
import {
  issueBatchCreateInputSchema,
  issueCreateInputSchema,
  issueFilterSchema,
  issueUpdateInputSchema,
} from '../../zod-schemas.js';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';

/**
 * Register issue-related tools with the MCP server
 */
export function registerIssueTools(server: McpServer, linearClient: LinearClient) {
  const getIssue = server.tool(
    'getIssue',
    'Retrieves detailed information about a specific Linear issue by its ID. Use this tool when you need to look up information about a particular issue, such as its title, description, status, priority, assignee, or other metadata.',
    {
      // linearClient.issue
      issueId: z.string().describe('ID or identifier of the issue to fetch'),
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

  const getIssues = server.tool(
    'getIssues',
    'Retrieves a list of Linear issues with optional filtering and pagination parameters. Use this tool when you need to browse or search through multiple issues. You can filter by team, state, assignee, or other criteria by specifying these in the params object.',
    {
      // linearClient.issues
      filter: issueFilterSchema.describe('Parameters for issue listing (pagination, filtering)'),
    },
    async ({ filter }) => {
      try {
        const issues = await linearClient.issues({ filter });
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(
                await Promise.all(
                  issues.nodes.map((issue) => ({
                    id: issue.id,
                    title: issue.title,
                    description: issue.description,
                    state: issue.state,
                    priority: issue.priority,
                    labels: issue.labels().then((l) =>
                      l.nodes.map((label) => ({
                        id: label.id,
                        name: label.name,
                        color: label.color,
                      }))
                    ),
                  }))
                ),
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
              text: `Error fetching issues: ${errorMessage}`,
            },
          ],
          isError: true,
        };
      }
    }
  );

  const createIssue = server.tool(
    'createIssue',
    "Creates a new issue in Linear with the provided details. Use this tool when you need to add a new task, bug report, or feature request to Linear. Required fields are 'title' and 'teamId'. Optional fields include 'description', 'assigneeId', 'priority', 'labelIds', and 'stateId'.",
    {
      // linearClient.createIssue
      issueData: issueCreateInputSchema.describe('Issue data for creation'),
    },
    async ({ issueData }) => {
      try {
        // Handle case where issueData might be a string instead of an object
        const data = typeof issueData === 'string' ? JSON.parse(issueData) : issueData;
        const response = await linearClient.createIssue(data);
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify({
                success: response.success,
                issue: await response.issue?.then((issue) => ({
                  id: issue.id,
                  identifier: issue.identifier,
                  number: issue.number,
                  title: issue.title,
                  description: issue.description,
                  state: issue.state,
                  priority: issue.priority,
                })),
              }),
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

  const updateIssue = server.tool(
    'updateIssue',
    "Modifies an existing Linear issue with the provided update data. Use this tool when you need to change an issue's properties such as title, description, status, priority, assignee, or labels. Provide the issue ID and only the fields you want to update.",
    {
      // First get the issue, then update it
      id: z.string().describe('ID or identifier of the issue to update'),
      updateData: issueUpdateInputSchema.describe('Data to update the issue with'),
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

  const deleteIssue = server.tool(
    'deleteIssue',
    'Permanently removes an issue from Linear. Use this tool with caution when an issue is no longer needed or was created in error. This action cannot be undone, and all data associated with the issue will be lost.',
    {
      issueId: z.string().describe('ID or identifier of the issue to delete'),
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

  const createIssueBatch = server.tool(
    'createIssueBatch',
    'Creates multiple Linear issues in a single operation. Use this tool when you need to add several related issues at once. Each issue in the array requires the same fields as createIssue (title and teamId are required). This is more efficient than creating issues one by one for large batches.',
    {
      // Array of linearClient.createIssue inputs
      issues: issueBatchCreateInputSchema.describe('Array of issue data for batch creation'),
    },
    async ({ issues }) => {
      try {
        // Handle case where issues might be a string
        const issuesData = typeof issues === 'string' ? JSON.parse(issues) : issues;
        const results = await Promise.all(
          issuesData.map((issueData: Parameters<(typeof linearClient)['createIssueBatch']>[0]) =>
            linearClient.createIssueBatch(issueData)
          )
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

  return {
    getIssue: {
      name: 'getIssue',
      tool: getIssue,
    },
    getIssues: {
      name: 'getIssues',
      tool: getIssues,
    },
    createIssue: {
      name: 'createIssue',
      tool: createIssue,
    },
    updateIssue: {
      name: 'updateIssue',
      tool: updateIssue,
    },
    deleteIssue: {
      name: 'deleteIssue',
      tool: deleteIssue,
    },
    createIssueBatch: {
      name: 'createIssueBatch',
      tool: createIssueBatch,
    },
  };
}
