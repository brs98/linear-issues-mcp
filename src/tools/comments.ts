import { LinearClient } from '@linear/sdk';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { commentCreateInputSchema, commentFilterSchema } from '../../zod-schemas.js';

/**
 * Register comment-related tools with the MCP server
 */
export function registerCommentTools(server: McpServer, linearClient: LinearClient) {
  // Get comments
  server.tool(
    'getComments',
    'Retrieves comments associated with Linear issues based on specified filters. Use this tool when you need to read discussion threads, feedback, or updates on issues. You can filter by issueId to get comments for a specific issue, or use other filtering parameters to get comments across multiple issues.',
    {
      filter: commentFilterSchema.describe('Input for fetching comments'),
    },
    async ({ filter }) => {
      try {
        const comments = await linearClient.comments({ filter });
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(
                comments.nodes.map((comment) => ({
                  id: comment.id,
                  body: comment.body,
                  issue: comment.issue,
                  createdAt: comment.createdAt,
                  user: comment.user,
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
              text: `Error fetching comments: ${errorMessage}`,
            },
          ],
          isError: true,
        };
      }
    }
  );

  // Create comment
  server.tool(
    'createComment',
    "Adds a new comment to an existing Linear issue. Use this tool when you need to provide feedback, updates, or additional information on an issue. Required fields are 'issueId' and 'body' which contains the comment text. You can use Markdown formatting in the comment body.",
    {
      input: commentCreateInputSchema.describe('Input for creating a comment'),
    },
    async ({ input }) => {
      try {
        const comment = await linearClient.createComment(input);
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(comment, null, 2),
            },
          ],
        };
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        return {
          content: [
            {
              type: 'text',
              text: `Error creating comment: ${errorMessage}`,
            },
          ],
          isError: true,
        };
      }
    }
  );
}
