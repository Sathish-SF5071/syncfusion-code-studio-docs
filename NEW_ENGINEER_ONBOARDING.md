# 🚀 New Engineer Onboarding Guide - Syncfusion Cody

**Welcome to the Syncfusion Cody Team!**

This comprehensive guide will help you understand our project, codebase, and development workflow. By the end of this document, you'll be ready to contribute effectively to the team.

**Last Updated**: 2024 | **Version**: 2.0  
**Estimated Reading Time**: 60 minutes

---

## 📋 Table of Contents

1. [Project Purpose & Overview](#1-project-purpose--overview)
2. [Business Workflow & Use Cases](#2-business-workflow--use-cases)
3. [Repository Structure](#3-repository-structure)
4. [System Architecture](#4-system-architecture)
5. [Key Modules & Components](#5-key-modules--components)
6. [API Endpoints & Interfaces](#6-api-endpoints--interfaces)
7. [Database Schema & Data Models](#7-database-schema--data-models)
8. [Configuration System](#8-configuration-system)
9. [Development Workflow](#9-development-workflow)
10. [Deployment Process](#10-deployment-process)
11. [Common Troubleshooting](#11-common-troubleshooting)
12. [Resources & Next Steps](#12-resources--next-steps)

---

## 1. Project Purpose & Overview

### 1.1 What is Syncfusion Cody?

**Syncfusion Cody** is an **AI-powered IDE extension** that revolutionizes how developers write code. Think of it as an intelligent pair-programming partner that:

- **Understands your entire codebase** (not just snippets)
- **Provides context-aware assistance** across multiple interaction modes
- **Executes complex tasks autonomously** with your approval
- **Integrates deeply with Syncfusion components** for rapid UI development

### 1.2 Core Value Proposition

| Feature | Developer Benefit |
|---------|------------------|
| **Multi-Modal AI** | Choose between Chat, Edit, Agent, and Autocomplete modes based on your task |
| **Context-Aware Intelligence** | Cody reads your code, docs, dependencies, and even terminal output |
| **Extensible Architecture** | Plugin system allows custom context providers, rules, and MCP servers |
| **Secure by Design** | Permission-gated autonomy ensures you control all actions |
| **Multi-Provider Support** | Works with OpenAI, Anthropic Claude, Mistral, Ollama, and custom endpoints |

### 1.3 Key Statistics

- **Architecture Quality**: ⭐⭐⭐⭐ (4/5) - Excellent configuration-driven design
- **Documentation Size**: ~200 KB across modular feature docs
- **Supported LLM Providers**: 5+ (OpenAI, Claude, Mistral, Ollama, Custom)
- **Context Providers**: 10+ pluggable sources
- **Feature Modes**: 4 distinct interaction patterns
- **Target Users**: Professional developers working in VS Code, JetBrains IDEs, and Neovim

### 1.4 Strategic Goals (Next 6 Months)

| Phase | Timeline | Key Deliverables |
|-------|----------|------------------|
| **Phase 1** | Week 1-2 | Security hardening, environment variable support, credential management |
| **Phase 2** | Week 3-4 | Error handling framework, configuration validation, reliability improvements |
| **Phase 3** | Week 5-6 | Configuration composition, team collaboration features |
| **Phase 4** | Week 7-8 | Token budgeting, context optimization, scalability |
| **Phase 5** | Week 9-10 | Enterprise features, audit trails, compliance |

---

## 2. Business Workflow & Use Cases

### 2.1 How Cody Fits Into Developer Workflow

```
┌─────────────────────────────────────────────────────────────┐
│                    Developer Daily Workflow                 │
└─────────────────────────────────────────────────────────────┘
                           │
          ┌────────────────┼────────────────┐
          ↓                ↓                ↓
    Writing Code     Debugging Code    Refactoring
          │                │                │
          ↓                ↓                ↓
    Autocomplete     Chat Mode        Edit Mode
       Mode                              & Agent
          │                │                │
          └────────────────┼────────────────┘
                           ↓
                   Code Committed
                           ↓
                   Tests Pass → Deploy
```

### 2.2 Four Primary Interaction Modes

#### Mode 1: **Chat Mode** - Conversational Assistance

**When to Use:**
- Asking "How does this function work?"
- Getting architecture recommendations
- Learning about APIs or frameworks
- Brainstorming solutions

**Example Workflow:**
```
Developer: "Why is my React component re-rendering unnecessarily?"
    ↓
Cody analyzes component code + React patterns
    ↓
Cody: "You're creating a new function in render. Move it outside..."
    ↓
Developer reviews suggestion → Implements fix
```

**Key Features:**
- Multi-turn conversation memory
- Context from open files, selections, and project structure
- Code snippet generation with explanations

---

#### Mode 2: **Edit Mode** - Targeted Code Modifications

**When to Use:**
- Refactoring a specific function
- Converting callback-based code to async/await
- Adding error handling to existing code
- Fixing linting/style issues

**Example Workflow:**
```
Developer selects 20 lines of callback code
    ↓
Developer: "Convert this to use async/await"
    ↓
Cody generates diff showing before/after
    ↓
Developer clicks "Accept" → Code updated instantly
```

**Key Features:**
- Inline diff preview (before/after comparison)
- Accept/Reject per change or batch operations
- Preserves code style and formatting
- Undo support

---

#### Mode 3: **Agent Mode** - Autonomous Task Execution

**When to Use:**
- "Add unit tests for UserService"
- "Implement user authentication with JWT"
- "Add error logging throughout the app"
- "Create a REST API for todo items"

**6-Step Agent Workflow:**

1. **Understand Request** → Parse task requirements and constraints
2. **Explore Codebase** → Search files, understand architecture, identify dependencies
3. **Plan Changes** → Break task into subtasks, design implementation strategy
4. **Execute Changes** → Create/edit files, run terminal commands (WITH YOUR APPROVAL)
5. **Verify Results** → Run tests, check compilation, validate behavior
6. **Report Completion** → Summarize changes, highlight key files

**Permission Gate:**
```
Agent wants to run: `npm test`
┌─────────────────────────────────────────────┐
│ Agent requests permission to execute:       │
│   Terminal Command: npm test               │
│                                             │
│  [Continue]  [Cancel]                       │
└─────────────────────────────────────────────┘
```

**Key Features:**
- Full autonomy with permission gates
- File search, create, edit, delete capabilities
- Terminal command execution
- Error recovery and retry logic
- Context-aware planning

---

#### Mode 4: **Autocomplete Mode** - Inline Real-Time Suggestions

**When to Use:**
- Writing new code from scratch
- Discovering unfamiliar APIs
- Staying in flow state (no context switching)
- Rapidly prototyping

**Example:**
```typescript
Developer types: function calculateTotal(items
Cody suggests:   : CartItem[]): number {
                   return items.reduce((sum, item) => sum + item.price, 0);
                 }
Developer presses Tab → Full suggestion accepted
```

**Controls:**
- **Tab**: Accept full suggestion
- **Esc**: Reject suggestion
- **Cmd/Ctrl + →**: Accept word-by-word

**Key Features:**
- Low latency (<200ms typical)
- Context from entire file + project
- Multi-line completions
- Language-aware (respects syntax)

---

### 2.3 Real-World Use Case Examples

#### Use Case 1: Onboarding a New Developer
```
New engineer clones repo → Asks Cody: "Explain this architecture"
    ↓
Cody reads key files + README → Generates comprehensive explanation
    ↓
Engineer: "How do I add a new API endpoint?"
    ↓
Cody shows code examples from existing endpoints
```

#### Use Case 2: Debugging Production Issue
```
Developer finds bug → Selects problematic code → Chat: "Why would this throw NullPointerException?"
    ↓
Cody analyzes code path + data flow
    ↓
Cody: "The 'user' object can be null when authentication fails..."
    ↓
Developer: "Fix it" → Edit mode applies defensive check
```

#### Use Case 3: Large Refactoring
```
Developer: [Agent mode] "Migrate all database queries from callbacks to Promises"
    ↓
Agent searches codebase → Finds 42 callback-based DB calls
    ↓
Agent generates migration plan → Asks permission
    ↓
Developer approves → Agent refactors all files → Runs tests → Reports success
```

---

## 3. Repository Structure

### 3.1 High-Level Directory Layout

```
syncfusion-code-studio-docs/
├── syncfusion-cody/                    # Core documentation source
│   ├── Welcome-to-Cody.md             # Product introduction
│   ├── features/                       # Feature-specific docs
│   │   ├── Agent.md                   # Agent mode documentation
│   │   ├── Chat.md                    # Chat mode documentation
│   │   ├── Edit.md                    # Edit mode documentation
│   │   ├── Autocomplete.md            # Autocomplete mode documentation
│   │   └── Feature_Images/            # Screenshots and visuals
│   ├── get-started/                    # Installation guides
│   │   ├── Windows.md                 # Windows setup
│   │   ├── Mac.md                     # macOS setup
│   │   └── getting_started_image/     # Setup screenshots
│   ├── reference/                      # Technical reference
│   │   ├── Configure-the-Cody.md      # Main config guide
│   │   └── configure-properties/       # Property references
│   │       ├── models.md              # Model configuration
│   │       ├── context.md             # Context providers
│   │       ├── rules.md               # Rules engine
│   │       ├── prompts.md             # Custom prompts
│   │       ├── docs.md                # Documentation indexing
│   │       └── mcpServers.md          # MCP server integration
│   └── release-notes/                  # Version history
│
├── ENGINEER_ONBOARDING_GUIDE.md        # Existing onboarding doc
├── API_REFERENCE.md                    # API endpoint documentation
├── TECHNICAL_DEEP_DIVE.md              # Architecture deep dive
├── DEVELOPMENT_SETUP.md                # Dev environment setup
├── ARCHITECTURE_REVIEW.md              # Architecture assessment
├── ARCHITECTURE_DIAGRAMS.md            # Visual architecture docs
├── ACTIONABLE_RECOMMENDATIONS.md       # Improvement roadmap
├── QUICK_START.md                      # Quick reference guide
├── architecture_analysis.json          # Machine-readable analysis
├── README.md                           # Repository overview
└── .gitignore                          # Git ignore rules
```

### 3.2 Key Files You'll Work With

| File/Directory | Purpose | When to Edit |
|----------------|---------|--------------|
| `syncfusion-cody/features/*.md` | User-facing feature documentation | Adding/changing features |
| `syncfusion-cody/reference/configure-properties/*.md` | Configuration reference docs | New config properties |
| `ARCHITECTURE_*.md` | Technical architecture documentation | Architecture changes |
| `API_REFERENCE.md` | API endpoint documentation | New API endpoints |
| `DEVELOPMENT_SETUP.md` | Dev environment guide | Setup process changes |
| `architecture_analysis.json` | Structured system analysis | Architecture audits |

### 3.3 Documentation Organization Philosophy

Our documentation follows a **progressive disclosure** pattern:

1. **Welcome/Overview** → High-level introduction
2. **Features** → User-facing capabilities (how to use)
3. **Reference** → Technical specifications (how it works)
4. **Architecture** → System design (why it works this way)

**Example Navigation Path:**
```
New User → Welcome-to-Cody.md → features/Chat.md → Try it out
Developer → reference/Configure-the-Cody.md → configure-properties/models.md → Implement
Architect → ARCHITECTURE_REVIEW.md → TECHNICAL_DEEP_DIVE.md → Design
```

---

## 4. System Architecture

### 4.1 Architecture Overview (High-Level)

Syncfusion Cody follows a **layered architecture** with clear separation of concerns:

```
┌──────────────────────────────────────────────────────────────┐
│                    IDE HOST LAYER                            │
│  (VS Code, JetBrains, Neovim)                                │
│                                                              │
│  User Interface:                                             │
│  ├─ Chat Panel                                               │
│  ├─ Edit Diff View                                           │
│  ├─ Agent Progress Monitor                                   │
│  └─ Autocomplete Inline Suggestions                          │
└────────────────────┬─────────────────────────────────────────┘
                     │ Extension Protocol (WebSocket/stdio)
┌────────────────────▼─────────────────────────────────────────┐
│                 CODY ENGINE CORE                             │
│                                                              │
│  ┌────────────────────────────────────────────────────┐     │
│  │  Configuration Manager                             │     │
│  │  - Load config.yaml                                │     │
│  │  - Validate schema                                 │     │
│  │  - Resolve environment variables                   │     │
│  └────────────────────────────────────────────────────┘     │
│                                                              │
│  ┌────────────────────────────────────────────────────┐     │
│  │  Request Router                                    │     │
│  │  - Route to Chat/Edit/Agent/Autocomplete handler  │     │
│  └────────────────────────────────────────────────────┘     │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ Model        │  │ Context      │  │ Rules        │      │
│  │ Manager      │  │ Aggregator   │  │ Engine       │      │
│  │              │  │              │  │              │      │
│  │ - Selection  │  │ - File       │  │ - Text rules │      │
│  │ - Routing    │  │ - Code       │  │ - Glob match │      │
│  │ - Streaming  │  │ - Codebase   │  │ - Apply      │      │
│  │ - Auth       │  │ - Docs       │  │              │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│                                                              │
│  ┌────────────────────────────────────────────────────┐     │
│  │  LLM System Message Builder                        │     │
│  │  - Compose system prompt from rules + context      │     │
│  └────────────────────────────────────────────────────┘     │
│                                                              │
│  ┌────────────────────────────────────────────────────┐     │
│  │  Agent Mode Executor (6-step workflow)             │     │
│  │  - Understand → Explore → Plan → Execute          │     │
│  │  - Verify → Complete                               │     │
│  └────────────────────────────────────────────────────┘     │
│                                                              │
│  ┌────────────────────────────────────────────────────┐     │
│  │  Tool Executor                                     │     │
│  │  - File read/write/create                          │     │
│  │  - Terminal command execution                      │     │
│  │  - Code search & analysis                          │     │
│  └────────────────────────────────────────────────────┘     │
└────────────────────┬─────────────────────────────────────────┘
                     │ HTTP/HTTPS
┌────────────────────▼─────────────────────────────────────────┐
│           EXTERNAL LLM PROVIDER APIS                         │
│                                                              │
│  ├─ OpenAI API (GPT-4, GPT-3.5)                             │
│  ├─ Anthropic Claude API                                     │
│  ├─ Mistral API                                              │
│  ├─ Ollama (Local)                                           │
│  └─ Custom OpenAI-Compatible Endpoints                       │
└──────────────────────────────────────────────────────────────┘
```

### 4.2 Key Architectural Patterns

#### Pattern 1: **Configuration-Driven Design**
- **All behavior defined in `config.yaml`** (no hardcoded settings)
- **Benefits**: Easy customization, team standardization, version control
- **Example**: Switch from GPT-4 to Claude by changing 3 lines in YAML

#### Pattern 2: **Multi-Provider Abstraction**
- **Unified interface** to multiple LLM providers
- **Benefits**: Provider independence, fallback strategies, cost optimization
- **Example**: Use GPT-4 for complex tasks, GPT-3.5 for autocomplete (cheaper)

#### Pattern 3: **Pluggable Context Providers**
- **Modular system** for gathering context (files, code, docs, terminal, etc.)
- **Benefits**: Extensibility, selective context, performance control
- **Example**: Disable codebase-wide search for faster autocomplete

#### Pattern 4: **Permission-Gated Autonomy**
- **Agent mode requires explicit approval** before executing tools
- **Benefits**: Safety, transparency, user control
- **Example**: Agent asks permission before running `rm -rf` command

#### Pattern 5: **Role-Based Model Dispatch**
- **Models assigned specific roles** (chat, edit, autocomplete, etc.)
- **Benefits**: Optimize cost/performance, use specialized models
- **Example**: Use fast Codestral for autocomplete, GPT-4 for complex reasoning

### 4.3 Component Interaction Flow

**Example: User asks a question in Chat Mode**

```
1. User types: "How does authentication work?"
        ↓
2. IDE sends message to Cody Engine via WebSocket
        ↓
3. Configuration Manager loads config.yaml
        ↓
4. Request Router identifies "Chat Mode"
        ↓
5. Context Aggregator gathers context:
   - Open files
   - User's code selection
   - Project README
   - Relevant code snippets
        ↓
6. Rules Engine applies behavioral rules:
   - "Be concise"
   - "Include code examples"
        ↓
7. Model Manager selects model with "chat" role (e.g., GPT-4)
        ↓
8. System Message Builder composes prompt:
   system: "[rules] + [context]"
   user: "How does authentication work?"
        ↓
9. HTTP request sent to OpenAI API
        ↓
10. Response streamed back to user in Chat Panel
```

---

## 5. Key Modules & Components

### 5.1 Core Service Modules

#### Module 1: **Configuration System**

**Location**: `syncfusion-cody/reference/Configure-the-Cody.md`

**Purpose**: Central source of truth for all Cody behavior

**Key Responsibilities:**
- Load and parse `config.yaml`
- Validate against schema
- Resolve environment variables (e.g., `${OPENAI_API_KEY}`)
- Provide config to all other modules

**Configuration Schema:**
```yaml
name: "My Cody Config"      # Configuration name
version: "1.0.0"             # Semantic version
schema: "v1"                 # Schema version

models: [...]                # LLM configurations
context: [...]               # Context provider configs
rules: [...]                 # Behavioral rules
prompts: [...]               # Custom prompts
docs: [...]                  # Documentation indexing
mcpServers: [...]            # MCP server integrations
```

**Critical Functions:**
- `loadConfig()` - Read YAML from disk
- `validateConfig()` - Check schema compliance
- `resolveEnvVars()` - Substitute `${VAR}` with environment values
- `watchConfig()` - Reload on file changes

---

#### Module 2: **Model Manager**

**Location**: `syncfusion-cody/reference/configure-properties/models.md`

**Purpose**: Abstraction layer over multiple LLM providers

**Key Responsibilities:**
- Model selection based on role (chat, edit, autocomplete, etc.)
- API authentication and routing
- Request/response transformation
- Streaming response handling
- Error handling and retries

**Supported Providers:**
- **OpenAI** (`provider: openai`) → GPT-4, GPT-3.5
- **Anthropic** (`provider: anthropic`) → Claude 3
- **Mistral** (`provider: mistral`) → Codestral, Mistral Large
- **Ollama** (`provider: ollama`) → Local models
- **Custom** (OpenAI-compatible endpoints)

**Model Configuration Example:**
```yaml
models:
  - name: "GPT-4o"
    provider: openai
    model: gpt-4o
    apiKey: ${OPENAI_API_KEY}
    roles:
      - chat
      - edit
      - apply
    defaultCompletionOptions:
      temperature: 0.7
      maxTokens: 1500

  - name: "Codestral"
    provider: mistral
    model: codestral-latest
    apiKey: ${MISTRAL_API_KEY}
    roles:
      - autocomplete
```

**Role Types:**
- `chat` - Conversational assistance
- `edit` - Code modifications
- `agent` - Autonomous task execution
- `autocomplete` - Inline suggestions
- `apply` - Apply diffs/patches
- `embed` - Generate embeddings
- `rerank` - Rerank search results

---

#### Module 3: **Context Provider System**

**Location**: `syncfusion-cody/reference/configure-properties/context.md`

**Purpose**: Gather supplementary information for LLM requests

**Available Providers:**

| Provider | Data Source | Use Case |
|----------|-------------|----------|
| `file` | Current open file | Understanding code user is viewing |
| `code` | User's code selection | Answering questions about specific code |
| `codebase` | Entire project repository | Finding similar code patterns |
| `docs` | Indexed documentation | Answering API/library questions |
| `diff` | Git diff output | Understanding recent changes |
| `http` | External HTTP endpoints | Fetching real-time data |
| `folder` | Specific directory contents | Scoped code understanding |
| `terminal` | Terminal output | Debugging command failures |
| `problems` | IDE error/warning list | Fixing linting/compilation issues |
| `helpbot` | Built-in help resources | Onboarding assistance |

**Configuration Example:**
```yaml
context:
  - type: file
    enabled: true
  
  - type: codebase
    enabled: true
    maxResults: 20
  
  - type: docs
    enabled: true
    sources:
      - "https://docs.example.com"
  
  - type: http
    enabled: true
    url: "https://api.example.com/context"
    headers:
      Authorization: "Bearer ${API_TOKEN}"
```

**How Context Flows:**
```
User asks question
    ↓
Context Aggregator queries all enabled providers
    ↓
Each provider returns relevant data:
  - file provider → Current file content
  - code provider → Selected code snippet
  - codebase provider → Similar code from project
  - docs provider → Relevant documentation
    ↓
All context combined and sent to LLM in system message
```

---

#### Module 4: **Rules Engine**

**Location**: `syncfusion-cody/reference/configure-properties/rules.md`

**Purpose**: Define behavioral constraints and patterns for LLM

**Rule Types:**

1. **Text Rules** - Simple instructions
```yaml
rules:
  - text: "Be concise and direct"
  - text: "Always include code examples"
  - text: "Use TypeScript for examples"
```

2. **Named Rules** - Reusable rules with descriptions
```yaml
rules:
  - name: "Security"
    description: "Security-focused code review"
    text: |
      Review all code for security vulnerabilities.
      Check for SQL injection, XSS, authentication issues.
```

3. **Glob-Based Rules** - Context-specific rules
```yaml
rules:
  - glob: "**/*.test.ts"
    text: "Focus on test coverage and edge cases"
  
  - glob: "src/api/**"
    text: "Ensure all endpoints have error handling"
```

**Rule Application Logic:**
```
1. Load all text rules (always applied)
2. Check current file against glob patterns
3. Apply matching glob rules
4. Combine all rules into system message
5. Send to LLM
```

---

#### Module 5: **Agent Mode Executor**

**Location**: `syncfusion-cody/features/Agent.md`

**Purpose**: Orchestrate autonomous task execution

**6-Step Agent Workflow:**

```
┌─────────────────────────────────────────────────────────────┐
│ Step 1: UNDERSTAND REQUEST                                  │
│ - Parse user prompt                                         │
│ - Identify task type (add feature, fix bug, refactor, etc.)│
│ - Load project context                                      │
└───────────────────────────┬─────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ Step 2: EXPLORE CODEBASE                                    │
│ - Search for relevant files (ripgrep, file system walk)     │
│ - Analyze code structure (AST parsing)                      │
│ - Map dependencies                                          │
│ - Read existing patterns                                    │
└───────────────────────────┬─────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ Step 3: PLAN CHANGES                                        │
│ - Break task into subtasks                                  │
│ - Identify files to create/modify                           │
│ - Design implementation strategy                            │
│ - Present plan to user                                      │
└───────────────────────────┬─────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ Step 4: EXECUTE CHANGES                                     │
│ - Request permission for each tool use                      │
│ - Create new files                                          │
│ - Edit existing files                                       │
│ - Run terminal commands                                     │
│ - Apply code transformations                                │
└───────────────────────────┬─────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ Step 5: VERIFY RESULTS                                      │
│ - Run test suite                                            │
│ - Check compilation/linting                                 │
│ - Validate behavior                                         │
│ - Fix any issues found                                      │
└───────────────────────────┬─────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ Step 6: COMPLETE & REPORT                                   │
│ - Summarize all changes                                     │
│ - List modified files                                       │
│ - Highlight key decisions                                   │
│ - Hand back control to developer                            │
└─────────────────────────────────────────────────────────────┘
```

**Available Agent Tools:**

| Tool | Purpose | Example |
|------|---------|---------|
| `file_read` | Read file contents | Analyze existing code |
| `file_write` | Create new file | Generate test file |
| `file_edit` | Modify existing file | Refactor function |
| `file_delete` | Delete file | Remove deprecated code |
| `terminal_execute` | Run shell command | `npm test`, `git commit` |
| `code_search` | Find code patterns | Find all API endpoints |
| `git_operation` | Git commands | `git diff`, `git log` |

**Permission Gate Example:**
```
┌─────────────────────────────────────────────────────────────┐
│ 🤖 Agent Request                                            │
├─────────────────────────────────────────────────────────────┤
│ Action: terminal_execute                                    │
│ Command: npm install lodash                                 │
│ Reason: Need lodash for array utilities                     │
│                                                             │
│ [Continue]  [Cancel]  [View Context]                        │
└─────────────────────────────────────────────────────────────┘
```

---

#### Module 6: **Custom Prompts**

**Location**: `syncfusion-cody/reference/configure-properties/prompts.md`

**Purpose**: Reusable task templates for common workflows

**Prompt Structure:**
```yaml
prompts:
  - name: "Add Unit Tests"
    description: "Generate comprehensive unit tests for selected code"
    prompt: |
      Analyze the selected code and create unit tests that cover:
      - Happy path scenarios
      - Edge cases
      - Error conditions
      Use Jest framework with TypeScript.
```

**Use Case Examples:**

1. **Code Review Prompt**
```yaml
prompts:
  - name: "Security Review"
    description: "Perform security-focused code review"
    prompt: |
      Review the selected code for:
      - SQL injection vulnerabilities
      - XSS risks
      - Authentication bypass
      - Sensitive data exposure
      - OWASP Top 10 issues
```

2. **Documentation Prompt**
```yaml
prompts:
  - name: "Generate Docs"
    description: "Create JSDoc documentation for code"
    prompt: |
      Generate comprehensive JSDoc comments including:
      - Function description
      - Parameter descriptions with types
      - Return value description
      - Example usage
      - Edge cases and warnings
```

---

#### Module 7: **MCP Server Integration**

**Location**: `syncfusion-cody/reference/configure-properties/mcpServers.md`

**Purpose**: Extend Cody with external tools via Model Context Protocol (Anthropic standard)

**MCP Configuration:**
```yaml
mcpServers:
  - name: "Database MCP"
    description: "Query production database"
    command: "node"
    args:
      - "/path/to/db-mcp-server.js"
    env:
      DATABASE_URL: ${DATABASE_URL}
    timeout: 5000
```

**What MCP Enables:**
- **Custom Tools**: Add domain-specific operations (database queries, API calls, etc.)
- **External Context**: Pull data from company systems
- **Specialized Prompts**: Company-specific templates
- **Standardization**: Industry standard (Anthropic-backed)

**Example MCP Use Cases:**

| MCP Server | Purpose |
|------------|---------|
| `database-mcp` | Query production database safely |
| `jira-mcp` | Fetch issue details, create tickets |
| `aws-mcp` | Query AWS resources, logs |
| `company-knowledge-mcp` | Access internal wikis, docs |

---

### 5.2 Feature Modules

#### Feature 1: **Chat Mode**
- **Handler**: Chat mode request processor
- **Context**: Uses all enabled context providers
- **Output**: Conversational response with code examples

#### Feature 2: **Edit Mode**
- **Handler**: Edit mode diff generator
- **Context**: Focused on selected code + surrounding context
- **Output**: Inline diff with accept/reject UI

#### Feature 3: **Agent Mode**
- **Handler**: Agent orchestrator (6-step workflow)
- **Context**: Full codebase access + tool execution
- **Output**: Completed task with file modifications

#### Feature 4: **Autocomplete Mode**
- **Handler**: Autocomplete suggestion engine
- **Context**: Current file + cursor position
- **Output**: Real-time inline suggestions

---

## 6. API Endpoints & Interfaces

### 6.1 External LLM Provider APIs

Cody integrates with external LLM providers via HTTP APIs:

#### OpenAI API

**Endpoint**: `https://api.openai.com/v1/chat/completions`

**Request Structure:**
```json
{
  "model": "gpt-4o",
  "messages": [
    {
      "role": "system",
      "content": "[rules + context]"
    },
    {
      "role": "user",
      "content": "How does authentication work?"
    }
  ],
  "temperature": 0.7,
  "max_tokens": 4096,
  "stream": true
}
```

**Response (Streaming):**
```json
{
  "id": "chatcmpl-123",
  "object": "chat.completion.chunk",
  "created": 1703000000,
  "model": "gpt-4o",
  "choices": [
    {
      "delta": {
        "content": "Authentication in this system..."
      },
      "index": 0,
      "finish_reason": null
    }
  ]
}
```

**Status Codes:**
- `200` - Success
- `400` - Bad request (fix request format)
- `401` - Unauthorized (check API key)
- `429` - Rate limited (exponential backoff)
- `500` - Server error (retry with backoff)
- `503` - Service unavailable (retry)

**Authentication:**
```bash
Authorization: Bearer sk-...YOUR_API_KEY...
```

---

#### Anthropic Claude API

**Endpoint**: `https://api.anthropic.com/v1/messages`

**Request Structure:**
```json
{
  "model": "claude-3-opus-20240229",
  "max_tokens": 1024,
  "system": "[rules + context]",
  "messages": [
    {
      "role": "user",
      "content": "Explain this function"
    }
  ]
}
```

**Key Differences from OpenAI:**
- System message is top-level field (not in messages array)
- `max_tokens` is required
- Different model naming convention

---

#### Mistral API

**Endpoint**: `https://api.mistral.ai/v1/chat/completions`

**Configuration:**
```yaml
models:
  - name: "Codestral"
    provider: mistral
    model: codestral-latest
    apiKey: ${MISTRAL_API_KEY}
    roles:
      - autocomplete
```

**Note**: Mistral API is OpenAI-compatible (same request/response format)

---

#### Ollama (Local)

**Endpoint**: `http://localhost:11434/api/chat`

**Request Structure:**
```json
{
  "model": "mistral",
  "messages": [
    {
      "role": "system",
      "content": "[rules + context]"
    },
    {
      "role": "user",
      "content": "Hello"
    }
  ],
  "stream": true
}
```

**Benefits of Ollama:**
- No API costs
- Works offline
- Full privacy (no data leaves machine)
- Good for development/testing

**Startup:**
```bash
# Install Ollama
curl -fsSL https://ollama.ai/install.sh | sh

# Pull a model
ollama pull mistral

# Start server (runs on http://localhost:11434)
ollama serve
```

---

### 6.2 IDE Integration APIs

Cody communicates with IDEs via **extension protocols**:

#### VS Code Extension API

**Communication**: WebSocket or stdio

**Key VS Code APIs Used:**
- `vscode.window.showTextDocument()` - Open files
- `vscode.workspace.applyEdit()` - Modify code
- `vscode.window.createTerminal()` - Run commands
- `vscode.workspace.findFiles()` - Search files
- `vscode.languages.registerCompletionItemProvider()` - Autocomplete

#### JetBrains Plugin API

**Communication**: IntelliJ Platform Plugin SDK

**Key JetBrains APIs:**
- `FileEditorManager` - File operations
- `PsiFile` - Code AST access
- `TerminalExecutionConsole` - Terminal access
- `DaemonCodeAnalyzer` - Error/warning detection

---

### 6.3 Internal Service Interfaces

These are conceptual interfaces (not REST APIs), but understanding them helps with development:

#### ConfigService Interface
```typescript
interface ConfigService {
  loadConfig(): Promise<Config>;
  validateConfig(config: Config): ValidationResult;
  resolveEnvVars(config: Config): Config;
  watchConfig(callback: (config: Config) => void): void;
}
```

#### ModelService Interface
```typescript
interface ModelService {
  selectModel(role: Role): Model;
  invoke(model: Model, messages: Message[]): Promise<Response>;
  stream(model: Model, messages: Message[]): AsyncIterator<ResponseChunk>;
}
```

#### ContextService Interface
```typescript
interface ContextService {
  gatherContext(providers: Provider[]): Promise<ContextData>;
  getFileContext(file: string): Promise<string>;
  getCodebaseContext(query: string): Promise<CodeSnippet[]>;
}
```

---

## 7. Database Schema & Data Models

### 7.1 Data Storage Overview

**Important**: Syncfusion Cody is primarily a **stateless IDE extension**. It does not use a traditional database for most operations.

However, it does store/cache certain data:

### 7.2 Configuration Data Model

**Storage**: `config.yaml` file (YAML format)

**Schema Structure:**

```yaml
# Root Configuration Object
name: string                    # Configuration name
version: string                 # Semantic version (e.g., "1.0.0")
schema: string                  # Schema version (e.g., "v1")

# Models Array
models:
  - name: string                # Model identifier
    provider: string            # "openai" | "anthropic" | "mistral" | "ollama"
    model: string               # Model name (e.g., "gpt-4o")
    apiKey?: string             # API key or env var reference
    apiBase?: string            # Custom API endpoint
    roles?: string[]            # ["chat", "edit", "agent", "autocomplete", ...]
    capabilities?: string[]     # ["tool_use", "image_input"]
    defaultCompletionOptions?:
      temperature?: number      # 0.0 to 1.0
      maxTokens?: number
      contextLength?: number
      topP?: number
      topK?: number
      stop?: string[]

# Context Providers Array
context:
  - type: string                # Provider type
    enabled: boolean
    [key: string]: any          # Provider-specific options

# Rules Array
rules:
  - text?: string               # Simple rule text
    name?: string               # Named rule identifier
    description?: string        # Rule description
    glob?: string               # File pattern (e.g., "**/*.ts")

# Custom Prompts Array
prompts:
  - name: string
    description: string
    prompt: string

# Documentation Indexing Array
docs:
  - startUrl: string
    maxDepth?: number
    favicon?: string
    useLocalCrawling?: boolean

# MCP Servers Array
mcpServers:
  - name: string
    description?: string
    command: string
    args?: string[]
    env?: Record<string, string>
    timeout?: number
```

**Validation Rules:**
- `name`, `version`, `schema` are required
- At least one model must be defined
- Model `name`, `provider`, `model` are required
- Context providers must have valid `type`
- Rules must have either `text` or `name` + `prompt`

---

### 7.3 Context Cache Data Model

**Storage**: In-memory cache + optional disk cache

**Purpose**: Avoid re-indexing codebase on every request

**Cached Data:**

1. **Codebase Index**
```typescript
interface CodebaseIndex {
  files: string[];                    // All file paths
  symbols: Map<string, Symbol[]>;     // Functions, classes, etc.
  dependencies: Map<string, string[]>;// Import graph
  lastUpdated: Date;
}
```

2. **Documentation Index**
```typescript
interface DocsIndex {
  url: string;
  title: string;
  content: string;
  embedding?: number[];  // Vector embedding for search
  lastCrawled: Date;
}
```

3. **Conversation History** (Chat Mode)
```typescript
interface ConversationMessage {
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: Date;
  context?: ContextData;
}
```

---

### 7.4 Persistent Storage Locations

| Data Type | Storage Location | Format |
|-----------|------------------|--------|
| Configuration | `~/.cody/config.yaml` (user-level) or project `.cody/config.yaml` | YAML |
| Codebase index cache | `~/.cody/cache/codebase-index.json` | JSON |
| Documentation cache | `~/.cody/cache/docs/` | JSON per URL |
| Conversation history | IDE-specific storage (e.g., VS Code workspace state) | JSON |
| API keys | Environment variables (recommended) or keychain | Encrypted |

---

### 7.5 Data Model Relationships

```
┌──────────────┐
│   Config     │
│  (config.yaml)│
└──────┬───────┘
       │
       ├─► models[]       ──────► LLM Provider APIs
       ├─► context[]      ──────► Context Providers ──► Cache
       ├─► rules[]        ──────► Rules Engine
       ├─► prompts[]      ──────► Custom Prompts
       ├─► docs[]         ──────► Documentation Index ──► Cache
       └─► mcpServers[]   ──────► MCP Servers
```

---

## 8. Configuration System

### 8.1 Configuration File Location

**Search Order:**
1. Project-level: `<project-root>/.cody/config.yaml` (highest priority)
2. User-level: `~/.cody/config.yaml`
3. System-level: `/etc/cody/config.yaml` (fallback)

**Best Practice**: Use project-level config for team standardization

---

### 8.2 Complete Configuration Example

```yaml
# Basic Metadata
name: "Syncfusion Cody Production Config"
version: "1.0.0"
schema: "v1"

# Language Models Configuration
models:
  # Primary chat model (GPT-4)
  - name: "GPT-4o"
    provider: openai
    model: gpt-4o
    apiKey: ${OPENAI_API_KEY}      # Environment variable reference
    roles:
      - chat
      - edit
      - agent
      - apply
    defaultCompletionOptions:
      temperature: 0.7
      maxTokens: 2000
      contextLength: 128000
    priority: 1                     # Highest priority

  # Fast autocomplete model (GPT-3.5)
  - name: "GPT-3.5 Turbo"
    provider: openai
    model: gpt-3.5-turbo
    apiKey: ${OPENAI_API_KEY}
    roles:
      - autocomplete
    defaultCompletionOptions:
      temperature: 0.3              # More deterministic for autocomplete
      maxTokens: 500
    priority: 2

  # Local model for offline work
  - name: "Ollama Local"
    provider: ollama
    baseUrl: "http://localhost:11434"
    model: mistral
    roles:
      - chat
    priority: 3                     # Lowest priority (fallback)

  # Specialized code model (Mistral Codestral)
  - name: "Codestral"
    provider: mistral
    model: codestral-latest
    apiKey: ${MISTRAL_API_KEY}
    roles:
      - autocomplete
      - apply
    capabilities:
      - tool_use
    priority: 1

# Context Providers Configuration
context:
  # Always include current file
  - type: file
    enabled: true

  # Include user's code selection
  - type: code
    enabled: true

  # Search entire codebase
  - type: codebase
    enabled: true
    maxResults: 20
    includePatterns:
      - "src/**/*.ts"
      - "src/**/*.tsx"
    excludePatterns:
      - "node_modules/**"
      - "dist/**"
      - "*.test.ts"

  # Include indexed documentation
  - type: docs
    enabled: true

  # Include git diff (for understanding recent changes)
  - type: diff
    enabled: true

  # Include terminal output (for debugging)
  - type: terminal
    enabled: true
    maxLines: 100

  # Include current errors/warnings from IDE
  - type: problems
    enabled: true

# Behavioral Rules
rules:
  # Global rules (always applied)
  - text: "Be concise and direct. Avoid unnecessary explanations."
  
  - text: "Always include code examples in your responses."
  
  - text: |
      Security-first mindset:
      - Check for SQL injection, XSS, authentication issues
      - Never suggest insecure patterns
      - Validate all user inputs
  
  # File-specific rules (applied when file matches glob)
  - glob: "**/*.test.ts"
    text: |
      For test files:
      - Ensure comprehensive test coverage
      - Include edge cases and error scenarios
      - Use descriptive test names
      - Follow AAA pattern (Arrange, Act, Assert)
  
  - glob: "src/api/**/*.ts"
    text: |
      For API endpoints:
      - All endpoints must have error handling
      - Validate request parameters
      - Return proper HTTP status codes
      - Include API documentation comments
  
  - glob: "src/components/**/*.tsx"
    text: |
      For React components:
      - Use functional components with hooks
      - Implement proper prop validation
      - Follow React best practices
      - Optimize for performance (memoization when needed)

  # Named rules (reusable)
  - name: "TypeScript Best Practices"
    description: "Enforce TypeScript coding standards"
    text: |
      - Use strict type checking
      - Avoid 'any' type
      - Prefer interfaces over types for objects
      - Use proper type guards

# Custom Prompts
prompts:
  - name: "Code Review"
    description: "Perform comprehensive code review"
    prompt: |
      Review the selected code for:
      1. Code quality and readability
      2. Security vulnerabilities (OWASP Top 10)
      3. Performance issues
      4. Best practice violations
      5. Potential bugs
      
      Provide specific recommendations with code examples.

  - name: "Add Unit Tests"
    description: "Generate unit tests for selected code"
    prompt: |
      Analyze the selected code and generate unit tests using Jest.
      Include:
      - Happy path tests
      - Edge case tests
      - Error scenario tests
      - Mock external dependencies
      Use TypeScript and follow AAA pattern.

  - name: "Refactor for Performance"
    description: "Optimize code for better performance"
    prompt: |
      Analyze the selected code for performance bottlenecks.
      Suggest optimizations such as:
      - Algorithm improvements
      - Caching strategies
      - Memoization
      - Lazy loading
      - Batch processing

  - name: "Security Audit"
    description: "Security-focused code review"
    prompt: |
      Perform a security audit on the selected code.
      Check for:
      - SQL injection vulnerabilities
      - XSS risks
      - CSRF vulnerabilities
      - Insecure authentication
      - Sensitive data exposure
      - Insecure dependencies
      Provide remediation steps for any issues found.

# Documentation Indexing
docs:
  - startUrl: "https://react.dev/reference/react"
    maxDepth: 3
    favicon: "https://react.dev/favicon.ico"
    useLocalCrawling: false

  - startUrl: "https://www.typescriptlang.org/docs/"
    maxDepth: 2
    favicon: "https://www.typescriptlang.org/favicon.ico"

  - startUrl: "http://localhost:3001/internal-docs"
    maxDepth: 5
    useLocalCrawling: true  # Use local crawling for internal docs

# MCP Server Integrations
mcpServers:
  - name: "Company Database MCP"
    description: "Query production database (read-only)"
    command: "node"
    args:
      - "/path/to/db-mcp-server.js"
    env:
      DATABASE_URL: ${DATABASE_URL}
      READ_ONLY: "true"
    timeout: 10000

  - name: "JIRA Integration MCP"
    description: "Fetch JIRA tickets and create issues"
    command: "python"
    args:
      - "/path/to/jira-mcp-server.py"
    env:
      JIRA_URL: ${JIRA_URL}
      JIRA_TOKEN: ${JIRA_TOKEN}
    timeout: 5000
```

---

### 8.3 Environment Variable Reference

**Best Practice**: Store all secrets in environment variables, not in `config.yaml`

**Common Environment Variables:**

```bash
# LLM Provider API Keys
export OPENAI_API_KEY="sk-..."
export ANTHROPIC_API_KEY="sk-ant-..."
export MISTRAL_API_KEY="..."

# Database (for MCP servers)
export DATABASE_URL="postgresql://user:pass@host:5432/db"

# JIRA Integration
export JIRA_URL="https://company.atlassian.net"
export JIRA_TOKEN="..."

# AWS (for MCP servers)
export AWS_ACCESS_KEY_ID="..."
export AWS_SECRET_ACCESS_KEY="..."
export AWS_REGION="us-east-1"
```

**How to Reference in config.yaml:**
```yaml
apiKey: ${OPENAI_API_KEY}    # Replaced at runtime
```

---

### 8.4 Configuration Validation

**Common Configuration Errors:**

| Error | Cause | Fix |
|-------|-------|-----|
| "Invalid schema version" | `schema` field missing or wrong value | Set `schema: "v1"` |
| "Model 'X' not found" | Referencing undefined model | Check `models` array |
| "Environment variable not set" | `${VAR}` not in environment | Export variable in shell |
| "Invalid provider" | Typo in provider name | Use: `openai`, `anthropic`, `mistral`, `ollama` |
| "Role not supported" | Model doesn't support assigned role | Check model capabilities |

**Validation Command:**
```bash
# Validate your config.yaml
yamllint ~/.cody/config.yaml

# Test Cody config loading (if CLI available)
cody config validate
```

---

## 9. Development Workflow

### 9.1 Development Environment Setup

#### Prerequisites
- **Git** 2.30+
- **Node.js** 18+ (for build tooling)
- **Python** 3.9+ (optional, for backend work)
- **VS Code** or JetBrains IDE

#### Setup Steps

```bash
# 1. Clone repository
git clone https://github.com/syncfusion/cody-docs.git
cd cody-docs

# 2. Create your environment file
cp .env.example .env
nano .env  # Add your API keys

# 3. Install dependencies
npm install

# 4. Set up Cody config
mkdir -p ~/.cody
cp config.example.yaml ~/.cody/config.yaml
nano ~/.cody/config.yaml  # Configure with your API keys

# 5. Verify setup
git status
yamllint ~/.cody/config.yaml
```

---

### 9.2 Development Workflow

#### Typical Task Flow

```
1. Pick task from backlog (JIRA, GitHub Issues, etc.)
        ↓
2. Create feature branch
   git checkout -b feature/add-new-context-provider
        ↓
3. Make changes to documentation/code
   - Update relevant .md files
   - Add examples if needed
   - Update configuration schemas
        ↓
4. Test changes
   - Validate YAML syntax
   - Check markdown rendering
   - Test with actual Cody instance
        ↓
5. Commit changes
   git add .
   git commit -m "feat: add new context provider documentation"
        ↓
6. Push to remote
   git push origin feature/add-new-context-provider
        ↓
7. Create Pull Request
   - Fill out PR template
   - Request review from team
        ↓
8. Address review feedback
        ↓
9. Merge to main
        ↓
10. Deploy (automatic via CI/CD)
```

---

### 9.3 Git Workflow & Branch Strategy

#### Branch Naming Convention

```
feature/short-description     # New features
fix/bug-description           # Bug fixes
docs/what-changed             # Documentation updates
refactor/component-name       # Code refactoring
test/what-testing             # Test additions
```

#### Example Workflow

```bash
# Start new feature
git checkout main
git pull origin main
git checkout -b feature/add-mcp-server-docs

# Make changes
# ... edit files ...

# Commit with conventional commits
git add .
git commit -m "docs: add MCP server configuration examples"

# Push to remote
git push origin feature/add-mcp-server-docs

# Create PR via GitHub UI or gh CLI
gh pr create --title "Add MCP Server Documentation" --body "..."

# After review, merge
gh pr merge --squash
```

---

### 9.4 Code Review Guidelines

#### What Reviewers Look For

**Documentation Changes:**
- [ ] Accurate technical information
- [ ] Clear, concise writing
- [ ] Code examples are correct and tested
- [ ] Consistent formatting with existing docs
- [ ] No spelling/grammar errors
- [ ] Links are valid

**Configuration Changes:**
- [ ] Schema is backward compatible
- [ ] Environment variables used for secrets
- [ ] Validation logic is correct
- [ ] Examples are provided

**Architecture Changes:**
- [ ] Design is consistent with existing patterns
- [ ] Security implications considered
- [ ] Performance implications assessed
- [ ] Scalability considered

#### Review Response Time
- **Critical fixes**: 4 hours
- **Standard PRs**: 24 hours
- **Large features**: 48 hours

---

### 9.5 Testing Documentation Changes

#### Manual Testing

```bash
# 1. Validate YAML syntax
yamllint syncfusion-cody/reference/Configure-the-Cody.md

# 2. Validate markdown
markdownlint syncfusion-cody/**/*.md

# 3. Test actual config with Cody
# - Copy example config to ~/.cody/config.yaml
# - Start Cody in IDE
# - Verify behavior matches documentation

# 4. Check links
# - Install markdown-link-check
npm install -g markdown-link-check
markdown-link-check README.md
```

#### Example Test Scenario

```yaml
# Test: Model configuration with environment variables
# Expected: Cody loads config and successfully calls OpenAI API

models:
  - name: "Test GPT-4"
    provider: openai
    model: gpt-4o
    apiKey: ${OPENAI_API_KEY}
    roles:
      - chat

# Test Steps:
# 1. Set environment variable: export OPENAI_API_KEY="sk-..."
# 2. Load Cody with this config
# 3. Ask a question in Chat mode
# 4. Verify response is received
# 5. Expected Result: Success
```

---

### 9.6 Common Development Tasks

#### Task 1: Adding a New Configuration Property

```bash
# 1. Update schema documentation
# Edit: syncfusion-cody/reference/configure-properties/<property>.md

# 2. Add example to main config doc
# Edit: syncfusion-cody/reference/Configure-the-Cody.md

# 3. Add validation logic (if applicable)
# Note: Actual validation code is in Cody codebase, not this repo

# 4. Update architecture docs if needed
# Edit: ARCHITECTURE_REVIEW.md or TECHNICAL_DEEP_DIVE.md

# 5. Test with real config
# Create test config.yaml and verify in Cody

# 6. Commit
git add .
git commit -m "docs: add new configuration property X"
```

#### Task 2: Documenting a New Feature

```bash
# 1. Create feature documentation
# File: syncfusion-cody/features/NewFeature.md

# 2. Add to Welcome page
# Edit: syncfusion-cody/Welcome-to-Cody.md

# 3. Add screenshots
# Add to: syncfusion-cody/features/Feature_Images/

# 4. Update onboarding guide
# Edit: ENGINEER_ONBOARDING_GUIDE.md

# 5. Create usage examples

# 6. Test documentation flow (read as new user would)

# 7. Commit
git add .
git commit -m "docs: add documentation for new feature X"
```

#### Task 3: Updating Architecture Documentation

```bash
# 1. Make architectural changes (code, design)
# (Done in main Cody repo)

# 2. Update architecture diagrams
# Edit: ARCHITECTURE_DIAGRAMS.md

# 3. Update technical deep dive
# Edit: TECHNICAL_DEEP_DIVE.md

# 4. Update architecture analysis JSON
# Edit: architecture_analysis.json

# 5. Regenerate summaries if needed
# Edit: ARCHITECTURE_REVIEW.md, EXECUTIVE_SUMMARY.md

# 6. Commit
git add .
git commit -m "docs: update architecture for new component Y"
```

---

## 10. Deployment Process

### 10.1 Documentation Deployment

**Deployment Type**: Static documentation site

**Build System**: (Depends on your setup - examples below)

#### Option 1: GitHub Pages

```bash
# Automatic deployment on push to main
git push origin main
# GitHub Actions builds and deploys to https://syncfusion.github.io/cody-docs/
```

#### Option 2: Custom CI/CD

```bash
# .github/workflows/deploy.yml
name: Deploy Documentation

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Install dependencies
        run: npm install
      
      - name: Build documentation
        run: npm run build
      
      - name: Deploy to production
        run: |
          aws s3 sync ./build s3://docs.syncfusion.com/cody/
          aws cloudfront create-invalidation --distribution-id XXX
```

---

### 10.2 Cody Extension Deployment

**Note**: This repository only contains documentation. The actual Cody extension is deployed separately.

**Typical Cody Extension Release Process:**

```
1. Code changes merged to main (Cody repo)
        ↓
2. CI/CD runs tests
        ↓
3. Build extension package (.vsix for VS Code, .jar for JetBrains)
        ↓
4. Publish to extension marketplace
   - VS Code: https://marketplace.visualstudio.com/
   - JetBrains: https://plugins.jetbrains.com/
        ↓
5. Users receive auto-update in IDE
        ↓
6. Update release notes (this repo)
   syncfusion-cody/release-notes/vX.X.X.md
```

---

### 10.3 Versioning Strategy

**Documentation Versioning**: Follows Cody extension version

**Version Format**: Semantic Versioning (`MAJOR.MINOR.PATCH`)

- **MAJOR**: Breaking changes (e.g., config schema v2)
- **MINOR**: New features (e.g., new context provider)
- **PATCH**: Bug fixes, documentation updates

**Example:**
- `v0.1.0` - Initial release
- `v0.2.0` - Added Agent mode (new feature)
- `v0.2.1` - Fixed documentation typos (patch)
- `v1.0.0` - Stable release (breaking: new config schema)

---

### 10.4 Release Checklist

When releasing a new version:

- [ ] Update version in `config.example.yaml`
- [ ] Create release notes: `syncfusion-cody/release-notes/vX.X.X.md`
- [ ] Update CHANGELOG.md (if exists)
- [ ] Update version references in documentation
- [ ] Tag release in git: `git tag v1.2.3`
- [ ] Push tag: `git push origin v1.2.3`
- [ ] Create GitHub release with notes
- [ ] Announce in team Slack/Discord

---

### 10.5 Rollback Procedure

**If documentation has critical errors:**

```bash
# 1. Identify problematic commit
git log --oneline

# 2. Revert specific commit
git revert <commit-hash>

# 3. Push revert
git push origin main

# 4. CI/CD automatically redeploys

# Alternative: Rollback to previous tag
git checkout v1.2.2
git push origin main --force  # Use with caution
```

---

## 11. Common Troubleshooting

### 11.1 Configuration Issues

#### Problem: "Invalid API key" error

**Symptoms:**
```
Error: OpenAI API returned 401 Unauthorized
```

**Diagnosis:**
```bash
# Check if environment variable is set
echo $OPENAI_API_KEY

# Check config.yaml syntax
cat ~/.cody/config.yaml | grep apiKey
```

**Solution:**
```bash
# Set environment variable
export OPENAI_API_KEY="sk-..."

# Verify config references it correctly
apiKey: ${OPENAI_API_KEY}  # Correct
apiKey: sk-...             # INCORRECT (hardcoded)

# Restart Cody to reload config
```

---

#### Problem: "Model not found for role 'chat'"

**Symptoms:**
```
Error: No model configured for role 'chat'
```

**Diagnosis:**
```yaml
# Check models in config.yaml
models:
  - name: "GPT-4"
    provider: openai
    model: gpt-4o
    roles:
      - edit        # Missing 'chat' role!
      - autocomplete
```

**Solution:**
```yaml
# Add missing role
models:
  - name: "GPT-4"
    provider: openai
    model: gpt-4o
    roles:
      - chat        # Added
      - edit
      - autocomplete
```

---

#### Problem: "Context too large" error

**Symptoms:**
```
Error: Request exceeded maximum context length (128000 tokens)
```

**Diagnosis:**
- Too many context providers enabled
- Large files included in context
- Codebase search returning too many results

**Solution:**
```yaml
# Limit context providers
context:
  - type: codebase
    enabled: true
    maxResults: 10      # Reduced from 50
  
  - type: terminal
    enabled: true
    maxLines: 50        # Reduced from 200

# Or disable expensive providers temporarily
  - type: codebase
    enabled: false      # Disabled for now
```

---

### 11.2 Agent Mode Issues

#### Problem: Agent gets stuck in loop

**Symptoms:**
- Agent keeps retrying same action
- No progress after 5+ minutes

**Diagnosis:**
- Agent doesn't understand task
- Agent lacks necessary tools/permissions
- External API failure

**Solution:**
```
1. Cancel current agent run
2. Rephrase prompt more clearly:
   Bad: "Fix the bugs"
   Good: "Fix the TypeError in UserService.getUser() function"
3. Check agent has file access permissions
4. Verify external APIs are accessible
```

---

#### Problem: Permission prompt not appearing

**Symptoms:**
- Agent says "waiting for permission" but no prompt shown

**Diagnosis:**
- Permission UI blocked by IDE
- Permission system misconfigured

**Solution:**
```
1. Check IDE notification settings
2. Restart IDE
3. Check Cody extension logs for errors
4. Try restarting agent request
```

---

### 11.3 Performance Issues

#### Problem: Slow autocomplete suggestions

**Symptoms:**
- Autocomplete takes >2 seconds
- Suggestions feel laggy

**Diagnosis:**
```yaml
# Check autocomplete model configuration
models:
  - name: "GPT-4"        # Problem: GPT-4 is slow for autocomplete
    provider: openai
    model: gpt-4o
    roles:
      - autocomplete
```

**Solution:**
```yaml
# Use faster model for autocomplete
models:
  - name: "GPT-3.5 Turbo"  # Much faster
    provider: openai
    model: gpt-3.5-turbo
    roles:
      - autocomplete
    defaultCompletionOptions:
      temperature: 0.3
      maxTokens: 300        # Lower for speed
```

---

#### Problem: High API costs

**Symptoms:**
- Monthly OpenAI bill is very high
- Need to reduce costs

**Diagnosis:**
- Using GPT-4 for all operations (expensive)
- Context too large (more tokens = higher cost)
- Autocomplete using expensive model

**Solution:**
```yaml
# Cost optimization strategy
models:
  # Use GPT-4 only for complex tasks
  - name: "GPT-4"
    provider: openai
    model: gpt-4o
    roles:
      - agent          # Only for agent mode
    priority: 1

  # Use GPT-3.5 for cheaper operations
  - name: "GPT-3.5"
    provider: openai
    model: gpt-3.5-turbo
    roles:
      - chat           # Cheaper for chat
      - edit
      - autocomplete
    priority: 2

  # Use local Ollama for development
  - name: "Ollama Local"
    provider: ollama
    baseUrl: "http://localhost:11434"
    model: mistral
    roles:
      - chat
    priority: 3        # Fallback (free)

# Also: Reduce context size
context:
  - type: codebase
    enabled: true
    maxResults: 10     # Reduced
```

---

### 11.4 Documentation Issues

#### Problem: Example in documentation doesn't work

**Symptoms:**
- Copy-pasted example from docs fails

**Steps:**
```
1. Check example syntax carefully
2. Verify you're using correct version of Cody
3. Check if example uses environment variables
4. Try simplest possible version first
5. Report issue to team (might be doc bug)
```

---

#### Problem: Can't find information in documentation

**Navigation Guide:**

| What you need | Where to find it |
|---------------|------------------|
| "How do I configure X?" | `syncfusion-cody/reference/Configure-the-Cody.md` |
| "How do I use feature Y?" | `syncfusion-cody/features/Y.md` |
| "What's the architecture?" | `ARCHITECTURE_REVIEW.md` or `TECHNICAL_DEEP_DIVE.md` |
| "How do I set up dev environment?" | `DEVELOPMENT_SETUP.md` |
| "What are the API endpoints?" | `API_REFERENCE.md` |
| "Quick overview of everything?" | `README.md` or `QUICK_START.md` |

---

### 11.5 Getting Help

#### Internal Resources

1. **Documentation** (this repo)
   - Start with `README.md` or `QUICK_START.md`
   - Search documentation: `grep -r "your search term" .`

2. **Team Chat**
   - Slack: #cody-support
   - Discord: #engineering-help

3. **Architecture Office Hours**
   - Weekly: Fridays 2pm-3pm
   - Ask senior engineers about design decisions

4. **Code Review**
   - Tag experienced team members in PRs
   - They can explain context and rationale

#### External Resources

5. **LLM Provider Documentation**
   - [OpenAI API Docs](https://platform.openai.com/docs)
   - [Anthropic Claude Docs](https://docs.anthropic.com/)
   - [Mistral AI Docs](https://docs.mistral.ai/)

6. **IDE Extension APIs**
   - [VS Code Extension API](https://code.visualstudio.com/api)
   - [JetBrains Plugin SDK](https://plugins.jetbrains.com/docs/intellij/)

---

## 12. Resources & Next Steps

### 12.1 Essential Reading (Prioritized)

#### First Week (Must Read)

| Document | Purpose | Time |
|----------|---------|------|
| `README.md` | Project overview | 5 min |
| `QUICK_START.md` | Quick reference | 10 min |
| `DEVELOPMENT_SETUP.md` | Set up your environment | 30 min |
| This guide | Complete onboarding | 60 min |
| `syncfusion-cody/Welcome-to-Cody.md` | User-facing intro | 10 min |
| `syncfusion-cody/reference/Configure-the-Cody.md` | Configuration deep dive | 20 min |

**Total Time**: ~2.5 hours

#### First Month (Should Read)

| Document | Purpose | Time |
|----------|---------|------|
| `ARCHITECTURE_REVIEW.md` | Complete architecture assessment | 30 min |
| `TECHNICAL_DEEP_DIVE.md` | Advanced technical details | 45 min |
| `API_REFERENCE.md` | API specifications | 20 min |
| `ACTIONABLE_RECOMMENDATIONS.md` | Roadmap and improvements | 25 min |
| All feature docs in `syncfusion-cody/features/` | Feature specifications | 40 min |

**Total Time**: ~3 hours

#### Ongoing (Reference Material)

- `ARCHITECTURE_DIAGRAMS.md` - Visual architecture reference
- `architecture_analysis.json` - Machine-readable system data
- Individual property docs in `syncfusion-cody/reference/configure-properties/`

---

### 12.2 Learning Path

#### Level 1: Documentation Contributor (Week 1-2)
**Goal**: Update and improve documentation

**Skills to Learn:**
- Markdown formatting
- YAML syntax
- Git workflow
- Documentation standards

**First Tasks:**
- Fix typos in documentation
- Add missing examples to configuration docs
- Update screenshots
- Improve clarity of existing docs

---

#### Level 2: Configuration Expert (Week 3-4)
**Goal**: Master configuration system

**Skills to Learn:**
- YAML schema design
- Environment variable management
- Model selection strategies
- Context provider optimization

**Practice Tasks:**
- Create complex multi-model configurations
- Design team-wide configuration standards
- Optimize configuration for performance/cost
- Troubleshoot configuration issues

---

#### Level 3: Feature Specialist (Month 2)
**Goal**: Deep expertise in one feature area

**Choose a specialization:**
- **Chat Mode** - Conversational AI, context aggregation
- **Edit Mode** - Diff generation, code transformation
- **Agent Mode** - Autonomous execution, tool use
- **Autocomplete** - Real-time suggestions, performance

**Study:**
- Read all documentation for your chosen feature
- Understand implementation architecture
- Study LLM prompt engineering for that feature
- Identify improvement opportunities

---

#### Level 4: Architecture Contributor (Month 3+)
**Goal**: Contribute to architectural decisions

**Skills to Learn:**
- System design patterns
- Scalability considerations
- Security best practices
- LLM integration patterns

**Contributions:**
- Propose architectural improvements
- Design new features
- Lead refactoring efforts
- Mentor new engineers

---

### 12.3 Key Contacts

| Role | Name | Slack/Email | Expertise |
|------|------|-------------|-----------|
| **Tech Lead** | [Name] | @techlead | Architecture, roadmap |
| **Product Manager** | [Name] | @pm | Features, priorities |
| **Senior Engineer** | [Name] | @senior-eng | Implementation, code review |
| **DevOps** | [Name] | @devops | Deployment, CI/CD |
| **Security** | [Name] | @security | Security review, credentials |
| **Documentation Lead** | [Name] | @docs | Documentation standards |

---

### 12.4 Useful Commands Reference

```bash
# Git
git status                                  # Check current state
git checkout -b feature/my-feature          # Create feature branch
git commit -m "type: message"               # Commit with convention
git push origin feature/my-feature          # Push to remote
gh pr create                                # Create PR (GitHub CLI)

# YAML Validation
yamllint config.yaml                        # Validate YAML syntax
python -m yaml config.yaml                  # Parse YAML in Python

# Markdown
markdownlint **/*.md                        # Lint all markdown files
markdown-link-check README.md               # Check for broken links

# Search
grep -r "search term" .                     # Search all files
grep -r "apiKey" syncfusion-cody/           # Find all apiKey references

# Environment
export OPENAI_API_KEY="sk-..."              # Set API key
env | grep API                              # List all API-related env vars

# Testing
npm test                                    # Run tests (if applicable)
npm run lint                                # Run linter
npm run build                               # Build documentation site
```

---

### 12.5 Next Steps Checklist

**Your First Day:**
- [ ] Read this entire onboarding guide
- [ ] Set up development environment (see Section 9.1)
- [ ] Clone repository and explore structure
- [ ] Configure Cody with your API keys
- [ ] Test Cody in your IDE with simple prompts
- [ ] Introduce yourself in team Slack/Discord
- [ ] Schedule 1:1 with your manager

**Your First Week:**
- [ ] Read all "First Week" documents (Section 12.1)
- [ ] Pick up first documentation task (fix typo, add example)
- [ ] Create your first PR and get it reviewed
- [ ] Attend team standup/meeting
- [ ] Set up paired programming session with senior engineer
- [ ] Explore codebase and ask questions
- [ ] Document what confused you (improve docs for next person!)

**Your First Month:**
- [ ] Complete Level 1 & Level 2 learning paths (Section 12.2)
- [ ] Contribute to 5+ PRs (documentation or code)
- [ ] Choose feature specialization
- [ ] Deep dive into chosen feature area
- [ ] Identify one improvement opportunity in your area
- [ ] Present your findings to team

**Your First Quarter:**
- [ ] Become Level 3 Feature Specialist
- [ ] Lead implementation of a feature improvement
- [ ] Mentor a new engineer
- [ ] Contribute to architectural discussions
- [ ] Write a technical blog post or internal doc about your learnings

---

## Conclusion

Welcome to the Syncfusion Cody team! This guide has covered:

✅ **Project purpose** - AI-powered IDE extension for developer productivity  
✅ **Business workflow** - Four interaction modes (Chat, Edit, Agent, Autocomplete)  
✅ **Repository structure** - Documentation organization and key files  
✅ **System architecture** - Layered design with pluggable components  
✅ **Key modules** - Configuration, Models, Context, Rules, Agent, MCP  
✅ **API endpoints** - LLM provider APIs and IDE integration  
✅ **Database schema** - Configuration and cache data models  
✅ **Configuration system** - YAML-based declarative configuration  
✅ **Development workflow** - Git workflow, testing, code review  
✅ **Deployment process** - CI/CD, versioning, releases  
✅ **Troubleshooting** - Common issues and solutions  
✅ **Resources** - Reading list, learning path, next steps  

**You are now ready to contribute to Syncfusion Cody!** 🚀

**Questions?** Ask in #cody-support on Slack or reach out to your manager.

**Feedback on this guide?** Create a PR to improve it for the next engineer!

---

**Document Metadata**
- **Version**: 2.0
- **Last Updated**: 2024
- **Maintained By**: Engineering Team
- **Next Review**: Quarterly
