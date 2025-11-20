'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { mockCargos, Cargo } from '@/lib/data'

export default function SelectCargo() {
  const [selectedCargo, setSelectedCargo] = useState<string>('')
  const router = useRouter()

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}')
    if (user.selectedCargo) {
      router.push('/dashboard')
    }
  }, [router])

  const handleSelectCargo = () => {
    if (selectedCargo) {
      const user = JSON.parse(localStorage.getItem('user') || '{}')
      user.selectedCargo = selectedCargo
      localStorage.setItem('user', JSON.stringify(user))
      router.push('/dashboard')
    }
  }

  return (
    <div className="min-h-screen bg-study-gradient p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-900 animate-fade-in">
          Selecione seu Cargo - Concurso Prefeitura de Betim 2025
        </h1>
        <div className="flex flex-col items-center space-y-6">
          <div className="w-full max-w-md">
            <label htmlFor="cargo-select" className="block text-sm font-medium text-gray-700 mb-2">
              Escolha seu cargo:
            </label>
            <Select value={selectedCargo} onValueChange={setSelectedCargo}>
              <SelectTrigger id="cargo-select" className="w-full">
                <SelectValue placeholder="Selecione um cargo" />
              </SelectTrigger>
              <SelectContent>
                {mockCargos.map((cargo: Cargo) => (
                  <SelectItem key={cargo.id} value={cargo.id}>
                    {cargo.name} - {cargo.description}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button
            onClick={handleSelectCargo}
            disabled={!selectedCargo}
            className="px-8 py-2 btn-primary"
          >
            Confirmar Seleção
          </Button>
        </div>
      </div>
    </div>
  )
}