# 🎯 Syncfusion Cody - Quick Reference Cheat Sheet

Quick lookup guide for common tasks and concepts. **Print and post on your desk!**

---

## 🏗️ Architecture at a Glance

```
config.yaml (Central Hub)
    ↓
Models (LLM Selection) → Context (Data Sources) → Rules (Constraints)
    ↓
Chat/Edit/Agent/Autocomplete Modes
    ↓
LLM API Calls
    ↓
Results Display + Tool Execution (if Agent)
```

---

## 📁 Key Files & Locations

| File | Location | Purpose |
|------|----------|---------|
| Config | `config.yaml` | Central configuration hub |
| Features | `syncfusion-cody/features/` | Feature documentation |
| Getting Started | `syncfusion-cody/get-started/` | Installation guides |
| Reference | `syncfusion-cody/reference/` | Configuration reference |
| Architecture | `ARCHITECTURE_*.md` | System design docs |

---

## ⚙️ Configuration Quick Reference

### Minimal config.yaml

```yaml
name: "Cody Dev"
version: "1.0.0"
schema: "v1"
models:
  - name: "GPT-4"
    provider: "openai"
    model: "gpt-4o"
    apiKey: ${OPENAI_API_KEY}  # ✅ Use env vars!
    roles: [chat, edit, autocomplete]
context:
  - type: file
  - type: code
  - type: codebase
```

### Environment Variables

```bash
# Set API keys in your shell
export OPENAI_API_KEY="sk-..."
export MISTRAL_API_KEY="..."
export OLLAMA_URL="http://localhost:11434"

# In config, reference them
apiKey: ${OPENAI_API_KEY}  # ✅ Correct
# NOT: apiKey: "sk-..."     # ❌ Wrong!
```

### Supported Providers

- **OpenAI**: `openai` (GPT-4, GPT-3.5)
- **Mistral**: `mistral` (mistral-large, etc.)
- **Ollama**: `ollama` (local models)
- **Anthropic**: `anthropic` (Claude)
- **Custom**: `openai` with custom `baseUrl`

### Model Roles

| Role | Purpose | Example |
|------|---------|---------|
| `chat` | Chat mode | Answering questions |
| `edit` | Edit mode | Code modifications |
| `autocomplete` | Auto-complete | Real-time suggestions |
| `apply` | Apply changes | Finalize edits |
| `embed` | Embeddings | Semantic search |
| `rerank` | Reranking | Result ranking |

---

## 🎮 User Features Quick Reference

### Chat Mode
- **Trigger**: `Cmd+L` (Mac) / `Ctrl+L` (Windows/Linux)
- **How**: Select code → Press shortcut → Ask question
- **Use**: Understanding code, asking questions, getting suggestions

### Edit Mode
- **Trigger**: `Cmd+I` (Mac) / `Ctrl+I` (Windows/Linux)
- **How**: Select code → Press shortcut → Request change
- **Use**: Refactoring, fixing, improving code
- **Approval**: Review changes → Accept or reject

### Agent Mode
- **Trigger**: Select "Agent" in mode dropdown
- **How**: Describe task → Agent autonomously explores and executes
- **Use**: Multi-step tasks, complex refactoring, feature implementation
- **Approval**: Approve each tool use when prompted

### Autocomplete Mode
- **Trigger**: Start typing
- **How**: AI suggests completions contextually
- **Accept**: Tab key
- **Reject**: Esc key
- **Word-by-word**: Cmd/Ctrl + → arrow

---

## 📊 Context Providers Cheat Sheet

| Provider | Source | Auto-Included? | Use When |
|----------|--------|---|----------|
| `file` | Current open file | ✅ Yes | Focused on current file |
| `code` | Selected code | ✅ Yes | Working on specific snippet |
| `codebase` | Project files | ✅ Yes (limited) | Need project context |
| `docs` | Indexed documentation | ❌ Manual | Need external knowledge |
| `diff` | Git changes | ❌ Manual | Working with diffs |
| `http` | Web URLs | ❌ Manual | Need external API docs |
| `folder` | Directory contents | ❌ Manual | Working with directory |
| `terminal` | Command output | ❌ Manual | Need CLI context |
| `problems` | IDE errors | ❌ Manual | Debugging errors |
| `helpbot` | Help documentation | ❌ Manual | Getting help |

---

## 🚨 Troubleshooting Quick Guide

| Problem | Quick Fix | Full Guide |
|---------|-----------|-----------|
| Config not loading | Check `~/.cody/config.yaml` exists | ONBOARDING.md → Issue 1 |
| API fails | Check `echo $OPENAI_API_KEY` | ONBOARDING.md → Issue 2 |
| Response is slow | Reduce context size in config | ONBOARDING.md → Issue 3 |
| Agent fails | Check tool permissions granted | ONBOARDING.md → Issue 4 |
| AI doesn't understand | Enable more context providers | ONBOARDING.md → Issue 5 |
| Cody crashes | Check `~/.cody/logs/error.log` | ONBOARDING.md → Emergency |

### Emergency Restart

```bash
# 1. Clear cache
rm -rf ~/.cody/cache

# 2. Restart Cody
# (Quit and relaunch IDE)

# 3. Check logs
cat ~/.cody/logs/error.log
```

---

## 🔐 Security Checklist

✅ **DO**:
- Use environment variables for secrets
- Rotate API keys periodically
- Review code for vulnerabilities
- Keep dependencies updated
- Use HTTPS for external endpoints

❌ **DON'T**:
- Commit API keys to git
- Store passwords in config files
- Share credentials in chat/messages
- Use weak or shared API keys
- Ignore security warnings

---

## 💻 Development Quick Commands

```bash
# Clone repo
git clone https://github.com/syncfusion/cody-docs.git

# Create feature branch
git checkout -b feat/my-feature

# Make changes and commit
git add .
git commit -m "feat: describe change"

# Push to origin
git push origin feat/my-feature

# Create pull request
# (via GitHub interface)

# Validate YAML
yamllint config.yaml

# Check markdown
markdownlint *.md

# Preview changes locally
# (Depends on your setup)
```

---

## 📋 Component Interaction Map

### Chat Mode Flow
```
User selects code → Presses Cmd+L
    ↓
Load config & models
    ↓
Gather context (file + code + docs)
    ↓
Apply rules + build LLM message
    ↓
Call LLM (openai/mistral/etc)
    ↓
Display response in chat
```

### Edit Mode Flow
```
User selects code → Presses Cmd+I → Requests change
    ↓
Load config & "edit" role model
    ↓
Gather context
    ↓
Apply rules + generate diff
    ↓
Show inline changes
    ↓
User approves → Apply changes
```

### Agent Mode Flow
```
User enters task description
    ↓
UNDERSTAND → Parse request + project context
    ↓
EXPLORE → Search for relevant files
    ↓
PLAN → Design implementation steps
    ↓
EXECUTE → Modify files (with permission prompts)
    ↓
VERIFY → Test changes + fix errors
    ↓
COMPLETE → Summarize + return control
```

---

## 🎓 Key Concepts

### Configuration-Driven Architecture
**What**: Behavior controlled by YAML config, not code  
**Why**: Easy customization without rebuilding  
**How**: Change `config.yaml` → Restart Cody → Changes take effect

### Multi-Modal Design
**What**: Multiple interaction modes (Chat/Edit/Agent/Autocomplete)  
**Why**: Different tasks need different interfaces  
**How**: Select mode → Interact → Get results specific to mode

### Pluggable Context Providers
**What**: Modular data sources feeding context to LLMs  
**Why**: Can add custom data sources without changing core  
**How**: Add provider to config → Cody automatically uses it

### Rules Engine
**What**: Behavioral constraints applied to all LLM requests  
**Why**: Ensure consistent behavior across all features  
**How**: Define rules in config → Cody includes in LLM prompt

### MCP Server Integration
**What**: Connect external tools via Model Context Protocol  
**Why**: Extensible without modifying Cody core  
**How**: Configure MCP server → Cody bridges to external tool

---

## 📈 Performance Tips

| Scenario | Optimization |
|----------|---|
| Slow response | Reduce `codebase` context provider size |
| High API costs | Use GPT-3.5 instead of GPT-4 for some tasks |
| Stuck on task | Enable `problems` provider for better error context |
| Autocomplete slow | Reduce context aggregation time |
| Memory usage high | Disable caching with `cache.enabled: false` |

---

## 🔗 Important Links

| Resource | Link |
|----------|------|
| Repository | `https://github.com/syncfusion/cody-docs` |
| Issues | `https://github.com/syncfusion/cody/issues` |
| Documentation | See `syncfusion-cody/` folder |
| Architecture | See `ARCHITECTURE_QUICK_SUMMARY.md` |
| Roadmap | See `ACTIONABLE_RECOMMENDATIONS.md` |

---

## 🆘 Getting Help

**Quick Answer**: Check ONBOARDING.md → Troubleshooting section

**Specific Issue**: Search GitHub Issues

**Still Stuck**: Contact team lead or post in #cody-support Slack

**Include**: Error log + config.yaml (no secrets) + steps to reproduce

---

## ✅ Developer Onboarding Checklist

- [ ] Read ONBOARDING.md (main guide)
- [ ] Read ARCHITECTURE_QUICK_SUMMARY.md (10 min overview)
- [ ] Clone repository
- [ ] Set up environment variables
- [ ] Create first feature branch
- [ ] Make small documentation change
- [ ] Create pull request
- [ ] Understand code review process
- [ ] Ask questions about anything unclear!

---

## 🎯 Common Tasks Quick Reference

### Add a new model to config
```yaml
models:
  - name: "New Model"
    provider: "mistral"
    model: "mistral-large"
    apiKey: ${MISTRAL_API_KEY}
    roles: [chat, edit]  # Assign roles
```

### Enable new context provider
```yaml
context:
  - type: docs
    startUrl: "https://my-docs.com"
    maxDepth: 3
```

### Add custom rule
```yaml
rules:
  - text: "Follow React best practices"
    glob: "src/**/*.tsx"  # Apply only to React files
```

### Create custom prompt
```yaml
prompts:
  - name: "Security Check"
    description: "Check code for vulnerabilities"
    prompt: |
      Review this code for:
      - SQL injection vulnerabilities
      - XSS vulnerabilities
      - CSRF vulnerabilities
```

---

## 📚 Documentation Structure

```
ONBOARDING.md (You are here)
    ↓
├─ ONBOARDING_QUICK_REFERENCE.md (This file)
├─ ARCHITECTURE_QUICK_SUMMARY.md (10 min overview)
├─ ARCHITECTURE_REVIEW.md (30 min deep-dive)
├─ ACTIONABLE_RECOMMENDATIONS.md (Implementation guide)
│
└─ syncfusion-cody/
    ├─ Welcome-to-Cody.md (Product intro)
    ├─ features/
    │   ├─ Chat.md
    │   ├─ Edit.md
    │   ├─ Agent.md
    │   └─ Autocomplete.md
    ├─ get-started/
    │   ├─ Mac.md
    │   ├─ Windows.md
    └─ reference/
        └─ Configure-the-Cody.md
```

---

**Print this page and keep it handy!** 📌

Last Updated: 2024
