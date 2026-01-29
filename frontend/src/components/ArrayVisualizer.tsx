import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, SkipBack, SkipForward } from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';

interface ArrayElement {
  value: number;
  state: 'default' | 'comparing' | 'swapping' | 'sorted' | 'pivot';
  id: string;
}

interface SortingStep {
  array: ArrayElement[];
  line: number;
  message: string;
}

interface ArrayVisualizerProps {
  algorithm: string;
}

// Generate random array
function generateArray(size: number = 10): ArrayElement[] {
  return Array.from({ length: size }, (_, i) => ({
    value: Math.floor(Math.random() * 50) + 10,
    state: 'default',
    id: `elem-${i}-${Date.now()}`,
  }));
}

// Generate sorting steps for bubble sort
function generateBubbleSortSteps(initialArray: ArrayElement[]): SortingStep[] {
  const steps: SortingStep[] = [];
  const arr = initialArray.map(e => ({ ...e }));
  const n = arr.length;

  // Initial state
  steps.push({
    array: arr.map(e => ({ ...e })),
    line: 1,
    message: 'Starting bubble sort',
  });

  for (let i = 0; i < n; i++) {
    let swapped = false;

    for (let j = 0; j < n - i - 1; j++) {
      // Highlight comparing elements
      arr[j].state = 'comparing';
      arr[j + 1].state = 'comparing';
      
      steps.push({
        array: arr.map(e => ({ ...e })),
        line: 6,
        message: `Comparing ${arr[j].value} and ${arr[j + 1].value}`,
      });

      if (arr[j].value > arr[j + 1].value) {
        // Mark for swap
        arr[j].state = 'swapping';
        arr[j + 1].state = 'swapping';
        
        steps.push({
          array: arr.map(e => ({ ...e })),
          line: 7,
          message: `${arr[j].value} > ${arr[j + 1].value}, swapping`,
        });

        // Perform swap
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
        swapped = true;

        steps.push({
          array: arr.map(e => ({ ...e })),
          line: 7,
          message: `Swapped: [${arr.map(e => e.value).join(', ')}]`,
        });
      }

      // Reset to default
      arr[j].state = 'default';
      arr[j + 1].state = 'default';
    }

    // Mark last element as sorted
    arr[n - i - 1].state = 'sorted';
    
    steps.push({
      array: arr.map(e => ({ ...e })),
      line: 2,
      message: `Pass ${i + 1} complete. Largest element bubbled to end.`,
    });

    if (!swapped) {
      // Mark remaining as sorted
      for (let k = 0; k < n - i - 1; k++) {
        arr[k].state = 'sorted';
      }
      
      steps.push({
        array: arr.map(e => ({ ...e })),
        line: 9,
        message: 'No swaps needed. Array is sorted!',
      });
      break;
    }
  }

  return steps;
}

// Generate steps for selection sort
function generateSelectionSortSteps(initialArray: ArrayElement[]): SortingStep[] {
  const steps: SortingStep[] = [];
  const arr = initialArray.map(e => ({ ...e }));
  const n = arr.length;

  steps.push({
    array: arr.map(e => ({ ...e })),
    line: 1,
    message: 'Starting selection sort',
  });

  for (let i = 0; i < n; i++) {
    let minIdx = i;
    arr[i].state = 'pivot';
    
    steps.push({
      array: arr.map(e => ({ ...e })),
      line: 4,
      message: `Finding minimum starting at index ${i}`,
    });

    for (let j = i + 1; j < n; j++) {
      arr[j].state = 'comparing';
      
      steps.push({
        array: arr.map(e => ({ ...e })),
        line: 6,
        message: `Comparing ${arr[j].value} with current min ${arr[minIdx].value}`,
      });

      if (arr[j].value < arr[minIdx].value) {
        if (minIdx !== i) arr[minIdx].state = 'default';
        minIdx = j;
        arr[minIdx].state = 'pivot';
        
        steps.push({
          array: arr.map(e => ({ ...e })),
          line: 7,
          message: `New minimum found: ${arr[minIdx].value}`,
        });
      } else {
        arr[j].state = 'default';
      }
    }

    if (minIdx !== i) {
      arr[i].state = 'swapping';
      arr[minIdx].state = 'swapping';
      
      steps.push({
        array: arr.map(e => ({ ...e })),
        line: 10,
        message: `Swapping ${arr[i].value} with minimum ${arr[minIdx].value}`,
      });

      const temp = arr[i];
      arr[i] = arr[minIdx];
      arr[minIdx] = temp;
    }

    arr[i].state = 'sorted';
    if (minIdx !== i && minIdx < n) arr[minIdx].state = 'default';
    
    steps.push({
      array: arr.map(e => ({ ...e })),
      line: 2,
      message: `Position ${i} now has the correct element: ${arr[i].value}`,
    });
  }

  return steps;
}

export function ArrayVisualizer({ algorithm }: ArrayVisualizerProps) {
  const [array, setArray] = useState<ArrayElement[]>(() => generateArray());
  const [steps, setSteps] = useState<SortingStep[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1000);

  // Generate steps when algorithm or array changes
  useEffect(() => {
    let newSteps: SortingStep[] = [];
    
    switch (algorithm) {
      case 'bubble-sort':
        newSteps = generateBubbleSortSteps(array);
        break;
      case 'selection-sort':
        newSteps = generateSelectionSortSteps(array);
        break;
      default:
        newSteps = [{ array: array.map(e => ({ ...e })), line: 0, message: 'Select a sorting algorithm' }];
    }
    
    setSteps(newSteps);
    setCurrentStep(0);
    setIsPlaying(false);
  }, [algorithm, array]);

  // Animation loop
  useEffect(() => {
    if (!isPlaying || currentStep >= steps.length - 1) {
      setIsPlaying(false);
      return;
    }

    const timer = setTimeout(() => {
      setCurrentStep(prev => prev + 1);
    }, speed);

    return () => clearTimeout(timer);
  }, [isPlaying, currentStep, steps.length, speed]);

  const handleReset = useCallback(() => {
    const newArray = generateArray();
    setArray(newArray);
    setIsPlaying(false);
  }, []);

  const handleStepForward = useCallback(() => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  }, [currentStep, steps.length]);

  const handleStepBack = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  }, [currentStep]);

  const currentState = steps[currentStep] || { array, line: 0, message: '' };

  const getBarColor = (state: ArrayElement['state']) => {
    switch (state) {
      case 'comparing':
        return 'bg-teal-400';
      case 'swapping':
        return 'bg-orange-400';
      case 'sorted':
        return 'bg-green-500';
      case 'pivot':
        return 'bg-purple-500';
      default:
        return 'bg-slate-500';
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-950 rounded-2xl overflow-hidden border border-white/5">
      {/* Visualization Area */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 relative">
        {/* Bars */}
        <div className="flex items-end justify-center gap-2 w-full h-64">
          <AnimatePresence mode="popLayout">
            {currentState.array.map((element, index) => (
              <motion.div
                key={element.id}
                layout
                initial={{ scaleY: 0 }}
                animate={{ 
                  scaleY: 1,
                  height: `${element.value * 3}px`,
                }}
                exit={{ scaleY: 0 }}
                transition={{ 
                  type: 'spring',
                  stiffness: 300,
                  damping: 30,
                  delay: index * 0.02,
                }}
                className={`w-8 rounded-t-lg ${getBarColor(element.state)} transition-colors duration-200`}
              >
                <div className="text-center -mt-6 text-xs font-medium text-slate-400">
                  {element.value}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Status Message */}
        <div className="mt-8 px-6 py-3 bg-slate-900/80 rounded-xl border border-white/5 max-w-md">
          <p className="text-sm text-slate-300 text-center">{currentState.message}</p>
        </div>

        {/* Legend */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded bg-slate-500"></span>
            <span className="text-slate-400">Unsorted</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded bg-teal-400"></span>
            <span className="text-slate-400">Comparing</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded bg-orange-400"></span>
            <span className="text-slate-400">Swapping</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded bg-purple-500"></span>
            <span className="text-slate-400">Pivot/Min</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded bg-green-500"></span>
            <span className="text-slate-400">Sorted</span>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="px-6 py-4 border-t border-white/5 bg-slate-900/50">
        <div className="flex items-center justify-between">
          {/* Playback Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleStepBack}
              disabled={currentStep === 0}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <SkipBack className="w-4 h-4 text-slate-300" />
            </button>
            
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-3 rounded-xl bg-purple-500 hover:bg-purple-600 transition-colors"
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 text-white" />
              ) : (
                <Play className="w-5 h-5 text-white" />
              )}
            </button>
            
            <button
              onClick={handleStepForward}
              disabled={currentStep >= steps.length - 1}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <SkipForward className="w-4 h-4 text-slate-300" />
            </button>

            <button
              onClick={handleReset}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors ml-2"
            >
              <RotateCcw className="w-4 h-4 text-slate-300" />
            </button>
          </div>

          {/* Progress */}
          <div className="flex items-center gap-4">
            <div className="text-xs text-slate-500">
              Step {currentStep + 1} of {steps.length}
            </div>
            
            {/* Speed Control */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500">Speed:</span>
              <input
                type="range"
                min="200"
                max="2000"
                step="200"
                value={2100 - speed}
                onChange={(e) => setSpeed(2100 - parseInt(e.target.value))}
                className="w-24 accent-purple-500"
              />
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-4 h-1 bg-slate-800 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-purple-500"
            initial={{ width: 0 }}
            animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>
    </div>
  );
}
