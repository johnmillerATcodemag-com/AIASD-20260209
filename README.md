# AIASD Project Repository

## Overview

This repository contains AI-assisted software development artifacts, requirements documentation, and supporting materials.

## AI-Assisted Artifacts

This section documents artifacts created with AI assistance, including links to conversation logs for full provenance tracking.

### Requirements Documentation

- **[Web Calculator PRD](requirements/web-calculator-prd.md)** - Comprehensive Product Requirements Document for a web-based calculator application. Includes product vision, user personas, feature specifications, technical architecture, and launch plan. ([AI Log](ai-logs/2026/02/12/web-calc-prd-20260212-001/conversation.md))

### Instruction Files

- **[Vertical Slice Planning](.github/instructions/vertical-slice-planning.instructions.md)** - Comprehensive guide for planning and analyzing vertical slice architecture implementations. Covers requirements analysis, slice identification strategies, dependency mapping, implementation sequencing, and brownfield integration. ([AI Log](ai-logs/2026/02/12/vertical-slice-planning-instr-20260212/conversation.md))

- **[Web Technologies Standards](.github/instructions/web-technologies.instructions.md)** - Canonical standards and best practices for HTML5, CSS3, and Vanilla JavaScript development. Covers semantic markup, accessibility (WCAG 2.1 AA), modern CSS layouts (Grid/Flexbox), responsive design, JavaScript module patterns, state management, performance optimization, security, and testing. ([AI Log](ai-logs/2026/02/12/web-tech-instructions-20260212/conversation.md))

## Repository Structure

```
AIASD-20260209/
├── .github/
│   ├── agents/          # Agent mode definitions
│   ├── instructions/    # Project instruction files
│   └── prompts/         # Reusable prompt templates
├── ai-logs/             # AI conversation logs and provenance
│   └── 2026/02/12/      # Date-structured logs
├── requirements/        # Product requirements and specifications
└── README.md           # This file
```

## Getting Started

This repository follows strict AI provenance tracking requirements. All AI-generated artifacts include:

- YAML front matter with generation metadata
- Links to conversation logs
- Operator identification and timestamps
- Model information

For details, see [AI-Assisted Output Instructions](.github/instructions/ai-assisted-output.instructions.md).

## Contributing

When adding AI-assisted artifacts:

1. Update this README with artifact description and link
2. Follow the [instruction files](.github/instructions/) for compliance

## Project Status

**Current Phase**: Requirements gathering and documentation
**Last Updated**: 2026-02-12

---

_This repository is part of the AI-Assisted Software Development (AIASD) initiative._
