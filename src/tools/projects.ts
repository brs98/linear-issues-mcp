import { z } from 'zod';
import { LinearClient, LinearProjectsClient } from '../linear/index.js';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';

/**
 * Register project-related tools with the MCP server
 */
export function registerProjectTools(server: McpServer, linearClient: LinearClient) {
  // Create projects client
  const projectsClient = new LinearProjectsClient(linearClient);

  // Get projects
  server.tool(
    'getProjects',
    {
      limit: z.number().optional().default(25).describe('Maximum number of projects to return')
    },
    async ({ limit }) => {
      try {
        const projects = await projectsClient.getProjects(limit);
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(projects, null, 2)
            }
          ]
        };
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        return {
          content: [
            {
              type: 'text',
              text: `Error fetching projects: ${errorMessage}`
            }
          ],
          isError: true,
        };
      }
    }
  );

  // Get project by ID
  server.tool(
    'getProjectById',
    {
      id: z.string().describe('The ID of the project')
    },
    async ({ id }) => {
      try {
        const project = await projectsClient.getProjectById(id);
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(project, null, 2)
            }
          ]
        };
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        return {
          content: [
            {
              type: 'text',
              text: `Error fetching project: ${errorMessage}`
            }
          ],
          isError: true,
        };
      }
    }
  );

  // Create project
  server.tool(
    'createProject',
    {
      name: z.string().describe('Name of the project'),
      description: z.string().optional().describe('Description of the project'),
      state: z.string().optional().describe('State of the project (e.g., "planned", "started", "completed")'),
      teamIds: z.array(z.string()).describe('IDs of the teams for this project'),
      startDate: z.string().optional().describe('Start date of the project (ISO format)'),
      targetDate: z.string().optional().describe('Target end date of the project (ISO format)')
    },
    async (params) => {
      try {
        const project = await projectsClient.createProject(params);
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(project, null, 2)
            }
          ]
        };
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        return {
          content: [
            {
              type: 'text',
              text: `Error creating project: ${errorMessage}`
            }
          ],
          isError: true,
        };
      }
    }
  );

  // Update project
  server.tool(
    'updateProject',
    {
      id: z.string().describe('ID of the project to update'),
      name: z.string().optional().describe('New name for the project'),
      description: z.string().optional().describe('New description for the project'),
      state: z.string().optional().describe('New state for the project'),
      teamIds: z.array(z.string()).optional().describe('New team IDs for the project'),
      startDate: z.string().optional().describe('New start date for the project (ISO format)'),
      targetDate: z.string().optional().describe('New target date for the project (ISO format)')
    },
    async (params) => {
      try {
        const project = await projectsClient.updateProject(params);
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(project, null, 2)
            }
          ]
        };
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        return {
          content: [
            {
              type: 'text',
              text: `Error updating project: ${errorMessage}`
            }
          ],
          isError: true,
        };
      }
    }
  );

  // Delete project
  server.tool(
    'deleteProject',
    {
      id: z.string().describe('ID of the project to delete')
    },
    async ({ id }) => {
      try {
        const success = await projectsClient.deleteProject(id);
        return {
          content: [
            {
              type: 'text',
              text: success 
                ? `Project ${id} successfully deleted` 
                : `Failed to delete project ${id}`
            }
          ]
        };
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        return {
          content: [
            {
              type: 'text',
              text: `Error deleting project: ${errorMessage}`
            }
          ],
          isError: true,
        };
      }
    }
  );

  // Get project issues
  server.tool(
    'getProjectIssues',
    {
      projectId: z.string().describe('ID of the project'),
      limit: z.number().optional().default(25).describe('Maximum number of issues to return')
    },
    async ({ projectId, limit }) => {
      try {
        const issues = await projectsClient.getProjectIssues(projectId, limit);
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
              text: `Error fetching project issues: ${errorMessage}`
            }
          ],
          isError: true,
        };
      }
    }
  );

  // Add issue to project
  server.tool(
    'addIssueToProject',
    {
      issueId: z.string().describe('ID of the issue'),
      projectId: z.string().describe('ID of the project')
    },
    async ({ issueId, projectId }) => {
      try {
        const issue = await projectsClient.addIssueToProject(issueId, projectId);
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
              text: `Error adding issue to project: ${errorMessage}`
            }
          ],
          isError: true,
        };
      }
    }
  );

  // Remove issue from project
  server.tool(
    'removeIssueFromProject',
    {
      issueId: z.string().describe('ID of the issue to remove from its project')
    },
    async ({ issueId }) => {
      try {
        const issue = await projectsClient.removeIssueFromProject(issueId);
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
              text: `Error removing issue from project: ${errorMessage}`
            }
          ],
          isError: true,
        };
      }
    }
  );
} 