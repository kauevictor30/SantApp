"use client"

import { useState } from "react"
import { ArrowLeft, Save, Calendar, BookOpen } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useTheme } from "../../../contexts/theme-context"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function CriarNovenaPage() {
  const { currentTheme, isDarkMode } = useTheme()
  const router = useRouter()
  const [novena, setNovena] = useState({
    titulo: "",
    santo: "",
    descricao: "",
    oracao: "",
    reflexao: "",
    categoria: "",
  })

  const backgroundClass = isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50"
  const cardClass = isDarkMode ? "bg-gray-800 border-gray-700 text-white" : "bg-white"

  const themeStyles = {
    backgroundColor: currentTheme.colors.primary,
    color: "white",
  }

  const salvarNovena = () => {
    if (!novena.titulo || !novena.santo || !novena.oracao) {
      alert("Por favor, preencha os campos obrigatórios: Título, Santo e Oração")
      return
    }

    // Aqui você salvaria a novena no localStorage ou enviaria para uma API
    const novenaCompleta = {
      id: Date.now().toString(),
      ...novena,
      diasConcluidos: [false, false, false, false, false, false, false, false, false],
      dataCriacao: new Date().toISOString(),
    }

    // Salvar no localStorage
    const novenasSalvas = JSON.parse(localStorage.getItem("novenas-personalizadas") || "[]")
    novenasSalvas.push(novenaCompleta)
    localStorage.setItem("novenas-personalizadas", JSON.stringify(novenasSalvas))

    alert("Novena criada com sucesso!")
    router.push("/novena")
  }

  return (
    <div className={`min-h-screen ${backgroundClass}`}>
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className={`${cardClass} shadow-sm`}>
          <div className="p-4">
            <div className="flex items-center space-x-3">
              <Link href="/novena">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
              <div>
                <h1 className="text-xl font-bold">Criar Nova Novena</h1>
                <p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>Personalize sua devoção</p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 space-y-6">
          {/* Informações Básicas */}
          <Card className={cardClass}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Informações Básicas
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="titulo">Título da Novena *</Label>
                <Input
                  id="titulo"
                  value={novena.titulo}
                  onChange={(e) => setNovena({ ...novena, titulo: e.target.value })}
                  placeholder="Ex: Novena a São Francisco"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="santo">Santo/Santa *</Label>
                <Input
                  id="santo"
                  value={novena.santo}
                  onChange={(e) => setNovena({ ...novena, santo: e.target.value })}
                  placeholder="Ex: São Francisco de Assis"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="categoria">Categoria</Label>
                <Select value={novena.categoria} onValueChange={(value) => setNovena({ ...novena, categoria: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="santos">Santos</SelectItem>
                    <SelectItem value="nossa-senhora">Nossa Senhora</SelectItem>
                    <SelectItem value="jesus">Jesus Cristo</SelectItem>
                    <SelectItem value="espirito-santo">Espírito Santo</SelectItem>
                    <SelectItem value="anjos">Anjos</SelectItem>
                    <SelectItem value="especiais">Intenções Especiais</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="descricao">Descrição</Label>
                <Textarea
                  id="descricao"
                  value={novena.descricao}
                  onChange={(e) => setNovena({ ...novena, descricao: e.target.value })}
                  placeholder="Breve descrição sobre o santo ou a intenção da novena"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Conteúdo da Novena */}
          <Card className={cardClass}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Conteúdo da Novena
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="oracao">Oração Principal *</Label>
                <Textarea
                  id="oracao"
                  value={novena.oracao}
                  onChange={(e) => setNovena({ ...novena, oracao: e.target.value })}
                  placeholder="Digite a oração que será rezada durante os 9 dias da novena"
                  rows={6}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="reflexao">Reflexão Diária</Label>
                <Textarea
                  id="reflexao"
                  value={novena.reflexao}
                  onChange={(e) => setNovena({ ...novena, reflexao: e.target.value })}
                  placeholder="Reflexão ou meditação para acompanhar a oração"
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          {/* Exemplo de Novena */}
          <Card className={cardClass}>
            <CardHeader>
              <CardTitle>💡 Dica</CardTitle>
            </CardHeader>
            <CardContent>
              <p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                Uma novena é uma devoção de 9 dias consecutivos. Inclua uma oração específica ao santo escolhido e uma
                reflexão que ajude na meditação diária. Você pode basear-se em novenas tradicionais ou criar uma
                personalizada para suas intenções.
              </p>
            </CardContent>
          </Card>

          {/* Botões de Ação */}
          <div className="space-y-3">
            <Button onClick={salvarNovena} className="w-full text-white" style={themeStyles}>
              <Save className="h-4 w-4 mr-2" />
              Salvar Novena
            </Button>
            <Link href="/novena">
              <Button variant="outline" className="w-full bg-transparent">
                Cancelar
              </Button>
            </Link>
          </div>

          {/* Campos obrigatórios */}
          <div className="text-center">
            <p className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>* Campos obrigatórios</p>
          </div>
        </div>
      </div>
    </div>
  )
}
