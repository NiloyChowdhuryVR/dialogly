# Dialogly Deployment Guide

## 📋 Overview
This guide walks you through deploying Dialogly to production in the correct order.

## 🚀 Deployment Steps

### Step 1: Deploy Main Application to Vercel

1. **Push to GitHub** (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Dialogly v1.0"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/dialogly.git
   git push -u origin main
   ```

2. **Deploy to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository
   - Configure:
     - **Framework Preset**: Next.js
     - **Root Directory**: `./` (leave as default)
     - **Build Command**: `npm run build`
     - **Output Directory**: `.next` (default)

3. **Add Environment Variables** in Vercel:
   ```
   DATABASE_URL=your_postgres_connection_string
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
   CLERK_SECRET_KEY=your_clerk_secret
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   ```

4. **Deploy** and note your production URL (e.g., `https://dialogly.vercel.app`)

### Step 2: Update Chatbot Package API URLs

Once deployed, update the chatbot package with your production URL:

**File**: `chatbot-package/src/lib/api.ts`

```typescript
// Replace these lines:
const DEFAULT_API_URL = 'https://api.dialogly.ai/api/chat/query';
const DEFAULT_CONTEXT_URL = 'https://api.dialogly.ai/api/context';

// With your actual Vercel URL:
const DEFAULT_API_URL = 'https://YOUR-APP.vercel.app/api/chat/query';
const DEFAULT_CONTEXT_URL = 'https://YOUR-APP.vercel.app/api/context';
```

### Step 3: Build Chatbot Package

```bash
cd chatbot-package
npm run build
```

This will:
- Compile TypeScript to JavaScript
- Generate type definitions
- Create both ESM and CommonJS builds
- Output to `dist/` folder

### Step 4: Test Package Locally (Optional)

```bash
# In chatbot-package directory
npm link

# In a test React project
npm link dialogly
```

### Step 5: Publish to npm

1. **Login to npm**:
   ```bash
   npm login
   ```

2. **Verify package.json**:
   - Check `name`: "dialogly" (must be unique on npm)
   - Check `version`: "1.0.0"
   - Check `description`, `keywords`, `author`

3. **Publish**:
   ```bash
   cd chatbot-package
   npm publish
   ```

   > **Note**: If "dialogly" is taken, you may need to use a scoped package like `@yourusername/dialogly`

### Step 6: Verify Deployment

1. **Test the Dashboard**:
   - Visit `https://YOUR-APP.vercel.app`
   - Sign up / Sign in
   - Generate API key
   - Add FAQs and website info
   - Customize chatbot

2. **Test the Package**:
   ```bash
   npm install dialogly
   ```
   
   Then in your React app:
   ```jsx
   import { Chatbot } from 'dialogly';
   
   function App() {
     return <Chatbot apiKey="your_api_key" testMode={true} />;
   }
   ```

## 📝 Post-Deployment Checklist

- [ ] Main app deployed to Vercel
- [ ] Environment variables configured
- [ ] Database connected and migrated
- [ ] Chatbot package updated with production URL
- [ ] Package built successfully
- [ ] Package published to npm
- [ ] Tested chatbot integration in a demo app

## 🔄 Future Updates

When you make changes:

1. **Dashboard/API changes**: 
   - Push to GitHub → Auto-deploys to Vercel

2. **Chatbot package changes**:
   - Update version in `package.json`
   - Build: `npm run build`
   - Publish: `npm publish`

## 🆘 Troubleshooting

**Issue**: Package name already taken on npm
- **Solution**: Use scoped package `@yourusername/dialogly` or choose different name

**Issue**: Build fails
- **Solution**: Run `npm run type-check` to find TypeScript errors

**Issue**: Chatbot can't connect to API
- **Solution**: Check CORS settings and API URL in package

**Issue**: Database connection fails
- **Solution**: Verify `DATABASE_URL` in Vercel environment variables

## 📚 Resources

- [Vercel Deployment Docs](https://vercel.com/docs)
- [npm Publishing Guide](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry)
- [Clerk Setup Guide](https://clerk.com/docs)
- [Prisma Deployment](https://www.prisma.io/docs/guides/deployment)
