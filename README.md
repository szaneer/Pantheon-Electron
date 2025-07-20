# Pantheon Desktop

The desktop application for Pantheon's decentralized AI platform. Built with Electron, this app enables local AI model hosting and P2P sharing across your devices.

## 🌟 Features

- **Local Model Hosting**: Share your Ollama and Apple Foundation models
- **P2P Communication**: Direct WebRTC connections to other devices
- **Model Management**: Easy installation and management of AI models
- **Chat Interface**: Clean, intuitive chat experience
- **Cross-Platform**: Runs on macOS, Windows, and Linux
- **Auto-Updates**: Seamless updates with built-in updater

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- Ollama (for local models)
- macOS with Apple Silicon (for Apple Foundation models)

### Development

```bash
# Install dependencies
npm install

# Run in development mode
npm run dev

# Build for production
npm run build
```

### Building Distributables

```bash
# macOS (Universal Binary)
npm run dist:mac

# Windows
npm run dist:win

# Linux
npm run dist:linux

# All platforms
npm run dist
```

## 🔧 Configuration

The app includes an onboarding wizard for first-time setup:

1. **Device Setup**: Automatic device ID generation
2. **Server Configuration**: Configure your signaling server
3. **Model Setup**: Connect to Ollama and enable hosting

### Manual Configuration

- **Signaling Server**: Configure in Settings > Server Configuration
- **Model Hosting**: Enable/disable in Settings > Model Hosting
- **Auto-start Hosting**: Enable hosting on app startup

## 🤖 Supported Models

### Local Models
- **Ollama**: Any model supported by Ollama
- **Apple Foundation Models**: On macOS with Apple Intelligence

### Remote Models
- Access models hosted on other Pantheon devices
- Real-time model discovery and availability

## 🛠️ Development

### Project Structure

```
apps/electron/
├── electron/              # Main process
├── src/                   # Renderer process (React)
├── assets/               # App icons and resources
└── scripts/              # Build scripts
```

### Tech Stack

- **Electron**: Desktop app framework
- **React**: UI framework with TypeScript
- **Vite**: Build tool and dev server
- **WebRTC**: P2P communication
- **Socket.IO**: Signaling coordination

### Debugging

```bash
# Enable debug logs
DEBUG=* npm run dev

# Open DevTools in production
# Use View > Toggle DevTools menu
```

## 📦 Distribution

### macOS

- Universal binary supporting both Intel and Apple Silicon
- Code signed and notarized for distribution
- Auto-updater with GitHub releases

### Windows

- NSIS installer with auto-updater
- Code signed for Windows SmartScreen

### Linux

- AppImage for universal compatibility
- Auto-updater with GitHub releases

## 🔒 Security

- **Sandboxed**: Electron security best practices
- **Code Signing**: All distributions are signed
- **No Remote Code**: All code is bundled and verified
- **Local Processing**: AI inference stays on your device

## 🤝 Contributing

This is part of the [Pantheon](https://github.com/szaneer/Pantheon) ecosystem. Please refer to the main repository for contribution guidelines.

## 📄 License

MIT License - see [LICENSE](../../LICENSE) for details.