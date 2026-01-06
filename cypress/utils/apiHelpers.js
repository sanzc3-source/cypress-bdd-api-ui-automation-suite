/**
 * Utility function to generate a unique email address for API tests.
 *
 * WHY:
 * - Many API endpoints (like user registration) require unique emails.
 * - Using Date.now() guarantees uniqueness across test runs.
 * - Prevents flaky tests caused by "email already exists".
 */
export const generateUniqueEmail = () => {
  return `api_user_${Date.now()}@example.com`;
};

/**
 * Verifies common HTTP response headers.
 *
 * WHY:
 * - Validating headers proves the API is returning a proper response,
 *   not just the correct body.
 * - Content-Type checks are commonly asked about in interviews.
 */
export const verifyCommonHeaders = (response) => {
  expect(response).to.have.property("headers");
  expect(response.headers).to.have.property("content-type");
};

/**
 * Verifies HTTP status code.
 *
 * WHY:
 * - Status codes are part of the API contract.
 * - Explicit validation makes failures easier to debug.
 * - Keeps assertions consistent across all API tests.
 */
export const verifyStatus = (response, expectedStatus) => {
  expect(response).to.have.property("status");
  expect(response.status).to.eq(expectedStatus);
};

