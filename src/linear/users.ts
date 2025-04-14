import { LinearClient } from './client.js';

// Define user related types
export interface LinearUser {
  id: string;
  name: string;
  email?: string;
  displayName?: string;
  avatarUrl?: string;
  active: boolean;
  admin: boolean;
  createdAt: string;
  updatedAt: string;
}

/**
 * Extension of LinearClient with user-specific operations
 */
export class LinearUsersClient {
  private client: LinearClient;

  constructor(client: LinearClient) {
    this.client = client;
  }

  /**
   * Get a list of all users
   */
  async getUsers(limit = 25): Promise<LinearUser[]> {
    const query = `
      query Users($limit: Int) {
        users(first: $limit) {
          nodes {
            id
            name
            email
            displayName
            avatarUrl
            active
            admin
            createdAt
            updatedAt
          }
        }
      }
    `;

    const data = await this.client.request<{ users: { nodes: LinearUser[] } }>(query, { limit });
    return data.users.nodes;
  }

  /**
   * Get a user by ID
   */
  async getUserById(id: string): Promise<LinearUser> {
    const query = `
      query User($id: String!) {
        user(id: $id) {
          id
          name
          email
          displayName
          avatarUrl
          active
          admin
          createdAt
          updatedAt
        }
      }
    `;

    const data = await this.client.request<{ user: LinearUser }>(query, { id });
    return data.user;
  }

  /**
   * Get the currently authenticated user
   */
  async getCurrentUser(): Promise<LinearUser> {
    const query = `
      query Me {
        viewer {
          id
          name
          email
          displayName
          avatarUrl
          active
          admin
          createdAt
          updatedAt
        }
      }
    `;

    const data = await this.client.request<{ viewer: LinearUser }>(query);
    return data.viewer;
  }
} 