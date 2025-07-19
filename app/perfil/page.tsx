"use client"

import { useState } from "react"
import { ArrowLeft, Edit, Star, MapPin, Phone, Mail } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useTheme } from "../../contexts/theme-context"
import Link from "next/link"

export default function PerfilPage() {
  const { currentTheme, isDarkMode } = useTheme()
  const [usuario] = useState({
    nome: "Maria Silva",
    email: "maria.silva@email.com",
    telefone: "(11) 99999-9999",
    paroquiaFavorita: "Paróquia São José",
    tempoUso: "6 meses",
    totalOracoes: 127,
    novenasConcluidas: 8,
    tercosConcluidos: 45,
  })

  const backgroundClass = isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50"
  const cardClass = isDarkMode ? "bg-gray-800 border-gray-700 text-white" : "bg-white"

  const themeStyles = {
    backgroundColor: currentTheme.colors.primary,
    color: "white",
  }

  return (
    <div className={`min-h-screen ${backgroundClass}`}>
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className={`${cardClass} shadow-sm`}>
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Link href="/">
                  <Button variant="ghost" size="sm">
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                </Link>
                <div>
                  <h1 className="text-xl font-bold">Meu Perfil</h1>
                  <p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                    Suas informações pessoais
                  </p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                <Edit className="h-4 w-4 mr-2" />
                Editar
              </Button>
            </div>
          </div>
        </div>

        <div className="p-4 space-y-6">
          {/* Informações Pessoais */}
          <Card className={cardClass}>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage src="/placeholder.svg?height=64&width=64" />
                  <AvatarFallback className="text-lg font-bold" style={themeStyles}>
                    {usuario.nome
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h2 className="text-xl font-bold">{usuario.nome}</h2>
                  <p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                    Membro há {usuario.tempoUso}
                  </p>
                  <Badge variant="outline" className="mt-2">
                    <Star className="h-3 w-3 mr-1 fill-current text-yellow-500" />
                    Devoto Ativo
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contato */}
          <Card className={cardClass}>
            <CardHeader>
              <CardTitle>Informações de Contato</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5" style={{ color: currentTheme.colors.primary }} />
                <div>
                  <p className="font-medium">Email</p>
                  <p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>{usuario.email}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5" style={{ color: currentTheme.colors.primary }} />
                <div>
                  <p className="font-medium">Telefone</p>
                  <p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>{usuario.telefone}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5" style={{ color: currentTheme.colors.primary }} />
                <div>
                  <p className="font-medium">Paróquia Favorita</p>
                  <p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                    {usuario.paroquiaFavorita}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Estatísticas Espirituais */}
          <Card className={cardClass}>
            <CardHeader>
              <CardTitle>Jornada Espiritual</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 rounded-lg" style={{ backgroundColor: currentTheme.colors.accent }}>
                  <div className="text-2xl font-bold" style={{ color: currentTheme.colors.primary }}>
                    {usuario.totalOracoes}
                  </div>
                  <p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>Orações Feitas</p>
                </div>
                <div className="text-center p-4 rounded-lg" style={{ backgroundColor: currentTheme.colors.accent }}>
                  <div className="text-2xl font-bold" style={{ color: currentTheme.colors.primary }}>
                    {usuario.tercosConcluidos}
                  </div>
                  <p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>Terços Rezados</p>
                </div>
                <div className="text-center p-4 rounded-lg" style={{ backgroundColor: currentTheme.colors.accent }}>
                  <div className="text-2xl font-bold" style={{ color: currentTheme.colors.primary }}>
                    {usuario.novenasConcluidas}
                  </div>
                  <p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>Novenas Completas</p>
                </div>
                <div className="text-center p-4 rounded-lg" style={{ backgroundColor: currentTheme.colors.accent }}>
                  <div className="text-2xl font-bold" style={{ color: currentTheme.colors.primary }}>
                    12
                  </div>
                  <p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>Missas Este Mês</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Atividade Recente */}
          <Card className={cardClass}>
            <CardHeader>
              <CardTitle>Atividade Recente</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: currentTheme.colors.primary }}></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Concluiu Novena a Nossa Senhora</p>
                  <p className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>Há 2 dias</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: currentTheme.colors.primary }}></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Rezou o Terço dos Mistérios Gozosos</p>
                  <p className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>Há 1 semana</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: currentTheme.colors.primary }}></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Adicionou nova paróquia favorita</p>
                  <p className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>Há 2 semanas</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Configurações Rápidas */}
          <div className="space-y-3">
            <Link href="/configuracoes">
              <Button variant="outline" className="w-full bg-transparent">
                Configurações
              </Button>
            </Link>
            <Button variant="outline" className="w-full bg-transparent">
              Compartilhar Perfil
            </Button>
            <Button variant="outline" className="w-full text-red-600 border-red-200 hover:bg-red-50 bg-transparent">
              Sair da Conta
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
