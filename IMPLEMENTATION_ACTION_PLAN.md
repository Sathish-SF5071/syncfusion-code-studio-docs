# 📋 IMPLEMENTATION ACTION PLAN
## Syncfusion Cody - Phase 1 & 2 Roadmap

---

## EXECUTIVE SUMMARY

**Total Effort**: 70-90 hours over 3-4 weeks  
**Critical Path**: Security hardening (v0.2), then scalability (v0.3)  
**Target Production**: v0.2.0 (security gates) by Week 2  
**Target Enterprise**: v0.3.0 (scalability) by Week 6

---

## PHASE 1: SECURITY HARDENING (v0.2.0)
### Duration: 1-2 weeks | Effort: 14 hours | Risk: LOW

### Sprint 0 (Days 1-2)

#### Task 1.1: Remove Plaintext API Keys from Documentation ⚠️ URGENT
**Owner**: Documentation Team  
**Priority**: P0 (CRITICAL)  
**Effort**: 1-2 hours

**Current State** (INSECURE):
```markdown
# Configure-the-Cody.md
models:
  - name: gpt-4o
    provider: openai
    apiKey: sk-xxxxxxxxxxxx  # ❌ REAL KEY SHOWN
```

**Target State** (SECURE):
```markdown
# Configure-the-Cody.md
models:
  - name: gpt-4o
    provider: openai
    apiKey: ${OPENAI_API_KEY}  # ✅ ENV VAR PATTERN
```

**Files to Update**:
- [ ] `Configure-the-Cody.md` (lines 88-100)
- [ ] `reference/configure-properties/models.md` (examples)
- [ ] `README.md` (add security section)
- [ ] All examples in documentation

**Definition of Done**:
- [ ] No plaintext API keys in any .md file
- [ ] All examples use `${VAR_NAME}` pattern
- [ ] Security section added to main README
- [ ] Code review completed

**Verification**:
```bash
grep -r "sk-\|apiKey: [^$]" *.md reference/
# Should return 0 results
```

---

#### Task 1.2: Implement Environment Variable Resolution
**Owner**: Backend Team  
**Priority**: P0 (CRITICAL)  
**Effort**: 2-3 hours

**Implementation**:
```python
# config/env_resolver.py
import os
import re

def resolve_env_vars(config_str):
    """
    Resolve ${VAR_NAME} or ${VAR_NAME:default} patterns
    to environment variables.
    
    Examples:
      ${OPENAI_API_KEY} → reads OPENAI_API_KEY env var
      ${PORT:3000} → reads PORT env var, default to 3000
    """
    def replacer(match):
        var_name = match.group(1)
        default = match.group(2)[1:] if match.group(2) else None
        value = os.getenv(var_name)
        
        if value is None:
            if default is not None:
                return default
            raise EnvironmentError(
                f"Environment variable '{var_name}' not set. "
                f"Set it with: export {var_name}=<value>"
            )
        return value
    
    # Match ${VAR_NAME} or ${VAR_NAME:default}
    pattern = r'\$\{([A-Za-z_][A-Za-z0-9_]*)(?:(:.*?))?\}'
    return re.sub(pattern, replacer, config_str)

def load_config_with_env_resolution(config_path):
    """Load config and resolve all env variables."""
    with open(config_path, 'r') as f:
        raw_config = f.read()
    
    try:
        resolved = resolve_env_vars(raw_config)
    except EnvironmentError as e:
        raise ConfigurationError(f"Cannot load config: {e}")
    
    return yaml.safe_load(resolved)
```

**Test Cases**:
```python
# tests/test_env_resolution.py
import pytest
import os

class TestEnvVarResolution:
    def test_env_var_substitution(self):
        os.environ["TEST_KEY"] = "test-value"
        resolved = resolve_env_vars("apiKey: ${TEST_KEY}")
        assert resolved == "apiKey: test-value"
    
    def test_env_var_default_value(self):
        if "MISSING_VAR" in os.environ:
            del os.environ["MISSING_VAR"]
        resolved = resolve_env_vars("port: ${MISSING_VAR:3000}")
        assert resolved == "port: 3000"
    
    def test_env_var_missing_error(self):
        if "MISSING_VAR" in os.environ:
            del os.environ["MISSING_VAR"]
        with pytest.raises(EnvironmentError):
            resolve_env_vars("${MISSING_VAR}")
    
    def test_multiple_env_vars(self):
        os.environ["USER"] = "alice"
        os.environ["KEY"] = "secret"
        resolved = resolve_env_vars("user: ${USER}, key: ${KEY}")
        assert resolved == "user: alice, key: secret"
    
    def test_literal_braces_not_affected(self):
        text = "description: 'Use {template} syntax'"
        resolved = resolve_env_vars(text)
        assert resolved == text  # Should not match {template}
```

**Files to Create/Modify**:
- [ ] `config/env_resolver.py` (new)
- [ ] `config/config_loader.py` (modify to use resolver)
- [ ] `tests/test_env_resolution.py` (new)

**Integration**:
```python
# In config_loader.py
def load_config(config_path):
    # Step 1: Read file
    with open(config_path, 'r') as f:
        raw_config = f.read()
    
    # Step 2: Resolve env vars
    resolved_config = resolve_env_vars(raw_config)
    
    # Step 3: Parse YAML
    config = yaml.safe_load(resolved_config)
    
    # Step 4: Validate (Step 1.4)
    validate_config(config)
    
    return config
```

**Definition of Done**:
- [ ] Environment variable resolution implemented
- [ ] All test cases passing
- [ ] Documentation updated
- [ ] Config loader uses resolver
- [ ] Code review completed

---

### Sprint 0 (Days 3-4)

#### Task 1.3: Add Configuration Schema Validation
**Owner**: Backend Team  
**Priority**: P0 (CRITICAL)  
**Effort**: 2-3 hours

**Implementation**:
```python
# config/schema.py
import jsonschema

CONFIG_SCHEMA = {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "type": "object",
    "required": ["name", "version", "schema"],
    "additionalProperties": False,
    
    "properties": {
        "name": {
            "type": "string",
            "minLength": 1
        },
        "version": {
            "type": "string",
            "pattern": "^[0-9]+\\.[0-9]+\\.[0-9]+$"
        },
        "schema": {
            "type": "string",
            "enum": ["v1", "v2"]
        },
        
        "models": {
            "type": "array",
            "items": {
                "type": "object",
                "required": ["name", "provider", "model"],
                "properties": {
                    "name": {"type": "string"},
                    "provider": {"enum": ["openai", "anthropic", "mistral", "ollama"]},
                    "model": {"type": "string"},
                    "apiKey": {"type": "string"},
                    "apiBase": {"type": "string"},
                    "roles": {
                        "type": "array",
                        "items": {
                            "enum": ["chat", "edit", "autocomplete", "apply", "embed", "rerank"]
                        }
                    },
                    "capabilities": {
                        "type": "array",
                        "items": {"enum": ["tool_use", "image_input"]}
                    },
                    "defaultCompletionOptions": {
                        "type": "object",
                        "properties": {
                            "temperature": {
                                "type": "number",
                                "minimum": 0,
                                "maximum": 2
                            },
                            "maxTokens": {
                                "type": "integer",
                                "minimum": 1
                            },
                            "topP": {"type": "number"},
                            "topK": {"type": "number"},
                            "stop": {"type": "array"}
                        }
                    }
                }
            }
        },
        
        "context": {
            "type": "array",
            "items": {
                "type": "object",
                "required": ["provider"],
                "properties": {
                    "provider": {"type": "string"},
                    "name": {"type": "string"},
                    "params": {"type": "object"}
                }
            }
        },
        
        "rules": {
            "type": "array",
            "items": {
                "oneOf": [
                    {"type": "string"},
                    {
                        "type": "object",
                        "required": ["name", "rule"],
                        "properties": {
                            "name": {"type": "string"},
                            "rule": {"type": "string"},
                            "globs": {
                                "oneOf": [
                                    {"type": "string"},
                                    {"type": "array", "items": {"type": "string"}}
                                ]
                            }
                        }
                    }
                ]
            }
        },
        
        "prompts": {
            "type": "array",
            "items": {
                "type": "object",
                "required": ["name", "description", "prompt"],
                "properties": {
                    "name": {"type": "string"},
                    "description": {"type": "string"},
                    "prompt": {"type": "string"}
                }
            }
        },
        
        "docs": {
            "type": "array",
            "items": {
                "type": "object",
                "required": ["name", "startUrl"],
                "properties": {
                    "name": {"type": "string"},
                    "startUrl": {"type": "string", "format": "uri"},
                    "maxDepth": {"type": "integer", "minimum": 1},
                    "favicon": {"type": "string"},
                    "useLocalCrawling": {"type": "boolean"}
                }
            }
        },
        
        "mcpServers": {
            "type": "array",
            "items": {
                "type": "object",
                "required": ["name", "command"],
                "properties": {
                    "name": {"type": "string"},
                    "command": {"type": "string"},
                    "args": {"type": "array", "items": {"type": "string"}},
                    "env": {"type": "object"},
                    "connectionTimeout": {"type": "integer", "minimum": 0}
                }
            }
        }
    }
}

class ConfigurationError(Exception):
    """Configuration validation error."""
    pass

def validate_config(config_dict):
    """
    Validate config against schema.
    
    Raises:
        ConfigurationError: If validation fails
    
    Returns:
        bool: True if valid
    """
    try:
        jsonschema.validate(config_dict, CONFIG_SCHEMA)
        return True
    except jsonschema.ValidationError as e:
        raise ConfigurationError(
            f"Configuration validation failed:\n"
            f"Path: {'.'.join(str(p) for p in e.path)}\n"
            f"Error: {e.message}\n"
            f"See schema at: https://docs.example.com/config-schema"
        )
```

**Test Cases**:
```python
# tests/test_config_validation.py
class TestConfigValidation:
    def test_valid_minimal_config(self):
        config = {
            "name": "Test",
            "version": "1.0.0",
            "schema": "v1"
        }
        assert validate_config(config) is True
    
    def test_missing_required_name(self):
        config = {
            "version": "1.0.0",
            "schema": "v1"
        }
        with pytest.raises(ConfigurationError):
            validate_config(config)
    
    def test_invalid_version_format(self):
        config = {
            "name": "Test",
            "version": "1.0",  # Missing patch
            "schema": "v1"
        }
        with pytest.raises(ConfigurationError):
            validate_config(config)
    
    def test_invalid_schema_version(self):
        config = {
            "name": "Test",
            "version": "1.0.0",
            "schema": "v99"  # Not in enum
        }
        with pytest.raises(ConfigurationError):
            validate_config(config)
    
    def test_invalid_model_provider(self):
        config = {
            "name": "Test",
            "version": "1.0.0",
            "schema": "v1",
            "models": [{
                "name": "test",
                "provider": "invalid",  # Not in enum
                "model": "test"
            }]
        }
        with pytest.raises(ConfigurationError):
            validate_config(config)
    
    def test_invalid_temperature(self):
        config = {
            "name": "Test",
            "version": "1.0.0",
            "schema": "v1",
            "models": [{
                "name": "test",
                "provider": "openai",
                "model": "gpt-4",
                "defaultCompletionOptions": {
                    "temperature": 3.0  # Max is 2.0
                }
            }]
        }
        with pytest.raises(ConfigurationError):
            validate_config(config)
```

**Files to Create/Modify**:
- [ ] `config/schema.py` (new)
- [ ] `config/config_loader.py` (integrate validation)
- [ ] `tests/test_config_validation.py` (new)
- [ ] `tests/fixtures/valid-config.yaml` (test data)

**Definition of Done**:
- [ ] JSON schema defined
- [ ] All test cases passing
- [ ] Validation on config load
- [ ] Clear error messages
- [ ] Documentation updated

---

### Sprint 0 (Days 4-5)

#### Task 1.4: Add Credential Masking in Logs
**Owner**: Security Team  
**Priority**: P0 (CRITICAL)  
**Effort**: 1-2 hours

**Implementation**:
```python
# security/credential_masking.py
import copy
import json

SENSITIVE_KEYS = {
    'apiKey', 'api_key', 'token', 'key',
    'secret', 'password', 'auth', 'credentials',
    'authorization', 'bearer'
}

def mask_sensitive_data(data, depth=0, max_depth=10):
    """
    Recursively mask sensitive fields in data structures.
    
    Returns new data structure with sensitive values masked.
    Does not modify original data.
    """
    if depth > max_depth:
        return "***REDACTED***"
    
    if isinstance(data, dict):
        masked = {}
        for key, value in data.items():
            # Check if this is a sensitive key
            if any(s in key.lower() for s in SENSITIVE_KEYS):
                masked[key] = "***REDACTED***"
            elif isinstance(value, (dict, list)):
                masked[key] = mask_sensitive_data(value, depth + 1, max_depth)
            else:
                masked[key] = value
        return masked
    
    elif isinstance(data, list):
        return [
            mask_sensitive_data(item, depth + 1, max_depth)
            if isinstance(item, (dict, list))
            else item
            for item in data
        ]
    
    else:
        return data

def safe_log(message, data=None, level="info"):
    """
    Log with automatic credential masking.
    
    Args:
        message: Log message
        data: Optional data to log (will be masked)
        level: Log level (debug, info, warning, error)
    """
    if data:
        data = mask_sensitive_data(copy.deepcopy(data))
        logger.log(level, message, extra={"data": json.dumps(data)})
    else:
        logger.log(level, message)
```

**Usage Examples**:
```python
# Logs credential masking
config = {
    "apiKey": "sk-xxxxxxxxxxxx",
    "name": "test"
}

safe_log("Config loaded", config)
# Output: Config loaded data={"apiKey": "***REDACTED***", "name": "test"}

# Before/After
BEFORE: "Config loaded: {'apiKey': 'sk-xxxx...', 'name': 'test'}"
AFTER:  "Config loaded: {'apiKey': '***REDACTED***', 'name': 'test'}"
```

**Test Cases**:
```python
# tests/test_credential_masking.py
class TestCredentialMasking:
    def test_mask_api_key(self):
        data = {"apiKey": "secret123", "name": "test"}
        masked = mask_sensitive_data(data)
        assert masked["apiKey"] == "***REDACTED***"
        assert masked["name"] == "test"
    
    def test_mask_nested_credentials(self):
        data = {
            "model": {
                "token": "secret123",
                "name": "gpt-4"
            }
        }
        masked = mask_sensitive_data(data)
        assert masked["model"]["token"] == "***REDACTED***"
    
    def test_mask_list_items(self):
        data = {
            "models": [
                {"apiKey": "secret1"},
                {"apiKey": "secret2"}
            ]
        }
        masked = mask_sensitive_data(data)
        assert masked["models"][0]["apiKey"] == "***REDACTED***"
    
    def test_original_unchanged(self):
        data = {"apiKey": "secret"}
        mask_sensitive_data(data)
        assert data["apiKey"] == "secret"  # Original not modified
```

**Files to Create/Modify**:
- [ ] `security/credential_masking.py` (new)
- [ ] `tests/test_credential_masking.py` (new)
- [ ] All logging calls updated to use `safe_log()`

**Definition of Done**:
- [ ] Credential masking implemented
- [ ] All logging calls reviewed
- [ ] Test coverage 100%
- [ ] No credentials in logs
- [ ] Documentation updated

---

### Sprint 1 (Days 6-7)

#### Task 1.5: Implement Context Token Budget
**Owner**: Backend Team  
**Priority**: P0 (CRITICAL)  
**Effort**: 3-4 hours

**Implementation**:
```python
# context/token_manager.py
import tiktoken

class TokenBudget:
    """Manages token budget for context aggregation."""
    
    def __init__(self, total_budget=6000, model="gpt-4"):
        self.total_budget = total_budget
        self.used = 0
        self.model = model
        
        # Get tokenizer for the model
        try:
            self.encoding = tiktoken.encoding_for_model(model)
        except KeyError:
            # Fallback to cl100k_base for unknown models
            self.encoding = tiktoken.get_encoding("cl100k_base")
    
    def count_tokens(self, text):
        """Count tokens in text."""
        if not text:
            return 0
        return len(self.encoding.encode(text))
    
    def remaining(self):
        """Get remaining tokens."""
        return self.total_budget - self.used
    
    def can_add(self, text):
        """Check if text fits in remaining budget."""
        tokens = self.count_tokens(text)
        return tokens <= self.remaining()
    
    def add(self, text):
        """
        Add text to context, consuming tokens.
        
        Raises:
            TokenBudgetExceeded: If adding would exceed budget
        """
        tokens = self.count_tokens(text)
        if not self.can_add(text):
            raise TokenBudgetExceeded(
                f"Cannot add {tokens} tokens. "
                f"Remaining: {self.remaining()} tokens. "
                f"Total budget: {self.total_budget} tokens."
            )
        self.used += tokens
        return text
    
    def truncate_to_budget(self, text, max_tokens=None):
        """
        Truncate text to fit in remaining budget.
        
        Returns:
            Truncated text that fits in budget
        """
        if max_tokens is None:
            max_tokens = self.remaining()
        
        tokens = self.encoding.encode(text)
        if len(tokens) <= max_tokens:
            return text
        
        # Truncate to max tokens
        truncated_tokens = tokens[:max_tokens]
        truncated_text = self.encoding.decode(truncated_tokens)
        
        # Add truncation indicator
        return truncated_text + "\n... (truncated)"

class TokenBudgetExceeded(Exception):
    """Raised when token budget is exceeded."""
    pass

def aggregate_context_with_budget(providers, budget=6000, model="gpt-4"):
    """
    Aggregate context from providers within token budget.
    
    Args:
        providers: List of context provider callables
        budget: Total token budget
        model: LLM model name for tokenizer selection
    
    Returns:
        Tuple of (context_str, tokens_used)
    """
    budget_mgr = TokenBudget(total_budget=budget, model=model)
    context = ""
    
    for provider in providers:
        try:
            data = provider.fetch()
            if not data:
                continue
            
            if budget_mgr.can_add(data):
                # Add full data
                context += data
                budget_mgr.add(data)
            else:
                # Truncate to fit remaining budget
                remaining = budget_mgr.remaining()
                if remaining > 100:  # Minimum threshold
                    truncated = budget_mgr.truncate_to_budget(data, remaining)
                    context += truncated
                    budget_mgr.add(truncated)
                # If remaining < 100, skip this provider
        except Exception as e:
            # If provider fails, continue with others
            logger.warning(f"Context provider failed: {e}")
            continue
    
    return context, budget_mgr.used
```

**Integration**:
```python
# In request pipeline
def process_request(user_message, mode, config):
    # ... model selection ...
    
    # Aggregate context WITH budget
    context, tokens_used = aggregate_context_with_budget(
        providers=config.context_providers,
        budget=6000,  # 6K tokens for context
        model=model.name
    )
    
    logger.info(f"Context aggregated: {tokens_used} tokens used")
    
    # ... continue with LLM call ...
```

**Test Cases**:
```python
# tests/test_token_budget.py
class TestTokenBudget:
    def test_token_counting(self):
        budget = TokenBudget()
        tokens = budget.count_tokens("Hello world")
        assert tokens > 0
        assert tokens < 10  # Small text
    
    def test_budget_enforcement(self):
        budget = TokenBudget(total_budget=10)
        large_text = "a" * 1000
        with pytest.raises(TokenBudgetExceeded):
            budget.add(large_text)
    
    def test_budget_tracking(self):
        budget = TokenBudget(total_budget=100)
        budget.add("Hello")
        budget.add("World")
        assert budget.remaining() < 100
    
    def test_truncation(self):
        budget = TokenBudget(total_budget=20)
        large_text = "a" * 1000
        truncated = budget.truncate_to_budget(large_text, max_tokens=5)
        tokens = budget.count_tokens(truncated)
        assert tokens <= 6  # +1 for margin
    
    def test_context_aggregation_with_budget(self):
        def provider1():
            return "a" * 100
        
        def provider2():
            return "b" * 100
        
        providers = [provider1, provider2]
        context, used = aggregate_context_with_budget(
            providers,
            budget=150  # Only room for ~1.5 providers
        )
        assert used <= 150
```

**Files to Create/Modify**:
- [ ] `context/token_manager.py` (new)
- [ ] `request_pipeline.py` (integrate budget)
- [ ] `tests/test_token_budget.py` (new)
- [ ] `requirements.txt` (add tiktoken)

**Definition of Done**:
- [ ] Token budget implemented
- [ ] All tests passing
- [ ] Integrated in request pipeline
- [ ] Logging for token usage
- [ ] Documentation updated

---

### Sprint 1 (Days 8)

#### Task 1.6: Add Fallback Models
**Owner**: Backend Team  
**Priority**: P1 (HIGH)  
**Effort**: 2-3 hours

**Implementation**:
```python
# models/model_selection.py

class ModelNotFoundException(Exception):
    """No model found with required role."""
    pass

def select_model(config, role, allow_fallback=True):
    """
    Select a model for the given role.
    
    Priority:
      1. Exact role match (primary)
      2. Fallback roles (if allow_fallback=True)
      3. Raise error
    
    Args:
        config: Configuration object
        role: Required role (chat, edit, etc.)
        allow_fallback: Allow fallback to alternative roles
    
    Returns:
        Model object
    
    Raises:
        ModelNotFoundException: If no model found
    """
    
    # STEP 1: Try exact role match
    models_with_role = [m for m in config.models if role in m.roles]
    if models_with_role:
        return models_with_role[0]
    
    # STEP 2: If no match and fallback enabled, try alternatives
    if allow_fallback:
        logger.warning(f"No model with role '{role}'. Trying fallback...")
        
        # Fallback chain
        FALLBACK_CHAIN = {
            "chat": ["edit", "apply"],      # Chat can fallback to edit/apply
            "edit": ["chat"],               # Edit can fallback to chat
            "autocomplete": ["chat"],       # Autocomplete can fallback to chat
            "agent": ["chat"],              # Agent can fallback to chat
            "embed": ["chat"],              # Embed can fallback to chat
            "rerank": ["chat"],             # Rerank can fallback to chat
        }
        
        fallback_roles = FALLBACK_CHAIN.get(role, [])
        for fallback_role in fallback_roles:
            models = [m for m in config.models if fallback_role in m.roles]
            if models:
                logger.warning(
                    f"Using '{fallback_role}' model as fallback for '{role}'"
                )
                return models[0]
    
    # STEP 3: No model found
    raise ModelNotFoundException(
        f"No model found with role '{role}'. "
        f"Available roles: {get_available_roles(config)}"
    )

def get_available_roles(config):
    """Get all available roles from configured models."""
    roles = set()
    for model in config.models:
        roles.update(model.roles)
    return list(roles)

# Usage in request pipeline
def process_chat_request(user_message, config):
    try:
        model = select_model(config, "chat")
    except ModelNotFoundException as e:
        logger.error(f"Cannot process chat: {e}")
        raise
    
    # ... continue ...

def process_edit_request(selected_code, instructions, config):
    try:
        model = select_model(config, "edit")
    except ModelNotFoundException:
        logger.warning("No edit model, trying chat model...")
        try:
            model = select_model(config, "chat")
        except ModelNotFoundException:
            raise CodyException("No suitable model available")
    
    # ... continue ...
```

**Test Cases**:
```python
# tests/test_model_selection.py
class TestModelSelection:
    def test_exact_role_match(self, config):
        model = select_model(config, "chat")
        assert "chat" in model.roles
    
    def test_no_model_found(self, config):
        with pytest.raises(ModelNotFoundException):
            select_model(config, "nonexistent")
    
    def test_fallback_to_chat(self, config):
        # Remove all edit models, should fallback to chat
        config.models = [m for m in config.models if "chat" in m.roles]
        model = select_model(config, "edit", allow_fallback=True)
        assert model is not None
    
    def test_fallback_disabled(self, config):
        config.models = [m for m in config.models if "chat" in m.roles]
        with pytest.raises(ModelNotFoundException):
            select_model(config, "edit", allow_fallback=False)
```

**Files to Create/Modify**:
- [ ] `models/model_selection.py` (create/enhance)
- [ ] `tests/test_model_selection.py` (new)
- [ ] Request pipeline integration

**Definition of Done**:
- [ ] Fallback logic implemented
- [ ] All tests passing
- [ ] Fallback chain documented
- [ ] Warning logs on fallback
- [ ] Integration complete

---

## PHASE 2: SCALABILITY & RELIABILITY (v0.3.0)
### Duration: 3-4 weeks | Effort: 20-25 hours | Risk: MEDIUM

### Overview

This phase addresses scalability concerns and adds operational reliability features.

**Target for v0.3.0**:
- Configuration composition
- Hot-reload configuration
- Error handling framework
- Rate limiting
- Audit logging

**Effort Breakdown**:
- Config composition: 4-5 hours
- Error handling: 4-5 hours
- Hot-reload: 2-3 hours
- Rate limiting: 3-4 hours
- Audit logging: 2-3 hours
- Testing & documentation: 3-5 hours

---

### Task 2.1: Configuration Composition
**Owner**: Backend Team  
**Priority**: P1  
**Effort**: 4-5 hours

**Implementation**:
```yaml
# config.yaml (main)
name: "My Workspace"
version: "1.0.0"
schema: "v1"

extends:
  - "base-config.yaml"
  - "rules/${ENVIRONMENT}.yaml"  # dev.yaml, staging.yaml, prod.yaml

models:
  - name: gpt-4o
    provider: openai
    roles: [chat, edit]

# Inherited from base-config.yaml:
# - context providers
# - documentation sources
# - custom prompts

# Extended from rules/{ENVIRONMENT}.yaml:
# - environment-specific rules
```

**Implementation**:
```python
# config/composition.py
def load_config_with_composition(main_config_path):
    """Load config with inheritance/composition support."""
    config = load_yaml(main_config_path)
    base_config = {}
    
    if "extends" in config:
        extends_list = config.pop("extends")
        for extends_path in extends_list:
            # Resolve path relative to main config
            resolved_path = resolve_path(extends_path, main_config_path)
            
            # Resolve env vars in path
            resolved_path = resolve_env_vars(resolved_path)
            
            if os.path.exists(resolved_path):
                extends_config = load_yaml(resolved_path)
                # Merge (deep merge, later configs override)
                base_config = deep_merge(base_config, extends_config)
        
        # Merge main config on top (overrides bases)
        base_config = deep_merge(base_config, config)
        config = base_config
    
    return config
```

**Files to Create**:
- [ ] `config/composition.py` (new)
- [ ] `config/base-config.yaml` (new template)
- [ ] `config/rules/dev.yaml` (new)
- [ ] `config/rules/prod.yaml` (new)

---

### Task 2.2: Error Handling Framework
**Owner**: Backend Team  
**Priority**: P1  
**Effort**: 4-5 hours

**Implementation**:
```python
# error_handling.py
class CodyException(Exception):
    """Base exception for Cody errors."""
    def __init__(self, message, error_code=None, context=None):
        super().__init__(message)
        self.error_code = error_code
        self.context = context or {}

class ModelNotFoundException(CodyException):
    """No model found with required role."""
    pass

class TokenBudgetExceeded(CodyException):
    """Context exceeds token budget."""
    pass

class APICallFailedError(CodyException):
    """LLM API call failed."""
    pass

class ConfigurationError(CodyException):
    """Invalid configuration."""
    pass

class RateLimitError(CodyException):
    """Rate limit exceeded."""
    pass

# Error handling in request pipeline
def process_request(user_message, mode, config):
    try:
        model = select_model(config, mode)
    except ModelNotFoundException as e:
        logger.warning(f"No model for {mode}, using fallback")
        try:
            model = select_model(config, "chat", allow_fallback=True)
        except ModelNotFoundException:
            return {
                "error": True,
                "error_code": "NO_MODEL",
                "message": "No suitable AI model available. Please check your configuration.",
                "actions": ["Check config.yaml", "Add a model"]
            }
    
    try:
        context, tokens = aggregate_context_with_budget(
            config.context_providers,
            budget=6000
        )
    except TokenBudgetExceeded as e:
        logger.warning("Context truncated due to token budget")
        context, tokens = aggregate_context_with_budget(
            config.context_providers,
            budget=3000  # Reduced budget
        )
    
    try:
        response = call_llm(model, context, user_message)
    except APICallFailedError as e:
        logger.error(f"API failed: {e}", extra={"context": e.context})
        return {
            "error": True,
            "error_code": "API_FAILED",
            "message": "AI service temporarily unavailable. Try again in a moment.",
            "retry_hint": "This is usually temporary. Automatic retry available."
        }
    except RateLimitError:
        logger.warning("Rate limited, queuing request")
        return {
            "error": True,
            "error_code": "RATE_LIMITED",
            "message": "Too many requests. Your request has been queued.",
            "eta": "Processing in ~2 minutes"
        }
    
    return response
```

---

### Task 2.3: Hot-Reload Configuration
**Owner**: Backend Team  
**Priority**: P1  
**Effort**: 2-3 hours

**Implementation**:
```python
# config/watcher.py
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler

class ConfigWatcher:
    """Watch for config file changes and reload."""
    
    def __init__(self, config_path, on_change_callback):
        self.config_path = config_path
        self.on_change = on_change_callback
        self.observer = None
    
    def start(self):
        """Start watching for changes."""
        class Handler(FileSystemEventHandler):
            def on_modified(handler_self, event):
                if self.config_path in event.src_path:
                    self._handle_change()
        
        self.observer = Observer()
        self.observer.schedule(
            Handler(),
            path=os.path.dirname(self.config_path),
            recursive=True
        )
        self.observer.start()
        logger.info(f"Config watcher started for {self.config_path}")
    
    def stop(self):
        """Stop watching."""
        if self.observer:
            self.observer.stop()
            self.observer.join()
    
    def _handle_change(self):
        """Handle config file change."""
        try:
            logger.info("Config file changed, reloading...")
            new_config = load_config(self.config_path)
            validate_config(new_config)
            self.on_change(new_config)
            logger.info("Config reloaded successfully")
        except Exception as e:
            logger.error(f"Config reload failed: {e}")

# Usage
def initialize_cody():
    config = load_config("config.yaml")
    
    def on_config_change(new_config):
        update_runtime(new_config)
        notify_user("Config reloaded - changes take effect immediately")
    
    watcher = ConfigWatcher("config.yaml", on_config_change)
    watcher.start()
    
    return config, watcher
```

---

### Task 2.4: Rate Limiting
**Owner**: Backend Team  
**Priority**: P1  
**Effort**: 3-4 hours

(Implementation details in full document)

---

### Task 2.5: Audit Logging
**Owner**: Security Team  
**Priority**: P1  
**Effort**: 2-3 hours

(Implementation details in full document)

---

## IMPLEMENTATION TIMELINE

```
WEEK 1 (IMMEDIATE - SECURITY):
├─ Mon-Tue: Task 1.1 (Remove API keys)          ✓ 2h
├─ Tue-Wed: Task 1.2 (Env var resolution)       ✓ 3h
├─ Wed-Thu: Task 1.3 (Config validation)        ✓ 3h
├─ Thu-Fri: Task 1.4 (Credential masking)       ✓ 2h
│
└─ SUBTOTAL: 10 hours (ready for release)

WEEK 2 (SECURITY CONTINUED):
├─ Mon-Tue: Task 1.5 (Token budget)             ✓ 4h
├─ Wed-Thu: Task 1.6 (Fallback models)          ✓ 3h
├─ Thu-Fri: Testing & documentation            ✓ 3h
│
├─ SUBTOTAL: 10 hours
└─ TOTAL v0.2.0: 20 hours → RELEASE

WEEK 3-4 (SCALABILITY):
├─ Task 2.1: Config composition                 □ 5h
├─ Task 2.2: Error handling                     □ 5h
├─ Task 2.3: Hot-reload                         □ 3h
├─ Task 2.4: Rate limiting                      □ 4h
├─ Task 2.5: Audit logging                      □ 3h
├─ Testing & documentation                      □ 5h
│
└─ TOTAL v0.3.0: 25 hours → RELEASE

GRAND TOTAL: ~50 hours over 4 weeks
```

---

## SUCCESS METRICS

### v0.2.0 Release Criteria

- [ ] All plaintext API keys removed from documentation
- [ ] Environment variable resolution working
- [ ] Config schema validation implemented
- [ ] Context token budget enforced
- [ ] Credential masking in all logs
- [ ] Fallback models working
- [ ] Test coverage > 70%
- [ ] No security warnings in SAST scan
- [ ] Documentation updated
- [ ] Code review approved

### v0.3.0 Release Criteria

- [ ] Config composition working
- [ ] Hot-reload configuration implemented
- [ ] Error handling framework complete
- [ ] Rate limiting working
- [ ] Audit logging implemented
- [ ] Load testing passed (100 concurrent users)
- [ ] Test coverage > 80%
- [ ] Performance benchmarks met
- [ ] Documentation complete

---

## RISKS & MITIGATION

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|-----------|
| Breaking changes in config format | Medium | High | Backward compatibility, migration guide |
| Token budget truncates important context | Medium | Medium | Test with real codebases, tunable budget |
| Hot-reload causes race conditions | Low | High | File locking, atomic reloads |
| Rate limiting too restrictive | Low | Medium | Configurable limits, monitoring |
| Performance regression | Medium | Medium | Benchmarking before/after |

---

## APPROVAL CHECKLIST

- [ ] Budget approved ($X for Y developer-weeks)
- [ ] Timeline agreed (4 weeks)
- [ ] Resource allocation confirmed
- [ ] Security review scheduled for v0.2.0
- [ ] Load testing infrastructure available
- [ ] Release notes process defined
- [ ] Customer communication plan ready

---

**Document Version**: 1.0  
**Last Updated**: 2024  
**Owner**: Engineering Team  
**Status**: Ready for Implementation
