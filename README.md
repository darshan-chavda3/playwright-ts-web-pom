# Playwright Page Object Model with TypeScript

This repository demonstrates the implementation of the Page Object Model (POM) design pattern with Playwright. This project is designed to provide a robust and maintainable testing framework for web applications using Playwright and TypeScript, with a focus on the Page Object Model pattern.

## Getting Started
Before following the steps given below, please ensure that npm and node are installed on your machine.
- **Step1:** Install Playwright latest version `npm init playwright@latest`
- **Step2:** Install Playwright supported browsers `npx playwright install`

## Commands
- Run all the test cases from `./tests` folder
  ```bash
  npm run test
  ```
- Run test cases from specific file
  ```bash
  npm run test {file-name.spec.ts}
  ```
- Run test cases in headed mode
  ```bash
  npm run test -- --headed
  ```
- Run test cases only with specific tag
  ```bash
  npm run test -- --grep "{@tag}"
  ```