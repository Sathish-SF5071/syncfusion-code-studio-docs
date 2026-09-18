---
title: "Todo List Handling - Quick Reference Guide"
description: "Visual quick reference for understanding Code Studio IDE's todo list handling mechanisms"
platform: syncfusion-code-studio
---

# Code Studio IDE - Todo List Handling: Quick Reference

## Decision Tree: When to Use Todo Lists

```
┌─────────────────────────┐
│  User Provides Prompt   │
└────────────┬────────────┘
             │
             ▼
    ┌────────────────────┐
    │ Analyze Complexity │
    └────────┬───────────┘
             │
    ┌────────┴────────┐
    │                 │
    ▼                 ▼
 SIMPLE?          COMPLEX?
  (≤2 steps)       (≥3 steps)
    │                 │
    └──────┬──────────┘
           │
      ┌────┴─────┐
      │           │
   YES│           │NO
      │           │
      ▼           ▼
  ┌─────────┐  ┌──────────────────┐
  │ Direct  │  │ Create Todo List │
  │Execute  │  │ ├─ Decompose     │
  └─────────┘  │ ├─ Sequence      │
               │ └─ Track State   │
               └──────────────────┘
```

---

## Task Lifecycle States

```
                    ┌─────────┐
                    │ pending │
                    └────┬────┘
                         │
                    ┌────▼─────────┐
                    │  Dependency  │
                    │   Check OK?  │
                    └────┬─────────┘
                    YES  │  NO
                    ┌────┴────┐
                    │          │
                    ▼          ▼
              ┌──────────┐  ┌──────────┐
              │in_progress  blocked   │
              └─────┬──────────────────┘
                    │
        ┌───────────┴────────────┐
        │                        │
        ▼                        ▼
    ┌─────────┐          ┌──────────────┐
    │completed│          │Handle Blocker│
    └─────────┘          └─────┬────────┘
                               │
                          ┌────▼─────┐
                          │ Resolved?│
                          └────┬─────┘
                               │
                         ┌─────┴──────┐
                         │            │
                      YES│            │NO
                         │            │
                         ▼            ▼
                    ┌──────────┐  ┌──────────┐
                    │in_progress  blocked   │
                    └──────────────────────┘
```

---

## Architecture Layers

| Layer | Responsibility | Tools Used |
|-------|-----------------|-----------|
| **Prompt Analysis** | Parse requirements, assess complexity, determine todo necessity | Language understanding, pattern matching |
| **Task Decomposition** | Break down into actionable steps, identify dependencies | Dependency graph algorithms |
| **Execution Engine** | Execute each task sequentially or in parallel | Built-in tools (file, terminal, etc.) |
| **State Management** | Track progress, manage context, handle errors | In-session memory, checkpoint system |
| **Dependency Resolution** | Verify prerequisites, unblock dependent tasks | Topological sorting, condition checking |
| **Verification** | Confirm completion, run tests, validate results | Testing frameworks, linting tools |

---

## Key Metrics for Todo List Decisions

### ✅ Use Todo List If:

| Metric | Threshold | Examples |
|--------|-----------|----------|
| **Number of Steps** | ≥ 3 distinct phases | Feature implementation |
| **Files Affected** | > 3 files | Full-stack changes |
| **Modules Touched** | > 2 modules | Cross-layer updates |
| **Dependencies** | ≥ 2 inter-task deps | Sequenced operations |
| **Execution Time** | > 2 minutes | Complex operations |
| **Risk Level** | Medium/High | Breaking changes, migrations |

### ❌ Skip Todo List If:

| Metric | Threshold | Examples |
|--------|-----------|----------|
| **Number of Steps** | ≤ 2 steps | Single file edits |
| **Files Affected** | ≤ 1 file | Localized changes |
| **Modules Touched** | ≤ 1 module | Component-only updates |
| **Dependencies** | 0 inter-task deps | Independent operations |
| **Execution Time** | < 30 seconds | Trivial tasks |
| **Risk Level** | None/Low | Non-breaking, reversible |

---

## Task Decomposition Algorithm

```
INPUT: Complex User Prompt
OUTPUT: Ordered List of Tasks

1. PARSE REQUIREMENTS
   Extract key objectives from prompt
   Identify technologies/frameworks involved
   Note explicit constraints or preferences

2. BUILD DEPENDENCY GRAPH
   For each requirement:
     - Identify prerequisite tasks
     - Find blocking dependencies
     - Mark optional vs. critical tasks

3. SEQUENCE TASKS
   Apply topological sort to dependency graph
   Group parallelizable tasks
   Assign execution order

4. ENHANCE WITH METADATA
   Set priority levels (HIGH, MEDIUM, LOW)
   Define completion criteria
   Estimate execution time
   Note risk factors

5. CREATE VERIFICATION STEPS
   Add test/validation tasks
   Include integration checks
   Set build/deployment steps

6. GENERATE TODO LIST
   Output ordered, prioritized task list
   Include context and dependencies
   Prepare for execution
```

---

## State Transitions During Execution

```
Task Workflow:

INIT
  │
  ▼
[pending] ──Check Dependencies──┐
                                │
                        All Deps?
                         ├─ YES──▶ [in_progress]
                         │              │
                         │              ├─ Execute
                         │              │
                         │         Success?
                         │         ├─ YES ──▶ [completed]
                         │         │           │
                         │         │      Verify Results
                         │         │           │
                         │         │      ┌────┴────┐
                         │         │      │          │
                         │         │    PASS│        │FAIL
                         │         │      │          │
                         │         │      ▼          ▼
                         │         │  [completed]  [in_progress]
                         │         │                 │
                         │         │         Retry/Fix
                         │         │
                         │         └─ NO ──▶ [in_progress]
                         │                     (retry)
                         │
                         └─ NO ──▶ [blocked]
                                     │
                            Dependency Fixed?
                                     │
                                    YES
                                     │
                              ▼ (go to in_progress)
```

---

## Integration Points Summary

### 1. **Agent Rules (AGENTS.md)**
```yaml
Influences:
  - Task decomposition strategy
  - Priority assignment logic
  - Verification requirements
  - Execution constraints
```

### 2. **Built-in Tools**
```yaml
Available for Tasks:
  - builtin_read_file: Analyze code
  - builtin_create_new_file: Generate files
  - builtin_replace_in_file: Edit code
  - builtin_run_terminal_command: Execute commands
  - builtin_grep_search: Find patterns
  - builtin_view_diff: Show changes
```

### 3. **Permission System**
```yaml
Per-Tool Policies:
  - Automatic: Execute without asking
  - Ask First: Request user confirmation
  - Excluded: AI cannot use tool
```

### 4. **Error Handling**
```yaml
On Error:
  - Log error details
  - Classify error type
  - Create recovery task if needed
  - Notify user
  - Block dependent tasks
  - Suggest fixes
```

---

## Performance Characteristics

### Task Execution Timeline

```
Sequential Execution (5 tasks, 2s each):
├─ Task 1: |--| (0-2s)
├─ Task 2:     |--| (2-4s)
├─ Task 3:         |--| (4-6s)
├─ Task 4:             |--| (6-8s)
└─ Task 5:                 |--| (8-10s)
   TOTAL: 10 seconds

Parallel Execution (5 tasks, 2s each, 3 parallel):
├─ Tasks 1,2,3:  |--| (0-2s)
├─ Tasks 4,5:        |--| (2-4s)
└─ Verify:           |--| (4-6s)
   TOTAL: 6 seconds
   SAVINGS: 40% time reduction
```

---

## Best Practices Checklist

### ✅ DO:
- [ ] Create clear, specific task descriptions
- [ ] Explicitly list task dependencies
- [ ] Include verification as final task
- [ ] Update status immediately after each step
- [ ] Group parallelizable tasks together
- [ ] Set appropriate priority levels
- [ ] Define completion criteria clearly
- [ ] Monitor and adapt as needed

### ❌ DON'T:
- [ ] Mix unrelated concerns in one task
- [ ] Assume implicit task ordering
- [ ] Skip verification steps
- [ ] Mark tasks complete prematurely
- [ ] Ignore dependency warnings
- [ ] Create excessive task granularity
- [ ] Forget to update state
- [ ] Assume external resources are available

---

## Troubleshooting Guide

| Problem | Cause | Solution |
|---------|-------|----------|
| Tasks stuck in pending | Circular dependency | Review dependency graph, break cycle |
| Task in_progress too long | Insufficient permissions | Check tool policies, grant access |
| Unexpected task failure | Missing prerequisite | Verify dependency execution |
| Unfinished tasks | Scope too large | Break task into smaller subtasks |
| Blocked on external input | Missing configuration | Provide required context/config |
| Tests failing after completion | Incomplete verification | Add more thorough test coverage |

---

## Common Patterns

### Pattern 1: Feature Development
```
Tasks:
  1. Plan architecture
  2. Create backend API
  3. Build frontend UI
  4. Integrate frontend/backend
  5. Add tests
  6. Verify build
```

### Pattern 2: Bug Fix with Refactoring
```
Tasks:
  1. Identify root cause
  2. Create test case that reproduces
  3. Fix bug
  4. Refactor affected code
  5. Run all tests
  6. Performance verification
```

### Pattern 3: Dependency Update
```
Tasks:
  1. Update package.json
  2. Check for breaking changes
  3. Update affected code
  4. Run tests
  5. Update documentation
  6. Build and deploy verification
```

### Pattern 4: Full-Stack Migration
```
Tasks:
  1. Database schema migration
  2. Backend model updates
  3. API endpoint updates
  4. Frontend data fetching updates
  5. Component updates
  6. End-to-end testing
  7. Deployment verification
```

---

## Quick Reference Commands

### When Interacting with Agent Mode:

```
# Request complex feature
"Build a user authentication system with..."
→ Agent detects complexity → Creates todo list

# Complex refactoring
"Refactor the entire payment module to use..."
→ Agent analyzes scope → Generates task breakdown

# Full-stack changes
"Add email notification feature to..."
→ Agent identifies layers → Creates sequential plan

# Simple fix
"Fix typo in the help text"
→ Agent executes directly → No todo list needed
```

---

## Key Takeaways

1. **Smart Complexity Detection**: Agent Mode automatically determines when to use structured task management

2. **Intelligent Decomposition**: Complex prompts are broken into manageable, sequenced tasks

3. **State Persistence**: Task progress is tracked throughout the entire session

4. **Dependency Management**: Tasks are automatically sequenced based on dependencies

5. **Flexible Execution**: Sequential or parallel execution based on task relationships

6. **Continuous Progress Tracking**: User stays informed of completion status

7. **Error Resilience**: Blockers and failures are handled gracefully with recovery options

8. **Verification-First**: Completion is verified before marking tasks as done

---

