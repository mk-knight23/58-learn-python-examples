# Visual Python Learning System — Design Master

> A living document for building a humane, visual-first Python learning experience.

---

## Philosophy

This system exists because code is abstract, and abstraction is a barrier to beginners. We bridge the gap by showing, not just telling. Every animation serves understanding. Every color choice reduces cognitive load. Every interaction respects the learner's time.

**Core belief**: Learning Python should feel like exploring, not memorizing.

---

## Color Palette

### Primary Colors

```
--purple-50:  #faf5ff   /* Background highlights */
--purple-100: #f3e8ff  /* Card backgrounds */
--purple-300: #d8b4fe  /* Secondary accents */
--purple-500: #a855f7  /* Primary purple */
--purple-600: #9333ea  /* Interactive hover */
--purple-700: #7e22ce  /* Deep accents */
```

### Secondary Colors (Teal family for success/completion states)

```
--teal-50:   #f0fdfa   /* Success backgrounds */
--teal-300:  #5eead4   /* Gentle highlights */
--teal-500:  #14b8a6   /* Success/completion */
--teal-600:  #0d9488   /* Interactive states */
```

### Warm Accents (Soft oranges for warmth, warnings)

```
--orange-50:  #fff7ed  /* Warm backgrounds */
--orange-300: #fdba74 /* Gentle warnings */
--orange-400: #fb923c /* Highlights */
--orange-500: #f97316 /* Primary warmth */
```

### Neutral Scale (Slate for text hierarchy)

```
--slate-50:   #f8fafc  /* Light mode backgrounds */
--slate-100:  #f1f5f9  /* Subtle backgrounds */
--slate-300:  #cbd5e1  /* Disabled states */
--slate-400:  #94a3b8  /* Secondary text */
--slate-500:  #64748b  /* Tertiary text */
--slate-600:  #475569  /* Body text */
--slate-700:  #334155  /* Strong text */
--slate-800:  #1e293b  /* Dark backgrounds */
--slate-900:  #0f172a  /* Deepest backgrounds */
--slate-950:  #020617  /* Near-black */
```

### Semantic Colors

| Purpose | Color | Hex | Usage |
|---------|-------|-----|-------|
| Accent/Primary | Purple 500 | `#a855f7` | Links, buttons, highlights |
| Success | Teal 500 | `#14b8a6` | Correct answers, completion |
| Warning | Orange 400 | `#fb923c` | Hints, gentle warnings |
| Error | Rose 500 | `#f43f5e` | Errors, incorrect paths |
| Code keyword | Purple 400 | `#c084fc` | Python keywords |
| Code string | Teal 300 | `#5eead4` | String literals |
| Code number | Orange 300 | `#fdba74` | Numeric literals |
| Code comment | Slate 500 | `#64748b` | Comments |

---

## Typography

### Font Stack

```css
--font-primary: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--font-mono: 'JetBrains Mono', 'Fira Code', 'SF Mono', Consolas, monospace;
```

### Type Scale

| Level | Size | Weight | Line Height | Usage |
|-------|------|--------|-------------|-------|
| Hero | 3rem (48px) | 800 | 1.1 | Page titles |
| H1 | 2rem (32px) | 700 | 1.2 | Section headers |
| H2 | 1.5rem (24px) | 600 | 1.3 | Card titles |
| H3 | 1.25rem (20px) | 600 | 1.4 | Subsection titles |
| Body | 1rem (16px) | 400 | 1.6 | Paragraphs |
| Small | 0.875rem (14px) | 400 | 1.5 | Descriptions |
| Caption | 0.75rem (12px) | 500 | 1.4 | Labels, metadata |
| Code | 0.875rem (14px) | 400 | 1.6 | Code blocks |

### Typography Patterns

- **Headings**: Tight tracking (-0.02em) for impact
- **Body**: Comfortable reading (1.6 line height)
- **Code**: Slightly smaller, monospace, generous horizontal padding
- **Labels**: Uppercase, wide tracking (0.05em), small size

---

## Animation Principles

### Purposeful Motion

Every animation must answer: *What does this teach?*

| Animation Type | Purpose | Duration | Easing |
|----------------|---------|----------|--------|
| **Swap** | Show element exchange in sorting | 400ms | `cubic-bezier(0.4, 0, 0.2, 1)` |
| **Compare** | Highlight elements being compared | 300ms | `ease-in-out` |
| **Insert** | Show placement in insertion sort | 350ms | `cubic-bezier(0.34, 1.56, 0.64, 1)` (slight bounce) |
| **Merge** | Demonstrate combining arrays | 500ms | `ease-out` |
| **Grow** | Show array element scaling | 200ms | `ease-out` |
| **Fade** | Transition between states | 150ms | `ease` |

### Timing Philosophy

- **Slow enough** to follow the logic
- **Fast enough** to not feel tedious
- **Pause on hover** to let learners examine state
- **Replayable** - always allow re-watching

### Stagger Patterns

```css
/* For revealing lists */
--stagger-base: 50ms;
--stagger-item: calc(var(--index) * var(--stagger-base));
```

---

## Layout Patterns

### The Split View (Primary Learning Pattern)

```
┌─────────────────────────────────────────────────────┐
│  [Sidebar]    │  [Code Panel]    │  [Visual Panel]  │
│  Navigation   │  Python source   │  Animation       │
│  - Topics     │  - Syntax high.  │  - Step-by-step  │
│  - Progress   │  - Line numbers  │  - Interactive   │
│  - Bookmarks  │  - Annotations   │  - Controls      │
└─────────────────────────────────────────────────────┘
```

**Ratio**: 1fr (sidebar) : 1.2fr (code) : 1.5fr (visual)

### Card Patterns

- **Standard card**: White background, subtle shadow, rounded-xl (12px)
- **Code card**: Dark background (slate-900), syntax highlighting
- **Visual card**: Generous padding, centered content, minimal borders
- **Navigation card**: Compact, hover state, active indicator

### Spacing System

| Token | Value | Usage |
|-------|-------|-------|
| `space-1` | 0.25rem (4px) | Tight gaps |
| `space-2` | 0.5rem (8px) | Internal padding |
| `space-3` | 0.75rem (12px) | Component gaps |
| `space-4` | 1rem (16px) | Standard gaps |
| `space-6` | 1.5rem (24px) | Section gaps |
| `space-8` | 2rem (32px) | Major sections |
| `space-12` | 3rem (48px) | Page sections |

---

## Visual Learning Patterns

### Code + Visualization Pairing

1. **Highlight coupling**: When code line N is active, visual shows step N
2. **Progressive reveal**: Don't show all code at once - unfold as learner progresses
3. **Scrubbability**: Allow jumping to any step, see code + visual state

### Color in Visualizations

- **Active element**: Purple 500 with glow
- **Comparing elements**: Teal 300 outline
- **Sorted portion**: Teal 500 (soft, "complete" feeling)
- **Unsorted portion**: Slate 400 (neutral)
- **Pivot/Key**: Orange 400 (stands out)

### Interactive States

| State | Visual Treatment |
|-------|------------------|
| Default | Subtle shadow, neutral border |
| Hover | Lift shadow, accent border hint |
| Active | Accent border, glow effect |
| Disabled | Reduced opacity, no interaction |
| Completed | Success color, check indicator |

---

## The Intentional Quirk

> **Cards have slightly uneven margins.**

Specifically: 
- Left padding is 4px more than right
- Top padding is 2px more than bottom
- This creates a subtle "hand-placed" feeling
- Prevents the sterile, "generated by a grid" aesthetic

```css
.card-with-quirk {
  padding: 18px 14px 16px 18px; /* top right bottom left */
}
```

Why? Perfect symmetry feels mechanical. Slight asymmetry feels human, approachable, less intimidating to beginners.

---

## The Tradeoff

> **We chose teaching clarity over algorithmic efficiency in animations.**

**What this means:**
- Animations are slower than "optimal" for learning
- We show intermediate states that real optimized code might skip
- Extra visual noise (borders, highlights) that pure code doesn't need

**Why we accepted this:**
- The goal is understanding, not production performance
- A learner who understands the slow version can mentally optimize
- Debugging a slow mental model is easier than debugging a black box

**The cost:**
- Power users might find it slow
- Large datasets (n > 50) won't visualize well
- We address this with "fast mode" toggle for experienced users

---

## The Limitation Accepted

> **No server-side Python execution.**

**What this means:**
- All Python code shown is static (pre-written)
- Visualizations are JavaScript/TypeScript implementations
- Users cannot edit and run arbitrary Python in the browser

**Why we accepted this:**
- Running user-submitted Python server-side is a security nightmare
- Browser-based Python (Pyodide/WASM) is heavy and slow to load
- Static code + curated visualizations provide 90% of the learning value

**Workarounds:**
- Clear instructions on how to run code locally
- Link to online Python interpreters (Replit, Python Tutor)
- Encourage local setup as a learning milestone

---

## Component Patterns

### Algorithm Card

```
┌────────────────────────────────────┐
│  [Icon]  Algorithm Name            │
│          O(n²) • Sorting           │
├────────────────────────────────────┤
│  Brief explanation...              │
│                                    │
│  [View Code] [Visualize]           │
└────────────────────────────────────┘
```

### Code Panel

```
┌────────────────────────────────────┐
│  1  def bubble_sort(arr):          │
│  2      for i in range(len(arr)):  │
│  3          # ← Active line        │
│  4          swapped = False        │
│  5          ...                    │
└────────────────────────────────────┘
     ↑ Line numbers, current step indicator
```

### Visual Panel (Sorting Example)

```
┌────────────────────────────────────┐
│                                    │
│   ██    ██  ████  ██    ████      │
│   ██    ██  ████  ██    ████      │
│   ██ ▲  ██  ████  ██ ▲  ████      │
│   ██    ██  ████  ██    ████      │
│   [5]   [3]  [8]  [2]   [7]       │
│    comparing...                   │
│                                    │
│  [<] [▶] [>]  Step 3 of 24        │
└────────────────────────────────────┘
```

---

## Responsive Behavior

### Breakpoints

| Name | Width | Behavior |
|------|-------|----------|
| Mobile | < 640px | Single column, stacked view |
| Tablet | 640-1024px | Sidebar collapses to drawer |
| Desktop | > 1024px | Full 3-column layout |

### Mobile Adaptations

- Code panel becomes bottom sheet
- Visualization takes full width
- Simplified controls (touch-friendly)
- Step-by-step replaces continuous animation

---

## Accessibility

### Required Support

- **Keyboard navigation**: Tab through all interactive elements
- **Screen reader**: All visualizations have text alternatives
- **Reduced motion**: Respect `prefers-reduced-motion`
- **Color contrast**: Minimum 4.5:1 for text

### Patterns

- Animation pause button always visible
- Alt text for every visualization step
- Focus rings on all interactive elements
- No information conveyed by color alone

---

## File Naming Conventions

```
skills/
  algorithms/
    sorting/
      bubble_sort.py          # Original Python
      bubble_sort.ts          # React component + visualization
      bubble_sort.test.ts     # Tests
      metadata.json           # Description, difficulty, tags
```

---

## Writing Style (UI Copy)

### Tone Guidelines

- **Clear over clever**: "Sort this array" not "Perform the magical sort ritual"
- **Conversational**: "Let's see how this works" not "The algorithm will now execute"
- **Encouraging**: "Try a different input" not "That input is invalid"
- **Precise**: Use correct technical terms ("time complexity" not "speed")

### Pattern Names in UI

- Use "Show me" not "Learn" (less prescriptive)
- Use "Try it" not "Practice" (more inviting)
- Use "Why this works" not "Explanation" (more curious)

---

## Version History

| Date | Change | Author |
|------|--------|--------|
| 2026-01-29 | Initial design system | System |

---

*This document is a living reference. Update it when adding new patterns, discovering issues, or refining the learning experience.*
