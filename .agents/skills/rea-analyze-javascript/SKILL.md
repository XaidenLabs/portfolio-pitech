---
name: rea-analyze-javascript
description: Statically inspect and analyze JavaScript or Electron applications using REA (Reverse Engineer Anything) to generate evidence-backed JSON ASTs, module call graphs, and structural metadata without executing the application.
---

# REA JavaScript Application Analysis

Use this skill when you need to statically analyze, reverse-engineer, inspect call graphs, or understand the architecture of a JavaScript or Electron application directory without running its code.

## Command Usage

Run the static analysis tool directly via `npx`:

```bash
npx -y rea-agents@latest analyze-javascript-application /absolute/path/to/app --json
```

### Save Evidence to JSON File

```bash
npx -y rea-agents@latest analyze-javascript-application /absolute/path/to/app --json > application-evidence.json
```

### Helper Script

You can also use the included helper script:

```bash
./scripts/analyze.sh /absolute/path/to/app [output.json]
```

## Options & Arguments

- `/absolute/path/to/app`: Path to the directory, package root, or extracted Electron application (`.asar` or unpacked bundle) to inspect.
- `--json`: Emits structured JSON evidence containing:
  - Files inventory and module hierarchy
  - AST (Abstract Syntax Tree) nodes
  - Cross-module call graphs and function references
  - Dependency mappings

## Capabilities & Workflows

1. **Architecture Discovery:** Reverse engineer how an undocumented or compiled JS application works.
2. **Feature Evidence:** Identify exact entry points, API clients, and state handlers.
3. **Security & Call Tracing:** Audit external network endpoints and dangerous sink usages.
