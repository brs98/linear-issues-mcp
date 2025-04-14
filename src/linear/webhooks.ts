import { LinearClient } from './client.js';

export interface Webhook {
  id: string;
  label: string;
  url: string;
  enabled: boolean;
  resourceTypes: string[];
  teamId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateWebhookParams {
  url: string;
  label?: string;
  resourceTypes: string[];
  teamId?: string;
  enabled?: boolean;
}

// Response types
interface WebhooksResponse {
  webhooks: {
    nodes: Webhook[];
  };
}

interface CreateWebhookResponse {
  webhookCreate: {
    success: boolean;
    webhook: Webhook;
  };
}

interface DeleteWebhookResponse {
  webhookDelete: {
    success: boolean;
  };
}

export class LinearWebhooksClient {
  private client: LinearClient;

  constructor(client: LinearClient) {
    this.client = client;
  }

  /**
   * Get a list of webhooks
   */
  async getWebhooks(limit: number = 25): Promise<Webhook[]> {
    const query = `
      query Webhooks($first: Int) {
        webhooks(first: $first) {
          nodes {
            id
            label
            url
            enabled
            resourceTypes
            teamId
            createdAt
            updatedAt
          }
        }
      }
    `;

    const variables = { first: limit };
    const result = await this.client.request<WebhooksResponse>(query, variables);
    return result.webhooks.nodes;
  }

  /**
   * Create a new webhook
   */
  async createWebhook(params: CreateWebhookParams): Promise<Webhook> {
    const { url, label, resourceTypes, teamId, enabled } = params;

    const mutation = `
      mutation CreateWebhook($input: WebhookCreateInput!) {
        webhookCreate(input: $input) {
          success
          webhook {
            id
            label
            url
            enabled
            resourceTypes
            teamId
            createdAt
            updatedAt
          }
        }
      }
    `;

    const variables = {
      input: {
        url,
        label,
        resourceTypes,
        teamId,
        enabled
      },
    };

    const result = await this.client.request<CreateWebhookResponse>(mutation, variables);
    return result.webhookCreate.webhook;
  }

  /**
   * Delete a webhook
   */
  async deleteWebhook(id: string): Promise<boolean> {
    const mutation = `
      mutation DeleteWebhook($id: ID!) {
        webhookDelete(id: $id) {
          success
        }
      }
    `;

    const variables = { id };
    const result = await this.client.request<DeleteWebhookResponse>(mutation, variables);
    return result.webhookDelete.success;
  }
} 