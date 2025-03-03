import { setHeadlessWhen, setCommonPlugins } from "@codeceptjs/configure";
import { devices } from "playwright";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Turn on headless mode when running with HEADLESS=true environment variable
setHeadlessWhen(process.env.HEADLESS);

// Enable all common plugins https://github.com/codeceptjs/configure#setcommonplugins
setCommonPlugins();

export const config = {
  name: "codeceptjs-playwright",
  tests: "./{tests/e2e/features,tests/api}/**/*_test.ts",
  output: "./output",
  helpers: {
    Playwright: {
      url: process.env.BASE_URL || "http://localhost:3000",
      show: true,
      browser: "chromium",
      waitForNavigation: "domcontentloaded",
      waitForTimeout: 5000,
      trace: true,
      video: true,
      windowSize: "1920x1080",
      emulate: devices["Desktop Chrome"],
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
    loginPage: "./tests/e2e/pages/login.page.ts",
    homePage: "./tests/e2e/pages/home.page.ts"
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
