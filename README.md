# Express TypeScript Project

This project is a Node.js application using Express and TypeScript, with integration for ESLint, Prettier, and Husky for code quality and formatting.

## Table of Contents

- [Installation](#installation)
- [Scripts](#scripts)
- [Development](#development)
- [Cloning the Repository](#cloning-the-repository)
- [License](#license)

## Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/techstackspace/express.git
   cd express
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

3. **Initialize the Project:**

   Ensure that TypeScript is correctly set up by running:

   ```bash
   npm run build
   ```

   This will compile the TypeScript code into JavaScript in the `dist` directory.

## Scripts

- **Build:** Compile TypeScript files to JavaScript.
  
  ```bash
  npm run build
  ```

- **Start:** Start the application using the compiled JavaScript in the `dist` directory.
  
  ```bash
  npm start
  ```

- **Dev:** Start the application in development mode using `ts-node-dev`, which allows running TypeScript files directly.
  
  ```bash
  npm run dev
  ```

- **Lint:** Check the code for linting issues according to the ESLint configuration.
  
  ```bash
  npm run lint
  ```

- **Prettier:** Format the code using Prettier according to the configuration.
  
  ```bash
  npm run prettier
  ```

- **Precommit:** Automatically run linting and formatting checks before commits, thanks to Husky.
  
  ```bash
  npm run precommit
  ```

## Development

To start developing the application, follow these steps:

1. **Run in Development Mode:**

   Start the application with live TypeScript compilation:

   ```bash
   npm run dev
   ```

2. **Lint and Format Code:**

   Ensure your code adheres to linting rules and formatting standards:

   ```bash
   npm run lint
   npm run prettier
   ```

   These commands can also be run automatically before committing changes using Husky.

## Cloning the Repository

To clone and initialize the project:

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/techstackspace/express.git
   cd express
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

3. **Run Development Server:**

   ```bash
   npm run dev
   ```

## License

This project is licensed under the [MIT License](LICENSE).

### Summary

- The **Installation** section guides users through cloning the repository and installing dependencies.
- **Scripts** section describes each npm script and its purpose.
- **Development** explains how to run the project in development mode and check code quality.
- **Cloning the Repository** provides a step-by-step guide for setting up the project from scratch.
- **License** section mentions the project's license.
