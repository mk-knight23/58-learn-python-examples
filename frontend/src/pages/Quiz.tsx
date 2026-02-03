/**
 * Quiz Page
 * Test knowledge with interactive quizzes
 */

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, RotateCcw, Trophy, ArrowRight } from 'lucide-react';
import { skills } from '../data/skills';
import { getQuizForSkill } from '../data/quizzes';
import { useNavigate, useParams } from 'react-router';
import { useStore } from '../store/useStore';

type QuizState = 'intro' | 'active' | 'results';

export function Quiz() {
  const { skillId } = useParams<{ skillId: string }>();
  const navigate = useNavigate();
  const { saveQuizAttempt, getQuizAttempts } = useStore();

  const [quizState, setQuizState] = useState<QuizState>('intro');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);

  const skill = useMemo(() => {
    return skills.find((s) => s.id === skillId);
  }, [skillId]);

  const questions = useMemo(() => {
    if (!skillId) return [];
    return getQuizForSkill(skillId);
  }, [skillId]);

  const previousAttempts = useMemo(() => {
    if (!skillId) return [];
    return getQuizAttempts(skillId);
  }, [skillId, getQuizAttempts]);

  useEffect(() => {
    if (!skill) {
      navigate('/search');
    }
  }, [skill, navigate]);

  if (!skill) {
    return null;
  }

  const handleStartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setShowExplanation(false);
    setScore(0);
    setQuizState('active');
  };

  const handleSelectAnswer = (answerIndex: number) => {
    if (showExplanation) return;

    const newAnswers = [...selectedAnswers, answerIndex];
    setSelectedAnswers(newAnswers);

    const question = questions[currentQuestion];
    const isCorrect = answerIndex === question.correctAnswer;

    if (isCorrect) {
      setScore((prev) => prev + 1);
    }

    setShowExplanation(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setShowExplanation(false);
    } else {
      // Quiz complete
      saveQuizAttempt(skill.id, score, questions.length, [
        ...selectedAnswers,
      ]);
      setQuizState('results');
    }
  };

  const handleRetakeQuiz = () => {
    handleStartQuiz();
  };

  const question = questions[currentQuestion];
  const selectedAnswer = selectedAnswers[currentQuestion];
  const isCorrect =
    selectedAnswer !== undefined && selectedAnswer === question.correctAnswer;
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">No Quiz Available</h2>
          <p className="text-slate-400 mb-6">
            There are no quiz questions for this skill yet.
          </p>
          <button
            onClick={() => navigate(`/skill/${skill.id}`)}
            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg font-semibold transition-colors"
          >
            Back to Skill
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <button
            onClick={() => navigate(`/skill/${skill.id}`)}
            className="text-slate-400 hover:text-white transition-colors mb-4"
          >
            ← Back to {skill.title}
          </button>
          <h1 className="text-3xl font-bold mb-2">Quiz: {skill.title}</h1>
          <p className="text-slate-400">
            Test your understanding of {skill.title.toLowerCase()}
          </p>
        </motion.div>

        {/* Intro Screen */}
        {quizState === 'intro' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-900 border border-white/10 rounded-2xl p-8"
          >
            <div className="text-center mb-8">
              <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-4">Ready to Test Your Knowledge?</h2>
              <p className="text-slate-400">
                This quiz has {questions.length} question{questions.length !== 1 ? 's' : ''}.
                Take your time and do your best!
              </p>
            </div>

            {previousAttempts.length > 0 && (
              <div className="mb-8 p-4 bg-slate-800/50 rounded-lg">
                <h3 className="font-semibold mb-2">Previous Attempts</h3>
                <div className="space-y-2">
                  {previousAttempts.map((attempt, index) => {
                    const percentage = Math.round(
                      (attempt.score / attempt.total) * 100
                    );
                    return (
                      <div
                        key={index}
                        className="flex items-center justify-between text-sm"
                      >
                        <span className="text-slate-400">
                          {new Date(attempt.completedAt).toLocaleDateString()}
                        </span>
                        <span
                          className={`font-semibold ${
                            percentage >= 80
                              ? 'text-green-400'
                              : percentage >= 60
                              ? 'text-yellow-400'
                              : 'text-red-400'
                          }`}
                        >
                          {attempt.score}/{attempt.total} ({percentage}%)
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            <button
              onClick={handleStartQuiz}
              className="w-full py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl font-semibold text-lg hover:opacity-90 transition-opacity"
            >
              Start Quiz
            </button>
          </motion.div>
        )}

        {/* Quiz Questions */}
        <AnimatePresence mode="wait">
          {quizState === 'active' && question && (
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              {/* Progress Bar */}
              <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              {/* Question Card */}
              <div className="bg-slate-900 border border-white/10 rounded-2xl p-8">
                <div className="mb-6">
                  <div className="text-sm text-slate-400 mb-2">
                    Question {currentQuestion + 1} of {questions.length}
                  </div>
                  <h2 className="text-xl font-semibold">{question.question}</h2>
                </div>

                {/* Answer Options */}
                <div className="space-y-3">
                  {question.options.map((option, index) => {
                    const isSelected = selectedAnswer === index;
                    const isCorrectAnswer = index === question.correctAnswer;

                    let variantClass = 'border-white/10 hover:border-blue-500/50';
                    let icon = null;

                    if (showExplanation) {
                      if (isCorrectAnswer) {
                        variantClass = 'border-green-500 bg-green-500/10';
                        icon = <CheckCircle className="w-5 h-5 text-green-400" />;
                      } else if (isSelected && !isCorrectAnswer) {
                        variantClass = 'border-red-500 bg-red-500/10';
                        icon = <XCircle className="w-5 h-5 text-red-400" />;
                      }
                    } else if (isSelected) {
                      variantClass = 'border-blue-500 bg-blue-500/10';
                    }

                    return (
                      <button
                        key={index}
                        onClick={() => handleSelectAnswer(index)}
                        disabled={showExplanation}
                        className={`w-full p-4 rounded-xl border transition-all flex items-center justify-between ${variantClass}`}
                      >
                        <span className="text-left">{option}</span>
                        {icon}
                      </button>
                    );
                  })}
                </div>

                {/* Explanation */}
                <AnimatePresence>
                  {showExplanation && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-6 p-4 bg-slate-800/50 rounded-lg"
                    >
                      <div className="flex items-start gap-3">
                        {isCorrect ? (
                          <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                        ) : (
                          <XCircle className="w-6 h-6 text-red-400 flex-shrink-0 mt-1" />
                        )}
                        <div>
                          <div className="font-semibold mb-1">
                            {isCorrect ? 'Correct!' : 'Not quite!'}
                          </div>
                          <p className="text-sm text-slate-400">
                            {question.explanation}
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={handleNextQuestion}
                        className="mt-4 w-full py-3 bg-blue-500 hover:bg-blue-600 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                      >
                        {currentQuestion < questions.length - 1 ? (
                          <>
                            Next Question
                            <ArrowRight className="w-4 h-4" />
                          </>
                        ) : (
                          'See Results'
                        )}
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results Screen */}
        <AnimatePresence>
          {quizState === 'results' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-slate-900 border border-white/10 rounded-2xl p-8 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
                className="w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center text-4xl"
                style={{
                  background:
                    score / questions.length >= 0.8
                      ? 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)'
                      : score / questions.length >= 0.6
                      ? 'linear-gradient(135deg, #eab308 0%, #ca8a04 100%)'
                      : 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                }}
              >
                {score}/{questions.length}
              </motion.div>

              <h2 className="text-3xl font-bold mb-2">
                {score / questions.length >= 0.8
                  ? 'Excellent Work!'
                  : score / questions.length >= 0.6
                  ? 'Good Job!'
                  : 'Keep Practicing!'}
              </h2>
              <p className="text-slate-400 mb-8">
                You scored {Math.round((score / questions.length) * 100)}%
              </p>

              <div className="flex gap-4">
                <button
                  onClick={handleRetakeQuiz}
                  className="flex-1 py-3 px-6 bg-slate-800 hover:bg-slate-700 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  Retake Quiz
                </button>
                <button
                  onClick={() => navigate(`/skill/${skill.id}`)}
                  className="flex-1 py-3 px-6 bg-blue-500 hover:bg-blue-600 rounded-lg font-semibold transition-colors"
                >
                  Back to Skill
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
