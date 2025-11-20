'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function ResultadoPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const score = parseFloat(searchParams.get('score') || '0')
  const total = parseInt(searchParams.get('total') || '0')

  useEffect(() => {
    if (!score && !total) {
      router.push('/dashboard')
    }
  }, [score, total, router])

  const percentage = Math.round(score)
  const correct = Math.round((score / 100) * total)

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Resultado do Simulado</CardTitle>
          <CardDescription>Veja seu desempenho</CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <div className="text-6xl font-bold text-blue-600 mb-4">{percentage}%</div>
          <p className="text-lg mb-4">
            Você acertou {correct} de {total} questões
          </p>
          <div className="space-y-2">
            <Button onClick={() => router.push('/dashboard')} className="w-full">
              Voltar ao Dashboard
            </Button>
            <Button onClick={() => router.back()} variant="outline" className="w-full">
              Refazer Simulado
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}