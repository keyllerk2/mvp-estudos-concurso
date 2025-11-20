'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { User, getSimuladoByMateria, Question } from '@/lib/data'

export default function SimuladoPage() {
  const [user, setUser] = useState<User | null>(null)
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [showExplanation, setShowExplanation] = useState(false)
  const [timeLeft, setTimeLeft] = useState(1800) // 30 minutes
  const router = useRouter()
  const params = useParams()
  const searchParams = useSearchParams()
  const materiaId = params.materiaId as string
  const difficulty = searchParams.get('difficulty') || 'easy'

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      setUser(JSON.parse(userData))
    } else {
      router.push('/')
    }

    // Mock questions - in real app, fetch from API
    const mockQuestions: Question[] = [
      {
        id: 'q1',
        text: 'Qual é a função da vírgula em uma oração?',
        options: ['Separar palavras', 'Indicar pausa', 'Substituir ponto', 'Marcar acento'],
        correctAnswer: 1,
        explanation: 'A vírgula é usada para indicar pausa em uma oração.',
        materiaId,
        difficulty: 'easy',
      },
      {
        id: 'q2',
        text: 'O que é um substantivo?',
        options: ['Verbo', 'Palavra que nomeia seres', 'Adjetivo', 'Advérbio'],
        correctAnswer: 1,
        explanation: 'Substantivo é a palavra que nomeia seres, objetos, lugares, etc.',
        materiaId,
        difficulty: 'easy',
      },
      // Add more questions
    ]
    setQuestions(mockQuestions)
    setAnswers(new Array(mockQuestions.length).fill(-1))

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          handleFinish()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [router, materiaId])

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...answers]
    newAnswers[currentQuestion] = answerIndex
    setAnswers(newAnswers)
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setShowExplanation(false)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
      setShowExplanation(false)
    }
  }

  const handleFinish = () => {
    // Calculate score
    const correct = answers.filter((answer, index) => answer === questions[index].correctAnswer).length
    const score = (correct / questions.length) * 100

    // Save to localStorage for demo
    const results = {
      simuladoId: `${materiaId}-${difficulty}`,
      score,
      totalQuestions: questions.length,
      date: new Date(),
    }
    const existingResults = JSON.parse(localStorage.getItem('results') || '[]')
    existingResults.push(results)
    localStorage.setItem('results', JSON.stringify(existingResults))

    router.push(`/resultado?score=${score}&total=${questions.length}`)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  if (!user || questions.length === 0) return <div>Carregando...</div>

  const question = questions[currentQuestion]

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-xl font-bold">Simulado - Questão {currentQuestion + 1} de {questions.length}</h1>
            <div className="flex items-center space-x-4">
              <span className="text-red-500 font-bold">Tempo: {formatTime(timeLeft)}</span>
              <Button onClick={handleFinish} variant="outline">Finalizar</Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
        <Card>
          <CardHeader>
            <CardTitle>{question.text}</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup value={answers[currentQuestion].toString()} onValueChange={(value) => handleAnswer(parseInt(value))}>
              {question.options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`}>{option}</Label>
                </div>
              ))}
            </RadioGroup>

            <div className="mt-6 flex space-x-4">
              <Button onClick={handlePrevious} disabled={currentQuestion === 0} variant="outline">
                Anterior
              </Button>
              <Button onClick={() => setShowExplanation(!showExplanation)}>
                {showExplanation ? 'Ocultar Explicação' : 'Ver Explicação'}
              </Button>
              <Button onClick={handleNext} disabled={currentQuestion === questions.length - 1}>
                Próxima
              </Button>
            </div>

            {showExplanation && (
              <div className="mt-4 p-4 bg-blue-50 rounded">
                <h3 className="font-bold">Explicação:</h3>
                <p>{question.explanation}</p>
                <p className="mt-2">
                  Resposta correta: {question.options[question.correctAnswer]}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}