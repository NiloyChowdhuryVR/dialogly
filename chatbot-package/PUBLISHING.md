# Publishing the Chatbot Package to npm

## Current Status

The `dialogly` chatbot package is **built locally** in this monorepo at `packages/chatbot`. It's **not yet published to npm**.

## How to Use the Package Locally (For Testing)

### Option 1: Use npm link

```bash
# 1. Build the package
cd packages/chatbot
npm run build

# 2. Create a global link
npm link

# 3. In your test project
cd /path/to/your/test-project
npm link dialogly

# 4. Use it in your React app
import { Chatbot } from 'dialogly';

function App() {
  return <Chatbot apiKey="your-api-key-here" apiUrl="http://localhost:3001/api/chat/query" />;
}
```

### Option 2: Use Relative Path (Monorepo Only)

If testing within this monorepo:

```json
{
  "dependencies": {
    "dialogly": "file:./packages/chatbot"
  }
}
```

---

## How to Publish to npm (Make it Public)

### Prerequisites

1. **npm account**: Sign up at https://www.npmjs.com
2. **Login to npm**: Run `npm login` in terminal
3. **Unique package name**: Check if "dialogly" is available

### Step 1: Update Package Name (If Needed)

If "dialogly" is taken, update `packages/chatbot/package.json`:

```json
{
  "name": "@your-username/dialogly",
  "version": "1.0.0"
}
```

### Step 2: Fix the Build

The package needs to bundle CSS properly. Update `packages/chatbot/package.json`:

```json
{
  "name": "dialogly",
  "version": "1.0.0",
  "description": "AI-powered chatbot widget for your website",
  "main": "./dist/index.js",
  "module": "./dist/index.mjs",
  "types": "./dist/index.d.ts",
  "files": [
    "dist",
    "README.md"
  ],
  "exports": {
    ".": {
      "import": "./dist/index.mjs",
      "require": "./dist/index.js",
      "types": "./dist/index.d.ts"
    },
    "./styles.css": "./dist/index.css"
  }
}
```

### Step 3: Update tsup Config

Update `packages/chatbot/tsup.config.ts` to bundle CSS:

```typescript
import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts', 'src/styles/styles.css'],
  format: ['cjs', 'esm'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  external: ['react', 'react-dom'],
  esbuildOptions(options) {
    options.banner = {
      js: '"use client"',
    };
  },
});
```

### Step 4: Update Component to Export CSS

Update `packages/chatbot/src/index.ts`:

```typescript
export { Chatbot } from './components/Chatbot';
export type { ChatbotProps, ChatMessage } from './types/types';

// Export CSS for users to import
import './styles/styles.css';
```

### Step 5: Build the Package

```bash
cd packages/chatbot
npm run build
```

This will create the `dist` folder with:
- `index.js` (CommonJS)
- `index.mjs` (ES Module)
- `index.d.ts` (TypeScript types)
- `index.css` (Bundled styles)

### Step 6: Test Locally Before Publishing

```bash
# In packages/chatbot
npm pack

# This creates a .tgz file
# Install it in a test project
cd /path/to/test-project
npm install /path/to/dialogly-1.0.0.tgz
```

### Step 7: Publish to npm

```bash
cd packages/chatbot

# First time publishing
npm publish

# Or if using scoped package
npm publish --access public
```

### Step 8: Update Version for Future Releases

```bash
# Patch version (1.0.0 -> 1.0.1)
npm version patch

# Minor version (1.0.0 -> 1.1.0)
npm version minor

# Major version (1.0.0 -> 2.0.0)
npm version major

# Then publish
npm publish
```

---

## After Publishing

### Users Can Install It

```bash
npm install dialogly
```

### Usage in Any React App

```jsx
import { Chatbot } from 'dialogly';
import 'dialogly/styles.css'; // Import styles

function App() {
  return (
    <div>
      <h1>My Website</h1>
      <Chatbot 
        apiKey="dlg_your_api_key_here"
        apiUrl="https://your-api-domain.com/api/chat/query"
        theme="light"
        position="right"
        color="#3b82f6"
      />
    </div>
  );
}
```

### Usage in Plain HTML/JavaScript

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="https://unpkg.com/dialogly@1.0.0/dist/index.css">
</head>
<body>
  <div id="root"></div>
  
  <script type="module">
    import { Chatbot } from 'https://unpkg.com/dialogly@1.0.0/dist/index.mjs';
    import React from 'https://unpkg.com/react@19/umd/react.production.min.js';
    import ReactDOM from 'https://unpkg.com/react-dom@19/umd/react-dom.production.min.js';
    
    ReactDOM.render(
      React.createElement(Chatbot, {
        apiKey: 'your-api-key',
        apiUrl: 'https://your-api.com/api/chat/query'
      }),
      document.getElementById('root')
    );
  </script>
</body>
</html>
```

---

## Alternative: Use CDN (Without npm)

If you don't want to publish to npm, you can:

1. Build the package
2. Upload `dist` folder to a CDN (Cloudflare, AWS S3, etc.)
3. Users can include it via `<script>` tag

---

## Important Notes

1. **Package Name**: "dialogly" might already be taken on npm. Check first!
2. **API URL**: Users need to point to YOUR deployed API backend
3. **Versioning**: Follow semantic versioning (semver)
4. **Documentation**: Keep README.md updated with examples
5. **License**: Add a LICENSE file (MIT recommended)

---

## Quick Publish Checklist

- [ ] Choose unique package name
- [ ] Update package.json with correct name and version
- [ ] Fix tsup config to bundle CSS
- [ ] Build package successfully
- [ ] Test with `npm pack` and install in test project
- [ ] Login to npm (`npm login`)
- [ ] Publish (`npm publish`)
- [ ] Test installation (`npm install dialogly`)
- [ ] Update documentation with installation instructions

---

## Current Issue

The build is currently failing because CSS bundling needs to be configured properly. Follow the steps above to fix it before publishing.
