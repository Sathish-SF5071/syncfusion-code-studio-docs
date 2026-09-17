# 🎨 ARCHITECTURE DIAGRAMS 2025
## Syncfusion Cody IDE - Visual Reference

**Created**: January 2025  
**Type**: Visual Architecture Documentation  
**Related**: [PRINCIPAL_ARCHITECT_COMPLETE_REVIEW_2025.md](./PRINCIPAL_ARCHITECT_COMPLETE_REVIEW_2025.md)

---

## TABLE OF CONTENTS

1. [System Architecture Overview](#1-system-architecture-overview)
2. [Component Interaction Diagram](#2-component-interaction-diagram)
3. [Data Flow Architecture](#3-data-flow-architecture)
4. [Service Dependencies](#4-service-dependencies)
5. [Chat Mode Flow](#5-chat-mode-flow)
6. [Agent Mode Workflow](#6-agent-mode-workflow)
7. [Autocomplete Flow](#7-autocomplete-flow)
8. [Context Aggregation](#8-context-aggregation)
9. [Error Handling Strategy](#9-error-handling-strategy)
10. [Deployment Architecture](#10-deployment-architecture)

---

## 1. SYSTEM ARCHITECTURE OVERVIEW

### Hub-and-Spoke Configuration-Driven Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              SYNCFUSION CODY                                 │
│                     Configuration-Driven AI IDE Platform                     │
└─────────────────────────────────────────────────────────────────────────────┘

                          ┌─────────────────────┐
                          │   config.yaml       │
                          │  (YAML v1 Schema)   │
                          │                     │
                          │  SINGLE SOURCE OF   │
                          │      TRUTH          │
                          │                     │
                          │ • name              │
                          │ • version           │
                          │ • schema: v1        │
                          │ • models            │
                          │ • context           │
                          │ • rules             │
                          │ • prompts           │
                          │ • docs              │
                          │ • mcpServers        │
                          └──────────┬──────────┘
                                     │
                                     │ loaded at startup
                                     │
                    ┌────────────────┼────────────────┐
                    │                │                │
                    ▼                ▼                ▼
         ┌──────────────────┐ ┌──────────────┐ ┌──────────────┐
         │  MODEL MANAGER   │ │   CONTEXT    │ │    RULES     │
         │                  │ │  AGGREGATOR  │ │   ENGINE     │
         ├──────────────────┤ ├──────────────┤ ├──────────────┤
         │ • OpenAI         │ │ • file       │ │ • System     │
         │ • Anthropic      │ │ • code       │ │   message    │
         │ • Mistral        │ │ • codebase   │ │ • Glob-based │
         │ • Ollama         │ │ • docs       │ │   filtering  │
         │                  │ │ • diff       │ │ • Conditional│
         │ Roles:           │ │ • http       │ │   rules      │
         │ • chat           │ │ • folder     │ │              │
         │ • edit           │ │ • terminal   │ │              │
         │ • autocomplete   │ │ • problems   │ │              │
         │ • apply          │ │ • helpbot    │ │              │
         │ • embed          │ │              │ │              │
         │ • rerank         │ │              │ │              │
         └────────┬─────────┘ └──────┬───────┘ └──────┬───────┘
                  │                  │                │
                  └──────────────────┼────────────────┘
                                     │
                          ┌──────────▼──────────┐
                          │  LLM REQUEST        │
                          │  ORCHESTRATOR       │
                          │                     │
                          │ 1. Select Model     │
                          │ 2. Gather Context   │
                          │ 3. Apply Rules      │
                          │ 4. Build Prompt     │
                          │ 5. Invoke LLM       │
                          └──────────┬──────────┘
                                     │
        ┌────────────┬───────────────┼───────────────┬────────────┐
        │            │               │               │            │
        ▼            ▼               ▼               ▼            ▼
   ┌────────┐  ┌────────┐    ┌──────────┐    ┌──────────┐  ┌─────────┐
   │  CHAT  │  │  EDIT  │    │  AGENT   │    │AUTOCMPLT │  │ PROMPTS │
   │  MODE  │  │  MODE  │    │  MODE    │    │   MODE   │  │ & DOCS  │
   └────┬───┘  └────┬───┘    └─────┬────┘    └─────┬────┘  └────┬────┘
        │           │              │               │            │
   Cmd+L/Ctrl+L  Cmd+I/Ctrl+I   6-step         Real-time     Custom
                                workflow        inline        invoke
        │           │              │               │            │
        └───────────┴──────────────┴───────────────┴────────────┘
                                   │
                       ┌───────────▼───────────┐
                       │  IDE INTEGRATION      │
                       │      LAYER            │
                       │                       │
                       │ • Code Editor         │
                       │ • File Operations     │
                       │ • Terminal Bridge     │
                       │ • Permission Gate     │
                       │ • Diff Rendering      │
                       │ • Keyboard Shortcuts  │
                       └───────────────────────┘
```

**Key Principles**:
- ✅ **Declarative Configuration**: Behavior defined in `config.yaml`, not code
- ✅ **Plugin Architecture**: Extensible via context providers & MCP servers
- ✅ **Multi-Modal**: 4 interaction modes (Chat, Edit, Agent, Autocomplete)
- ✅ **Multi-Provider**: Support for OpenAI, Anthropic, Mistral, Ollama

---

## 2. COMPONENT INTERACTION DIAGRAM

### Request-Response Flow with Context Aggregation

```
┌──────────────────────────────────────────────────────────────────────────┐
│                          COMPONENT INTERACTIONS                          │
└──────────────────────────────────────────────────────────────────────────┘

USER INPUT (Keyboard/Mouse/Chat)
        │
        ▼
┌─────────────────────┐
│  FEATURE MODE       │
│  • Chat (Cmd+L)     │
│  • Edit (Cmd+I)     │
│  • Agent            │
│  • Autocomplete     │
└──────────┬──────────┘
           │
           │ 1. Request with intent
           ▼
┌─────────────────────┐
│ CONFIGURATION       │
│ LOADER              │◄──── config.yaml (file I/O)
└──────────┬──────────┘
           │
           │ 2. Resolve model by role
           ▼
┌─────────────────────┐
│ MODEL MANAGER       │
│ • Role dispatch     │
│ • Provider strategy │
└──────────┬──────────┘
           │
           │ 3. Request context
           ▼
┌─────────────────────┐
│ CONTEXT AGGREGATOR  │
│ • Parallel fetch    │
│ • Combine chunks    │
└──────────┬──────────┘
           │
           │ 4. Fetch from providers
           ▼
┌─────────────────────────────────────────────────────┐
│               CONTEXT PROVIDERS (Plugins)            │
├──────────┬──────────┬──────────┬──────────┬─────────┤
│   file   │   code   │ codebase │   docs   │  diff   │
│ Current  │ Selected │ Semantic │  Vector  │   Git   │
│   file   │ code AST │  search  │  search  │  diff   │
└────┬─────┴────┬─────┴────┬─────┴────┬─────┴────┬────┘
     │          │          │          │          │
     └──────────┴──────────┴──────────┴──────────┘
                        │
                        │ 5. Aggregated context
                        ▼
           ┌─────────────────────┐
           │ RULES ENGINE        │
           │ • Glob matching     │
           │ • Combine rules     │
           └──────────┬──────────┘
                      │
                      │ 6. Apply rules
                      ▼
           ┌─────────────────────┐
           │ PROMPT BUILDER      │
           │ • System message    │
           │ • Context injection │
           │ • User message      │
           └──────────┬──────────┘
                      │
                      │ 7. Formatted prompt
                      ▼
           ┌─────────────────────┐
           │ LLM PROVIDER API    │
           │ (External Service)  │
           │ • OpenAI            │
           │ • Anthropic         │
           │ • Mistral           │
           │ • Ollama            │
           └──────────┬──────────┘
                      │
                      │ 8. LLM response (streaming)
                      ▼
           ┌─────────────────────┐
           │ RESPONSE PROCESSOR  │
           │ • Parse response    │
           │ • Extract diffs     │
           └──────────┬──────────┘
                      │
                      │ 9. Render output
                      ▼
           ┌─────────────────────┐
           │ IDE INTEGRATION     │
           │ • Display in chat   │
           │ • Inline diff       │
           │ • Ghost text        │
           └─────────────────────┘
                      │
                      ▼
              USER (sees result)
```

**Interaction Types**:
- ➡️ **Synchronous**: Config loading, rule application
- ⚡ **Asynchronous**: Context fetching (parallel), LLM API calls
- 🔄 **Bidirectional**: Agent ↔ IDE (permission gate), Edit ↔ IDE (accept/reject)

---

## 3. DATA FLOW ARCHITECTURE

### Information Flow from User to LLM and Back

```
┌──────────────────────────────────────────────────────────────────────────┐
│                           DATA FLOW DIAGRAM                              │
└──────────────────────────────────────────────────────────────────────────┘

USER INPUT
  │
  │ "Explain this code"
  ▼
┌─────────────────┐
│ Chat Mode       │
└────────┬────────┘
         │
         │ {
         │   mode: 'chat',
         │   message: 'Explain this code',
         │   selectedCode: { file, lines, content }
         │ }
         ▼
┌─────────────────┐
│ Config Loader   │──────► Load config.yaml
└────────┬────────┘
         │
         │ {
         │   models: [{ name: 'GPT-4o', provider: 'openai', roles: ['chat'] }],
         │   context: [{ provider: 'file' }, { provider: 'code' }, ...],
         │   rules: ['Always explain step by step', ...]
         │ }
         ▼
┌─────────────────┐
│ Model Manager   │──────► Select model where role='chat'
└────────┬────────┘
         │
         │ Selected: { name: 'GPT-4o', provider: 'openai', apiKey: '...' }
         ▼
┌─────────────────────────────────────────────────────┐
│ Context Aggregator (Parallel Fetch)                 │
├──────────┬──────────┬──────────┬──────────┬─────────┤
│   file   │   code   │ codebase │   docs   │  diff   │
│  └─ Current: main.ts             │          │         │
│          │  └─ Selected: login() │          │         │
│          │          │  └─ Semantic: auth.*  │         │
│          │          │          │  └─ Docs   │         │
│          │          │          │    React   │  └─ Git │
└──────────┴──────────┴──────────┴──────────┴─────────┘
         │
         │ [
         │   { source: 'file', content: '// main.ts\n...' },
         │   { source: 'code', content: 'function login() {...}' },
         │   { source: 'codebase', content: 'Related files: auth.ts, ...' },
         │   { source: 'docs', content: 'React authentication docs...' }
         │ ]
         ▼
┌─────────────────┐
│ Rules Engine    │──────► Filter rules by glob match
└────────┬────────┘
         │
         │ [
         │   'Always explain step by step',
         │   'For TypeScript: Use interfaces' (glob matched)
         │ ]
         ▼
┌─────────────────┐
│ Prompt Builder  │
└────────┬────────┘
         │
         │ {
         │   messages: [
         │     { role: 'system', content: 'Rules: Always explain...' },
         │     { role: 'system', content: 'Context:\n- File: main.ts\n...' },
         │     { role: 'user', content: 'Explain this code' }
         │   ]
         │ }
         ▼
┌─────────────────┐
│ OpenAI API      │──────► POST /v1/chat/completions
└────────┬────────┘
         │
         │ { choices: [{ message: { content: 'This code implements...' } }] }
         ▼
┌─────────────────┐
│ Response        │
│ Processor       │
└────────┬────────┘
         │
         │ { text: 'This code implements authentication...', ... }
         ▼
┌─────────────────┐
│ IDE Integration │──────► Display in chat panel
└─────────────────┘
         │
         ▼
      USER sees explanation
```

**Data Transformations**:
1. **User Input** → Structured request
2. **Config** → Model + Context providers + Rules
3. **Context Providers** → Aggregated context chunks
4. **Rules** → Filtered rules (glob-matched)
5. **Prompt Builder** → OpenAI-format messages
6. **LLM Response** → Parsed text/diffs
7. **IDE Rendering** → Visual output

---

## 4. SERVICE DEPENDENCIES

### Dependency Layers and External Services

```
┌──────────────────────────────────────────────────────────────────────────┐
│                        SERVICE DEPENDENCIES                              │
└──────────────────────────────────────────────────────────────────────────┘

LAYER 1: EXTERNAL DEPENDENCIES (Network/Process Boundaries)
┌────────────────────────────────────────────────────────────────────────┐
│                                                                        │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐ │
│  │   OpenAI    │  │  Anthropic  │  │   Mistral   │  │   Ollama    │ │
│  │     API     │  │     API     │  │     API     │  │   (Local)   │ │
│  │             │  │             │  │             │  │             │ │
│  │ • gpt-4     │  │ • claude-3  │  │ • codestral │  │ • codellama │ │
│  │ • gpt-4o    │  │ • opus      │  │ • mistral   │  │ • custom    │ │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘ │
│         │                │                │                │          │
│         │                │                │                │          │
│  ┌──────┴────────────────┴────────────────┴────────────────┴───────┐ │
│  │                    MCP Servers (User-Defined)                    │ │
│  │  • uvx mcp-server-sqlite                                         │ │
│  │  • npx @upstash/context7-mcp                                     │ │
│  │  • custom scripts                                                │ │
│  └──────────────────────────────────────────────────────────────────┘ │
│         │                                                              │
│  ┌──────┴────────────────────────────────────────────────────────┐   │
│  │                    IDE Platform Layer                          │   │
│  │  • VSCode Extension API                                        │   │
│  │  • IntelliJ Plugin API                                         │   │
│  │  • File System                                                 │   │
│  │  • Terminal Emulator                                           │   │
│  └────────────────────────────────────────────────────────────────┘   │
└────────────────────────────────────────────────────────────────────────┘
         │
         ▼
LAYER 2: CORE SERVICES (Application Layer)
┌────────────────────────────────────────────────────────────────────────┐
│                                                                        │
│  ┌─────────────────────────────────────────────────────────────────┐ │
│  │                   Configuration System                          │ │
│  │  • Load config.yaml                                             │ │
│  │  • Validate schema (v1)                                         │ │
│  │  • Provide to all services                                      │ │
│  └────────────────┬────────────────────────────────────────────────┘ │
│                   │                                                   │
│       ┌───────────┼───────────┬───────────────────┐                  │
│       ▼           ▼           ▼                   ▼                  │
│  ┌────────┐ ┌────────────┐ ┌───────┐ ┌──────────────────────────┐  │
│  │ Model  │ │  Context   │ │ Rules │ │ MCP Client               │  │
│  │Manager │ │ Aggregator │ │Engine │ │                          │  │
│  │        │ │            │ │       │ │ • Connect to MCP servers │  │
│  │• Role  │ │• Parallel  │ │• Glob │ │ • Fetch tools/context    │  │
│  │dispatch│ │  fetch     │ │match  │ │ • Invoke tools           │  │
│  └────┬───┘ └─────┬──────┘ └───┬───┘ └──────────┬───────────────┘  │
│       │           │            │                 │                  │
│       └───────────┼────────────┼─────────────────┘                  │
│                   │            │                                     │
│  ┌────────────────▼────────────▼──────────────────────────────────┐ │
│  │                    LLM Request Orchestrator                     │ │
│  │  1. Select model (by role)                                      │ │
│  │  2. Gather context (from providers)                             │ │
│  │  3. Apply rules (glob-matched)                                  │ │
│  │  4. Build prompt (system + context + user)                      │ │
│  │  5. Invoke LLM (with retry/circuit breaker) ⚠️ TODO            │ │
│  └─────────────────────────────────────────────────────────────────┘ │
│                   │                                                   │
└───────────────────┼───────────────────────────────────────────────────┘
                    │
                    ▼
LAYER 3: FEATURE MODULES (User-Facing)
┌────────────────────────────────────────────────────────────────────────┐
│                                                                        │
│  ┌─────────┐  ┌─────────┐  ┌──────────┐  ┌──────────────────────┐   │
│  │  Chat   │  │  Edit   │  │  Agent   │  │    Autocomplete      │   │
│  │  Mode   │  │  Mode   │  │  Mode    │  │       Mode           │   │
│  │         │  │         │  │          │  │                      │   │
│  │ Cmd+L   │  │ Cmd+I   │  │ 6-step   │  │ Real-time (200ms)    │   │
│  │ Ctrl+L  │  │ Ctrl+I  │  │ workflow │  │ debounce             │   │
│  │         │  │         │  │          │  │                      │   │
│  │• Q&A    │  │• Inline │  │• Auto    │  │• Tab (accept)        │   │
│  │• Explain│  │  diff   │  │  explore │  │• Esc (reject)        │   │
│  │• Generate│ │• Accept │  │• Tools   │  │• Cmd+→ (word-by-word)│   │
│  └─────────┘  └─────────┘  └──────────┘  └──────────────────────┘   │
│       │            │             │                    │               │
└───────┼────────────┼─────────────┼────────────────────┼───────────────┘
        │            │             │                    │
        └────────────┴─────────────┴────────────────────┘
                     │
                     ▼
LAYER 4: USER INTERFACE (IDE Layer)
┌────────────────────────────────────────────────────────────────────────┐
│                     IDE Integration Layer                              │
│                                                                        │
│  • Chat Panel UI                    • Permission Dialogs              │
│  • Inline Diff Renderer             • Keyboard Shortcut Handlers      │
│  • Ghost Text (Autocomplete)        • File Operations                 │
│  • Terminal Bridge                  • Code Editor API                 │
└────────────────────────────────────────────────────────────────────────┘
```

**Dependency Types**:
- ⚡ **Strong**: Required for functionality (Config → Model Manager)
- 🔗 **Medium**: Optional but degraded without (Context Providers)
- 🌐 **External**: Network-dependent (LLM APIs, MCP servers)
- 🖥️ **Platform**: IDE-specific (VSCode, IntelliJ)

**⚠️ Risk**: No documented fallback for external service failures (OpenAI down → Total failure)

---

## 5. CHAT MODE FLOW

### Conversational Interaction with Context

```
┌──────────────────────────────────────────────────────────────────────────┐
│                            CHAT MODE FLOW                                │
└──────────────────────────────────────────────────────────────────────────┘

USER ACTION
  │
  │ 1. Select code in editor
  │    (e.g., "function login() { ... }")
  ▼
┌────────────────┐
│ User presses   │
│ Cmd+L (Mac)    │
│ Ctrl+L (Win)   │
└───────┬────────┘
        │
        │ 2. IDE captures selection
        ▼
┌─────────────────────────────┐
│ Chat Mode Activated         │
│                             │
│ Input: {                    │
│   selectedCode: {           │
│     file: "auth/login.ts",  │
│     lines: [10-25],         │
│     content: "function..." │
│   }                         │
│ }                           │
└───────┬─────────────────────┘
        │
        │ 3. User types question
        │    "Explain this code"
        ▼
┌─────────────────────────────┐
│ Request Preparation         │
│                             │
│ {                           │
│   mode: 'chat',             │
│   message: 'Explain...',    │
│   context: {                │
│     selectedCode: {...}     │
│   }                         │
│ }                           │
└───────┬─────────────────────┘
        │
        │ 4. Lookup model
        ▼
┌─────────────────────────────┐
│ Model Manager               │
│                             │
│ Query: models[role='chat']  │
│ Result: GPT-4o (OpenAI)     │
└───────┬─────────────────────┘
        │
        │ 5. Gather context (parallel)
        ▼
┌─────────────────────────────────────────────────┐
│ Context Aggregation (Parallel Fetch)            │
├──────────┬──────────┬──────────┬──────────┬─────┤
│   file   │   code   │ codebase │   docs   │diff │
│          │          │          │          │     │
│ Current  │ Selected │ Search:  │ Search:  │ Git │
│ file     │ code     │ "auth"   │ "login"  │ diff│
│ (full)   │ (AST)    │ results  │ results  │     │
└──────────┴──────────┴──────────┴──────────┴─────┘
        │
        │ 6. Aggregated context (< 1s)
        │    [file: "...", code: "...", codebase: "...", docs: "..."]
        ▼
┌─────────────────────────────┐
│ Rules Engine                │
│                             │
│ Apply:                      │
│ • Global rules              │
│ • Glob-matched rules        │
│   (*.ts → TypeScript rules) │
└───────┬─────────────────────┘
        │
        │ 7. Combined rules
        ▼
┌─────────────────────────────┐
│ Prompt Builder              │
│                             │
│ messages: [                 │
│   {                         │
│     role: 'system',         │
│     content: '<rules>'      │
│   },                        │
│   {                         │
│     role: 'system',         │
│     content: 'Context:\n    │
│       File: login.ts\n      │
│       Code: function...\n   │
│       Related: auth.ts'     │
│   },                        │
│   {                         │
│     role: 'user',           │
│     content: 'Explain...'   │
│   }                         │
│ ]                           │
└───────┬─────────────────────┘
        │
        │ 8. HTTP POST
        ▼
┌─────────────────────────────┐
│ OpenAI API                  │
│                             │
│ POST /v1/chat/completions   │
│                             │
│ { model: 'gpt-4o',          │
│   messages: [...],          │
│   temperature: 0.7,         │
│   stream: true }            │
└───────┬─────────────────────┘
        │
        │ 9. Streaming response (SSE)
        │    "This code implements..."
        ▼
┌─────────────────────────────┐
│ Response Processor          │
│                             │
│ • Parse stream              │
│ • Extract text              │
│ • Format markdown           │
└───────┬─────────────────────┘
        │
        │ 10. Render
        ▼
┌─────────────────────────────┐
│ IDE Integration             │
│                             │
│ Display in chat panel:      │
│ ┌─────────────────────────┐ │
│ │ 🤖 Cody:                │ │
│ │                         │ │
│ │ This code implements    │ │
│ │ user authentication...  │ │
│ │                         │ │
│ │ 1. Password check       │ │
│ │ 2. Token generation     │ │
│ │ 3. Session creation     │ │
│ └─────────────────────────┘ │
└─────────────────────────────┘
        │
        ▼
    USER reads explanation
```

**Performance**:
- Context gathering: ~500ms-1s (parallel)
- LLM latency: ~2-5s (depends on provider)
- Total: ~3-6s from question to response

---

## 6. AGENT MODE WORKFLOW

### Autonomous 6-Step Task Execution

```
┌──────────────────────────────────────────────────────────────────────────┐
│                         AGENT MODE WORKFLOW                              │
│                      (6-Step Autonomous Loop)                            │
└──────────────────────────────────────────────────────────────────────────┘

USER REQUEST
  │
  │ "Refactor authentication module to use JWT"
  ▼
┌─────────────────────────────────────────────────────────────────────────┐
│ STEP 1: UNDERSTAND REQUEST                                              │
│                                                                          │
│ Agent analyzes:                                                          │
│ • Intent: Refactor authentication                                        │
│ • Technology: JWT (JSON Web Tokens)                                      │
│ • Scope: "module" → Likely multiple files                                │
│                                                                          │
│ Internal LLM call: Parse and structure request                           │
└──────────┬───────────────────────────────────────────────────────────────┘
           │
           ▼
┌─────────────────────────────────────────────────────────────────────────┐
│ STEP 2: EXPLORE CODEBASE                                                │
│                                                                          │
│ ┌─────────────────────────────────────────────────────────────────────┐ │
│ │ Tool: search_files("auth", "*.ts")                                  │ │
│ │ ┌──────────────────────┐                                            │ │
│ │ │ PERMISSION GATE      │                                            │ │
│ │ │ ┌──────────────────┐ │                                            │ │
│ │ │ │ Agent wants to   │ │                                            │ │
│ │ │ │ search files     │ │                                            │ │
│ │ │ │ matching "auth"  │ │                                            │ │
│ │ │ │                  │ │                                            │ │
│ │ │ │ [Continue][Cancel]│ │                                           │ │
│ │ │ └──────────────────┘ │                                            │ │
│ │ └──────────────────────┘                                            │ │
│ │ User: Continue                                                       │ │
│ └─────────────────────────────────────────────────────────────────────┘ │
│                                                                          │
│ Results:                                                                 │
│ • src/auth/login.ts                                                      │
│ • src/auth/middleware.ts                                                 │
│ • src/auth/session.ts                                                    │
│                                                                          │
│ ┌─────────────────────────────────────────────────────────────────────┐ │
│ │ Tool: read_file("src/auth/login.ts")                                │ │
│ │ Permission: Continue                                                 │ │
│ └─────────────────────────────────────────────────────────────────────┘ │
│                                                                          │
│ Agent reads all 3 files, understands current implementation              │
└──────────┬───────────────────────────────────────────────────────────────┘
           │
           ▼
┌─────────────────────────────────────────────────────────────────────────┐
│ STEP 3: PLAN CHANGES                                                    │
│                                                                          │
│ Agent creates plan:                                                      │
│                                                                          │
│ 1. Install jsonwebtoken library                                          │
│    → npm install jsonwebtoken @types/jsonwebtoken                        │
│                                                                          │
│ 2. Update login.ts                                                       │
│    → Replace session ID with JWT generation                              │
│                                                                          │
│ 3. Update middleware.ts                                                  │
│    → Add JWT verification logic                                          │
│                                                                          │
│ 4. Update session.ts                                                     │
│    → Store JWT in secure cookie                                          │
│                                                                          │
│ 5. Add environment variables                                             │
│    → JWT_SECRET, JWT_EXPIRY                                              │
│                                                                          │
│ 6. Update tests                                                          │
│    → Mock JWT generation/verification                                    │
│                                                                          │
│ Agent presents plan to user in chat                                      │
└──────────┬───────────────────────────────────────────────────────────────┘
           │
           ▼
┌─────────────────────────────────────────────────────────────────────────┐
│ STEP 4: EXECUTE CHANGES                                                 │
│                                                                          │
│ ┌─────────────────────────────────────────────────────────────────────┐ │
│ │ Tool: run_command("npm install jsonwebtoken @types/jsonwebtoken")   │ │
│ │ ┌──────────────────────┐                                            │ │
│ │ │ PERMISSION GATE      │                                            │ │
│ │ │ ┌──────────────────┐ │                                            │ │
│ │ │ │ Agent wants to   │ │                                            │ │
│ │ │ │ run command:     │ │                                            │ │
│ │ │ │ npm install...   │ │                                            │ │
│ │ │ │                  │ │                                            │ │
│ │ │ │ [Continue][Cancel]│ │                                           │ │
│ │ │ └──────────────────┘ │                                            │ │
│ │ └──────────────────────┘                                            │ │
│ │ User: Continue                                                       │ │
│ └─────────────────────────────────────────────────────────────────────┘ │
│ Result: ✅ Installed jsonwebtoken@9.0.0                                 │
│                                                                          │
│ ┌─────────────────────────────────────────────────────────────────────┐ │
│ │ Tool: edit_file("src/auth/login.ts", diff)                          │ │
│ │ Permission: Continue                                                 │ │
│ │                                                                      │ │
│ │ Diff:                                                                │ │
│ │ -  const sessionId = generateSessionId();                            │ │
│ │ +  const token = jwt.sign({ userId }, JWT_SECRET, { expiresIn });   │ │
│ └─────────────────────────────────────────────────────────────────────┘ │
│ Result: ✅ File updated                                                  │
│                                                                          │
│ (Repeat for middleware.ts, session.ts, tests)                           │
└──────────┬───────────────────────────────────────────────────────────────┘
           │
           ▼
┌─────────────────────────────────────────────────────────────────────────┐
│ STEP 5: VERIFY RESULTS                                                  │
│                                                                          │
│ ┌─────────────────────────────────────────────────────────────────────┐ │
│ │ Tool: run_command("npm test")                                       │ │
│ │ Permission: Continue                                                 │ │
│ └─────────────────────────────────────────────────────────────────────┘ │
│                                                                          │
│ Result:                                                                  │
│ ✅ 25 tests passed                                                       │
│ ✅ No type errors (tsc --noEmit)                                         │
│ ✅ No linter warnings (eslint)                                           │
│                                                                          │
│ Agent confirms: Changes are successful                                   │
└──────────┬───────────────────────────────────────────────────────────────┘
           │
           ▼
┌─────────────────────────────────────────────────────────────────────────┐
│ STEP 6: TASK COMPLETE                                                   │
│                                                                          │
│ Agent summarizes in chat:                                                │
│                                                                          │
│ ┌─────────────────────────────────────────────────────────────────────┐ │
│ │ ✅ Task completed successfully!                                      │ │
│ │                                                                      │ │
│ │ **Summary**:                                                         │ │
│ │ • Refactored authentication to use JWT                               │ │
│ │ • Updated 3 files: login.ts, middleware.ts, session.ts               │ │
│ │ • Installed jsonwebtoken@9.0.0                                       │ │
│ │ • All tests passing (25/25)                                          │ │
│ │                                                                      │ │
│ │ **Next steps**:                                                      │ │
│ │ • Add JWT_SECRET to .env file                                        │ │
│ │ • Update deployment config with JWT_EXPIRY                           │ │
│ └─────────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────┘
           │
           ▼
    USER reviews changes
```

**Key Features**:
- ✅ **Autonomous**: Agent plans and executes without step-by-step instructions
- ✅ **Safety**: Permission gate before every tool use
- ✅ **Verification**: Agent tests changes before declaring success
- ✅ **Transparency**: Agent explains every step in chat

---

## 7. AUTOCOMPLETE FLOW

### Real-Time Inline Code Suggestions

```
┌──────────────────────────────────────────────────────────────────────────┐
│                         AUTOCOMPLETE FLOW                                │
│                        (Real-Time, 200ms)                                │
└──────────────────────────────────────────────────────────────────────────┘

USER TYPING
  │
  │ "function calculate" |  ← cursor
  ▼
┌────────────────────────────┐
│ IDE captures keystroke     │
│ Debounce: 200ms            │
└─────────────┬──────────────┘
              │
              │ (wait 200ms for more typing)
              ▼
┌────────────────────────────┐
│ Autocomplete Mode          │
│ Triggered                  │
│                            │
│ Input: {                   │
│   prefix: "function calc", │
│   suffix: "",              │
│   file: "utils.ts",        │
│   language: "typescript"   │
│ }                          │
└─────────────┬──────────────┘
              │
              │ Lookup model
              ▼
┌────────────────────────────┐
│ Model Manager              │
│                            │
│ Query: models[role=        │
│         'autocomplete']    │
│ Result: Codestral (Mistral)│
└─────────────┬──────────────┘
              │
              │ Fast context (local-first)
              ▼
┌──────────────────────────────────────────────────┐
│ Context Aggregator (Fast Mode)                   │
├──────────┬──────────┬──────────┬─────────────────┤
│   file   │   code   │ codebase │   NO DOCS      │
│          │          │          │   (too slow)   │
│ Current  │ Function │ Recent   │                │
│ file     │ above/   │ imports  │                │
│ (AST)    │ below    │          │                │
└──────────┴──────────┴──────────┴─────────────────┘
              │
              │ (~100ms)
              ▼
┌────────────────────────────┐
│ Prompt Builder             │
│ (No rules for perf)        │
│                            │
│ {                          │
│   prefix: "function calc", │
│   suffix: "",              │
│   language: "typescript",  │
│   context: {               │
│     recentImports: [...]   │
│   }                        │
│ }                          │
└─────────────┬──────────────┘
              │
              │ HTTP POST (streaming)
              ▼
┌────────────────────────────┐
│ Mistral API                │
│                            │
│ POST /v1/fim/completions   │
│ (Fill-In-Middle)           │
│                            │
│ { model: 'codestral',      │
│   prompt: "<prefix>",      │
│   suffix: "<suffix>" }     │
└─────────────┬──────────────┘
              │
              │ Token stream (~500ms)
              │ "ulate(items: Item[]): number {
              │    return items.reduce(...)"
              ▼
┌────────────────────────────┐
│ Response Processor         │
│                            │
│ • Parse tokens             │
│ • Format code              │
│ • Truncate at logical stop │
└─────────────┬──────────────┘
              │
              │ Display inline
              ▼
┌────────────────────────────────────────────────┐
│ IDE Integration (Ghost Text)                   │
│                                                │
│ Code editor:                                   │
│ ┌────────────────────────────────────────────┐ │
│ │ function calculate|                        │ │
│ │ ᵍʰᵒˢᵗ ᵗᵉˣᵗ ⟩                              │ │
│ │ ulate(items: Item[]): number {             │ │
│ │   return items.reduce((sum, item) =>       │ │
│ │     sum + item.price, 0);                  │ │
│ │ }                                          │ │
│ └────────────────────────────────────────────┘ │
│                                                │
│ User options:                                  │
│ • Tab: Accept full suggestion                  │
│ • Esc: Reject suggestion                       │
│ • Cmd+→: Accept word-by-word                   │
└────────────────────────────────────────────────┘
              │
              ▼
    USER presses Tab (accept)
              │
              ▼
┌────────────────────────────┐
│ Insert text at cursor      │
│                            │
│ function calculateTotal... │
└────────────────────────────┘
```

**Performance Requirements**:
- Debounce: 200ms (balance responsiveness vs. API calls)
- Context gathering: <100ms (local-first: file, code, imports)
- LLM latency: ~500ms (fast model: Codestral)
- Total: ~700-800ms from typing stop to ghost text

**Optimization**:
- ⚡ Fast model: Codestral (autocomplete-optimized)
- ⚡ Minimal context: No docs, no deep codebase search
- ⚡ No rules: Skip rules engine for performance
- ⚡ Streaming: Show tokens as they arrive

---

## 8. CONTEXT AGGREGATION

### Parallel Context Provider Execution

```
┌──────────────────────────────────────────────────────────────────────────┐
│                       CONTEXT AGGREGATION FLOW                           │
│                      (Parallel Provider Execution)                       │
└──────────────────────────────────────────────────────────────────────────┘

USER REQUEST
  │
  │ "Explain this authentication code"
  ▼
┌─────────────────────┐
│ Context Aggregator  │
│ Initialized         │
│                     │
│ Configured providers│
│ (from config.yaml): │
│ • file              │
│ • code              │
│ • codebase          │
│ • docs              │
│ • diff              │
│ • terminal          │
└──────────┬──────────┘
           │
           │ Parallel dispatch (Promise.all)
           ▼
┌──────────────────────────────────────────────────────────────────────────┐
│                    PARALLEL PROVIDER EXECUTION                           │
│                         (All run simultaneously)                         │
├────────────┬────────────┬────────────┬────────────┬────────────┬─────────┤
│   file     │   code     │  codebase  │    docs    │    diff    │terminal │
│  provider  │  provider  │  provider  │  provider  │  provider  │provider │
└────┬───────┴────┬───────┴────┬───────┴────┬───────┴────┬───────┴────┬────┘
     │            │            │            │            │            │
     │ READ       │ AST        │ SEMANTIC   │ VECTOR     │ GIT        │ COMMAND
     │ CURRENT    │ PARSE      │ SEARCH     │ SEARCH     │ DIFF       │ HISTORY
     │ FILE       │            │            │            │            │
     │            │            │            │            │            │
     ▼            ▼            ▼            ▼            ▼            ▼
┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐
│ Result:  │ │ Result:  │ │ Result:  │ │ Result:  │ │ Result:  │ │ Result:  │
│          │ │          │ │          │ │          │ │          │ │          │
│ Source:  │ │ Source:  │ │ Source:  │ │ Source:  │ │ Source:  │ │ Source:  │
│ "file"   │ │ "code"   │ │"codebase"│ │ "docs"   │ │ "diff"   │ │"terminal"│
│          │ │          │ │          │ │          │ │          │ │          │
│ Content: │ │ Content: │ │ Content: │ │ Content: │ │ Content: │ │ Content: │
│ "// auth │ │ "func    │ │ "Related │ │ "JWT     │ │ "+const  │ │ "$ npm   │
│ /login.ts│ │ login()  │ │ files:   │ │ auth     │ │ token =  │ │ test     │
│          │ │ {        │ │ • auth.  │ │ docs:    │ │ jwt.sign"│ │ PASS     │
│ import   │ │   const  │ │   ts     │ │ JWT is   │ │          │ │ 25 tests"│
│ jwt...   │ │   user   │ │ • middle │ │ a secure │ │ "-const  │ │          │
│          │ │   ...    │ │   ware.  │ │ token    │ │ sessionId│ │          │
│ (full    │ │ }"       │ │   ts"    │ │ format"  │ │ = ..."   │ │          │
│ file)    │ │          │ │          │ │          │ │          │ │          │
│          │ │ (AST     │ │ (search  │ │ (vector  │ │ (git     │ │ (last 5  │
│ (~500    │ │ parsed)  │ │ results) │ │ embed    │ │ diff)    │ │ commands)│
│ lines)   │ │          │ │          │ │ match)   │ │          │ │          │
│          │ │          │ │          │ │          │ │          │ │          │
│ Time:    │ │ Time:    │ │ Time:    │ │ Time:    │ │ Time:    │ │ Time:    │
│ 50ms     │ │ 100ms    │ │ 800ms    │ │ 600ms    │ │ 200ms    │ │ 50ms     │
└────┬─────┘ └────┬─────┘ └────┬─────┘ └────┬─────┘ └────┬─────┘ └────┬─────┘
     │            │            │            │            │            │
     └────────────┴────────────┴────────────┴────────────┴────────────┘
                                │
                                │ All results ready (max time: 800ms)
                                ▼
                    ┌───────────────────────┐
                    │ Aggregation Complete  │
                    │                       │
                    │ Combined context:     │
                    │ [                     │
                    │   {                   │
                    │     source: "file",   │
                    │     content: "...",   │
                    │     relevance: 1.0    │
                    │   },                  │
                    │   {                   │
                    │     source: "code",   │
                    │     content: "...",   │
                    │     relevance: 0.95   │
                    │   },                  │
                    │   ...                 │
                    │ ]                     │
                    │                       │
                    │ Total tokens: 8,500   │
                    └───────────┬───────────┘
                                │
                                │ Pass to Rules Engine
                                ▼
                    ┌───────────────────────┐
                    │ Next: Apply Rules     │
                    └───────────────────────┘
```

**Performance Analysis**:
- ✅ **Parallel Execution**: Providers run simultaneously (not sequential)
- ✅ **Fastest Providers**: file (50ms), terminal (50ms)
- ⚠️ **Slowest Providers**: codebase (800ms), docs (600ms)
- **Total Time**: max(provider times) = 800ms (NOT sum of all times)

**Optimization Opportunity**:
- Add caching (especially for docs, codebase)
- Result: 800ms → ~200ms for repeat queries

---

## 9. ERROR HANDLING STRATEGY

### ⚠️ CURRENT STATE: NOT DOCUMENTED (Critical Gap)

### RECOMMENDED ARCHITECTURE:

```
┌──────────────────────────────────────────────────────────────────────────┐
│                    ERROR HANDLING ARCHITECTURE                           │
│                          (Recommended)                                   │
└──────────────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────────┐
│                         ERROR TAXONOMY                                 │
├────────────────────────────────────────────────────────────────────────┤
│                                                                        │
│ 1. NETWORK ERRORS (LLM API)                                            │
│    ├─ Timeout (network latency > 30s)                                  │
│    │  Action: Retry 3x with exponential backoff (1s, 2s, 4s)           │
│    │                                                                    │
│    ├─ Rate Limit (429 Too Many Requests)                               │
│    │  Action: Wait for Retry-After header, switch to fallback model    │
│    │                                                                    │
│    ├─ Server Error (500, 502, 503)                                     │
│    │  Action: Retry 3x, if fails → Circuit breaker OPEN               │
│    │                                                                    │
│    └─ Circuit Breaker OPEN                                             │
│       Action: Show user "Service temporarily unavailable"              │
│                                                                        │
│ 2. AUTHENTICATION ERRORS (401, 403)                                    │
│    Action: Show user "Invalid API key. Update in settings."            │
│    No retry (user action required)                                     │
│                                                                        │
│ 3. VALIDATION ERRORS (400 Bad Request)                                 │
│    ├─ Token limit exceeded                                             │
│    │  Action: Prune context, retry with smaller context                │
│    │                                                                    │
│    └─ Invalid request format                                           │
│       Action: Log error, show user "Internal error, please report"     │
│                                                                        │
│ 4. CONTEXT PROVIDER ERRORS                                             │
│    ├─ Provider timeout (> 5s)                                          │
│    │  Action: Skip provider, log warning, continue with partial context│
│    │                                                                    │
│    └─ Provider exception (file not found, parse error)                 │
│       Action: Skip provider, log error, continue                       │
│                                                                        │
│ 5. IDE INTEGRATION ERRORS                                              │
│    ├─ File write denied (permission error)                             │
│    │  Action: Show user "Permission denied: {file}", abort operation   │
│    │                                                                    │
│    ├─ File not found                                                   │
│    │  Action: Show user "File not found: {file}", abort                │
│    │                                                                    │
│    └─ Terminal command failed (non-zero exit)                          │
│       Action: Show stderr to user, ask "Retry?" or "Abort?"            │
│                                                                        │
│ 6. CONFIGURATION ERRORS                                                │
│    ├─ Invalid config.yaml (YAML parse error)                           │
│    │  Action: Show line number, example, prevent startup               │
│    │                                                                    │
│    ├─ Schema validation failed (missing required field)                │
│    │  Action: Show field name, expected type, prevent startup          │
│    │                                                                    │
│    └─ No models configured                                             │
│       Action: Show user "No models configured. Add model to config."   │
│                                                                        │
└────────────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────────┐
│                       ERROR PROPAGATION STRATEGY                       │
├────────────────────────────────────────────────────────────────────────┤
│                                                                        │
│ FAIL-FAST (Stop immediately):                                          │
│ • Configuration errors (invalid config.yaml)                           │
│ • Authentication errors (invalid API key)                              │
│ • Circuit breaker OPEN (service unavailable)                           │
│                                                                        │
│ GRACEFUL DEGRADATION (Continue with reduced functionality):            │
│ • Context provider errors (skip provider, use partial context)         │
│ • Documentation index errors (skip docs, use code context only)        │
│ • MCP server errors (skip MCP tools, use built-in tools only)          │
│                                                                        │
│ RETRY (Automatic recovery):                                            │
│ • Network errors (3 retries with exponential backoff)                  │
│ • Rate limits (wait + retry)                                           │
│ • Token limit exceeded (prune context + retry)                         │
│                                                                        │
│ USER ACTION REQUIRED:                                                  │
│ • Invalid API key → Update in settings                                 │
│ • File permission denied → Fix file permissions                        │
│ • Terminal command failed → Review error, decide retry/abort           │
│                                                                        │
└────────────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────────┐
│                         LOGGING & TELEMETRY                            │
├────────────────────────────────────────────────────────────────────────┤
│                                                                        │
│ Structured Logging (Winston/Pino):                                     │
│                                                                        │
│ logger.error({                                                         │
│   error: {                                                             │
│     name: 'RateLimitError',                                            │
│     message: 'OpenAI rate limit exceeded',                             │
│     status: 429,                                                       │
│     retryAfter: 60                                                     │
│   },                                                                   │
│   context: {                                                           │
│     request_id: 'req_abc123',                                          │
│     user_id: 'user_xyz',                                               │
│     model: 'gpt-4o',                                                   │
│     provider: 'openai'                                                 │
│   },                                                                   │
│   action: 'retry_after_60s'                                            │
│ }, 'LLM API error');                                                   │
│                                                                        │
│ Metrics (OpenTelemetry):                                               │
│ • error_count (by error_type, provider, model)                         │
│ • retry_count (by error_type)                                          │
│ • circuit_breaker_state (CLOSED | OPEN | HALF_OPEN)                    │
│ • degraded_requests (partial context due to provider errors)           │
│                                                                        │
│ User-Facing Error Messages:                                            │
│ ❌ Technical: "OpenAI API returned 429: Rate limit exceeded"           │
│ ✅ User-Friendly: "Too many requests. Please wait 60 seconds."         │
│                                                                        │
└────────────────────────────────────────────────────────────────────────┘
```

**Priority**: 🔴 **CRITICAL** - Document and implement in Phase 1 (Week 1-2)

---

## 10. DEPLOYMENT ARCHITECTURE

### Production Infrastructure

```
┌──────────────────────────────────────────────────────────────────────────┐
│                      DEPLOYMENT ARCHITECTURE                             │
│                         (Enterprise Scale)                               │
└──────────────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────────┐
│                          USER WORKSTATIONS                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐                │
│  │  Developer   │  │  Developer   │  │  Developer   │   ... (10K+)   │
│  │  Machine     │  │  Machine     │  │  Machine     │                │
│  │              │  │              │  │              │                │
│  │ ┌──────────┐ │  │ ┌──────────┐ │  │ ┌──────────┐ │                │
│  │ │   IDE    │ │  │ │   IDE    │ │  │ │   IDE    │ │                │
│  │ │ (VSCode) │ │  │ │(IntelliJ)│ │  │ │  (Vim)   │ │                │
│  │ └────┬─────┘ │  │ └────┬─────┘ │  │ └────┬─────┘ │                │
│  │      │       │  │      │       │  │      │       │                │
│  │ ┌────▼─────┐ │  │ ┌────▼─────┐ │  │ ┌────▼─────┐ │                │
│  │ │  Cody    │ │  │ │  Cody    │ │  │ │  Cody    │ │                │
│  │ │Extension │ │  │ │ Plugin   │ │  │ │ Plugin   │ │                │
│  │ └────┬─────┘ │  │ └────┬─────┘ │  │ └────┬─────┘ │                │
│  └──────┼───────┘  └──────┼───────┘  └──────┼───────┘                │
│         │                 │                 │                          │
│         │ config.yaml     │ config.yaml     │ config.yaml              │
│         │ (per user)      │ (per user)      │ (per user)               │
└─────────┼─────────────────┼─────────────────┼──────────────────────────┘
          │                 │                 │
          │ HTTPS           │ HTTPS           │ HTTPS
          │                 │                 │
┌─────────┼─────────────────┼─────────────────┼──────────────────────────┐
│         │                 │                 │  CORPORATE FIREWALL      │
│         ▼                 ▼                 ▼                          │
│  ┌──────────────────────────────────────────────────┐                 │
│  │            LOAD BALANCER (Optional)              │                 │
│  │         (if using proxy for audit/caching)       │                 │
│  └────────────────────┬─────────────────────────────┘                 │
└───────────────────────┼───────────────────────────────────────────────┘
                        │
                        │ INTERNET
                        │
┌───────────────────────┼───────────────────────────────────────────────┐
│                       │  EXTERNAL LLM PROVIDERS                       │
│       ┌───────────────┼───────────────────────────────────┐           │
│       │               │                                   │           │
│       ▼               ▼                                   ▼           │
│  ┌─────────┐    ┌─────────┐    ┌─────────┐    ┌──────────────────┐  │
│  │ OpenAI  │    │Anthropic│    │ Mistral │    │     Ollama       │  │
│  │   API   │    │   API   │    │   API   │    │  (Self-Hosted)   │  │
│  │         │    │         │    │         │    │                  │  │
│  │ • GPT-4 │    │ • Claude│    │• Codest-│    │ • Codellama      │  │
│  │ • GPT-4o│    │ • Opus  │    │  ral    │    │ • Custom models  │  │
│  │         │    │ • Sonnet│    │• Mistral│    │ • No rate limits │  │
│  │         │    │         │    │  Large  │    │ • GPU required   │  │
│  │         │    │         │    │         │    │                  │  │
│  │ Rate:   │    │ Rate:   │    │ Rate:   │    │ Capacity:        │  │
│  │ 500 RPM │    │ 1000 RPM│    │ 200 RPM │    │ Hardware-bound   │  │
│  └─────────┘    └─────────┘    └─────────┘    └──────────────────┘  │
│                                                                       │
│  ┌────────────────────────────────────────────────────────────────┐  │
│  │            MCP SERVERS (User/Team-Defined)                     │  │
│  │  • SQLite MCP (database queries)                               │  │
│  │  • Context7 MCP (context management)                           │  │
│  │  • Custom MCP servers (org-specific)                           │  │
│  └────────────────────────────────────────────────────────────────┘  │
└───────────────────────────────────────────────────────────────────────┘

┌───────────────────────────────────────────────────────────────────────┐
│                   CONFIGURATION MANAGEMENT                            │
│                  (Enterprise Multi-Tenancy)                           │
├───────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  SYSTEM CONFIG (Admin-Defined, Read-Only)                             │
│  /etc/cody/system-config.yaml                                         │
│  ┌─────────────────────────────────────────────────────────────────┐ │
│  │ models:                                                          │ │
│  │   - name: Enterprise GPT-4o                                      │ │
│  │     provider: openai                                             │ │
│  │     apiKey: ${OPENAI_API_KEY}  # From vault                      │ │
│  │     roles: [chat, edit, apply]                                   │ │
│  │   - name: Enterprise Ollama                                      │ │
│  │     provider: ollama                                             │ │
│  │     model: codellama                                             │ │
│  │     apiBase: http://ollama.internal:11434                        │ │
│  │     roles: [autocomplete]                                        │ │
│  │                                                                  │ │
│  │ rules:                                                           │ │
│  │   - "Never expose API keys or secrets in code"                   │ │
│  │   - "Follow OWASP security guidelines"                           │ │
│  └─────────────────────────────────────────────────────────────────┘ │
│                               │                                       │
│                               │ merged with                          │
│                               ▼                                       │
│  TEAM CONFIG (Team Lead-Defined)                                      │
│  /teams/{team-id}/config.yaml                                         │
│  ┌─────────────────────────────────────────────────────────────────┐ │
│  │ rules:                                                           │ │
│  │   - name: React best practices                                   │ │
│  │     rule: "Use functional components, hooks"                     │ │
│  │     globs: "**/*.{tsx,jsx}"                                      │ │
│  │                                                                  │ │
│  │ prompts:                                                         │ │
│  │   - name: Code Review                                            │ │
│  │     description: "Review code for team standards"                │ │
│  │     prompt: "..."                                                │ │
│  └─────────────────────────────────────────────────────────────────┘ │
│                               │                                       │
│                               │ merged with                          │
│                               ▼                                       │
│  USER CONFIG (Developer-Defined)                                      │
│  ~/.config/cody/config.yaml                                           │
│  ┌─────────────────────────────────────────────────────────────────┐ │
│  │ context:                                                         │ │
│  │   - provider: docs                                               │ │
│  │   - provider: codebase                                           │ │
│  │     params:                                                      │ │
│  │       nFinal: 5  # User prefers fewer results                    │ │
│  │                                                                  │ │
│  │ prompts:                                                         │ │
│  │   - name: My Custom Prompt                                       │ │
│  │     prompt: "..."                                                │ │
│  └─────────────────────────────────────────────────────────────────┘ │
│                               │                                       │
│                               ▼                                       │
│                      FINAL MERGED CONFIG                              │
│                      (Loaded at runtime)                              │
│                                                                       │
└───────────────────────────────────────────────────────────────────────┘

┌───────────────────────────────────────────────────────────────────────┐
│                  OBSERVABILITY & MONITORING                           │
│                     (Production Stack)                                │
├───────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  LOGGING (Structured)                                                 │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │ Winston/Pino → ELK Stack / Splunk                            │   │
│  │                                                               │   │
│  │ • Request logs (request_id, user_id, model, latency)         │   │
│  │ • Error logs (error_type, stack_trace, context)              │   │
│  │ • Audit logs (user action, tool use, file changes)           │   │
│  └──────────────────────────────────────────────────────────────┘   │
│                                                                       │
│  METRICS (OpenTelemetry)                                              │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │ Prometheus / Datadog / New Relic                             │   │
│  │                                                               │   │
│  │ • request_count (by mode, model, provider)                    │   │
│  │ • error_rate (by error_type, provider)                        │   │
│  │ • latency_p50/p95/p99 (by mode, model)                        │   │
│  │ • token_usage (by user, team, model)                          │   │
│  │ • circuit_breaker_state (by provider)                         │   │
│  │ • cache_hit_rate (by context_provider)                        │   │
│  └──────────────────────────────────────────────────────────────┘   │
│                                                                       │
│  TRACING (Distributed)                                                │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │ Jaeger / Zipkin / Datadog APM                                │   │
│  │                                                               │   │
│  │ Spans:                                                        │   │
│  │ • User Request                                                │   │
│  │   ├─ Model Selection                                          │   │
│  │   ├─ Context Aggregation                                      │   │
│  │   │   ├─ file provider (50ms)                                 │   │
│  │   │   ├─ code provider (100ms)                                │   │
│  │   │   └─ codebase provider (800ms)                            │   │
│  │   ├─ Rules Engine                                             │   │
│  │   ├─ LLM API Call (2000ms)                                    │   │
│  │   └─ Response Rendering                                       │   │
│  └──────────────────────────────────────────────────────────────┘   │
│                                                                       │
│  DASHBOARDS (Grafana)                                                 │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │ • Cody Overview (request rate, error rate, latency)           │   │
│  │ • Provider Health (OpenAI, Anthropic, Mistral, Ollama)        │   │
│  │ • Cost Analysis (token usage by user/team/model)              │   │
│  │ • User Experience (response time, autocomplete latency)       │   │
│  └──────────────────────────────────────────────────────────────┘   │
│                                                                       │
└───────────────────────────────────────────────────────────────────────┘
```

**Deployment Models**:
1. **Client-Side Only** (Current): Cody runs entirely in IDE, calls LLM APIs directly
2. **Proxy Mode** (Enterprise): Corporate proxy for audit, caching, rate limiting
3. **Hybrid Mode** (Self-Hosted): Ollama for autocomplete, cloud LLMs for chat/agent

---

## CONCLUSION

This visual reference provides architectural diagrams for Syncfusion Cody's key components and flows. 

**Key Takeaways**:
- ✅ Clean, modular architecture with clear separation of concerns
- ✅ Configuration-driven design enables flexibility
- ✅ Multi-modal interaction (4 modes) covers full developer workflow
- ⚠️ Error handling not documented (critical gap)
- ⚠️ Scalability risks (token limits, rate limits) need mitigation

**Related Documents**:
- [Full Architecture Review](./PRINCIPAL_ARCHITECT_COMPLETE_REVIEW_2025.md) (62 pages)
- [Executive Summary](./ARCHITECTURE_REVIEW_EXECUTIVE_SUMMARY_2025.md) (10 pages)

---

**Document Metadata**:
- **Diagrams**: 10 comprehensive flows
- **Format**: ASCII art (portable, version-controllable)
- **Maintained By**: Principal Software Architect
- **Last Updated**: January 2025
