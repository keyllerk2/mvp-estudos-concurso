'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { FileText, Globe, Clock, Users, Heart, Zap, Shield } from 'lucide-react'
import { User, getCargoById, Materia } from '@/lib/data'

const getMateriaIcon = (materiaId: string) => {
  if (materiaId.includes('portugues') || materiaId.includes('ingles') || materiaId.includes('biblioteca') || materiaId.includes('secretaria') || materiaId.includes('auxiliar') || materiaId.includes('agente')) return FileText
  if (materiaId.includes('matematica') || materiaId.includes('logico')) return Zap
  if (materiaId.includes('ciencias') || materiaId.includes('biologia') || materiaId.includes('naturais')) return Shield
  if (materiaId.includes('geografia') || materiaId.includes('minas')) return Globe
  if (materiaId.includes('historia')) return Clock
  if (materiaId.includes('educacao') || materiaId.includes('pedagog') || materiaId.includes('didatica') || materiaId.includes('infantil') || materiaId.includes('bncc') || materiaId.includes('curriculo')) return Users
  if (materiaId.includes('fisica') || materiaId.includes('edfisica') || materiaId.includes('teorias') || materiaId.includes('esportes')) return Heart
  return FileText // default
}

const getMateriaColor = (materiaId: string) => {
  if (materiaId.includes('portugues') || materiaId.includes('ingles')) return 'text-blue-600'
  if (materiaId.includes('matematica') || materiaId.includes('logico')) return 'text-purple-600'
  if (materiaId.includes('ciencias') || materiaId.includes('biologia')) return 'text-green-600'
  if (materiaId.includes('geografia')) return 'text-teal-600'
  if (materiaId.includes('historia')) return 'text-orange-600'
  if (materiaId.includes('educacao') || materiaId.includes('pedagog')) return 'text-indigo-600'
  if (materiaId.includes('fisica') || materiaId.includes('edfisica')) return 'text-red-600'
  if (materiaId.includes('biblioteca') || materiaId.includes('secretaria') || materiaId.includes('auxiliar') || materiaId.includes('agente')) return 'text-gray-600'
  if (materiaId.includes('legislacao') || materiaId.includes('psicopedagogia') || materiaId.includes('primeiros')) return 'text-yellow-600'
  return 'text-blue-600' // default
}

export default function MateriasPage() {
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

  const handleSimulado = (materia: Materia) => {
    if (materia.isPremium && !user?.isPremium) {
      router.push('/upgrade')
      return
    }
    router.push(`/simulado/${materia.id}`)
  }

  if (!user || !cargo) return <div>Carregando...</div>

  return (
    <div className="min-h-screen bg-study-gradient">
      <header className="futuristic-header">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold">Matérias - {cargo.name}</h1>
            <Button onClick={() => router.push('/dashboard')} variant="outline" className="text-white border-white hover:bg-white hover:text-slate-800">Voltar</Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cargo.materias.map((materia: Materia) => {
              const IconComponent = getMateriaIcon(materia.id)
              const iconColor = getMateriaColor(materia.id)
              return (
                <Card key={materia.id} className={`study-card ${materia.isPremium ? 'border-yellow-200 bg-gradient-to-br from-yellow-50 to-orange-50' : ''}`}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <IconComponent className={`w-6 h-6 ${iconColor}`} />
                        <span>{materia.name}</span>
                      </div>
                      {materia.isPremium && <span className="text-yellow-500 text-sm font-medium">Premium</span>}
                    </CardTitle>
                    <CardDescription>{materia.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button
                      onClick={() => handleSimulado(materia)}
                      className="w-full"
                      variant={materia.isPremium && !user.isPremium ? 'outline' : 'default'}
                    >
                      {materia.isPremium && !user.isPremium ? 'Desbloquear Premium' : 'Fazer Simulado'}
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </main>
    </div>
  )
}