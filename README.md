# E2E Testing Boilerplate with CodeceptJS

This is a boilerplate project for end-to-end testing using CodeceptJS with Playwright. It includes a complete setup for both UI and API testing, with built-in support for parallel execution, multiple browsers, and comprehensive reporting.

## Features

- 🎭 Playwright as the primary testing engine
- 🌐 REST API testing support
- 📱 Responsive testing with different viewport sizes
- 🏃‍♂️ Parallel test execution
- 📊 Allure reporting
- 🔄 Retry failed tests automatically
- 📸 Automatic screenshots on failure
- 🎥 Video recording of test runs
- 🌍 Multiple environment support
- 🔒 Authentication helpers included
- 📝 TypeScript support
- 🧹 ESLint + Prettier for code quality

## Prerequisites

- Node.js 16 or higher
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd <project-directory>
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
BASE_URL=http://localhost:3000
API_URL=http://localhost:3001
HEADLESS=false
```

## Project Structure

```
├── config/                 # Configuration files
├── tests/
│   ├── api/               # API tests
│   ├── e2e/              
│   │   ├── features/      # Test scenarios
│   │   ├── pages/         # Page objects
│   │   └── fragments/     # Reusable page fragments
│   └── helpers/           # Custom helpers
├── output/                # Test artifacts
└── codecept.conf.ts      # CodeceptJS configuration
```

```bash
npx codeceptjs def
```
## Running Tests

### Run all tests
```bash
npm test
```

### Run tests in headless mode
```bash
npm run test:headless
```

### Run tests with UI
```bash
npm run test:ui
```

### Run tests in parallel
```bash
npm run test:parallel
```

### Run smoke tests only
```bash
npm run test:smoke
```

### Run API tests only
```bash
npm run test:api
```

## Reporting

### Generate Allure report
```bash
npm run allure:report
```

### View Allure report history
```bash
npm run allure:history
```

## Writing Tests

### UI Test Example
```typescript
Feature('Authentication');

Scenario('Login with valid credentials @smoke', async ({ I, loginPage }) => {
  loginPage.goto();
  loginPage.login('test@example.com', 'password123');
  
  I.see('Welcome back!');
  I.seeCurrentUrlEquals('/dashboard');
});
```

### API Test Example
```typescript
Feature('API Authentication');

Scenario('Login with valid credentials @api', async ({ I }) => {
  const response = await I.sendPostRequest('/api/auth/login', {
    email: 'test@example.com',
    password: 'password123'
  });
  
  I.assertEqual(response.status, 200);
  I.assertHasProperty(response.data, 'token');
});
```

## Best Practices

1. Use Page Objects for UI elements and interactions
2. Keep tests atomic and independent
3. Use meaningful scenario descriptions
4. Tag tests appropriately (@smoke, @api, etc.)
5. Use custom helpers for common operations
6. Handle authentication properly
7. Clean up test data after execution

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 