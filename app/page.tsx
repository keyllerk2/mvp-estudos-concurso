'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { mockUsers } from '@/lib/data'

export default function Home() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLogin, setIsLogin] = useState(true)
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (isLogin) {
      // Login logic
      const storedUsers = JSON.parse(localStorage.getItem('users') || '[]')
      const allUsers = [...mockUsers, ...storedUsers]
      const user = allUsers.find((u: any) => u.email === email)
      
      if (user) {
        localStorage.setItem('user', JSON.stringify(user))
        router.push('/dashboard')
      } else {
        alert('Usuário não encontrado. Use user@example.com ou cadastre-se.')
      }
    } else {
      // Cadastro logic
      const storedUsers = JSON.parse(localStorage.getItem('users') || '[]')
      const allUsers = [...mockUsers, ...storedUsers]
      const existingUser = allUsers.find((u: any) => u.email === email)
      
      if (existingUser) {
        alert('Este email já está cadastrado. Faça login.')
        setIsLogin(true)
      } else {
        const newUser = {
          id: Date.now().toString(),
          email,
          name: email.split('@')[0], // Simple name from email
          isPremium: false
        }
        storedUsers.push(newUser)
        localStorage.setItem('users', JSON.stringify(storedUsers))
        localStorage.setItem('user', JSON.stringify(newUser))
        router.push('/dashboard')
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-study-gradient">
      <Card className="study-card w-full max-w-md animate-fade-in">
        <CardHeader className="study-card-header text-center">
          <CardTitle className="study-card-title text-2xl font-bold text-gray-900">EstudaBetim</CardTitle>
          <CardDescription className="study-card-description">
            Plataforma de estudos para o Concurso da Prefeitura de Betim 2025
          </CardDescription>
        </CardHeader>
        <CardContent className="study-card-content">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                required
              />
            </div>
            <div>
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full btn-primary">
              {isLogin ? 'Entrar' : 'Cadastrar'}
            </Button>
          </form>
          <div className="mt-4 text-center">
            <Button variant="link" onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? 'Não tem conta? Cadastre-se' : 'Já tem conta? Faça login'}
            </Button>
          </div>
          <div className="mt-4 text-sm text-gray-600">
            <p>Para teste: user@example.com</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}