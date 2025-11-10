# Application

A modern application built with Angular 20 and NgRx Signals, featuring a modular monorepo architecture using Nx.

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js 18 or higher
- npm (Node Package Manager)

## Getting Started

### First-time Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Install Nx CLI globally (if not already installed):
   ```bash
   npm install -g nx
   ```
   
### Install Application Dependencies

1. Inside Applictation folder install dependencies:
   ```bash
   npm install
   ```

2. If the before one fails, then use following command:
   ```bash
   npm install --legacy-peer-deps
   ```

### Development Server

Start the development server:
```bash
nx serve t0rUf1fnfnfApLfviFbmUfENl
```

The application will be available at `http://localhost:4200`

### Running Tests

```bash
# Run unit tests
nx test t0rUf1fnfnfApLfviFbmUfENl

# Run e2e tests
nx e2e t0rUf1fnfnfApLfviFbmUfENl-e2e
```

### Building for Production

Create a production build:
```bash
nx build t0rUf1fnfnfApLfviFbmUfENl --configuration=production
```

## Project Structure

The application follows a modular architecture with these main libraries:

- `apptoolbar`: Application toolbar component
- `dashboard`: Main dashboard component
- `shared`: Shared utilities and interfaces
- `stories-store`: State management using NgRx signals
- `story-card`: Story card component

## Development Tools

Useful commands for development:

```bash
# Lint the code
nx lint t0rUf1fnfnfApLfviFbmUfENl

# Generate new components/services
nx generate @nx/angular:component my-component
nx generate @nx/angular:service my-service

# Check affected projects
nx affected:graph
```

## Technology Stack

- Angular 20.x
- NgRx Signals for state management
- Angular Material for UI components
- Server-Side Rendering (SSR) support
- SCSS for styling
- Nx for monorepo management
- Jest for unit testing
- Playwright for e2e testing

## Additional Resources

- [Angular Documentation](https://angular.dev)
- [NgRx Signals](https://ngrx.io/guide/signals)
- [Nx Documentation](https://nx.dev)
- [Angular Material](https://material.angular.io)


### Screenshot

<img width="1429" height="881" alt="Screenshot 2025-11-10 at 12 54 03 a m" src="https://github.com/user-attachments/assets/a5ae5cf7-e0ed-494d-9b8b-05e15d495f70" />
