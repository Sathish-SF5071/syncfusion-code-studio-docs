# 🚀 Syncfusion Cody - New Engineer Onboarding Guide

**Last Updated**: 2024  
**Audience**: New team members joining Syncfusion Cody development  
**Estimated Read Time**: 30 minutes

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Business Workflow](#business-workflow)
3. [Folder Structure](#folder-structure)
4. [Key Modules & Components](#key-modules--components)
5. [API & Integration Points](#api--integration-points)
6. [Configuration Schema](#configuration-schema)
7. [Deployment Process](#deployment-process)
8. [Development Environment Setup](#development-environment-setup)
9. [Common Troubleshooting](#common-troubleshooting)
10. [Development Workflow](#development-workflow)
11. [System Architecture Diagram](#system-architecture-diagram)

---

## Project Overview

### What is Syncfusion Cody?

**Syncfusion Cody** is a next-generation AI-powered Integrated Development Environment (IDE) extension designed to supercharge developer productivity. It seamlessly integrates with IDEs to provide intelligent code assistance, autonomous task execution, and deep integration with Syncfusion's rich component library.

### Core Purpose

Enable developers to:
- ✅ Write code faster with AI-powered suggestions
- ✅ Debug and fix issues autonomously
- ✅ Generate UI components integrated with Syncfusion components
- ✅ Automate repetitive development tasks
- ✅ Get context-aware coding assistance

### Key Statistics

- **4 Primary Modes**: Chat, Edit, Agent, Autocomplete
- **10+ Context Providers**: File, Code, Codebase, Docs, Diff, HTTP, Folder, Terminal, Problems, Helpbot
- **Multi-Provider LLM Support**: OpenAI, Claude, Mistral, Ollama, and more
- **Configuration-Driven Architecture**: Entirely configurable via YAML
- **Enterprise-Ready**: Extensible through MCP (Model Context Protocol)

---

## Business Workflow

### End-User Workflows

#### Workflow 1: Interactive Code Assistance (Chat Mode)

```
Developer Writes Code
         ↓
Selects Code (Cmd+L / Ctrl+L)
         ↓
Opens Chat Interface
         ↓
Asks Question or Requests Change
         ↓
Cody Analyzes Code + Context
         ↓
Returns AI-Powered Response
         ↓
Developer Reviews and Applies Suggestion
```

**Business Value**: Reduces context-switching, accelerates learning, improves code quality

---

#### Workflow 2: Targeted Code Modifications (Edit Mode)

```
Developer Selects Code Section
         ↓
Presses Cmd+I / Ctrl+I
         ↓
Specifies Change Request
         ↓
Cody Generates Diff Preview
         ↓
Developer Reviews Each Change Inline
         ↓
Accept/Reject Individual or Batch Changes
         ↓
Modified Code Applied Automatically
```

**Business Value**: Safe code modifications with human-in-the-loop validation

---

#### Workflow 3: Autonomous Task Execution (Agent Mode)

```
Developer Submits Complex Task
  (e.g., "Add authentication to login screen")
         ↓
Agent Understands Request
         ↓
Explores Codebase (File Search + Dependencies)
         ↓
Plans Multi-Step Changes
         ↓
Requests Permission for Each Tool Use
         ↓
Executes: Edits → File Creation → Terminal Commands
         ↓
Verifies Results & Fixes Errors
         ↓
Summarizes Changes + Hands Back Control
```

**Business Value**: Completes multi-file, complex tasks in minutes vs. hours

---

#### Workflow 4: Real-Time Code Completion (Autocomplete Mode)

```
Developer Types Code
         ↓
Inline Suggestions Appear
         ↓
Press Tab → Accept Full Suggestion
OR
Press Esc → Reject Suggestion
OR
Press Cmd/Ctrl+→ → Accept Word-by-Word
```

**Business Value**: Reduces typing, accelerates development velocity

---

### Internal Data Flow

```
┌─────────────────────────────────────────────────────────────┐
│                    User Interaction                         │
│  (Chat / Edit / Agent / Autocomplete Initiated)             │
└──────────────────────┬──────────────────────────────────────┘
                       │
        ┌──────────────▼──────────────┐
        │  Configuration Loader       │
        │  (Loads config.yaml)        │
        └──────────────┬──────────────┘
                       │
        ┌──────────────▼──────────────────────────────────┐
        │  Context Aggregation Layer                      │
        │  • File context                                 │
        │  • Code snippets                                │
        │  • Codebase semantic search                     │
        │  • Documentation index                          │
        │  • Git diff                                     │
        │  • Terminal output                              │
        └──────────────┬──────────────────────────────────┘
                       │
        ┌──────────────▼──────────────────────────────────┐
        │  Rules Engine                                   │
        │  (Apply behavioral constraints)                 │
        └──────────────┬──────────────────────────────────┘
                       │
        ┌──────────────▼──────────────────────────────────┐
        │  Prompt Composition                             │
        │  Model + Context + Rules → Final Prompt         │
        └──────────────┬──────────────────────────────────┘
                       │
        ┌──────────────▼──────────────────────────────────┐
        │  Model Selection & Dispatch                     │
        │  (Route to appropriate LLM provider)            │
        │  - Chat mode → chat-role model                  │
        │  - Edit mode → edit-role model                  │
        │  - Autocomplete → autocomplete-role model       │
        │  - Agent → agent-role model                     │
        └──────────────┬──────────────────────────────────┘
                       │
        ┌──────────────▼──────────────────────────────────┐
        │  LLM Request Execution                          │
        │  (Call OpenAI / Claude / Mistral / Ollama...)   │
        └──────────────┬──────────────────────────────────┘
                       │
        ┌──────────────▼──────────────────────────────────┐
        │  Response Processing                            │
        │  • Parse LLM output                             │
        │  • Extract changes/suggestions                  │
        │  • Format for display                           │
        └──────────────┬──────────────────────────────────┘
                       │
        ┌──────────────▼──────────────────────────────────┐
        │  IDE Integration                                │
        │  • Render inline suggestions                    │
        │  • Apply changes to editor                      │
        │  • Show chat response                           │
        │  • Execute terminal commands                    │
        └──────────────┬──────────────────────────────────┘
                       │
        ┌──────────────▼──────────────────────────────────┐
        │  Developer Review & Action                      │
        │  • Accept / Reject                              │
        │  • Request follow-up                            │
        │  • Continue task                                │
        └──────────────────────────────────────────────────┘
```

---

## Folder Structure

### High-Level Directory Layout

```
syncfusion-code-studio-docs/
├── syncfusion-cody/                    # Main documentation directory
│   ├── Welcome-to-Cody.md             # Getting started guide
│   ├── features/                       # Feature-specific documentation
│   │   ├── Agent.md                   # Autonomous Agent Mode docs
│   │   ├── Autocomplete.md            # Real-time suggestions docs
│   │   ├── Chat.md                    # Chat Mode docs
│   │   ├── Edit.md                    # Edit Mode docs
│   │   └── Feature_Images/            # Screenshots & diagrams
│   ├── get-started/                    # Setup guides
│   │   ├── Mac.md                     # macOS installation
│   │   ├── Windows.md                 # Windows installation
│   │   └── Linux.md                   # Linux installation (if available)
│   ├── reference/                      # Configuration reference
│   │   ├── Configure-the-Cody.md      # Main configuration guide
│   │   └── configure-properties/      # Configuration schema docs
│   │       ├── context.md             # Context providers config
│   │       ├── docs.md                # Documentation indexing config
│   │       ├── mcpServers.md          # MCP servers config
│   │       ├── models.md              # Language models config
│   │       ├── prompts.md             # Custom prompts config
│   │       └── rules.md               # Rules engine config
│   └── release-notes/                  # Version history
│       └── v0.1.0.md                  # Latest release notes
├── architecture_analysis.json         # Machine-readable architecture
├── PRINCIPAL_ARCHITECTURE_REVIEW_2024.md  # Detailed architecture review
├── README.md                           # Repository overview
└── [Other documentation files]         # Historical analysis & reviews
```

### File Organization Philosophy

- **`features/`**: User-facing feature documentation
- **`get-started/`**: Platform-specific setup instructions
- **`reference/`**: Configuration schema and technical reference
- **`release-notes/`**: Version-specific changes and improvements

---

## Key Modules & Components

### 1. **Feature Modules** (User-Facing Modes)

#### A. Chat Mode
- **File**: `features/Chat.md`
- **Keyboard Shortcut**: `Cmd+L` (Mac) / `Ctrl+L` (Windows)
- **Purpose**: Natural language conversation with context awareness
- **Flow**:
  ```
  User Input → Model Selection → Context Gathering 
  → Rules Application → LLM Request → Response Display
  ```
- **Key Features**:
  - Multi-turn conversations
  - Code selection integration
  - Context-aware responses
  - Explanation of complex code logic

---

#### B. Edit Mode
- **File**: `features/Edit.md`
- **Keyboard Shortcut**: `Cmd+I` (Mac) / `Ctrl+I` (Windows)
- **Purpose**: Targeted code modifications with inline review
- **Flow**:
  ```
  Select Code → Specify Changes → Generate Diff 
  → Display Inline → Review & Accept/Reject Each Change
  ```
- **Safety Mechanism**: Individual review before applying changes
- **Key Features**:
  - Diff generation
  - Inline review interface
  - Batch apply operations
  - Undo capability

---

#### C. Agent Mode
- **File**: `features/Agent.md`
- **Purpose**: Autonomous multi-step task execution
- **6-Step Workflow**:
  1. **Understand Request** – Parse user intent
  2. **Explore Codebase** – File search and dependency analysis
  3. **Plan Changes** – Break into actionable steps
  4. **Execute Changes** – Apply edits with permission gates
  5. **Verify Results** – Test and fix errors
  6. **Task Complete** – Summarize changes
- **Safety**: Permission prompt before each tool use
- **Key Features**:
  - Autonomous exploration
  - Multi-file editing
  - Terminal command execution
  - Error recovery

---

#### D. Autocomplete Mode
- **File**: `features/Autocomplete.md`
- **Purpose**: Real-time inline code suggestions
- **Activation**: Requires `autocomplete` role in model configuration
- **Controls**:
  - `Tab` → Accept full suggestion
  - `Esc` → Reject suggestion
  - `Cmd/Ctrl+→` → Accept word-by-word
- **Key Features**:
  - Context-aware completions
  - Real-time generation
  - Configurable models

---

### 2. **Core Services** (System-Level Components)

#### A. Configuration System
- **File**: `reference/Configure-the-Cody.md`
- **Format**: YAML (config.yaml)
- **Purpose**: Single source of truth for all Cody behavior
- **Key Sections**:
  - `name` – Configuration identifier
  - `version` – Semantic version
  - `schema` – Schema version (e.g., "v1")
  - `models` – LLM configurations
  - `context` – Context provider definitions
  - `rules` – Behavioral constraints
  - `prompts` – Custom prompt templates
  - `docs` – Documentation indexing
  - `mcpServers` – MCP server connections

**Example Configuration**:
```yaml
name: Local Assistant
version: 1.0.0
schema: v1

models:
  - name: GPT-4o
    provider: openai
    model: gpt-4o
    roles: [chat, edit, apply]
    defaultCompletionOptions:
      temperature: 0.7
      maxTokens: 1500

context:
  - provider: file
  - provider: code
  - provider: codebase
    params:
      nFinal: 10

rules:
  - "Use TypeScript for all code"
  - name: "Test patterns"
    rule: "Use Jest for tests"
    globs: "**/*.test.ts"
```

---

#### B. Model Management Service
- **File**: `reference/configure-properties/models.md`
- **Purpose**: Multi-provider LLM orchestration
- **Supported Providers**:
  - OpenAI (GPT-4, GPT-4o)
  - Anthropic Claude (multiple versions)
  - Mistral (Codestral, etc.)
  - Ollama (local models)
  - Custom OpenAI-compatible endpoints
- **Role-Based Dispatch**:
  - `chat` – Chat Mode
  - `edit` – Edit Mode
  - `autocomplete` – Autocomplete Mode
  - `apply` – Change application
  - `embed` – Embeddings generation
  - `rerank` – Relevance ranking
- **Capabilities Override**:
  - `tool_use` – Enable MCP tool support
  - `image_input` – Enable vision capabilities

---

#### C. Context Provider System
- **File**: `reference/configure-properties/context.md`
- **Purpose**: Modular context aggregation
- **10+ Pluggable Providers**:
  1. **file** – Current file content
  2. **code** – Code snippets with line numbers
  3. **codebase** – Semantic search across repository
  4. **docs** – Indexed documentation
  5. **diff** – Git diff context
  6. **http** – HTTP endpoint context
  7. **folder** – Directory structure
  8. **terminal** – Terminal command output
  9. **problems** – Linter/diagnostic errors
  10. **helpbot** – Custom help system
- **Priority System**: Context prioritized by provider order
- **Configuration Example**:
  ```yaml
  context:
    - provider: file
    - provider: code
    - provider: codebase
      params:
        nFinal: 10  # Top-10 semantic matches
    - provider: docs
  ```

---

#### D. Rules Engine
- **File**: `reference/configure-properties/rules.md`
- **Purpose**: Define LLM behavioral constraints
- **Features**:
  - Simple text rules
  - Named rules with descriptions
  - Glob-based file matching for context-specific rules
- **Application**: Rules combined into system message for every request
- **Example**:
  ```yaml
  rules:
    - "Always use TypeScript interfaces"
    - name: "TypeScript best practices"
      rule: "Use interfaces over type aliases"
      globs: "**/*.{ts,tsx}"
    - name: "Test patterns"
      rule: "Use Jest describe/it"
      globs:
        - "src/**/*.test.ts"
        - "tests/**/*.ts"
  ```

---

#### E. Custom Prompts Service
- **File**: `reference/configure-properties/prompts.md`
- **Purpose**: User-defined prompt templates
- **Structure**:
  - `name` – Prompt identifier
  - `description` – UI display label
  - `prompt` – Template content
- **Invocation**: From chat window command palette
- **Use Cases**: Task automation, workflow customization

---

#### F. Documentation Indexing Service
- **File**: `reference/configure-properties/docs.md`
- **Purpose**: Web crawling and knowledge indexing
- **Features**:
  - Configurable crawl depth
  - Local-only crawling option
  - Multi-site support
  - Favicon configuration
- **Configuration Example**:
  ```yaml
  docs:
    - name: "Syncfusion Docs"
      startUrl: "https://help.syncfusion.com/"
      maxDepth: 4
      useLocalCrawling: false
  ```

---

#### G. MCP Server Integration
- **File**: `reference/configure-properties/mcpServers.md`
- **Purpose**: Model Context Protocol support for tools
- **Standard**: Anthropic's unified MCP protocol
- **Capabilities**:
  - Unified prompts
  - Shared context
  - Tool integration
- **Configuration Example**:
  ```yaml
  mcpServers:
    - name: "SQLite"
      command: "uvx"
      args:
        - "mcp-server-sqlite"
        - "--db-path"
        - "/path/to/db"
      env:
        DATABASE_URL: "sqlite:///data.db"
      connectionTimeout: 5000
  ```

---

#### H. IDE Integration Layer
- **Purpose**: Bridges Cody with the underlying IDE
- **Features**:
  - Code selection and manipulation
  - File search and operations
  - Terminal command execution
  - Permission management for autonomous operations
  - Inline UI rendering

---

#### I. UI Builder (Syncfusion Integration)
- **Purpose**: AI-powered UI generation with Syncfusion components
- **Scope**: Syncfusion-specific component integration
- **Feature**: Rapid UI development with component suggestions

---

## API & Integration Points

### 1. **Internal APIs** (Component-to-Component)

#### Configuration API
```
Load Configuration → config.yaml (YAML Schema v1)
                 ↓
         Parse & Validate
                 ↓
      Supply to All Components
```

#### Model Invocation API
```
Request(mode, userInput, context) 
  → ModelSelector(role) 
  → ContextAggregator(config.context) 
  → RulesEngine(config.rules) 
  → PromptComposer() 
  → LLMProvider(provider, model) 
  → Response
```

#### Context Provider API
```
ContextRequest(file, code, codebase, docs, diff, http, folder, terminal, problems, helpbot)
  → ContextProvider(type, params)
  → FormattedContext(string)
```

---

### 2. **External Integration Points**

#### LLM Provider APIs

**OpenAI**
- Endpoint: `https://api.openai.com/v1/chat/completions`
- Authentication: API Key (environment variable)
- Models: GPT-4, GPT-4o
- Documentation: https://openai.com/api/

**Anthropic Claude**
- Endpoint: `https://api.anthropic.com/v1/messages`
- Authentication: API Key (environment variable)
- Models: Claude 3 Opus, Claude 3 Sonnet, Claude 3 Haiku
- Documentation: https://docs.anthropic.com/

**Mistral**
- Endpoint: `https://api.mistral.ai/v1/chat/completions`
- Authentication: API Key (environment variable)
- Models: Mistral-7B, Mistral-Medium, Codestral
- Documentation: https://docs.mistral.ai/

**Ollama (Local)**
- Endpoint: `http://localhost:11434/api/generate`
- Models: Run locally (Llama 2, Mistral, etc.)
- Documentation: https://ollama.ai/

#### MCP Server Interface

**Protocol**: Model Context Protocol (Anthropic Standard)

**Structure**:
```json
{
  "name": "server-name",
  "version": "1.0.0",
  "capabilities": {
    "tools": [
      {
        "name": "tool-name",
        "description": "Tool description",
        "inputSchema": { ... }
      }
    ]
  }
}
```

#### IDE Integration Points

**Code Editor Events**:
- File open/close
- Code selection
- Text insertion
- Cursor position

**IDE Services Used**:
- File system access
- Terminal execution
- Diagnostic/linter integration
- Inline UI rendering

---

## Configuration Schema

### Complete YAML Schema (config.yaml)

```yaml
# Required Fields
name: string                          # Configuration name/identifier
version: string                       # Semantic version (e.g., 1.0.0)
schema: string                        # Schema version (currently "v1")

# Optional Fields
models:
  - name: string                      # Unique model identifier
    provider: string                  # openai | claude | mistral | ollama
    model: string                     # Model name (e.g., gpt-4o)
    apiBase: string                   # Optional: Override default API endpoint
    roles:                            # Optional: [chat, edit, autocomplete, apply, embed, rerank]
      - string
    capabilities:                     # Optional: [tool_use, image_input]
      - string
    embedOptions:                     # Optional: For embed role
      maxChunkSize: number            # Min: 128 tokens
      maxBatchSize: number            # Min: 1 chunk
    defaultCompletionOptions:         # Optional: Model behavior
      contextLength: number           # Max tokens
      maxTokens: number               # Generation limit
      temperature: number             # 0.0-1.0
      topP: number                    # Nucleus sampling
      topK: number                    # Token consideration
      stop: [string]                  # Stop tokens
      reasoning: boolean              # Claude 3.7+ thinking
      reasoningBudgetTokens: number   # Thinking budget

context:
  - provider: string                  # file | code | codebase | docs | diff | http | folder | terminal | problems | helpbot
    params: object                    # Provider-specific parameters
      # For codebase provider:
      nFinal: number                  # Number of semantic matches

rules:
  - string                            # Simple text rule
  - name: string                      # Named rule
    rule: string                      # Rule text
    description: string               # Optional description
    globs: [string] | string         # File glob patterns

prompts:
  - name: string                      # Prompt identifier
    description: string               # UI label
    prompt: string                    # Prompt template

docs:
  - name: string                      # Documentation source name
    startUrl: string                  # Root URL to crawl
    maxDepth: number                  # Crawl depth
    favicon: string                   # Optional: Favicon URL
    useLocalCrawling: boolean         # Only crawl locally

mcpServers:
  - name: string                      # MCP server identifier
    command: string                   # Executable command
    args: [string]                    # Command arguments
    env: object                       # Environment variables
    connectionTimeout: number         # Timeout in milliseconds
```

### Configuration Validation

- **Schema**: YAML v1.2
- **Required Fields**: `name`, `version`, `schema`
- **Validation**: Performed on startup
- **Error Handling**: Descriptive error messages with line numbers

---

## Deployment Process

### Pre-Deployment Checklist

- [ ] All configuration validated (config.yaml)
- [ ] API keys securely configured (environment variables, not hardcoded)
- [ ] LLM provider credentials verified
- [ ] MCP servers tested (if used)
- [ ] Documentation indexed and accessible
- [ ] Context providers functioning
- [ ] IDE integration tested on target platform

---

### Deployment Steps

#### Step 1: Environment Configuration

```bash
# Create .env file with API keys (NEVER commit this)
export OPENAI_API_KEY="sk-..."
export ANTHROPIC_API_KEY="sk-ant-..."
export MISTRAL_API_KEY="..."

# Or use environment-specific configuration
export CODY_CONFIG="/path/to/config.yaml"
```

#### Step 2: Validate Configuration

```bash
# Validate YAML schema
cody validate config.yaml

# Test LLM connectivity
cody test-models config.yaml

# Verify context providers
cody test-context config.yaml
```

#### Step 3: Deploy to IDE

**For VS Code**:
```bash
# Package extension
vsce package

# Install locally
code --install-extension syncfusion-cody-<version>.vsix
```

**For JetBrains IDEs**:
```bash
# Package plugin
./gradlew buildPlugin

# Install from File → Settings → Plugins → Install from Disk
```

#### Step 4: Post-Deployment Verification

1. Open IDE and verify Cody loads
2. Test Chat Mode (`Cmd+L` / `Ctrl+L`)
3. Test Edit Mode (`Cmd+I` / `Ctrl+I`)
4. Test Agent Mode on simple task
5. Test Autocomplete (if configured)
6. Verify configuration loads correctly

---

### Deployment Environments

#### Development
```yaml
name: "Cody Dev"
version: 0.1.0
schema: v1
models:
  - name: GPT-4o
    provider: openai
    model: gpt-4o
    roles: [chat, edit]
context:
  - provider: file
  - provider: code
```

#### Staging
```yaml
name: "Cody Staging"
version: 0.1.0
schema: v1
models:
  - name: GPT-4o Prod
    provider: openai
    model: gpt-4o
    roles: [chat, edit, apply]
  - name: Mistral Autocomplete
    provider: mistral
    model: codestral-latest
    roles: [autocomplete]
# Additional context & rules
```

#### Production
```yaml
name: "Cody Production"
version: 1.0.0
schema: v1
models:
  - name: GPT-4o
    provider: openai
    model: gpt-4o
    roles: [chat, edit, apply]
  - name: Claude Opus
    provider: anthropic
    model: claude-3-opus-20240229
    roles: [agent]
  - name: Codestral
    provider: mistral
    model: codestral-latest
    roles: [autocomplete, embed]
# Full context, comprehensive rules, all features enabled
```

---

## Development Environment Setup

### Prerequisites

- **Node.js**: v18+ (for build tooling)
- **IDE**: VS Code or JetBrains IDE
- **Git**: Latest version
- **Python**: v3.8+ (for optional local tools)

### Step-by-Step Setup

#### 1. Clone Repository

```bash
git clone https://github.com/syncfusion/cody.git
cd cody
```

#### 2. Install Dependencies

```bash
# For Node.js projects
npm install
npm run setup

# Or if using yarn
yarn install
yarn setup
```

#### 3. Configure Local Environment

```bash
# Copy environment template
cp .env.example .env

# Add your API keys
# Edit .env and add:
# OPENAI_API_KEY=sk-...
# ANTHROPIC_API_KEY=sk-ant-...
```

#### 4. Create Local config.yaml

```bash
# Copy default configuration
cp config.example.yaml config.yaml

# Edit for local development
vim config.yaml
```

#### 5. Build and Test

```bash
# Build the project
npm run build

# Run tests
npm run test

# Lint and format
npm run lint
npm run format
```

#### 6. Run Development Server

```bash
# Start development IDE extension
npm run dev

# For VS Code, this launches extension in debug mode
# For JetBrains, run from IDE via Run → Edit Configurations
```

#### 7. Load Extension Locally

**VS Code**:
1. Press `F5` to start debugging
2. A new VS Code window opens with extension loaded
3. Open a code file and test with `Cmd+L` / `Ctrl+L`

**JetBrains**:
1. Go to `Run` → `Run 'Gradle [runIde]'`
2. IDE launches with plugin loaded
3. Test Cody features

---

## Common Troubleshooting

### Issue: "Configuration validation failed"

**Symptom**: Error on startup about YAML parsing

**Solutions**:
1. Check YAML syntax: https://www.yamllint.com/
2. Verify required fields: `name`, `version`, `schema`
3. Check file encoding (must be UTF-8)
4. Validate against schema: `cody validate config.yaml`

```yaml
# ✅ CORRECT
name: "My Config"
version: "1.0.0"
schema: "v1"

# ❌ INCORRECT (missing version)
name: "My Config"
schema: "v1"
```

---

### Issue: "API key not found" or authentication error

**Symptom**: Requests to LLM provider fail with 401/403

**Solutions**:
1. Check `.env` file has correct key:
   ```bash
   echo $OPENAI_API_KEY
   # Should output your API key
   ```
2. Verify key is valid at provider's dashboard
3. Ensure key is not expired
4. Check key has necessary permissions/scopes
5. For local Ollama, verify it's running: `curl http://localhost:11434/api/tags`

```bash
# Test OpenAI connectivity
curl https://api.openai.com/v1/models \
  -H "Authorization: Bearer $OPENAI_API_KEY"

# Test Ollama connectivity
curl http://localhost:11434/api/tags
```

---

### Issue: Context providers not working

**Symptom**: Chat/Edit modes don't have file or code context

**Solutions**:
1. Verify context providers in config:
   ```yaml
   context:
     - provider: file      # Make sure these exist
     - provider: code
   ```
2. Check file is open in editor
3. Verify code selection is valid
4. Clear cache: `rm -rf ~/.cody/cache`
5. Check IDE integration: File → Settings → Cody

---

### Issue: Autocomplete suggestions not appearing

**Symptom**: No inline suggestions while typing

**Solutions**:
1. Verify `autocomplete` role assigned to a model:
   ```yaml
   models:
     - name: Codestral
       roles: [autocomplete]  # Must include this
   ```
2. Check model is active and available
3. Type slowly - allow time for generation
4. Check IDE settings: disable competing autocomplete extensions
5. Restart IDE

---

### Issue: Agent mode hangs or doesn't respond

**Symptom**: Agent starts but never completes tasks

**Solutions**:
1. Check LLM model is responsive:
   ```bash
   curl https://api.openai.com/v1/models
   ```
2. Verify Agent has `agent` or `chat` role assigned:
   ```yaml
   models:
     - name: GPT-4o
       roles: [agent, chat]
   ```
3. Check token limits not too restrictive:
   ```yaml
   defaultCompletionOptions:
     maxTokens: 2000  # Should be at least 1000
   ```
4. Review Agent logs for errors
5. Try simpler task first

---

### Issue: Performance is slow

**Symptom**: Suggestions/responses take longer than expected

**Solutions**:
1. Check model complexity:
   - Fast: Mistral Codestral, Ollama local
   - Medium: GPT-3.5
   - Slow: GPT-4, Claude Opus
2. Reduce context size:
   ```yaml
   context:
     - provider: file
     # Remove expensive providers
   ```
3. Reduce codebase search results:
   ```yaml
   context:
     - provider: codebase
       params:
         nFinal: 5  # Reduce from 10
   ```
4. Check network latency to LLM provider
5. Monitor token usage and costs

---

### Issue: "Permission denied" when Agent tries to execute

**Symptom**: Agent asks for permission repeatedly or operation fails

**Solutions**:
1. Click "Continue" when permission prompt appears
2. Check IDE has file system access
3. Verify terminal command permissions:
   ```bash
   chmod +x script.sh
   ```
4. Check working directory permissions
5. For system commands, may need elevated privileges

---

## Development Workflow

### Branching Strategy

```
main (production stable)
 └── develop (integration branch)
      └── feat/feature-name (feature branches)
      └── fix/bug-name (bug fix branches)
      └── chore/cleanup (maintenance)
```

### Workflow: Implementing a Feature

#### 1. Create Feature Branch

```bash
git checkout develop
git pull origin develop
git checkout -b feat/your-feature-name
```

#### 2. Make Changes

- Edit configuration files in `reference/configure-properties/`
- Update feature documentation in `features/`
- Add tests if applicable
- Update release notes in `release-notes/`

```bash
# Track changes
git status

# Stage changes
git add syncfusion-cody/features/Chat.md

# Commit with clear message
git commit -m "feat: Add streaming support to Chat mode"
```

#### 3. Test Changes

```bash
# Run validation
npm run test

# Lint documentation
npm run lint:docs

# Build documentation
npm run build:docs
```

#### 4. Push and Create Pull Request

```bash
git push origin feat/your-feature-name

# Create PR at GitHub (title: "feat: description")
```

#### 5. Code Review and Merge

- Request review from team members
- Address feedback
- Merge to `develop` when approved
- Delete feature branch

### Git Workflow: Bug Fix

```bash
# 1. Create fix branch from develop
git checkout develop
git checkout -b fix/bug-description

# 2. Make changes and test
# ...

# 3. Commit fix
git commit -m "fix: Resolve Agent mode permission issue"

# 4. Push and create PR
git push origin fix/bug-description
```

### Commit Message Convention

```
<type>(<scope>): <subject>
<blank line>
<body>
<blank line>
<footer>

Types: feat, fix, docs, style, refactor, perf, test, chore
Scopes: chat, edit, agent, autocomplete, config, models, context
```

**Example**:
```
feat(agent): Add multi-turn task tracking

Implement memory system for Agent mode to track
multi-step tasks and maintain context across requests.

Closes #123
```

---

### Documentation Updates

When making code changes:

1. **Update relevant .md files**:
   - `features/*.md` – If user-facing behavior changes
   - `reference/configure-properties/*.md` – If configuration schema changes
   - `get-started/*.md` – If setup process changes

2. **Update config.example.yaml** if schema changes

3. **Update QUICK_START.md** if workflow changes

4. **Add to release-notes/v*.md**:
   ```markdown
   ## v0.2.0 (2024-XX-XX)
   
   ### Features
   - Agent Mode multi-turn task tracking (#123)
   
   ### Bug Fixes
   - Fixed permission prompt bug (#124)
   
   ### Documentation
   - Updated Agent Mode documentation
   ```

---

### Testing Guidelines

```bash
# Unit tests
npm run test:unit

# Integration tests
npm run test:integration

# Documentation tests (links, formatting)
npm run test:docs

# All tests
npm run test
```

### Code Quality Checks

```bash
# Lint
npm run lint

# Format
npm run format

# Type check
npm run type-check

# Security audit
npm run audit
```

---

## System Architecture Diagram

### Complete System Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        IDE INTERFACE LAYER                              │
│  (VS Code / JetBrains / Visual Studio / Other IDEs)                    │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │ Code Editor      │ File System  │ Terminal         │ Diagnostics │   │
│  │ Selection        │ Operations   │ Execution        │ Linter      │   │
│  └─────────────────────────────────────────────────────────────────┘   │
└──────────────────────────────┬──────────────────────────────────────────┘
                               │
                ┌──────────────▼──────────────┐
                │   CODY CORE ENGINE          │
                │  (Extension / Plugin)       │
                └──────────────┬──────────────┘
                               │
        ┌──────────────────────┼──────────────────────┐
        │                      │                      │
    ┌───▼───┐          ┌─────────────┐      ┌──────────────┐
    │ Chat  │          │ Edit Mode   │      │ Agent Mode   │
    │ Mode  │          │             │      │              │
    └───┬───┘          └──────┬──────┘      └──────┬───────┘
        │                     │                     │
        │   ┌─────────────────┴──────────────┐     │
        │   │  Autocomplete Mode             │     │
        │   └──────────┬─────────────────────┘     │
        │              │                           │
        └──────────────┼───────────────────────────┘
                       │
        ┌──────────────▼────────────────────────┐
        │  REQUEST PIPELINE                     │
        │                                       │
        │  1. Load config.yaml                  │
        │  2. Gather context (10+ providers)    │
        │  3. Apply rules                       │
        │  4. Compose prompt                    │
        │  5. Select model + role               │
        └──────────────┬────────────────────────┘
                       │
        ┌──────────────▼────────────────────────┐
        │  CONFIGURATION SYSTEM                 │
        │                                       │
        │  ┌────────────────────────────────┐   │
        │  │ config.yaml (YAML Schema v1)   │   │
        │  │                                │   │
        │  │ • models                       │   │
        │  │ • context providers            │   │
        │  │ • rules                        │   │
        │  │ • prompts                      │   │
        │  │ • docs indexing                │   │
        │  │ • MCP servers                  │   │
        │  └────────────────────────────────┘   │
        └──────────────┬────────────────────────┘
                       │
    ┌──────────────────┼──────────────────────────────────┐
    │                  │                                  │
┌───▼──────────┐  ┌────▼────────┐  ┌──────────┐  ┌───────▼──────┐
│ Model        │  │ Context      │  │ Rules    │  │ Custom       │
│ Management   │  │ Providers    │  │ Engine   │  │ Prompts      │
│              │  │              │  │          │  │              │
│ • OpenAI     │  │ • file       │  │ • Text   │  │ • Name       │
│ • Claude     │  │ • code       │  │   rules  │  │ • Description│
│ • Mistral    │  │ • codebase   │  │ • Named  │  │ • Template   │
│ • Ollama     │  │ • docs       │  │   rules  │  │              │
│ • Custom     │  │ • diff       │  │ • Glob   │  │ Docs Index   │
│              │  │ • http       │  │   filters│  │              │
│ Role-based:  │  │ • folder     │  │          │  │ • Web        │
│ • chat       │  │ • terminal   │  │          │  │   crawling   │
│ • edit       │  │ • problems   │  │          │  │ • Multi-site │
│ • autocomplete│  │ • helpbot    │  │          │  │              │
│ • apply      │  │              │  │          │  │ MCP Servers  │
│ • embed      │  │ Priority-    │  │          │  │              │
│ • rerank     │  │ based        │  │          │  │ • Tool       │
│              │  │ aggregation  │  │          │  │   integration│
└────┬─────────┘  └────┬────────┘  └────┬─────┘  └────┬─────────┘
     │                 │                 │             │
     └─────────────────┼─────────────────┼─────────────┘
                       │
        ┌──────────────▼────────────────────────┐
        │  PROMPT COMPOSITION                   │
        │                                       │
        │  System Message:                      │
        │  ├─ Model instructions                │
        │  ├─ Applied rules                     │
        │  └─ Context constraints               │
        │                                       │
        │  User Message:                        │
        │  ├─ User input                        │
        │  ├─ Aggregated context                │
        │  └─ Code selection (if available)     │
        └──────────────┬────────────────────────┘
                       │
        ┌──────────────▼────────────────────────┐
        │  LLM PROVIDER DISPATCH                │
        │                                       │
        │  POST https://api.openai.com/v1/chat/completions
        │  POST https://api.anthropic.com/v1/messages
        │  POST https://api.mistral.ai/v1/chat/completions
        │  GET  http://localhost:11434/api/generate
        │  POST http://custom-endpoint/v1/chat/completions
        └──────────────┬────────────────────────┘
                       │
        ┌──────────────▼────────────────────────┐
        │  RESPONSE PROCESSING                  │
        │                                       │
        │  • Parse LLM response                 │
        │  • Extract suggestions/changes        │
        │  • Format for display                 │
        │  • Handle streaming (if applicable)   │
        └──────────────┬────────────────────────┘
                       │
        ┌──────────────▼────────────────────────┐
        │  IDE INTEGRATION & DISPLAY            │
        │                                       │
        │  • Render chat response               │
        │  • Display inline suggestions         │
        │  • Generate and show diffs            │
        │  • Execute terminal commands          │
        │  • Request/validate permissions       │
        └──────────────┬────────────────────────┘
                       │
        ┌──────────────▼────────────────────────┐
        │  USER INTERACTION                     │
        │                                       │
        │  • Accept/Reject suggestions          │
        │  • Continue conversation              │
        │  • Grant permission for actions       │
        │  • Request follow-up                  │
        └──────────────────────────────────────┘
```

---

### Data Flow: Chat Mode Example

```
1. User selects code and presses Cmd+L
   ↓
2. IDE captures:
   - Selected code
   - Current file content
   - Cursor position
   ↓
3. Cody loads config.yaml
   ↓
4. Context Providers gather:
   - Current file (file provider)
   - Related code snippets (code provider)
   - Similar code from codebase (codebase provider)
   - Relevant documentation (docs provider)
   ↓
5. Rules Engine applies:
   - Global rules (e.g., "Use TypeScript")
   - File-specific rules (globs: "**/*.ts")
   ↓
6. Prompt Composition:
   System: [Model instructions + Rules applied]
   User: [Selected code + Context aggregated]
   ↓
7. Model Selection:
   Query config for model with role: "chat"
   → GPT-4o selected
   ↓
8. LLM Request:
   POST to https://api.openai.com/v1/chat/completions
   {
     "model": "gpt-4o",
     "messages": [...],
     "temperature": 0.7,
     "max_tokens": 1500
   }
   ↓
9. LLM Response:
   {
     "choices": [{
       "message": {
         "content": "Here's an optimized version of your code..."
       }
     }]
   }
   ↓
10. Response Formatting:
    - Parse response
    - Format for IDE display
    - Handle line wrapping
    ↓
11. IDE Display:
    Chat panel shows response with code syntax highlighting
    ↓
12. User Interaction:
    - Read response
    - Ask follow-up question
    - Request code modification
    - Switch to Edit Mode
```

---

## Key Architectural Principles

### 1. **Configuration-Driven Design**
- All behavior specified via YAML config
- No hardcoding required
- Runtime flexibility
- Environment-specific configurations

### 2. **Hub-and-Spoke Architecture**
- Configuration System as central hub
- Models, Context, Rules as spokes
- Clean separation of concerns
- Easy to add new providers

### 3. **Modular Feature Modes**
- Chat, Edit, Agent, Autocomplete as independent modes
- Share same core infrastructure
- Can be enabled/disabled per configuration
- Each has distinct UX

### 4. **Provider-Based Extensibility**
- Context providers pluggable (10+)
- Model providers swappable
- MCP server integration
- Custom prompt templates

### 5. **Permission-Based Autonomy**
- Agent Mode asks before tool use
- User maintains control
- Safety by design
- Audit trail of actions

### 6. **Multi-Provider LLM Support**
- Not locked to single provider
- Mix and match providers/models
- Role-based dispatch
- Cost optimization through model selection

---

## Next Steps for New Engineers

1. **Read** this document thoroughly
2. **Clone** the repository: `git clone https://github.com/syncfusion/cody.git`
3. **Setup** local environment (see "Development Environment Setup")
4. **Test** each mode (Chat, Edit, Agent, Autocomplete)
5. **Review** configuration files to understand customization
6. **Study** architecture analysis docs: `PRINCIPAL_ARCHITECTURE_REVIEW_2024.md`
7. **Contribute** following "Development Workflow" guidelines

---

## Quick Reference

### Keyboard Shortcuts
- **Chat**: `Cmd+L` (Mac) / `Ctrl+L` (Windows)
- **Edit**: `Cmd+I` (Mac) / `Ctrl+I` (Windows)
- **Autocomplete Accept**: `Tab`
- **Autocomplete Reject**: `Esc`
- **Autocomplete Word**: `Cmd+→` / `Ctrl+→`

### File Locations
- **Main Config**: `config.yaml`
- **Features**: `syncfusion-cody/features/`
- **Configuration Docs**: `syncfusion-cody/reference/configure-properties/`
- **Setup Guides**: `syncfusion-cody/get-started/`

### Key Documents
- `syncfusion-cody/Welcome-to-Cody.md` – User introduction
- `syncfusion-cody/reference/Configure-the-Cody.md` – Configuration guide
- `PRINCIPAL_ARCHITECTURE_REVIEW_2024.md` – Deep architecture review
- `QUICK_START.md` – Rapid onboarding

---

## Support & Resources

### Internal Resources
- **Architecture Review**: See `PRINCIPAL_ARCHITECTURE_REVIEW_2024.md`
- **Delivery Summary**: See `DELIVERY_SUMMARY.md`
- **Action Plan**: See `IMPLEMENTATION_ACTION_PLAN.md`

### External Resources
- **OpenAI API**: https://platform.openai.com/docs/
- **Anthropic Claude**: https://docs.anthropic.com/
- **Mistral**: https://docs.mistral.ai/
- **MCP Protocol**: https://modelcontextprotocol.io/
- **YAML Specification**: https://yaml.org/spec/

### Getting Help
- Check troubleshooting section above
- Review architecture documentation
- Ask in team channels
- Consult with team lead

---

**Document Version**: 1.0  
**Last Updated**: 2024  
**Maintained By**: Syncfusion Cody Team  
**Status**: Active
