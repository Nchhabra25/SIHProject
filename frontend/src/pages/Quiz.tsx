import { useState } from "react";
import { ArrowRight, ArrowLeft, Trophy, CheckCircle, XCircle, Zap, Target } from "lucide-react";
import { EcoButton } from "@/components/ui/eco-button";
import { EcoCard, EcoCardContent, EcoCardDescription, EcoCardHeader, EcoCardTitle } from "@/components/ui/eco-card";
import { Badge } from "@/components/ui/badge";
import { ProgressRing } from "@/components/ui/progress-ring";
import { useToast } from "@/hooks/use-toast";
import { getUserProgress, addQuizResult } from "@/utils/storage";
import { triggerConfetti } from "@/utils/confetti";

const quizzes = [
  {
    id: 1,
    title: "Climate Change Fundamentals",
    description: "Test your knowledge of global warming basics",
    questions: 10,
    duration: "5 min",
    difficulty: "Beginner",
    points: 50,
    completed: true,
    score: 85,
    icon: "🌡️"
  },
  {
    id: 2,
    title: "Renewable Energy Quiz",
    description: "Solar, wind, and clean energy solutions",
    questions: 8,
    duration: "4 min",
    difficulty: "Intermediate",
    points: 40,
    completed: true,
    score: 92,
    icon: "⚡"
  },
  {
    id: 3,
    title: "Ocean Conservation Challenge",
    description: "Marine ecosystems and protection",
    questions: 12,
    duration: "6 min",
    difficulty: "Advanced",
    points: 60,
    completed: false,
    score: null,
    icon: "🌊"
  }
];

const sampleQuestions = [
  {
    id: 1,
    question: "What is the primary cause of recent climate change?",
    options: [
      "Natural climate cycles",
      "Human activities releasing greenhouse gases",
      "Solar radiation changes",
      "Volcanic eruptions"
    ],
    correct: 1,
    explanation: "Human activities, particularly burning fossil fuels, have significantly increased greenhouse gas concentrations in the atmosphere."
  },
  {
    id: 2,
    question: "Which renewable energy source is most widely used globally?",
    options: [
      "Solar power",
      "Wind power", 
      "Hydroelectric power",
      "Geothermal power"
    ],
    correct: 2,
    explanation: "Hydroelectric power is currently the most widely used renewable energy source worldwide, providing about 16% of global electricity."
  },
  {
    id: 3,
    question: "What percentage of ocean plastic pollution comes from land-based sources?",
    options: [
      "40%",
      "60%",
      "80%",
      "95%"
    ],
    correct: 2,
    explanation: "Approximately 80% of marine plastic pollution originates from land-based sources, including rivers, coastal activities, and inadequate waste management."
  }
];

export default function Quiz() {
  const [selectedQuiz, setSelectedQuiz] = useState<number | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const { toast } = useToast();

  const handleQuizSelect = (quizId: number) => {
    setSelectedQuiz(quizId);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore(0);
    setQuizComplete(false);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (showExplanation) return;
    setSelectedAnswer(answerIndex);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;
    
    setShowExplanation(true);
    if (selectedAnswer === sampleQuestions[currentQuestion].correct) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < sampleQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setQuizComplete(true);
      
      // Save quiz result to local storage
      const finalScore = Math.round((score / sampleQuestions.length) * 100);
      const pointsEarned = Math.round(finalScore * 0.6);
      
      const quizResult = {
        id: selectedQuiz || 1,
        title: quizzes.find(q => q.id === selectedQuiz)?.title || 'Sample Quiz',
        score: finalScore,
        totalQuestions: sampleQuestions.length,
        pointsEarned,
        completedAt: new Date().toISOString().split('T')[0]
      };
      
      addQuizResult(quizResult);
      
      // Trigger confetti for completion
      triggerConfetti('success');
      
      // Show completion toast
      toast({
        title: "Quiz Completed! 🎉",
        description: `You scored ${finalScore}% and earned ${pointsEarned} eco-points!`,
        duration: 5000,
      });
    }
  };

  const handleBackToQuizzes = () => {
    setSelectedQuiz(null);
    setQuizComplete(false);
  };

  if (quizComplete) {
    const finalScore = Math.round((score / sampleQuestions.length) * 100);
    const pointsEarned = Math.round(finalScore * 0.6);
    
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <EcoCard variant="gradient" className="max-w-lg w-full animate-scale-in">
          <EcoCardContent className="p-8 text-center">
            <div className="mb-6">
              <Trophy className="w-16 h-16 text-yellow-300 mx-auto mb-4" />
              <h1 className="text-3xl font-bold text-white mb-2">Quiz Complete!</h1>
              <p className="text-white/80">Great job on your eco-knowledge!</p>
            </div>
            
            <ProgressRing progress={finalScore} size={120} className="mx-auto mb-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{finalScore}%</div>
                <div className="text-xs text-white/80">Score</div>
              </div>
            </ProgressRing>
            
            <div className="grid grid-cols-2 gap-4 mb-6 text-white">
              <div className="text-center">
                <div className="text-2xl font-bold">{score}/{sampleQuestions.length}</div>
                <div className="text-sm text-white/80">Correct</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">+{pointsEarned}</div>
                <div className="text-sm text-white/80">Eco-points</div>
              </div>
            </div>
            
            <div className="space-y-3">
              <EcoButton variant="glass" className="w-full" onClick={handleBackToQuizzes}>
                Take Another Quiz
              </EcoButton>
              <EcoButton variant="outline" className="w-full text-white border-white/30">
                Review Answers
              </EcoButton>
            </div>
          </EcoCardContent>
        </EcoCard>
      </div>
    );
  }

  if (selectedQuiz) {
    const currentQ = sampleQuestions[currentQuestion];
    const progress = ((currentQuestion + 1) / sampleQuestions.length) * 100;
    
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="container mx-auto max-w-4xl py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <EcoButton variant="ghost" onClick={handleBackToQuizzes}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Quizzes
            </EcoButton>
            <div className="text-center">
              <Badge variant="secondary">
                Question {currentQuestion + 1} of {sampleQuestions.length}
              </Badge>
            </div>
            <div className="text-right">
              <div className="text-sm text-muted-foreground">Score: {score}/{currentQuestion + (showExplanation ? 1 : 0)}</div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-muted rounded-full h-2 mb-8">
            <div 
              className="h-2 bg-gradient-to-r from-primary to-success rounded-full transition-all duration-500"
              style={{width: `${progress}%`}}
            />
          </div>

          {/* Question Card */}
          <EcoCard className="mb-8 animate-slide-up">
            <EcoCardHeader>
              <EcoCardTitle className="text-2xl">
                {currentQ.question}
              </EcoCardTitle>
            </EcoCardHeader>
            <EcoCardContent>
              <div className="space-y-3">
                {currentQ.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={showExplanation}
                    className={`w-full p-4 text-left rounded-xl border-2 transition-all ${
                      selectedAnswer === index
                        ? showExplanation
                          ? index === currentQ.correct
                            ? 'border-success bg-success/10 text-success'
                            : 'border-destructive bg-destructive/10 text-destructive'
                          : 'border-primary bg-primary/10'
                        : showExplanation && index === currentQ.correct
                        ? 'border-success bg-success/10 text-success'
                        : 'border-border hover:border-primary/50 hover:bg-muted/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{option}</span>
                      {showExplanation && (
                        <div>
                          {index === currentQ.correct ? (
                            <CheckCircle className="w-5 h-5 text-success" />
                          ) : selectedAnswer === index ? (
                            <XCircle className="w-5 h-5 text-destructive" />
                          ) : null}
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>

              {showExplanation && (
                <div className="mt-6 p-4 bg-muted/50 rounded-xl animate-fade-in">
                  <h4 className="font-semibold mb-2 flex items-center">
                    <Target className="w-4 h-4 mr-2 text-primary" />
                    Explanation
                  </h4>
                  <p className="text-muted-foreground">{currentQ.explanation}</p>
                </div>
              )}

              <div className="flex justify-between mt-6">
                <div></div>
                {!showExplanation ? (
                  <EcoButton 
                    onClick={handleSubmitAnswer}
                    disabled={selectedAnswer === null}
                  >
                    Submit Answer
                  </EcoButton>
                ) : (
                  <EcoButton onClick={handleNextQuestion}>
                    {currentQuestion < sampleQuestions.length - 1 ? 'Next Question' : 'Finish Quiz'}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </EcoButton>
                )}
              </div>
            </EcoCardContent>
          </EcoCard>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 animate-slide-up">
            🧠 Quiz Arena
          </h1>
          <p className="text-muted-foreground text-base md:text-lg animate-slide-up" style={{animationDelay: '0.1s'}}>
            Challenge your eco-knowledge and earn points while having fun!
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6 mb-8">
          <EcoCard className="animate-bounce-in" style={{animationDelay: '0.2s'}}>
            <EcoCardContent className="p-4 md:p-6 text-center">
              <Zap className="w-8 md:w-10 h-8 md:h-10 text-accent mx-auto mb-2 md:mb-3" />
              <div className="text-xl md:text-2xl font-bold">{getUserProgress().ecoPoints}</div>
              <div className="text-xs md:text-sm text-muted-foreground">Total Points</div>
            </EcoCardContent>
          </EcoCard>
          
          <EcoCard className="animate-bounce-in" style={{animationDelay: '0.3s'}}>
            <EcoCardContent className="p-4 md:p-6 text-center">
              <Trophy className="w-8 md:w-10 h-8 md:h-10 text-yellow-500 mx-auto mb-2 md:mb-3" />
              <div className="text-xl md:text-2xl font-bold">89%</div>
              <div className="text-xs md:text-sm text-muted-foreground">Average Score</div>
            </EcoCardContent>
          </EcoCard>
          
          <EcoCard className="animate-bounce-in col-span-2 md:col-span-1" style={{animationDelay: '0.4s'}}>
            <EcoCardContent className="p-4 md:p-6 text-center">
              <Target className="w-8 md:w-10 h-8 md:h-10 text-success mx-auto mb-2 md:mb-3" />
              <div className="text-xl md:text-2xl font-bold">{getUserProgress().completedQuizzes.length}/{quizzes.length}</div>
              <div className="text-xs md:text-sm text-muted-foreground">Quizzes Done</div>
            </EcoCardContent>
          </EcoCard>
        </div>

        {/* Available Quizzes */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Available Quizzes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {quizzes.map((quiz, index) => (
              <EcoCard 
                key={quiz.id}
                hover="glow"
                className="cursor-pointer animate-slide-up"
                style={{animationDelay: `${0.5 + index * 0.1}s`}}
                onClick={() => handleQuizSelect(quiz.id)}
              >
                <EcoCardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-4xl">{quiz.icon}</div>
                    {quiz.completed && (
                      <Badge variant="default" className="bg-success">
                        ✓ Completed
                      </Badge>
                    )}
                  </div>
                  <EcoCardTitle className="text-xl">{quiz.title}</EcoCardTitle>
                  <EcoCardDescription>{quiz.description}</EcoCardDescription>
                </EcoCardHeader>
                <EcoCardContent>
                  <div className="space-y-2 md:space-y-3 mb-4 md:mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Questions:</span>
                      <span>{quiz.questions}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Duration:</span>
                      <span>{quiz.duration}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Points:</span>
                      <span className="text-primary font-medium">+{quiz.points}</span>
                    </div>
                    {quiz.completed && (
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Best Score:</span>
                        <span className="text-success font-medium">{quiz.score}%</span>
                      </div>
                    )}
                  </div>
                  
                  <Badge variant="outline" className="mb-3 md:mb-4 text-xs">
                    {quiz.difficulty}
                  </Badge>
                  
                  <EcoButton 
                    variant={quiz.completed ? "outline" : "default"} 
                    className="w-full text-sm"
                    size="sm"
                  >
                    {quiz.completed ? 'Retake Quiz' : 'Start Quiz'}
                    <ArrowRight className="ml-2 w-3 h-3 md:w-4 md:h-4" />
                  </EcoButton>
                </EcoCardContent>
              </EcoCard>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}