# NY Times Articles Project

This project is a React application that fetches and displays articles from the NY Times API. It includes unit tests, UI tests, and code coverage reporting.

---

## Table of Contents

- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Running Tests](#running-tests)
- [Generating Code Coverage](#generating-code-coverage)

---

## Installation

Clone the repository:

```bash
git clone https://github.com/your-username/ny-times-articles.git
cd ny-times-articles
```

## Install dependencies:

To start the development server, run:

```
npm run dev
```

The application will be available at:

```
http://localhost:5173/
```

## Running Tests

### Unit Tests

Run unit tests using Jest and React Testing Library:

```
npm run test
```

## Generating Code Coverage

To generate a code coverage report, run:

```
npm run test -- --coverage
```

## Running Tests and generating Code Coverage together

To run unit tests and generate a code coverage report, run:

```
npm run test:coverage
```

The coverage report will be generated in the coverage folder. Open the following file in your browser to view the report:

```
coverage/lcov-report/index.html

```
