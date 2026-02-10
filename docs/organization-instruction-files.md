Yes — GitHub Copilot for Business and GitHub Copilot for Enterprise both support organization‑wide instruction files, and this capability is officially documented.
Here’s the key evidence:
✅ What GitHub Supports
GitHub’s documentation explicitly states that you can create organization custom instructions that apply to all members of the org using Copilot. These are persistent instruction files that shape Copilot’s behavior across repositories and teams.
This sits alongside:
- Personal custom instructions
- Repository‑level custom instructions
- Path‑scoped instruction files (supported across Copilot features, including code review)
🧩 How Organization‑Wide Instructions Work
Organization‑level instruction files allow you to:
- Standardize coding conventions, security rules, and architectural patterns across teams.
- Provide compliance or regulatory guardrails.
- Ensure consistent behavior from Copilot for all developers in the org.
- Reduce the need for repeated prompt engineering in every repo.
These files are stored and managed at the organization level, not per repository.
🏢 Business vs. Enterprise
GitHub does not differentiate this feature between Copilot for Business and Copilot for Enterprise in the documentation — both tiers support organization custom instructions.
Enterprise adds additional governance, audit, and policy controls, but the instruction‑file capability itself is available in both
