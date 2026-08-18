import { test, expect } from '@playwright/test';

// Define a TypeScript interface for strict type safety
interface User {
  id?: number;
  name: string;
  job: string;
}

const BASE_URL = 'https://reqres.in';

test.describe('API Testing with Playwright & TypeScript', () => {

  // 1. GET Request Example
  test('GET - Retrieve user list', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/users?page=2`);
    
    // Validate status code
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy();

    // Parse and validate JSON response
    const body = await response.json();
    expect(body.data).toBeDefined();
    expect(body.data.length).toBeGreaterThan(0);
    expect(body.data[0]).toHaveProperty('email');
  });

  // 2. POST Request Example
  test('POST - Create a new user', async ({ request }) => {
    const payload: User = {
      name: 'morpheus',
      job: 'leader'
    };

    const response = await request.post(`${BASE_URL}/users`, {
      data: payload,
      headers: {
        'Content-Type': 'application/json'
      }
    });

    expect(response.status()).toBe(201);
    
    const body = await response.json();
    expect(body.name).toBe(payload.name);
    expect(body.job).toBe(payload.job);
    expect(body.id).toBeDefined();
  });

  // 3. PUT Request Example
  test('PUT - Update an existing user', async ({ request }) => {
    const payload: User = {
      name: 'morpheus',
      job: 'zion resident'
    };

    // Updating user with ID 2
    const response = await request.put(`${BASE_URL}/users/2`, {
      data: payload
    });

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.job).toBe('zion resident');
    expect(body.updatedAt).toBeDefined();
  });

  // 4. DELETE Request Example
  test('DELETE - Remove a user', async ({ request }) => {
    // Deleting user with ID 2
    const response = await request.delete(`${BASE_URL}/users/2`);
    
    // ReqRes API returns a 204 No Content status for successful deletions
    expect(response.status()).toBe(204);
  });
});