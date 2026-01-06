// Generates a unique email address using an alias and the current timestamp
// Example output: testuser+1702478123456@example.com
export const makeUniqueEmail = (alias) =>
  `${alias}+${Date.now()}@example.com`;

// Combines first and last name into a single full name string
// Example output: "John Doe"
export const makeFullName = (first, last) =>
  `${first} ${last}`;

// Generates valid-looking payment data for demo checkout
export const makePaymentData = () => ({
  nameOnCard: `Test User ${Date.now()}`,
  cardNumber: "4111111111111111",
  cvc: "123",
  expMonth: "12",
  expYear: "2030",
});


