# Syncfusion Cody - Architecture Visualizations

## 1. System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                    SYNCFUSION CODY ARCHITECTURE                      │
└─────────────────────────────────────────────────────────────────────┘

                         ┌──────────────────┐
                         │  config.yaml     │
                         │  (YAML Schema)   │
                         └────────┬─────────┘
                                  │
            ┌─────────────────────┼─────────────────────┐
            │                     │                     │
            ▼                     ▼                     ▼
      ┌──────────────┐    ┌──────────────┐    ┌──────────────┐
      │   MODELS     │    │   CONTEXT    │    │    RULES     │
      │              │    │  PROVIDERS   │    │              │
      ├──────────────┤    ├──────────────┤    ├──────────────┤
      │ • OpenAI     │    │ • file       │    │ • System msg │
      │ • Claude     │    │ • code       │    │ • Glob-based │
      │ • Mistral    │    │ • codebase   │    │ • Conditional│
      │ • Ollama     │    │ • docs       │    │              │
      │              │    │ • diff       │    │              │
      │ Roles:       │    │ • http       │    │              │
      │ • chat       │    │ • folder     │    │              │
      │ • edit       │    │ • terminal   │    │              │
      │ • autocomplete│   │ • problems   │    │              │
      │ • apply      │    │ • helpbot    │    │              │
      │ • embed      │    │              │    │              │
      │ • rerank     │    │              │    │              │
      └────┬─────────┘    └──────┬───────┘    └──────┬───────┘
           │                     │                    │
           └─────────────────────┼────────────────────┘
                                 │
                    ┌────────────▼─────────────┐
                    │  LLM REQUEST PIPELINE    │
                    │  (Model + Context +      │
                    │   Rules → Prompt)        │
                    └────────────┬─────────────┘
                                 │
         ┌───────────┬───────────┬┼───────────┬──────────────┐
         │           │           │            │              │
         ▼           ▼           ▼            ▼              ▼
    ┌────────┐ ┌────────┐ ┌────────┐   ┌──────────┐   ┌──────────┐
    │  CHAT  │ │  EDIT  │ │ AGENT  │   │AUTOCMPLT │   │ PROMPTS  │
    │ MODE   │ │ MODE   │ │ MODE   │   │  MODE    │   │& DOCS    │
    └────┬───┘ └────┬───┘ └────┬───┘   └────┬─────┘   └────┬─────┘
         │          │          │             │              │
         │ Cmd+L    │ Cmd+I    │ Autonomous  │ Auto          │ Custom
         │ Ctrl+L   │ Ctrl+I   │ Loop:       │ Inline        │ Invoke
         │          │          │ 1. Understand              │
         │ Conv     │ Inline   │ 2. Explore                 │
         │ w/ AI    │ Diff     │ 3. Plan                    │
         │          │          │ 4. Execute                 │
         │          │ Review   │ 5. Verify                  │
         │          │ & Apply  │ 6. Complete                │
         └────┬─────┴──────────┴────┬───────────────────────┘
              │                     │
              └──────────┬──────────┘
                         │
              ┌──────────▼──────────┐
              │  IDE INTEGRATION    │
              │  LAYER              │
              ├─────────────────────┤
              │ • Code Editor       │
              │ • File Operations   │
              │ • Terminal/Commands │
              │ • Permissions Gate  │
              │ • Inline UI         │
              └─────────────────────┘
```

---

## 2. Configuration-Driven Architecture Pattern

```
┌─────────────────────────────────────────────────────────────┐
│                    CONFIGURATION-DRIVEN DESIGN              │
└─────────────────────────────────────────────────────────────┘

User Behavior ──→ config.yaml ←── Runtime Behavior
                       │
                       │ Declarative specification
                       │
       ┌───────────────┼───────────────┬────────────┐
       │               │               │            │
    Models         Context        Rules         Prompts
    Selection      Aggregation   Application   Invocation
       │               │               │            │
       │ Role-based     │ Multi-source  │ Glob-filter │ Template
       │ dispatch       │ priority      │ + compose   │ + inject
       │               │               │            │
       └───────────────┼───────────────┴────────────┘
                       │
              LLM Invocation
              (Deterministic behavior from config)

BENEFITS:
✅ Runtime flexibility (no code changes)
✅ User customization (easy config editing)
✅ Version controllable (YAML in git)
✅ Multi-environment (dev/staging/prod configs)
✅ Reproducible behavior (config = behavior snapshot)
```

---

## 3. Agent Mode Workflow

```
┌─────────────────────────────────────────────────────────────┐
│                    AGENT MODE WORKFLOW                      │
└─────────────────────────────────────────────────────────────┘

User Request
    │
    ▼
┌──────────────────────────────────┐
│ 1. UNDERSTAND REQUEST            │
│ Parse prompt                     │
│ Extract intent & goals           │
│ Understand codebase context      │
└──────────────┬───────────────────┘
               │
               ▼
┌──────────────────────────────────┐
│ 2. EXPLORE CODEBASE              │
│ Search for relevant files        │
│ Understand dependencies          │
│ Gather context about structure   │
└──────────────┬───────────────────┘
               │
               ▼
┌──────────────────────────────────┐
│ 3. PLAN CHANGES                  │
│ Break task into steps            │
│ Identify files to modify         │
│ Prepare change strategy          │
└──────────────┬───────────────────┘
               │
               ▼
┌──────────────────────────────────┐
│ 4. EXECUTE CHANGES               │
│ Request user permission          │ ◄─────────┐
│ Apply edits to files             │           │
│ Run commands                     │           │
│ Create new files                 │           │
└──────────────┬───────────────────┘           │
               │                               │
               ├─ User Confirms ─── Yes ──────┘
               │
               ├─ User Cancels ────► Skip
               │
               ▼
┌──────────────────────────────────┐
│ 5. VERIFY RESULTS                │
│ Test changes                     │
│ Fix linter errors                │
│ Ensure code works as expected    │
└──────────────┬───────────────────┘
               │
               ▼
┌──────────────────────────────────┐
│ 6. TASK COMPLETE                 │
│ Summarize all changes            │
│ Provide results to user          │
│ Hand back control                │
└──────────────────────────────────┘

KEY DESIGN:
🔒 Permission Gate: User approval required before each tool use
🔄 Feedback Loop: Results verified, errors corrected
📊 Transparency: Each step visible to user
🛑 Safety: User can cancel at any point
```

---

## 4. Multi-Modal Feature Architecture

```
┌─────────────────────────────────────────────────────────────┐
│               MULTI-MODAL FEATURE DESIGN                    │
└─────────────────────────────────────────────────────────────┘

                    Configuration
                         │
         ┌───────────────┼───────────────┐
         │               │               │
         ▼               ▼               ▼
    ┌────────────┐  ┌────────────┐  ┌────────────┐
    │CHAT MODE   │  │ EDIT MODE  │  │AGENT MODE  │
    ├────────────┤  ├────────────┤  ├────────────┤
    │            │  │            │  │            │
    │Interaction:    Interaction:    Interaction:
    │ Natural lang   • Select code   • Natural lang
    │ Conversation   • Specify      • Autonomous
    │ Q&A            changes        • Multi-step
    │                • Review &     • Tool access
    │Invocation:      apply         • Permissions
    │ Manual start   Invocation:    │
    │ Cmd+L/Ctrl+L   • Cmd+I/Ctrl+I Invocation:
    │                • On selection • Manual start
    │Use Cases:     │               │
    │ Explanations  │Use Cases:     │Use Cases:
    │ Code gen      │ Refactoring   │ Complex
    │ Debugging     │ Fixes         │ automation
    │ Planning      │ Improvements  │ Large tasks
    │                                │
    └────────────┬──────────────┬────┴────────────┐
                 │              │                 │
                 └──────────────┼─────────────────┘
                                │
                    ┌───────────▼───────────┐
                    │ AUTOCOMPLETE MODE     │
                    ├───────────────────────┤
                    │                       │
                    │ Interaction:          │
                    │  • Real-time inline   │
                    │  • As-you-type        │
                    │                       │
                    │ Controls:             │
                    │  • Tab: Accept        │
                    │  • Esc: Reject        │
                    │  • Cmd+→: Word-by-word
                    │                       │
                    │ Use Cases:            │
                    │  • Faster typing      │
                    │  • Reduce errors      │
                    │  • Suggestions        │
                    └───────────────────────┘

BENEFITS OF MULTI-MODAL:
✅ Users choose task-appropriate mode
✅ Reduced friction and cognitive load
✅ Specialized UX per mode
✅ Flexible workflow adaptation
✅ Independent feature evolution
```

---

## 5. Context Provider Pipeline

```
┌─────────────────────────────────────────────────────────────┐
│            CONTEXT PROVIDER AGGREGATION PIPELINE            │
└─────────────────────────────────────────────────────────────┘

Configuration specifies enabled providers:

┌─────────────┐  ┌─────────────┐  ┌─────────────┐
│File Context │  │Code Context │  │Codebase     │
│             │  │             │  │Search       │
│ Current file│  │ Syntax tree │  │ Symbol refs │
│ Open editors│  │ Code blocks │  │ Import map  │
└──────┬──────┘  └──────┬──────┘  └──────┬──────┘
       │                │                │
       │  ┌─────────────┘                │
       │  │  ┌───────────────────────────┘
       │  │  │
       ▼  ▼  ▼
    ┌──────────────┐  ┌─────────────┐  ┌─────────────┐
    │Diff Context  │  │Docs Context │  │HTTP Context │
    │              │  │             │  │             │
    │ File changes │  │ Indexed     │  │ Remote      │
    │ Git status   │  │ crawled     │  │ server      │
    │              │  │ docs        │  │ data        │
    └──────┬───────┘  └──────┬──────┘  └──────┬──────┘
           │                 │                │
           │  ┌──────────────┘                │
           │  │  ┌───────────────────────────┘
           │  │  │
           ▼  ▼  ▼
        ┌──────────────┐  ┌─────────────┐
        │Folder Context│  │Terminal     │
        │              │  │Context      │
        │ Project      │  │             │
        │ structure    │  │ Shell env   │
        │              │  │ Output hist │
        └──────┬───────┘  └──────┬──────┘
               │                │
               └────────┬───────┘
                        │
            ┌───────────▼───────────┐
            │  CONTEXT AGGREGATION   │
            │  (Combine, prioritize, │
            │   manage tokens)       │
            └───────────┬────────────┘
                        │
                        ▼
            ┌───────────────────────┐
            │ CONTEXT PAYLOAD       │
            │ (Sent to LLM)         │
            └───────────────────────┘

DESIGN CONSIDERATIONS:
⚠️  Multiple sources can overflow token limit
⚠️  Priority/ranking needed
⚠️  Some providers may fail
⚠️  Performance varies per provider
⚠️  Custom HTTP providers need timeouts
```

---

## 6. Rules Application System

```
┌─────────────────────────────────────────────────────────────┐
│            RULES APPLICATION & COMPOSITION                  │
└─────────────────────────────────────────────────────────────┘

Configuration-defined rules:

    Simple Text Rules          Named Rules
    ─────────────────         ──────────────────
    - "Always use               - name: TypeScript
      async/await"               rule: "Use interfaces"
    - "Add JSDoc"               globs: "**/*.{ts,tsx}"

                         │
                         ▼
            ┌────────────────────────────┐
            │ RULE FILTERING STAGE       │
            │ (File context matching)    │
            │                            │
            │ File: src/api.ts           │
            │  ├─ Match glob /**/*.{ts}? │
            │  │  YES → Include rule     │
            │  ├─ Match glob tests/**? │
            │  │  NO → Skip rule         │
            │  └─ Match glob src/**?    │
            │     YES → Include rule     │
            └────────────┬───────────────┘
                         │
                         ▼
            ┌────────────────────────────┐
            │ RULE COMPOSITION STAGE     │
            │ Combine selected rules     │
            │                            │
            │ [Rule 1 text]              │
            │ [Rule 2 text]              │
            │ [Rule 3 text (filtered)]   │
            │ ...                        │
            └────────────┬───────────────┘
                         │
                         ▼
            ┌────────────────────────────┐
            │ SYSTEM MESSAGE INJECTION   │
            │ (Prepend to LLM prompt)    │
            │                            │
            │ You are a helpful coding   │
            │ assistant. Follow these    │
            │ rules:                     │
            │ 1. Always use async/await │
            │ 2. Add JSDoc              │
            │ 3. Use interfaces         │
            │ ...                        │
            └────────────┬───────────────┘
                         │
                         ▼
            ┌────────────────────────────┐
            │ LLM INVOCATION             │
            │ (With enforced rules)      │
            └────────────────────────────┘

EXAMPLE RULE SET:

rules:
  # Global rule (always applied)
  - "Always annotate functions with types"
  
  # TypeScript-specific rule
  - name: "TypeScript best practices"
    rule: "Use interfaces for object shapes, avoid type aliases"
    globs: "**/*.{ts,tsx}"
  
  # Test-specific rule
  - name: "Jest patterns"
    rule: "Use describe/it pattern, mock external dependencies"
    globs:
      - "src/**/*.test.ts"
      - "tests/**/*.ts"

BENEFITS:
✅ Behavioral consistency across LLM invocations
✅ Context-aware rule application
✅ File-type specific guidelines
✅ Easy to update without code changes
✅ Transparent rule enforcement
```

---

## 7. Multi-Model Dispatch Architecture

```
┌─────────────────────────────────────────────────────────────┐
│          ROLE-BASED MODEL DISPATCH PATTERN                  │
└─────────────────────────────────────────────────────────────┘

Configuration specifies models with roles:

┌──────────────────────────────────────────────────────────┐
│ Model: GPT-4o                                           │
│ Provider: openai                                        │
│ Roles: [chat, edit, apply]                             │
│ DefaultCompletionOptions: {temp: 0.7, maxTokens: 1500} │
└──────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────┐
│ Model: Codestral                                        │
│ Provider: mistral                                       │
│ Roles: [autocomplete]                                   │
│ DefaultCompletionOptions: {temp: 0.5}                   │
└──────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────┐
│ Model: Claude 3.7                                       │
│ Provider: anthropic                                     │
│ Roles: [agent]                                          │
│ Capabilities: [tool_use, image_input]                   │
└──────────────────────────────────────────────────────────┘

                         │
                         ▼
        ┌────────────────────────────────┐
        │ FEATURE REQUEST                │
        ├────────────────────────────────┤
        │ Feature: Chat Mode             │
        │ Required Role: "chat"          │
        │ Capability: "text_generation"  │
        └────────────┬───────────────────┘
                     │
                     ▼
        ┌────────────────────────────────┐
        │ MODEL SELECTION LOGIC          │
        │ Find all models with role      │
        │ "chat"                         │
        │                                │
        │ Candidates:                    │
        │  ✓ GPT-4o (has chat role)     │
        │  ✗ Codestral (no chat role)   │
        │  ✗ Claude (no chat role)      │
        │                                │
        │ Select: GPT-4o                │
        └────────────┬───────────────────┘
                     │
                     ▼
        ┌────────────────────────────────┐
        │ LLM INVOCATION                 │
        │ Provider: openai               │
        │ Model: gpt-4o                  │
        │ Options: {temp: 0.7, ...}     │
        │ Prompt: [user query]           │
        └────────────────────────────────┘

DISPATCH TABLE:

Feature         Role Needed      Model Candidates    Selected
─────────────   ──────────────   ────────────────   ─────────────
Chat            chat             GPT-4o             GPT-4o
Edit            edit             GPT-4o             GPT-4o
Agent           agent            Claude 3.7         Claude 3.7
Autocomplete    autocomplete     Codestral          Codestral
Embedding       embed            (if configured)    (provider dep.)
Reranking       rerank           (if configured)    (provider dep.)

BENEFITS:
✅ Easy model swapping (change config, not code)
✅ Multi-model support (different model per role)
✅ Provider flexibility (any provider with role)
✅ Role-specific tuning (temperature, maxTokens per role)
✅ Future extensibility (add roles as needed)
```

---

## 8. MCP Server Integration Protocol

```
┌─────────────────────────────────────────────────────────────┐
│          MODEL CONTEXT PROTOCOL (MCP) INTEGRATION          │
│          (Anthropic Standard for Tool Unification)         │
└─────────────────────────────────────────────────────────────┘

Configuration specifies MCP servers:

    mcpServers:
      - name: "SQLite Database"
        command: uvx
        args: ["mcp-server-sqlite", "--db-path", "data.db"]
        env:
          DB_LOG_LEVEL: "debug"
        connectionTimeout: 5000

                         │
                         ▼
        ┌───────────────────────────────┐
        │ CODY RUNTIME                  │
        │                               │
        │ Reads MCP server config       │
        │ Spawns process:               │
        │  $ uvx mcp-server-sqlite ...  │
        │                               │
        │ Establishes connection        │
        │ (JSON-RPC over stdio)         │
        └────────────┬──────────────────┘
                     │
                     ▼
        ┌───────────────────────────────┐
        │ MCP SERVER PROCESS            │
        │ (External executable)         │
        │                               │
        │ Listens for JSON-RPC calls    │
        │ Provides tools/resources      │
        │ - Query database              │
        │ - Execute SQL                 │
        │ - Return results              │
        └────────────┬──────────────────┘
                     │
                     ▼
        ┌───────────────────────────────┐
        │ CONTEXT AGGREGATION           │
        │                               │
        │ MCP Server provides:          │
        │ - Tools (functions)           │
        │ - Resources (data)            │
        │ - Prompts (templates)         │
        │                               │
        │ Integrated into LLM context   │
        └────────────┬──────────────────┘
                     │
                     ▼
        ┌───────────────────────────────┐
        │ LLM CAN NOW USE MCP TOOLS     │
        │                               │
        │ "Query the SQLite database"   │
        │ → Invokes MCP tool            │
        │ → Gets results                │
        │ → Continues reasoning         │
        └───────────────────────────────┘

DESIGN BENEFITS:
✅ Language-agnostic (any language can write MCP servers)
✅ Pluggable (add servers via config)
✅ Process-isolated (servers are separate processes)
✅ Scalable (multiple servers supported)
✅ Tool-rich (servers provide custom tools)
✅ Anthropic standard (future-proof)
```

---

## 9. Component Interaction Sequence

```
┌─────────────────────────────────────────────────────────────┐
│     COMPLETE REQUEST-RESPONSE SEQUENCE (CHAT MODE)          │
└─────────────────────────────────────────────────────────────┘

User Action
    │ "Explain this code"
    │ (Cmd+L with code selected)
    │
    ▼
IDE Selection Capture
    │ Selected code: [code_block]
    │
    ▼
Chat Mode Invocation
    │ Create chat message:
    │ { query: "Explain this...", 
    │   selectedCode: [code_block] }
    │
    ▼
Configuration Loading
    │ Load config.yaml
    │ Extract: models, context, rules, prompts
    │
    ▼
Model Selection
    │ Find model with role: "chat"
    │ Selected: GPT-4o
    │
    ▼
Context Aggregation (Parallel)
    │
    ├→ File Provider: Current file content
    ├→ Code Provider: Syntax analysis
    ├→ Codebase Provider: Related symbols
    ├→ Diff Provider: Recent changes
    ├→ Docs Provider: Indexed documentation
    └→ Terminal Provider: Environment state
    │
    └→ Aggregate into context window
    │
    ▼
Rules Application
    │ Match file globs against rules
    │ Compose system message:
    │ "You are a helpful AI coding assistant.
    │  Follow these rules:
    │  - Always include code examples
    │  - Use clear explanations
    │  - [user-defined rules]"
    │
    ▼
LLM Request Formation
    │ system_message: [rules_composed]
    │ user_message: "Explain this code"
    │ context: [aggregated_from_providers]
    │ model: gpt-4o
    │ temperature: 0.7
    │ max_tokens: 1500
    │
    ▼
LLM Invocation
    │ POST https://api.openai.com/v1/chat/completions
    │ Headers: {Authorization: Bearer ${OPENAI_API_KEY}}
    │ Body: {model, system, user, context, options}
    │
    ▼
LLM Response Processing
    │ Receive streamed response
    │ Token stream: "The code...", "implements...", etc.
    │ Build complete response
    │
    ▼
IDE Display
    │ Render response in chat window
    │ Highlight code examples
    │ Enable follow-up questions
    │
    ▼
User Interaction
    │ Accept response / Ask follow-up / Edit
    │ [Loop continues as needed]

TOTAL TIME: ~2-5 seconds (depending on model and context size)
TOKEN USAGE: ~500-2000 tokens (depending on context)
COST: ~$0.01-0.10 per request (depending on model)
```

---

## 10. Error Handling & Resilience Patterns (RECOMMENDED)

```
⚠️  CURRENTLY NOT DOCUMENTED IN CODY
    This is a RECOMMENDED pattern for production deployment

┌─────────────────────────────────────────────────────────────┐
│         RECOMMENDED ERROR HANDLING ARCHITECTURE              │
└─────────────────────────────────────────────────────────────┘

Failure Scenario 1: Model Provider Unavailable
─────────────────────────────────────────────
    LLM Request
        │
        ▼
    OpenAI API Down (503)
        │
        ├─ Retry with exponential backoff
        │  (attempt 1, 2, 3 with delays)
        │
        ├─ Check fallback model config
        │  "fallback_model: claude"
        │
        └─ If no fallback:
           Show error: "OpenAI unavailable.
                       Switch model in config.yaml"

Failure Scenario 2: Context Provider Fails
──────────────────────────────────────────
    HTTP Context Provider (timeout)
        │
        ├─ Circuit Breaker: Open after 3 failures
        │  (stop trying this provider for 5 min)
        │
        ├─ Partial Context: Use available providers
        │  (proceed with code + codebase providers)
        │
        └─ Log Warning: "HTTP provider unavailable,
                         reduced context"

Failure Scenario 3: MCP Server Crash
────────────────────────────────────
    MCP Server Process Crash
        │
        ├─ Detect: Connection lost
        │
        ├─ Restart Logic:
        │  Attempt respawn (up to 3 times)
        │  Exponential backoff
        │
        └─ Fallback:
           Continue without MCP tools
           Log: "MCP server unavailable"

Failure Scenario 4: Configuration Invalid
──────────────────────────────────────────
    config.yaml Parse Error
        │
        ├─ Schema Validation:
        │  Check against JSON Schema
        │
        ├─ Error Detection:
        │  - Unknown provider: "xyz"
        │  - Missing required field: "name"
        │  - Invalid role: "unknown"
        │
        └─ User Notification:
           Clear error message with line number
           Suggest fix or documentation link

RECOMMENDED RESILIENCE PATTERNS:
✅ Circuit breaker for external services
✅ Exponential backoff for retries
✅ Fallback model specification
✅ Graceful degradation (partial context)
✅ Health checks (periodic provider availability)
✅ Timeout limits (prevent hanging)
✅ Comprehensive logging
✅ Error categorization (retriable vs. fatal)
```

---

## 11. Security Architecture (RECOMMENDED IMPROVEMENTS)

```
⚠️  CURRENT STATE: CREDENTIALS IN PLAINTEXT
    RECOMMENDED: ENVIRONMENT VARIABLES ONLY

┌─────────────────────────────────────────────────────────────┐
│           RECOMMENDED SECURE CREDENTIAL FLOW                │
└─────────────────────────────────────────────────────────────┘

Developer Machine Setup
────────────────────────
    Step 1: Store credentials securely
    $ export OPENAI_API_KEY="sk-..."
    $ export ANTHROPIC_API_KEY="..."
    $ export MY_MCP_SERVER_TOKEN="..."
    
    (credentials NOT in config.yaml)

    Step 2: Config references environment variables
    ┌──────────────────────────────┐
    │ config.yaml                  │
    ├──────────────────────────────┤
    │ models:                      │
    │   - name: GPT-4o             │
    │     provider: openai         │
    │     apiKey: ${OPENAI_API_KEY}│  ← Environment variable
    │                              │
    │ mcpServers:                  │
    │   - name: Custom             │
    │     env:                      │
    │       TOKEN: ${MY_TOKEN}      │  ← Environment variable
    └──────────────────────────────┘

    Step 3: Runtime substitution
    ┌──────────────────────────────┐
    │ Cody Startup                 │
    ├──────────────────────────────┤
    │ 1. Parse config.yaml         │
    │ 2. Find ${VAR} patterns      │
    │ 3. Substitute from env       │
    │ 4. Use actual credentials    │
    │ 5. Remove from memory after  │
    │    (avoid logging)           │
    └──────────────────────────────┘

CI/CD Pipeline (GitHub Actions)
───────────────────────────────
    .github/workflows/dev.yml
    ──────────────────────────
    env:
      OPENAI_API_KEY: ${{ secrets.OPENAI_API_KEY }}
      ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_KEY }}
    
    → Cody reads from env
    → Credentials never written to files
    → Secrets safe in GitHub

Enterprise Deployment
─────────────────────
    Credential Manager Integration:
    
    Config references:
    - HashiCorp Vault: vault://secret/openai/key
    - AWS Secrets Manager: aws://openai/api-key
    - Azure Key Vault: azure://vault/key
    - 1Password: op://vault/item/credential
    
    Cody resolves credentials at runtime
    from secure vault, not config.yaml

SECURITY BENEFITS:
✅ Credentials never in version control
✅ Credentials never in config files
✅ Easy rotation (change env var)
✅ Audit trail (vault logs)
✅ Multi-environment safety
✅ Team credential sharing (via vault, not shared config)
```

---

## Key Takeaways

1. **Architecture**: Well-designed multi-modal system with configuration-driven approach
2. **Configuration**: Powerful but currently monolithic; needs composition/inheritance
3. **Security**: Critical gap - plaintext API keys in examples and config files
4. **Scalability**: Good foundation but needs token management and process pooling
5. **Enterprise**: Missing multi-tenancy, audit trails, and centralized config
6. **Documentation**: Good for features, gaps in security, performance, and troubleshooting

**Recommended Next Steps**: Security hardening (Phase 1), then scalability improvements (Phase 2)

