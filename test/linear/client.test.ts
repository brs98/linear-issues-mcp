import { describe, expect, it, vi, beforeEach } from 'vitest';
import { LinearClient } from '../../src/linear/client.js';
import type { LinearIssue } from '../../src/types.js';

// Mock fetch
vi.stubGlobal('fetch', vi.fn());

describe('LinearClient', () => {
  let client: LinearClient;
  const mockApiKey = 'mock-api-key';
  const mockBaseUrl = 'https://api.linear.app/graphql';

  beforeEach(() => {
    vi.resetAllMocks();
    client = new LinearClient({ apiKey: mockApiKey });
  });

  describe('request method', () => {
    it('should make a POST request with the correct headers and body', async () => {
      // Mock successful response
      const mockResponse = {
        ok: true,
        json: vi.fn().mockResolvedValue({ data: { test: 'data' } }),
      };
      (fetch as unknown as ReturnType<typeof vi.fn>).mockResolvedValue(mockResponse);

      // Use a private method through any to test the request method
      const result = await (client as any).request('query { test }', { var: 'value' });

      // Verify fetch was called correctly
      expect(fetch).toHaveBeenCalledWith(mockBaseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${mockApiKey}`,
        },
        body: JSON.stringify({
          query: 'query { test }',
          variables: { var: 'value' },
        }),
      });

      // Verify result
      expect(result).toEqual({ test: 'data' });
    });

    it('should throw an error when the response is not ok', async () => {
      // Mock error response
      const mockResponse = {
        ok: false,
        status: 401,
        text: vi.fn().mockResolvedValue('Unauthorized'),
      };
      (fetch as unknown as ReturnType<typeof vi.fn>).mockResolvedValue(mockResponse);

      // Expect the request to throw an error
      await expect((client as any).request('query { test }')).rejects.toThrow(
        'Linear API error: 401 Unauthorized'
      );
    });

    it('should throw an error when GraphQL returns errors', async () => {
      // Mock GraphQL error response
      const mockResponse = {
        ok: true,
        json: vi.fn().mockResolvedValue({
          data: null,
          errors: [{ message: 'GraphQL Error' }],
        }),
      };
      (fetch as unknown as ReturnType<typeof vi.fn>).mockResolvedValue(mockResponse);

      // Expect the request to throw an error
      await expect((client as any).request('query { test }')).rejects.toThrow('Linear GraphQL Error:');
    });
  });

  // Test getIssues method
  describe('getIssues', () => {
    it('should return a list of issues', async () => {
      // Mock issues response
      const mockIssues: LinearIssue[] = [
        {
          id: 'issue1',
          identifier: 'ABC-1',
          title: 'Test Issue',
          createdAt: '2023-01-01T00:00:00.000Z',
          updatedAt: '2023-01-01T00:00:00.000Z',
        },
      ];

      // Mock successful response
      const mockResponse = {
        ok: true,
        json: vi.fn().mockResolvedValue({
          data: {
            issues: {
              nodes: mockIssues,
            },
          },
        }),
      };
      (fetch as unknown as ReturnType<typeof vi.fn>).mockResolvedValue(mockResponse);

      // Call the method
      const result = await client.getIssues();

      // Verify the result
      expect(result).toEqual(mockIssues);
    });
  });

  // Test getIssueById method
  describe('getIssueById', () => {
    it('should return a single issue', async () => {
      // Mock issue response
      const mockIssue: LinearIssue = {
        id: 'issue1',
        identifier: 'ABC-1',
        title: 'Test Issue',
        createdAt: '2023-01-01T00:00:00.000Z',
        updatedAt: '2023-01-01T00:00:00.000Z',
      };

      // Mock successful response
      const mockResponse = {
        ok: true,
        json: vi.fn().mockResolvedValue({
          data: {
            issue: mockIssue,
          },
        }),
      };
      (fetch as unknown as ReturnType<typeof vi.fn>).mockResolvedValue(mockResponse);

      // Call the method
      const result = await client.getIssueById('issue1');

      // Verify the result
      expect(result).toEqual(mockIssue);
    });
  });

  // Add more test cases for other methods as needed
}); 