# Commit Changes with Consistent Message Format

Follow this pattern when committing code to git:

## Commit Message Format

```
<type>: <subject>

<body>

🤖 Generated with Claude Code

Co-Authored-By: Claude <noreply@anthropic.com>
```

## Guidelines

### Commit Type
Use one of:
- `feat:` - New feature
- `fix:` - Bug fix
- `refactor:` - Code refactoring without behavior change
- `docs:` - Documentation updates only
- `test:` - Tests or test-related changes
- `style:` - Code style, formatting, linting (no functional change)
- `chore:` - Maintenance, build, dependencies (no functional change)

### Subject Line
- Imperative mood ("add feature" not "added feature")
- Lowercase
- No period at end
- Max 50 characters
- Be specific and clear

### Body (Optional but Recommended)
- Explain *what* and *why*, not *how*
- Wrap at 72 characters
- Separate from subject with blank line
- Use bullet points for multiple changes

### Example Commits

**Simple fix:**
```
fix: prevent cards from being clickable during processing

The isProcessing flag wasn't being checked in handleCardClick(),
allowing users to click cards while match evaluation was running.
Now properly gates all card clicks during evaluation.

🤖 Generated with Claude Code

Co-Authored-By: Claude <noreply@anthropic.com>
```

**Feature with details:**
```
feat: add mute button for sound effects

- Adds mute button (🔊/🔇) to control audio
- Persists isMuted state during session
- Updates ARIA label for accessibility
- No audio plays when muted

🤖 Generated with Claude Code

Co-Authored-By: Claude <noreply@anthropic.com>
```

**Documentation update:**
```
docs: update README with testing instructions

Added section on running automated tests with /test command,
including what gets tested and where screenshots are saved.

🤖 Generated with Claude Code

Co-Authored-By: Claude <noreply@anthropic.com>
```

## How to Use

1. Stage your changes: `git add <files>`
2. Create commit with proper message format following the pattern above
3. Always include the footer with Claude Code attribution

## Pro Tips

- Keep commits focused on a single concern
- Write meaningful messages that future developers will appreciate
- Reference related issues or PRs in the body if applicable
- Use the commit type consistently across the project
