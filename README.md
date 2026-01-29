# Visual Python Learning System

A React-based visual learning platform for Python concepts. Built to make abstract programming ideas tangible through interactive animations and hands-on code exploration.

---

## Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS v4
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Build**: Vite 6

---

## Live Links

- **GitHub Pages**: https://mk-knight23.github.io/25-python-mixed-examples/
- **Vercel**: https://25-python-mixed-examples.vercel.app
- **Netlify**: N/A

---

## How to Run Locally

```bash
# Clone the repository
git clone https://github.com/mk-knight23/25-python-mixed-examples.git
cd 25-python-mixed-examples

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

To run Python code locally:
```bash
# Navigate to any skill folder
cd skills/basics

# Run the Python file
python3 hello_world.py
```

---

## What Will I Learn?

This system covers three main areas:

**Python Basics** — Variables, loops, functions, and recursion explained with visual context. Not just syntax—understanding _why_ things work.

**Algorithms** — Sorting and searching algorithms animated step-by-step. Watch bubble sort "bubble" elements to the end. See binary search eliminate half the array with each comparison.

**Mini Projects** — Complete programs you can build and run: games, utilities, and tools that demonstrate real-world Python usage.

---

## Who Is This For?

- **Absolute beginners** who learn better by seeing than by reading
- **Self-taught developers** filling gaps in their foundations
- **Students** preparing for technical interviews who need to _understand_ algorithms, not just memorize them
- **Teachers** looking for visual aids for programming concepts

---

## How Should I Go Through This?

1. **Start with Basics** — Even if you know some Python, the visual approach might clarify things you half-understood.

2. **Don't just watch** — Copy the code and run it locally. Modify it. Break it. Fix it.

3. **Use the visualizations actively** — Pause sorting animations. Predict the next step. Check if you were right.

4. **Build the projects** — The projects are starting points, not endpoints. Extend them.

---

## Why This Structure?

The `/skills/` folder organization reflects how we actually learn: 

- **Basics** are foundational patterns used everywhere
- **Algorithms** build on basics to solve specific problems efficiently
- **Projects** combine multiple concepts into useful programs

Each skill includes:
- Clean, commented Python code
- Explanations of _why_ it works, not just _how_
- Difficulty rating and time estimate
- Related concepts for connecting ideas

---

## Design Notes

### Intentional Quirk
Cards have slightly uneven margins (left padding is 4px more than right). This creates a subtle "hand-placed" feeling—less sterile, more approachable.

### Tradeoff Made
We chose teaching clarity over algorithmic efficiency in animations. Sorting visualizations are slower than optimal so you can follow each comparison and swap. A learner who understands the slow version can mentally optimize; the reverse isn't true.

### Limitation Accepted
There's no server-side Python execution. All code is static, and visualizations are JavaScript implementations. Running user-submitted Python securely is complex, and browser-based Python (WASM) is heavy. We provide clear instructions for running code locally instead.

### What I Didn't Build
- **User accounts/progress tracking** — Complexity without proportional value
- **Code execution in browser** — Security and performance concerns
- **Mobile-optimized visualizations** — The screen real estate just isn't there
- **Advanced algorithms** — Dijkstra, graph traversals, dynamic programming (future scope)

---

## Project Structure

```
/skills/
  /basics/          — Python fundamentals
  /algorithms/      — Sorting, searching
  /projects/        — Complete programs

/frontend/
  src/
    components/     — React components
    data/           — Python code snippets
    styles/         — CSS with animations

design-system/
  MASTER.md         — Design principles, colors, patterns
```

---

## Contributing

This is a personal learning project, but suggestions are welcome. If you find bugs in the code or have ideas for better visualizations, open an issue.

---

## License

MIT — Use the code, learn from it, build something better.

---

*Built because I needed to understand these concepts myself. Sharing in case it helps you too.*
