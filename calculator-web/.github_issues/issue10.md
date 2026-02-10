**Problem:**
All user-facing text is hardcoded in English with no internationalization (i18n) support:

- UI labels, buttons, and messages are hardcoded
- Error messages are in English only
- No support for different locales or cultures
- No number formatting based on culture

**Current Issues:**

- Calculator button labels: hardcoded in Index.cshtml
- Error messages: hardcoded in IndexModel.cs
- JavaScript messages: hardcoded in inline script
- No resource files (.resx) for localization

**Impact:**

- Cannot support non-English speaking users
- Limited market reach
- Difficult to add translations later (requires significant refactoring)
- Number formats (decimal separators) not culturally appropriate

**Recommendation:**

1. Add resource files for localization:
   - Resources/Strings.resx (default English)
   - Resources/Strings.es.resx (Spanish)
   - Resources/Strings.fr.resx (French, etc.)

2. Use IStringLocalizer in Razor pages:

   ```csharp
   @inject IStringLocalizer<IndexModel> Localizer
   <button>@Localizer["Calculate"]</button>
   ```

3. Configure localization in Program.cs:

   ```csharp
   builder.Services.AddLocalization(options =>
       options.ResourcesPath = "Resources");
   ```

4. Add culture selection UI
5. Use culture-specific number formatting
6. Consider JavaScript localization for client-side messages

**Note:**
While not critical for all applications, adding i18n support early makes the codebase more evergreen and future-proof.

**Severity:** Low (Future-proofing, depends on business requirements)
