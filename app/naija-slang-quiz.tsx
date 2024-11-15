'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface QuizQuestion {
  id: string
  question: string
  options: string[]
  correctAnswer: number
}

const initialQuizQuestions: QuizQuestion[] = [
  {
    id: '1',
    question: "What does 'E choke' mean?",
    options: ["It's shocking", "It's suffocating", "It's exciting", "It's disappointing"],
    correctAnswer: 2
  },
  {
    id: '2',
    question: "What does 'Wetin dey happen' mean?",
    options: ["What's happening?", "Why are you here?", "Where are you going?", "When did you arrive?"],
    correctAnswer: 0
  },
  {
    id: '3',
    question: "What does 'Oya na' imply?",
    options: ["Come here", "Let's go", "Stop it", "Hurry up"],
    correctAnswer: 3
  },
  {
    id: '4',
    question: "What does 'Wahala' mean?",
    options: ["Happiness", "Trouble", "Food", "Money"],
    correctAnswer: 1
  },
  {
    id: '5',
    question: "What does 'Abeg' mean?",
    options: ["Hello", "Goodbye", "Please", "Thank you"],
    correctAnswer: 2
  },
  {
    id: '6',
    question: "What does 'Japa' mean in Nigerian slang?",
    options: ["To eat", "To sleep", "To run away", "To dance"],
    correctAnswer: 2
  },
  {
    id: '7',
    question: "What does 'Ginger' mean in Nigerian context?",
    options: ["A spice", "To motivate", "To confuse", "To cook"],
    correctAnswer: 1
  },
  {
    id: '8',
    question: "What does 'Shakara' refer to?",
    options: ["A dance", "Showing off", "A type of food", "A greeting"],
    correctAnswer: 1
  },
  {
    id: '9',
    question: "What does 'No wahala' mean?",
    options: ["Big problem", "No problem", "Good morning", "Goodbye"],
    correctAnswer: 1
  },
  {
    id: '10',
    question: "What does 'Chop' mean in Nigerian slang?",
    options: ["To cut", "To eat", "To sleep", "To dance"],
    correctAnswer: 1
  }
]

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export default function NaijaSlangQuiz() {
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [showSplash, setShowSplash] = useState(true)
  const [timer, setTimer] = useState(90)
  const [quizStarted, setQuizStarted] = useState(false)

  useEffect(() => {
    if (quizStarted && timer > 0 && !showResult) {
      const timerId = setTimeout(() => setTimer(timer - 1), 1000)
      return () => clearTimeout(timerId)
    } else if (timer === 0 && !showResult) {
      setShowResult(true)
    }
  }, [timer, quizStarted, showResult])

  const startQuiz = () => {
    setQuizQuestions(shuffleArray(initialQuizQuestions))
    setShowSplash(false)
    setQuizStarted(true)
  }

  const handleAnswerClick = (selectedOption: number) => {
    setSelectedAnswer(selectedOption)
    setShowFeedback(true)

    if (selectedOption === quizQuestions[currentQuestion].correctAnswer) {
      setScore(score + 1)
    }

    setTimeout(() => {
      setShowFeedback(false)
      setSelectedAnswer(null)
      if (currentQuestion < quizQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
      } else {
        setShowResult(true)
      }
    }, 1500)
  }

  const restartQuiz = () => {
    setQuizQuestions(shuffleArray(initialQuizQuestions))
    setCurrentQuestion(0)
    setScore(0)
    setShowResult(false)
    setSelectedAnswer(null)
    setShowFeedback(false)
    setTimer(90)
    setQuizStarted(true)
  }

  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100

  if (showSplash) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-700 to-green-300 flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <CardTitle className="text-3xl font-bold">Naija Slang Quiz 🇳🇬🥳</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl mb-6">Test your ability on Naija slangs</p>
            <Button onClick={startQuiz} size="lg">Start Quiz</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-700 to-green-300 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Naija Slang Quiz</CardTitle>
          <div className="text-center text-xl font-semibold">Time left: {timer}s</div>
        </CardHeader>
        <CardContent>
          {!showResult ? (
            <>
              <Progress value={progress} className="mb-4" />
              <p className="text-sm text-gray-500 mb-4">Question {currentQuestion + 1} of {quizQuestions.length}</p>
              <h2 className="text-xl font-semibold mb-4">{quizQuestions[currentQuestion].question}</h2>
              <div className="space-y-2">
                {quizQuestions[currentQuestion].options.map((option, index) => (
                  <Button
                    key={index}
                    className={`w-full justify-start text-left ${
                      showFeedback
                        ? index === quizQuestions[currentQuestion].correctAnswer
                          ? 'bg-green-500 hover:bg-green-600'
                          : index === selectedAnswer
                          ? 'bg-red-500 hover:bg-red-600'
                          : ''
                        : ''
                    }`}
                    onClick={() => handleAnswerClick(index)}
                    disabled={showFeedback}
                  >
                    {option}
                  </Button>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">Quiz Completed!</h2>
              <p className="text-xl mb-4">Your Score: {score} out of {quizQuestions.length}</p>
              <Button onClick={restartQuiz}>Play Again</Button>
            </div>
          )}
        </CardContent>
        <CardFooter className="justify-between">
          <p className="text-sm text-gray-500">Score: {score}</p>
          {!showResult && (
            <Button variant="outline" onClick={restartQuiz}>
              Restart Quiz
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}