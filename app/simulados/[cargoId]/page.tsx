'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { User, getCargoById, Materia } from '@/lib/data'

export default function SimuladosPage() {
  const [user, setUser] = useState<User | null>(null)
  const [cargo, setCargo] = useState<any>(null)
  const router = useRouter()
  const params = useParams()
  const cargoId = params.cargoId as string

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      const parsedUser = JSON.parse(userData)
      setUser(parsedUser)
      const cargoData = getCargoById(cargoId)
      setCargo(cargoData)
    } else {
      router.push('/')
    }
  }, [router, cargoId])

  const handleSimulado = (materia: Materia, difficulty: string) => {
    if (materia.isPremium && !user?.isPremium) {
      router.push('/upgrade')
      return
    }
    router.push(`/simulado/${materia.id}?difficulty=${difficulty}`)
  }

  if (!user || !cargo) return <div>Carregando...</div>

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold text-gray-900">Simulados - {cargo.name}</h1>
            <Button onClick={() => router.push('/dashboard')} variant="outline">Voltar</Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {cargo.materias.map((materia: Materia) => (
            <div key={materia.id} className="mb-8">
              <h2 className="text-xl font-bold mb-4">{materia.name}</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Simulado Fácil</CardTitle>
                    <CardDescription>20 questões fáceis</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button
                      onClick={() => handleSimulado(materia, 'easy')}
                      className="w-full"
                      variant={materia.isPremium && !user.isPremium ? 'outline' : 'default'}
                    >
                      {materia.isPremium && !user.isPremium ? 'Premium' : 'Iniciar'}
                    </Button>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Simulado Médio</CardTitle>
                    <CardDescription>20 questões médias</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button
                      onClick={() => handleSimulado(materia, 'medium')}
                      className="w-full"
                      variant={materia.isPremium && !user.isPremium ? 'outline' : 'default'}
                    >
                      {materia.isPremium && !user.isPremium ? 'Premium' : 'Iniciar'}
                    </Button>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Simulado Difícil</CardTitle>
                    <CardDescription>20 questões difíceis</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button
                      onClick={() => handleSimulado(materia, 'hard')}
                      className="w-full"
                      variant={materia.isPremium && !user.isPremium ? 'outline' : 'default'}
                    >
                      {materia.isPremium && !user.isPremium ? 'Premium' : 'Iniciar'}
                    </Button>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Simulado Geral</CardTitle>
                    <CardDescription>50 questões mistas</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button
                      onClick={() => handleSimulado(materia, 'general')}
                      className="w-full"
                      variant={materia.isPremium && !user.isPremium ? 'outline' : 'default'}
                    >
                      {materia.isPremium && !user.isPremium ? 'Premium' : 'Iniciar'}
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}