import { test, expect } from '@playwright/test';
import Ajv, { JSONSchemaType } from 'ajv';

// Define the Product interface for type safety
interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image?: string;
}

// Define JSON Schema for product validation
const productSchema: JSONSchemaType<Product> = {
  type: 'object',
  properties: {
    id: { type: 'integer' },
    title: { type: 'string' },
    price: { type: 'number' },
    category: { type: 'string' },
    description: { type: 'string' },
    image: { type: 'string', nullable: true },
  },
  required: ['id', 'title', 'price', 'category', 'description'],
  additionalProperties: true,
};

test.describe('FakeStore API - Product Endpoint', () => {
  const API_ENDPOINT = 'https://fakestoreapi.com/products/1';
  let ajv: Ajv;

  test.beforeAll(() => {
    // Initialize Ajv validator
    ajv = new Ajv();
  });

  test('Should fetch product with status 200', async ({ request }) => {
    // Send GET request to the endpoint
    const response = await request.get(API_ENDPOINT);

    // Verify status code is 200
    expect(response.status()).toBe(200);
  });

  test('Should contain required keys in response', async ({ request }) => {
    // Send GET request to the endpoint
    const response = await request.get(API_ENDPOINT);
    const data = await response.json();

    // Verify response contains all required keys
    expect(data).toHaveProperty('id');
    expect(data).toHaveProperty('title');
    expect(data).toHaveProperty('price');
    expect(data).toHaveProperty('category');
    expect(data).toHaveProperty('description');
  });

  test('Should validate response against JSON Schema with Ajv', async ({
    request,
  }) => {
    // Send GET request to the endpoint
    const response = await request.get(API_ENDPOINT);
    expect(response.status()).toBe(200);

    const data = await response.json();

    // Validate data against JSON Schema using Ajv
    const validate = ajv.compile(productSchema);
    const isValid = validate(data);

    expect(isValid).toBe(true);
    if (!isValid) {
      console.error('Validation errors:', validate.errors);
    }
  });

  test('Should validate data types', async ({ request }) => {
    // Send GET request to the endpoint
    const response = await request.get(API_ENDPOINT);
    const data = await response.json();

    // Validate individual data types
    expect(typeof data.id).toBe('number');
    expect(typeof data.title).toBe('string');
    expect(typeof data.price).toBe('number');
    expect(typeof data.category).toBe('string');
    expect(typeof data.description).toBe('string');
  });

  test('Should log product title and price', async ({ request }) => {
    // Send GET request to the endpoint
    const response = await request.get(API_ENDPOINT);
    expect(response.status()).toBe(200);

    const data: Product = await response.json();

    // Log product title and price to console
    console.log(`Product Title: ${data.title}`);
    console.log(`Product Price: $${data.price}`);

    // Also verify values are not empty
    expect(data.title).toBeTruthy();
    expect(data.price).toBeGreaterThan(0);
  });

  test('Complete API test scenario', async ({ request }) => {
    // 1. Send GET request to the endpoint
    const response = await request.get(API_ENDPOINT);

    // 2. Verify response status is 200
    expect(response.status()).toBe(200);

    const data: Product = await response.json();

    // 3. Validate the response contains required keys
    expect(data).toHaveProperty('id');
    expect(data).toHaveProperty('title');
    expect(data).toHaveProperty('price');
    expect(data).toHaveProperty('category');
    expect(data).toHaveProperty('description');

    // 4. Validate data types
    expect(typeof data.id).toBe('number');
    expect(typeof data.title).toBe('string');
    expect(typeof data.price).toBe('number');
    expect(typeof data.category).toBe('string');
    expect(typeof data.description).toBe('string');

    // 5. Optional: Validate against JSON Schema using Ajv
    const validate = ajv.compile(productSchema);
    const isValid = validate(data);
    expect(isValid).toBe(true);

    // 6. Log product title and price
    console.log(`✓ Product Title: ${data.title}`);
    console.log(`✓ Product Price: $${data.price}`);
    console.log(`✓ Category: ${data.category}`);
  });
});
