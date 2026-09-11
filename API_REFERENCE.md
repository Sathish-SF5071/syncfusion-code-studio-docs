# 🔌 Syncfusion Cody - API & System Interface Reference

Comprehensive reference for all APIs, interfaces, and system interactions in Syncfusion Cody.

---

## 📋 Overview

Syncfusion Cody operates primarily as an IDE extension with the following system interfaces:

1. **LLM Provider APIs** — External calls to language models
2. **IDE Integration APIs** — Interface with hosting IDE
3. **Context Provider APIs** — Data source interfaces
4. **MCP Server Interface** — Model Context Protocol for extensions
5. **Configuration API** — Settings and configuration management
6. **Internal Service APIs** — Communication between Cody components

---

## 🤖 LLM Provider APIs

### OpenAI API

**Endpoint**: `https://api.openai.com/v1/chat/completions`

**Configuration**:
```yaml
models:
  - name: "GPT-4"
    provider: openai
    model: gpt-4o
    apiKey: ${OPENAI_API_KEY}
    baseUrl: "https://api.openai.com/v1"  # Optional custom endpoint
    timeout: 30000  # ms
```

**Request Structure**:
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
  "top_p": 0.95,
  "stream": true
}
```

**Response Structure**:
```json
{
  "id": "chatcmpl-...",
  "object": "chat.completion",
  "created": 1703000000,
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

**Error Handling**:
```json
{
  "error": {
    "message": "Invalid API key",
    "type": "invalid_request_error",
    "param": "api_key",
    "code": "invalid_api_key"
  }
}
```

**Status Codes**:
| Code | Meaning | Retry Strategy |
|------|---------|-----------------|
| 200 | Success | None |
| 400 | Bad request | No (fix request) |
| 401 | Unauthorized | No (fix credentials) |
| 429 | Rate limited | Yes, exponential backoff |
| 500 | Server error | Yes, with backoff |
| 503 | Service unavailable | Yes, with backoff |

**Example Request (Python)**:
```python
import openai

openai.api_key = os.getenv("OPENAI_API_KEY")

response = openai.ChatCompletion.create(
    model="gpt-4o",
    messages=[
        {"role": "system", "content": "You are a helpful code assistant."},
        {"role": "user", "content": "Explain this function..."}
    ],
    stream=True
)

for chunk in response:
    print(chunk["choices"][0]["delta"].get("content", ""), end="")
```

### Mistral API

**Endpoint**: `https://api.mistral.ai/v1/chat/completions`

**Configuration**:
```yaml
models:
  - name: "Mistral Large"
    provider: mistral
    model: mistral-large
    apiKey: ${MISTRAL_API_KEY}
    baseUrl: "https://api.mistral.ai/v1"
```

**Request Structure**: Same as OpenAI (compatible)

### Anthropic (Claude) API

**Endpoint**: `https://api.anthropic.com/v1/messages`

**Configuration**:
```yaml
models:
  - name: "Claude 3"
    provider: anthropic
    model: claude-3-opus-20240229
    apiKey: ${ANTHROPIC_API_KEY}
    baseUrl: "https://api.anthropic.com/v1"
```

**Request Structure**:
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

### Ollama API (Local)

**Endpoint**: `http://localhost:11434/api/chat`

**Configuration**:
```yaml
models:
  - name: "Ollama Local"
    provider: ollama
    baseUrl: "http://localhost:11434"
    model: mistral
```

**Request Structure**:
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

**Startup Command**:
```bash
ollama serve
# Then in another terminal:
ollama run mistral  # Download model
```

### Custom OpenAI-Compatible API

**Configuration**:
```yaml
models:
  - name: "Custom LLM"
    provider: custom-openai
    baseUrl: "https://your-api.example.com/v1"
    model: your-model-name
    apiKey: ${CUSTOM_API_KEY}
```

---

## 🖥️ IDE Integration APIs

### Code Editor Interface

**Available Methods** (per IDE):

```typescript
// Get selected code
const selectedCode = editor.getSelectedText();

// Get current file content
const fileContent = editor.getCurrentFile();

// Get file path
const filePath = editor.getCurrentFilePath();

// Open file at line
editor.openFile(filePath, lineNumber);

// Insert text at cursor
editor.insertText(text);

// Replace selected text
editor.replaceSelectedText(newText);

// Get all files in project
const files = editor.getProjectFiles();

// Search in files
const results = editor.search(pattern);
```

### Keyboard Shortcuts

```yaml
shortcuts:
  - key: "Cmd+L"           # macOS
    key: "Ctrl+L"          # Windows/Linux
    mode: "chat"
    action: "Send selected code to chat"
  
  - key: "Cmd+I"           # macOS
    key: "Ctrl+I"          # Windows/Linux
    mode: "edit"
    action: "Open edit dialog"
  
  - key: "Type"
    mode: "autocomplete"
    action: "Show suggestions"
```

### Permission Prompting

```typescript
// Agent mode requests permission for tool use
interface ToolRequest {
  toolName: string;        // e.g., "file_edit"
  description: string;     // What it will do
  targetFile?: string;     // File path if applicable
  command?: string;        // Command if terminal
}

// User response
interface ToolPermission {
  approved: boolean;
  rememberChoice?: boolean;  // Remember for future
}
```

### IDE Events

```typescript
interface IDEEvent {
  type: "selection" | "save" | "close" | "open";
  timestamp: number;
  file?: string;
  text?: string;
}

// Event handlers
onFileOpen(callback: (file: string) => void);
onFileEdit(callback: (file: string, changes: Change[]) => void);
onFileSave(callback: (file: string) => void);
onSelection(callback: (text: string) => void);
```

---

## 📦 Context Provider API

### Provider Interface

```typescript
interface ContextProvider {
  type: string;              // "file", "code", "codebase", etc.
  enabled: boolean;
  priority: number;          // Higher = used first
  
  // Called to gather context
  gatherContext(request: ContextRequest): Promise<ContextData>;
  
  // Called to check if provider is ready
  isReady(): Promise<boolean>;
  
  // Optional: customize for specific files
  supportsGlob?(glob: string): boolean;
}

interface ContextRequest {
  query?: string;            // What to search for
  maxSize?: number;          // Max bytes to return
  fileGlob?: string;         // File pattern to match
}

interface ContextData {
  content: string;           // The actual context
  source: string;            // Where it came from
  relevance: number;         // 0-1 score
  tokens: number;            // Approximate token count
}
```

### Built-in Providers

#### 1. File Provider
```typescript
// Returns current/selected file content
{
  type: "file",
  enabled: true,
  gatherContext: async (request) => ({
    content: currentFileContent,
    source: "file:" + filePath,
    relevance: 1.0,
    tokens: 500
  })
}
```

#### 2. Code Provider
```typescript
// Returns selected code snippet
{
  type: "code",
  enabled: true,
  gatherContext: async (request) => ({
    content: selectedCodeSnippet,
    source: "code:selection",
    relevance: 1.0,
    tokens: 150
  })
}
```

#### 3. Codebase Provider
```typescript
// Returns project structure and related files
{
  type: "codebase",
  enabled: true,
  gatherContext: async (request) => ({
    content: projectStructure + relatedFiles,
    source: "codebase:" + projectRoot,
    relevance: 0.7,
    tokens: 2000
  })
}
```

#### 4. Docs Provider
```yaml
# Configuration
context:
  - type: docs
    enabled: true
    sites:
      - startUrl: "https://docs.syncfusion.com"
        maxDepth: 3
        updateFrequency: "daily"
```

#### 5. HTTP Provider
```typescript
// Returns content from HTTP URLs
{
  type: "http",
  enabled: true,
  urls: ["https://api.example.com/docs"],
  gatherContext: async (request) => ({
    content: fetchedHTTPContent,
    source: "http:" + url,
    relevance: 0.6,
    tokens: 1000
  })
}
```

#### 6. Terminal Provider
```typescript
// Returns output from recent terminal commands
{
  type: "terminal",
  enabled: false,  // Optional, may be slow
  gatherContext: async (request) => ({
    content: lastTerminalOutput,
    source: "terminal:output",
    relevance: 0.5,
    tokens: 500
  })
}
```

#### 7. Diff Provider
```typescript
// Returns git diff of current changes
{
  type: "diff",
  enabled: true,
  gatherContext: async (request) => ({
    content: gitDiff,
    source: "diff:git",
    relevance: 0.9,
    tokens: 1000
  })
}
```

#### 8. Folder Provider
```typescript
// Returns directory structure
{
  type: "folder",
  enabled: true,
  path: "./src",
  depth: 2,
  gatherContext: async (request) => ({
    content: folderStructure,
    source: "folder:" + path,
    relevance: 0.7,
    tokens: 300
  })
}
```

#### 9. Problems Provider
```typescript
// Returns IDE diagnostics/errors
{
  type: "problems",
  enabled: true,
  gatherContext: async (request) => ({
    content: compilerErrors + warnings,
    source: "problems:diagnostics",
    relevance: 0.8,
    tokens: 500
  })
}
```

#### 10. HelpBot Provider
```typescript
// Returns internal help documentation
{
  type: "helpbot",
  enabled: true,
  docsPath: "./docs",
  gatherContext: async (request) => ({
    content: matchingHelpDocs,
    source: "helpbot:docs",
    relevance: 0.6,
    tokens: 800
  })
}
```

### Context Aggregation Flow

```
User Request
    ↓
Load Enabled Providers
    ↓
Sort by Priority
    ↓
Gather Context (Parallel)
    ├─ file provider
    ├─ code provider
    ├─ codebase provider
    └─ docs provider
    ↓
Merge Results
    ├─ Concatenate content
    ├─ Sum tokens
    └─ Calculate relevance
    ↓
Limit Token Budget
    ├─ If total > budget
    └─ Prune by relevance
    ↓
Build LLM Message
    ├─ System prompt
    ├─ Context
    └─ User request
```

---

## 🔌 MCP Server Interface

**Standard**: Model Context Protocol (Anthropic specification)

### Server Discovery

```yaml
mcpServers:
  - name: "filesystem"
    command: "mcp-filesystem"
    args: []
    env:
      MAX_PATH_LENGTH: "1000"
    timeout: 5000
```

### Tool Registration

**MCP servers expose tools** that Cody's Agent can use:

```json
{
  "tools": [
    {
      "name": "read_file",
      "description": "Read a file from the filesystem",
      "inputSchema": {
        "type": "object",
        "properties": {
          "path": {
            "type": "string",
            "description": "Path to file"
          }
        },
        "required": ["path"]
      }
    },
    {
      "name": "execute_sql",
      "description": "Execute SQL query",
      "inputSchema": {
        "type": "object",
        "properties": {
          "query": { "type": "string" },
          "database": { "type": "string" }
        }
      }
    }
  ]
}
```

### Tool Invocation Flow

```
Agent decides to use tool
    ↓
Requests user permission
    ↓
Sends tool request to MCP server:
{
  "tool": "read_file",
  "input": {
    "path": "/path/to/file"
  }
}
    ↓
MCP server executes tool
    ↓
Returns result:
{
  "success": true,
  "output": "file content here"
}
    ↓
Agent receives result
    ↓
Continues workflow
```

### Common MCP Servers

| Server | Tools | Use Case |
|--------|-------|----------|
| filesystem | read, write, delete | File operations |
| database | query, execute, insert | Database access |
| http | get, post, put | API calls |
| shell | execute | Terminal commands |
| git | commit, push, branch | Version control |

### Example: Custom MCP Server

```python
# mcp_server.py
from mcp.server import Server
from mcp.types import TextContent, Tool

server = Server("my-server")

@server.tool
def analyze_code(code: str) -> str:
    """Analyze code for issues"""
    return f"Analysis: {len(code)} characters found"

@server.tool
def format_code(code: str) -> str:
    """Format code"""
    return formatted_code

server.run()
```

**Register in config**:
```yaml
mcpServers:
  - name: "code-analyzer"
    command: "python"
    args: ["mcp_server.py"]
```

---

## ⚙️ Configuration API

### Configuration Schema

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "required": ["name", "version", "schema"],
  "properties": {
    "name": {
      "type": "string",
      "description": "Configuration name"
    },
    "version": {
      "type": "string",
      "pattern": "^\\d+\\.\\d+\\.\\d+$",
      "description": "Semantic version"
    },
    "schema": {
      "type": "string",
      "enum": ["v1"],
      "description": "Schema version"
    },
    "models": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "name": { "type": "string" },
          "provider": { "enum": ["openai", "mistral", "ollama", "anthropic", "custom-openai"] },
          "model": { "type": "string" },
          "apiKey": { "type": "string" },
          "baseUrl": { "type": "string" },
          "roles": {
            "type": "array",
            "items": { "enum": ["chat", "edit", "autocomplete", "apply", "embed", "rerank"] }
          }
        }
      }
    },
    "context": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "type": { "type": "string" },
          "enabled": { "type": "boolean" }
        }
      }
    },
    "rules": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "text": { "type": "string" },
          "glob": { "type": "string" }
        }
      }
    }
  }
}
```

### Configuration Loading

```typescript
async function loadConfiguration(filePath: string): Promise<Config> {
  // 1. Read YAML file
  const yamlContent = fs.readFileSync(filePath, 'utf-8');
  
  // 2. Resolve environment variables
  const resolved = resolveEnvVars(yamlContent);
  
  // 3. Parse YAML
  const config = yaml.parse(resolved);
  
  // 4. Validate against schema
  validateSchema(config);
  
  // 5. Return parsed config
  return config;
}

// Environment variable resolution
function resolveEnvVars(content: string): string {
  return content.replace(/\$\{([^}]+)\}/g, (match, varName) => {
    const value = process.env[varName];
    if (!value) {
      throw new Error(`Environment variable not found: ${varName}`);
    }
    return value;
  });
}
```

### Configuration Validation

```typescript
interface ValidationError {
  field: string;
  message: string;
  severity: "error" | "warning";
}

function validateConfiguration(config: Config): ValidationError[] {
  const errors: ValidationError[] = [];
  
  // Check required fields
  if (!config.name) {
    errors.push({ field: "name", message: "Required", severity: "error" });
  }
  
  // Check model coverage
  const roles = ["chat", "edit", "autocomplete"];
  const availableRoles = new Set(config.models.flatMap(m => m.roles));
  
  for (const role of roles) {
    if (!availableRoles.has(role)) {
      errors.push({
        field: "models",
        message: `No model configured for role: ${role}`,
        severity: "warning"
      });
    }
  }
  
  // Check API credentials
  for (const model of config.models) {
    if (!process.env[model.apiKey.replace("${", "").replace("}", "")]) {
      errors.push({
        field: "models",
        message: `API key not found: ${model.apiKey}`,
        severity: "error"
      });
    }
  }
  
  return errors;
}
```

---

## 📨 Internal Service APIs

### Model Manager Interface

```typescript
interface ModelManager {
  // Select model by role
  getModel(role: ModelRole): Promise<LLMModel>;
  
  // Invoke LLM with system message + user input
  invoke(params: InvokeParams): Promise<string>;
  
  // Stream response
  invokeStream(params: InvokeParams): AsyncIterable<string>;
  
  // Get available models
  listModels(): LLMModel[];
}

interface InvokeParams {
  role: ModelRole;
  systemPrompt: string;
  userInput: string;
  context: string;
  temperature?: number;
  maxTokens?: number;
}
```

### Context Aggregator Interface

```typescript
interface ContextAggregator {
  // Gather context for request
  aggregate(request: AggregationRequest): Promise<AggregatedContext>;
  
  // Get specific provider
  getProvider(type: string): ContextProvider;
}

interface AggregationRequest {
  query?: string;
  fileGlob?: string;
  maxTokens?: number;
}

interface AggregatedContext {
  content: string;
  sources: string[];
  totalTokens: number;
  providers: string[];
}
```

### Rules Engine Interface

```typescript
interface RulesEngine {
  // Get rules for current context
  getRules(filePath?: string): Rule[];
  
  // Combine rules into system message
  buildSystemMessage(role: ModelRole, filePath?: string): string;
}

interface Rule {
  text: string;
  glob?: string;  // Optional file pattern
  order: number;   // Application order
}
```

### Agent Coordinator Interface

```typescript
interface AgentCoordinator {
  // Execute multi-step task
  execute(request: AgentRequest): Promise<AgentResult>;
  
  // Request tool execution (with permission)
  requestTool(toolName: string, input: any): Promise<ToolResult>;
}

interface AgentRequest {
  task: string;
  context: string;
  allowedTools: string[];
}

interface AgentResult {
  status: "success" | "failed" | "cancelled";
  output: string;
  filesChanged: string[];
  toolsUsed: string[];
}
```

---

## 🔄 Data Flow Examples

### Chat Mode Flow

```
User Input: "Explain this function"
    ↓
1. Context Aggregation
   - Gather file content
   - Gather selected code
   - Gather codebase structure
   - Gather relevant docs
    ↓
2. Model Selection
   - Load config
   - Find model with "chat" role
   - Select primary model
    ↓
3. Message Construction
   - Apply rules → System message
   - Combine context
   - Add user query
    ↓
4. LLM Invocation
   - Call OpenAI/Mistral/etc
   - Stream response
    ↓
5. Result Display
   - Display in chat panel
   - Format with markdown
```

### Agent Mode Flow

```
User Request: "Add dark mode toggle"
    ↓
1. Understand (Step 1)
   - Parse request
   - Load project context
    ↓
2. Explore (Step 2)
   - Search for settings component
   - Find theme-related files
    ↓
3. Plan (Step 3)
   - Break into sub-tasks
   - Create implementation strategy
    ↓
4. Execute (Step 4)
   - Request permission: "Edit settings.tsx"
   - User approves
   - Execute file edits
   - Request permission: "Run tests"
   - User approves
   - Execute tests
    ↓
5. Verify (Step 5)
   - Check tests pass
   - Verify file changes
    ↓
6. Complete (Step 6)
   - Summarize changes
   - Report success
```

---

## 🔐 Security Considerations

### API Key Management

✅ **Secure**:
```yaml
models:
  - apiKey: ${OPENAI_API_KEY}  # From environment
```

❌ **Insecure**:
```yaml
models:
  - apiKey: sk-abc123...       # Hardcoded in file
```

### Rate Limiting

```typescript
interface RateLimiter {
  // Track API calls
  recordCall(provider: string): void;
  
  // Check if allowed
  canMakeCall(provider: string): boolean;
  
  // Get retry-after
  getRetryAfter(provider: string): number;
}

// Example: Max 100 calls/min per provider
if (!rateLimiter.canMakeCall("openai")) {
  const waitMs = rateLimiter.getRetryAfter("openai");
  // Wait before retrying
}
```

### Tool Execution Sandboxing

```typescript
interface ToolSandbox {
  // Execute with restrictions
  execute(tool: string, input: any): Promise<any>;
}

// Example: Restrict file operations
const allowedPaths = ["/project/src", "/project/docs"];

function validatePath(path: string): boolean {
  return allowedPaths.some(allowed => path.startsWith(allowed));
}
```

---

## 📊 Error Handling

### Error Classification

```typescript
enum ErrorSeverity {
  Critical = "CRITICAL",    // Service down
  High = "HIGH",           // Operation failed
  Medium = "MEDIUM",       // Degraded mode
  Low = "LOW"              // Warning only
}

interface CodyError {
  code: string;
  message: string;
  severity: ErrorSeverity;
  context?: any;
  retryable: boolean;
}
```

### Common Errors

```typescript
// Model errors
{
  code: "MODEL_NOT_FOUND",
  message: "No model configured for role: chat",
  severity: ErrorSeverity.Critical,
  retryable: false
}

// API errors
{
  code: "API_UNAUTHORIZED",
  message: "Invalid API key for OpenAI",
  severity: ErrorSeverity.High,
  retryable: false
}

// Rate limit
{
  code: "RATE_LIMITED",
  message: "API rate limit exceeded",
  severity: ErrorSeverity.High,
  retryable: true
}

// Network errors
{
  code: "NETWORK_ERROR",
  message: "Failed to connect to API",
  severity: ErrorSeverity.High,
  retryable: true
}
```

### Retry Strategy

```typescript
async function invokeWithRetry(
  fn: () => Promise<any>,
  maxRetries: number = 3
): Promise<any> {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      if (!error.retryable || attempt === maxRetries - 1) {
        throw error;
      }
      
      // Exponential backoff
      const delay = Math.pow(2, attempt) * 1000;
      await new Promise(r => setTimeout(r, delay));
    }
  }
}
```

---

## 📚 Related Documentation

- **ONBOARDING.md** — Complete system guide
- **ARCHITECTURE_REVIEW.md** — Detailed architecture analysis
- **Configure-the-Cody.md** — Configuration properties reference
- **QUICK_REFERENCE.md** — One-page cheat sheet

---

**Last Updated**: 2024
