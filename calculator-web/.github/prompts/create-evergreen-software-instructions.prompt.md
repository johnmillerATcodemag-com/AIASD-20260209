---
ai_generated: true
model: "anthropic/claude-3.5-sonnet@2024-10-22"
operator: "JohnM"
chat_id: "create-evergreen-prompt-20260210-161500"
prompt: |
  Create a prompt file that creates an instruction file for evergreen software development
started: "2026-02-10T16:15:00Z"
ended: "2026-02-10T16:15:00Z"
task_durations:
  - task: "analyze requirements"
    duration: "00:02:00"
  - task: "design prompt structure"
    duration: "00:03:00"
  - task: "create prompt content"
    duration: "00:05:00"
total_duration: "00:10:00"
ai_log: "ai-logs/2026/02/10/create-evergreen-prompt-20260210-161500/conversation.md"
source: "JohnM"
applyTo: "**/*"
---

# Prompt: Create Evergreen Software Development Instructions

## Objective

Generate comprehensive instruction file for developing and maintaining evergreen software - software that remains continuously relevant, updated, and modern through sustainable development practices.

## Target Output

Create `.github/instructions/evergreen-software.instructions.md` with complete guidance for building software that:

- Stays current with evolving technologies and best practices
- Maintains continuous relevance over time
- Self-heals and adapts to changing requirements
- Follows sustainable, long-term development approaches
- Minimizes technical debt accumulation
- Enables seamless updates and modernization

## Required Sections

### 1. Evergreen Philosophy

Define the core principles:

- **Continuous Evolution**: Software as a living system, not a fixed artifact
- **Future-Proof Architecture**: Design for change, not just current requirements
- **Sustainable Velocity**: Balance speed with long-term maintainability
- **Automated Currency**: Self-updating dependencies, documentation, and practices
- **Reversible Decisions**: Prefer choices that can be changed later
- **Progressive Enhancement**: Add capabilities without breaking existing functionality

### 2. Architecture Principles

Specify patterns that support evergreen development:

- **Modular Design**: Small, independent components with clear boundaries
- **Dependency Abstraction**: Inversion of control, interface-based design
- **Feature Flags**: Runtime configuration for gradual rollouts
- **Version Tolerance**: Support multiple API/protocol versions simultaneously
- **Backward Compatibility**: Maintain contracts while evolving internals
- **Forward Compatibility**: Design for anticipated future needs
- **Clean Boundaries**: Separation of concerns, hexagonal architecture
- **Event-Driven Architecture**: Loose coupling through async messaging

### 3. Code Quality Standards

Define guidelines for maintainable code:

- **Self-Documenting Code**: Clear naming, minimal comments needed
- **Test Automation**: Comprehensive unit, integration, and E2E tests
- **Static Analysis**: Automated linting, type checking, security scanning
- **Code Reviews**: Mandatory peer review for all changes
- **Refactoring Discipline**: Regular improvement cycles
- **Technical Debt Management**: Track, prioritize, and systematically address debt
- **Performance Budgets**: Define and enforce performance constraints
- **Accessibility Standards**: WCAG compliance, semantic HTML

### 4. Dependency Management

Establish update strategies:

- **Automated Updates**: Dependabot, Renovate, or similar tools
- **Semantic Versioning**: Strict adherence to semver principles
- **Dependency Pinning**: Lock files for reproducible builds
- **Security Scanning**: Automated vulnerability detection
- **Update Cadence**: Regular scheduled update cycles
- **Breaking Change Strategy**: Migration guides, deprecation warnings
- **Minimal Dependencies**: Favor standard library, evaluate necessity
- **License Compliance**: Track and validate all dependency licenses

### 5. Documentation Practices

Require living documentation:

- **README-Driven Development**: Define interfaces before implementation
- **Architecture Decision Records (ADRs)**: Document significant choices
- **API Documentation**: OpenAPI/Swagger, generated from code
- **Inline Documentation**: JSDoc, XML comments, docstrings
- **Changelog Maintenance**: Keep CHANGELOG.md current
- **Migration Guides**: Clear upgrade paths between versions
- **Onboarding Docs**: How to get started for new contributors
- **Troubleshooting Guides**: Common issues and solutions

### 6. Continuous Integration/Deployment

Define automation requirements:

- **Build Automation**: Reproducible builds on any machine
- **Automated Testing**: Run full test suite on every commit
- **Static Analysis**: Fail builds on linting/security issues
- **Deployment Pipeline**: Automated deployments to staging/production
- **Rollback Capability**: One-click rollback to previous version
- **Blue-Green Deployments**: Zero-downtime updates
- **Canary Releases**: Gradual rollout with monitoring
- **Feature Flags**: Runtime feature toggling

### 7. Monitoring & Observability

Require production visibility:

- **Structured Logging**: JSON logs with context
- **Distributed Tracing**: Request flow across services
- **Metrics Collection**: Performance, errors, business metrics
- **Alerting**: Automated notifications for critical issues
- **Dashboard**: Real-time system health visualization
- **Error Tracking**: Sentry, Rollbar, or similar
- **Performance Monitoring**: APM tools, Real User Monitoring
- **Audit Logging**: Track security-relevant events

### 8. Security Practices

Establish security requirements:

- **Shift-Left Security**: Security from design phase
- **Automated Security Scanning**: SAST, DAST, dependency checks
- **Secrets Management**: Never commit secrets, use vault solutions
- **Principle of Least Privilege**: Minimal permissions everywhere
- **Security Headers**: CSP, HSTS, X-Frame-Options
- **Input Validation**: Validate and sanitize all user input
- **Output Encoding**: Prevent injection attacks
- **Authentication/Authorization**: OAuth2, JWT, RBAC
- **Encryption**: At rest and in transit
- **Security Patches**: Rapid response to vulnerabilities

### 9. Update & Maintenance Workflows

Define maintenance processes:

- **Monthly Dependency Updates**: Review and apply updates
- **Quarterly Architecture Review**: Assess design decisions
- **Annual Technology Audit**: Evaluate stack currency
- **Deprecation Strategy**: Announce, warn, remove (with timeline)
- **Breaking Change Process**: Major version, migration guide
- **Hotfix Procedures**: Fast-track critical fixes
- **Post-Mortem Practice**: Learn from incidents
- **Technical Debt Sprints**: Dedicated refactoring time

### 10. Team Practices

Establish team workflows:

- **Pair Programming**: Knowledge sharing, quality improvement
- **Code Ownership**: Shared responsibility, not siloes
- **Blameless Post-Mortems**: Focus on systems, not individuals
- **Continuous Learning**: Time for training and exploration
- **Documentation Updates**: Update docs with code changes
- **Knowledge Sharing**: Internal talks, documentation, wikis
- **Onboarding Process**: Structured new developer ramp-up
- **Retrospectives**: Regular process improvement meetings

### 11. Technology Currency

Keep stack modern:

- **Framework Updates**: Stay within N-1 or N-2 major versions
- **Language Versions**: Use supported versions, plan migrations
- **Tool Updates**: Keep dev tools current
- **Best Practices**: Follow community recommendations
- **Standards Compliance**: Web standards, accessibility, security
- **Performance Best Practices**: Modern optimization techniques
- **Browser Support**: Define and maintain support matrix
- **Cloud Services**: Use managed services, stay current on platform features

### 12. Quality Gates

Define merge/release requirements:

- **Test Coverage**: Minimum 80% code coverage
- **Build Success**: All CI checks pass
- **Code Review**: At least one approval
- **Documentation**: Updated for all public APIs
- **Changelog**: Changes documented
- **Security Scan**: No high/critical vulnerabilities
- **Performance**: No regressions in key metrics
- **Accessibility**: Pass automated accessibility checks

### 13. AI-Assisted Development Integration

Guidelines for AI tooling:

- **Provenance Tracking**: All AI-generated code must be documented
- **Review Requirements**: Human review of all AI suggestions
- **Testing Standard**: AI code requires same test coverage
- **Documentation**: AI-generated code needs clear documentation
- **Security Review**: Extra scrutiny for AI-generated security code
- **License Compliance**: Verify AI suggestions don't violate licenses
- **Code Quality**: AI code meets same standards as human code
- **Learning Opportunity**: Use AI suggestions as teaching moments

## Output Format

Structure the instruction file as follows:

```markdown
---
applyTo: "**/*"
---

# Evergreen Software Development Instructions

## Overview

[Brief introduction to evergreen software philosophy]

## Core Principles

[List fundamental principles]

## Architecture Guidelines

[Detailed architecture patterns and requirements]

## Code Quality Standards

[Quality requirements and practices]

[... continue with all sections above ...]

## Compliance Checklist

[Checkbox list for verifying adherence]

## Enforcement

[CI/CD integration for automated checks]

## Resources

[Links to tools, frameworks, and further reading]

## Version History

[Track updates to this instruction file]
```

## Quality Requirements

The generated instruction file must:

- Be comprehensive yet concise
- Provide actionable, specific guidance (not vague principles)
- Include code examples where applicable
- Reference industry-standard tools and frameworks
- Be compatible with the existing AI-assisted output policy
- Include practical checklists for implementation
- Define measurable compliance criteria
- Support both greenfield and brownfield projects

## Integration Requirements

Ensure the instruction file:

- References and complies with `.github/instructions/ai-assisted-output.instructions.md`
- Uses consistent terminology with existing project instructions
- Defines clear applyTo scope (typically `**/*` for all files)
- Includes enforcement mechanisms (CI checks, linting rules)
- Provides migration guidance for existing codebases

## Success Criteria

The instruction file should enable:

1. New team members to understand evergreen development approach
2. Existing codebases to be assessed against evergreen standards
3. Automated tooling to enforce evergreen practices
4. Continuous improvement of development practices
5. Long-term maintainability and relevance of software products

## Additional Context

Consider current industry trends:

- Shift to cloud-native architectures
- Increased focus on developer experience
- Rise of AI-assisted development
- Growing importance of supply chain security
- Emphasis on observability and reliability
- Platform engineering best practices
- Inner source and open source contributions
- Sustainable software engineering practices

## Tone and Style

- **Prescriptive but pragmatic**: Clear requirements with flexibility for context
- **Educational**: Explain the "why" behind practices
- **Tool-agnostic where possible**: Prefer principles over specific tools
- **Example-driven**: Include concrete examples
- **Living document**: Design for updates as practices evolve
