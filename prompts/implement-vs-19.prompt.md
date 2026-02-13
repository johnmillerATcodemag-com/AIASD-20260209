---
slice_id: VS-19
phase: 4
priority: P2
dependencies: VS-09
---

# Prompt: Implement VS-19 - Export Calculation History

## Goal

Enable exporting calculation history as CSV or plain text file.

## User Story

As a user, I want to export my calculation history for record-keeping or reporting.

## Implementation Steps

1. Add "Export" button to history panel
2. Implement exportCSV() - format history as comma-separated values
3. Implement exportText() - format as readable plaintext
4. Use Blob and download APIs to trigger file download
5. Add export format selector (CSV/TXT)
6. Include timestamp, expression, and result in exports
7. Handle empty history gracefully

## Acceptance Criteria

- [ ] Export button visible in history panel
- [ ] CSV format exports correctly (importable to Excel/Sheets)
- [ ] Text format is human-readable
- [ ] Includes all history items with timestamps
- [ ] Filename includes date
- [ ] Empty history shows appropriate message

## Verification Steps

1. Build calculation history (10 calculations)
2. Click Export → Choose CSV → Downloads "calculator-history-2026-02-12.csv"
3. Open in Excel → Properly formatted columns
4. Export as TXT → Downloads readable text file
5. Test with empty history → No error, message shown

## Showcase (2 min)

- Show history with multiple calculations
- Export to CSV → Open in spreadsheet → Perfect formatting
- Export to TXT → Share via email/docs
- **Key Message**: "Your calculations, your records. Export for taxes, reports, or record-keeping."
