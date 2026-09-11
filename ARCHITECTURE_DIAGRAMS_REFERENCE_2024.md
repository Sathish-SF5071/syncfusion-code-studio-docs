# 🎨 ARCHITECTURE DIAGRAMS & VISUAL REFERENCE
## Syncfusion Cody - Complete Architecture Illustrated

---

## 1. SYSTEM CONTEXT DIAGRAM

```
┌─────────────────────────────────────────────────────────────────┐
│                        DEVELOPER WORKSTATION                     │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │                    IDE (VSCode, etc.)                    │   │
│  │  ┌────────────────────────────────────────────────────┐  │   │
│  │  │  SYNCFUSION CODY EXTENSION                         │  │   │
│  │  │                                                     │  │   │
│  │  │  [Chat] [Edit] [Agent] [Autocomplete]              │  │   │
│  │  └─────┬──────────────────────────────────────────────┘  │   │
│  │        │                                                  │   │
│  │  ┌─────▼──────────────────────────────────────────────┐  │   │
│  │  │  config.yaml (User Configuration)                 │  │   │
│  │  │  • Models, Context Providers, Rules               │  │   │
│  │  └──────────────────────────────────────────────────┬┘  │   │
│  │                                                     │    │   │
│  └─────────────────────────────────────────────────────┼────┘   │
│                                                        │         │
└────────────────────────────────────────────────────────┼─────────┘
                                                         │
                                    ┌────────────────────┼────────────────────┐
                                    │                    │                    │
                            ┌───────▼──────┐   ┌────────▼────────┐  ┌───────▼────────┐
                            │  OpenAI API  │   │ Anthropic API   │  │ Mistral / Ollama│
                            │  (GPT-4o)    │   │ (Claude)        │  │                 │
                            └──────────────┘   └─────────────────┘  └─────────────────┘
                                                                              
                                    ┌────────────────────────────────┐
                                    │  Git Repository                │
                                    │  (Codebase, .git)              │
                                    └────────────────────────────────┘
                                                                              
                                    ┌────────────────────────────────┐
                                    │  Documentation URLs            │
                                    │  (Web crawled for context)     │
                                    └────────────────────────────────┘
                                                                              
                                    ┌────────────────────────────────┐
                                    │  MCP Servers                   │
                                    │  (SQLite, Custom tools)        │
                                    └────────────────────────────────┘
```

---

## 2. CONFIGURATION-DRIVEN ARCHITECTURE DIAGRAM

```
                    ┌──────────────────────┐
                    │   config.yaml        │
                    │  (YAML v1 Schema)    │
                    └──────────┬───────────┘
                               │
         ┌─────────────────────┼─────────────────────┐
         │                     │                     │
         ▼                     ▼                     ▼
    ┌─────────┐            ┌────────┐         ┌──────────┐
    │ MODELS  │            │CONTEXT │         │  RULES   │
    │         │            │PROVIDERS           │          │
    ├─────────┤            ├────────┤         ├──────────┤
    │ OpenAI  │            │ file   │         │ System   │
    │ Claude  │            │ code   │         │ message  │
    │ Mistral │            │codebase│         │ Glob-    │
    │ Ollama  │            │ docs   │         │ matched  │
    │         │            │ diff   │         │          │
    │Roles:   │            │ http   │         │          │
    │chat/edit│            │folder  │         │          │
    │auto/app │            │terminal│         │          │
    │embed    │            │problems│         │          │
    │         │            │helpbot │         │          │
    └────┬────┘            └────┬───┘         └─────┬────┘
         │                      │                   │
         │      ┌───────────────┼───────────────┐   │
         │      │               │               │   │
         └──────┼───────────────┼───────────────┼───┘
                │               │               │
         ┌──────▼───────────────▼───────────────▼──────────┐
         │      REQUEST PROCESSING PIPELINE                │
         │                                                 │
         │  1. Select Model (by role)                      │
         │  2. Aggregate Context (multiple providers)      │
         │  3. Apply Rules (system message)                │
         │  4. Build Prompt (system + context + input)     │
         │  5. Invoke LLM (streaming response)             │
         │  6. Parse & Return Result                       │
         └──────┬──────────────────────────────────────────┘
                │
    ┌───────────┼───────────┬──────────────┬───────────┐
    │           │           │              │           │
    ▼           ▼           ▼              ▼           ▼
┌───────┐  ┌────────┐  ┌─────────┐  ┌──────────┐ ┌──────────┐
│ CHAT  │  │ EDIT   │  │ AGENT   │  │AUTOCMPLT │ │ PROMPTS/ │
│ MODE  │  │ MODE   │  │ MODE    │  │  MODE    │ │  DOCS    │
└─┬─────┘  └────┬───┘  └────┬────┘  └────┬─────┘ └────┬─────┘
  │             │            │            │            │
  └─────────────┼────────────┼────────────┼────────────┘
                │            │            │
          ┌─────▼────────────▼────────────▼─────┐
          │  IDE INTEGRATION LAYER              │
          │                                     │
          │  • Code editor                      │
          │  • File operations                  │
          │  • Terminal bridge                  │
          │  • Permission gates                 │
          │  • Inline UI renderer               │
          └─────────────────────────────────────┘
```

---

## 3. DETAILED COMPONENT ARCHITECTURE

```
┌─────────────────────────────────────────────────────────────────────┐
│                    SYNCFUSION CODY ARCHITECTURE                      │
└─────────────────────────────────────────────────────────────────────┘

CONFIGURATION LAYER
┌─────────────────────────────────────────────────────────────────────┐
│ config.yaml (Single Source of Truth)                                │
│ ├─ name, version, schema (metadata)                                 │
│ ├─ models[] (LLM provider configs)                                   │
│ ├─ context[] (context provider configs)                             │
│ ├─ rules[] (behavioral constraints)                                 │
│ ├─ prompts[] (user-defined templates)                               │
│ ├─ docs[] (documentation indexing)                                  │
│ └─ mcpServers[] (MCP protocol extensions)                           │
└─────────────────────────────────────────────────────────────────────┘
                              │
                              ▼
SERVICE LAYER
┌───────────────────────────────────────────────────────────────────────┐
│                                                                        │
│  ┌──────────────────┐  ┌────────────────┐  ┌────────────────┐        │
│  │  Model Manager   │  │  Context       │  │  Rules         │        │
│  │                  │  │  Aggregator    │  │  Engine        │        │
│  │ • Role dispatch  │  │                │  │                │        │
│  │ • Provider call  │  │ • Gather from  │  │ • Glob match   │        │
│  │ • Auth mgmt      │  │   10 providers │  │ • Combine into │        │
│  │ • Capability     │  │ • Token budget │  │   system msg   │        │
│  │   detection      │  │ • Prioritize   │  │                │        │
│  └────────┬─────────┘  └────────┬───────┘  └────────┬───────┘        │
│           │                     │                   │                │
│           └─────────────────────┼───────────────────┘                │
│                                 │                                    │
│           ┌─────────────────────▼──────────────────┐                │
│           │  Prompt Builder Service                │                │
│           │                                        │                │
│           │ • Compose system message (rules)       │                │
│           │ • Attach context (providers)           │                │
│           │ • Format for model                     │                │
│           │ • Include conversation history         │                │
│           └─────────────────────┬──────────────────┘                │
│                                 │                                    │
│  ┌────────────────┐  ┌─────────▼────────┐  ┌──────────────────┐    │
│  │ Custom Prompts │  │  Documentation   │  │  MCP Server      │    │
│  │ Service        │  │  Indexing        │  │  Registry        │    │
│  │                │  │                  │  │                  │    │
│  │ • User-defined │  │ • Web crawling   │  │ • Register tools │    │
│  │ • Invokable    │  │ • Local caching  │  │ • Protocol       │    │
│  │ • Task templat │  │ • Favicon config │  │   integration    │    │
│  └────────────────┘  └──────────────────┘  └──────────────────┘    │
│                                                                        │
└───────────────────────────────────────────────────────────────────────┘
                              │
                              ▼
FEATURE MODE LAYER
┌───────────────────────────────────────────────────────────────────────┐
│                                                                        │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌───────────┐ │
│  │  CHAT MODE   │  │  EDIT MODE   │  │  AGENT MODE  │  │AUTOCMPLT  │ │
│  │              │  │              │  │              │  │  MODE     │ │
│  │ • Cmd+L/     │  │ • Cmd+I/     │  │ • Autonomous │  │ • Real-   │ │
│  │   Ctrl+L     │  │   Ctrl+I     │  │   execution  │  │   time    │ │
│  │ • Multi-turn │  │ • Inline     │  │ • 6-step     │  │   inline  │ │
│  │   dialogue   │  │   review     │  │   workflow   │  │   sugg.   │ │
│  │ • Streaming  │  │ • Accept/    │  │ • Permission │  │ • Tab to  │ │
│  │   response   │  │   reject     │  │   gates      │  │   accept  │ │
│  └──────────────┘  └──────────────┘  └──────────────┘  └───────────┘ │
│                                                                        │
└───────────────────────────────────────────────────────────────────────┘
                              │
                              ▼
IDE INTEGRATION LAYER
┌───────────────────────────────────────────────────────────────────────┐
│                                                                        │
│  • Code editor (read selections, apply edits)                         │
│  • File operations (read, write, create, search)                      │
│  • Terminal execution (run commands)                                  │
│  • Permission prompting (user approval)                               │
│  • Inline UI rendering (display responses, suggestions)               │
│  • Dependency analysis (import tracking)                              │
│                                                                        │
└───────────────────────────────────────────────────────────────────────┘
```

---

## 4. DATA FLOW DIAGRAMS

### 4.1 Chat Mode Flow

```
USER INPUT
   │
   ├─ Message text: "Explain this function"
   ├─ Selected code (Cmd+L)
   └─ File context
       │
       ▼
┌──────────────────────────┐
│ Parse Chat Request       │
│ • Extract message        │
│ • Get selection context  │
│ • Current file path      │
└──────────────┬───────────┘
               │
               ▼
┌──────────────────────────┐
│ Model Selection          │
│ Config lookup:           │
│ • Find model w/ "chat"   │
│   role                   │
└──────────────┬───────────┘
               │
               ▼
┌──────────────────────────┐
│ Context Aggregation      │
│ Execute providers:       │
│ 1. file (current)        │
│ 2. code (selection)      │
│ 3. codebase (semantic)   │
│ 4. docs (indexed)        │
│ ⚠️ No token limit        │
└──────────────┬───────────┘
               │
               ▼
┌──────────────────────────┐
│ Rules Application        │
│ • Collect all rules      │
│ • Filter by globs        │
│ • Combine to system msg  │
└──────────────┬───────────┘
               │
               ▼
┌──────────────────────────┐
│ Prompt Construction      │
│ • System (rules)         │
│ • Context (providers)    │
│ • User message           │
│ • Format per model       │
└──────────────┬───────────┘
               │
               ▼
┌──────────────────────────┐
│ LLM Invocation           │
│ • Resolve credentials    │
│ • Call provider API      │
│ • Streaming mode         │
│ ⚠️ Error handling?       │
└──────────────┬───────────┘
               │
               ▼
┌──────────────────────────┐
│ Stream LLM Response      │
│ • Token-by-token         │
│ • Buffer for UI          │
└──────────────┬───────────┘
               │
               ▼
┌──────────────────────────┐
│ Render in IDE            │
│ • Format as markdown     │
│ • Syntax highlighting    │
│ • Interactive buttons    │
└──────────────┬───────────┘
               │
               ▼
        USER SEES CHAT
```

### 4.2 Edit Mode Flow

```
USER SELECTS CODE + INSTRUCTION
   │
   ├─ Code selection
   └─ "Make more efficient"
       │
       ▼
┌──────────────────────────┐
│ Get Edit Model           │
│ Config: model w/ "edit"  │
│ role                     │
└──────────────┬───────────┘
               │
               ▼
┌──────────────────────────┐
│ Gather Context           │
│ • Selected code          │
│ • Related files          │
│ • Codebase search        │
└──────────────┬───────────┘
               │
               ▼
┌──────────────────────────┐
│ Call LLM for Diff        │
│ • Generate modifications │
│ • Expected: diff format  │
└──────────────┬───────────┘
               │
               ▼
┌──────────────────────────┐
│ Display Inline Diff      │
│ • Show additions         │
│ • Show deletions         │
│ • Accept/Reject buttons  │
│ • Individual or batch    │
└──────────────┬───────────┘
               │
        ┌──────┴───────┐
        │              │
        ▼              ▼
   ACCEPT          REJECT
        │              │
        └──────┬───────┘
               │
               ▼
┌──────────────────────────┐
│ Apply Changes            │
│ • Update file            │
│ • Update selection       │
│ • Verify formatting      │
└──────────────┬───────────┘
               │
               ▼
      EDIT MODE COMPLETE
```

### 4.3 Agent Mode Flow (Simplified)

```
USER REQUEST
"Add error handling to all API calls"
       │
       ▼
┌──────────────────────────┐
│ Step 1: Understand       │
│ Parse intent, scope      │
└──────────────┬───────────┘
               │
               ▼
┌──────────────────────────┐
│ Step 2: Explore          │
│ Search codebase          │
│ Identify files           │
└──────────────┬───────────┘
               │
               ▼
┌──────────────────────────┐
│ Step 3: Plan             │
│ Break into tasks         │
│ Show user summary        │
└──────────────┬───────────┘
               │
               ▼
┌──────────────────────────┐
│ USER APPROVAL            │
│ Review & approve plan    │
│ ⚠️ Coarse-grained        │
└──────────────┬───────────┘
               │
       ┌───────┴────────┐
       │                │
    REJECT             APPROVE
       │                │
       └────────┬───────┘
                │
                ▼
┌──────────────────────────┐
│ Step 4: Execute          │
│ For each task:           │
│ • Generate changes       │
│ • Request permission     │
│ • Apply                  │
│ • Verify                 │
└──────────────┬───────────┘
               │
               ▼
┌──────────────────────────┐
│ Step 5: Verify Results   │
│ • Run tests/lint         │
│ • Check errors           │
│ • Attempt fixes          │
└──────────────┬───────────┘
               │
               ▼
┌──────────────────────────┐
│ Step 6: Complete         │
│ Summarize changes        │
│ Offer rollback           │
└──────────────┬───────────┘
               │
               ▼
   AGENT MODE COMPLETE
   ⚠️ NO AUDIT TRAIL
```

---

## 5. DEPENDENCY GRAPH

```
EXTERNAL DEPENDENCIES
        │
        ├─ LLM Providers (External APIs)
        │  ├─ OpenAI API (GPT-4, GPT-4o)
        │  ├─ Anthropic API (Claude)
        │  ├─ Mistral API
        │  └─ Ollama (Self-hosted)
        │
        ├─ File System
        │  ├─ User workspace
        │  ├─ .git repository
        │  └─ config.yaml
        │
        ├─ IDE Host
        │  ├─ VSCode, etc.
        │  └─ Code editor API
        │
        ├─ Network Resources
        │  ├─ Documentation URLs (web crawl)
        │  ├─ HTTP context providers
        │  └─ MCP server endpoints
        │
        └─ Optional: MCP Servers
           ├─ SQLite
           ├─ Custom tools
           └─ Third-party integrations

INTERNAL DEPENDENCIES
        │
        ├─ Configuration System
        │  └─ Required by: ALL services
        │
        ├─ Model Manager
        │  ├─ Called by: Chat, Edit, Agent, Autocomplete
        │  └─ Depends on: Configuration, Credentials
        │
        ├─ Context Aggregator
        │  ├─ Called by: Model Manager (indirectly via pipeline)
        │  └─ Depends on: 10+ context providers
        │
        ├─ Rules Engine
        │  ├─ Called by: Prompt Builder
        │  └─ Depends on: Configuration
        │
        ├─ Prompt Builder
        │  ├─ Called by: All feature modes
        │  └─ Depends on: Model Manager, Context, Rules Engine
        │
        └─ Feature Modes
           ├─ Chat, Edit, Agent, Autocomplete
           ├─ Call: Prompt Builder → LLM Invocation
           └─ Depend on: IDE Integration Layer
```

---

## 6. ERROR HANDLING ARCHITECTURE

```
ERROR HANDLING FLOW (CURRENT STATE: NOT DOCUMENTED)

┌─────────────────────────────────────────────────────────┐
│                 FAILURE SCENARIOS                       │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  Configuration Parsing                                  │
│  ├─ ❌ No validation                                    │
│  └─ ❌ No error recovery                                │
│                                                         │
│  LLM API Failures                                       │
│  ├─ ❌ No retry logic                                   │
│  ├─ ❌ No fallback models                               │
│  └─ ❌ No error message to user                         │
│                                                         │
│  Context Provider Failures                              │
│  ├─ ❌ No isolation                                     │
│  ├─ ❌ One provider failure → whole request fails       │
│  └─ ❌ No fallback context                              │
│                                                         │
│  File System Errors                                     │
│  ├─ ❌ No error handling documented                     │
│  └─ ❌ No rollback mechanism                            │
│                                                         │
│  MCP Server Errors                                      │
│  ├─ ❌ No connection pooling                            │
│  ├─ ❌ No health checks                                 │
│  └─ ❌ One server down → cascading failure              │
│                                                         │
│  Network Errors                                         │
│  ├─ ❌ No timeout handling                              │
│  ├─ ❌ No circuit breaker                               │
│  └─ ❌ No graceful degradation                          │
│                                                         │
└─────────────────────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────────────────────┐
│  CURRENT ERROR BEHAVIOR                                 │
├─────────────────────────────────────────────────────────┤
│  • Crash or undefined behavior                          │
│  • Poor user experience                                 │
│  • Difficult to troubleshoot                            │
│  • No audit trail for failures                          │
└─────────────────────────────────────────────────────────┘
         │
         ▼
REQUIRED: Error Recovery Framework
  • Retry logic with exponential backoff
  • Circuit breaker pattern for failing services
  • Graceful degradation to fallback modes
  • Error logging & monitoring
  • User-facing error messages
```

---

## 7. SECURITY ARCHITECTURE

```
SECURITY THREAT MODEL

┌─────────────────────────────────────────────────────────┐
│            ATTACK SURFACE                               │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  1. Configuration File (config.yaml)                    │
│     ├─ ❌ No schema validation                          │
│     ├─ ❌ No secret detection                           │
│     └─ Risk: Malicious config, credential exposure     │
│                                                         │
│  2. MCP Server Commands                                 │
│     ├─ ❌ No command validation                         │
│     ├─ ❌ No argument sanitization                      │
│     └─ Risk: Command injection, arbitrary code exec    │
│                                                         │
│  3. LLM Output Processing                               │
│     ├─ ❌ No output validation                          │
│     └─ Risk: Malicious code injection via LLM           │
│                                                         │
│  4. Context Provider Outputs                            │
│     ├─ ❌ No sanitization                               │
│     └─ Risk: Information disclosure (passwords, keys)   │
│                                                         │
│  5. File Operations (Agent Mode)                        │
│     ├─ ⚠️ Coarse-grained permissions                    │
│     └─ Risk: Unauthorized file modification             │
│                                                         │
│  6. API Credentials                                     │
│     ├─ ⚠️ Environment variables recommended             │
│     ├─ ❌ Not enforced                                  │
│     └─ Risk: Hardcoded secrets in config                │
│                                                         │
│  7. Agent Mode Autonomy                                 │
│     ├─ ❌ No audit logging                              │
│     ├─ ❌ No rollback capability                        │
│     └─ Risk: Untrackable unauthorized changes           │
│                                                         │
└─────────────────────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────────────────────┐
│            SECURITY CONTROLS                            │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  Implemented ✅                                         │
│  • User permission gates (Agent mode)                   │
│  • Environment variable credential support             │
│  • Role-based model dispatch                           │
│                                                         │
│  Missing 🔴                                             │
│  • Input validation                                    │
│  • Output sanitization                                 │
│  • Secret detection                                    │
│  • Audit logging                                       │
│  • Rate limiting                                       │
│  • Fine-grained permissions                           │
│  • Code signing for MCP servers                        │
│  • TLS certificate validation                          │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## 8. SCALABILITY ARCHITECTURE

```
SCALABILITY CONSTRAINTS & BREAKING POINTS

┌──────────────────────────────────────────────────────────┐
│  RESOURCE: Token Budget (Unbounded)                      │
│  ┌──────────────────────────────────────────────────────┐
│  │ Provider 1 (file):          500 tokens               │
│  │ Provider 2 (code):          500 tokens               │
│  │ Provider 3 (codebase):    3,000 tokens (5K+ files)  │
│  │ Provider 4 (docs):        1,000 tokens               │
│  │ Provider 5-10:             2,000 tokens (combined)   │
│  ├──────────────────────────────────────────────────────┤
│  │ TOTAL:                    ~7,000 tokens per request  │
│  │ COST:                      $0.07 @ $0.01/1K tokens   │
│  │ × 100 requests/day:        $7/day = $210/month      │
│  │ × 1,000 users:             $210,000/month 💸        │
│  ├──────────────────────────────────────────────────────┤
│  │ ❌ UNCONTROLLED                                      │
│  │ ✅ FIX: Per-provider budgets, total limits           │
│  └──────────────────────────────────────────────────────┘
│
│  RESOURCE: Semantic Search Index Size (Large Repos)
│  ├─ Large monorepo: 100K+ files
│  ├─ Embedding index grows linearly
│  ├─ Search latency increases (O(log n) to O(n))
│  ├─ Breaking point: ~50K files
│  └─ ✅ FIX: Lazy loading, index partitioning
│
│  RESOURCE: Configuration Scale
│  ├─ 100+ models
│  ├─ 50+ context providers
│  ├─ 200+ rules
│  ├─ Parsing performance degrades
│  ├─ Breaking point: ~500 config items
│  └─ ✅ FIX: Lazy loading, config includes
│
│  RESOURCE: Concurrent Agent Operations (Shared FS)
│  ├─ Multiple users on shared codebase
│  ├─ No distributed locking
│  ├─ File conflicts unresolved
│  ├─ Breaking point: ~5-10 concurrent Agents
│  └─ ✅ FIX: File-level locking, transaction semantics
│
│  RESOURCE: MCP Server Connections
│  ├─ 20+ MCP servers configured
│  ├─ Each maintains persistent connection
│  ├─ One server down → cascades
│  ├─ Breaking point: ~50 concurrent connections
│  └─ ✅ FIX: Connection pooling, health checks
│
└──────────────────────────────────────────────────────────┘
```

---

## 9. DEPLOYMENT TOPOLOGY

```
DEVELOPER WORKSTATION (Single IDE Instance)

┌────────────────────────────────────────────┐
│  Developer OS (Windows/Mac/Linux)          │
│  ┌──────────────────────────────────────┐  │
│  │  IDE (VSCode, JetBrains, etc.)       │  │
│  │  ┌────────────────────────────────┐  │  │
│  │  │ Syncfusion Cody Extension      │  │  │
│  │  │ • Feature modes                │  │  │
│  │  │ • Request pipeline             │  │  │
│  │  │ • IDE integration              │  │  │
│  │  └────────────┬───────────────────┘  │  │
│  │              │                        │  │
│  │  ┌───────────▼──────────────────────┐│  │
│  │  │ config.yaml (User-editable)      ││  │
│  │  │ • Model configs                  ││  │
│  │  │ • Context providers              ││  │
│  │  │ • Rules & prompts                ││  │
│  │  │ • MCP servers                    ││  │
│  │  └──────────────────────────────────┘│  │
│  │                                       │  │
│  │  Local file system:                  │  │
│  │  • Project source code               │  │
│  │  • .git repository                   │  │
│  │  • Test files                        │  │
│  └──────────────────────────────────────┘  │
└────────────────────────────────────────────┘
         │
         │ Network calls
         │
    ┌────┼──────┬────────┬──────┐
    │    │      │        │      │
    ▼    ▼      ▼        ▼      ▼
OpenAI Anthropic Mistral Ollama MCP
API   API      API      (local) Servers
```

---

## 10. SERVICE COMMUNICATION PATTERNS

```
SYNCHRONOUS REQUEST-RESPONSE
(All current interactions)

User Action (Chat/Edit/Agent)
    │
    ▼
Feature Mode
    │
    ▼
Model Manager + Context + Rules
    │
    ▼
LLM Provider API
    ├─ Streaming response
    └─ Parsed result
    │
    ▼
IDE Integration (Display/Execute)
    │
    ▼
User Sees Response


ASYNCHRONOUS (RECOMMENDED FOR FUTURE)

User Action
    │
    ▼
Queue Request
    │
    ├─ Background: Context Aggregation
    ├─ Background: Model Dispatch
    ├─ Background: LLM Invocation
    └─ Background: Result Processing
    │
    ▼
Notify User (when ready)
    │
    ▼
User Sees Response

Advantage: Non-blocking, better UX, easier error recovery
```

---

## 11. CONFIGURATION SCHEMA TREE

```
config.yaml (v1)
├─ name: string (required)
│  └─ Example: "My Development Config"
│
├─ version: string (required)
│  └─ Example: "1.0.0" (semantic versioning)
│
├─ schema: string (required)
│  └─ Example: "v1"
│
├─ models: array (optional)
│  ├─ name: string (required)
│  ├─ provider: enum (required)
│  │  └─ Values: openai|anthropic|mistral|ollama
│  ├─ model: string (required)
│  │  └─ Examples: gpt-4o, claude-3, codestral-latest
│  ├─ apiKey: env_ref (required)
│  │  └─ Example: ${OPENAI_API_KEY}
│  ├─ apiBase: URL (optional)
│  ├─ roles: array (optional)
│  │  └─ Values: chat|edit|autocomplete|apply|embed|rerank
│  ├─ capabilities: array (optional)
│  │  └─ Values: tool_use|image_input
│  └─ defaultCompletionOptions: object (optional)
│     ├─ temperature: 0.0-1.0
│     ├─ maxTokens: integer
│     ├─ topP: 0.0-1.0
│     ├─ topK: integer
│     └─ stop: array[string]
│
├─ context: array (optional)
│  ├─ provider: enum (required)
│  │  └─ Values: file|code|codebase|docs|diff|http|folder|terminal|problems|helpbot
│  ├─ name: string (optional)
│  └─ params: object (optional)
│     ├─ nFinal: integer (codebase)
│     ├─ url: string (http)
│     └─ maxLines: integer
│
├─ rules: array (optional)
│  ├─ string (simple rule)
│  └─ object (named rule)
│     ├─ name: string
│     ├─ rule: string
│     └─ globs: string|array[string]
│
├─ prompts: array (optional)
│  ├─ name: string (required)
│  ├─ description: string (required)
│  └─ prompt: string (required, multiline)
│
├─ docs: array (optional)
│  ├─ name: string (required)
│  ├─ startUrl: URL (required)
│  ├─ maxDepth: integer (default: 4)
│  ├─ favicon: URL (optional)
│  └─ useLocalCrawling: boolean (default: false)
│
└─ mcpServers: array (optional)
   ├─ name: string (required)
   ├─ command: string (required) ⚠️ NO VALIDATION
   ├─ args: array[string] (required)
   ├─ env: object (optional)
   │  └─ VAR_NAME: string
   └─ connectionTimeout: integer (milliseconds)
```

---

## 12. PATTERN IMPLEMENTATION REFERENCE

```
DESIGN PATTERNS IMPLEMENTED

1. Configuration-Driven ✅
   └─ config.yaml → All behavior declaratively specified

2. Hub-and-Spoke ✅
   └─ Config hub → Features, Models, Context, Rules as spokes

3. Strategy Pattern ✅
   └─ Model providers interchangeable

4. Provider Pattern ✅
   └─ Context providers pluggable interface

5. Decorator Pattern ✅
   └─ Rules add behavior to system message

6. Pipeline Pattern ✅
   └─ Model → Context → Rules → LLM flow

7. Adapter Pattern ✅
   └─ IDE integration layer

8. Factory Pattern ⚠️ (Moderate)
   └─ Model selection by role (could be more sophisticated)

9. Template Method ✅
   └─ Feature modes share common pipeline

10. Permission Gate ✅
    └─ Agent mode user approval workflow

11. Extensibility via Protocol ✅
    └─ MCP servers standard interface
```

---

**Architecture Review Complete**  
**Ready for stakeholder review and implementation planning**

