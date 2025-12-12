# Dialogly - AI Chatbot Platform

A modern AI-powered chatbot platform built with Next.js 16 and React 19. Create and manage intelligent chatbots for your website with ease.

## 🚀 Features

- **AI-Powered Responses**: Smart chatbot with FAQ matching and AI fallback
- **Easy Integration**: Simple npm package for adding chatbot to any website
- **Dashboard**: Manage API keys, FAQs, settings, and view analytics
- **Customizable**: Configure chatbot appearance, greeting, and position
- **Test Mode**: Test chatbot functionality without API setup

## 📦 Project Structure

```
dialogly/
├── app/                    # Next.js app (dashboard + API routes)
│   ├── dashboard/          # Dashboard pages
│   ├── api/                # API routes
│   ├── layout.tsx
│   └── page.tsx
├── lib/                    # Shared utilities
│   ├── prisma.ts
│   ├── types.ts
│   ├── validation.ts
│   ├── aiService.ts
│   ├── apiKeyAuth.ts
│   └── faqMatcher.ts
├── prisma/                 # Database schema
├── chatbot-package/        # NPM package for chatbot widget
└── package.json
```

## 🛠️ Setup

### Prerequisites

- Node.js 18+
- PostgreSQL database
- Clerk account (for authentication)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/dialogly.git
   cd dialogly
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Copy `.env.example` to `.env` and fill in your values:
   ```bash
   cp .env.example .env
   ```

   Required variables:
   - `DATABASE_URL`: PostgreSQL connection string
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`: Clerk publishable key
   - `CLERK_SECRET_KEY`: Clerk secret key

4. **Set up the database**
   ```bash
   npm run db:generate
   npm run db:push
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📚 Usage

### Dashboard

1. Sign in to the dashboard
2. Generate an API key
3. Add your website description and FAQs
4. Customize chatbot appearance
5. Copy the integration code

### Chatbot Package

The chatbot widget is available as a standalone npm package in `chatbot-package/`.

**Build the package:**
```bash
cd chatbot-package
npm install
npm run build
```

**Publish to npm:**
```bash
npm publish
```

**Use in your website:**
```jsx
import { Chatbot } from 'dialogly';
import 'dialogly/styles.css';

function App() {
  return (
    <Chatbot
      apiKey="your_api_key"
      apiUrl="https://your-app.vercel.app/api/chat/query"
    />
  );
}
```

## 🚀 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy!

The API routes will be automatically deployed with your Next.js app at:
- `https://your-app.vercel.app/api/chat/query`
- `https://your-app.vercel.app/api/context`
- etc.

### Update Chatbot Package

After deployment, update the default API URL in `chatbot-package/src/lib/api.ts`:

```typescript
const DEFAULT_API_URL = 'https://your-app.vercel.app/api/chat/query';
```

Then rebuild and republish the package.

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking
- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push schema to database
- `npm run db:studio` - Open Prisma Studio
- `npm run db:migrate` - Run database migrations

## 🔧 Tech Stack

- **Framework**: Next.js 16
- **Language**: TypeScript
- **Database**: PostgreSQL + Prisma
- **Authentication**: Clerk
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Validation**: Zod

## 📄 License

MIT

## 🤝 Contributing

Contributions are welcome! Please open an issue or submit a pull request.
