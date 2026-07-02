# Syncfusion Cody - Complete Demo Guide

![Cody Banner](syncfusion-cody.html)

**Your AI-Powered Coding Assistant — Write, Edit, and Understand Code Faster Than Ever.**

---

## Table of Contents

1. [Introduction](#introduction)
2. [Getting Started](#getting-started)
   - [Windows Installation](#windows-installation)
   - [Mac Installation](#mac-installation)
3. [Features](#features)
   - [Agent Mode](#agent-mode)
   - [Chat](#chat)
   - [Edit](#edit)
   - [Autocomplete](#autocomplete)
4. [Configuration](#configuration)
   - [Accessing Configuration](#accessing-configuration)
   - [Context Settings](#context-configuration)
   - [Models Settings](#models-configuration)
   - [Prompts Settings](#prompts-configuration)
   - [Rules Settings](#rules-configuration)
   - [MCP Servers Settings](#mcp-servers-configuration)
   - [Docs Settings](#docs-configuration)
5. [Release Notes](#release-notes)
6. [Feedback & Support](#feedback--support)

---

## Introduction

Syncfusion Cody is an AI-powered coding assistant that helps developers write, edit, and understand code faster. It integrates seamlessly into your development workflow, providing intelligent suggestions, automated code edits, and contextual answers to your coding questions.

### Key Features at a Glance

| Feature | Description |
|---------|-------------|
| 🤖 **Agent Mode** | Automate complex coding tasks with AI agents that understand your codebase |
| 💬 **Chat** | Ask questions about your code and get instant, contextual answers |
| ✏️ **Edit** | Make precise code edits using natural language instructions |
| ⚡ **Autocomplete** | Get intelligent code suggestions as you type |

### Why Syncfusion Cody?

Syncfusion Cody is designed to enhance developer productivity by combining the power of AI with deep code understanding. Whether you are writing new code, debugging existing code, or learning a new codebase, Cody provides the tools you need to be more effective.

---

## Getting Started

### Windows Installation

This guide will walk you through installing and setting up Syncfusion Cody on Windows.

#### Prerequisites

- Windows 10 or later
- Visual Studio Code installed
- An active Syncfusion Cody account

#### Installation Steps

**Step 1: Download the Extension**

Download the Syncfusion Cody extension from the [Visual Studio Code Marketplace](https://marketplace.visualstudio.com/items?itemName=Syncfusion.syncfusion-cody) or search for "Syncfusion Cody" directly in the VS Code Extensions view.

**Step 2: Install the Extension**

1. Open Visual Studio Code
2. Navigate to the Extensions view (`Ctrl+Shift+X`)
3. Search for "Syncfusion Cody"
4. Click **Install**

![Install Extension](syncfusion-cody/get-started/getting_started_image/install.png)

**Step 3: Sign In**

Sign in with your Syncfusion account to activate Cody.

1. Click **Connect** in the Cody sidebar

   ![Connect](syncfusion-cody/get-started/getting_started_image/Connect.png)

2. Sign in with your Syncfusion account credentials

3. Accept the agreement

   ![Agreement](syncfusion-cody/get-started/getting_started_image/agreement.png)

4. Allow the application access

   ![Allow Application](syncfusion-cody/get-started/getting_started_image/application_yes.png)

**Step 4: Choose Your Model**

After signing in, select the AI model you want to use.

1. Click on the model selector in the Cody sidebar
2. Choose from the available models

   ![Select Model](syncfusion-cody/get-started/getting_started_image/Select_model.png)

**Step 5: Add Chat Model**

You can add additional chat models to use with Cody.

1. Click **Add Chat Model**

   ![Add Chat Model](syncfusion-cody/get-started/getting_started_image/Add_chat_model.png)

2. Select a provider

   ![Select Provider](syncfusion-cody/get-started/getting_started_image/Select_provider.png)

3. Choose a model from the list

   ![Choose Model](syncfusion-cody/get-started/getting_started_image/List_model.png)

**Step 6: Start Using Cody**

You're all set! Open a project folder and start using Cody's features:

1. Open a folder from the VS Code menu

   ![Open Folder](syncfusion-cody/get-started/getting_started_image/Menu_folder.png)

2. Choose the destination folder

   ![Destination Folder](syncfusion-cody/get-started/getting_started_image/Destination.png)

3. Open the chat window and start chatting

   ![Chat Window](syncfusion-cody/get-started/getting_started_image/Chat_window.png)

4. Explore additional tasks

   ![Additional Tasks](syncfusion-cody/get-started/getting_started_image/Additional_task.png)

**Step 7: Finish Setup**

Complete the setup process and start coding with Cody!

![Finish Setup](syncfusion-cody/get-started/getting_started_image/Finish.png)

---

### Mac Installation

This guide will walk you through installing and setting up Syncfusion Cody on macOS.

#### Prerequisites

- macOS 10.15 (Catalina) or later
- Visual Studio Code installed
- An active Syncfusion Cody account

#### Installation Steps

**Step 1: Download the Extension**

Download the Syncfusion Cody extension from the [Visual Studio Code Marketplace](https://marketplace.visualstudio.com/items?itemName=Syncfusion.syncfusion-cody) or search for "Syncfusion Cody" directly in the VS Code Extensions view.

**Step 2: Install the Extension**

1. Open Visual Studio Code
2. Navigate to the Extensions view (`Cmd+Shift+X`)
3. Search for "Syncfusion Cody"
4. Click **Install**

![Install Extension](syncfusion-cody/get-started/getting_started_image/install.png)

**Step 3: Open Cody**

Once installed, the Cody icon will appear in the VS Code sidebar. Click it to open Cody.

**Step 4: Sign In**

Sign in with your Syncfusion account to activate Cody.

1. Click **Connect** in the Cody sidebar

   ![Connect](syncfusion-cody/get-started/getting_started_image/Connect.png)

2. Sign in with your Syncfusion account credentials

**Step 5: Choose Your Model**

After signing in, select the AI model you want to use.

1. Click on the model selector in the Cody sidebar
2. Choose from the available models

   ![Select Model](syncfusion-cody/get-started/getting_started_image/Select_model.png)

**Step 6: Start Using Cody**

You're all set! Start using Cody's features:

- **Chat**: Ask questions about your code
- **Edit**: Make precise code edits with natural language
- **Autocomplete**: Get intelligent code suggestions as you type
- **Agent**: Automate complex tasks with AI agents

![Welcome Page](syncfusion-cody/get-started/getting_started_image/welcome_page.png)

---

## Features

### Agent Mode

Agent Mode in Syncfusion Cody allows you to automate complex coding tasks using AI agents. These agents can understand your codebase, execute multi-step operations, and produce results with minimal manual intervention.

#### Overview

Agent Mode goes beyond simple code suggestions. It enables AI agents to:

- Analyze your entire codebase for context
- Plan and execute multi-step coding tasks
- Create, modify, and delete files as needed
- Run terminal commands with your permission
- Provide explanations for the changes made

#### How to Use Agent Mode

1. Open the Cody sidebar in your IDE
2. Select **Agent** from the mode selector
3. Describe the task you want the agent to perform
4. The agent will analyze your codebase and create a plan
5. Review the agent's plan and approve or modify it
6. The agent will execute the plan step by step

![Agent Mode](syncfusion-cody/features/Feature_Images/agent.png)

#### Agent Permissions

When the agent needs to perform actions that affect your system (such as running terminal commands or creating files), it will ask for your permission. You can configure permission levels in the Cody settings.

![Agent Permissions](syncfusion-cody/features/Feature_Images/agent_permission.png)

#### Agent Response

After completing the task, the agent will provide a summary of the changes made and any relevant information about the results.

![Agent Response](syncfusion-cody/features/Feature_Images/agent_response.png)

#### Best Practices

| Practice | Description |
|----------|-------------|
| **Be specific** | Clearly describe the task you want the agent to perform |
| **Review plans** | Always review the agent's plan before approving execution |
| **Start small** | Begin with smaller tasks to understand the agent's capabilities |
| **Use permissions wisely** | Configure permission levels that balance convenience and security |

---

### Chat

The Chat feature in Syncfusion Cody allows you to ask questions about your code and get instant, contextual answers. It is your AI pair programmer that understands your codebase.

#### Overview

Cody's Chat feature provides a conversational interface for interacting with an AI that understands your codebase. You can:

- Ask questions about how code works
- Request explanations for complex logic
- Get suggestions for code improvements
- Debug issues by describing symptoms
- Learn about APIs and libraries used in your project

#### How to Use Chat

1. Open the Cody sidebar in your IDE
2. Select **Chat** from the mode selector
3. Type your question or request in the chat input
4. Cody will analyze your codebase and provide a contextual response

![Chat Interface](syncfusion-cody/features/Feature_Images/chat.png)

#### Code Selection

You can select code in your editor and use it as context for your chat messages. This helps Cody provide more targeted and relevant answers.

![Code Selection](syncfusion-cody/features/Feature_Images/code_selection.png)

#### Chat Commands

Cody Chat supports several built-in commands:

| Command | Description |
|---------|-------------|
| `/explain` | Explain the selected code |
| `/test` | Generate unit tests for the selected code |
| `/smell` | Detect code smells in the selected code |
| `/doc` | Generate documentation for the selected code |

#### Best Practices

- **Be specific**: Ask focused questions for better answers
- **Select relevant code**: Use code selection to provide context
- **Iterate**: If the first answer isn't perfect, ask follow-up questions
- **Use commands**: Leverage built-in commands for common tasks

---

### Edit

The Edit feature in Syncfusion Cody allows you to make precise code edits using natural language instructions. Instead of manually finding and modifying code, you can describe the changes you want in plain English.

#### Overview

Cody's Edit feature bridges the gap between natural language and code. You can:

- Describe changes in plain English and have them applied to your code
- Make targeted edits without navigating through files manually
- Apply consistent changes across multiple locations
- Undo and redo edits with full version control support

#### How to Use Edit

1. Open the Cody sidebar in your IDE
2. Select **Edit** from the mode selector
3. Select the code you want to edit (or position your cursor in the file)
4. Describe the edit you want to make in natural language
5. Cody will generate the edit and show you a diff preview

![Edit Interface](syncfusion-cody/features/Feature_Images/Edit_img.png)

#### Accepting and Rejecting Edits

After Cody generates an edit, you can:

- **Accept** the edit to apply the changes to your code

  ![Accept Edit](syncfusion-cody/features/Feature_Images/Edit_accept.png)

- **Reject** the edit to discard the changes

  ![Reject Edit](syncfusion-cody/features/Feature_Images/Edit_reject.png)

#### Best Practices

| Practice | Description |
|----------|-------------|
| **Be specific about the change** | Clearly describe what you want to change and how |
| **Select relevant code** | Selecting code before editing provides better context |
| **Review edits carefully** | Always review the diff before accepting |
| **Use version control** | Keep your code under version control for easy rollback |

---

### Autocomplete

Autocomplete in Syncfusion Cody provides intelligent code suggestions as you type, helping you write code faster and with fewer errors.

#### Overview

Cody's Autocomplete feature uses AI to understand the context of your code and provide relevant suggestions. It goes beyond traditional autocomplete by:

- Understanding the intent behind your code
- Suggesting entire functions or code blocks, not just single tokens
- Adapting to your coding style and project conventions
- Supporting multiple programming languages

#### How to Use Autocomplete

**Step 1: Start Typing**

Begin typing in your editor as you normally would. Cody will automatically detect when suggestions are available.

![Start Typing](syncfusion-cody/features/Feature_Images/Autocomplete_step-1.png)

**Step 2: Review Suggestions**

Cody will display suggestions in a ghost-text format (grayed-out text inline). Review the suggestion to see if it matches your intent.

![Review Suggestions](syncfusion-cody/features/Feature_Images/Autocomplete_step-2.png)

**Step 3: Accept or Reject**

- **Accept** the suggestion by pressing `Tab` or the configured accept key
- **Reject** the suggestion by continuing to type or pressing `Esc`
- **Partially accept** by pressing `Ctrl+→` (or `Cmd+→` on Mac) to accept word by word

![Accept or Reject](syncfusion-cody/features/Feature_Images/Autocomplete_step-3.png)

**Step 4: Alternative Suggestions**

If the first suggestion isn't quite right, you can cycle through alternative suggestions using `Alt+]` (next) and `Alt+[` (previous).

![Alternative Suggestions](syncfusion-cody/features/Feature_Images/Autocomplete_step-4.png)

#### Keyboard Shortcuts

| Action | Windows/Linux | macOS |
|--------|---------------|-------|
| Accept suggestion | `Tab` | `Tab` |
| Reject suggestion | `Esc` | `Esc` |
| Next suggestion | `Alt+]` | `Opt+]` |
| Previous suggestion | `Alt+[` | `Opt+[` |
| Partial accept (word) | `Ctrl+→` | `Cmd+→` |

#### Configuration Options

You can configure Autocomplete behavior in the Cody settings:

- **Enable/disable autocomplete** — Turn autocomplete on or off
- **Provider** — Choose the AI model used for suggestions
- **Delay** — Set a delay before suggestions appear (useful for reducing API usage)

#### Best Practices

- **Keep functions focused**: Autocomplete works best when functions have a single, clear purpose
- **Write clear comments**: Comments help the AI understand your intent and provide better suggestions
- **Use type annotations**: Type hints help the AI generate more accurate suggestions
- **Review before accepting**: Always review AI-generated suggestions before accepting them

---

## Configuration

Syncfusion Cody can be customized to fit your development workflow through its configuration settings.

### Accessing Configuration

To access the Cody configuration:

1. Open the Cody sidebar in your IDE
2. Click on the settings/gear icon
3. Select **Configuration**

![Configure Cody](syncfusion-cody/reference/reference_images/config_cody.png)

### Configuration Overview

| Property | Description |
|----------|-------------|
| [Context](#context-configuration) | Configure context sources for code understanding |
| [Models](#models-configuration) | Configure AI models for different features |
| [Prompts](#prompts-configuration) | Configure custom prompts |
| [Rules](#rules-configuration) | Configure coding rules and constraints |
| [MCP Servers](#mcp-servers-configuration) | Configure Model Context Protocol servers |
| [Docs](#docs-configuration) | Configure documentation sources |

Cody's configuration is stored in a `.cody/settings.json` file in your project root. You can edit this file directly for advanced configuration.

---

### Context Configuration

The Context configuration determines what code and files Cody uses to understand your project and provide relevant suggestions.

#### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `context.experimental.chat` | boolean | `true` | Enable experimental chat context features |
| `context.experimental.editor` | boolean | `true` | Enable experimental editor context features |

#### Usage

```json
{
  "context": {
    "experimental": {
      "chat": true,
      "editor": true
    }
  }
}
```

---

### Models Configuration

The Models configuration allows you to specify the AI models used by different Cody features.

#### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `models.chat` | string[] | `[]` | A list of models available for the Chat feature |
| `models.edit` | string[] | `[]` | A list of models available for the Edit feature |
| `models.autocomplete` | string[] | `[]` | A list of models available for the Autocomplete feature |
| `models.agent` | string[] | `[]` | A list of models available for the Agent feature |

#### Usage

```json
{
  "models": {
    "chat": ["claude-3.5-sonnet", "gpt-4o"],
    "edit": ["claude-3.5-sonnet"],
    "autocomplete": ["starcoder-2"],
    "agent": ["claude-3.5-sonnet", "gpt-4o"]
  }
}
```

---

### Prompts Configuration

The Prompts configuration allows you to define custom prompts that Cody can use when generating code and responses.

#### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `prompts` | array | `[]` | An array of custom prompt objects |

#### Prompt Object Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `name` | string | Yes | The name of the prompt (used as a command in chat) |
| `description` | string | No | A description of what the prompt does |
| `prompt` | string | Yes | The prompt text to send to the AI |

#### Usage

```json
{
  "prompts": [
    {
      "name": "refactor",
      "description": "Refactor the selected code for better readability and performance",
      "prompt": "Refactor the following code for better readability and performance. Maintain the same functionality but improve naming, structure, and efficiency: {{code}}"
    },
    {
      "name": "unittest",
      "description": "Generate unit tests for the selected code",
      "prompt": "Write comprehensive unit tests for the following code using the project's testing framework: {{code}}"
    }
  ]
}
```

---

### Rules Configuration

The Rules configuration allows you to define coding rules and constraints that Cody should follow when generating or editing code.

#### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `rules` | string[] | `[]` | An array of rule strings that Cody should follow |

#### Usage

```json
{
  "rules": [
    "Always use TypeScript instead of JavaScript",
    "Use functional components in React",
    "Follow the project's ESLint configuration",
    "Always add error handling for async operations",
    "Prefer const over let"
  ]
}
```

#### Rule Guidelines

| Guideline | Description |
|-----------|-------------|
| **Be specific** | Specific rules are more effective than vague ones |
| **Keep rules concise** | Shorter rules are easier for the AI to follow |
| **Focus on conventions** | Rules work best for project conventions and coding standards |
| **Avoid contradictions** | Ensure rules don't conflict with each other |

---

### MCP Servers Configuration

The MCP (Model Context Protocol) Servers configuration allows you to connect Cody to external tools and services through the Model Context Protocol.

#### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `mcpServers` | object | `{}` | Configuration for MCP servers. Each key is a server name, and the value is an object with `command`, `args`, and `env` properties. |

#### Server Configuration Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `command` | string | Yes | The command to start the MCP server |
| `args` | string[] | No | Arguments to pass to the server command |
| `env` | object | No | Environment variables to set for the server process |

#### Usage

```json
{
  "mcpServers": {
    "my-server": {
      "command": "node",
      "args": ["path/to/server.js"],
      "env": {
        "API_KEY": "your-api-key"
      }
    }
  }
}
```

---

### Docs Configuration

The Docs configuration allows you to specify documentation sources that Cody can reference when providing answers and suggestions.

#### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `docs.urls` | string[] | `[]` | An array of URLs to documentation sites that Cody should reference |

#### Usage

```json
{
  "docs": {
    "urls": [
      "https://docs.syncfusion.com",
      "https://developer.mozilla.org"
    ]
  }
}
```

---

## Release Notes

### v0.1.0

#### New Features

| Feature | Description |
|---------|-------------|
| **Agent Mode** | Introduced AI agents that can automate complex coding tasks, analyze codebases, and execute multi-step operations |
| **Chat** | Added conversational AI interface for asking questions about your code and getting contextual answers |
| **Edit** | Added the ability to make precise code edits using natural language instructions |
| **Autocomplete** | Implemented intelligent code suggestions that appear as you type |

#### Improvements

- Initial release of Syncfusion Cody
- Seamless integration with Visual Studio Code
- Support for multiple AI models
- Configurable settings for customization

#### Known Issues

| Issue | Description |
|-------|-------------|
| Autocomplete relevance | Autocomplete may occasionally provide irrelevant suggestions for very large files |
| Agent Mode complexity | Agent Mode may require multiple attempts for highly complex tasks |
| Chat performance | Chat responses may be slow for very large codebases |

---

## Feedback & Support

We'd love to hear your feedback! Please report issues or suggestions at [support@syncfusion.com](mailto:support@syncfusion.com).

### Quick Links

- **Official Website**: [https://syncfusion.com/cody](https://syncfusion.com/cody)
- **VS Code Marketplace**: [Syncfusion Cody Extension](https://marketplace.visualstudio.com/items?itemName=Syncfusion.syncfusion-cody)
- **Documentation**: [https://docs.syncfusion.com/cody](https://docs.syncfusion.com/cody)

---

<div align="center">

**[Get Started with Cody Today →](https://syncfusion.com/cody)**

*Syncfusion Cody — Your AI-Powered Coding Assistant*

</div>
