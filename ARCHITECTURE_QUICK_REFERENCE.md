# 🏛️ ARCHITECTURE QUICK REFERENCE GUIDE
## Syncfusion Cody - Developer Pocket Guide

---

## 1. SYSTEM ARCHITECTURE AT A GLANCE

### The Hub-and-Spoke Model
```
config.yaml (Single Source of Truth)
    ↓
    ├── Models (OpenAI, Claude, Mistral, Ollama)
    ├── Context Providers (10+ sources)
    ├── Rules Engine (Behavioral constraints)
    └── Custom Prompts
    
    ↓ (all flow through)
    
LLM Request Pipeline
    ↓
Chat Mode | Edit Mode | Agent Mode | Autocomplete Mode
    ↓
IDE Integration Layer
```

### Key Principle
**Everything is driven by configuration**, not code. No code changes needed to add models, context, or rules.

---

## 2. THE 4 MODES EXPLAINED

| Mode | Hotkey | Use Case | Safety |
|------|--------|----------|--------|
| **Chat** | Cmd+L / Ctrl+L | Ask questions, get explanations | None (read-only) |
| **Edit** | Cmd+I / Ctrl+I | Modify selected code | Accept/Reject per change |
| **Agent** | Mode dropdown | Autonomous multi-step tasks | User permission gate |
| **Autocomplete** | Enable in config | Real-time inline suggestions | Keydown-driven |

---

## 3. REQUEST PIPELINE (How Everything Works)

```
1. User initiates request (Chat/Edit/Agent/Autocomplete)
   ↓
2. Select Model (by role from config)
   ↓
3. Gather Context (execute providers in order)
   • file provider
   • code provider
   • codebase provider (semantic search)
   • docs provider (if configured)
   ↓ ⚠️ ISSUE: No token budget here!
   
4. Build System Message (combine all rules)
   • Include glob-matched rules
   ↓
5. Call LLM (invoke selected model with context + rules)
   ↓
6. Render Response (format & display)
```

---

## 4. CONFIGURATION SCHEMA

### Minimal Config (3 Required Fields)
```yaml
name: "My Cody Config"
version: "1.0.0"
schema: "v1"
```

### Full Config Template
```yaml
name: string                    # Config identifier (REQUIRED)
version: "x.y.z"              # Semantic version (REQUIRED)
schema: "v1"                  # Schema version (REQUIRED)

models:                        # LLM configurations
  - name: gpt-4o
    provider: openai          # openai | anthropic | mistral | ollama
    model: gpt-4o
    apiKey: ${OPENAI_API_KEY} # Environment variable (NOT PLAINTEXT!)
    roles:                     # Which modes can use this
      - chat
      - edit
      - autocomplete
    defaultCompletionOptions:
      temperature: 0.7
      maxTokens: 1500

context:                       # Context providers (in order)
  - provider: file            # Current file
  - provider: code            # Selected code
  - provider: codebase        # Semantic search
    params:
      nFinal: 10              # Top 10 results
  - provider: docs            # Documentation
    params:
      url: "https://..."

rules:                         # Behavioral constraints
  - "Always use TypeScript"
  - name: "API conventions"
    rule: "Use async/await, not promises"
    globs:
      - "src/api/**/*.ts"

prompts:                       # Custom templates
  - name: "Document Function"
    description: "Add JSDoc to function"
    prompt: "Add comprehensive JSDoc..."

docs:                          # Documentation crawling
  - name: "Syncfusion Docs"
    startUrl: "https://help.syncfusion.com/..."
    maxDepth: 4

mcpServers:                    # MCP protocol servers
  - name: "SQLite"
    command: "uvx"
    args:
      - "mcp-server-sqlite"
      - "--db-path"
      - "/path/to/db"
    env:
      DB_VAR: "value"
```

---

## 5. CRITICAL ANTI-PATTERNS TO AVOID

### 🔴 ANTI-PATTERN #1: Plaintext API Keys
```yaml
# ❌ WRONG
models:
  - apiKey: sk-xxxxxxxxxxxx

# ✅ CORRECT
models:
  - apiKey: ${OPENAI_API_KEY}
```

### 🔴 ANTI-PATTERN #2: Unbounded Context
```python
# ❌ WRONG - No limits on context size
context_data = file_provider() + codebase_search() + docs_provider()
# Result: May exceed token limit

# ✅ CORRECT - Enforce token budget
budget = TokenBudget(total_budget=6000)
context = ""
for provider in providers:
    data = provider.fetch()
    if not budget.can_add(data):
        break  # Stop adding providers
    context += data
    budget.add(data)
```

### 🔴 ANTI-PATTERN #3: No Schema Validation
```python
# ❌ WRONG - Parse without validation
config = yaml.safe_load(raw_config)
# If config invalid, fails silently later

# ✅ CORRECT - Validate schema
validate_config(config)  # Raises ConfigurationError if invalid
```

### 🔴 ANTI-PATTERN #4: No Error Handling
```python
# ❌ WRONG - Silent failures
model = select_model("chat")
response = call_llm(model, context, prompt)

# ✅ CORRECT - Handle errors gracefully
try:
    model = select_model("chat")
except ModelNotFoundException:
    model = select_model("chat", allow_fallback=True)

try:
    response = call_llm(model, context, prompt)
except APICallFailedError:
    return {"error": True, "message": "API temporarily unavailable"}
```

---

## 6. DESIGN PATTERNS IN USE

### ✅ Configuration as Code
- Everything driven by YAML
- No code changes needed for behavior customization
- **Benefit**: Runtime flexibility, reproducibility

### ✅ Hub-and-Spoke
- Config is central hub
- Models, context, rules are spokes
- **Benefit**: Decoupling, independent evolution

### ✅ Strategy Pattern
- Multiple LLM providers (OpenAI, Claude, etc.)
- Role-based model selection
- **Benefit**: Pluggability, multi-model support

### ✅ Provider Pattern
- 10+ context providers (file, code, codebase, etc.)
- Easy to add new providers
- **Benefit**: Extensibility, modularity

### ✅ Pipeline Pattern
- Model → Context → Rules → LLM flow
- Middleware-like composition
- **Benefit**: Separation of concerns

### ✅ Permission Gate
- Agent mode requires explicit user permission
- **Benefit**: Safety, user control

### ⚠️ Circuit Breaker (NOT IMPLEMENTED)
- Should handle API failures gracefully
- Need: Fallback models, retry logic
- **Impact**: Service unavailability on API errors

### ⚠️ Caching (NOT IMPLEMENTED)
- Should cache context and embeddings
- **Impact**: Slower subsequent requests

---

## 7. SCALABILITY LIMITS & SOLUTIONS

### ⚠️ Token Budget Overflow

**Problem**:
```
Large file (20KB) +
Codebase search (50KB) +
Docs (20KB) =
90KB ≈ 90,000 tokens

GPT-4 limit: 8,192 tokens
Result: REQUEST FAILS
```

**Solution**:
```yaml
# Enforce per-provider budgets
context:
  - provider: file
    params:
      maxTokens: 3000        # NEW

  - provider: codebase
    params:
      maxTokens: 2000        # NEW
      maxResults: 10

  - provider: docs
    params:
      maxTokens: 1000        # NEW
```

### ⚠️ Rate Limiting

**Problem**: 100 concurrent users → API rate limit exceeded

**Solution**: Token budget per minute
```python
class TokenBudget:
    def __init__(self, tokens_per_minute=90000):
        self.budget = tokens_per_minute
        self.window_start = time.time()
    
    def can_request(self, tokens_needed):
        if time.time() - self.window_start > 60:
            self.budget = self.tokens_per_minute
            self.window_start = time.time()
        return tokens_needed < self.budget
```

### ⚠️ Configuration Parsing

**Problem**: Large config file (1MB+) slow to parse

**Solution**: Caching + watching
```python
@lru_cache(maxsize=1)
def load_config(config_file):
    return parse_yaml(config_file)

watch_file(config_file, invalidate_cache)
```

---

## 8. SECURITY CHECKLIST

### 🔐 Required Fixes

- [ ] Remove plaintext API keys from documentation
- [ ] Implement environment variable resolution
- [ ] Add credential masking in logs
- [ ] Add config schema validation
- [ ] Implement audit logging for Agent mode
- [ ] Add MCP server signature verification

### 🔐 Best Practices

```yaml
# DO:
models:
  - apiKey: ${OPENAI_API_KEY}

# DON'T:
models:
  - apiKey: sk-xxxxxxxxxx
```

```python
# DO: Mask credentials in logs
safe_log("Config loaded", masked_data)

# DON'T: Log raw config with secrets
logger.info(f"Config: {config}")
```

---

## 9. AGENT MODE UNDER THE HOOD

### 6-Step Workflow
```
┌─ STEP 1: UNDERSTAND
│  └─ Parse intent, extract goals
│
├─ STEP 2: EXPLORE
│  └─ Search codebase, understand structure
│
├─ STEP 3: PLAN
│  └─ Identify files, prepare strategy
│
├─ STEP 4: EXECUTE ◄─── [PERMISSION GATE HERE]
│  └─ User clicks CONTINUE
│  └─ Apply edits, run commands
│
├─ STEP 5: VERIFY
│  └─ Check syntax, validate
│
└─ STEP 6: COMPLETE
   └─ Summarize changes
```

### Tool Access
Agent can use:
- File search
- File read/write
- Terminal commands
- IDE code navigation

**All require permission before execution!**

---

## 10. CONTEXT PROVIDERS REFERENCE

| Provider | Purpose | Output | Use Case |
|----------|---------|--------|----------|
| `file` | Current file | File text | Immediate context |
| `code` | Selected code | Snippet | User selection |
| `codebase` | Semantic search | Top-N files | Related code |
| `docs` | Documentation | Indexed docs | Learning |
| `diff` | Git changes | Diff context | Change context |
| `http` | HTTP endpoint | Response | External context |
| `folder` | Directory structure | Tree view | Navigation |
| `terminal` | Terminal output | Last output | Recent actions |
| `problems` | Linter output | Diagnostics | Issues |
| `helpbot` | Custom help | Custom | Domain-specific |

---

## 11. MODEL ROLES EXPLAINED

| Role | Used By | Purpose | Example |
|------|---------|---------|---------|
| `chat` | Chat mode | Conversational | "Explain this function" |
| `edit` | Edit mode | Code modification | "Add error handling" |
| `autocomplete` | Autocomplete | Real-time suggestions | Type-as-you-go |
| `apply` | Internal | Apply changes | Generating diffs |
| `embed` | Internal | Generate embeddings | Semantic search |
| `rerank` | Internal | Re-rank results | Relevance sorting |

---

## 12. TROUBLESHOOTING GUIDE

### Issue: "No model found for chat role"
**Cause**: No configured model with `chat` role
**Fix**: Add to config:
```yaml
models:
  - name: gpt-4o
    provider: openai
    roles: [chat]
```

### Issue: "Context window exceeded"
**Cause**: Context too large for model
**Fix**: Reduce context or enforce token budget
```yaml
context:
  - provider: codebase
    params:
      nFinal: 5  # Reduce from 10
```

### Issue: API key not found
**Cause**: `${OPENAI_API_KEY}` env var not set
**Fix**: Set environment variable
```bash
export OPENAI_API_KEY=sk-xxxxxxxxxxxx
```

### Issue: Config changes not taking effect
**Cause**: IDE caches config, needs restart
**Fix**: Restart IDE (or wait for hot-reload in v0.3)

---

## 13. GLOSSARY

**Config as Database**: YAML file serves as Cody's configuration storage
**Context**: Information fed to LLM (file content, code, docs)
**Hub-and-Spoke**: Architectural pattern with central orchestrator
**Mode**: Interaction method (Chat, Edit, Agent, Autocomplete)
**Provider**: Context source (file, codebase, docs)
**Role**: Model capability assignment (chat, edit, autocomplete)
**Rule**: Behavioral constraint for LLM
**Schema**: YAML structure validation
**Token Budget**: Limit on total context size

---

## 14. QUICK START: Adding a New Model

### Step 1: Get API Key
```bash
# Example: OpenAI
export OPENAI_API_KEY=sk-xxxxxxxxxxxx
```

### Step 2: Add to Config
```yaml
models:
  - name: gpt-4-turbo
    provider: openai
    model: gpt-4-turbo
    apiKey: ${OPENAI_API_KEY}
    roles: [chat, edit]
    defaultCompletionOptions:
      temperature: 0.7
      maxTokens: 1500
```

### Step 3: Restart IDE
Config reloads on startup (hot-reload coming in v0.3)

### Step 4: Use in Chat
```
Chat: (should use new model for chat role)
```

---

## 15. QUICK START: Adding Context Provider

### Step 1: Configure Provider
```yaml
context:
  - provider: codebase
    params:
      nFinal: 10  # Top 10 results
```

### Step 2: Specify Order
Providers execute in config order:
1. file (current)
2. code (selection)
3. codebase (search)
4. docs (optional)

### Step 3: Add Budget (v0.2+)
```yaml
context:
  - provider: codebase
    params:
      nFinal: 10
      maxTokens: 2000  # NEW in v0.2
```

---

## 16. ROADMAP AT A GLANCE

```
v0.1 (Current):
  ✓ 4 modes (Chat, Edit, Agent, Autocomplete)
  ✓ Multi-provider models
  ✓ Context providers
  ✓ Rules engine

v0.2 (NEXT - 2 weeks):
  + Environment variables
  + Config schema validation
  + Token budget enforcement
  + Credential masking
  + Fallback models

v0.3 (Weeks 3-6):
  + Config composition
  + Hot-reload
  + Error handling
  + Rate limiting
  + Audit logging

v0.4 (Weeks 7-10):
  + Caching layer
  + Token tracking dashboard
  + Multi-model fallback
  + Circuit breaker

v0.5+ (Enterprise):
  + Team config sharing
  + Multi-workspace
  + SAML/OAuth
  + Cost analytics
```

---

## 17. READING NEXT

For deeper understanding, read in this order:

1. **Configure-the-Cody.md** – Configuration reference
2. **features/Chat.md** – Chat mode deep dive
3. **features/Agent.md** – Agent mode workflow
4. **PRINCIPAL_ARCHITECTURE_REVIEW_2024.md** – Full architecture analysis
5. **ARCHITECTURE_DIAGRAMS.md** – Visual representations

---

**Document Version**: 1.0  
**Last Updated**: 2024  
**Audience**: Developers, Architects, Integration Partners
