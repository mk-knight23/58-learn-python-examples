import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Zap, Layers, Binary, Cpu, Compass, Play, RotateCcw, ChevronRight, BarChart3, PieChart, Network, Settings2, Github, Share2, Info } from 'lucide-react';
import { useState, useEffect } from 'react';

const ALGORITHMS = [
    { id: 'bubble', name: 'Bubble Sort', category: 'Sorting', complexity: 'O(n²)', color: 'from-purple-500 to-indigo-500' },
    { id: 'binary', name: 'Binary Search', category: 'Searching', complexity: 'O(log n)', color: 'from-blue-500 to-cyan-500' },
    { id: 'dijkstra', name: 'Dijkstra', category: 'Graph', complexity: 'O(E log V)', color: 'from-emerald-500 to-teal-500' },
    { id: 'fib', name: 'Fibonacci', category: 'DP', complexity: 'O(n)', color: 'from-rose-500 to-orange-500' }
];

export default function App() {
    const [selectedAlgo, setSelectedAlgo] = useState(ALGORITHMS[0]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [array, setArray] = useState<number[]>([]);

    useEffect(() => {
        generateNewArray();
    }, []);

    const generateNewArray = () => {
        const newArray = Array.from({ length: 15 }, () => Math.floor(Math.random() * 80) + 20);
        setArray(newArray);
        setIsPlaying(false);
    };

    return (
        <div className="min-h-screen">
            {/* Background Decor */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
                <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-accent/5 blur-[150px] rounded-full" />
                <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-blue-500/5 blur-[150px] rounded-full" />
            </div>

            {/* Header */}
            <header className="fixed top-0 left-0 right-0 h-24 border-b border-white/5 bg-slate-950/50 backdrop-blur-2xl z-50 px-8">
                <div className="max-w-7xl mx-auto h-full flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-accent rounded-2xl shadow-lg shadow-accent/20">
                            <Binary className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-xl font-black text-white uppercase tracking-tighter">Algo<span className="text-accent">Viz</span></h1>
                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Algorithm Visualization Lab</p>
                        </div>
                    </div>

                    <div className="hidden lg:flex items-center gap-8">
                        {['Algorithms', 'Education', 'Benchmarks', 'Community'].map((item) => (
                            <a key={item} href="#" className="text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-white transition-colors">{item}</a>
                        ))}
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="p-3 hover:bg-white/5 rounded-xl transition-all text-slate-400 hover:text-white">
                            <Settings2 className="w-5 h-5" />
                        </button>
                        <button className="px-8 py-3 bg-accent hover:bg-accent/80 text-white font-black rounded-xl transition-all text-xs uppercase tracking-widest shadow-xl shadow-accent/20">
                            Sign In
                        </button>
                    </div>
                </div>
            </header>

            <main className="pt-32 pb-20 max-w-7xl mx-auto px-8">
                <div className="grid lg:grid-cols-4 gap-12">
                    {/* Controls & List */}
                    <aside className="lg:col-span-1 space-y-10">
                        <section>
                            <h2 className="text-xs font-black text-slate-500 uppercase tracking-[0.3em] mb-6">Select Library</h2>
                            <div className="space-y-3">
                                {ALGORITHMS.map((algo) => (
                                    <button
                                        key={algo.id}
                                        onClick={() => setSelectedAlgo(algo)}
                                        className={`w-full p-4 rounded-2xl flex items-center justify-between group transition-all ${selectedAlgo.id === algo.id ? 'bg-accent text-white' : 'bg-white/5 text-slate-400 hover:bg-white/10'}`}
                                    >
                                        <span className="text-sm font-bold uppercase tracking-tight">{algo.name}</span>
                                        <ChevronRight className={`w-4 h-4 transition-transform ${selectedAlgo.id === algo.id ? 'translate-x-1' : 'opacity-0 group-hover:opacity-100'}`} />
                                    </button>
                                ))}
                            </div>
                        </section>

                        <section className="glow-card p-6 bg-accent/10 border-accent/20">
                            <Info className="w-6 h-6 text-accent mb-4" />
                            <h3 className="text-white font-bold mb-2 uppercase text-xs tracking-widest leading-relaxed">System complexity</h3>
                            <div className="text-2xl font-black text-white mb-2">{selectedAlgo.complexity}</div>
                            <p className="text-[10px] text-slate-500 font-medium uppercase tracking-widest">Average case performance</p>
                        </section>
                    </aside>

                    {/* Visualizer Area */}
                    <div className="lg:col-span-3 space-y-12">
                        <section className="glow-card min-h-[500px] flex flex-col relative overflow-hidden">
                            <div className="absolute top-8 left-8 flex items-center gap-3">
                                <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${selectedAlgo.color}`} />
                                <h2 className="text-lg font-black text-white uppercase tracking-tighter">{selectedAlgo.name} Visualization</h2>
                            </div>

                            <div className="absolute top-8 right-8 flex items-center gap-3">
                                <button onClick={generateNewArray} className="p-3 bg-white/5 hover:bg-white/10 rounded-xl text-slate-400 group">
                                    <RotateCcw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
                                </button>
                                <button
                                    onClick={() => setIsPlaying(!isPlaying)}
                                    className={`px-8 py-3 rounded-xl flex items-center gap-3 font-black text-xs uppercase tracking-widest transition-all ${isPlaying ? 'bg-rose-500 text-white shadow-rose-500/20 shadow-xl' : 'bg-white text-slate-900 shadow-white/20 shadow-xl'}`}
                                >
                                    {isPlaying ? <Activity className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                                    {isPlaying ? 'PAUSE' : 'VISUALIZE'}
                                </button>
                            </div>

                            {/* Bars Visualizer */}
                            <div className="flex-1 flex items-end justify-center gap-3 px-10 pb-20 pt-32">
                                <AnimatePresence>
                                    {array.map((value, idx) => (
                                        <motion.div
                                            key={`${idx}-${value}`}
                                            initial={{ scaleY: 0 }}
                                            animate={{ scaleY: 1 }}
                                            transition={{ delay: idx * 0.02 }}
                                            className="flex-1 visualizer-node origin-bottom"
                                            style={{
                                                height: `${value}%`,
                                                background: `linear-gradient(to top, #a100ff, #a855f7)`
                                            }}
                                        />
                                    ))}
                                </AnimatePresence>
                            </div>

                            <div className="p-6 border-t border-white/5 bg-black/20 flex justify-between items-center text-[10px] font-black tracking-widest uppercase text-slate-500">
                                <span className="flex items-center gap-2"><Cpu className="w-3 h-3" /> Runtime: Dynamic</span>
                                <span className="flex items-center gap-2"><Layers className="w-3 h-3" /> Input size: {array.length}</span>
                            </div>
                        </section>

                        <div className="grid md:grid-cols-2 gap-12 text-slate-400">
                            <section>
                                <h3 className="text-xs font-black text-white uppercase tracking-[0.3em] mb-6 flex items-center gap-3">
                                    <PieChart className="w-4 h-4 text-accent" /> Logic Overview
                                </h3>
                                <p className="text-sm leading-relaxed font-medium">
                                    The {selectedAlgo.name} algorithm utilizes a {selectedAlgo.category} approach to solve the problem with a computational efficiency of {selectedAlgo.complexity}. Open the practice terminal to experiment with the raw code.
                                </p>
                            </section>
                            <section>
                                <h3 className="text-xs font-black text-white uppercase tracking-[0.3em] mb-6 flex items-center gap-3">
                                    <BarChart3 className="w-4 h-4 text-accent" /> Space Complexity
                                </h3>
                                <div className="flex items-end gap-2 text-3xl font-black text-white italic">
                                    O(1) <span className="text-xs text-slate-500 mb-1 not-italic">CONSTANT SPACE</span>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="border-t border-white/5 py-12 px-8 mt-20">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex items-center gap-2 opacity-50">
                        <Binary className="w-4 h-4 text-accent" />
                        <span className="text-xs font-bold uppercase tracking-widest text-white">AlgoViz Master</span>
                    </div>
                    <div className="flex gap-8">
                        <Share2 className="w-4 h-4 cursor-pointer hover:text-accent transition-colors" />
                        <Github className="w-4 h-4 cursor-pointer hover:text-accent transition-colors" />
                        <Compass className="w-4 h-4 cursor-pointer hover:text-accent transition-colors" />
                    </div>
                    <p className="text-[10px] font-bold text-slate-600 uppercase tracking-[0.4em]">© 2024 MK_ALGO_VISUALIZER • 25/30 DEPLOYED</p>
                </div>
            </footer>
        </div>
    );
}
