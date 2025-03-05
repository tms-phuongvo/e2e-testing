import { setHeadlessWhen, setCommonPlugins } from "@codeceptjs/configure";
import { devices } from "playwright";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

setHeadlessWhen(process.env.HEADLESS === "true");

// Enable all common plugins https://github.com/codeceptjs/configure#setcommonplugins
setCommonPlugins();

export const config = {
  name: "Automation Testing",
  tests: "./{tests/e2e/features, tests/api}/**/*_test.ts",
  output: "./output",
  helpers: {
    Playwright: {
      url: process.env.WEBSITE_URL || "http://localhost:3000",
      browser: "chromium",
      waitForNavigation: "domcontentloaded",
      waitForTimeout: 5000,
      show: true,
      trace: true,
      video: true,
      windowSize: "1920x1080",
      emulate: devices["Desktop Chrome"],
      basicAuth: {
        username: process.env.BASIC_AUTH_USERNAME,
        password: process.env.BASIC_AUTH_PASSWORD
      },
      chromium: {
        args: ["--no-sandbox"]
      }
    },
    REST: {
      endpoint: process.env.API_URL || "http://localhost:3001",
      defaultHeaders: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    },
    JSONResponse: {
      requestHelper: "Playwright"
    },
    ChaiWrapper: {
      require: "codeceptjs-chai"
    },
    APIHelper: {
      require: "./tests/helpers/api.helper.ts"
    },
    CommonHelper: {
      require: "./tests/helpers/common.helper.ts"
    },
    AuthHelper: {
      require: "./tests/helpers/auth.helper.ts"
    }
  },
  include: {
    I: "./tests/steps_file.ts",
    LoginPage: "./tests/e2e/pages/login.page.ts",
    HomePage: "./tests/e2e/pages/home.page.ts",
    ProfilePage: "./tests/e2e/pages/profile.page.ts",
    SettingsPage: "./tests/e2e/pages/settings.page.ts"
  },
  plugins: {
    allure: {
      enabled: true,
      require: "@codeceptjs/allure-legacy",
      outputDir: "./output/reports"
    },
    retryFailedStep: {
      enabled: true,
      retries: 3
    },
    screenshotOnFail: {
      enabled: true,
      fullPageScreenshots: true
    },
    tryTo: {
      enabled: true
    },
    subtitles: {
      enabled: true
    },
    autoDelay: {
      enabled: true
    }
  },
  multiple: {
    parallel: {
      chunks: 2,
      browsers: ["chromium", "firefox"]
    },
    smoke: {
      grep: "@smoke",
      browsers: ["chromium"]
    }
  },
  bootstrap: false,
  teardown: false,
  hooks: [],
  gherkin: {
    features: "./tests/e2e/features/**/*.feature"
  },
  require: ["ts-node/register"]
};
