### AI-Powered Validation Approach

The workflow above uses an AI-powered validation approach instead of complex bash scripts. This provides several benefits:

**Advantages**:

- **Intelligent Parsing**: AI can understand YAML structure, markdown, and various formatting styles without brittle regex
- **Contextual Understanding**: AI can interpret requirements and edge cases that would require extensive scripting
- **Natural Language Rules**: Validation rules are written in plain English, making them easier to understand and update
- **Adaptive**: AI can handle variations in formatting and provide helpful error messages

**Alternative Implementations**:

If the `github/copilot-actions/validate-ai-provenance` action is not available in your environment, you can implement AI-powered validation using:

1. **GitHub Copilot CLI** (if available):

```yaml
- name: AI-Powered Validation with Copilot CLI
  run: |
    # Install GitHub Copilot CLI if needed
    gh copilot suggest "Validate the following files for AI provenance compliance: $(cat changed_files.txt)"
```

2. **Custom Action with OpenAI/Azure OpenAI**:

```yaml
- name: AI Validation with OpenAI
  env:
    OPENAI_API_KEY: ${{ secrets.OPENAI_API_KEY }}
  run: |
    python scripts/ai-validate-provenance.py \
      --files "${{ steps.changed-files.outputs.files }}" \
      --policy .github/instructions/ai-assisted-output.instructions.md \
      --model gpt-4o
```

3. **Fallback: Traditional Script Validation**:
   For teams without AI model access, a traditional bash/PowerShell script can still be used. See the git history of this file for the previous bash-based implementation.

**Custom AI Validation Script** (`scripts/ai-validate-provenance.py`):

```python
#!/usr/bin/env python3
"""AI-powered provenance validation using OpenAI or Azure OpenAI"""

import os
import sys
import argparse
from pathlib import Path
import openai

def validate_files(files, policy_file, model="gpt-4o"):
    """Use AI model to validate provenance of changed files"""

    # Read policy
    with open(policy_file, 'r') as f:
        policy_content = f.read()

    # Read changed files
    file_contents = {}
    for file_path in files:
        if Path(file_path).exists():
            with open(file_path, 'r') as f:
                file_contents[file_path] = f.read()

    # Construct AI prompt
    prompt = f"""
You are an AI provenance validator for a software repository.

POLICY:
{policy_content}

CHANGED FILES:
{chr(10).join(f"=== {path} ==={chr(10)}{content}" for path, content in file_contents.items())}

Validate each file against the policy requirements. For each violation:
- Output: ::error file={{filename}}::{{error description}}

If all files pass validation:
- Output: ✅ All AI provenance requirements met

Return exit code 0 if valid, 1 if violations found.
"""

    # Call AI model
    client = openai.OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

    response = client.chat.completions.create(
        model=model,
        messages=[
            {"role": "system", "content": "You are a code compliance validator."},
            {"role": "user", "content": prompt}
        ],
        temperature=0
    )

    result = response.choices[0].message.content
    print(result)

    # Check for validation failures
    if "::error" in result:
        return 1
    return 0

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--files", required=True, help="Newline-separated list of files")
    parser.add_argument("--policy", required=True, help="Path to policy file")
    parser.add_argument("--model", default="gpt-4o", help="AI model to use")

    args = parser.parse_args()
    files = [f.strip() for f in args.files.split('\n') if f.strip()]

    exit_code = validate_files(files, args.policy, args.model)
    sys.exit(exit_code)
```

**Configuration Notes**:

- Store API keys in GitHub Secrets (`OPENAI_API_KEY`, `AZURE_OPENAI_KEY`)
- Use `gpt-4o` or `gpt-4-turbo` for best results
- For Azure OpenAI, modify the script to use Azure endpoints
- Consider caching validation results for unchanged files
