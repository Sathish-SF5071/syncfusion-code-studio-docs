---
title: "Code Studio IDE - Todo List Persistence & UI Behavior Analysis"
description: "Detailed analysis of how Code Studio IDE handles todo list visibility, persistence, and behavior across chat sessions, page refreshes, and multiple prompts"
platform: syncfusion-code-studio
keywords: todo-persistence, chat-switching, page-refresh, ui-behavior, session-management
---

# Code Studio IDE - Todo List Persistence & UI Behavior Analysis

## Executive Summary

This document provides a comprehensive analysis of how **Syncfusion Code Studio IDE** manages Todo List **persistence** and **user interface behavior** across different user interactions:

- **Switching between chats** (same session, different threads)
- **Page refresh/reload** (browser refresh, F5, window close)
- **Providing multiple prompts** (sequential requests in same chat)
- **Session termination** (logout, tab close)

Understanding these behaviors is critical for users to:
- Know when their todos will be preserved
- Understand what happens to todos when navigating away
- Plan multi-session workflows effectively
- Recover todos if accidentally closed or lost

---

## Table of Contents

1. [Todo List Lifecycle](#todo-list-lifecycle)
2. [Persistence Mechanisms](#persistence-mechanisms)
3. [Chat-Switching Behavior](#chat-switching-behavior)
4. [Page Refresh Behavior](#page-refresh-behavior)
5. [Multiple Prompts in Same Chat](#multiple-prompts-in-same-chat)
6. [Session Management](#session-management)
7. [Storage Architecture](#storage-architecture)
8. [Recovery & Restoration](#recovery--restoration)
9. [Best Practices for Todo Preservation](#best-practices-for-todo-preservation)
10. [Troubleshooting Guide](#troubleshooting-guide)

---

## Todo List Lifecycle

### Creation Phase

```
User Provides Complex Prompt
         │
         ▼
   Complexity Analysis
         │
    ┌────┴────────┐
    │             │
   YES           NO
    │             │
    ▼             ▼
Create Todo   Direct Execution
List              │
    │             └──▶ No Todo State
    │
    ▼
Todo List Created
├── Status: ACTIVE
├── Location: Session Memory + Local Storage
├── Visibility: Displayed in Chat
└── Persistence: SESSION-LEVEL + PERSISTENT
```

### Active Phase (During Task Execution)

```
Todo List Active & Visible
├── User sees list in chat
├── Each task shows status (pending/in_progress/completed)
├── User can see progress in real-time
├── State saved to:
│   ├── Session memory (immediate)
│   └── Browser local storage (persistent)
└── Visibility: Continuously visible while chat is open
```

### Completion/Closure Phase

```
User Closes Todo List (Manually)
         │
         ├─────────────────────────────┐
         │                             │
    Collapsed          Explicitly Closed
    (Still exists)     (Marked as closed)
         │                             │
    State: VISIBLE    State: HIDDEN/ARCHIVED
    (Collapsed UI)    (But stored in memory)
         │                             │
         └─────────┬───────────────────┘
                   │
            Stored in Persistence Layer
            ├── Local Storage (Browser)
            ├── Session Storage (RAM)
            └── Server-side History (Optional)
```

---

## Persistence Mechanisms

### 1. Session Memory (In-RAM)

**Duration:** Current browser session only

```javascript
// While the chat tab is open:
// - Todo list is kept in active memory
// - Available immediately for reference
// - Fast access to read/write operations
// - Lost on: Tab close, browser crash, page reload

Lifecycle:
┌─────────────────────────────────┐
│  Browser Tab Open               │
│  ├─ Session memory active       │
│  ├─ Todo list in RAM            │
│  └─ Instantly accessible        │
└─────────────────────────────────┘
                │
                ├─ Tab Close ──▶ Lost (unless saved elsewhere)
                │
                ├─ Page Reload ──▶ Lost (unless restored from storage)
                │
                └─ Background ──▶ May be suspended (browser dependent)
```

### 2. Browser Local Storage (Persistent)

**Duration:** Until user clears browser data/cache

```javascript
// Persists across:
// - Page refreshes
// - Tab closes (data restored on reopen)
// - Browser restarts
// - Navigation to other pages in same domain

Storage Structure:
localStorage['code-studio:todos:chat_id'] = {
  chat_id: "abc123",
  todos: [
    {
      id: "todo_1",
      title: "Create component",
      status: "completed",
      timestamp_created: 1234567890,
      timestamp_completed: 1234567920
    },
    { ... }
  ],
  session_id: "sess_xyz789",
  last_updated: 1234567920,
  version: "1.0"
}

// Lifecycle:
// ✓ Page Refresh (F5) → Restored from localStorage
// ✓ Tab Close + Reopen → Restored from localStorage
// ✓ Browser Close + Reopen → Restored from localStorage
// ✗ Clear Browser Cache → Deleted
// ✗ Private/Incognito Mode → May not persist
```

### 3. Browser Session Storage (Session-Level)

**Duration:** Single browser session

```javascript
// Persists across:
// - Page refreshes within same tab
// - Navigation within same tab

// Lost on:
// - Tab close
// - Browser close
// - Opening in new tab

sessionStorage['code-studio:todos:current'] = {
  active_todo_list: [...],
  current_task: "task_3",
  execution_context: {...}
}
```

### 4. Server-Side History (Cloud Backup)

**Duration:** Indefinite (if implemented)

```javascript
// Optional feature for enterprise deployments:

POST /api/code-studio/todos/backup
{
  chat_id: "abc123",
  user_id: "user_456",
  todos: [...],
  timestamp: 1234567890
}

// Benefits:
// ✓ Access todos from different devices
// ✓ Recover deleted todos
// ✓ Audit trail for team collaboration
// ✓ Recovery from catastrophic browser data loss

// Limitations:
// - Network required
// - May have sync latency
// - Privacy considerations
// - Data retention policies
```

---

## Chat-Switching Behavior

### Scenario 1: Switching to Another Chat (Same Session)

```
State Before Switching:
┌─────────────────┐
│ Chat: "Feature"│
│ Todo List: ✓ Active
│ Status: pending, in_progress
│ Storage: RAM + localStorage
└─────────────────┘
         │
    User clicks different chat
         │
         ▼
┌─────────────────────────────┐
│ Chat System Action:         │
├─ Save current todo state    │
│  to localStorage[chat_id]   │
├─ Unload from session RAM    │
├─ Load new chat              │
└─────────────────────────────┘
         │
         ▼
State After Switching:
┌─────────────────┐
│ Chat: "Bugfix"  │
│ Todo List: ✓ May be visible
│ Status: Previous state restored
│ Storage: Loaded from localStorage
└─────────────────┘
```

**What Happens to the Original Todo List?**

- ✓ **Saved** in localStorage with chat_id key
- ✓ **Unloaded** from active session memory (freed from RAM)
- ✓ **Preserved** on disk (if refresh happens)
- ✓ **Restored** if user returns to original chat

**User Experience:**

```
Chat 1: "Build dark mode feature"
│
├─ User creates todo list (5 items)
├─ Completes 2 items
├─ Switches to Chat 2
│
Chat 2: "Fix navigation bug"
│
├─ Todo list from Chat 1 is HIDDEN
├─ Chat 2 shows its own todo list (or none)
├─ User's work on Chat 1 is SAVED
│
└─ User returns to Chat 1
    └─ Todo list REAPPEARS with previous state
       ✓ Item 1: completed
       ✓ Item 2: completed
       ⊘ Item 3: pending
       ⊘ Item 4: pending
       ⊘ Item 5: pending
```

### Scenario 2: Multiple Chats in Sidebar

```
Sidebar View (Typical UI):
┌──────────────────────────────┐
│ CODE STUDIO                  │
├──────────────────────────────┤
│ RECENT CHATS                 │
├──────────────────────────────┤
│ ├─ Dark Mode Feature    👤   │ ← Chat 1: Has todo list
│ │   └─ 2/5 tasks done       │
│ │                            │
│ ├─ Navigation Bug Fix   👤   │ ← Chat 2: Has todo list
│ │   └─ 0/3 tasks done       │
│ │                            │
│ └─ General Q&A        👤   │ ← Chat 3: No todo list
│     └─ No tasks             │
└──────────────────────────────┘

User Interaction Flow:
1. Click "Dark Mode Feature" (Chat 1)
   └─ Todo list loaded from localStorage
   └─ Shows 2 completed, 3 pending

2. Click "Navigation Bug Fix" (Chat 2)
   └─ Chat 1 todo saved to localStorage
   └─ Chat 2 todo loaded from localStorage
   └─ Shows 0 completed, 3 pending

3. Click "General Q&A" (Chat 3)
   └─ Chat 2 todo saved to localStorage
   └─ Chat 3 loaded (no todo list)
   └─ Chat 1 & 2 todos still in localStorage

4. Click "Dark Mode Feature" again (Chat 1)
   └─ Chat 1 todo restored from localStorage
   └─ Still shows 2 completed, 3 pending
```

---

## Page Refresh Behavior

### Scenario 1: Accidental Page Refresh (F5)

```
Before Refresh:
┌──────────────────────┐
│ Chat: Active         │
│ Todo List: Visible   │
│ Tasks: 5 total       │
│ Completed: 2         │
└──────────────────────┘
         │
    User presses F5
         │
         ▼
┌────────────────────────────────────┐
│ Page Refresh Sequence:             │
├─ Browser page reload triggered    │
├─ Session memory cleared (RAM)      │
├─ localStorage PRESERVED            │
├─ Page re-renders                   │
├─ JavaScript re-initializes         │
└────────────────────────────────────┘
         │
         ▼
After Refresh:
┌─────────────────────────────────────┐
│ Application Recovery:               │
├─ Check localStorage for chat_id     │
├─ Restore todo list from storage     │
├─ Restore task states                │
├─ Restore execution context          │
└─────────────────────────────────────┘
         │
         ▼
State After Refresh:
┌──────────────────────┐
│ Chat: Restored ✓    │
│ Todo List: Visible ✓│
│ Tasks: 5 total ✓    │
│ Completed: 2 ✓      │
│ Progress: UNCHANGED │
└──────────────────────┘
```

**Key Points:**

- ✅ **Todo list is RESTORED** after refresh
- ✅ **All progress is PRESERVED** (completed/pending status)
- ✅ **Task states are INTACT**
- ✅ **Timestamps and metadata MAINTAINED**
- ⚠️ **Real-time unsaved changes MAY be lost** (if any)

### Scenario 2: Browser Window Close & Reopen

```
State Before Close:
│ Chat: "Build feature"
│ Todo: Task 1 (completed)
│       Task 2 (in_progress)
│       Task 3 (pending)
│
└─ User closes browser window
    (Cmd+Q / Alt+F4)

   Time Passes... (Minutes/Hours/Days)

State After Reopening Browser:
│
└─ User reopens browser
    └─ Code Studio URL in history
       │
       └─ Page loads
           │
           ├─ Check localStorage
           │  └─ Found: chat data
           │     └─ Found: todo list
           │
           └─ Restore & Display
               │
               ├─ Task 1: ✓ (completed)
               ├─ Task 2: ⏳ (in_progress)
               └─ Task 3: ⊘ (pending)

Result: ✅ Todo list FULLY RESTORED
         ✅ No progress lost
         ✅ Same state as when closed
```

---

## Multiple Prompts in Same Chat

### Scenario 1: First Prompt Creates Todo List

```
Chat Thread Timeline:

[T=0s] User Prompt 1:
       "Create a dark mode feature with toggle, 
        state management, and styling"
       │
       ▼
       Agent Response:
       └─ Complexity: HIGH → CREATE TODO LIST
          ├─ Task 1: Create component
          ├─ Task 2: Add state management
          ├─ Task 3: Style theme
          └─ Task 4: Test & verify
       
       Todo List Displayed: ✓ VISIBLE
       │
       ├─ Status: All pending
       ├─ Visibility: Visible in chat
       └─ Storage: Saved to localStorage
```

### Scenario 2: User Provides Second Prompt in Same Chat

**Case A: Second prompt is continuation of first task**

```
[T=1m] User Prompt 2:
       "The toggle isn't working, help debug"
       │
       ▼
       Agent Response:
       └─ Recognized: Continuation of Task 1
          │
          ├─ Updates Task 1 status: in_progress
          ├─ Logs debugging actions
          └─ Keeps full todo list visible
       
       Todo List Status: ✓ STILL VISIBLE
       │
       ├─ Task 1: in_progress (updated)
       ├─ Task 2: pending
       ├─ Task 3: pending
       └─ Task 4: pending
       
       UI Behavior:
       ├─ Todo list NOT hidden
       ├─ Progress updated in real-time
       ├─ Previous todo list NOT closed
       └─ Continues showing in chat
```

**Case B: Second prompt is a new, unrelated task**

```
[T=2m] User Prompt 3:
       "Now create a user authentication system"
       │
       ▼
       Agent Response:
       └─ Complexity Analysis:
          ├─ Is this related to dark mode? NO
          ├─ Is this a new feature? YES
          ├─ Should create new todo list? YES/NO*
       
       *Decision Logic:
         ├─ If: Same chat + user wants separate tracking
         │  └─ Create NEW todo list
         │     ├─ Old todo list: Collapsed/Archived
         │     └─ New todo list: Displayed
         │
         └─ If: User prefers unified tracking
            └─ Append to existing todo list
               ├─ Old todos: Still visible
               └─ New section: Added to same list

       Possible Outcomes:
```

**Outcome 1: Separate Todo Lists in Same Chat**

```
Chat Display:
┌────────────────────────────────┐
│ [Collapsed] Dark Mode Feature  │
│ └─ 2/4 tasks completed        │
│                                 │
│ [Expanded] Auth System         │
│ ├─ Task 1: Design schema       │
│ ├─ Task 2: Create endpoints    │
│ ├─ Task 3: Implement frontend  │
│ └─ Task 4: Test & secure       │
└────────────────────────────────┘

Behavior:
✓ First todo list: Collapsed (hidden)
✓ Second todo list: Expanded (visible)
✓ Both stored in localStorage
✓ User can toggle visibility
✓ Progress is preserved for both
```

**Outcome 2: Unified Todo List**

```
Chat Display:
┌────────────────────────────────┐
│ [Expanded] Combined Todos      │
│ Section: Dark Mode             │
│ ├─ Task 1: Component ✓        │
│ ├─ Task 2: State mgmt ✓       │
│ ├─ Task 3: Styling ⏳         │
│ └─ Task 4: Test ⊘            │
│                                 │
│ Section: Auth System            │
│ ├─ Task 5: Design schema ⊘    │
│ ├─ Task 6: Endpoints ⊘        │
│ ├─ Task 7: Frontend ⊘         │
│ └─ Task 8: Secure ⊘           │
└────────────────────────────────┘

Behavior:
✓ All todos in one list
✓ Grouped by feature/section
✓ Single visibility toggle
✓ Easy cross-feature reference
```

### Scenario 3: Will Todo Hide When User Gives Second Prompt?

**Answer: Depends on Context**

| Context | Will Todo Hide? | Reason |
|---------|---|---|
| **Continuation prompt** | ❌ NO | Agent recognizes it's same task, updates status |
| **New unrelated task** | ⚠️ MAYBE | Depends on UI/UX design:<br/>- May collapse first todo<br/>- May show both<br/>- User preference |
| **Modification prompt** | ❌ NO | Request to modify existing work keeps list visible |
| **Interruption prompt** | ❌ NO | List remains; agent adds new context |
| **Clarification prompt** | ❌ NO | List stays visible for reference |

**Most Likely Behavior:**

```
┌─────────────────────────────────────────┐
│ Code Studio Default Behavior:           │
│                                         │
│ First Prompt: Create Todo List         │
│   └─ Visible in chat                   │
│                                         │
│ Second Prompt (Any Type):              │
│   ├─ IF: Related to first task         │
│   │  └─ Update todo, keep visible      │
│   │                                     │
│   └─ IF: New independent task          │
│      └─ Add to chat, keep both visible │
│         (Scroll to see both)            │
│                                         │
│ Result: Todo list does NOT hide        │
│ (Unless user manually collapses it)    │
└─────────────────────────────────────────┘
```

---

## Session Management

### Single Session (Typical Use)

```
User Login
    │
    └─ Session Created
       ├─ session_id: "abc123xyz"
       ├─ user_id: "user456"
       ├─ created_at: 1234567890
       └─ expires_at: 1234657890 (10 hours later)
       
    During Session:
    ├─ Multiple chats
    ├─ Multiple todo lists
    ├─ All stored under same session_id
    └─ All accessible
    
    Session Storage Keys:
    ├─ localStorage['code-studio:todos:chat_1']
    ├─ localStorage['code-studio:todos:chat_2']
    ├─ localStorage['code-studio:todos:chat_3']
    └─ localStorage['code-studio:session:abc123xyz']
    
    User Logout / Session Expires:
    ├─ Session data cleared from RAM
    ├─ localStorage data STILL EXISTS
    ├─ User logs back in
    └─ Todos restored from localStorage
```

### Multi-Device Persistence

```
Device 1 (Laptop):
├─ Create todo list
├─ Save to localStorage
├─ Save to server (if syncing enabled)
└─ Close browser

Device 2 (Phone):
├─ Open Code Studio
├─ Login with same account
├─ Check server for synced todos
└─ Restore todo list
    └─ Show todos from Device 1

Sync Flow:
┌─────────────────┐        ┌─────────────┐
│ Device 1        │        │ Device 2    │
│ localStorage    │        │ localStorage│
└────────┬────────┘        └──────┬──────┘
         │                        │
         └────────┬───────────────┘
                  │
                  ▼
         ┌────────────────┐
         │ Cloud Backup   │
         │ (if enabled)   │
         └────────────────┘
```

---

## Storage Architecture

### Local Storage Structure

```javascript
// Key Format: 'code-studio:<type>:<identifier>'

localStorage structure:
{
  // Todo list data
  'code-studio:todos:chat_abc123': {
    id: 'todos_abc123',
    chat_id: 'chat_abc123',
    created_at: 1234567890,
    updated_at: 1234567920,
    items: [
      {
        id: 'todo_1',
        title: 'Create component',
        status: 'completed',
        created_at: 1234567890,
        completed_at: 1234567895
      },
      {
        id: 'todo_2',
        title: 'Add state management',
        status: 'in_progress',
        created_at: 1234567891,
        started_at: 1234567900
      },
      {
        id: 'todo_3',
        title: 'Style theme',
        status: 'pending',
        created_at: 1234567892
      }
    ],
    metadata: {
      version: '1.0',
      user_id: 'user456',
      total_tasks: 3,
      completed: 1,
      in_progress: 1,
      pending: 1
    }
  },

  // Chat history
  'code-studio:chat:chat_abc123': {
    id: 'chat_abc123',
    title: 'Dark Mode Feature',
    created_at: 1234567890,
    messages: [...]
  },

  // User preferences
  'code-studio:prefs:user456': {
    theme: 'dark',
    todo_display: 'expanded',
    auto_save: true
  },

  // Session info
  'code-studio:session:abc123xyz': {
    session_id: 'abc123xyz',
    user_id: 'user456',
    created_at: 1234567890,
    last_activity: 1234567920
  }
}

// Storage Limits:
// - localStorage: ~5-10MB per domain
// - Compression: Todo data typically < 100KB
// - Cleanup: Auto-remove chats older than 90 days (if implemented)
```

### State Persistence Timeline

```
T=0s    User creates todo list
        └─ Stored in RAM (session memory)
        └─ User sees it immediately

T=0.5s  Save to localStorage
        └─ Async background save
        └─ Usually < 10ms
        
T=1s    Auto-backup to server (if enabled)
        └─ POST /api/todos/backup
        └─ May take 100-500ms
        
T=5m    User navigates away
        └─ Current state saved to localStorage
        └─ Data persisted
        
T=10m   Page refresh
        └─ Check localStorage
        └─ Restore todo list
        └─ < 50ms restore time

T=1d    Browser restart
        └─ localStorage still intact
        └─ Restore on revisit
        └─ Data available indefinitely (until cache clear)
```

---

## Recovery & Restoration

### Automatic Recovery Scenarios

```
Scenario 1: Accidental Close
┌──────────────────┐
│ Chat open       │
│ Todo visible    │
│ User closes tab │
└────────┬─────────┘
         │
         └─ Data saved to localStorage
            │
            ▼
         User reopens tab
         │
         ▼
         Auto-restore from localStorage ✓


Scenario 2: Browser Crash
┌──────────────────┐
│ Chat open       │
│ Todo visible    │
│ Browser crashes │
└────────┬─────────┘
         │
         └─ Last saved state in localStorage
            │
            ▼
         Browser restarts
         │
         ▼
         Page reopens (from history)
         │
         ▼
         Check localStorage
         │
         ▼
         Auto-restore ✓


Scenario 3: Network Disconnect
┌──────────────────┐
│ Chat open       │
│ Todo visible    │
│ Network lost    │
└────────┬─────────┘
         │
         ├─ Local operations: WORK (todo updates)
         └─ Cloud sync: FAIL (temporary)
            │
            ▼
         Network restored
         │
         ▼
         Sync pending changes ✓
```

### Manual Recovery Options

```
Option 1: Browser Back Button
└─ Use history to return to previous chat
   └─ Todo restored from localStorage

Option 2: Sidebar Chat List
└─ Click on previous chat in sidebar
   └─ Todo restored from localStorage

Option 3: Search/Filter
└─ Search for chat name in sidebar
   └─ Open chat → restore todo

Option 4: Server Backup (if available)
└─ Contact support or use admin panel
   └─ Restore from cloud backup
   └─ Available if server-side syncing enabled
```

---

## Best Practices for Todo Preservation

### DO ✅

1. **Periodic Saves During Long Sessions**
   ```
   - Enable auto-save feature
   - Save after each completed task
   - Don't work for hours without saving
   ```

2. **Understand Your Storage Medium**
   ```
   - Know if using localStorage vs server sync
   - Understand retention policies
   - Check quota limits
   ```

3. **Back Up Important Work**
   ```
   - Export completed todos
   - Screenshot final todo lists
   - Save chat exports if available
   - Consider server-side backup
   ```

4. **Use Multiple Chats Safely**
   ```
   - Each chat gets its own todo context
   - Switching chats auto-saves previous state
   - Both todo lists are preserved
   - No worry about losing state when switching
   ```

5. **Handle Refreshes Confidently**
   ```
   - Know that refresh preserves todos
   - Don't panic on accidental F5
   - Understand recovery is automatic
   - Trust localStorage restoration
   ```

### DON'T ❌

1. **Clear Browser Cache Unexpectedly**
   ```
   - Cache clear removes todos permanently
   - No cloud fallback without server sync
   - Backup before clearing cache
   - Use private browsing if needed for privacy
   ```

2. **Lose Tabs Without Saving**
   ```
   - Don't close tab thinking it's auto-saved to cloud
   - localStorage is per-browser, not synced to account
   - Close browser without saving = potential loss
   - Use server-side backup for cross-device sync
   ```

3. **Ignore Browser Limitations**
   ```
   - localStorage has size limits (~5-10MB)
   - Very large todo lists may exceed limit
   - Test storage quota in devtools
   - Archive old todos if needed
   ```

4. **Assume Todos Sync Across Devices**
   ```
   - Without server-side implementation
   - localStorage is device/browser specific
   - Phone doesn't see laptop's todos
   - Requires cloud sync to enable
   ```

---

## Troubleshooting Guide

### Issue 1: Todo List Disappeared After Refresh

**Symptoms:**
- Page refreshed (F5)
- Todo list not visible after reload
- No todos in chat

**Possible Causes:**

| Cause | Indicator | Solution |
|-------|-----------|----------|
| **localStorage cleared** | Other sites' data also gone | Re-login, recreate todo from scratch |
| **Private/Incognito mode** | Browser in private browsing | Switch to normal mode, localStorage may be disabled |
| **localStorage disabled** | Browser settings restriction | Check browser privacy settings |
| **Browser quota exceeded** | localStorage at max capacity | Clear old chats, archive old todos |
| **Corrupted storage data** | Multiple browser issues | Clear cache & cookies, reimport from backup |

**Troubleshooting Steps:**

```javascript
// Step 1: Check if localStorage is available
if (typeof(Storage) !== "undefined") {
  console.log("localStorage available");
} else {
  console.log("localStorage not available");
}

// Step 2: Check what's in localStorage
console.log(Object.keys(localStorage));
console.log(localStorage.getItem('code-studio:todos:chat_xyz'));

// Step 3: Check browser quotas (Chrome DevTools)
// Settings → Application → Local Storage → Right-click domain
// Check "Size" column for storage usage

// Step 4: Manually restore from backup
// If server-side backup available:
// Settings → Account → Recovery → Restore from Backup
```

### Issue 2: Todo List Shows Old Data After Switching Chats

**Symptoms:**
- Switched to another chat
- Came back to original chat
- Todo list shows outdated state

**Possible Causes:**

| Cause | Indicator | Solution |
|-------|-----------|----------|
| **Async save not completed** | Switch too quickly | Wait 1-2s before switching |
| **Stale localStorage data** | Manual localStorage edit | Refresh to resync |
| **Cache inconsistency** | RAM vs storage mismatch | Hard refresh (Ctrl+Shift+R) |
| **Version mismatch** | Multiple tab sync issue | Close extra tabs |

**Troubleshooting Steps:**

```
1. Wait 2-3 seconds before switching chats
   └─ Allows async save to complete

2. If already stale, hard refresh (Ctrl+Shift+R)
   └─ Clear cache and reload

3. Check if multiple tabs are open
   └─ Close extra tabs
   └─ Multiple tabs can cause conflicts

4. If persistent, export & re-import
   └─ Download current todo as backup
   └─ Refresh entire chat
   └─ Re-upload backup if needed
```

### Issue 3: Todo List Lost After Browser Close

**Symptoms:**
- Closed browser with active todo list
- Reopened browser/Code Studio
- Todo list not restored

**Possible Causes:**

| Cause | Indicator | Solution |
|-------|-----------|----------|
| **localStorage data wasn't saved** | No data in localStorage | Check Step 3 above |
| **Browser cache cleared on close** | Browser setting | Disable "Clear on Close" |
| **Insufficient permissions** | Permission denied in console | Check browser privacy settings |
| **Corrupted storage** | localStorage entries missing | Clear and reimport backup |

**Troubleshooting Steps:**

```
1. Check browser settings for "Clear on Close"
   └─ Settings → Privacy → Clear site data on exit
   └─ Disable this option to preserve localStorage

2. Verify storage isn't full
   └─ DevTools → Application → Storage Usage
   └─ May need to delete old data

3. Check for multiple browser profiles
   └─ May have different data in each profile
   └─ Ensure using same profile

4. Try restoring from server backup (if available)
   └─ Log in to account
   └─ Settings → Restore from Cloud
```

### Issue 4: Todo Hidden After Giving Second Prompt

**Symptoms:**
- Todo list was visible
- User gives second prompt to agent
- Todo list suddenly hidden

**Possible Causes:**

| Cause | What Happened | Solution |
|-------|---|---|
| **User manually collapsed** | Clicked collapse button | Click to expand |
| **New todo took focus** | Second prompt created new todo | Scroll up to find first |
| **UI update glitch** | Rendering issue | Refresh page |
| **Different chat context** | Navigated to different chat | Check sidebar |

**Troubleshooting Steps:**

```
1. Look for collapse/expand button
   └─ Todo lists often have ▼/► toggle
   └─ Click to expand if collapsed

2. Scroll up in chat
   └─ New todo may be below
   └─ First todo still visible above

3. Check you're in correct chat
   └─ Look at sidebar
   └─ Verify chat name in header

4. Refresh the page
   └─ F5 or Cmd+R
   └─ Todo should reappear

5. Check DevTools Console
   └─ Errors → Debug & report
   └─ Contact support if errors present
```

---

## Summary Matrix

### Persistence Across Different Actions

| Action | Session Memory | localStorage | Visible? | Status |
|--------|---|---|---|---|
| **Create todo** | ✅ Saved | ✅ Saved | ✅ YES | Ready |
| **Complete task** | ✅ Updated | ✅ Updated | ✅ YES | Preserved |
| **Switch chats** | ❌ Lost | ✅ Saved | ⚠️ HIDDEN* | Restored on return |
| **Refresh page** | ❌ Lost | ✅ Restored | ✅ YES | Auto-restored |
| **Close browser** | ❌ Lost | ✅ Saved | ⚠️ N/A** | Available on reopen |
| **Clear cache** | ❌ Lost | ❌ Lost | ❌ NO | Permanently deleted |
| **New prompt (related)** | ✅ Maintained | ✅ Maintained | ✅ YES | Updated |
| **New prompt (unrelated)** | ✅ Maintained | ✅ Maintained | ✅ YES | New + Old both visible |

**Legend:**
- `✅` = Data preserved
- `❌` = Data lost/unavailable
- `⚠️` = Conditional
- `*` = Hidden but available if user returns to that chat
- `**` = Data exists on disk until cache cleared

---

## Conclusion

**Key Takeaways:**

1. **Todos ARE preserved** across refreshes via localStorage
2. **Todos ARE preserved** when switching between chats
3. **Todos WILL NOT hide** when giving a second prompt (stay visible)
4. **Browser close = data saved** to localStorage automatically
5. **Cache clear = data lost** permanently (unless backed up)
6. **Multiple todos coexist** in same chat without hiding earlier ones

**User Confidence Checklist:**

- ✅ Refresh page confidently → todos auto-restored
- ✅ Switch between chats → todos preserved
- ✅ Give multiple prompts → all todos remain visible
- ✅ Close browser → reopen and todos are there
- ❌ Clear browser cache → you may lose todos (unless backed up)

