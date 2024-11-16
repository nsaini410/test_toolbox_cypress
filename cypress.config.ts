import { defineConfig } from 'cypress';
import * as dotenv from 'dotenv';
import { allureCypress } from "allure-cypress/reporter";
import path from 'path';
import * as fs from 'fs';

// Load environment variables from the .env file
dotenv.config();

export default defineConfig({
  e2e: {
    baseUrl: process.env.UI_BASE_URL as string,
    env: {
      apiBaseUrl: process.env.API_BASE_URL as string,
    },
    specPattern: 'cypress/e2e/**/*.cy.ts',
    setupNodeEvents(on, config) {
      const allureResultsPath = path.join(__dirname, 'allure-results');
      if (!fs.existsSync(allureResultsPath)) {
        fs.mkdirSync(allureResultsPath, { recursive: true });
      }
      allureCypress(on, config, {
        resultsDir: "allure-results",
      });
    },
  },
});

