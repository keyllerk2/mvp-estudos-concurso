'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { User, FileText, Play, Star, Bookmark, Bell, Shield } from 'lucide-react'
import { User as UserType, getCargoById } from '@/lib/data'

export default function Dashboard() {
  const [user, setUser] = useState<UserType | null>(null)
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      const parsedUser = JSON.parse(userData)
      setUser(parsedUser)
      if (!parsedUser.selectedCargo) {
        router.push('/select-cargo')
      }
    } else {
      router.push('/')
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('user')
    router.push('/')
  }

  if (!user) return <div>Carregando...</div>

  const selectedCargo = getCargoById(user.selectedCargo || '')

  return (
    <div className="min-h-screen bg-study-gradient">
      <header className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold text-gray-900">EstudaBetim</h1>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Olá, {user.name}</span>
              {user.isPremium && <span className="text-yellow-500 font-bold flex items-center"><Shield className="w-4 h-4 mr-1" />Premium</span>}
              <Button onClick={handleLogout} variant="outline">Sair</Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="mb-8 animate-fade-in">
            <h2 className="text-2xl font-bold text-gray-900">Bem-vindo, {user.name}!</h2>
            {selectedCargo && (
              <p className="text-gray-600">Preparando-se para: {selectedCargo.name}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="study-card animate-slide-up">
              <CardHeader className="study-card-header">
                <div className="flex items-center space-x-2">
                  <User className="w-5 h-5 text-blue-600" />
                  <CardTitle className="study-card-title">Selecionar Cargo</CardTitle>
                </div>
                <CardDescription className="study-card-description">
                  {selectedCargo ? `Cargo atual: ${selectedCargo.name}` : 'Escolha o cargo para o qual deseja se preparar'}
                </CardDescription>
              </CardHeader>
              <CardContent className="study-card-content">
                <Button onClick={() => router.push('/select-cargo')} className="w-full btn-primary">
                  {selectedCargo ? 'Alterar Cargo' : 'Selecionar Cargo'}
                </Button>
              </CardContent>
            </Card>

            <Card className="study-card animate-slide-up">
              <CardHeader className="study-card-header">
                <div className="flex items-center space-x-2">
                  <FileText className="w-5 h-5 text-green-600" />
                  <CardTitle className="study-card-title">Matérias</CardTitle>
                </div>
                <CardDescription className="study-card-description">
                  Acesse suas matérias de estudo
                </CardDescription>
              </CardHeader>
              <CardContent className="study-card-content">
                <Button
                  onClick={() => user.selectedCargo ? router.push(`/materias/${user.selectedCargo}`) : router.push('/select-cargo')}
                  className="w-full btn-primary"
                >
                  Ver Matérias
                </Button>
              </CardContent>
            </Card>

            <Card className="study-card animate-slide-up">
              <CardHeader className="study-card-header">
                <div className="flex items-center space-x-2">
                  <Play className="w-5 h-5 text-purple-600" />
                  <CardTitle className="study-card-title">Simulados</CardTitle>
                </div>
                <CardDescription className="study-card-description">
                  Pratique com simulados completos
                </CardDescription>
              </CardHeader>
              <CardContent className="study-card-content">
                <Button
                  onClick={() => user.selectedCargo ? router.push(`/simulados/${user.selectedCargo}`) : router.push('/select-cargo')}
                  className="w-full btn-primary"
                  disabled={!user.selectedCargo}
                >
                  Fazer Simulado
                </Button>
              </CardContent>
            </Card>

            <Card className="study-card animate-slide-up">
              <CardHeader className="study-card-header">
                <div className="flex items-center space-x-2">
                  <Star className="w-5 h-5 text-yellow-600" />
                  <CardTitle className="study-card-title">Estatísticas</CardTitle>
                </div>
                <CardDescription className="study-card-description">
                  Veja seu progresso e desempenho
                </CardDescription>
              </CardHeader>
              <CardContent className="study-card-content">
                <Button onClick={() => router.push('/estatisticas')} className="w-full btn-secondary">
                  Ver Estatísticas
                </Button>
              </CardContent>
            </Card>

            <Card className="study-card animate-slide-up">
              <CardHeader className="study-card-header">
                <div className="flex items-center space-x-2">
                  <Bookmark className="w-5 h-5 text-red-600" />
                  <CardTitle className="study-card-title">Questões Salvas</CardTitle>
                </div>
                <CardDescription className="study-card-description">
                  Revise questões marcadas para estudo
                </CardDescription>
              </CardHeader>
              <CardContent className="study-card-content">
                <Button onClick={() => router.push('/questoes-salvas')} className="w-full btn-secondary">
                  Ver Questões
                </Button>
              </CardContent>
            </Card>

            <Card className="study-card animate-slide-up">
              <CardHeader className="study-card-header">
                <div className="flex items-center space-x-2">
                  <Star className="w-5 h-5 text-orange-600" />
                  <CardTitle className="study-card-title">Conquistas</CardTitle>
                </div>
                <CardDescription className="study-card-description">
                  Veja suas medalhas e conquistas
                </CardDescription>
              </CardHeader>
              <CardContent className="study-card-content">
                <Button onClick={() => router.push('/conquistas')} className="w-full btn-secondary">
                  Ver Conquistas
                </Button>
              </CardContent>
            </Card>

            <Card className="study-card animate-slide-up">
              <CardHeader className="study-card-header">
                <div className="flex items-center space-x-2">
                  <Bell className="w-5 h-5 text-indigo-600" />
                  <CardTitle className="study-card-title">Notificações</CardTitle>
                </div>
                <CardDescription className="study-card-description">
                  Informações sobre o edital e prova
                </CardDescription>
              </CardHeader>
              <CardContent className="study-card-content">
                <Button onClick={() => router.push('/notificacoes')} className="w-full btn-secondary">
                  Ver Notificações
                </Button>
              </CardContent>
            </Card>

            <Card className="study-card animate-slide-up border-yellow-200 bg-gradient-to-br from-yellow-50 to-orange-50">
              <CardHeader className="study-card-header">
                <div className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-yellow-600" />
                  <CardTitle className="text-yellow-800 study-card-title">Premium</CardTitle>
                </div>
                <CardDescription className="text-yellow-700 study-card-description">
                  {user.isPremium ? 'Acesso total liberado' : 'Desbloqueie todo o conteúdo'}
                </CardDescription>
              </CardHeader>
              <CardContent className="study-card-content">
                <Button
                  onClick={() => user.isPremium ? router.push('/premium') : router.push('/upgrade')}
                  className="w-full btn-primary"
                  variant={user.isPremium ? "outline" : "default"}
                >
                  {user.isPremium ? 'Gerenciar Premium' : 'Upgrade para Premium'}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}