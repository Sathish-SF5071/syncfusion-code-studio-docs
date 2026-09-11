# 🚀 Syncfusion Cody - New Engineer Onboarding Guide

**Complete guide for joining the Syncfusion Cody development team**  
*Last Updated: 2024* | *Version: 1.0*

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Business Workflow](#business-workflow)
3. [Repository Structure](#repository-structure)
4. [Architecture Deep Dive](#architecture-deep-dive)
5. [Key Modules & Components](#key-modules--components)
6. [API Endpoints & Interfaces](#api-endpoints--interfaces)
7. [Configuration System](#configuration-system)
8. [Data Schema](#data-schema)
9. [Deployment Process](#deployment-process)
10. [Development Workflow](#development-workflow)
11. [Common Troubleshooting](#common-troubleshooting)
12. [Quick Reference](#quick-reference)

---

## Project Overview

### What is Syncfusion Cody?

**Syncfusion Cody** is an **AI-powered IDE extension** that enhances developer productivity through intelligent code assistance. It combines advanced language models with contextual code understanding to provide real-time code suggestions, autonomous task execution, and interactive pair programming.

### Core Value Proposition

| Feature | Benefit |
|---------|---------|
| **Multi-Modal AI** | Choose interaction style (Chat, Edit, Agent, Autocomplete) |
| **Context-Aware** | Understands your codebase, documentation, and dependencies |
| **Extensible** | Pluggable configuration system for customization |
| **Secure** | Permission-gated autonomy with transparent workflows |
| **Enterprise-Ready** | Multi-model support with role-based dispatch |

### Key Statistics

- **Architecture Quality**: ⭐⭐⭐⭐ (4/5) - Excellent configuration-driven design
- **Lines of Documentation**: ~200 KB across organized feature modules
- **Supported Providers**: OpenAI, Ollama, Mistral, Anthropic, Claude
- **Context Providers**: 10+ pluggable sources (code, docs, diff, terminal, etc.)
- **Feature Modes**: 4 distinct user interaction patterns

### Strategic Direction

| Phase | Timeline | Goals |
|-------|----------|-------|
| **Phase 1** | Week 1-2 | Security hardening, credential management |
| **Phase 2** | Week 3-4 | Error handling framework, reliability |
| **Phase 3** | Week 5-6 | Configuration composition, team collaboration |
| **Phase 4** | Week 7-8 | Token budgeting, scalability |
| **Phase 5** | Week 9-10 | Enterprise features, audit trails |

---

## Business Workflow

### How Cody Fits Into Developer Workflow

```
Developer writes code → Cody provides assistance → Developer reviews → Code is committed
         ↓                                              ↓
    Problem arises ← Cody auto-fixes ← Dev describes issue
         ↓
    Complex task ← Cody explores & executes ← Dev approves each step
```

### Four Primary Use Cases

#### 1. **Chat Mode** - Real-Time Discussion
```
Scenario: Developer asks "Why is this function failing?"
Flow: Dev → Chat → Cody analyzes context → Suggests solutions
Output: Conversational suggestions with code examples
```

**Use When**:
- Asking for code explanations
- Discussing design patterns
- Seeking best practices
- Brainstorming solutions

**Key Features**:
- Context-aware responses
- Multi-turn conversation
- Code snippet generation

---

#### 2. **Edit Mode** - Targeted Code Changes
```
Scenario: Developer highlights code and requests "Refactor this to use async/await"
Flow: Dev selects code → Edit mode → Cody generates diff → Dev accepts/rejects
Output: Clean code modifications with review control
```

**Use When**:
- Refactoring existing code
- Fixing style inconsistencies
- Adding documentation
- Applying security patches

**Key Features**:
- Accept/reject workflow
- Visual diff preview
- Targeted modifications

---

#### 3. **Agent Mode** - Autonomous Task Execution
```
Scenario: Developer requests "Add unit tests for UserService"
Flow: Dev → Agent explores codebase → Plans changes → Executes with permission gates → Verifies
Output: Complete implementation with minimal oversight
```

**6-Step Agent Workflow**:
1. **Understand Request** - Parse task requirements
2. **Explore Codebase** - Find relevant files and patterns
3. **Plan Changes** - Create implementation blueprint
4. **Execute Changes** - Apply modifications
5. **Verify Results** - Test and validate
6. **Report Completion** - Summarize actions taken

**Use When**:
- Creating new features
- Adding tests
- Generating documentation
- Performing large refactorings
- Running automated fixes

**Key Features**:
- Permission-gated autonomy (approval before each tool action)
- File searching and editing
- Terminal command execution
- Error recovery and retry logic

---

#### 4. **Autocomplete Mode** - Inline Suggestions
```
Scenario: Developer types code and Cody suggests completions
Flow: Dev types → Autocomplete analyzes context → Suggests next tokens
Output: Fast, non-intrusive suggestions (like IDE autocomplete but AI-powered)
```

**Use When**:
- Writing new code rapidly
- Discovering API patterns
- Remembering function signatures
- Staying in flow state

**Key Features**:
- Real-time token predictions
- Context-aware suggestions
- Low-latency performance

---

### Developer Experience Flow

```
┌─────────────────────────────────────────────────────┐
│         Developer Opens IDE (with Cody)             │
└────────────────────┬────────────────────────────────┘
                     ↓
        ┌────────────────────────────┐
        │  Select Feature Mode        │
        ├────────────────────────────┤
        │ • Chat (discussion)        │
        │ • Edit (targeted changes)  │
        │ • Agent (autonomous)       │
        │ • Autocomplete (inline)    │
        └────────┬───────────────────┘
                 ↓
        ┌────────────────────────────┐
        │  Input & Configuration     │
        ├────────────────────────────┤
        │ • User prompt/selection    │
        │ • Load config.yaml         │
        │ • Select model             │
        │ • Gather context           │
        └────────┬───────────────────┘
                 ↓
        ┌────────────────────────────┐
        │  Cody Processes Request    │
        ├────────────────────────────┤
        │ • Apply rules/constraints  │
        │ • Aggregate context        │
        │ • Compose system message   │
        │ • Invoke LLM               │
        └────────┬───────────────────┘
                 ↓
        ┌────────────────────────────┐
        │  Generate & Display        │
        ├────────────────────────────┤
        │ • Format response          │
        │ • Show in chat/inline      │
        │ • Enable approval (Agent)  │
        └────────┬───────────────────┘
                 ↓
        ┌────────────────────────────┐
        │  Developer Action          │
        ├────────────────────────────┤
        │ • Accept changes           │
        │ • Request refinement       │
        │ • Approve tool use         │
        │ • Continue conversation    │
        └────────────────────────────┘
```

---

## Repository Structure

### Top-Level Organization

```
syncfusion-code-studio-docs/
├── README.md                           # Project overview
├── QUICK_START.md                      # Getting started guide
├── ENGINEER_ONBOARDING_GUIDE.md        # ← YOU ARE HERE
│
├── syncfusion-cody/                    # Main documentation source
│   ├── Welcome-to-Cody.md              # Introduction
│   │
│   ├── get-started/                    # Installation & setup
│   │   ├── Windows.md                  # Windows installation
│   │   └── Mac.md                      # Mac installation
│   │
│   ├── features/                       # Feature documentation
│   │   ├── Agent.md                    # Agent mode documentation
│   │   ├── Chat.md                     # Chat mode documentation
│   │   ├── Edit.md                     # Edit mode documentation
│   │   └── Autocomplete.md             # Autocomplete documentation
│   │
│   ├── reference/                      # Technical reference
│   │   ├── Configure-the-Cody.md       # Configuration guide (CRITICAL)
│   │   │
│   │   └── configure-properties/       # Configuration schemas
│   │       ├── context.md              # Context provider schemas
│   │       ├── docs.md                 # Documentation crawler config
│   │       ├── mcpServers.md           # MCP server integration
│   │       ├── models.md               # Model configuration
│   │       ├── prompts.md              # Custom prompt definitions
│   │       └── rules.md                # Rule engine configuration
│   │
│   └── release-notes/                  # Version history
│       └── v0.1.0.md                   # Current version notes
│
├── Architecture Documentation/         # Comprehensive analysis
│   ├── EXECUTIVE_SUMMARY.md            # Leadership overview
│   ├── ARCHITECTURE_REVIEW.md          # Complete technical review
│   ├── ARCHITECTURE_DIAGRAMS.md        # System architecture diagrams
│   ├── ACTIONABLE_RECOMMENDATIONS.md   # Implementation roadmap
│   ├── ARCHITECTURE_ANALYSIS_SUMMARY.md# Deep technical analysis
│   │
│   └── ... (15+ architecture documents)
│
└── architecture_analysis.json          # Machine-readable architecture data
```

### Key Documentation Locations

| Document | Purpose | Read When |
|----------|---------|-----------|
| `Configure-the-Cody.md` | Config schema & examples | Setting up new features |
| `ARCHITECTURE_REVIEW.md` | Complete technical analysis | Understanding system design |
| `ACTIONABLE_RECOMMENDATIONS.md` | Implementation roadmap | Planning new work |
| `ARCHITECT_SUMMARY.md` | Quick reference overview | Quick lookup |
| `features/*.md` | Feature-specific docs | Working on specific features |

---

## Architecture Deep Dive

### System Architecture Pattern: Hub-and-Spoke

Cody uses a **configuration-driven hub-and-spoke architecture** where `config.yaml` is the central orchestrator:

```
                          ┌──────────────────┐
                          │   config.yaml    │
                          │  (Central Hub)   │
                          └────────┬─────────┘
                                   │
                 ┌─────────────────┼─────────────────┐
                 │                 │                 │
            ┌────▼────┐       ┌────▼────┐      ┌────▼────┐
            │  Models │       │ Context  │      │  Rules  │
            │Provider │       │Providers │      │ Engine  │
            └────┬────┘       └────┬────┘      └────┬────┘
                 │                 │                 │
        ┌────────┴─────────┐       │          ┌──────┴──────┐
        │                  │       │          │             │
    ┌───▼──┐  ┌────┐  ┌────▼──┐   │      ┌───▼──┐  ┌──────▼──┐
    │OpenAI│  │Claude Mistral │   │      │Glob  │  │System   │
    └──────┘  │Ollama├────────┘   │      │Rules │  │Messages │
              └──────┘             │      └──────┘  └─────────┘
                                   │
                      ┌────────────▼────────────┐
                      │   Context Aggregation   │
                      │  (File, Code, Docs,    │
                      │   Diff, Terminal, etc.) │
                      └────────────┬────────────┘
                                   │
                    ┌──────────────▼──────────────┐
                    │   Feature Modes            │
                    ├──────────────┬──────────────┤
                    │ Chat │ Edit │ Agent │Auto  │
                    └──────┬───────┬───────┬──────┘
                           │       │       │
                    ┌──────▼───────▼───────▼──────┐
                    │     IDE Integration         │
                    │  (File ops, Terminal, UI)   │
                    └─────────────────────────────┘
```

### Core Components

#### **1. Configuration System** (Central Authority)
- **File**: `config.yaml`
- **Role**: Single source of truth for all behaviors
- **Key Features**:
  - Declarative specification (no code changes needed)
  - YAML-based for readability
  - Supports multiple environments
  - Runtime-loadable without restart

**Why This Matters**: Users can customize Cody without touching code or rebuilding.

---

#### **2. Model Management System** (LLM Orchestration)
- **Supported Providers**: OpenAI, Ollama, Mistral, Anthropic (Claude)
- **Role-Based Dispatch**: Different models for different tasks
  - `chat`: Conversation mode
  - `edit`: Code modifications
  - `autocomplete`: Real-time suggestions
  - `apply`: Tool-based changes
  - `embed`: Vector embeddings
  - `rerank`: Relevance ranking

**Why This Matters**: Teams can mix-and-match models for cost optimization.

Example:
```yaml
models:
  - name: GPT-4 (expensive, best quality)
    provider: openai
    roles: [chat, edit, apply]    # Use for important tasks
    
  - name: GPT-3.5 (cheaper)
    provider: openai
    roles: [autocomplete]          # Use for fast suggestions
    
  - name: Local LLM
    provider: ollama
    roles: [embed, rerank]         # Use for embeddings
```

---

#### **3. Context Provider System** (Information Gathering)
Pluggable context sources that feed information to the LLM:

| Provider | Provides | Use Case |
|----------|----------|----------|
| **code** | Current file content | Current context |
| **codebase** | Search across entire codebase | Finding patterns |
| **docs** | Indexed documentation | API reference |
| **diff** | Current file changes | Change context |
| **file** | Specified file content | Explicit context |
| **folder** | Directory structure | Project layout |
| **terminal** | Terminal history | Shell commands |
| **problems** | Errors/warnings | IDE diagnostics |
| **helpbot** | Help documentation | Built-in help |
| **http** | Web endpoints | External data |

**Why This Matters**: Cody understands your codebase by aggregating multiple context sources.

---

#### **4. Rules Engine** (Behavioral Constraints)
Applies file-specific rules using glob patterns:

```yaml
rules:
  - name: "Production Safety"
    rule: "Never suggest DELETE operations in production code"
    globs: "**/*.prod.ts"
    
  - name: "Test Conventions"
    rule: "Always use 'test' not 'it' for test names"
    globs: "**/*.test.ts"
```

**Why This Matters**: Different files follow different conventions automatically.

---

#### **5. Custom Prompts** (User-Defined Behaviors)
User-defined actions available in chat:

```yaml
prompts:
  - name: "Security Review"
    description: "Check for security vulnerabilities"
    prompt: "Review this code for OWASP Top 10 issues..."
    
  - name: "Performance Analysis"
    description: "Identify performance bottlenecks"
    prompt: "Analyze this code for performance issues..."
```

**Why This Matters**: Teams can standardize common code review patterns.

---

#### **6. Feature Modes** (User Interaction Patterns)

| Mode | Use | Interface |
|------|-----|-----------|
| **Chat** | Conversational | Text input, streaming response |
| **Edit** | Targeted changes | Select code, review diff, accept/reject |
| **Agent** | Autonomous tasks | Step-by-step with permission gates |
| **Autocomplete** | Real-time suggestions | Inline suggestions as you type |

---

### Data Flow Architecture

```
Step 1: User Input
└─→ Developer types prompt or selects code

Step 2: Configuration Loading
└─→ Load ~/.cody/config.yaml
└─→ Parse YAML into memory
└─→ Validate against schema

Step 3: Mode Selection
└─→ Chat/Edit/Agent/Autocomplete
└─→ Route to appropriate handler

Step 4: Model Selection
└─→ Query models by role
└─→ Select best-fit provider

Step 5: Context Aggregation
└─→ Invoke code provider → file content
└─→ Invoke docs provider → documentation
└─→ Invoke diff provider → changes
└─→ Invoke terminal provider → recent commands
└─→ Merge all contexts (up to token limit)

Step 6: Rules Application
└─→ Match current file against globs
└─→ Compose file-specific rules
└─→ Add to system message

Step 7: Custom Prompts
└─→ Load user-defined prompts
└─→ Make available in chat

Step 8: LLM Invocation
└─→ Compose full prompt with context + rules
└─→ Send to selected model
└─→ Stream response back

Step 9: Response Handling
└─→ Format output for display
└─→ Parse suggestions/edits
└─→ Apply IDE integration

Step 10: User Action
└─→ Accept/Reject (Edit mode)
└─→ Continue/Refine (Chat mode)
└─→ Approve tool use (Agent mode)
└─→ Apply suggestion (Autocomplete mode)
```

---

## Key Modules & Components

### 1. Feature Modes Layer

#### **Chat Mode**
- **Purpose**: Interactive conversation with context awareness
- **Input**: Natural language prompt + optional context
- **Output**: Streamed text response
- **Configuration**:
  ```yaml
  models:
    - name: ChatModel
      roles: [chat]
      temperature: 0.7  # Balanced creativity
  ```
- **Key File**: `syncfusion-cody/features/Chat.md`

**Common Interactions**:
```
User: "How do I implement error handling in this async function?"
Cody: [Analyzes current file] "Based on your code, here are 3 patterns..."
```

---

#### **Edit Mode**
- **Purpose**: Targeted code modifications with review control
- **Input**: Selected code + instruction
- **Output**: Diff view + accept/reject buttons
- **Workflow**:
  1. Developer highlights code
  2. Types instruction in chat
  3. Cody generates diff
  4. Developer accepts or rejects
  5. Change applied to file
- **Configuration**:
  ```yaml
  models:
    - name: EditModel
      roles: [edit]
      temperature: 0.2  # Less creative, more precise
  ```
- **Key File**: `syncfusion-cody/features/Edit.md`

**Common Interactions**:
```
User: "Convert this to async/await"
Cody: [Shows diff] 
Dev: [Clicks Accept]
Cody: [Updates file]
```

---

#### **Agent Mode** ⭐ (Most Complex)
- **Purpose**: Autonomous multi-step task execution
- **Input**: Task description
- **Output**: Complete implementation with change summary
- **Workflow**:
  1. **Understand** - Parse task requirements
  2. **Explore** - Search codebase for patterns
  3. **Plan** - Create implementation blueprint
  4. **Execute** - Apply changes (with permission gates)
  5. **Verify** - Test and validate results
  6. **Report** - Summarize what was done

- **Permission Model**: Agent asks for approval before:
  - Reading files
  - Writing files
  - Executing terminal commands
  - Modifying configuration

- **Configuration**:
  ```yaml
  models:
    - name: AgentModel
      roles: [apply]  # Tool execution capability
      tool_use: true
      reasoning: true  # Multi-step planning
  ```
- **Key File**: `syncfusion-cody/features/Agent.md`

**6-Step Workflow Visual**:
```
┌─ Step 1: UNDERSTAND REQUEST
│  └─→ Parse task, identify scope
│
├─ Step 2: EXPLORE CODEBASE
│  └─→ Search files, understand patterns
│
├─ Step 3: PLAN CHANGES
│  └─→ Create blueprint, estimate effort
│
├─ Step 4: EXECUTE CHANGES
│  ├─→ Request permission for each tool
│  ├─→ Wait for user approval
│  └─→ Apply changes
│
├─ Step 5: VERIFY RESULTS
│  └─→ Run tests, check for errors
│
└─ Step 6: REPORT COMPLETION
   └─→ Summarize changes made
```

**Common Interactions**:
```
User: "Add TypeScript strict mode to all files"
Cody: "I'll search for tsconfig.json and update it. Continue?" [User clicks Continue]
Cody: "Found 3 tsconfig files. I'll update production config. Approve?" [User clicks Approve]
Cody: "Done! Updated 3 files, 0 errors"
```

---

#### **Autocomplete Mode**
- **Purpose**: Real-time inline code suggestions
- **Input**: Current position in code + surrounding context
- **Output**: Predicted next tokens/lines
- **Performance**: <100ms response time
- **Configuration**:
  ```yaml
  models:
    - name: AutocompleteModel
      roles: [autocomplete]
      maxTokens: 10  # Short suggestions only
      temperature: 0.3  # Deterministic
  ```
- **Key File**: `syncfusion-cody/features/Autocomplete.md`

**Common Interactions**:
```
User types: "function validateEmail"
Cody suggests: "(email: string): boolean {"
```

---

### 2. Core Services Layer

#### **Configuration Loader**
- **Responsibility**: Parse and validate config.yaml
- **File**: Usually in `.cody/config.yaml` or IDE settings
- **Lifecycle**:
  1. Load YAML file
  2. Parse into configuration object
  3. Validate against schema
  4. Merge with defaults
  5. Apply environment variables
  6. Cache for performance

**Critical Issue**: ⚠️ Currently doesn't resolve environment variables like `${OPENAI_API_KEY}`

---

#### **Model Manager**
- **Responsibility**: Route requests to appropriate LLM
- **Selection Logic**:
  ```
  Given: Chat mode + temperature setting
  Find: All models with 'chat' role
  Select: First matching provider with lowest latency
  Fallback: To next provider if selected one fails
  ```
- **Supported Providers**:
  - OpenAI (ChatGPT, GPT-4)
  - Ollama (Local models)
  - Mistral (Open models)
  - Anthropic (Claude)

---

#### **Context Aggregator**
- **Responsibility**: Collect context from all providers
- **Providers** (can be combined):
  - `code`: Current file
  - `codebase`: Search results
  - `docs`: Indexed documentation
  - `diff`: Git changes
  - `terminal`: Shell history
  - `folder`: Directory structure
  - `problems`: IDE errors
  - Plus custom HTTP endpoints

- **Algorithm**:
  ```
  For each enabled provider:
    Get context chunks
    Estimate tokens
    Add to buffer (up to max)
  
  Rank by relevance (if provider supports ranking)
  Compose into system prompt
  ```

**Problem**: ⚠️ No token budgeting - can exceed model limits

---

#### **Rules Engine**
- **Responsibility**: Apply file-specific constraints
- **Processing**:
  ```yaml
  rules:
    - rule: "Never use 'var', always use 'const' or 'let'"
      globs: "**/*.ts"
  ```
- **Implementation**:
  1. Get current file path
  2. Match against glob patterns
  3. Collect matching rules
  4. Add to system message before LLM call

---

### 3. Context Providers (Pluggable)

Each context provider implements the same interface:

```
Interface ContextProvider:
  - name: string
  - description: string
  - getContext(params): Promise<string>
  - estimateTokens(params): number
```

**Built-In Providers**:

1. **Code Provider**
   - Returns: Content of current file
   - Use: Real-time awareness of what developer is working on

2. **Codebase Provider**
   - Returns: Search results from entire codebase
   - Parameters: Search query, file filter
   - Use: Finding similar patterns

3. **Documentation Provider**
   - Returns: Indexed documentation content
   - Parameters: Search term, depth limit
   - Use: API reference context

4. **Diff Provider**
   - Returns: Git diff of current changes
   - Use: Understanding what changed

5. **Terminal Provider**
   - Returns: Recent terminal commands/output
   - Use: Shell command context

---

### 4. Integration Layer

#### **IDE Integration**
- File operations: Read/write/create files
- Terminal: Execute commands and capture output
- Permissions: Request user approval
- UI: Display chat, diffs, suggestions

#### **MCP Server Integration**
- Model Context Protocol (MCP) for extensibility
- Allows external tools to be integrated
- Example: Database tools, API clients, CI/CD systems

---

## API Endpoints & Interfaces

### Configuration Schema API

#### **Root Configuration Object**

```yaml
name: string (required)           # Identifier: "Local Assistant"
version: string (required)        # Semantic version: "1.0.0"
schema: string (required)         # Schema version: "v1"

models: ModelConfig[]             # Language model definitions
context: ContextConfig[]          # Context provider settings
rules: RuleConfig[]               # Behavioral constraints
prompts: PromptConfig[]           # Custom prompt definitions
docs: DocConfig[]                 # Documentation indexing
mcpServers: MCPServerConfig[]     # MCP protocol servers
```

---

#### **Models Configuration**

```yaml
models:
  - name: string (required)
    provider: string (required)   # "openai" | "ollama" | "mistral" | "anthropic"
    model: string (required)      # Model identifier
    apiKey: string                # ⚠️ USE ENVIRONMENT VARIABLE: ${OPENAI_API_KEY}
    apiBase: string               # Alternative endpoint URL
    roles: string[]               # Task roles: ["chat", "edit", "autocomplete", "apply", "embed", "rerank"]
    capabilities: string[]        # ["tool_use", "image_input", "reasoning"]
    defaultCompletionOptions:
      temperature: number (0-1)   # Creativity level
      maxTokens: number           # Max response tokens
      contextLength: number       # Model's context window
      reasoning: boolean          # Enable chain-of-thought
```

**Example**:
```yaml
models:
  - name: "GPT-4o"
    provider: "openai"
    model: "gpt-4-turbo"
    apiKey: ${OPENAI_API_KEY}     # ✅ CORRECT: Use env var
    roles: [chat, edit, apply]
    defaultCompletionOptions:
      temperature: 0.7
      maxTokens: 4096
      contextLength: 128000
```

---

#### **Context Configuration**

```yaml
context:
  - provider: string (required)   # "code" | "codebase" | "docs" | "diff" | ...
    name: string                  # Display name
    enabled: boolean              # Default: true
    params: object                # Provider-specific settings
```

**Provider-Specific Parameters**:

```yaml
# Code Provider
- provider: "code"
  # No additional params needed

# Codebase Provider
- provider: "codebase"
  params:
    maxResults: 5               # Max search results

# Docs Provider
- provider: "docs"
  params:
    maxDepth: 4                 # How deep to crawl

# Diff Provider
- provider: "diff"
  # No additional params needed

# Terminal Provider
- provider: "terminal"
  params:
    maxHistory: 10              # Recent command count

# HTTP Provider
- provider: "http"
  params:
    endpoint: "https://api.example.com/context"
    headers:
      Authorization: "Bearer ${API_TOKEN}"
```

---

#### **Rules Configuration**

```yaml
rules:
  - "Simple rule string"                    # Basic rule
  
  - name: "Rule Name"
    rule: "Rule description"                # Complex rule
    globs: "**/*.{ts,tsx}"                  # File patterns (glob syntax)
    severity: "warning" | "error"           # Enforcement level
```

**Example**:
```yaml
rules:
  - "Always use async/await, never use callbacks"
  
  - name: "No console.log in production"
    rule: "Replace console.log with logger.info"
    globs: "src/**/*.prod.ts"
    severity: "error"
    
  - name: "Test naming convention"
    rule: "Use 'test' not 'it' for test cases"
    globs: "**/*.test.ts"
```

---

#### **Prompts Configuration**

```yaml
prompts:
  - name: string (required)                 # "Security Review"
    description: string                     # "Check for vulnerabilities"
    prompt: string (required)               # Full prompt text
    category: string                        # Optional grouping
```

**Example**:
```yaml
prompts:
  - name: "Security Review"
    description: "Check for OWASP Top 10 issues"
    category: "Review"
    prompt: |
      Review this code for security vulnerabilities:
      - Injection attacks (SQL, XSS, Command)
      - Broken authentication
      - Sensitive data exposure
      - XML External Entities (XXE)
      - Broken access control
      Return findings in format: [SEVERITY] Issue: Description
      
  - name: "Performance Analysis"
    description: "Find performance bottlenecks"
    category: "Review"
    prompt: |
      Analyze this code for performance issues:
      - Unnecessary loops or complexity
      - Memory leaks
      - Inefficient algorithms
      Report with impact level: HIGH/MEDIUM/LOW
```

---

#### **Documentation Configuration**

```yaml
docs:
  - name: string (required)                 # "React Docs"
    startUrl: string (required)             # https://react.dev
    maxDepth: number                        # 1-10, default: 4
    favicon: string                         # Icon URL
    useLocalCrawling: boolean               # Crawl locally vs API
```

**Example**:
```yaml
docs:
  - name: "React Documentation"
    startUrl: "https://react.dev"
    maxDepth: 3
    favicon: "https://react.dev/favicon.png"
    
  - name: "Syncfusion Components"
    startUrl: "https://www.syncfusion.com/react-components/react-ej2"
    maxDepth: 2
    useLocalCrawling: true
```

---

#### **MCP Servers Configuration**

```yaml
mcpServers:
  - name: string (required)                 # "Context7"
    command: string (required)              # "npx -y"
    args: string[]                          # ["-y", "@upstash/context7-mcp@latest"]
    env: object                             # Environment variables
    connectionTimeout: number               # Milliseconds
```

---

### Feature API: Chat Mode

```typescript
interface ChatRequest {
  prompt: string;
  context?: {
    currentFile?: string;
    selection?: string;
    codebaseSearch?: string;
  };
  model?: string;
  temperature?: number;
}

interface ChatResponse {
  id: string;
  content: string;
  tokens: {
    input: number;
    output: number;
  };
  model: string;
  timestamp: ISO8601;
}
```

---

### Feature API: Edit Mode

```typescript
interface EditRequest {
  originalCode: string;
  instruction: string;
  fileType?: string;
}

interface EditResponse {
  id: string;
  originalCode: string;
  modifiedCode: string;
  diff: PatchFormat;
  explanation: string;
  confidence: "high" | "medium" | "low";
}
```

---

### Feature API: Agent Mode

```typescript
interface AgentRequest {
  task: string;
  scope?: string[];  // Files to operate on
  constraints?: string[];
}

interface AgentResponse {
  id: string;
  status: "planning" | "executing" | "verifying" | "completed" | "failed";
  steps: AgentStep[];
  summary: string;
}

interface AgentStep {
  type: "explore" | "plan" | "execute" | "verify";
  description: string;
  requiresApproval: boolean;
  result?: string;
}
```

---

## Configuration System

### How Configuration Works

#### **Step 1: Loading**
```typescript
// Pseudo-code
const configPath = ~/.cody/config.yaml
const rawYaml = fs.readFileSync(configPath)
const parsed = YAML.parse(rawYaml)
const validated = validateSchema(parsed)
const withDefaults = mergeDefaults(validated)
const resolved = resolveEnvVars(withDefaults)
const cached = cacheInMemory(resolved)
```

#### **Step 2: Runtime Usage**
```typescript
// When user initiates chat:
const config = loadConfig()
const model = selectModel(config.models, 'chat')
const context = aggregateContext(config.context)
const rules = applyRules(config.rules, currentFile)
const systemMessage = composeMessage(context, rules)
const response = await invokeModel(model, systemMessage, userPrompt)
```

---

### Best Practices for Configuration

#### ✅ DO:
- Use environment variables for secrets: `${OPENAI_API_KEY}`
- Keep config files in `.gitignore`
- Use semantic versioning for config version
- Document custom rules inline
- Test configuration changes before committing

#### ❌ DON'T:
- Hardcode API keys in config
- Commit config files with secrets
- Use overly complex glob patterns
- Add rules that contradict each other
- Enable all context providers (use minimal set needed)

---

### Configuration Validation

```yaml
# VALID ✅
name: My Config
version: 1.0.0
schema: v1
models:
  - name: GPT-4
    provider: openai
    model: gpt-4-turbo
    apiKey: ${OPENAI_API_KEY}
    roles: [chat]

# INVALID ❌
name: My Config
version: 1.0.0
# Missing schema ✗
models:
  - name: GPT-4
    provider: openai
    apiKey: sk-1234567890  # ✗ Hardcoded secret!
    # Missing model name ✗
```

---

## Data Schema

### Configuration Schema Diagram

```
ConfigRoot
├── name: string
├── version: string
├── schema: string
│
├── models: ModelConfig[]
│   └── ModelConfig
│       ├── name: string
│       ├── provider: "openai" | "ollama" | "mistral" | "anthropic"
│       ├── model: string
│       ├── apiKey: string (env var ref)
│       ├── roles: string[]
│       └── defaultCompletionOptions
│           ├── temperature: number
│           ├── maxTokens: number
│           └── contextLength: number
│
├── context: ContextConfig[]
│   └── ContextConfig
│       ├── provider: string
│       ├── name: string
│       ├── enabled: boolean
│       └── params: object
│
├── rules: RuleConfig[]
│   └── RuleConfig
│       ├── name: string
│       ├── rule: string
│       ├── globs: string (glob pattern)
│       └── severity: "warning" | "error"
│
├── prompts: PromptConfig[]
│   └── PromptConfig
│       ├── name: string
│       ├── description: string
│       ├── prompt: string
│       └── category: string
│
├── docs: DocConfig[]
│   └── DocConfig
│       ├── name: string
│       ├── startUrl: string
│       ├── maxDepth: number
│       └── useLocalCrawling: boolean
│
└── mcpServers: MCPServerConfig[]
    └── MCPServerConfig
        ├── name: string
        ├── command: string
        ├── args: string[]
        ├── env: object
        └── connectionTimeout: number
```

---

### Data Flow During Request

```
User Input
    ↓
[1] Load config.yaml
    ├─→ Parse YAML
    ├─→ Validate schema
    └─→ Merge environment variables
    ↓
[2] Select Feature Mode (Chat/Edit/Agent/Autocomplete)
    ↓
[3] Resolve Model
    ├─→ Query models by role
    ├─→ Check provider availability
    └─→ Select best match
    ↓
[4] Aggregate Context
    ├─→ Invoke each enabled provider
    │   ├─→ Code provider
    │   ├─→ Docs provider
    │   ├─→ Codebase provider
    │   ├─→ Diff provider
    │   └─→ Terminal provider
    ├─→ Merge contexts
    └─→ Truncate to token limit
    ↓
[5] Apply Rules
    ├─→ Get current file path
    ├─→ Match globs in rules
    └─→ Add matching rules to system message
    ↓
[6] Compose Full Prompt
    ├─→ System message (rules + instructions)
    ├─→ Context
    ├─→ User prompt
    └─→ Previous messages (conversation history)
    ↓
[7] Invoke LLM
    ├─→ Send request to provider
    ├─→ Stream or batch response
    └─→ Parse output
    ↓
[8] Format Response
    ├─→ Chat mode: Display text
    ├─→ Edit mode: Generate diff
    ├─→ Agent mode: Parse actions + seek approval
    ├─→ Autocomplete mode: Show suggestions
    ↓
[9] IDE Integration
    ├─→ Update UI
    ├─→ Accept user action
    └─→ Apply changes if approved
```

---

## Deployment Process

### Architecture: Multi-Environment Support

Cody supports three deployment scenarios:

```
┌──────────────────────────────────────────────────────┐
│              Development Environment                 │
│  (Local machine, localhost models, debug mode)       │
└──────────────────────────────────────────────────────┘
                        ↓
┌──────────────────────────────────────────────────────┐
│             Staging Environment                      │
│  (Pre-production, API testing, team validation)      │
└──────────────────────────────────────────────────────┘
                        ↓
┌──────────────────────────────────────────────────────┐
│            Production Environment                    │
│  (Live IDE usage, strict security, monitoring)       │
└──────────────────────────────────────────────────────┘
```

### Deployment Checklist

#### **Pre-Deployment Phase**

- [ ] **Security Audit**
  - Remove hardcoded credentials
  - Verify env variable resolution
  - Check for secrets in logs
  - Run security scanner

- [ ] **Configuration Validation**
  - Validate config.yaml schema
  - Test all configured models
  - Verify context providers
  - Check documentation URLs

- [ ] **Testing**
  - Unit tests pass
  - Integration tests pass
  - E2E tests in staging
  - Configuration tests

- [ ] **Documentation**
  - Update CHANGELOG
  - Document breaking changes
  - Update configuration guide
  - Add troubleshooting entries

#### **Deployment Phase**

1. **Create Release Branch**
   ```bash
   git checkout -b release/v0.2.0
   ```

2. **Update Configuration**
   - Update version in config.yaml
   - Document changes in release notes

3. **Build & Package**
   ```bash
   npm run build
   npm run package
   ```

4. **Deploy to Staging**
   ```bash
   npm run deploy:staging
   ```

5. **Smoke Tests**
   - Test each feature mode
   - Verify all providers
   - Check error handling

6. **Deploy to Production**
   ```bash
   npm run deploy:production
   ```

#### **Post-Deployment Phase**

- [ ] Monitor logs for errors
- [ ] Check performance metrics
- [ ] Collect user feedback
- [ ] Prepare rollback plan

---

### Environment-Specific Configurations

#### **Development (dev.config.yaml)**
```yaml
name: Development
schema: v1
models:
  - name: Local Ollama
    provider: ollama
    model: mistral:latest
    apiBase: http://localhost:11434
    roles: [chat, edit]

context:
  - provider: code
  - provider: codebase
  - provider: diff

docs:
  - name: Local Docs
    startUrl: file:///docs
    useLocalCrawling: true
```

#### **Staging (staging.config.yaml)**
```yaml
name: Staging
schema: v1
models:
  - name: GPT-4 Turbo
    provider: openai
    model: gpt-4-turbo
    apiKey: ${OPENAI_API_KEY_STAGING}
    roles: [chat, edit, apply]

context:
  - provider: code
  - provider: codebase
  - provider: docs

rules:
  - "No changes to production data"
```

#### **Production (prod.config.yaml)**
```yaml
name: Production
schema: v1
models:
  - name: GPT-4 Turbo
    provider: openai
    model: gpt-4-turbo
    apiKey: ${OPENAI_API_KEY}
    roles: [chat, edit]
    
  - name: GPT-3.5 Turbo
    provider: openai
    model: gpt-3.5-turbo
    apiKey: ${OPENAI_API_KEY}
    roles: [autocomplete]

context:
  - provider: code
  - provider: diff

rules:
  - name: "Production Safety"
    rule: "Never execute destructive operations"
    globs: "**/*.prod.ts"
    severity: "error"
```

---

## Development Workflow

### Getting Started as a New Developer

#### **Day 1: Setup**

1. **Clone Repository**
   ```bash
   git clone https://github.com/syncfusion/cody
   cd cody
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Setup Configuration**
   ```bash
   cp config.example.yaml ~/.cody/config.yaml
   # Edit to add your API keys as environment variables
   ```

4. **Verify Installation**
   ```bash
   npm run test
   npm run lint
   ```

#### **Day 2: Understand Architecture**

1. **Read Core Documents** (2 hours)
   - This file (ENGINEER_ONBOARDING_GUIDE.md)
   - ARCHITECTURE_REVIEW.md
   - ARCHITECTURE_DIAGRAMS.md

2. **Run Local Instance** (1 hour)
   ```bash
   npm run dev
   ```

3. **Test Each Feature** (2 hours)
   - Test Chat mode
   - Test Edit mode
   - Test Agent mode
   - Test Autocomplete mode

#### **Day 3-5: First Task**

Typical first task: "Fix plaintext API keys in documentation" (2-3 hours)

**Process**:
```
1. Find issue → grep -r "apiKey:" docs/
2. Create branch → git checkout -b fix/plaintext-credentials
3. Update docs → Replace hardcoded keys with ${ENV_VAR}
4. Test config → npm run validate-config
5. Commit → git commit -m "fix: remove plaintext API keys from examples"
6. Push → git push origin fix/plaintext-credentials
7. Create PR → Use GitHub UI or gh tool
```

---

### Development Workflow

#### **For Feature Development**

```
1. Create Issue (GitHub)
   Title: "Feature: Add token budgeting"
   Description: Problem + Acceptance Criteria

2. Create Branch
   git checkout -b feat/token-budgeting

3. Plan Architecture
   - Update ARCHITECTURE_REVIEW.md
   - Discuss design in PR comments

4. Implement Feature
   - Write code
   - Follow existing patterns
   - Add tests

5. Test Thoroughly
   npm run test
   npm run lint
   npm run type-check

6. Document Changes
   - Update feature documentation
   - Update configuration schema if needed
   - Add troubleshooting if relevant

7. Commit with Clear Messages
   git commit -m "feat: implement token budgeting system"

8. Push & Create PR
   git push origin feat/token-budgeting
   npm run create-pr

9. Code Review
   - Respond to review comments
   - Make requested changes
   - Ensure tests pass

10. Merge & Deploy
    - Squash commits if needed
    - Merge to develop branch
    - Tag release version
```

#### **For Bug Fixes**

```
1. Create Issue (GitHub)
   Title: "Bug: Config loader doesn't resolve env variables"
   Description: Steps to reproduce + Expected behavior

2. Create Branch
   git checkout -b fix/config-env-resolution

3. Reproduce Bug
   - Write test that demonstrates issue
   - Verify test fails

4. Fix Implementation
   - Make minimal changes
   - Fix only what's broken

5. Verify Test Passes
   npm run test -- --watch

6. Commit with Issue Reference
   git commit -m "fix: resolve environment variables in config loader

   Fixes #123
   - Add env var resolution in ConfigLoader
   - Support ${VAR_NAME} syntax
   - Test coverage included"

7. Create PR with Fix Reference
8. Merge after review
```

#### **For Documentation**

```
1. Create Branch
   git checkout -b docs/add-security-guide

2. Write Documentation
   - Follow existing style
   - Use clear examples
   - Include code snippets

3. Review Locally
   - Check markdown rendering
   - Verify links work
   - Spell check

4. Commit
   git commit -m "docs: add security best practices guide"

5. Create PR
6. Merge after review
```

---

### Code Standards

#### **Style Guide**

Follow these conventions:

- **Naming**: `camelCase` for functions/variables, `PascalCase` for classes
- **Files**: `kebab-case.ts` for TypeScript, `PascalCase.tsx` for React
- **Config**: YAML with 2-space indentation
- **Comments**: Use JSDoc for public APIs
- **Error Messages**: Clear, actionable, prefix with component

#### **Testing Standards**

- Aim for >80% code coverage
- Test public APIs, not implementation details
- Use descriptive test names
- Group tests with `describe` blocks

#### **Git Standards**

- Branch naming: `feat/feature-name`, `fix/bug-name`, `docs/description`
- Commit messages: `type: description` (feat, fix, docs, refactor, test, chore)
- No squashing individual commits during development
- Create PR with clear description

---

### Common Development Tasks

#### **Adding a New Context Provider**

1. **Create provider file**
   ```typescript
   // src/contextProviders/MyProvider.ts
   export class MyProvider implements ContextProvider {
     name = "myprovider"
     
     async getContext(params: any): Promise<string> {
       // Fetch context...
       return context
     }
     
     estimateTokens(params: any): number {
       return 500
     }
   }
   ```

2. **Register in configuration loader**
   ```typescript
   providers.set("myprovider", MyProvider)
   ```

3. **Update documentation**
   - Add to `reference/configure-properties/context.md`
   - Document parameters
   - Add examples

4. **Add tests**
   ```typescript
   describe("MyProvider", () => {
     it("should fetch context", async () => {
       const provider = new MyProvider()
       const context = await provider.getContext({})
       expect(context.length).toBeGreaterThan(0)
     })
   })
   ```

5. **Update CHANGELOG**
   ```
   - Added MyProvider context source
   ```

---

#### **Adding a New Model Provider**

1. **Add to model configuration schema**
   ```yaml
   models:
     - name: MyModel
       provider: myprovider  # New provider
       model: model-name
       roles: [chat]
   ```

2. **Implement provider**
   ```typescript
   export class MyProviderAdapter implements ModelProvider {
     async invoke(prompt: string): Promise<string> {
       // Call external API
       return response
     }
   }
   ```

3. **Register and test**
4. **Update documentation**

---

#### **Fixing a Critical Security Issue**

1. **Create security branch**
   ```bash
   git checkout -b security/issue-name
   ```

2. **Implement fix**
   - Make minimal change
   - Don't refactor surrounding code

3. **Add test demonstrating vulnerability**
   ```typescript
   it("should not expose credentials in logs", () => {
     const logs = captureSystemLogs()
     expect(logs).not.toContain("sk-1234567890")
   })
   ```

4. **Create urgent PR**
   - Mark as `[SECURITY]` in title
   - Add details in PR description
   - Request immediate review

5. **Deploy with hotfix process**
   - Skip normal testing phases
   - Deploy directly to production
   - Notify users if needed

---

## Common Troubleshooting

### Configuration Issues

#### ❌ Problem: "Config file not found"

**Symptoms**:
```
Error: Cannot find config.yaml
```

**Solutions**:
1. Check file exists at `~/.cody/config.yaml`
2. Verify file permissions: `chmod 644 ~/.cody/config.yaml`
3. Check XDG_CONFIG_HOME environment variable
4. Copy from template: `cp config.example.yaml ~/.cody/config.yaml`

---

#### ❌ Problem: "Environment variables not resolved"

**Symptoms**:
```yaml
apiKey: ${OPENAI_API_KEY}  # Stays as literal string
```

**Solutions**:
1. Verify env var is set: `echo $OPENAI_API_KEY`
2. Check format: Must be `${VAR_NAME}` (not `$VAR_NAME`)
3. Restart IDE after setting env var
4. Check if resolution is implemented (currently not supported - use workaround)

**Workaround**: Use shell-based config loading
```bash
envsubst < config.template.yaml > ~/.cody/config.yaml
```

---

#### ❌ Problem: "Invalid configuration schema"

**Symptoms**:
```
ValidationError: Missing required field 'name'
```

**Solutions**:
1. Validate config: `npm run validate-config`
2. Compare with template: `diff config.yaml config.example.yaml`
3. Check YAML indentation (must be 2 spaces)
4. Ensure required fields present: `name`, `version`, `schema`

---

### Model/Provider Issues

#### ❌ Problem: "OpenAI API key invalid"

**Symptoms**:
```
Error 401: Unauthorized - Invalid API key
```

**Solutions**:
1. Verify key format: `echo $OPENAI_API_KEY`
2. Test key directly: `curl -H "Authorization: Bearer $OPENAI_API_KEY" https://api.openai.com/v1/models`
3. Check key permissions: Must have chat completions enabled
4. Regenerate key in OpenAI dashboard
5. Ensure no extra spaces/newlines in key

---

#### ❌ Problem: "Cannot connect to Ollama"

**Symptoms**:
```
Error: ECONNREFUSED localhost:11434
```

**Solutions**:
1. Start Ollama: `ollama serve`
2. Check port: `lsof -i :11434`
3. Verify model exists: `ollama list`
4. Pull model if missing: `ollama pull mistral`
5. Check URL in config: Should be `http://localhost:11434`

---

#### ❌ Problem: "Model not found"

**Symptoms**:
```
Error: Model 'gpt-4-unknown' not available
```

**Solutions**:
1. Check available models: See MODEL_CATALOG
2. Use correct model name: `gpt-4-turbo` not `gpt-4`
3. Verify model is enabled in your OpenAI account
4. Check API key has access to that model

---

### Context & Rule Issues

#### ❌ Problem: "Context provider timeout"

**Symptoms**:
```
Timeout: Docs provider took >30s to respond
```

**Solutions**:
1. Disable problematic provider in config
2. Reduce maxDepth for documentation crawling
3. Check network connectivity
4. Reduce maxResults for search providers

---

#### ❌ Problem: "Rules not applying"

**Symptoms**:
```
Rule specified for *.prod.ts but not applied
```

**Solutions**:
1. Verify glob pattern: Use glob tester to validate
2. Check file path matches: Log current file path
3. Ensure rules section exists in config
4. Verify file is actually being edited

---

### Response Quality Issues

#### ❌ Problem: "Responses are too generic"

**Solutions**:
1. Increase temperature: `0.1` (precise) → `0.7` (creative)
2. Add more context providers
3. Use custom prompts for domain-specific guidance
4. Add relevant rules for file type
5. Provide more specific instructions

---

#### ❌ Problem: "Responses too random/variable"

**Solutions**:
1. Decrease temperature: `0.7` → `0.1`
2. Reduce number of context providers
3. Use simpler rules
4. Test with different model
5. Increase maxTokens for better reasoning

---

#### ❌ Problem: "Context truncated, incomplete responses"

**Solutions** (future - token budgeting not yet implemented):
1. Reduce max context size
2. Disable less critical providers
3. Reduce maxDepth for docs crawling
4. Use more specific search queries
5. Plan for token budgeting feature

---

### IDE Integration Issues

#### ❌ Problem: "Chat not appearing in IDE"

**Solutions**:
1. Restart IDE completely
2. Check IDE extension is enabled
3. Verify config loads without errors: `npm run validate-config`
4. Check IDE console for errors: Ctrl+Shift+J (DevTools)
5. Reinstall extension

---

#### ❌ Problem: "File edits not saving"

**Solutions**:
1. Verify file permissions
2. Check disk space available
3. Ensure file is not open in another process
4. Check IDE has file write permissions
5. Try manual edit first

---

### Performance Issues

#### ❌ Problem: "Cody responses are slow (>30s)"

**Causes & Solutions**:

| Cause | Solution |
|-------|----------|
| Large codebase search | Reduce maxResults or disable codebase provider |
| Slow documentation crawl | Reduce maxDepth or disable docs provider |
| Network latency | Check internet connection, try different model provider |
| Large context aggregation | Disable unnecessary providers |
| Model overloaded | Try different model or provider |

---

#### ❌ Problem: "IDE lag/freezing when using Cody"

**Solutions**:
1. Disable autocomplete mode (runs constantly)
2. Reduce context size
3. Use faster model for autocomplete role
4. Check system resources: Top, Activity Monitor
5. Close other applications

---

## Quick Reference

### Key Files & Their Purpose

| File | Purpose |
|------|---------|
| `~/.cody/config.yaml` | Your Cody configuration |
| `ENGINEER_ONBOARDING_GUIDE.md` | ← YOU ARE HERE |
| `ARCHITECTURE_REVIEW.md` | Detailed technical analysis |
| `ACTIONABLE_RECOMMENDATIONS.md` | Roadmap and implementation |
| `syncfusion-cody/features/Agent.md` | Agent mode deep dive |
| `syncfusion-cody/features/Chat.md` | Chat mode deep dive |
| `syncfusion-cody/reference/Configure-the-Cody.md` | Configuration reference |

---

### Essential Commands

```bash
# Validate configuration
npm run validate-config

# Run tests
npm run test

# Run linter
npm run lint

# Run dev server
npm run dev

# Build for production
npm run build

# Check types
npm run type-check

# Format code
npm run format
```

---

### Environment Variables Reference

```bash
# OpenAI
export OPENAI_API_KEY="sk-..."

# Ollama (local)
export OLLAMA_BASE_URL="http://localhost:11434"

# Mistral
export MISTRAL_API_KEY="..."

# Anthropic Claude
export ANTHROPIC_API_KEY="..."

# Logging
export LOG_LEVEL="debug|info|warn|error"

# Configuration
export CODY_CONFIG_PATH="$HOME/.cody/config.yaml"
```

---

### Cody Architecture at a Glance

```
config.yaml (Central Hub)
    ↓
Feature Mode Selected (Chat/Edit/Agent/Autocomplete)
    ↓
Model Selected (by role)
    ↓
Context Aggregated (10+ sources)
    ↓
Rules Applied (glob-based)
    ↓
LLM Invoked
    ↓
Response Generated
    ↓
IDE Integration (display/execute)
```

---

### Critical Security Checklist

- [ ] Never hardcode API keys (use environment variables)
- [ ] Store config files outside version control (.gitignore)
- [ ] Mask credentials in logs
- [ ] Validate all user input
- [ ] Use HTTPS for remote endpoints
- [ ] Implement rate limiting
- [ ] Audit model access logs
- [ ] Rotate API keys regularly

---

### Glossary

| Term | Definition |
|------|-----------|
| **Agent Mode** | Autonomous multi-step task execution with permission gates |
| **Context Provider** | Plugin that supplies information to the LLM |
| **Chat Mode** | Interactive conversation interface |
| **Edit Mode** | Targeted code modifications with review |
| **Autocomplete** | Real-time inline suggestions |
| **Config Hub** | Central configuration (config.yaml) |
| **Rules Engine** | File-specific behavioral constraints |
| **Model** | Language model (GPT-4, Claude, etc.) |
| **Role** | Task type assigned to models (chat, edit, autocomplete) |
| **Token** | Minimal unit of text (≈4 characters) |
| **Glob** | File pattern matching syntax (\*.ts, \*\*/\*.md) |
| **MCP** | Model Context Protocol for extensibility |

---

### Support & Resources

**Getting Help**:
- GitHub Issues: Report bugs
- GitHub Discussions: Ask questions
- Architecture docs: Deep technical dive
- Feature docs: How to use each mode
- Slack #dev-cody: Team discussions

**Recommended Reading Order for New Hires**:
1. This file (ENGINEER_ONBOARDING_GUIDE.md) - 30 minutes
2. QUICK_START.md - 10 minutes
3. ARCHITECTURE_DIAGRAMS.md - 15 minutes
4. Feature docs (features/*.md) - 30 minutes
5. Reference documentation - As needed

**Time to Productivity**:
- Day 1: Project overview + setup
- Day 2: Architecture understanding
- Day 3: First code change
- Week 2: Contributing independently
- Month 1: Ownership of sub-system

---

### Next Steps for You

1. ✅ **Read this guide** (1-2 hours)
2. ✅ **Setup local environment** (1 hour)
   ```bash
   git clone https://github.com/syncfusion/cody
   cd cody
   npm install
   cp config.example.yaml ~/.cody/config.yaml
   ```

3. ✅ **Run each feature** (2 hours)
   - Test Chat mode
   - Test Edit mode
   - Test Agent mode
   - Test Autocomplete mode

4. ✅ **Read ARCHITECTURE_REVIEW.md** (30 minutes)

5. ✅ **Pick first task** (see team lead)
   - Suggested first task: "Fix plaintext API keys in docs"
   - Estimated time: 2-3 hours

6. ✅ **Join development workflow**
   - Create feature branch
   - Make changes
   - Run tests
   - Create pull request
   - Get code reviewed

---

## Conclusion

Welcome to the Syncfusion Cody team! 🎉

This guide provides everything you need to understand, work with, and contribute to Cody. The system is well-architected with clear separation of concerns, excellent configuration flexibility, and strong extensibility patterns.

**Your first week focus**:
- Understand the architecture
- Setup your development environment
- Run the local instance
- Make a small fix or documentation improvement
- Get comfortable with the contribution process

The team is here to help. Don't hesitate to ask questions, and remember that learning the system takes time—contribute at a comfortable pace.

**Key Takeaway**: Cody's strength is its **configuration-driven, modular design**. Most customizations happen in `config.yaml`, not in code changes. Embrace this flexibility, and you'll quickly see why developers love using Cody.

Happy coding! 🚀

---

**Document Version**: 1.0  
**Last Updated**: 2024  
**Maintained By**: Development Team  
**Feedback**: Please submit improvements via GitHub Issues
