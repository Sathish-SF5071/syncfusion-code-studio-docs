# 🎯 Syncfusion Cody - Quick Reference Guide

A one-page cheat sheet for developers. Print this or bookmark it!

---

## 🚀 Quick Start (5 minutes)

### 1. First Time Setup
```bash
# Clone repo
git clone https://github.com/syncfusion/cody-docs.git

# Set up environment
cp .env.example .env
# Edit .env with your API keys
export OPENAI_API_KEY=sk-...
export MISTRAL_API_KEY=...

# Open config
# Settings → Open Config File
```

### 2. Configure Cody (config.yaml)
```yaml
name: "My Cody"
version: "1.0.0"
schema: "v1"

models:
  - name: "GPT-4"
    provider: openai
    model: gpt-4o
    apiKey: ${OPENAI_API_KEY}  # Use env vars!
    roles: [chat, edit, autocomplete]

context:
  - type: file
  - type: code
  - type: codebase

rules:
  - text: "Use Syncfusion components when applicable"
```

### 3. Use Cody
| Action | Shortcut | What It Does |
|--------|----------|--------------|
| Chat | `Cmd+L` (Mac) / `Ctrl+L` (Win) | Send selected code to chat |
| Edit | `Cmd+I` / `Ctrl+I` | Request targeted edits |
| Agent | Mode dropdown | Auto-execute multi-step tasks |
| Autocomplete | Start typing | Real-time suggestions |

---

## 📁 Folder Structure at a Glance

```
syncfusion-cody/
├── features/                    ← Feature documentation
│   ├── Agent.md                 ← Read this for Agent mode
│   ├── Chat.md
│   ├── Edit.md
│   └── Autocomplete.md
├── reference/                   ← Configuration reference
│   └── Configure-the-Cody.md    ← Configuration properties
├── get-started/                 ← Installation guides
│   ├── Mac.md
│   └── Windows.md
└── release-notes/               ← Version history
```

---

## 🔧 Key Configuration Properties

| Property | Purpose | Example |
|----------|---------|---------|
| `name` | Config name | `"My Cody"` |
| `version` | Version number | `"1.0.0"` |
| `schema` | Schema version | `"v1"` |
| `models` | Available LLMs | See Models section |
| `context` | Data sources | `[file, code, codebase]` |
| `rules` | Behavioral rules | `"Use Syncfusion components"` |
| `prompts` | Custom tasks | `[{name: "check"}]` |
| `docs` | Knowledge base | `[{startUrl: "..."}]` |
| `mcpServers` | External tools | `[{name: "database"}]` |

**Key Rule**: Always use `${ENV_VAR}` for secrets, never hardcode!

---

## 🤖 Model Configuration Quick Reference

### Provider Options
```yaml
provider: openai          # GPT-4, GPT-3.5, etc.
provider: mistral         # Mistral Large, Medium, etc.
provider: ollama          # Local models
provider: anthropic       # Claude models
provider: custom-openai   # OpenAI-compatible endpoints
```

### Model Roles
```yaml
roles:
  - chat                  # Chat mode
  - edit                  # Edit mode
  - autocomplete          # Autocomplete mode
  - apply                 # Apply changes
  - embed                 # Embeddings
  - rerank                # Result ranking
```

### Model Capabilities
```yaml
capabilities:
  - tool_use              # Agent mode (can use tools)
  - image_input           # Can analyze images
```

### Quick Setup Examples

**Local (Ollama)**:
```yaml
models:
  - name: "Ollama"
    provider: ollama
    baseUrl: "http://localhost:11434"
    model: mistral
    roles: [chat, edit, autocomplete]
```

**Production (GPT-4 + Fallback)**:
```yaml
models:
  - name: "GPT-4"
    provider: openai
    model: gpt-4o
    apiKey: ${OPENAI_API_KEY}
    roles: [chat]
    priority: 1
  - name: "GPT-3.5"
    provider: openai
    model: gpt-3.5-turbo
    apiKey: ${OPENAI_API_KEY}
    roles: [chat]
    priority: 2  # Fallback
```

---

## 📊 Context Providers Quick Reference

| Type | Source | When to Use | Example |
|------|--------|-------------|---------|
| `file` | Current file | Always | Default context |
| `code` | Selected code | Specific questions | Code review, fixes |
| `codebase` | Project files | Understanding structure | Large projects |
| `docs` | Indexed docs | Knowledge access | Learning patterns |
| `diff` | Git changes | Current work | Review changes |
| `http` | Web URLs | API reference | Learning APIs |
| `folder` | Directory | Project scope | Context awareness |
| `terminal` | CLI output | Debugging | Error context |
| `problems` | IDE errors | Diagnostics | Error fixing |
| `helpbot` | Help docs | Troubleshooting | Internal docs |

**Enable context**:
```yaml
context:
  - type: file          # ✅ Always enabled
    enabled: true
  - type: docs          # ✅ Add docs for knowledge
    enabled: true
  - type: terminal      # ⚠️ May be slow
    enabled: false
```

---

## 🎯 Agent Mode Workflow

The 6-step autonomous task execution process:

```
1️⃣ UNDERSTAND    → Parse request & load context
2️⃣ EXPLORE       → Search for relevant files
3️⃣ PLAN          → Break down into steps
4️⃣ EXECUTE       → Make changes (with permission)
5️⃣ VERIFY        → Run tests & fix errors
6️⃣ COMPLETE      → Summarize changes
```

**Tips**:
- Agent will ask permission before using tools
- Tasks work best when well-defined
- Complex tasks may take longer
- Check results before accepting

**Example Agent Task**:
```
Request: "Add dark mode toggle to settings"
         ↓
Agent explores codebase, finds settings component
         ↓
Plans: 1) Add state, 2) Update component, 3) Test
         ↓
Executes with your permission
         ↓
Verifies and reports: "Added 3 files, 120 LOC"
```

---

## 🛠️ Common Commands & Workflows

### Set API Keys
```bash
# macOS/Linux
export OPENAI_API_KEY=sk-...
export MISTRAL_API_KEY=...

# Windows (PowerShell)
$env:OPENAI_API_KEY="sk-..."

# Windows (CMD)
set OPENAI_API_KEY=sk-...
```

### Validate Configuration
```bash
# Check YAML syntax
yamllint config.yaml

# Test with LLM
# Just use Cody and see if it works!
```

### View Logs
```bash
# macOS/Linux
tail -f ~/.cody/logs/cody.log

# Windows
type %APPDATA%\Cody\logs\cody.log
```

### Clear Cache
```bash
# When context seems outdated
rm -rf ~/.cody/cache

# Windows
rmdir %APPDATA%\Cody\cache /s
```

---

## 🚨 Common Issues & Quick Fixes

| Issue | Fix | Prevention |
|-------|-----|-----------|
| Config not loading | Check YAML syntax with `yamllint` | Validate on save |
| API auth fails | Verify env var: `echo $OPENAI_API_KEY` | Use credential manager |
| Slow responses | Reduce context size, switch models | Monitor latency |
| Agent stops mid-task | Check logs, verify tool permissions | Test tools separately |
| Wrong context | Enable relevant providers | Update documentation |

**Emergency reset**:
```bash
# Restart Cody (quit and reopen)
# Clear cache: rm -rf ~/.cody/cache
# Revert config: git checkout -- config.yaml
```

---

## 🔐 Security Checklist

✅ **DO**:
- [ ] Use environment variables for secrets
- [ ] Rotate API keys regularly
- [ ] Review Agent permissions before granting
- [ ] Keep dependencies updated
- [ ] Audit configuration changes

❌ **DON'T**:
- [ ] Hardcode API keys in config
- [ ] Commit .env files to git
- [ ] Share API keys via chat/email
- [ ] Run untrusted prompts
- [ ] Store passwords in config

---

## 📚 Key Files to Know

| File | Purpose | Read First? |
|------|---------|------------|
| `ONBOARDING.md` | Complete guide | ✅ YES |
| `ARCHITECTURE_QUICK_SUMMARY.md` | System design | ✅ YES |
| `syncfusion-cody/Welcome-to-Cody.md` | Features | ✅ YES |
| `syncfusion-cody/reference/Configure-the-Cody.md` | Config reference | ✅ YES |
| `ARCHITECTURE_REVIEW.md` | Deep technical | 📖 Later |
| `ACTIONABLE_RECOMMENDATIONS.md` | Implementation | 📖 When implementing |

---

## 🎓 Learning Paths

### Path 1: I just want to use Cody (30 min)
1. Read this quick reference
2. Read `syncfusion-cody/Welcome-to-Cody.md`
3. Check `syncfusion-cody/reference/Configure-the-Cody.md`
4. Start using Cody!

### Path 2: I want to configure Cody (1 hour)
1. Read this quick reference
2. Read `ONBOARDING.md` → Configuration System section
3. Check configuration examples
4. Edit your `config.yaml`
5. Test each feature

### Path 3: I want to understand the architecture (2 hours)
1. Read `ARCHITECTURE_QUICK_SUMMARY.md`
2. Read `ONBOARDING.md` → Architecture Overview section
3. Check component diagrams
4. Read relevant feature docs (`Agent.md`, etc.)

### Path 4: I want to contribute code (3 hours)
1. Read entire `ONBOARDING.md`
2. Read `ARCHITECTURE_REVIEW.md`
3. Check development workflow section
4. Find an issue to work on
5. Make your first contribution!

---

## 💬 Quick Communication Guide

**Need help?** Here's who to ask:

| Question | Ask | Where |
|----------|-----|-------|
| How do I use feature X? | Team mate | Slack |
| Why does config work this way? | Tech lead | Architecture meeting |
| Can I change API endpoint? | Security lead | Email + review |
| How do I deploy? | DevOps engineer | Deployment guide |
| Performance issue? | Tech lead | Debug session |

---

## 📞 Emergency Numbers

🚨 **Cody won't start**: Clear cache → Restart → Check logs

🚨 **API keeps failing**: Check API key → Verify quota → Try fallback model

🚨 **Config broken**: Validate YAML → Revert to last known good → Contact lead

🚨 **Agent stuck**: Click "Cancel" → Check logs → Restart

---

## ⏱️ Common Tasks & Timing

| Task | Time | Complexity |
|------|------|-----------|
| Set up Cody | 10 min | Easy |
| Configure for local dev | 15 min | Easy |
| Switch LLM provider | 5 min | Easy |
| Debug slow response | 20 min | Medium |
| Add custom prompt | 10 min | Easy |
| Configure MCP server | 30 min | Hard |
| Deploy config change | 30 min | Hard |
| Full architecture review | 2 hours | Hard |

---

## 🔗 Important Links

- **GitHub**: https://github.com/syncfusion/cody
- **Docs**: https://docs.syncfusion.com/cody
- **Support**: support@syncfusion.com
- **Issues**: https://github.com/syncfusion/cody/issues
- **Slack**: #cody-support

---

## ✨ Pro Tips

💡 **Speed Up Context**: Only enable providers you need
```yaml
context:
  - type: file
  - type: code
  # - type: codebase  # Skip if slow
  # - type: docs      # Skip if not needed
```

💡 **Use Rules for Guidance**: Add custom rules for your team
```yaml
rules:
  - text: "We use React 18 + TypeScript + Tailwind CSS"
  - text: "Always add error handling for async operations"
```

💡 **Test Models Locally First**: Use Ollama for free testing
```yaml
models:
  - name: Ollama
    provider: ollama
    baseUrl: http://localhost:11434
    model: mistral
```

💡 **Keep Config in Git**: Version control your config
```bash
git add config.yaml
git commit -m "feat: Add documentation context provider"
```

💡 **Validate Before Committing**: Run yamllint
```bash
yamllint config.yaml && echo "✅ Valid!"
```

---

## 📋 Onboarding Checklist (First Day)

- [ ] Read this quick reference
- [ ] Read ONBOARDING.md
- [ ] Read ARCHITECTURE_QUICK_SUMMARY.md
- [ ] Set up development environment
- [ ] Test Cody with default config
- [ ] Edit config.yaml and test changes
- [ ] Ask questions about anything unclear
- [ ] Make a test commit to show you can use git
- [ ] Attend team standup
- [ ] Pick first issue to work on

---

**Print this page and keep it handy! Questions? Ask your tech lead.** 🚀

Last Updated: 2024
