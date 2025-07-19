"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, MapPin, Clock, Phone, Star, Navigation, Calendar, Users, ExternalLink } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useTheme } from "../../../contexts/theme-context"
import Link from "next/link"
import { useParams } from "next/navigation"
import type { Paroquia } from "../../../types/paroquia" // Importar a interface unificada

export default function ParoquiaDetalhesPage() {
  const { currentTheme, isDarkMode } = useTheme()
  const params = useParams()
  const [paroquia, setParoquia] = useState<Paroquia | null>(null)

  useEffect(() => {
    const allParoquias: Paroquia[] = [
      {
        id: "1",
        nome: "Paróquia São José",
        endereco: "Rua das Flores, 123 - Centro",
        telefone: "(11) 1234-5678",
        distancia: "0.5 km",
        descricao:
          "Paróquia tradicional do bairro, fundada em 1950. Conhecida por seu trabalho social e pela devoção a São José, padroeiro dos trabalhadores. A igreja possui uma arquitetura neogótica com vitrais coloridos e um altar-mor dedicado ao santo padroeiro.",
        favorita: true,
        padre: "Pe. João Silva",
        fundacao: "1950",
        capacidade: "300 pessoas",
        imagem: "/placeholder.svg?height=200&width=400",
        coordenadas: { lat: -23.5505, lng: -46.6333 },
        missas: [
          { dia: "Segunda a Sexta", horarios: ["07:00", "19:00"] },
          { dia: "Sábado", horarios: ["19:00", "20:30"] },
          { dia: "Domingo", horarios: ["07:00", "09:00", "19:00", "20:30"] },
        ],
        eventos: [
          {
            titulo: "Novena de São José",
            data: "2024-03-10",
            horario: "19:30",
            descricao: "Novena preparatória para a festa de São José",
          },
          {
            titulo: "Adoração ao Santíssimo",
            data: "2024-03-15",
            horario: "20:00",
            descricao: "Primeira sexta-feira do mês",
          },
        ],
      },
      {
        id: "2",
        nome: "Igreja Nossa Senhora Aparecida",
        endereco: "Av. Principal, 456 - Vila Nova",
        telefone: "(11) 2345-6789",
        distancia: "1.2 km",
        descricao:
          "Santuário dedicado à Padroeira do Brasil. Local de grande devoção mariana com grupos de oração e pastoral familiar ativa. A igreja conta com uma réplica da imagem de Nossa Senhora Aparecida e um espaço para velas votivas.",
        favorita: false,
        padre: "Pe. Carlos Santos",
        fundacao: "1965",
        capacidade: "500 pessoas",
        imagem: "/placeholder.svg?height=200&width=400",
        coordenadas: { lat: -23.5515, lng: -46.6343 },
        missas: [
          { dia: "Segunda a Sexta", horarios: ["06:30", "18:30"] },
          { dia: "Sábado", horarios: ["18:30", "20:00"] },
          { dia: "Domingo", horarios: ["06:30", "08:00", "10:00", "18:30", "20:00"] },
        ],
        eventos: [
          {
            titulo: "Festa de Nossa Senhora Aparecida",
            data: "2024-10-12",
            horario: "10:00",
            descricao: "Celebração da Padroeira do Brasil",
          },
        ],
      },
      {
        id: "3",
        nome: "Santuário Sagrado Coração",
        endereco: "Praça Central, 789",
        distancia: "2.1 km",
        proximaMissa: "20:00",
        favorita: true,
        coordenadas: { lat: -23.5525, lng: -46.6353 },
        telefone: "(11) 3456-7890",
        descricao: "Santuário com adoração perpétua ao Santíssimo.",
        missas: [
          { dia: "Segunda a Sexta", horarios: ["08:00", "12:00", "20:00"] },
          { dia: "Sábado", horarios: ["20:00"] },
          { dia: "Domingo", horarios: ["08:00", "12:00", "20:00"] },
        ],
        padre: "Pe. Antonio Lima",
        fundacao: "1980",
        capacidade: "400 pessoas",
        imagem: "/placeholder.svg?height=200&width=400",
        eventos: [
          {
            titulo: "Adoração ao Santíssimo",
            data: "2024-03-15",
            horario: "20:00",
            descricao: "Primeira sexta-feira do mês",
          },
        ],
      },
      {
        id: "4",
        nome: "Capela Santa Rita",
        endereco: "Rua da Paz, 321",
        distancia: "0.8 km",
        proximaMissa: "17:30",
        favorita: false,
        coordenadas: { lat: -23.5535, lng: -46.6363 },
        telefone: "(11) 4567-8901",
        descricao: "Capela acolhedora para orações e novenas.",
        missas: [
          { dia: "Segunda a Sexta", horarios: ["17:30", "19:00"] },
          { dia: "Sábado", horarios: ["17:30", "19:00"] },
          { dia: "Domingo", horarios: ["17:30", "19:00"] },
        ],
        padre: "Pe. Francisco Costa",
        fundacao: "1995",
        capacidade: "150 pessoas",
        imagem: "/placeholder.svg?height=200&width=400",
        eventos: [],
      },
      {
        id: "5",
        nome: "Igreja São Pedro",
        endereco: "Av. Santos, 654",
        distancia: "1.5 km",
        proximaMissa: "19:30",
        favorita: false,
        coordenadas: { lat: -23.5545, lng: -46.6373 },
        telefone: "(11) 5678-9012",
        descricao: "Igreja com bela arquitetura gótica.",
        missas: [
          { dia: "Segunda a Sexta", horarios: ["07:30", "19:30"] },
          { dia: "Sábado", horarios: ["07:30", "19:30"] },
          { dia: "Domingo", horarios: ["07:30", "19:30"] },
        ],
        padre: "Pe. Miguel Santos",
        fundacao: "1940",
        capacidade: "350 pessoas",
        imagem: "/placeholder.svg?height=200&width=400",
        eventos: [],
      },
      {
        id: "6",
        nome: "Paróquia Santa Maria",
        endereco: "Rua do Carmo, 987",
        distancia: "3.0 km",
        proximaMissa: "18:00",
        favorita: true,
        coordenadas: { lat: -23.5555, lng: -46.6383 },
        telefone: "(11) 6789-0123",
        descricao: "Paróquia com forte trabalho social na comunidade.",
        missas: [
          { dia: "Segunda a Sexta", horarios: ["06:00", "18:00", "19:30"] },
          { dia: "Sábado", horarios: ["06:00", "18:00", "19:30"] },
          { dia: "Domingo", horarios: ["06:00", "18:00", "19:30"] },
        ],
        padre: "Pe. José Maria",
        fundacao: "1975",
        capacidade: "600 pessoas",
        imagem: "/placeholder.svg?height=200&width=400",
        eventos: [],
      },
    ]

    // Carregar paróquias personalizadas do localStorage
    const customParoquias: Paroquia[] = JSON.parse(localStorage.getItem("paroquias-personalizadas") || "[]")

    // Combinar todas as paróquias
    const combinedParoquias = [...allParoquias, ...customParoquias]

    // Encontrar a paróquia pelo ID
    const paroquiaData = combinedParoquias.find((p) => p.id === (params.id as string))
    if (paroquiaData) {
      setParoquia(paroquiaData)
    }
  }, [params.id])

  const toggleFavorita = () => {
    if (paroquia) {
      const updatedParoquia = { ...paroquia, favorita: !paroquia.favorita }
      setParoquia(updatedParoquia)

      // Atualizar no localStorage se for uma paróquia personalizada
      if (updatedParoquia.id.length > 5) {
        // Heurística para IDs gerados
        const customParoquias = JSON.parse(localStorage.getItem("paroquias-personalizadas") || "[]") as Paroquia[]
        const updatedCustomParoquias = customParoquias.map((p) => (p.id === updatedParoquia.id ? updatedParoquia : p))
        localStorage.setItem("paroquias-personalizadas", JSON.stringify(updatedCustomParoquias))
      }
    }
  }

  if (!paroquia) {
    return (
      <div className={`min-h-screen ${isDarkMode ? "bg-gray-900" : "bg-gray-50"} flex items-center justify-center`}>
        <div className="text-center">
          <h2 className="text-xl font-bold mb-2">Paróquia não encontrada</h2>
          <Link href="/">
            <Button>Voltar ao Início</Button>
          </Link>
        </div>
      </div>
    )
  }

  const backgroundClass = isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50"
  const cardClass = isDarkMode ? "bg-gray-800 border-gray-700 text-white" : "bg-white"

  const themeStyles = {
    backgroundColor: currentTheme.colors.primary,
    color: "white",
  }

  const abrirMaps = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${paroquia.coordenadas.lat},${paroquia.coordenadas.lng}`
    window.open(url, "_blank")
  }

  const ligarParoquia = () => {
    window.location.href = `tel:${paroquia.telefone}`
  }

  const compartilharParoquia = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: paroquia.nome,
          text: `Confira esta paróquia: ${paroquia.nome} - ${paroquia.endereco}`,
          url: window.location.href,
        })
      } catch (err) {
        console.log("Erro ao compartilhar:", err)
      }
    } else {
      navigator.clipboard.writeText(`${paroquia.nome} - ${paroquia.endereco}\n${window.location.href}`)
      alert("Informações copiadas para a área de transferência!")
    }
  }

  return (
    <div className={`min-h-screen ${backgroundClass}`}>
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className={`${cardClass} shadow-sm`}>
          <div className="p-4">
            <div className="flex items-center space-x-3">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
              <div className="flex-1">
                <h1 className="text-lg font-bold leading-tight">{paroquia.nome}</h1>
                <p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                  {paroquia.distancia} de distância
                </p>
              </div>
              <Button variant="outline" size="sm" onClick={toggleFavorita}>
                <Star className={`h-4 w-4 ${paroquia.favorita ? "fill-current text-yellow-500" : ""}`} />
              </Button>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {/* Imagem da Paróquia */}
          <div className="relative">
            <img
              src={paroquia.imagem || "/placeholder.svg?height=200&width=400&text=Imagem da Paróquia"}
              alt={paroquia.nome}
              className="w-full h-48 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            <div className="absolute bottom-4 left-4 text-white">
              <h2 className="text-xl font-bold">{paroquia.nome}</h2>
              <p className="text-sm opacity-90">{paroquia.endereco}</p>
            </div>
          </div>

          <div className="p-4 space-y-4">
            {/* Informações Básicas */}
            <Card className={cardClass}>
              <CardContent className="p-4 space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 mt-0.5" style={{ color: currentTheme.colors.primary }} />
                  <div>
                    <p className="font-medium">Endereço</p>
                    <p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>{paroquia.endereco}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Phone className="h-5 w-5 mt-0.5" style={{ color: currentTheme.colors.primary }} />
                  <div>
                    <p className="font-medium">Telefone</p>
                    <p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>{paroquia.telefone}</p>
                  </div>
                </div>

                {paroquia.padre && (
                  <div className="flex items-start space-x-3">
                    <Users className="h-5 w-5 mt-0.5" style={{ color: currentTheme.colors.primary }} />
                    <div>
                      <p className="font-medium">Pároco</p>
                      <p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>{paroquia.padre}</p>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4 pt-2">
                  {paroquia.fundacao && (
                    <div className="text-center">
                      <p className="text-lg font-bold" style={{ color: currentTheme.colors.primary }}>
                        {paroquia.fundacao}
                      </p>
                      <p className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>Fundação</p>
                    </div>
                  )}
                  {paroquia.capacidade && (
                    <div className="text-center">
                      <p className="text-lg font-bold" style={{ color: currentTheme.colors.primary }}>
                        {paroquia.capacidade}
                      </p>
                      <p className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>Capacidade</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Descrição */}
            {paroquia.descricao && (
              <Card className={cardClass}>
                <CardHeader>
                  <CardTitle>Sobre a Paróquia</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className={`text-sm leading-relaxed ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                    {paroquia.descricao}
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Tabs com Informações */}
            <Card className={cardClass}>
              <CardContent className="p-0">
                <Tabs defaultValue="missas" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="missas">Missas</TabsTrigger>
                    <TabsTrigger value="eventos">Eventos</TabsTrigger>
                  </TabsList>

                  <TabsContent value="missas" className="p-4 space-y-4">
                    {paroquia.missas && paroquia.missas.length > 0 ? (
                      paroquia.missas.map((missa, index) => (
                        <div key={index} className="space-y-2">
                          <h3 className="font-medium">{missa.dia}</h3>
                          <div className="flex flex-wrap gap-2">
                            {missa.horarios.map((horario, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                <Clock className="h-3 w-3 mr-1" />
                                {horario}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className={`text-sm text-center ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                        Nenhum horário de missa cadastrado.
                      </p>
                    )}
                  </TabsContent>

                  <TabsContent value="eventos" className="p-4 space-y-4">
                    {/* Adicionei um array vazio para eventos se não existir */}
                    {(paroquia as any).eventos && (paroquia as any).eventos.length > 0 ? (
                      (paroquia as any).eventos.map((evento: any, index: number) => (
                        <div key={index} className="space-y-2">
                          <h3 className="font-medium">{evento.titulo}</h3>
                          <div className="flex items-center gap-4 text-sm">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {new Date(evento.data).toLocaleDateString("pt-BR")}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {evento.horario}
                            </div>
                          </div>
                          <p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                            {evento.descricao}
                          </p>
                        </div>
                      ))
                    ) : (
                      <p className={`text-sm text-center ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                        Nenhum evento programado
                      </p>
                    )}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Localização com Google Maps */}
            <Card className={cardClass}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Localização
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="h-48 bg-gray-100 relative rounded-b-lg overflow-hidden">
                  {/* Simulação do Google Maps */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-green-100">
                    {/* Grid de ruas simulado */}
                    <div className="absolute inset-0 opacity-20">
                      {[...Array(8)].map((_, i) => (
                        <div key={i}>
                          <div className="absolute bg-gray-400 h-px w-full" style={{ top: `${(i + 1) * 12.5}%` }} />
                          <div className="absolute bg-gray-400 w-px h-full" style={{ left: `${(i + 1) * 12.5}%` }} />
                        </div>
                      ))}
                    </div>

                    {/* Marcador da paróquia */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <div
                        className="w-8 h-8 rounded-full border-4 border-white shadow-lg flex items-center justify-center"
                        style={{ backgroundColor: currentTheme.colors.primary }}
                      >
                        <MapPin className="h-4 w-4 text-white" />
                      </div>
                    </div>

                    {/* Controles do mapa */}
                    <div className="absolute top-4 right-4 space-y-2">
                      <Button size="sm" variant="secondary" className="w-8 h-8 p-0">
                        +
                      </Button>
                      <Button size="sm" variant="secondary" className="w-8 h-8 p-0">
                        -
                      </Button>
                    </div>

                    {/* Logo Google Maps simulado */}
                    <div className="absolute bottom-2 left-2 text-xs text-gray-600 bg-white px-2 py-1 rounded">
                      Google Maps
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Coordenadas</p>
                      <p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                        {paroquia.coordenadas.lat}, {paroquia.coordenadas.lng}
                      </p>
                    </div>
                    <Button variant="outline" size="sm" onClick={abrirMaps}>
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Abrir no Maps
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Botões de Ação */}
            <div className="space-y-3">
              <Button onClick={abrirMaps} className="w-full text-white" style={themeStyles}>
                <Navigation className="h-4 w-4 mr-2" />
                Como Chegar
              </Button>
              <Button onClick={ligarParoquia} variant="outline" className="w-full bg-transparent">
                <Phone className="h-4 w-4 mr-2" />
                Ligar para Paróquia
              </Button>
              <Button onClick={compartilharParoquia} variant="outline" className="w-full bg-transparent">
                Compartilhar Paróquia
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
