$file = "c:\git\AIASD\AIASD-20260209\.github\instructions\ai-assisted-output.instructions.md"
$content = Get-Content $file -Raw -Encoding UTF8

# Read the new section
$newSectionFile = "c:\git\AIASD\AIASD-20260209\ai-validation-section.md"
$newSection = Get-Content $newSectionFile -Raw -Encoding UTF8

# Define what to replace
$oldText = @"
Note: This example uses bash and is compatible with Linux/macOS runners. For Windows runners, adapt the script to PowerShell or use WSL. For non-GitHub CI systems, apply equivalent logic in your platform's scripting language. README updates are typically verified during PR review rather than automated CI checks (teams may extend CI to detect new AI-generated files and verify corresponding README entries if desired).
"@

$newText = $newSection.TrimEnd() + "`r`n`r`nNote: README updates are typically verified during PR review rather than automated CI checks (teams may extend CI to detect new AI-generated files and verify corresponding README entries if desired)."

# Replace
if ($content -like "*$oldText*") {
    $content = $content.Replace($oldText, $newText)
    Set-Content $file -Value $content -Encoding UTF8 -NoNewline
    Write-Host "✅ Successfully replaced the section"
}
else {
    Write-Host "❌ Could not find the old text to replace"
    Write-Host "Searching for partial match..."
    if ($content -like "*Note: This example uses bash*") {
        Write-Host "Found 'Note: This example uses bash' in file"
    }
}
