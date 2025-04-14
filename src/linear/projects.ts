import { LinearClient } from './client.js';
import { LinearIssue } from '../types.js';

// Response types
interface ProjectResponse {
  id: string;
  name: string;
  description?: string;
  state: string;
  startDate?: string;
  targetDate?: string;
  progress?: number;
  teams: {
    nodes: {
      id: string;
    }[];
  };
  createdAt: string;
  updatedAt: string;
}

interface ProjectsResponse {
  projects: {
    nodes: ProjectResponse[];
  };
}

interface ProjectByIdResponse {
  project: ProjectResponse;
}

interface ProjectCreateResponse {
  projectCreate: {
    project: ProjectResponse;
  };
}

interface ProjectUpdateResponse {
  projectUpdate: {
    project: ProjectResponse;
  };
}

interface ProjectDeleteResponse {
  projectDelete: {
    success: boolean;
  };
}

interface ProjectIssuesResponse {
  project: {
    issues: {
      nodes: LinearIssue[];
    };
  };
}

// Define project related types
export interface LinearProject {
  id: string;
  name: string;
  description?: string;
  state: string;
  startDate?: string;
  targetDate?: string;
  progress?: number;
  teamIds: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateProjectParams {
  name: string;
  description?: string;
  state?: string;
  teamIds: string[];
  startDate?: string;
  targetDate?: string;
}

export interface UpdateProjectParams {
  id: string;
  name?: string;
  description?: string;
  state?: string;
  teamIds?: string[];
  startDate?: string;
  targetDate?: string;
}

/**
 * Extension of LinearClient with project-specific operations
 */
export class LinearProjectsClient {
  private client: LinearClient;

  constructor(client: LinearClient) {
    this.client = client;
  }

  /**
   * Get a list of all projects
   */
  async getProjects(limit = 25): Promise<LinearProject[]> {
    const query = `
      query Projects($limit: Int) {
        projects(first: $limit) {
          nodes {
            id
            name
            description
            state
            startDate
            targetDate
            progress
            teams {
              nodes {
                id
              }
            }
            createdAt
            updatedAt
          }
        }
      }
    `;

    const data = await this.client.request<ProjectsResponse>(query, { limit });
    
    // Transform the response to match the LinearProject interface
    return data.projects.nodes.map(project => ({
      id: project.id,
      name: project.name,
      description: project.description,
      state: project.state,
      startDate: project.startDate,
      targetDate: project.targetDate,
      progress: project.progress,
      teamIds: project.teams.nodes.map(team => team.id),
      createdAt: project.createdAt,
      updatedAt: project.updatedAt,
    }));
  }

  /**
   * Get a project by ID
   */
  async getProjectById(id: string): Promise<LinearProject> {
    const query = `
      query Project($id: String!) {
        project(id: $id) {
          id
          name
          description
          state
          startDate
          targetDate
          progress
          teams {
            nodes {
              id
            }
          }
          createdAt
          updatedAt
        }
      }
    `;

    const data = await this.client.request<ProjectByIdResponse>(query, { id });
    const project = data.project;
    
    // Transform the response to match the LinearProject interface
    return {
      id: project.id,
      name: project.name,
      description: project.description,
      state: project.state,
      startDate: project.startDate,
      targetDate: project.targetDate,
      progress: project.progress,
      teamIds: project.teams.nodes.map(team => team.id),
      createdAt: project.createdAt,
      updatedAt: project.updatedAt,
    };
  }

  /**
   * Create a new project
   */
  async createProject(params: CreateProjectParams): Promise<LinearProject> {
    const mutation = `
      mutation CreateProject($input: ProjectCreateInput!) {
        projectCreate(input: $input) {
          project {
            id
            name
            description
            state
            startDate
            targetDate
            progress
            teams {
              nodes {
                id
              }
            }
            createdAt
            updatedAt
          }
        }
      }
    `;

    const { teamIds, ...rest } = params;
    
    const input = {
      ...rest,
      teamIds: { connect: teamIds },
    };

    const data = await this.client.request<ProjectCreateResponse>(mutation, {
      input,
    });

    const project = data.projectCreate.project;
    
    // Transform the response to match the LinearProject interface
    return {
      id: project.id,
      name: project.name,
      description: project.description,
      state: project.state,
      startDate: project.startDate,
      targetDate: project.targetDate,
      progress: project.progress,
      teamIds: project.teams.nodes.map(team => team.id),
      createdAt: project.createdAt,
      updatedAt: project.updatedAt,
    };
  }

  /**
   * Update an existing project
   */
  async updateProject(params: UpdateProjectParams): Promise<LinearProject> {
    const { id, teamIds, ...rest } = params;

    const input = {
      ...rest,
      teamIds: teamIds ? { connect: teamIds } : undefined,
    };

    const mutation = `
      mutation UpdateProject($id: String!, $input: ProjectUpdateInput!) {
        projectUpdate(id: $id, input: $input) {
          project {
            id
            name
            description
            state
            startDate
            targetDate
            progress
            teams {
              nodes {
                id
              }
            }
            createdAt
            updatedAt
          }
        }
      }
    `;

    const data = await this.client.request<ProjectUpdateResponse>(mutation, {
      id,
      input,
    });

    const project = data.projectUpdate.project;
    
    // Transform the response to match the LinearProject interface
    return {
      id: project.id,
      name: project.name,
      description: project.description,
      state: project.state,
      startDate: project.startDate,
      targetDate: project.targetDate,
      progress: project.progress,
      teamIds: project.teams.nodes.map(team => team.id),
      createdAt: project.createdAt,
      updatedAt: project.updatedAt,
    };
  }

  /**
   * Delete a project
   */
  async deleteProject(id: string): Promise<boolean> {
    const mutation = `
      mutation DeleteProject($id: String!) {
        projectDelete(id: $id) {
          success
        }
      }
    `;

    const data = await this.client.request<ProjectDeleteResponse>(mutation, { id });
    return data.projectDelete.success;
  }

  /**
   * Get issues in a project
   */
  async getProjectIssues(projectId: string, limit = 25): Promise<LinearIssue[]> {
    const query = `
      query ProjectIssues($projectId: String!, $limit: Int) {
        project(id: $projectId) {
          issues(first: $limit) {
            nodes {
              id
              identifier
              title
              description
              priority
              estimate
              state {
                id
                name
              }
              assignee {
                id
                name
              }
              labels {
                nodes {
                  id
                  name
                }
              }
              team {
                id
                name
              }
              createdAt
              updatedAt
            }
          }
        }
      }
    `;

    const data = await this.client.request<ProjectIssuesResponse>(query, {
      projectId,
      limit,
    });

    return data.project.issues.nodes;
  }

  /**
   * Add an issue to a project
   */
  async addIssueToProject(issueId: string, projectId: string): Promise<LinearIssue> {
    const mutation = `
      mutation AddIssueToProject($issueId: String!, $projectId: String!) {
        issueUpdate(id: $issueId, input: { projectId: $projectId }) {
          issue {
            id
            identifier
            title
            description
            priority
            state {
              id
              name
            }
            team {
              id
              name
            }
          }
        }
      }
    `;

    const data = await this.client.request<{ issueUpdate: { issue: LinearIssue } }>(mutation, {
      issueId,
      projectId,
    });

    return data.issueUpdate.issue;
  }

  /**
   * Remove an issue from a project
   */
  async removeIssueFromProject(issueId: string): Promise<LinearIssue> {
    const mutation = `
      mutation RemoveIssueFromProject($issueId: String!) {
        issueUpdate(id: $issueId, input: { projectId: null }) {
          issue {
            id
            identifier
            title
            description
            priority
            state {
              id
              name
            }
            team {
              id
              name
            }
          }
        }
      }
    `;

    const data = await this.client.request<{ issueUpdate: { issue: LinearIssue } }>(mutation, {
      issueId,
    });

    return data.issueUpdate.issue;
  }
} 