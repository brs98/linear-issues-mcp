import { 
  CreateIssueParams, 
  LinearClientConfig, 
  LinearIssue, 
  UpdateIssueParams,
  LinearComment,
  SearchIssuesParams,
  GetCommentsParams,
  CreateCommentParams,
  LinearLabel
} from '../types.js';

/**
 * Linear API Client
 * Responsible for making requests to the Linear GraphQL API
 */
export class LinearClient {
  private apiKey: string;
  private baseUrl: string;

  constructor(config: LinearClientConfig) {
    this.apiKey = config.apiKey;
    this.baseUrl = config.baseUrl || 'https://api.linear.app/graphql';
  }

  /**
   * Make a request to the Linear GraphQL API
   */
  private async request<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
    const response = await fetch(this.baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': this.apiKey,
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Linear API error: ${response.status} ${errorText}`);
    }

    const data = await response.json();

    if (data.errors) {
      throw new Error(`Linear GraphQL Error: ${JSON.stringify(data.errors)}`);
    }

    return data.data;
  }

  /**
   * Get a list of issues
   */
  async getIssues(limit = 25): Promise<LinearIssue[]> {
    const query = `
      query Issues($limit: Int) {
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
    `;

    const data = await this.request<{ issues: { nodes: LinearIssue[] } }>(query, {
      limit,
    });

    return data.issues.nodes;
  }

  /**
   * Get an issue by ID or identifier
   */
  async getIssueById(id: string): Promise<LinearIssue> {
    const query = `
      query Issue($id: String!) {
        issue(id: $id) {
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
    `;

    const data = await this.request<{ issue: LinearIssue }>(query, { id });
    return data.issue;
  }

  /**
   * Search for issues
   */
  async searchIssues(params: SearchIssuesParams): Promise<LinearIssue[]> {
    const { query: searchQuery, limit = 25, ...filters } = params;
    
    // Build filter string
    const filterParts: string[] = [];
    if (searchQuery) filterParts.push(searchQuery);
    if (filters.teamId) filterParts.push(`team:${filters.teamId}`);
    if (filters.assigneeId) filterParts.push(`assignee:${filters.assigneeId}`);
    if (filters.stateId) filterParts.push(`state:${filters.stateId}`);
    if (filters.labelIds?.length) {
      filters.labelIds.forEach(labelId => {
        filterParts.push(`label:${labelId}`);
      });
    }

    const filter = filterParts.join(' ');

    const query = `
      query SearchIssues($filter: String, $limit: Int) {
        issueSearch(first: $limit, filter: $filter) {
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
    `;

    const data = await this.request<{ issueSearch: { nodes: LinearIssue[] } }>(query, {
      filter,
      limit,
    });

    return data.issueSearch.nodes;
  }

  /**
   * Create a new issue
   */
  async createIssue(params: CreateIssueParams): Promise<LinearIssue> {
    const mutation = `
      mutation CreateIssue($input: IssueCreateInput!) {
        issueCreate(input: $input) {
          issue {
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
    `;

    const { labelIds, ...rest } = params;

    const input = {
      ...rest,
      labelIds: labelIds ? { connect: labelIds } : undefined,
    };

    const data = await this.request<{ issueCreate: { issue: LinearIssue } }>(mutation, {
      input,
    });

    return data.issueCreate.issue;
  }

  /**
   * Update an existing issue
   */
  async updateIssue(params: UpdateIssueParams): Promise<LinearIssue> {
    const mutation = `
      mutation UpdateIssue($id: String!, $input: IssueUpdateInput!) {
        issueUpdate(id: $id, input: $input) {
          issue {
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
    `;

    const { id, labelIds, ...rest } = params;

    const input = {
      ...rest,
      labelIds: labelIds ? { connect: labelIds } : undefined,
    };

    const data = await this.request<{ issueUpdate: { issue: LinearIssue } }>(mutation, {
      id,
      input,
    });

    return data.issueUpdate.issue;
  }

  /**
   * Delete an issue
   */
  async deleteIssue(id: string): Promise<boolean> {
    const mutation = `
      mutation DeleteIssue($id: String!) {
        issueDelete(id: $id) {
          success
        }
      }
    `;

    const data = await this.request<{ issueDelete: { success: boolean } }>(mutation, { id });
    return data.issueDelete.success;
  }

  /**
   * Get comments for an issue
   */
  async getComments({ issueId, limit = 25 }: GetCommentsParams): Promise<LinearComment[]> {
    const query = `
      query Comments($issueId: String!, $limit: Int) {
        issue(id: $issueId) {
          comments(first: $limit) {
            nodes {
              id
              body
              user {
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

    const data = await this.request<{ issue: { comments: { nodes: LinearComment[] } } }>(query, {
      issueId,
      limit,
    });

    return data.issue.comments.nodes;
  }

  /**
   * Create a comment on an issue
   */
  async createComment({ issueId, body }: CreateCommentParams): Promise<LinearComment> {
    const mutation = `
      mutation CreateComment($input: CommentCreateInput!) {
        commentCreate(input: $input) {
          comment {
            id
            body
            user {
              id
              name
            }
            createdAt
            updatedAt
          }
        }
      }
    `;

    const input = {
      issueId,
      body,
    };

    const data = await this.request<{ commentCreate: { comment: LinearComment } }>(mutation, {
      input,
    });

    return data.commentCreate.comment;
  }

  /**
   * Assign an issue to a user
   */
  async assignIssue(issueId: string, assigneeId: string | null | undefined): Promise<LinearIssue> {
    return this.updateIssue({
      id: issueId,
      assigneeId: assigneeId === null ? undefined : assigneeId,
    });
  }

  /**
   * Get all available labels
   */
  async getLabels(): Promise<LinearLabel[]> {
    const query = `
      query Labels {
        issueLabels {
          nodes {
            id
            name
            color
          }
        }
      }
    `;

    const data = await this.request<{ issueLabels: { nodes: LinearLabel[] } }>(query);
    return data.issueLabels.nodes;
  }

  /**
   * Add a label to an issue
   */
  async addIssueLabel(issueId: string, labelId: string): Promise<LinearIssue> {
    const mutation = `
      mutation AddIssueLabel($id: String!, $labelId: String!) {
        issueUpdate(id: $id, input: { labelIds: { connect: [$labelId] } }) {
          issue {
            id
            identifier
            title
            labels {
              nodes {
                id
                name
              }
            }
          }
        }
      }
    `;

    const data = await this.request<{ issueUpdate: { issue: LinearIssue } }>(mutation, {
      id: issueId,
      labelId,
    });

    return data.issueUpdate.issue;
  }

  /**
   * Remove a label from an issue
   */
  async removeIssueLabel(issueId: string, labelId: string): Promise<LinearIssue> {
    const mutation = `
      mutation RemoveIssueLabel($id: String!, $labelId: String!) {
        issueUpdate(id: $id, input: { labelIds: { disconnect: [$labelId] } }) {
          issue {
            id
            identifier
            title
            labels {
              nodes {
                id
                name
              }
            }
          }
        }
      }
    `;

    const data = await this.request<{ issueUpdate: { issue: LinearIssue } }>(mutation, {
      id: issueId,
      labelId,
    });

    return data.issueUpdate.issue;
  }
} 