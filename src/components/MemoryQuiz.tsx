import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, CheckCircle2, AlertCircle, RotateCcw, Trophy, Sparkles } from 'lucide-react';
import { QuizQuestion, PersonalizationData } from '../types';

interface MemoryQuizProps {
  data: PersonalizationData;
}

export const MemoryQuiz: React.FC<MemoryQuizProps> = ({ data }) => {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [score, setScore] = useState<number>(0);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [answersLog, setAnswersLog] = useState<{ isCorrect: boolean; reaction: string }[]>([]);

  const currentQ: QuizQuestion = data.quizQuestions[currentIdx];

  const handleSelectOption = (idx: number) => {
    if (selectedOptionIndex !== null) return; // Prevent double taps

    const option = currentQ.options[idx];
    setSelectedOptionIndex(idx);

    const isCorrect = option.isCorrect;
    if (isCorrect) {
      setScore((s) => s + 1);
    }

    setAnswersLog((prev) => [...prev, { isCorrect, reaction: option.reaction }]);
  };

  const handleNextQuestion = () => {
    setSelectedOptionIndex(null);
    if (currentIdx < data.quizQuestions.length - 1) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      setIsFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedOptionIndex(null);
    setScore(0);
    setIsFinished(false);
    setAnswersLog([]);
  };

  return (
    <section id="memory-quiz-section" className="relative py-28 px-4 sm:px-8 border-t border-white/[0.05] max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <span className="text-[11px] uppercase tracking-[0.3em] text-[#c08d96] font-sans font-medium block mb-2">
          Chapter 07 · Micro Divertissement
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#f5f2ea] font-light tracking-tight mb-3">
          How well do you remember us?
        </h2>
        <p className="text-xs sm:text-sm text-[#8e909a] font-sans max-w-lg mx-auto">
          A short memory audit of our shared conversations, late-night habits, and unscripted debates.
        </p>
      </div>

      <div className="rounded-3xl bg-[#12141c] border border-white/[0.08] p-6 sm:p-10 shadow-2xl relative overflow-hidden">
        {/* Progress indicator */}
        {!isFinished && (
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/[0.06] text-xs font-sans text-[#8e909a]">
            <span>
              Query {currentIdx + 1} of {data.quizQuestions.length}
            </span>
            <span className="text-[#c08d96]">Score: {score}</span>
          </div>
        )}

        <AnimatePresence mode="wait">
          {!isFinished ? (
            <motion.div
              key={currentIdx}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
            >
              <h3 className="font-serif text-xl sm:text-2xl text-[#f5f2ea] font-normal leading-snug mb-8">
                {currentQ.question.replace('[HER_NAME]', data.recipientName)}
              </h3>

              {/* Options */}
              <div className="space-y-3.5 mb-8">
                {currentQ.options.map((opt, oIdx) => {
                  const isSelected = selectedOptionIndex === oIdx;
                  const hasAnswered = selectedOptionIndex !== null;

                  let borderClass = 'border-white/[0.08] bg-[#0c0d12] hover:border-white/20';
                  if (hasAnswered) {
                    if (opt.isCorrect) {
                      borderClass = 'border-[#782333]/80 bg-[#782333]/15 text-[#f5f2ea]';
                    } else if (isSelected && !opt.isCorrect) {
                      borderClass = 'border-red-500/50 bg-red-950/20 text-[#e8e6e1]';
                    } else {
                      borderClass = 'opacity-40 border-white/[0.04] bg-[#0c0d12]';
                    }
                  }

                  return (
                    <button
                      key={oIdx}
                      id={`quiz-opt-${currentIdx}-${oIdx}`}
                      onClick={() => handleSelectOption(oIdx)}
                      disabled={hasAnswered}
                      className={`w-full text-left p-4 sm:p-5 rounded-2xl border transition-all duration-300 font-sans text-xs sm:text-sm flex items-center justify-between ${borderClass}`}
                    >
                      <span>{opt.text.replace('[HER_NAME]', data.recipientName)}</span>
                      {hasAnswered && opt.isCorrect && (
                        <CheckCircle2 className="w-4 h-4 text-[#c08d96] shrink-0 ml-3" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Instant feedback reaction */}
              {selectedOptionIndex !== null && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-2xl bg-[#171924] border border-[#c08d96]/30 mb-8"
                >
                  <div className="flex items-start gap-2.5">
                    <Sparkles className="w-4 h-4 text-[#c08d96] shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs sm:text-sm text-[#f5f2ea] font-sans font-medium mb-1">
                        {currentQ.options[selectedOptionIndex].reaction.replace('[HER_NAME]', data.recipientName)}
                      </p>
                      <p className="text-[11px] text-[#8e909a] font-sans">
                        {currentQ.explanation.replace('[HER_NAME]', data.recipientName)}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {selectedOptionIndex !== null && (
                <div className="flex justify-end">
                  <button
                    onClick={handleNextQuestion}
                    className="px-6 py-2.5 rounded-full bg-[#782333] hover:bg-[#8f2c3e] text-xs font-sans text-[#f5f2ea] tracking-wider uppercase transition-colors"
                  >
                    {currentIdx < data.quizQuestions.length - 1 ? 'Next Question' : 'View Memory Verdict'}
                  </button>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-6"
            >
              <div className="inline-flex p-4 rounded-full bg-[#782333]/20 border border-[#782333]/40 text-[#c08d96] mb-6">
                <Trophy className="w-7 h-7" />
              </div>

              <h3 className="font-serif text-3xl sm:text-4xl text-[#f5f2ea] font-light mb-3">
                Verdict: {score} of {data.quizQuestions.length}
              </h3>

              <p className="text-sm sm:text-base text-[#c7c5be] font-sans max-w-md mx-auto leading-relaxed mb-8">
                {score === data.quizQuestions.length
                  ? 'Flawless recall. Either you have an incredible memory, or our conversations matter to you just as much as they do to me.'
                  : 'A few wild guesses in there, but every answer proves that the best memories are the ones still in progress.'}
              </p>

              <div className="p-4 sm:p-5 rounded-2xl bg-[#0b0c10] border border-white/[0.06] max-w-lg mx-auto mb-8 text-left">
                <div className="text-[10px] uppercase tracking-widest text-[#787a86] mb-1 font-sans">
                  The Bonus Question
                </div>
                <p className="text-xs sm:text-sm text-[#e8e6e1] font-sans">
                  "Who cares more?" — <span className="text-[#c08d96]">Tie game, perpetually.</span>
                </p>
              </div>

              <button
                onClick={handleRestart}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/[0.06] hover:bg-white/10 text-xs font-sans text-[#8e909a] hover:text-[#e8e6e1] transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Replay questions</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
