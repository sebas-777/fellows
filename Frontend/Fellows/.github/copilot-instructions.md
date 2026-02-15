# Copilot Instructions for Fellows Frontend

## Project Overview
**Fellows** is an Angular 21 frontend application using standalone components (no module system). It's configured with strict TypeScript settings, SCSS styling, and Vitest for unit testing. The project integrates an HTML5UP template ("Forty") for baseline design.

## Architecture & Key Patterns

### Component Structure
- **Standalone Components**: All components use the `standalone: true` pattern (see [src/app/app.ts](src/app/app.ts), [src/app/shared/header/header.ts](src/app/shared/header/header.ts))
- **Component Composition**: Import child components directly in parent `imports` array, not via NgModules
- **File Organization**: Each component lives in its own folder with `.ts`, `.html`, `.scss` files
  - Example: `src/app/shared/header/` contains `header.ts`, `header.html`, `header.scss`

### Signals & Reactivity
- Project uses Angular's signal-based reactivity (see `signal('Fellows')` in [src/app/app.ts](src/app/app.ts))
- Use `signal()` for component state instead of RxJS observables when possible
- Prefer signals over reactive forms for simple state management

### Routing
- Routes are defined in [src/app/app.routes.ts](src/app/app.routes.ts) as an array (standalone routing)
- Router is provided via `provideRouter(routes)` in [src/app/app.config.ts](src/app/app.config.ts)
- When adding routes, update `app.routes.ts` and import components directly

### Styling
- **Global styles**: [src/styles.scss](src/styles.scss) imports the HTML5UP theme CSS
- **Component styles**: Defined alongside components (e.g., `header.scss`)
- **SCSS configuration**: Angular is configured with `"inlineStyleLanguage": "scss"` in `angular.json`
- Design system comes from HTML5UP template in `public/assets/css/main.css` and SASS sources in `html5up-forty/assets/sass/`

## Development Workflows

### Running the Application
```bash
npm start          # Dev server on http://localhost:4200/
npm run build      # Production build
npm run watch      # Watch mode for development
npm test          # Run tests with Vitest
```

### Generating Components
```bash
ng generate component component-name
# Creates: src/app/component-name/ with .ts, .html, .scss files
# Automatically uses standalone: true and inlineStyleLanguage: scss
```

### Code Quality
- **TypeScript Settings** (see [tsconfig.json](tsconfig.json)):
  - `strict: true`, `noImplicitReturns: true`, `noFallthroughCasesInSwitch: true`
  - Enforce strict template checking in Angular
- **Formatting**: Prettier configured with 100 character line width, single quotes, and Angular parser for templates
- **Target**: ES2022, modern JavaScript features available

## Project-Specific Conventions

### Naming & Selectors
- Component selector prefix is `app-` (configured in `angular.json`)
- Export component classes with PascalCase (e.g., `export class Header`)
- Template filenames: `component.html`, styles: `component.scss`

### Dependencies
- **Angular Version**: 21.1.0 (standalone-first, new build system)
- **Testing**: Vitest 4.0.8 (lightweight alternative to Jasmine/Karma)
- **RxJS**: 7.8.0 (for advanced async scenarios, but signals preferred for state)
- **Build Tool**: Angular's new `@angular/build` (not legacy ng build)

### Key Files to Reference
- [angular.json](angular.json) — build config, SCSS setup, asset handling
- [src/app/app.ts](src/app/app.ts) — root component with imports pattern
- [src/main.ts](src/main.ts) — bootstrap function using standalone config
- [package.json](package.json) — dependencies and npm scripts

## Integration Points

- **Public Assets**: Build copies `public/` folder to dist via angular.json `"assets"` config
- **HTML5UP Template**: Base HTML/CSS in `html5up-forty/` and `public/assets/` — components wrap and customize this design
- **Global Error Handling**: `provideBrowserGlobalErrorListeners()` in app config

## Important Constraints

- **Bundle Budget**: Production build limited to 500kB initial + 1MB total; component styles max 4kB each
- **Strict Mode**: Strict TypeScript compilation required; no `any` types without justification
- **No NgModules**: This is a standalone app; never add NgModule decorators or import statements to modules
