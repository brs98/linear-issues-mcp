import { z } from 'zod';
import { LinearClient } from '@linear/sdk';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';

/**
 * Register project-related tools with the MCP server
 */
export function registerProjectTools(server: McpServer, linearClient: LinearClient) {
  server.tool(
    'getProject',
    {
      projectId: z.custom<Parameters<(typeof linearClient)['project']>[0]>(),
    },
    async ({ projectId }) => {
      try {
        const project = await linearClient.project(projectId);
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(project, null, 2),
            },
          ],
        };
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        return {
          content: [
            {
              type: 'text',
              text: `Error fetching project: ${errorMessage}`,
            },
          ],
          isError: true,
        };
      }
    }
  );

  server.tool(
    'getProjects',
    {
      filter: z.custom<Parameters<(typeof linearClient)['projects']>[0]>().optional(),
    },
    async ({ filter }) => {
      try {
        const projects = await linearClient.projects(filter);
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(projects, null, 2),
            },
          ],
        };
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        return {
          content: [
            {
              type: 'text',
              text: `Error fetching projects: ${errorMessage}`,
            },
          ],
          isError: true,
        };
      }
    }
  );

  server.tool(
    'getProjectUpdate',
    {
      projectUpdateId: z.custom<Parameters<(typeof linearClient)['projectUpdate']>[0]>(),
    },
    async ({ projectUpdateId }) => {
      try {
        const projectUpdate = await linearClient.projectUpdate(projectUpdateId);
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(projectUpdate, null, 2),
            },
          ],
        };
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        return {
          content: [
            {
              type: 'text',
              text: `Error fetching project update: ${errorMessage}`,
            },
          ],
          isError: true,
        };
      }
    }
  );

  server.tool(
    'getProjectUpdates',
    {
      variables: z.custom<Parameters<(typeof linearClient)['projectUpdates']>[0]>().optional(),
    },
    async ({ variables }) => {
      try {
        const projectUpdates = await linearClient.projectUpdates(variables);
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(projectUpdates, null, 2),
            },
          ],
        };
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        return {
          content: [
            {
              type: 'text',
              text: `Error fetching project updates: ${errorMessage}`,
            },
          ],
          isError: true,
        };
      }
    }
  );

  server.tool(
    'createProject',
    {
      input: z.custom<Parameters<(typeof linearClient)['createProject']>[0]>(),
    },
    async ({ input }) => {
      try {
        const project = await linearClient.createProject(input);
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(project, null, 2),
            },
          ],
        };
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        return {
          content: [
            {
              type: 'text',
              text: `Error creating project: ${errorMessage}`,
            },
          ],
          isError: true,
        };
      }
    }
  );

  server.tool(
    'createProjectUpdate',
    {
      input: z.custom<Parameters<(typeof linearClient)['createProjectUpdate']>[0]>(),
    },
    async ({ input }) => {
      try {
        const projectUpdate = await linearClient.createProjectUpdate(input);
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(projectUpdate, null, 2),
            },
          ],
        };
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        return {
          content: [
            {
              type: 'text',
              text: `Error creating project update: ${errorMessage}`,
            },
          ],
          isError: true,
        };
      }
    }
  );
}
