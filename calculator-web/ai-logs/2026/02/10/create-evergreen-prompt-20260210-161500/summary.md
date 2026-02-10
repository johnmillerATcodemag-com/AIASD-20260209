# Session Summary: Create Evergreen Software Development Prompt

**Session ID**: create-evergreen-prompt-20260210-161500
**Date**: 2026-02-10
**Operator**: JohnM
**Model**: anthropic/claude-3.5-sonnet@2024-10-22
**Duration**: 00:10:00

## Objective

Create a comprehensive prompt file that will guide the generation of an instruction file for evergreen software development - software that remains continuously relevant, updated, and modern through sustainable development practices.

## Work Completed

### Primary Deliverables

1. **Evergreen Software Prompt File** (`.github/prompts/create-evergreen-software-instructions.prompt.md`)
   - Comprehensive prompt structure for generating evergreen software instruction file
   - Covers 13 major topic areas from philosophy to implementation
   - Includes quality requirements and success criteria
   - Specifies exact output format and structure
   - Integrates with existing project instruction policies

### Key Features Included

The prompt file defines requirements for the following sections in the target instruction file:

1. **Evergreen Philosophy**: Core principles of continuous evolution and future-proofing
2. **Architecture Principles**: Modular design, dependency abstraction, feature flags, version tolerance
3. **Code Quality Standards**: Testing, static analysis, code reviews, refactoring discipline
4. **Dependency Management**: Automated updates, semantic versioning, security scanning
5. **Documentation Practices**: Living documentation, ADRs, API docs, changelogs
6. **CI/CD**: Build automation, deployment pipelines, rollback capabilities
7. **Monitoring & Observability**: Logging, tracing, metrics, alerting
8. **Security Practices**: Shift-left security, scanning, secrets management
9. **Update & Maintenance Workflows**: Regular update cycles, deprecation strategy
10. **Team Practices**: Pair programming, knowledge sharing, retrospectives
11. **Technology Currency**: Framework updates, best practices adherence
12. **Quality Gates**: Test coverage, build success, security scans
13. **AI-Assisted Development**: Provenance tracking, review requirements

## Key Decisions

### Comprehensive Scope

**Decision**: Include 13 major topic areas covering all aspects of evergreen software
**Rationale**:

- Evergreen software requires holistic approach, not just code quality
- Need to address architecture, security, monitoring, team practices
- Comprehensive coverage ensures long-term maintainability
- Prevents gaps that could cause technical debt accumulation

### Prescriptive Yet Pragmatic Tone

**Decision**: Specify clear requirements while allowing flexibility for context
**Rationale**:

- Teams need concrete guidance, not just vague principles
- Different projects may require adaptations of the approach
- Balance between standards enforcement and practical implementation
- Educational explanations help teams understand the "why"

### Integration with Existing Policies

**Decision**: Ensure compatibility with AI-assisted output policy and other project instructions
**Rationale**:

- Maintain consistency across instruction files
- Leverage existing provenance and quality standards
- Avoid conflicts between different instruction sets
- Support unified development workflow

### Tool-Agnostic Approach

**Decision**: Prefer principles over specific tool recommendations where possible
**Rationale**:

- Technologies and tools evolve rapidly
- Principles have longer shelf-life than specific tools
- Teams may have different tooling preferences
- Focus on outcomes rather than specific implementations
- Suggest examples but don't mandate specific solutions

## Artifacts Produced

| Artifact                                                                     | Type             | Purpose                                                  |
| ---------------------------------------------------------------------------- | ---------------- | -------------------------------------------------------- |
| `.github/prompts/create-evergreen-software-instructions.prompt.md`           | Prompt File      | Guides generation of evergreen software instruction file |
| `ai-logs/2026/02/10/create-evergreen-prompt-20260210-161500/conversation.md` | Conversation Log | Documents AI-assisted creation process                   |
| `ai-logs/2026/02/10/create-evergreen-prompt-20260210-161500/summary.md`      | Session Summary  | High-level overview for resumability                     |

## Lessons Learned

1. **Comprehensive Coverage Essential**: Evergreen software requires attention to architecture, code quality, operations, security, and team practices - no single area is sufficient
2. **Living Documentation Critical**: The instruction file itself must be maintained and updated as an evergreen artifact
3. **Measurable Criteria Important**: Abstract principles alone are insufficient; need concrete, measurable quality gates
4. **Automation Enablement**: Instruction files should define requirements that can be enforced through CI/CD automation
5. **Context Awareness**: Balance prescriptive guidance with flexibility for different project contexts and constraints

## Next Steps

### Immediate

- ✅ Create conversation log
- ✅ Create summary file
- [ ] Update README.md with entry for new prompt file
- [ ] Optionally: Execute the prompt to generate the actual `.github/instructions/evergreen-software.instructions.md` file

### Future Enhancements

- Create CI/CD checks to validate adherence to evergreen practices
- Develop audit tools to assess existing codebases against evergreen standards
- Generate templates/scaffolding for evergreen-compliant projects
- Create migration guides for bringing legacy codebases to evergreen standards
- Develop metrics dashboard for tracking evergreen compliance over time

## Compliance Status

✅ AI provenance metadata complete in prompt file
✅ Conversation log created with full context
✅ Summary file created with resumability context
✅ Proper file structure and naming conventions followed
✅ Integration with existing instruction policies
⚠️ README.md update pending
⚠️ Actual instruction file not yet generated (prompt created, but not executed)

## Chat Metadata

```yaml
chat_id: create-evergreen-prompt-20260210-161500
started: 2026-02-10T16:15:00Z
ended: 2026-02-10T16:15:00Z
total_duration: 00:10:00
operator: JohnM
model: anthropic/claude-3.5-sonnet@2024-10-22
artifacts_count: 3
files_modified: 0
files_created: 3
```

---

**Summary Version**: 1.0.0
**Created**: 2026-02-10T16:15:00Z
**Format**: Markdown
