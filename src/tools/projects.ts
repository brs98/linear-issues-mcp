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
      projectId: z
        .custom<Parameters<(typeof linearClient)['project']>[0]>()
        .describe('ID of the project to fetch'),
    },
    async ({ projectId }) => {
      try {
        const project = await linearClient.project(projectId);
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(
                {
                  id: project.id,
                  name: project.name,
                  description: project.description,
                  team: await project.teams().then((t) =>
                    t.nodes.map((team) => ({
                      id: team.id,
                      name: team.name,
                    }))
                  ),
                },
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
      filter: z
        .custom<Parameters<(typeof linearClient)['projects']>[0]>()
        .optional()
        .describe('Input for fetching projects'),
    },
    async ({ filter }) => {
      try {
        const projects = await linearClient.projects(filter);
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(
                await Promise.all(
                  projects.nodes.map((project) => ({
                    id: project.id,
                    name: project.name,
                    description: project.description,
                    teams: project.teams().then((t) =>
                      t.nodes.map((team) => ({
                        id: team.id,
                        name: team.name,
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
      projectUpdateId: z
        .custom<Parameters<(typeof linearClient)['projectUpdate']>[0]>()
        .describe('ID of the project update to fetch'),
    },
    async ({ projectUpdateId }) => {
      try {
        const projectUpdate = await linearClient.projectUpdate(projectUpdateId);
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(
                {
                  id: projectUpdate.id,
                  project: projectUpdate.project,
                  body: projectUpdate.body,
                  user: projectUpdate.user,
                },
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
      variables: z
        .custom<Parameters<(typeof linearClient)['projectUpdates']>[0]>()
        .optional()
        .describe('Input for fetching project updates'),
    },
    async ({ variables }) => {
      try {
        const projectUpdates = await linearClient.projectUpdates(variables);
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(
                await Promise.all(
                  projectUpdates.nodes.map((projectUpdate) => ({
                    id: projectUpdate.id,
                    project: projectUpdate.project,
                    body: projectUpdate.body,
                    user: projectUpdate.user,
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
      input: z
        .custom<Parameters<(typeof linearClient)['createProject']>[0]>()
        .describe('Input for creating a project'),
    },
    async ({ input }) => {
      try {
        const project = await linearClient.createProject(input);
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(
                {
                  success: project.success,
                  project: await project.project?.then(async (p) => ({
                    id: p.id,
                    name: p.name,
                    description: p.description,
                    team: await p.teams().then(async (t) =>
                      t.nodes.map((team) => ({
                        id: team.id,
                        name: team.name,
                      }))
                    ),
                  })),
                },
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
      input: z
        .custom<Parameters<(typeof linearClient)['createProjectUpdate']>[0]>()
        .describe('Input for creating a project update'),
    },
    async ({ input }) => {
      try {
        const projectUpdate = await linearClient.createProjectUpdate(input);
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(
                {
                  success: projectUpdate.success,
                  projectUpdate: await projectUpdate.projectUpdate?.then(async (pu) => ({
                    id: pu.id,
                    project: pu.project,
                    body: pu.body,
                    user: pu.user,
                  })),
                },
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
              text: `Error creating project update: ${errorMessage}`,
            },
          ],
          isError: true,
        };
      }
    }
  );
}
