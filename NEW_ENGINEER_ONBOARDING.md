# 🚀 Syncfusion Cody - Complete New Engineer Onboarding Guide

**Welcome to the team!** This comprehensive guide will get you up to speed on Syncfusion Cody's architecture, codebase, and development workflow.

**Last Updated:** 2024  
**Version:** 2.0  
**Estimated Reading Time:** 60-90 minutes

---

## 📋 Table of Contents

1. [Project Overview](#1-project-overview)
2. [Business Workflow](#2-business-workflow)
3. [Repository Structure](#3-repository-structure)
4. [System Architecture](#4-system-architecture)
5. [Key Modules & Components](#5-key-modules--components)
6. [API Endpoints & Interfaces](#6-api-endpoints--interfaces)
7. [Database Schema](#7-database-schema)
8. [Configuration System](#8-configuration-system)
9. [Deployment Process](#9-deployment-process)
10. [Development Workflow](#10-development-workflow)
11. [Common Troubleshooting](#11-common-troubleshooting)
12. [Quick Reference](#12-quick-reference)

---

## 1. Project Overview

### 1.1 What is Syncfusion Cody?

**Syncfusion Cody** is a next-generation **AI-powered IDE extension** that revolutionizes developer productivity by combining:

- 🤖 **AI-Powered Assistance** — Real-time code suggestions, explanations, and autonomous task execution
- 📝 **Multi-Modal Interaction** — Four distinct modes: Chat, Edit, Agent, and Autocomplete
- 🧩 **Syncfusion Integration** — Deep integration with Syncfusion's comprehensive component library
- ⚙️ **Configuration-Driven** — YAML-based, declarative configuration system
- 🔌 **Extensibility** — Pluggable context providers and MCP (Model Context Protocol) server support

### 1.2 Project Purpose

Syncfusion Cody exists to **eliminate developer friction** by:

1. **Automating Repetitive Tasks**
   - UI component generation
   - Bug fixing and refactoring
   - Documentation generation
   - Test creation

2. **Providing Context-Aware Intelligence**
   - Deep understanding of your entire codebase
   - Relevant code suggestions based on project patterns
   - Intelligent file and symbol search

3. **Maintaining Developer Control**
   - Permission-gated autonomous operations
   - Accept/reject workflows for all changes
   - Transparent AI decision-making

4. **Supporting Multiple LLM Providers**
   - OpenAI (GPT-4, GPT-3.5)
   - Anthropic Claude
   - Mistral AI
   - Ollama (local models)
   - Custom OpenAI-compatible endpoints

5. **Integrating Seamlessly**
   - Works within existing IDEs (VS Code, JetBrains, Neovim)
   - No context switching required
   - Natural keyboard-driven workflow

### 1.3 Key Statistics

| Metric | Value |
|--------|-------|
| **Architecture Quality** | ⭐⭐⭐⭐ (4/5) - Excellent configuration-driven design |
| **Lines of Documentation** | ~200 KB across organized modules |
| **Supported Providers** | OpenAI, Ollama, Mistral, Anthropic, Custom |
| **Context Providers** | 10+ pluggable sources (code, docs, diff, terminal, etc.) |
| **Feature Modes** | 4 distinct user interaction patterns |
| **Design Patterns Used** | 11 architectural patterns identified |
| **Components** | 13 major components documented |

### 1.4 Business Value

| Dimension | Impact |
|-----------|--------|
| **Productivity** | 2-3x faster code generation and bug fixes |
| **Quality** | AI-assisted code review and testing |
| **Learning** | Contextual explanations and best practices |
| **Scalability** | Works across teams and projects |
| **Cost Efficiency** | Reduce time spent on repetitive tasks |

### 1.5 Current Status & Roadmap

**Current Version:** v1.0 (Production-ready with conditional approval)

**Status:** 🟡 Requires security hardening before enterprise deployment

**Roadmap:**

| Phase | Timeline | Goals |
|-------|----------|-------|
| **Phase 1: Security** | Week 1-2 | Credential management, input validation |
| **Phase 2: Reliability** | Week 3-4 | Error handling framework, fallback strategies |
| **Phase 3: Scalability** | Week 5-6 | Token budgeting, configuration composition |
| **Phase 4: Enterprise** | Week 7-10 | Multi-tenancy, audit trails, RBAC |
| **Phase 5: Ecosystem** | Week 11-12 | Plugin marketplace, analytics dashboard |

---

## 2. Business Workflow

### 2.1 End-to-End User Journey

```
┌─────────────────────────────────────────────────┐
│ Developer Opens IDE (VS Code, IntelliJ, etc.)   │
└────────────────────┬────────────────────────────┘
                     ↓
        ┌────────────────────────────┐
        │  Select Feature Mode        │
        ├────────────────────────────┤
        │ • Chat (Cmd+L)             │
        │ • Edit (Cmd+I)             │
        │ • Agent (autonomous)       │
        │ • Autocomplete (inline)    │
        └────────┬───────────────────┘
                 ↓
        ┌────────────────────────────┐
        │  Send Request/Context      │
        ├────────────────────────────┤
        │ • User prompt              │
        │ • Code selection           │
        │ • File context             │
        └────────┬───────────────────┘
                 ↓
        ┌────────────────────────────┐
        │  Cody Processing           │
        ├────────────────────────────┤
        │ • Load config.yaml         │
        │ • Select model by role     │
        │ • Aggregate context        │
        │ • Apply rules              │
        │ • Invoke LLM               │
        └────────┬───────────────────┘
                 ↓
        ┌────────────────────────────┐
        │  Response & Actions        │
        ├────────────────────────────┤
        │ • Stream response          │
        │ • Show inline diff         │
        │ • Request permissions      │
        │ • Execute tools            │
        └────────┬───────────────────┘
                 ↓
        ┌────────────────────────────┐
        │  Developer Review          │
        ├────────────────────────────┤
        │ • Accept/Reject changes    │
        │ • Grant/Deny permissions   │
        │ • Iterate if needed        │
        └────────┬───────────────────┘
                 ↓
        ┌────────────────────────────┐
        │  Apply to Codebase         │
        └────────────────────────────┘
```

### 2.2 Four Primary Feature Modes

#### Mode 1: Chat Mode — Conversational AI Assistance

**Purpose:** Natural language interaction with AI assistant for questions, explanations, and discussions.

**Invocation:** `Cmd+L` (Mac) / `Ctrl+L` (Windows)

**Workflow:**
```
Developer Question → Code Selection (optional) → Chat Panel
    ↓
Model Selection (chat role) → Context Aggregation
    ↓
Rules Applied → LLM Invoked → Streaming Response
    ↓
Display in Chat Panel → Multi-turn Conversation
```

**Use Cases:**
- "Explain this function"
- "How do I implement authentication?"
- "What's the best way to structure this component?"
- "Review this code for bugs"

**Key Features:**
- Context-aware responses
- Multi-turn conversation memory
- Code snippet generation
- Markdown formatting support

---

#### Mode 2: Edit Mode — Targeted Code Modifications

**Purpose:** AI-assisted code changes with inline review and accept/reject workflow.

**Invocation:** `Cmd+I` (Mac) / `Ctrl+I` (Windows)

**Workflow:**
```
Developer Highlights Code → Specifies Changes (text)
    ↓
Edit Mode Handler → Model Selection (edit role)
    ↓
Context + Rules → LLM Generates Diff
    ↓
Display Inline Diff → Developer Reviews
    ↓
Accept/Reject (per change or batch) → Apply Edits
```

**Use Cases:**
- "Refactor this to use async/await"
- "Add error handling"
- "Convert to TypeScript"
- "Add JSDoc comments"

**Key Features:**
- Visual diff preview
- Accept/reject per change
- Batch operations
- Undo support

---

#### Mode 3: Agent Mode — Autonomous Task Execution

**Purpose:** Autonomous AI assistant that independently explores code, plans updates, and completes complex multi-step tasks.

**Invocation:** Activated via chat or custom prompt

**6-Step Workflow:**

```
┌─────────────────────────────────────────────────┐
│ Step 1: UNDERSTAND REQUEST                      │
│ ├─ Parse task requirements                      │
│ └─ Extract goals and constraints                │
└─────────────────┬───────────────────────────────┘
                  ↓
┌─────────────────────────────────────────────────┐
│ Step 2: EXPLORE CODEBASE                        │
│ ├─ Search for relevant files                    │
│ ├─ Analyze dependencies                         │
│ └─ Understand existing patterns                 │
└─────────────────┬───────────────────────────────┘
                  ↓
┌─────────────────────────────────────────────────┐
│ Step 3: PLAN CHANGES                            │
│ ├─ Break task into sub-tasks                    │
│ ├─ Design implementation strategy               │
│ └─ Identify affected files                      │
└─────────────────┬───────────────────────────────┘
                  ↓
┌─────────────────────────────────────────────────┐
│ Step 4: EXECUTE CHANGES                         │
│ ├─ [PERMISSION GATE] ← User approval required   │
│ ├─ File operations (read/write/create)          │
│ ├─ Code transformations                         │
│ └─ Terminal command execution                   │
└─────────────────┬───────────────────────────────┘
                  ↓
┌─────────────────────────────────────────────────┐
│ Step 5: VERIFY RESULTS                          │
│ ├─ Run tests                                    │
│ ├─ Check compilation                            │
│ └─ Validate output                              │
└─────────────────┬───────────────────────────────┘
                  ↓
┌─────────────────────────────────────────────────┐
│ Step 6: TASK COMPLETE                           │
│ ├─ Summarize changes made                       │
│ ├─ Report any issues                            │
│ └─ Hand back control to developer               │
└─────────────────────────────────────────────────┘
```

**Use Cases:**
- "Add unit tests for UserService"
- "Create a dark mode toggle in settings"
- "Refactor all API calls to use new error handling"
- "Generate API documentation from code comments"

**Tool Access:**
- File read/write/create
- Terminal command execution
- Codebase search (ripgrep, semantic)
- Diff generation
- Git operations

**Safety Mechanism:**
- Explicit permission required before each tool execution
- User can grant/deny at each step
- Transparent action logging

---

#### Mode 4: Autocomplete Mode — Real-Time Code Suggestions

**Purpose:** Real-time inline code suggestions as developers type.

**Activation:** Configured via `autocomplete` role in `config.yaml`

**Workflow:**
```
Developer Types Code
    ↓
Autocomplete Handler Triggered (debounced)
    ↓
Context Gathered (current file, cursor position, recent edits)
    ↓
Model Invoked (fast inference required)
    ↓
Suggestions Displayed Inline (ghost text)
    ↓
Developer: Tab (accept) | Esc (reject) | Cmd/Ctrl+→ (word-by-word)
```

**Use Cases:**
- Function implementations
- Import statements
- Boilerplate code
- API pattern discovery

**Performance Requirements:**
- Low latency (<500ms)
- Fast inference models (GPT-3.5-turbo, Codestral, etc.)
- Minimal context to reduce payload

**Key Features:**
- Context-aware suggestions
- Multi-line completions
- Syntax highlighting
- Non-intrusive UX

---

### 2.3 How Components Work Together

```
User Action (Chat/Edit/Agent/Autocomplete)
    ↓
┌─────────────────────────────────────────────────┐
│ Configuration System Loads config.yaml          │
│ ├─ Parse YAML                                   │
│ ├─ Resolve environment variables                │
│ └─ Validate schema                              │
└─────────────────┬───────────────────────────────┘
                  ↓
┌─────────────────────────────────────────────────┐
│ Model Manager Selects LLM by Role              │
│ ├─ Filter models by role (chat/edit/etc)       │
│ ├─ Check capabilities (tool_use, image_input)  │
│ └─ Select highest priority model               │
└─────────────────┬───────────────────────────────┘
                  ↓
┌─────────────────────────────────────────────────┐
│ Context Aggregator Gathers Data                │
│ ├─ File provider (current file content)        │
│ ├─ Code provider (selected code snippets)      │
│ ├─ Codebase provider (semantic search)         │
│ ├─ Docs provider (indexed documentation)       │
│ ├─ Diff provider (git diff)                    │
│ ├─ Terminal provider (recent output)           │
│ └─ Custom providers (HTTP, MCP, etc)           │
└─────────────────┬───────────────────────────────┘
                  ↓
┌─────────────────────────────────────────────────┐
│ Rules Engine Applies Constraints                │
│ ├─ Load global rules                            │
│ ├─ Apply file-scoped rules (glob matching)     │
│ └─ Compose system message                       │
└─────────────────┬───────────────────────────────┘
                  ↓
┌─────────────────────────────────────────────────┐
│ LLM Request Builder Constructs Payload          │
│ {                                                │
│   "system": "[rules]\n\n[context]",             │
│   "messages": [{"role": "user", "content": "..."}],
│   "model": "gpt-4o",                            │
│   "temperature": 0.7,                           │
│   "max_tokens": 2000                            │
│ }                                                │
└─────────────────┬───────────────────────────────┘
                  ↓
┌─────────────────────────────────────────────────┐
│ LLM Provider API (OpenAI/Mistral/etc)          │
│ ├─ Send HTTP POST request                      │
│ ├─ Handle streaming response                   │
│ └─ Parse completion                             │
└─────────────────┬───────────────────────────────┘
                  ↓
┌─────────────────────────────────────────────────┐
│ Response Processor                              │
│ ├─ Parse LLM output                             │
│ ├─ Extract code blocks                          │
│ ├─ Generate diffs (Edit mode)                  │
│ └─ Execute tools (Agent mode, with permission)  │
└─────────────────┬───────────────────────────────┘
                  ↓
┌─────────────────────────────────────────────────┐
│ IDE Integration Layer                           │
│ ├─ Render chat response                         │
│ ├─ Display inline diff                          │
│ ├─ Show permission prompts                      │
│ └─ Apply code changes                           │
└─────────────────────────────────────────────────┘
```

---

## 3. Repository Structure

### 3.1 Top-Level Directory Layout

```
syncfusion-code-studio-docs/
├── .git/                           # Git repository metadata
├── .gitignore                      # Git ignore patterns
│
├── README.md                       # Repository overview
│
├── syncfusion-cody/                # Main documentation directory
│   ├── Welcome-to-Cody.md          # Introduction & getting started
│   ├── features/                   # Feature-specific documentation
│   │   ├── Agent.md                # Agent mode documentation
│   │   ├── Autocomplete.md         # Autocomplete documentation
│   │   ├── Chat.md                 # Chat mode documentation
│   │   ├── Edit.md                 # Edit mode documentation
│   │   └── Feature_Images/         # Screenshots & diagrams
│   ├── get-started/                # Installation & setup guides
│   │   ├── Mac.md                  # macOS setup instructions
│   │   ├── Windows.md              # Windows setup instructions
│   │   └── getting_started_image/  # Installation screenshots
│   └── reference/                  # Technical reference docs
│       ├── Configure-the-Cody.md   # Configuration overview
│       ├── reference_images/       # Reference diagrams
│       └── configure-properties/   # Configuration property details
│           ├── context.md          # Context provider configuration
│           ├── docs.md             # Documentation indexing config
│           ├── models.md           # Model configuration
│           ├── mcpServers.md       # MCP server configuration
│           ├── prompts.md          # Custom prompts configuration
│           └── rules.md            # Rules configuration
│
├── API_REFERENCE.md                # Complete API documentation
├── ARCHITECTURE_DIAGRAMS.md        # System architecture diagrams
├── ARCHITECTURE_REVIEW_*.md        # Multiple architecture review docs
├── TECHNICAL_DEEP_DIVE.md          # Technical implementation details
├── ENGINEER_ONBOARDING_GUIDE.md    # Existing onboarding guide
├── DEVELOPMENT_SETUP.md            # Development environment setup
├── ONBOARDING.md                   # Alternative onboarding guide
│
├── QUICK_START.md                  # Quick reference guide
├── QUICK_REFERENCE.md              # Command & config quick reference
│
├── ACTIONABLE_RECOMMENDATIONS.md   # Improvement recommendations
├── IMPLEMENTATION_ACTION_PLAN.md   # Implementation roadmap
│
└── architecture_analysis.json      # Machine-readable architecture data
```

### 3.2 Key Documentation Files

| File | Purpose | Audience |
|------|---------|----------|
| `README.md` | Repository overview | Everyone |
| `syncfusion-cody/Welcome-to-Cody.md` | Introduction to Cody | New users |
| `syncfusion-cody/features/*.md` | Feature-specific guides | Users & developers |
| `syncfusion-cody/reference/Configure-the-Cody.md` | Configuration guide | Administrators |
| `syncfusion-cody/reference/configure-properties/*.md` | Property details | Advanced users |
| `API_REFERENCE.md` | API documentation | Developers |
| `ARCHITECTURE_DIAGRAMS.md` | System architecture | Architects |
| `TECHNICAL_DEEP_DIVE.md` | Implementation details | Senior engineers |
| `ENGINEER_ONBOARDING_GUIDE.md` | Onboarding guide | New team members |
| `DEVELOPMENT_SETUP.md` | Development environment | Contributors |

### 3.3 Documentation Organization Philosophy

This repository follows a **user-journey-driven documentation structure**:

1. **Get Started** (`get-started/`) — First-time installation
2. **Features** (`features/`) — How to use each mode
3. **Reference** (`reference/`) — Configuration and API details
4. **Architecture** (root) — System design for developers

---

## 4. System Architecture

### 4.1 Architectural Pattern

Syncfusion Cody implements a **Configuration-Driven Hub-and-Spoke Architecture**:

```
                    ┌─────────────────┐
                    │  config.yaml    │
                    │ (Single Source  │
                    │   of Truth)     │
                    └────────┬────────┘
                             │
          ┌──────────────────┼──────────────────┐
          │                  │                  │
          ▼                  ▼                  ▼
  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐
  │   MODELS     │  │   CONTEXT    │  │    RULES     │
  │              │  │  PROVIDERS   │  │              │
  ├──────────────┤  ├──────────────┤  ├──────────────┤
  │• OpenAI      │  │• file        │  │• System msg  │
  │• Anthropic   │  │• code        │  │• Glob-match  │
  │• Mistral     │  │• codebase    │  │• File-scoped │
  │• Ollama      │  │• docs        │  │              │
  │              │  │• diff        │  │              │
  │ Roles:       │  │• http        │  │              │
  │ chat/edit/   │  │• folder      │  │              │
  │ complete/    │  │• terminal    │  │              │
  │ apply/embed  │  │• problems    │  │              │
  │              │  │• helpbot     │  │              │
  └────────┬─────┘  └────────┬─────┘  └────────┬─────┘
           │                 │                 │
           └─────────────────┼─────────────────┘
                             │
                ┌────────────▼──────────────┐
                │  LLM REQUEST PIPELINE     │
                │ Model + Context + Rules   │
                │ → Prompt Builder          │
                └────────────┬──────────────┘
                             │
      ┌──────────┬───────────┼───────────┬──────────┐
      │          │           │           │          │
      ▼          ▼           ▼           ▼          ▼
  ┌─────┐  ┌────────┐  ┌─────┐  ┌──────┐  ┌────────┐
  │CHAT │  │  EDIT  │  │AGENT│  │ AUTO │  │PROMPTS │
  │MODE │  │  MODE  │  │MODE │  │COMP  │  │& DOCS  │
  └──┬──┘  └───┬────┘  └──┬──┘  └──┬───┘  └───┬────┘
     │         │          │        │          │
     └─────────┴──────────┴────────┴──────────┴────────┐
                                                         │
                                  ┌──────────────────────▼──┐
                                  │  IDE INTEGRATION LAYER  │
                                  ├─────────────────────────┤
                                  │• Code Editor            │
                                  │• File Operations        │
                                  │• Terminal Bridge        │
                                  │• Permission Gates       │
                                  └─────────────────────────┘
```

**Key Principles:**

1. **Configuration-Driven:** All behavior defined in `config.yaml`
2. **Single Source of Truth:** Configuration is the central hub
3. **Hub-and-Spoke:** Features (spokes) pull from config (hub)
4. **Composition Over Inheritance:** Components compose into request pipeline
5. **Role-Based Dispatch:** Models selected by role metadata, not hardcoded
6. **Provider Abstraction:** Pluggable interfaces for models, context, and tools

### 4.2 Layered Architecture

```
┌───────────────────────────────────────────────────────────┐
│                    PRESENTATION LAYER                      │
│  IDE UI (VS Code, JetBrains, etc.)                        │
│  ├─ Chat Panel                                             │
│  ├─ Edit Inline Diff View                                 │
│  ├─ Agent Progress Monitor                                 │
│  └─ Autocomplete Suggestions                               │
└─────────────────────┬─────────────────────────────────────┘
                      │
┌─────────────────────▼─────────────────────────────────────┐
│               ORCHESTRATION LAYER                          │
│  Cody Engine Core                                          │
│  ├─ Configuration Manager (loads config.yaml)             │
│  ├─ Request Router (routes to Chat/Edit/Agent/Auto)      │
│  ├─ Feature Controllers (handlers for each mode)          │
│  └─ Response Processor (parse LLM output)                 │
└─────────────────────┬─────────────────────────────────────┘
                      │
┌─────────────────────▼─────────────────────────────────────┐
│                  SERVICE LAYER                             │
│  Core Services                                             │
│  ├─ Model Manager (LLM provider abstraction)              │
│  ├─ Context Aggregator (data source integration)          │
│  ├─ Rules Engine (behavioral constraints)                 │
│  ├─ Prompt Builder (message composition)                  │
│  └─ Tool Executor (Agent mode tool calls)                 │
└─────────────────────┬─────────────────────────────────────┘
                      │
┌─────────────────────▼─────────────────────────────────────┐
│               INTEGRATION LAYER                            │
│  External Integrations                                     │
│  ├─ LLM Provider APIs (OpenAI, Mistral, Anthropic, etc.) │
│  ├─ File System Bridge (read/write files)                │
│  ├─ Terminal Executor (run commands)                      │
│  ├─ Git Bridge (version control)                          │
│  └─ MCP Servers (external tools via protocol)            │
└───────────────────────────────────────────────────────────┘
```

### 4.3 Design Patterns Used

| Pattern | Where Used | Purpose |
|---------|------------|---------|
| **Strategy** | Model providers | Select LLM provider at runtime |
| **Factory** | Context providers | Create providers based on type |
| **Builder** | Message composition | Construct complex LLM requests |
| **Chain of Responsibility** | Agent workflow | 6-step execution pipeline |
| **Adapter** | MCP integration | Adapt external tools to unified interface |
| **Observer** | Keyboard shortcuts | Event-driven mode activation |
| **Singleton** | Configuration | Single config instance per session |
| **Facade** | IDE integration | Simplify complex IDE APIs |
| **Proxy** | Permission gates | Control access to dangerous operations |
| **Decorator** | Context enrichment | Add layers of context dynamically |
| **Template Method** | Feature handlers | Shared flow with mode-specific steps |

---

## 5. Key Modules & Components

### 5.1 Core Services (9 Services)

#### 1. Configuration System

**Location:** Core engine  
**Type:** YAML-based declarative configuration  
**File:** `config.yaml` (user-editable)

**Purpose:** Central hub for all Cody behavior

**Configuration Sections:**
```yaml
name: "My Cody Config"          # Configuration identifier
version: "1.0.0"                # Semantic version
schema: "v1"                    # Schema version

models:                         # LLM configurations
  - name: "GPT-4"
    provider: openai
    model: gpt-4o
    roles: [chat, edit]

context:                        # Context provider definitions
  - provider: file
  - provider: codebase
    params:
      nFinal: 10

rules:                          # Behavioral constraints
  - "Always use TypeScript"
  - name: "React patterns"
    rule: "Use functional components"
    globs: "**/*.tsx"

prompts:                        # Custom prompt templates
  - name: "Generate Tests"
    description: "Create unit tests"
    prompt: "Write comprehensive tests for {{selection}}"

docs:                           # Documentation indexing
  - startUrl: "https://docs.example.com"
    maxDepth: 3

mcpServers:                     # MCP protocol servers
  - name: "database"
    command: "mcp-database"
    args: ["--port", "3000"]
```

**Loading Process:**
1. Load YAML from file
2. Resolve environment variables (`${VAR}`)
3. Validate against schema
4. Cache in memory

**⚠️ Known Issue:** No schema validation implemented (security risk)

---

#### 2. Model Management Service

**Purpose:** Unified interface to multiple LLM providers

**Supported Providers:**
- **OpenAI** (GPT-4, GPT-4o, GPT-3.5-turbo)
- **Anthropic** (Claude 3 Opus, Sonnet, Haiku)
- **Mistral** (Mistral Large, Codestral)
- **Ollama** (Local/self-hosted models)
- **Custom** (Any OpenAI-compatible API via `apiBase`)

**Role-Based Dispatch (6 Roles):**

| Role | Purpose | Example Models |
|------|---------|----------------|
| `chat` | Chat mode conversations | GPT-4, Claude 3 Opus |
| `edit` | Targeted code modifications | GPT-4o, Mistral Large |
| `autocomplete` | Real-time inline suggestions | GPT-3.5-turbo, Codestral |
| `apply` | Apply changes to code | GPT-4 |
| `embed` | Generate embeddings for semantic search | text-embedding-3-small |
| `rerank` | Rank search results by relevance | Custom reranking models |

**Capabilities (Overridable):**
- `tool_use` — MCP tool support (function calling)
- `image_input` — Vision capabilities (analyze screenshots)

**Configuration Example:**
```yaml
models:
  - name: gpt-4o
    provider: openai
    model: gpt-4o
    apiKey: ${OPENAI_API_KEY}
    roles: [chat, edit, autocomplete]
    defaultCompletionOptions:
      temperature: 0.7
      maxTokens: 2000
      contextLength: 128000
```

**Model Selection Algorithm:**
1. Filter models by required role
2. Check capabilities if needed (tool_use, image_input)
3. Select highest priority model (order in config)
4. Fallback to next model if primary fails

---

#### 3. Context Provider System

**Purpose:** Modular context gathering before LLM invocation

**10 Built-in Providers:**

| Provider | Purpose | Data Source |
|----------|---------|-------------|
| `file` | Current file content | Active file in editor |
| `code` | Specific code snippets | Selected text with line numbers |
| `codebase` | Semantic search across repo | Embedding-based vector search |
| `docs` | Indexed documentation | Crawled documentation sites |
| `diff` | Git diff context | Recent uncommitted changes |
| `http` | HTTP endpoint responses | External API data |
| `folder` | Directory structure | File/folder listings |
| `terminal` | Terminal output | Recent command output |
| `problems` | Linter/diagnostic messages | IDE error/warning messages |
| `helpbot` | Custom help system | Internal knowledge base |

**Configuration:**
```yaml
context:
  - provider: file                # Always include current file
  
  - provider: code                # Selected code
    name: "Current selection"
  
  - provider: codebase            # Semantic search
    params:
      nFinal: 10                  # Top-10 matches
  
  - provider: docs                # Documentation
  
  - provider: http                # External API
    name: "Context Server"
    params:
      url: "https://api.example.com/context"
```

**Processing Flow:**
1. Context providers invoked in config order
2. Each provider returns structured data
3. Results combined by priority
4. Assembled into system message

**⚠️ Known Issue:** No token budgeting (unbounded context growth)

---

#### 4. Rules Engine

**Purpose:** Define behavioral constraints and guardrails for LLM

**Rule Types:**

1. **Simple Text Rules**
   ```yaml
   rules:
     - "Always use TypeScript interfaces"
     - "Follow Airbnb style guide"
   ```

2. **Named Rules**
   ```yaml
   rules:
     - name: "TypeScript best practices"
       rule: "Use interfaces over type aliases for extensibility"
   ```

3. **File-Scoped Rules (Glob-Based)**
   ```yaml
   rules:
     - name: "React patterns"
       rule: "Use functional components with hooks"
       globs: "**/*.{tsx,jsx}"
     
     - name: "Test patterns"
       rule: "Use Jest describe/it blocks"
       globs:
         - "src/**/*.test.ts"
         - "tests/**/*.ts"
   ```

**Application:**
- Rules combined into system message
- Applied before every Chat, Edit, and Agent request
- Glob-matched rules only included if context files match

**Example System Message:**
```
You are Cody, an AI coding assistant.

RULES:
- Always use TypeScript interfaces
- Follow Airbnb style guide
- [File-scoped rule for *.tsx] Use functional components with hooks

CONTEXT:
[file content]
[code selection]
[codebase search results]
[documentation]
```

---

#### 5. Custom Prompts

**Purpose:** User-defined prompts for task automation

**Structure:**
```yaml
prompts:
  - name: "Generate Tests"
    description: "Create comprehensive unit tests"
    prompt: |
      Write unit tests for the following code:
      {{selection}}
      
      Use Jest and include:
      - Happy path tests
      - Edge cases
      - Error handling
  
  - name: "Add Documentation"
    description: "Generate JSDoc comments"
    prompt: |
      Add JSDoc documentation to:
      {{selection}}
      
      Include:
      - Function description
      - @param descriptions
      - @returns description
      - @example usage
```

**Invocation:**
- From chat window: Type `/` to see prompt list
- Select prompt → Variables replaced (e.g., `{{selection}}`)
- Sent to LLM like normal request

**Variables:**
- `{{selection}}` — Selected code
- `{{file}}` — Current file path
- `{{language}}` — File language (TypeScript, Python, etc.)
- `{{project}}` — Project name

---

#### 6. Documentation Indexing

**Purpose:** Crawl and index documentation sites for context

**Configuration:**
```yaml
docs:
  - startUrl: "https://react.dev/reference/react"
    maxDepth: 3
    favicon: "https://react.dev/favicon.ico"
    useLocalCrawling: false
  
  - startUrl: "https://docs.python.org/3/"
    maxDepth: 2
```

**Process:**
1. Crawl starting from `startUrl`
2. Follow links up to `maxDepth`
3. Extract text content
4. Generate embeddings
5. Store in vector database (local)
6. Query during LLM invocation

**Use Cases:**
- Answer questions about framework APIs
- Suggest best practices from official docs
- Reference latest documentation automatically

---

#### 7. MCP Server Integration

**Purpose:** Connect external tools via Model Context Protocol

**Protocol:** Anthropic's Model Context Protocol (MCP)

**Configuration:**
```yaml
mcpServers:
  - name: "database"
    command: "mcp-database"
    args: ["--config", "/path/to/db.json"]
    env:
      DATABASE_URL: ${DATABASE_URL}
    timeout: 10000
  
  - name: "slack"
    command: "mcp-slack"
    env:
      SLACK_TOKEN: ${SLACK_TOKEN}
```

**Available Tools (Example):**
- `database.query(sql)` — Execute SQL queries
- `database.getSchema()` — Retrieve schema
- `slack.sendMessage(channel, text)` — Send Slack messages
- `jira.createTicket(project, summary, description)` — Create JIRA tickets

**Flow:**
1. Agent mode requests tool use
2. MCP server spawned as subprocess
3. Tool call sent via stdin/stdout
4. Response returned to LLM
5. LLM continues reasoning

---

#### 8. IDE Integration Layer

**Purpose:** Bridge Cody with underlying IDE

**Features:**

| Feature | Purpose | API |
|---------|---------|-----|
| **Code Selection** | Get selected text | `editor.getSelection()` |
| **File Operations** | Read/write files | `workspace.fs.readFile()` |
| **File Search** | Find files by name/content | `workspace.findFiles()` |
| **Terminal Execution** | Run shell commands | `terminal.sendText()` |
| **Diagnostics** | Get errors/warnings | `languages.getDiagnostics()` |
| **Permission Prompting** | User approval for actions | `window.showQuickPick()` |

**Example: Agent File Write with Permission**
```typescript
async function writeFile(path: string, content: string) {
  // Show permission prompt
  const approval = await window.showQuickPick(
    ['Allow', 'Deny'],
    { placeHolder: `Write to ${path}?` }
  );
  
  if (approval === 'Allow') {
    await workspace.fs.writeFile(
      Uri.file(path),
      Buffer.from(content)
    );
    window.showInformationMessage(`Wrote ${path}`);
  } else {
    throw new Error('Permission denied');
  }
}
```

---

#### 9. Agent Mode Executor

**Purpose:** Orchestrate multi-step autonomous task execution

**6-Step Workflow:**

```typescript
class AgentExecutor {
  async execute(task: string): Promise<AgentResult> {
    // Step 1: Understand Request
    const plan = await this.understandRequest(task);
    
    // Step 2: Explore Codebase
    const context = await this.exploreCodebase(plan);
    
    // Step 3: Plan Changes
    const steps = await this.planChanges(plan, context);
    
    // Step 4: Execute Changes (with permission)
    const results = [];
    for (const step of steps) {
      const permission = await this.requestPermission(step);
      if (permission) {
        const result = await this.executeStep(step);
        results.push(result);
      }
    }
    
    // Step 5: Verify Results
    const verification = await this.verifyResults(results);
    
    // Step 6: Task Complete
    return this.summarize(results, verification);
  }
}
```

**Tools Available:**

| Tool | Purpose | Permission Required |
|------|---------|---------------------|
| `read_file(path)` | Read file content | No |
| `write_file(path, content)` | Write/create file | Yes |
| `execute_command(cmd)` | Run terminal command | Yes |
| `search_codebase(query)` | Semantic search | No |
| `list_files(pattern)` | Find files | No |
| `git_diff()` | Get uncommitted changes | No |

---

### 5.2 Feature Modules (4 Modes)

All covered in [Section 2.2](#22-four-primary-feature-modes) above.

---

## 6. API Endpoints & Interfaces

### 6.1 LLM Provider APIs

#### OpenAI API

**Endpoint:** `https://api.openai.com/v1/chat/completions`

**Request:**
```json
{
  "model": "gpt-4o",
  "messages": [
    {
      "role": "system",
      "content": "[rules + instructions]"
    },
    {
      "role": "user",
      "content": "[user prompt + context]"
    }
  ],
  "temperature": 0.7,
  "max_tokens": 4096,
  "stream": true
}
```

**Response:**
```json
{
  "id": "chatcmpl-...",
  "model": "gpt-4o",
  "usage": {
    "prompt_tokens": 150,
    "completion_tokens": 200,
    "total_tokens": 350
  },
  "choices": [
    {
      "message": {
        "role": "assistant",
        "content": "Here's the explanation..."
      },
      "finish_reason": "stop"
    }
  ]
}
```

**Status Codes:**

| Code | Meaning | Retry Strategy |
|------|---------|----------------|
| 200 | Success | None |
| 400 | Bad request | No (fix request) |
| 401 | Unauthorized | No (fix credentials) |
| 429 | Rate limited | Yes, exponential backoff |
| 500 | Server error | Yes, with backoff |
| 503 | Service unavailable | Yes, with backoff |

---

#### Mistral API

**Endpoint:** `https://api.mistral.ai/v1/chat/completions`

**Configuration:**
```yaml
models:
  - name: "Mistral Large"
    provider: mistral
    model: mistral-large
    apiKey: ${MISTRAL_API_KEY}
```

**Request/Response:** Same format as OpenAI (compatible)

---

#### Anthropic (Claude) API

**Endpoint:** `https://api.anthropic.com/v1/messages`

**Request:**
```json
{
  "model": "claude-3-opus-20240229",
  "max_tokens": 1024,
  "system": "[rules + instructions]",
  "messages": [
    {
      "role": "user",
      "content": "[user prompt + context]"
    }
  ]
}
```

**Configuration:**
```yaml
models:
  - name: "Claude 3 Opus"
    provider: anthropic
    model: claude-3-opus-20240229
    apiKey: ${ANTHROPIC_API_KEY}
```

---

#### Ollama API (Local)

**Endpoint:** `http://localhost:11434/api/chat`

**Configuration:**
```yaml
models:
  - name: "Ollama Local"
    provider: ollama
    baseUrl: "http://localhost:11434"
    model: mistral
```

**Request:**
```json
{
  "model": "mistral",
  "messages": [
    {
      "role": "system",
      "content": "[rules + instructions]"
    },
    {
      "role": "user",
      "content": "[user prompt + context]"
    }
  ],
  "stream": true
}
```

**Startup:**
```bash
# Install Ollama
curl https://ollama.ai/install.sh | sh

# Pull model
ollama pull mistral

# Start server (runs on localhost:11434 by default)
ollama serve
```

---

### 6.2 Internal APIs

Cody is IDE-embedded (no external REST API). Internal communication uses:

1. **Extension Protocol** (WebSocket/stdio)
2. **In-memory function calls**
3. **Event emitters** for async operations

**Example Internal Interface:**
```typescript
interface CodyEngine {
  // Send chat message
  chat(message: string, context: Context): Promise<Response>;
  
  // Request code edit
  edit(selection: CodeSelection, instruction: string): Promise<Diff>;
  
  // Execute autonomous task
  agent(task: string, permissions: PermissionConfig): Promise<AgentResult>;
  
  // Get autocomplete suggestions
  autocomplete(position: Position, context: Context): Promise<Suggestion[]>;
}
```

---

### 6.3 MCP Server Interface

**Model Context Protocol (MCP)** defines standard interface for external tools.

**Server Definition:**
```json
{
  "name": "database",
  "version": "1.0.0",
  "tools": [
    {
      "name": "query",
      "description": "Execute SQL query",
      "inputSchema": {
        "type": "object",
        "properties": {
          "sql": { "type": "string" }
        },
        "required": ["sql"]
      }
    },
    {
      "name": "getSchema",
      "description": "Retrieve database schema",
      "inputSchema": {
        "type": "object",
        "properties": {}
      }
    }
  ]
}
```

**Tool Invocation:**
```typescript
// Agent requests tool use
const result = await mcpServer.call({
  tool: "query",
  params: {
    sql: "SELECT * FROM users WHERE id = 1"
  }
});

// Result returned to LLM
console.log(result);
// { rows: [...], rowCount: 1 }
```

---

## 7. Database Schema

### 7.1 Data Storage Philosophy

**Syncfusion Cody uses NO traditional database.**

Instead, it employs a **declarative configuration model** where:
- All runtime state defined in `config.yaml`
- Stateless operation (no persistent storage)
- Context gathered on-demand from IDE and external sources

**Advantages:**
✅ Zero database setup or migrations  
✅ No data privacy concerns (no storage)  
✅ Simple deployment (single binary + config)  
✅ Reproducible behavior across environments

**Disadvantages:**
❌ No team collaboration features (shared configs)  
❌ No usage analytics or audit trails  
❌ No conversation history persistence  
❌ Limited scalability (single-user design)

### 7.2 In-Memory Data Structures

Cody uses in-memory data structures during runtime:

```typescript
// Configuration cache
interface ConfigCache {
  yaml: Config;                     // Parsed config.yaml
  models: Map<string, Model>;       // Model registry by name
  contextProviders: Provider[];     // Context provider instances
  rules: Rule[];                    // Compiled rules
  prompts: Map<string, Prompt>;     // Custom prompts by name
}

// Context aggregation
interface AggregatedContext {
  file?: FileContext;               // Current file content
  code?: CodeSelection[];           // Selected code snippets
  codebase?: CodebaseMatch[];       // Semantic search results
  docs?: Documentation[];           // Indexed documentation
  diff?: GitDiff;                   // Uncommitted changes
  terminal?: TerminalOutput;        // Recent terminal output
  http?: HttpResponse[];            // External API data
  mcp?: McpToolResult[];            // MCP server responses
}

// Agent state
interface AgentState {
  taskId: string;                   // Unique task identifier
  status: 'running' | 'waiting' | 'complete' | 'failed';
  currentStep: number;              // 1-6 workflow step
  plan: ExecutionPlan;              // Task breakdown
  results: StepResult[];            // Completed step results
  pendingPermissions: Permission[]; // Awaiting user approval
}
```

### 7.3 Optional Persistence (Enterprise)

For **enterprise deployments**, Cody can optionally persist data:

```yaml
# Future enterprise config (not yet implemented)
storage:
  type: "postgresql"
  connectionString: ${DATABASE_URL}
  
  tables:
    - name: "conversations"
      columns:
        - id: uuid
        - user_id: string
        - messages: jsonb
        - created_at: timestamp
    
    - name: "audit_logs"
      columns:
        - id: uuid
        - user_id: string
        - action: string (chat/edit/agent)
        - context: jsonb
        - result: jsonb
        - timestamp: timestamp
```

**Planned Features (Phase 4):**
- Conversation history
- Audit trails for compliance
- Team-shared configurations
- Usage analytics
- Model performance metrics

---

## 8. Configuration System

### 8.1 Configuration File Structure

**Location:** `~/.cody/config.yaml` (or IDE settings)

**Complete Example:**
```yaml
# Configuration metadata
name: "Development Configuration"
version: "1.0.0"
schema: "v1"

# Model definitions
models:
  # Primary chat model
  - name: "GPT-4 Chat"
    provider: openai
    model: gpt-4o
    apiKey: ${OPENAI_API_KEY}
    roles: [chat, edit]
    defaultCompletionOptions:
      temperature: 0.7
      maxTokens: 2000
      contextLength: 128000
  
  # Fast autocomplete model
  - name: "GPT-3.5 Autocomplete"
    provider: openai
    model: gpt-3.5-turbo
    apiKey: ${OPENAI_API_KEY}
    roles: [autocomplete]
    defaultCompletionOptions:
      temperature: 0.3
      maxTokens: 500
  
  # Local model for offline work
  - name: "Ollama Local"
    provider: ollama
    baseUrl: "http://localhost:11434"
    model: mistral
    roles: [chat]
    priority: 2

# Context providers
context:
  - provider: file
  - provider: code
  - provider: codebase
    params:
      nFinal: 10              # Top-10 semantic matches
  - provider: docs
  - provider: diff
  - provider: terminal
  - provider: http
    name: "Internal Context Server"
    params:
      url: "https://api.company.com/context"
      headers:
        Authorization: "Bearer ${CONTEXT_API_TOKEN}"

# Rules (behavioral constraints)
rules:
  # Global rules
  - "Always use TypeScript for new files"
  - "Follow company coding standards"
  - "Write comprehensive error handling"
  
  # File-scoped rules
  - name: "React patterns"
    rule: |
      Use functional components with hooks.
      Avoid class components.
      Extract custom hooks for reusable logic.
    globs:
      - "**/*.tsx"
      - "**/*.jsx"
  
  - name: "Test patterns"
    rule: "Use Jest with describe/it blocks. Include happy path and edge cases."
    globs:
      - "**/*.test.ts"
      - "**/*.spec.ts"

# Custom prompts
prompts:
  - name: "Generate Tests"
    description: "Create unit tests for selected code"
    prompt: |
      Generate comprehensive unit tests for:
      {{selection}}
      
      Include:
      - Happy path tests
      - Edge cases
      - Error handling
      - Mocks for external dependencies
  
  - name: "Add JSDoc"
    description: "Generate JSDoc comments"
    prompt: |
      Add JSDoc documentation to:
      {{selection}}
      
      Include:
      - Function description
      - @param with types and descriptions
      - @returns with type and description
      - @example with usage

# Documentation indexing
docs:
  - startUrl: "https://react.dev/reference/react"
    maxDepth: 3
    favicon: "https://react.dev/favicon.ico"
  
  - startUrl: "https://docs.company.com/internal"
    maxDepth: 2
    useLocalCrawling: true

# MCP servers
mcpServers:
  - name: "database"
    command: "mcp-database"
    args: ["--config", "/path/to/db-config.json"]
    env:
      DATABASE_URL: ${DATABASE_URL}
    timeout: 10000
  
  - name: "jira"
    command: "mcp-jira"
    env:
      JIRA_URL: ${JIRA_URL}
      JIRA_TOKEN: ${JIRA_TOKEN}
```

### 8.2 Environment Variables

**Best Practice:** Store credentials as environment variables, reference in config:

```bash
# .env file (DO NOT COMMIT)
OPENAI_API_KEY=sk-...
MISTRAL_API_KEY=...
ANTHROPIC_API_KEY=...
DATABASE_URL=postgresql://...
CONTEXT_API_TOKEN=...
```

**Reference in config:**
```yaml
models:
  - name: "GPT-4"
    provider: openai
    apiKey: ${OPENAI_API_KEY}  # Resolved at runtime
```

**Configuration Loader:**
```typescript
function loadConfig(path: string): Config {
  const yaml = fs.readFileSync(path, 'utf-8');
  const parsed = YAML.parse(yaml);
  
  // Resolve environment variables
  const resolved = resolveEnvVars(parsed);
  
  return resolved;
}

function resolveEnvVars(obj: any): any {
  if (typeof obj === 'string') {
    return obj.replace(/\$\{(\w+)\}/g, (_, varName) => {
      return process.env[varName] || '';
    });
  }
  
  if (Array.isArray(obj)) {
    return obj.map(resolveEnvVars);
  }
  
  if (typeof obj === 'object') {
    const result: any = {};
    for (const key in obj) {
      result[key] = resolveEnvVars(obj[key]);
    }
    return result;
  }
  
  return obj;
}
```

### 8.3 Configuration Validation

**⚠️ CRITICAL:** Currently no validation implemented. **Must add before production.**

**Recommended Validation:**
```typescript
import Ajv from 'ajv';

const configSchema = {
  type: 'object',
  required: ['name', 'version', 'schema', 'models'],
  properties: {
    name: { type: 'string' },
    version: { type: 'string', pattern: '^\\d+\\.\\d+\\.\\d+$' },
    schema: { type: 'string', enum: ['v1'] },
    models: {
      type: 'array',
      minItems: 1,
      items: {
        type: 'object',
        required: ['name', 'provider', 'model'],
        properties: {
          name: { type: 'string' },
          provider: { type: 'string', enum: ['openai', 'mistral', 'anthropic', 'ollama'] },
          model: { type: 'string' },
          apiKey: { type: 'string' },
          roles: {
            type: 'array',
            items: { type: 'string', enum: ['chat', 'edit', 'autocomplete', 'apply', 'embed', 'rerank'] }
          }
        }
      }
    }
  }
};

function validateConfig(config: any): void {
  const ajv = new Ajv();
  const valid = ajv.validate(configSchema, config);
  
  if (!valid) {
    throw new Error(`Invalid config: ${ajv.errorsText()}`);
  }
}
```

---

## 9. Deployment Process

### 9.1 Deployment Scenarios

Cody supports **three deployment scenarios**:

#### Scenario 1: Individual Developer (Current)

**Architecture:**
```
Developer's IDE (VS Code)
    ↓
Cody Extension (embedded)
    ↓
config.yaml (local file)
    ↓
LLM Providers (cloud APIs)
```

**Deployment:**
1. Install IDE extension from marketplace
2. Create `~/.cody/config.yaml`
3. Add API keys to environment variables
4. Reload IDE

**Advantages:**
- Simple setup
- No infrastructure required
- Full control over configuration

**Disadvantages:**
- No team collaboration
- No shared configurations
- No usage analytics

---

#### Scenario 2: Team Deployment (Planned - Phase 3)

**Architecture:**
```
Multiple Developers' IDEs
    ↓
Cody Extension (embedded)
    ↓
Central Config Server (shared configs)
    ↓
LLM Providers (cloud or on-premise)
```

**Deployment:**
1. Set up central config server
2. Create team configuration template
3. Each developer installs extension
4. Extension pulls config from central server
5. Merge with local overrides

**Advantages:**
- Shared best practices
- Centralized credential management
- Team-wide rule enforcement
- Usage analytics

**Configuration:**
```yaml
# Team base config (on server)
name: "Team Base Config"
version: "1.0.0"

models:
  - name: "Team GPT-4"
    provider: openai
    apiKey: ${TEAM_OPENAI_API_KEY}  # Managed by team admin
    roles: [chat, edit]

rules:
  - "Follow company coding standards"
  - "Use TypeScript for all new code"

# Local override (developer's ~/.cody/config.yaml)
extends: "https://config.company.com/team-base.yaml"

models:
  - name: "Personal Ollama"  # Added to team models
    provider: ollama
    model: mistral
    roles: [chat]

prompts:  # Personal prompts added to team prompts
  - name: "My Custom Prompt"
    prompt: "..."
```

---

#### Scenario 3: Enterprise Deployment (Planned - Phase 4)

**Architecture:**
```
Multiple Teams/Developers
    ↓
Cody Extensions
    ↓
Central Cody Server (orchestration, analytics, audit)
    ↓
On-Premise LLM Cluster or Cloud APIs
    ↓
PostgreSQL (conversation history, audit logs)
```

**Features:**
- Multi-tenancy (team isolation)
- Role-based access control (RBAC)
- Audit trails for compliance
- Usage analytics dashboard
- Centralized model management
- Custom model fine-tuning

**Deployment Steps:**
1. Provision Kubernetes cluster or VM
2. Deploy Cody server (Docker container)
3. Set up PostgreSQL database
4. Configure authentication (SSO, LDAP)
5. Create tenant organizations
6. Install IDE extensions with server URL
7. Migrate team configurations to server

---

### 9.2 Current Deployment Steps (Scenario 1)

**For macOS:**

1. **Install IDE Extension**
   ```bash
   # VS Code
   code --install-extension syncfusion.cody
   
   # Or install from marketplace
   # 1. Open VS Code
   # 2. Go to Extensions (Cmd+Shift+X)
   # 3. Search "Syncfusion Cody"
   # 4. Click Install
   ```

2. **Create Configuration Directory**
   ```bash
   mkdir -p ~/.cody
   cd ~/.cody
   ```

3. **Create config.yaml**
   ```bash
   cat > config.yaml << 'EOF'
   name: "My Cody Config"
   version: "1.0.0"
   schema: "v1"
   
   models:
     - name: "GPT-4"
       provider: openai
       model: gpt-4o
       apiKey: ${OPENAI_API_KEY}
       roles: [chat, edit]
   
   context:
     - provider: file
     - provider: code
     - provider: codebase
   
   rules:
     - "Use TypeScript for new files"
   EOF
   ```

4. **Set Environment Variables**
   ```bash
   # Add to ~/.zshrc or ~/.bashrc
   echo 'export OPENAI_API_KEY="sk-..."' >> ~/.zshrc
   source ~/.zshrc
   ```

5. **Reload IDE**
   ```bash
   # Restart VS Code or run:
   # Cmd+Shift+P → "Reload Window"
   ```

6. **Verify Installation**
   - Open any code file
   - Press `Cmd+L` to open chat
   - Ask: "Can you see this file?"
   - Should get context-aware response

**For Windows:**

Same steps but:
- Config location: `%USERPROFILE%\.cody\config.yaml`
- Environment variables: Set via System Properties → Environment Variables
- Keyboard shortcuts: `Ctrl+L` (chat), `Ctrl+I` (edit)

---

### 9.3 Release Process

**Current Status:** Manual releases

**Planned CI/CD Pipeline:**

```yaml
# .github/workflows/release.yml
name: Release

on:
  push:
    tags:
      - 'v*'

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Build Extension
        run: |
          npm install
          npm run build
          vsce package
      
      - name: Run Tests
        run: npm test
      
      - name: Publish to VS Code Marketplace
        run: vsce publish
        env:
          VSCE_PAT: ${{ secrets.VSCE_PAT }}
      
      - name: Create GitHub Release
        uses: actions/create-release@v1
        with:
          tag_name: ${{ github.ref }}
          release_name: Release ${{ github.ref }}
```

**Release Checklist:**
- [ ] All tests passing
- [ ] Documentation updated
- [ ] CHANGELOG.md updated
- [ ] Version bumped in package.json
- [ ] Git tag created
- [ ] Extension built and published
- [ ] Release notes published

---

## 10. Development Workflow

### 10.1 Getting Started

#### Prerequisites

- **Git** (version 2.30+)
  ```bash
  git --version
  ```

- **Node.js & npm** (version 18+)
  ```bash
  node --version
  npm --version
  ```

- **VS Code** (for extension development)
  ```bash
  code --version
  ```

- **IDE Extension Host** (for testing)
  - VS Code (recommended)
  - JetBrains IDE
  - Neovim

#### Clone Repository

```bash
# Clone the docs repository
git clone https://github.com/syncfusion/cody-docs.git
cd cody-docs

# Verify clone
ls -la
```

#### Install Dependencies

```bash
# Install npm dependencies (if any)
npm install

# Install validation tools
npm install -g yamllint markdownlint-cli

# Verify installations
yamllint --version
markdownlint --version
```

---

### 10.2 Making Changes

#### 1. Create Feature Branch

```bash
# Create new branch from main
git checkout -b feature/add-new-context-provider

# Or for bug fixes
git checkout -b fix/config-validation-bug
```

#### 2. Make Changes

```bash
# Edit documentation
code syncfusion-cody/reference/configure-properties/context.md

# Or add new files
code syncfusion-cody/features/NewFeature.md
```

#### 3. Validate Changes

```bash
# Validate YAML files
yamllint syncfusion-cody/reference/*.yaml

# Validate Markdown
markdownlint syncfusion-cody/**/*.md

# Check for broken links
npm run check-links
```

#### 4. Commit Changes

```bash
# Stage changes
git add .

# Commit with descriptive message
git commit -m "feat: Add new context provider documentation

- Document HTTP context provider
- Add configuration examples
- Update API reference"

# Follow conventional commits format:
# feat: New feature
# fix: Bug fix
# docs: Documentation only
# refactor: Code refactoring
# test: Adding tests
# chore: Maintenance tasks
```

#### 5. Push Branch

```bash
# Push to remote
git push origin feature/add-new-context-provider
```

#### 6. Create Pull Request

1. Go to GitHub repository
2. Click "New Pull Request"
3. Select your branch
4. Fill in PR template:
   - **Title:** Clear, descriptive title
   - **Description:** What changed and why
   - **Testing:** How you tested changes
   - **Screenshots:** If UI changes
5. Request review from team members
6. Address review feedback
7. Merge when approved

---

### 10.3 Code Review Process

**Review Checklist:**

- [ ] **Documentation Quality**
  - Clear and concise explanations
  - Examples included
  - No typos or grammatical errors
  - Follows existing style

- [ ] **Accuracy**
  - Technical details correct
  - Code examples work as shown
  - Links not broken
  - Version info up-to-date

- [ ] **Completeness**
  - All sections addressed
  - Edge cases documented
  - Error scenarios included
  - Troubleshooting tips provided

- [ ] **Consistency**
  - Matches existing format
  - Terminology consistent
  - Naming conventions followed

**Review Timeline:**
- **Initial Review:** Within 24 hours
- **Re-review:** Within 12 hours after changes
- **Final Approval:** Same day if minor changes

---

### 10.4 Testing Documentation

**Test Your Examples:**

1. **Create Test Config**
   ```bash
   mkdir -p /tmp/cody-test
   cp your-example-config.yaml /tmp/cody-test/config.yaml
   ```

2. **Set Environment Variables**
   ```bash
   export OPENAI_API_KEY="your-test-key"
   export CODY_HOME="/tmp/cody-test"
   ```

3. **Test in IDE**
   - Install Cody extension
   - Point to test config
   - Try all documented features
   - Verify behavior matches documentation

4. **Document Results**
   ```markdown
   ## Testing
   
   Tested on:
   - macOS 13.0
   - VS Code 1.85.0
   - Cody v1.0.0
   
   Test scenarios:
   - [x] Chat mode with code selection
   - [x] Edit mode with inline diff
   - [x] Agent mode autonomous task
   - [x] Custom prompt invocation
   
   Results: All features work as documented.
   ```

---

### 10.5 Documentation Style Guide

**Formatting:**

- Use **Markdown** for all documentation
- Use `# Heading 1` for page title
- Use `## Heading 2` for main sections
- Use `### Heading 3` for subsections
- Use **bold** for emphasis
- Use `inline code` for code/config references
- Use triple backticks for code blocks with language:
  ````markdown
  ```yaml
  models:
    - name: "GPT-4"
  ```
  ````

**Writing Style:**

- **Be concise:** Get to the point quickly
- **Be specific:** Avoid vague language like "may" or "might"
- **Use examples:** Show, don't just tell
- **Address the reader:** Use "you" for instructions
- **Use active voice:** "Click the button" not "The button should be clicked"

**Code Examples:**

- Always test code examples before documenting
- Include comments for clarity
- Show complete, runnable examples
- Include error handling where relevant
- Use realistic example data

**Configuration Examples:**

```yaml
# Good: Complete, runnable, commented
models:
  - name: "GPT-4"              # Friendly name for UI
    provider: openai           # Provider type
    model: gpt-4o              # Specific model identifier
    apiKey: ${OPENAI_API_KEY}  # Secure: environment variable
    roles: [chat, edit]        # Assigned roles

# Bad: Incomplete, insecure
models:
  - name: "GPT-4"
    provider: openai
    apiKey: "sk-abc123..."     # Never hardcode keys!
```

---

## 11. Common Troubleshooting

### 11.1 Installation Issues

#### Issue: Extension Not Found in Marketplace

**Symptoms:**
- Search for "Syncfusion Cody" returns no results
- Installation link doesn't work

**Solutions:**
1. **Check IDE Version**
   ```bash
   code --version
   # Requires VS Code 1.80.0+
   ```

2. **Try Manual Install**
   ```bash
   code --install-extension syncfusion.cody
   ```

3. **Check Extension ID**
   - Correct ID: `syncfusion.cody`
   - NOT: `syncfusion-cody` or `cody`

4. **Reload Extension List**
   - Cmd+Shift+P → "Extensions: Check for Extension Updates"

---

#### Issue: Extension Installed but Not Loading

**Symptoms:**
- Extension shows in Extensions panel but doesn't activate
- No chat panel or keyboard shortcuts work

**Solutions:**
1. **Check Extension Output**
   ```
   View → Output → Select "Syncfusion Cody" from dropdown
   Look for error messages
   ```

2. **Verify Dependencies**
   ```bash
   node --version  # Must be 18+
   npm --version
   ```

3. **Reload Window**
   ```
   Cmd+Shift+P → "Developer: Reload Window"
   ```

4. **Reinstall Extension**
   ```bash
   code --uninstall-extension syncfusion.cody
   code --install-extension syncfusion.cody
   ```

---

### 11.2 Configuration Issues

#### Issue: config.yaml Not Found

**Symptoms:**
- Extension loads but shows "No configuration found"
- Chat mode returns "Configuration error"

**Solutions:**
1. **Check Config Location**
   ```bash
   # macOS/Linux
   ls -la ~/.cody/config.yaml
   
   # Windows
   dir %USERPROFILE%\.cody\config.yaml
   ```

2. **Create Config**
   ```bash
   mkdir -p ~/.cody
   cp /path/to/example-config.yaml ~/.cody/config.yaml
   ```

3. **Set Custom Location**
   ```json
   // VS Code settings.json
   {
     "cody.configPath": "/custom/path/to/config.yaml"
   }
   ```

4. **Verify Permissions**
   ```bash
   # Config must be readable
   chmod 644 ~/.cody/config.yaml
   ```

---

#### Issue: Environment Variables Not Resolved

**Symptoms:**
- Config shows `${OPENAI_API_KEY}` instead of actual key
- API requests fail with "Invalid API key"

**Solutions:**
1. **Verify Environment Variables Set**
   ```bash
   echo $OPENAI_API_KEY
   # Should print your API key
   ```

2. **Set in Shell Profile**
   ```bash
   # Add to ~/.zshrc or ~/.bashrc
   export OPENAI_API_KEY="sk-..."
   
   # Reload shell
   source ~/.zshrc
   ```

3. **Restart IDE**
   - Environment variables loaded at IDE startup
   - Must restart after setting new variables

4. **Check Variable Name**
   ```yaml
   # Must match exactly (case-sensitive)
   apiKey: ${OPENAI_API_KEY}  # Correct
   apiKey: ${openai_api_key}  # Wrong
   ```

---

#### Issue: YAML Syntax Error

**Symptoms:**
- Extension fails to load
- Error message: "Invalid YAML syntax"

**Solutions:**
1. **Validate YAML**
   ```bash
   yamllint ~/.cody/config.yaml
   ```

2. **Common Mistakes**
   ```yaml
   # Bad: Inconsistent indentation
   models:
     - name: "GPT-4"
      provider: openai  # Wrong indent
   
   # Good: Consistent 2-space indentation
   models:
     - name: "GPT-4"
       provider: openai
   
   # Bad: Missing quotes
   rules:
     - Use React hooks  # Fails if contains :
   
   # Good: Quoted strings
   rules:
     - "Use React hooks"
   ```

3. **Use YAML Validator**
   - Online: https://www.yamllint.com/
   - VS Code extension: "YAML Language Support"

---

### 11.3 Runtime Issues

#### Issue: LLM API Requests Failing

**Symptoms:**
- Chat mode returns "API request failed"
- No response from LLM
- Timeout errors

**Solutions:**
1. **Check API Key**
   ```bash
   # Test API key manually
   curl https://api.openai.com/v1/models \
     -H "Authorization: Bearer $OPENAI_API_KEY"
   
   # Should return list of models
   ```

2. **Verify Network Connection**
   ```bash
   # Test connectivity
   curl https://api.openai.com/v1/models
   
   # Check proxy settings
   echo $HTTP_PROXY
   echo $HTTPS_PROXY
   ```

3. **Check Rate Limits**
   - OpenAI: 3 requests/min (free tier)
   - Upgrade to paid tier or wait

4. **Try Alternative Model**
   ```yaml
   models:
     - name: "GPT-3.5"  # Fallback to cheaper/faster model
       provider: openai
       model: gpt-3.5-turbo
       roles: [chat]
   ```

---

#### Issue: Context Not Included

**Symptoms:**
- LLM doesn't see current file content
- Asks for code that's already visible
- Missing codebase search results

**Solutions:**
1. **Check Context Providers Enabled**
   ```yaml
   context:
     - provider: file      # Current file
     - provider: code      # Selection
     - provider: codebase  # Semantic search
   ```

2. **Verify File Saved**
   - Context providers only see saved content
   - Save file before sending to chat

3. **Check Context Provider Logs**
   ```
   View → Output → "Syncfusion Cody (Context)"
   Look for: "File context: 1234 tokens"
   ```

4. **Increase Context Limit**
   ```yaml
   models:
     - name: "GPT-4"
       defaultCompletionOptions:
         contextLength: 128000  # Maximum context
   ```

---

#### Issue: Agent Mode Hangs

**Symptoms:**
- Agent starts task but never completes
- "Waiting for permission" forever
- No progress updates

**Solutions:**
1. **Check Permission Prompt**
   - Look for notification in IDE (top-right)
   - Grant or deny permission to continue

2. **Check Agent Logs**
   ```
   View → Output → "Syncfusion Cody (Agent)"
   Look for: Current step, tool calls, errors
   ```

3. **Cancel and Retry**
   ```
   In chat panel: Click "Cancel Agent Task"
   Retry with simpler task to isolate issue
   ```

4. **Disable Problematic Tools**
   ```yaml
   # Future feature (not yet implemented)
   agent:
     disabledTools:
       - execute_command  # Disable terminal execution
   ```

---

#### Issue: Autocomplete Not Working

**Symptoms:**
- No inline suggestions appear
- Suggestions are slow (>5 seconds)
- Suggestions are irrelevant

**Solutions:**
1. **Check Autocomplete Role Assigned**
   ```yaml
   models:
     - name: "Fast Model"
       provider: openai
       model: gpt-3.5-turbo
       roles: [autocomplete]  # Must include this role
   ```

2. **Reduce Context**
   ```yaml
   # Autocomplete needs minimal context for speed
   context:
     - provider: file   # Only current file
     - provider: code   # No codebase search
   ```

3. **Use Faster Model**
   ```yaml
   models:
     - name: "Codestral"  # Specialized for autocomplete
       provider: mistral
       model: codestral-latest
       roles: [autocomplete]
   ```

4. **Check Debounce Settings**
   ```json
   // VS Code settings.json
   {
     "cody.autocomplete.debounceMs": 300  // Lower = faster, more requests
   }
   ```

---

### 11.4 Error Messages

#### "Configuration schema validation failed"

**Cause:** Invalid `config.yaml` structure

**Fix:**
```bash
# Validate against schema
yamllint config.yaml

# Check for:
# - Missing required fields (name, version, schema, models)
# - Invalid enum values (provider, roles)
# - Type mismatches (string vs number)
```

---

#### "No models configured for role 'chat'"

**Cause:** No model has `roles: [chat]`

**Fix:**
```yaml
models:
  - name: "GPT-4"
    provider: openai
    roles: [chat, edit]  # Add required role
```

---

#### "Context provider 'codebase' failed"

**Cause:** Codebase indexing not complete or failed

**Fix:**
```bash
# Check indexing status
# Cmd+Shift+P → "Cody: Show Codebase Index Status"

# Rebuild index
# Cmd+Shift+P → "Cody: Rebuild Codebase Index"

# Or disable temporarily
# Remove from context providers in config.yaml
```

---

#### "MCP server 'database' failed to start"

**Cause:** MCP server command not found or crashed

**Fix:**
```bash
# Test MCP server manually
mcp-database --config /path/to/config.json

# Check command path
which mcp-database

# Install if missing
npm install -g @modelcontextprotocol/server-database

# Check logs
tail -f ~/.cody/logs/mcp-database.log
```

---

## 12. Quick Reference

### 12.1 Keyboard Shortcuts

| Shortcut (Mac) | Shortcut (Windows/Linux) | Action |
|----------------|--------------------------|--------|
| `Cmd+L` | `Ctrl+L` | Open Chat Mode |
| `Cmd+I` | `Ctrl+I` | Open Edit Mode |
| `Cmd+Shift+L` | `Ctrl+Shift+L` | Open Agent Mode |
| `Tab` | `Tab` | Accept autocomplete suggestion |
| `Esc` | `Esc` | Reject autocomplete suggestion |
| `Cmd+→` | `Ctrl+→` | Accept autocomplete word-by-word |
| `Cmd+/` | `Ctrl+/` | Show custom prompts list |

### 12.2 Configuration Quick Reference

```yaml
# Minimal config
name: "Config Name"
version: "1.0.0"
schema: "v1"
models:
  - name: "Model Name"
    provider: openai
    model: gpt-4o
    apiKey: ${API_KEY}
    roles: [chat]

# All sections
name: string
version: string (semver)
schema: "v1"
models: Model[]
context: ContextProvider[]
rules: Rule[]
prompts: Prompt[]
docs: DocsConfig[]
mcpServers: McpServer[]
```

### 12.3 Common Commands

```bash
# Installation
code --install-extension syncfusion.cody

# Validate config
yamllint ~/.cody/config.yaml

# Test API key
curl https://api.openai.com/v1/models \
  -H "Authorization: Bearer $OPENAI_API_KEY"

# View logs
tail -f ~/.cody/logs/extension.log

# Rebuild codebase index
# Cmd+Shift+P → "Cody: Rebuild Codebase Index"
```

### 12.4 Useful Links

| Resource | URL |
|----------|-----|
| **Documentation** | `/syncfusion-cody/` |
| **API Reference** | `/API_REFERENCE.md` |
| **Architecture Review** | `/ARCHITECTURE_REVIEW_PRINCIPAL_2024.md` |
| **Quick Start** | `/QUICK_START.md` |
| **Troubleshooting** | This document, Section 11 |
| **GitHub Repository** | https://github.com/syncfusion/cody-docs |
| **Issue Tracker** | https://github.com/syncfusion/cody-docs/issues |

### 12.5 Model Selection Guide

| Use Case | Recommended Model | Role | Notes |
|----------|-------------------|------|-------|
| **General Chat** | GPT-4o | `chat` | Best balance of speed/quality |
| **Code Editing** | GPT-4o | `edit` | Accurate code transformations |
| **Fast Autocomplete** | GPT-3.5-turbo | `autocomplete` | Low latency |
| **Specialized Autocomplete** | Codestral | `autocomplete` | Code-specific training |
| **Local/Offline** | Ollama (Mistral) | `chat` | Privacy, no API costs |
| **Long Context** | Claude 3 Opus | `chat` | 200k token context |
| **Budget-Friendly** | GPT-3.5-turbo | `chat` | 10x cheaper than GPT-4 |

### 12.6 Context Provider Cheat Sheet

| Provider | Purpose | Cost | Speed |
|----------|---------|------|-------|
| `file` | Current file | Free | Instant |
| `code` | Selected code | Free | Instant |
| `codebase` | Semantic search | Medium (embedding API) | 1-2s |
| `docs` | Documentation | Medium (one-time indexing) | Instant (cached) |
| `diff` | Git changes | Free | Instant |
| `terminal` | Command output | Free | Instant |
| `http` | External API | Varies | Depends on API |
| `folder` | Directory listing | Free | Instant |
| `problems` | Linter errors | Free | Instant |

---

## 📚 Next Steps

**Congratulations!** You've completed the New Engineer Onboarding Guide.

### Recommended Learning Path

1. **Week 1: Fundamentals**
   - Read this guide thoroughly
   - Set up development environment
   - Install Cody and create basic config
   - Try all four modes (Chat, Edit, Agent, Autocomplete)

2. **Week 2: Deep Dive**
   - Read `/ARCHITECTURE_REVIEW_PRINCIPAL_2024.md`
   - Study `/API_REFERENCE.md`
   - Review `/TECHNICAL_DEEP_DIVE.md`
   - Understand design patterns used

3. **Week 3: Contribution**
   - Pick a "good first issue" from GitHub
   - Submit your first documentation PR
   - Get familiar with code review process
   - Join team meetings

4. **Week 4: Specialization**
   - Choose focus area (features, architecture, testing)
   - Deep dive into relevant documentation
   - Pair with senior engineer
   - Start working on real tasks

### Getting Help

- **Slack Channel:** `#cody-dev`
- **Office Hours:** Tuesdays 2-3pm (ask anything!)
- **1:1 with Tech Lead:** Schedule via calendar
- **Documentation Issues:** https://github.com/syncfusion/cody-docs/issues

### Contributing

See `/DEVELOPMENT_SETUP.md` for detailed contribution guidelines.

**Key principles:**
- Documentation-first development
- Test all code examples
- Follow style guide
- Get reviews before merging

---

**Welcome to the team! 🎉**

We're excited to have you aboard. Syncfusion Cody is at the forefront of AI-powered developer tools, and your contributions will help shape the future of software development.

If you have any questions, don't hesitate to reach out. We're here to help you succeed!

---

*Last updated: 2024 | Maintained by: Syncfusion Cody Team*
