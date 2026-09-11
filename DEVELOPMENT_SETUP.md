# 🛠️ Development Setup & Contribution Guide

Complete guide for setting up your development environment and making your first contribution to Syncfusion Cody.

---

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Environment Setup](#environment-setup)
3. [Running Locally](#running-locally)
4. [Project Structure](#project-structure)
5. [Making Your First Contribution](#making-your-first-contribution)
6. [Code Review Process](#code-review-process)
7. [Troubleshooting](#troubleshooting)
8. [Best Practices](#best-practices)

---

## ✅ Prerequisites

### Required Software

- **Git** (version 2.30+)
  ```bash
  git --version
  ```

- **Node.js & npm** (version 18+) — for build/test infrastructure
  ```bash
  node --version
  npm --version
  ```

- **Python** (version 3.9+) — if working on backend/analysis
  ```bash
  python --version
  ```

- **Text Editor** — VS Code recommended
  ```bash
  code --version
  ```

- **IDE Extension Host** — For testing Cody
  - VS Code (recommended)
  - JetBrains IDE (IntelliJ, WebStorm, etc.)
  - Neovim

### Recommended Tools

- **yamllint** — YAML validation
  ```bash
  pip install yamllint
  ```

- **markdown-lint** — Markdown validation
  ```bash
  npm install -g markdownlint-cli
  ```

- **git-lfs** — Large file storage (if needed)
  ```bash
  git lfs install
  ```

### Account Setup

- GitHub account with access to Syncfusion organization
- API keys for LLM providers (get from team lead):
  - OpenAI API key
  - Mistral API key (optional)
  - Anthropic API key (optional)

---

## 🔧 Environment Setup

### Step 1: Clone the Repository

```bash
# Clone the repository
git clone https://github.com/syncfusion/cody-docs.git
cd cody-docs

# Verify clone
ls -la
```

### Step 2: Create Configuration Files

```bash
# Copy example environment file
cp .env.example .env

# Edit with your credentials
nano .env
# OR
code .env
```

**`.env` file template**:
```bash
# LLM Provider Keys
OPENAI_API_KEY=sk-...
MISTRAL_API_KEY=...
ANTHROPIC_API_KEY=...

# Database (if applicable)
DATABASE_URL=...

# Development Settings
NODE_ENV=development
DEBUG=cody:*
```

### Step 3: Install Dependencies

```bash
# Install npm dependencies (if any)
npm install

# Install Python dependencies (if backend work)
pip install -r requirements.txt

# Verify installations
npm list
pip freeze
```

### Step 4: Set Up Git Configuration

```bash
# Configure git user (if not already done)
git config --global user.name "Your Name"
git config --global user.email "your.email@syncfusion.com"

# Verify configuration
git config --list | grep user

# Set up git hooks (if applicable)
npm run setup:hooks
```

### Step 5: Create Local Development Config

```bash
# Create local Cody config for testing
mkdir -p ~/.cody
cp config.example.yaml ~/.cody/config.yaml

# Edit with your API keys
nano ~/.cody/config.yaml
```

**Development config example**:
```yaml
name: "Local Development"
version: "1.0.0"
schema: "v1"

models:
  - name: "GPT-3.5"
    provider: openai
    model: gpt-3.5-turbo
    apiKey: ${OPENAI_API_KEY}
    roles: [chat, edit, autocomplete]
  
  - name: "Ollama Local"
    provider: ollama
    baseUrl: "http://localhost:11434"
    model: mistral
    roles: [chat]
    priority: 2

context:
  - type: file
    enabled: true
  - type: code
    enabled: true
  - type: codebase
    enabled: true

rules:
  - text: |
      You are assisting with Syncfusion Cody development.
      Focus on code quality, security, and documentation.
```

### Step 6: Verify Setup

```bash
# Check git status
git status

# Verify environment variables
echo $OPENAI_API_KEY

# Test configuration
yamllint ~/.cody/config.yaml

# Run any available tests
npm test
```

---

## 🚀 Running Locally

### Option 1: VS Code Extension Development

```bash
# If developing the Cody extension itself

# 1. Install extension dependencies
cd extension/
npm install

# 2. Open in VS Code
code .

# 3. Press F5 to launch extension host
# This opens a new VS Code window with Cody extension

# 4. Test Cody in extension window
# - Try Chat mode: Cmd+L
# - Try Edit mode: Cmd+I
# - Try Agent mode from dropdown
```

### Option 2: Documentation Development

```bash
# If working on documentation

# 1. Use local markdown preview (VS Code)
# - Open markdown file
# - Press Cmd+Shift+V for preview

# 2. Or use a markdown server
npm install -g http-server
cd syncfusion-cody
http-server

# 3. Open browser to http://localhost:8080
```

### Option 3: Local LLM Testing (Ollama)

```bash
# For free local LLM testing without API costs

# 1. Install Ollama
# Download from https://ollama.ai

# 2. Start Ollama server
ollama serve

# 3. In another terminal, download model
ollama pull mistral

# 4. Test connectivity
curl http://localhost:11434/api/models

# 5. Update config to use Ollama
# In config.yaml, set Ollama model priority to 1
```

### Option 4: Full End-to-End Testing

```bash
# If testing entire system

# 1. Start all services
npm run dev

# 2. This should:
#    - Start documentation server
#    - Start dev server for extension
#    - Open test IDE window

# 3. Run tests
npm test

# 4. Check logs
tail -f logs/cody.log
```

---

## 📁 Project Structure

### Directory Layout

```
cody-docs/
├── syncfusion-cody/                # Main documentation
│   ├── features/                   # Feature documentation
│   │   ├── Agent.md               # Agent mode docs
│   │   ├── Chat.md                # Chat mode docs
│   │   ├── Edit.md                # Edit mode docs
│   │   └── Autocomplete.md         # Autocomplete docs
│   ├── reference/                  # Configuration & API reference
│   │   └── Configure-the-Cody.md  # Configuration guide
│   ├── get-started/                # Installation guides
│   │   ├── Mac.md
│   │   └── Windows.md
│   └── release-notes/              # Version history
│
├── ONBOARDING.md                   # New engineer guide (you are here!)
├── QUICK_REFERENCE.md              # One-page cheat sheet
├── API_REFERENCE.md                # API & interface docs
├── DEVELOPMENT_SETUP.md            # Development setup guide
├── ARCHITECTURE_*.md               # Architecture analysis
├── ACTIONABLE_RECOMMENDATIONS.md   # Roadmap
│
├── .env.example                    # Environment variables template
├── config.example.yaml             # Example Cody configuration
├── README.md                       # Repository overview
├── .gitignore                      # Git ignore rules
└── .editorconfig                   # Editor configuration
```

### Key Files by Role

**Documentation Editor**:
- `syncfusion-cody/features/*.md`
- `syncfusion-cody/reference/Configure-the-Cody.md`
- `ONBOARDING.md`

**Backend/Features Developer**:
- `ARCHITECTURE_*.md`
- `API_REFERENCE.md`
- Configuration files

**DevOps/Infrastructure**:
- `DEVELOPMENT_SETUP.md`
- `.env.example`
- Deployment scripts (if any)

**QA/Testing**:
- Test files
- Troubleshooting guides
- Release notes

---

## 🆕 Making Your First Contribution

### Step 1: Choose an Issue

```bash
# View open issues
open https://github.com/syncfusion/cody/issues

# Filter by:
# - Label: "good first issue"
# - Label: "documentation"
# - Assignee: "none"

# Ask in Slack if unsure which to work on
```

### Step 2: Create Feature Branch

```bash
# Update main branch
git checkout main
git pull origin main

# Create feature branch from main
git checkout -b feat/your-feature-name

# OR for bug fixes
git checkout -b fix/issue-description

# Branch naming conventions:
# - feat/feature-name
# - fix/issue-name
# - docs/documentation-update
# - refactor/component-name
# - test/test-description
```

### Step 3: Make Your Changes

**For documentation**:
```bash
# Edit markdown files
nano syncfusion-cody/features/Chat.md

# Validate syntax
markdownlint syncfusion-cody/**/*.md

# Check links
markdown-link-check syncfusion-cody/**/*.md
```

**For configuration/code**:
```bash
# Edit relevant files
nano config.example.yaml

# Validate YAML
yamllint config.example.yaml

# Run tests (if any)
npm test
```

### Step 4: Commit Changes

```bash
# Check what changed
git status
git diff

# Stage changes
git add .

# Commit with meaningful message
git commit -m "feat: Add dark mode toggle documentation"

# Follow conventional commits:
# feat: New feature
# fix: Bug fix
# docs: Documentation update
# refactor: Code reorganization
# test: Test updates
# chore: Maintenance
# perf: Performance improvement

# View your commit
git log -1 --stat
```

### Step 5: Push to GitHub

```bash
# Push branch to GitHub
git push origin feat/your-feature-name

# GitHub will suggest creating a PR

# OR create PR manually
open https://github.com/syncfusion/cody/compare/main...feat/your-feature-name
```

### Step 6: Create Pull Request

**PR Checklist**:
- [ ] Title is clear and follows "type: description" format
- [ ] Description explains what and why
- [ ] References any related issues (#123)
- [ ] Changes are focused (not too many changes)
- [ ] No breaking changes (or documented)
- [ ] All tests pass
- [ ] Documentation updated (if applicable)
- [ ] Follows code style guidelines

**PR Template**:
```markdown
## What
Brief description of changes

## Why
Why is this change needed?

## Related Issues
Fixes #123

## Testing
How was this tested?

## Checklist
- [ ] Tests pass
- [ ] Documentation updated
- [ ] No breaking changes
- [ ] Code review requirements met
```

### Step 7: Respond to Feedback

```bash
# Reviewers will request changes

# Make requested changes locally
# Don't create new commits, amend existing:
git add .
git commit --amend --no-edit
git push --force-with-lease origin feat/your-feature-name

# Respond to reviewer comments
# Click "Reply" on GitHub
# Once done: "All comments resolved" + "Re-request review"
```

### Step 8: Merge PR

```bash
# After approval, maintainer will merge
# Your branch will be deleted

# Update local repository
git checkout main
git pull origin main

# Delete local branch
git branch -d feat/your-feature-name
```

---

## 📋 Code Review Process

### What Reviewers Check

✅ **Code Quality**:
- Follows project style guide
- No obvious bugs or issues
- Handles errors appropriately
- Efficient implementation

✅ **Security**:
- No credentials in code
- No SQL injection vulnerabilities
- No XSS issues
- Proper input validation

✅ **Documentation**:
- Changes are documented
- Comments explain complex logic
- README/guides updated
- No outdated docs

✅ **Testing**:
- All tests pass
- New code has tests
- Edge cases covered

### Review Request Template

Use this when asking for review:

```markdown
👋 Ready for review!

Changes:
- Updated Agent mode documentation
- Added examples for multi-step tasks
- Fixed typos in configuration guide

Testing:
- [ ] Verified markdown syntax
- [ ] Checked all links work
- [ ] Tested configuration examples

Concerns:
None

Related Issues:
Fixes #123
```

### Common Review Feedback

**"Can you add a test?"**
```bash
# Add test file
npm test:watch
# Write and commit test
git add test/
git commit -m "test: Add test for new feature"
```

**"This needs documentation"**
```bash
# Add/update relevant .md file
nano syncfusion-cody/features/Agent.md
git add syncfusion-cody/
git commit -m "docs: Add documentation for feature"
```

**"This breaks compatibility"**
```bash
# Update version number and changelog
nano package.json  # Bump version
nano CHANGELOG.md  # Add entry
git add package.json CHANGELOG.md
git commit -m "chore: Bump version to account for breaking change"
```

---

## 🆘 Troubleshooting

### Issue: Git Clone Fails

**Error**: `fatal: repository not found`

**Solution**:
```bash
# Check GitHub access
ssh -T git@github.com

# If no access, set up SSH keys
ssh-keygen -t ed25519
# Add public key to GitHub settings

# Or use HTTPS with token
git clone https://<token>@github.com/syncfusion/cody.git
```

### Issue: Environment Variables Not Working

**Error**: `Error: Environment variable not found: OPENAI_API_KEY`

**Solution**:
```bash
# Check if variable is set
echo $OPENAI_API_KEY

# If empty, set it
export OPENAI_API_KEY=sk-...

# For persistence, add to shell config
echo 'export OPENAI_API_KEY=sk-...' >> ~/.bashrc
source ~/.bashrc
```

### Issue: Tests Failing Locally

**Error**: `Test suite failed with X failures`

**Solution**:
```bash
# Run specific test for debugging
npm test -- --verbose

# Check test output
npm test -- --no-coverage

# Clear cache and retry
npm test -- --clearCache
npm test
```

### Issue: Merge Conflicts

**Error**: `CONFLICT (content merge)...`

**Solution**:
```bash
# Update branch with latest main
git fetch origin
git rebase origin/main

# Fix conflicts in editor
# Look for <<<<<<, ======, >>>>>>
# Edit to desired state
nano conflicted-file.md

# After fixing
git add conflicted-file.md
git rebase --continue

# Push changes
git push --force-with-lease
```

### Issue: Accidentally Committed Secrets

**Error**: `API key committed to git`

**Solution**:
```bash
# DO NOT just delete the file and commit
# The secret is still in git history

# Remove from git history
git filter-branch --tree-filter 'rm -f config.yaml' HEAD

# Force push (carefully!)
git push origin --force

# Rotate the exposed credentials immediately!
```

### Issue: Branch is Behind Main

**Error**: `Your branch is behind...`

**Solution**:
```bash
# Fetch latest
git fetch origin

# Rebase your branch on main
git rebase origin/main

# If conflicts, fix them
# Then continue rebase
git rebase --continue

# Force push your branch
git push --force-with-lease
```

---

## 📚 Best Practices

### Git Workflow

✅ **DO**:
- Create feature branch for each change
- Make focused commits (one feature per commit)
- Write clear commit messages
- Push frequently to avoid losing work
- Rebase before PR to keep history clean
- Use `--force-with-lease` instead of `--force`

❌ **DON'T**:
- Commit directly to main/development
- Make giant commits with multiple features
- Write vague commit messages ("fixed stuff")
- Leave stale branches lying around
- Force push to shared branches
- Commit sensitive data

### Code/Documentation Style

✅ **DO**:
- Follow existing style in the codebase
- Use descriptive variable/function names
- Add comments for complex logic
- Keep lines under 100 characters
- Use proper indentation (2 spaces)
- Validate YAML/Markdown files

❌ **DON'T**:
- Ignore linter warnings
- Use single letters for variables
- Leave commented-out code
- Mix tabs and spaces
- Write cryptic variable names

### Commit Messages

✅ **Good**:
```
feat: Add Agent mode documentation with workflow diagrams

Add comprehensive documentation explaining Agent mode's 6-step
workflow with examples of multi-step tasks. Includes diagrams
showing task decomposition and permission flow.

Fixes #123
```

❌ **Bad**:
```
fixed stuff
updated docs
changes
```

### Documentation Quality

✅ **Good**:
- Clear headings with hierarchy
- Code examples that run
- Links to related docs
- Screenshots/diagrams where helpful
- Practical, not theoretical
- Updated when features change

❌ **Bad**:
- Wall of text without structure
- Outdated examples
- Broken links
- Only theory, no examples
- Doesn't match current code

---

## 🎯 Quick Checklist for Each Contribution

Before submitting PR:

- [ ] Branch created from latest main
- [ ] Changes are focused and related
- [ ] Commit messages follow conventions
- [ ] Code/docs follow style guide
- [ ] YAML/Markdown validated
- [ ] Tests pass (if applicable)
- [ ] No secrets or credentials
- [ ] Documentation updated
- [ ] Links verified
- [ ] No unnecessary files committed
- [ ] PR description is clear
- [ ] Related issues referenced

---

## 📞 Getting Help

**Question about setup?**
- Ask in `#dev-setup` Slack channel
- Check this guide again
- Email the team lead

**Question about feature?**
- Ask in `#cody-dev` Slack channel
- Check ARCHITECTURE_REVIEW.md
- Check relevant feature documentation

**Permission/Access issue?**
- Contact your tech lead
- Email: dev-access@syncfusion.com

**Git/GitHub issue?**
- Check troubleshooting section
- Ask on `#git-help` channel
- Google the error message

---

## 🎓 Next Steps After First Contribution

1. **Read the Architecture**: Dive into `ARCHITECTURE_REVIEW.md`
2. **Understand Your Module**: Pick a component, study it deeply
3. **Contribute More**: Start with "good first issue" labels
4. **Mentor Others**: Help new team members with their first PRs
5. **Lead Architecture**: Propose improvements to architecture

---

## 📚 Useful Resources

- **Git Documentation**: https://git-scm.com/doc
- **GitHub Docs**: https://docs.github.com
- **Markdown Guide**: https://www.markdownguide.org
- **YAML Spec**: https://yaml.org/spec
- **Syncfusion Docs**: https://docs.syncfusion.com

---

**Welcome to the development team! 🎉 Your first contribution is just a few steps away.**

Need help? Reach out to your tech lead or post in the dev Slack channel.

Last Updated: 2024
