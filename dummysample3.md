---
title: Syncfusion Cody - Complete Documentation Summary
description: A comprehensive summary of all documentation files for Syncfusion Cody IDE, including features, installation, configuration, and release notes.
platform: syncfusion-cody
documentation: Reference
keywords: cody, IDE, AI, developer-tools, syncfusion, code-assistance, productivity, summary
---

# Syncfusion Cody Documentation Summary

## Repository Overview

This repository contains the official documentation for **Syncfusion Cody**, a next-generation AI-powered Integrated Development Environment (IDE) designed to enhance developer productivity. Cody combines artificial intelligence with comprehensive development tools to help developers write better code faster.

### Key Highlights

- **AI-Powered IDE**: Deeply integrated with Syncfusion's component library
- **Multiple Modes**: Autocomplete, Chat, Edit, and Agent modes
- **Context-Aware**: Understands your codebase and provides intelligent suggestions
- **Highly Configurable**: YAML-based configuration system for customization

---

## Core Features

### 1. **Autocomplete Mode**
- Real-time, inline code suggestions as you type
- Context-aware completions based on your project
- Keyboard shortcuts:
  - **Tab**: Accept full suggestion
  - **Esc**: Reject suggestion
  - **Cmd/Ctrl + →**: Accept suggestion word-by-word

### 2. **Chat Mode**
- Natural language interaction with AI assistant
- Real-time code suggestions and explanations
- Code selection shortcut: `Command+L (Mac)` or `Control+L (Windows/Linux)`
- Get AI help for specific code segments

### 3. **Edit Mode**
- Targeted changes to your codebase with AI assistance
- Highlight code and press `Command+I (Mac)` or `Control+I (Windows)`
- Review and accept or reject changes individually
- Accept All / Reject All options available

### 4. **Agent Mode**
- Autonomous AI assistant that explores your code independently
- Workflow:
  1. Understand Request - Analyzes your prompt and codebase
  2. Explore Codebase - Searches for relevant files
  3. Plan Changes - Breaks tasks into clear steps
  4. Execute Changes - Applies edits and runs commands
  5. Verify Results - Checks and fixes issues
  6. Task Complete - Summarizes changes and completes task
- Permission-based tool access for safety

---

## Installation

### macOS Requirements
- **OS**: macOS 11 (Big Sur) or later
- **Processor**: Apple Silicon (M1/M2) minimum
- **RAM**: 8GB minimum, 16GB recommended
- **Disk Space**: 2GB available
- **Connection**: Required for installer download and updates

### Windows Requirements
- **OS**: Windows 10 or later
- **Processor**: Intel Core i5 or equivalent
- **RAM**: 8GB minimum, 16GB recommended
- **Disk Space**: 2GB available
- **Connection**: Required for installer download and updates

### Installation Steps (General)
1. Visit [Syncfusion Cody](https://syncfusioncody.com)
2. Download the installer for your OS
3. Follow on-screen installation wizard
4. Launch the IDE
5. Configure AI model through Chat Settings
6. Select provider, model, and add API key
7. Start using Cody

---

## Configuration System

### config.yaml Structure

The configuration uses a YAML file with the following top-level properties:

| Property | Required | Description |
|----------|----------|-------------|
| `name` | Yes | Specifies the name of the configuration |
| `version` | Yes | Version of your configuration |
| `schema` | Yes | Schema version for config.yaml (e.g., v1) |
| `models` | No | Defines the language models used |
| `context` | No | Defines context providers |
| `rules` | No | List of rules for LLM behavior |
| `prompts` | No | List of custom prompts |
| `docs` | No | List of documentation sites to index |
| `mcpServers` | No | MCP server configuration |

### Configuration Sections

#### Models Section
- **Name**: Unique identifier for the model
- **Provider**: e.g., openai, ollama
- **Model**: e.g., gpt-4, starcoder
- **Roles**: chat, autocomplete, embed, rerank, edit, apply
- **Capabilities**: tool_use, image_input
- **Completion Options**: temperature, topP, topK, stop tokens, reasoning

#### Context Providers
Supported providers include:
- file
- code
- codebase
- docs
- diff
- http
- folder
- terminal
- problems
- helpbot

Each provider can have custom parameters and names.

#### Custom Rules
- Simple text rules or structured objects
- Can be applied globally or to specific file patterns (globs)
- Examples: coding standards, testing patterns, documentation requirements

#### Custom Prompts
- Named prompts with descriptions
- Invocable from the chat window
- Support for multi-line prompt text
- Examples: code checking, documentation generation

#### Documentation Sources
- Index external documentation
- Crawlable web-based docs
- Customizable crawl depth (default: 4)
- Optional favicon configuration

#### MCP Servers
- Model Context Protocol server integration
- Supports command-based server startup
- Configurable arguments and environment variables
- Connection timeout settings

---

## Release Notes - v1.0.1

### Features Introduced

1. **Chat Mode** - Natural language interaction for code suggestions
2. **Agent Mode** - Autonomous code analysis and execution
3. **Edit Mode** - Targeted AI-assisted code changes
4. **Autocomplete** - Intelligent inline completions
5. **Tool Integration** - Seamless IDE integration
6. **Reusable Prompts** - Custom prompt templates
7. **Custom Rules & Flow** - Define coding standards and workflows
8. **Syncfusion UI Builder** - AI-powered UI generation
9. **Multi Model Support** - Switch between different AI models
10. **Codebase Search** - Instant codebase navigation
11. **MCP Server Integration** - Pull data from anywhere
12. **Bug Fixes & Performance** - Enhanced stability and reliability

---

## File Structure

```
/home/user/syncfusion-code-studio-docs/
├── README.md
├── syncfusion-cody.html
├── syncfusion-cody/
│   ├── Welcome-to-Cody.md
│   ├── features/
│   │   ├── Agent.md
│   │   ├── Autocomplete.md
│   │   ├── Chat.md
│   │   ├── Edit.md
│   │   └── Feature_Images/
│   ├── get-started/
│   │   ├── Mac.md
│   │   ├── Windows.md
│   │   └── getting_started_image/
│   ├── reference/
│   │   ├── Configure-the-Cody.md
│   │   └── configure-properties/
│   │       ├── context.md
│   │       ├── docs.md
│   │       ├── mcpServers.md
│   │       ├── models.md
│   │       ├── prompts.md
│   │       └── rules.md
│   └── release-notes/
│       └── v0.1.0.md
```

---

## Configuration Example

```yaml
name: Local Assistant
version: 1.0.0
schema: v1

models:
  - name: GPT-4o
    provider: openai
    model: gpt-4o
    roles:
      - chat
      - edit
      - apply
    defaultCompletionOptions:
      temperature: 0.7
      maxTokens: 2048

context:
  - provider: file
  - provider: code
  - provider: codebase
    params:
      nFinal: 10
  - provider: docs
  - provider: diff
  - provider: terminal

rules:
  - Always annotate Python functions with parameter and return types
  - name: TypeScript best practices
    rule: Use TypeScript interfaces for object shapes
    globs: "**/*.{ts,tsx}"

prompts:
  - name: check
    description: Check for mistakes in code
    prompt: |
      Please check the highlighted code for:
      - Syntax errors
      - Logic errors
      - Security vulnerabilities

docs:
  - name: Syncfusion PDF
    startUrl: https://help.syncfusion.com/file-formats/pdf/working-with-document

mcpServers:
  - name: My MCP Server
    command: uvx
    args:
      - mcp-server-sqlite
      - --db-path
      - /Users/NAME/test.db
```

---

## Getting Started Workflow

1. **Install Cody** from the official website for your OS
2. **Launch the IDE** and view the Welcome Page
3. **Open Chat** to start interacting with Cody
4. **Add a Chat Model**:
   - Select provider (OpenAI, Ollama, etc.)
   - Choose model (GPT-4, Claude, etc.)
   - Enter API key
5. **Configure** (optional) - Click gear icon to customize via config.yaml
6. **Start Using Cody**:
   - Use Autocomplete as you type
   - Ask questions in Chat mode
   - Select code and press keyboard shortcuts for Edit/Chat assistance
   - Switch to Agent mode for autonomous task execution

---

## Key Takeaways

- **Syncfusion Cody** is a powerful AI IDE that enhances productivity across Windows and macOS
- Features multiple modes for different use cases (Chat, Edit, Agent, Autocomplete)
- Highly configurable through YAML-based configuration system
- Integrates with popular AI models and services
- Supports advanced features like custom rules, prompts, and MCP servers
- Perfect for developers using Syncfusion's component library
- Seamless IDE integration for smooth development workflows

---

## Additional Resources

- **Official Website**: https://syncfusioncody.com
- **Configuration Guide**: See `Configure-the-Cody.md` for detailed config.yaml documentation
- **Platform**: Windows 10+ and macOS 11+
- **System Requirements**: 8GB RAM minimum, 2GB disk space

This documentation provides a comprehensive guide for installing, configuring, and using Syncfusion Cody to maximize developer productivity through AI-powered code assistance.
