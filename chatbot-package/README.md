# Dialogly Chatbot Widget

AI-powered chatbot widget for your website. Easy to integrate, customizable, and intelligent.

## Installation

```bash
npm install dialogly
```

## Usage

```jsx
import { Chatbot } from 'dialogly';

function App() {
  return (
    <Chatbot apiKey="your_api_key" />
  );
}
```

The chatbot will **automatically fetch** your customization settings (theme, color, position, greeting, name) from your Dialogly dashboard using the API key. You don't need to pass these as props!

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `apiKey` | string | Yes | - | Your Dialogly API key from the dashboard |
| `apiUrl` | string | No | Production API | Custom API URL (for self-hosted deployments) |
| `testMode` | boolean | No | `false` | Enable test mode with mock responses (no API calls) |
| `theme` | 'light' \| 'dark' | No | From dashboard | Override theme (fetched from dashboard by default) |
| `color` | string | No | From dashboard | Override primary color (fetched from dashboard by default) |
| `position` | 'left' \| 'right' | No | From dashboard | Override position (fetched from dashboard by default) |
| `greeting` | string | No | From dashboard | Override greeting message (fetched from dashboard by default) |
| `name` | string | No | From dashboard | Override chatbot name (fetched from dashboard by default) |

**Note:** All styling props (`theme`, `color`, `position`, `greeting`, `name`) are automatically fetched from your dashboard customization settings. You only need to provide them if you want to override the dashboard settings.

## Test Mode

Test the chatbot without an API key:

```jsx
<Chatbot
  apiKey="test"
  testMode={true}
/>
```

## Examples

### Basic Usage (Recommended)

```jsx
// Chatbot automatically uses your dashboard settings
<Chatbot apiKey="dlg_abc123..." />
```

### Override Dashboard Settings

```jsx
// Override specific settings while keeping others from dashboard
<Chatbot
  apiKey="dlg_abc123..."
  theme="dark"
  color="#10b981"
/>
```

### Custom API URL

```jsx
<Chatbot
  apiKey="dlg_abc123..."
  apiUrl="https://my-custom-api.com/api/chat/query"
/>
```

## Features

- 🤖 AI-powered responses
- 💬 Real-time chat interface
- 🎨 Automatically syncs with dashboard customization
- 📱 Mobile responsive
- ⚡ Lightweight and fast
- 🔒 Secure API communication
- 🧪 Test mode for development
- 🎯 No CSS imports needed - styles are injected automatically

## License

MIT
