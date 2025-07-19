"use client"

import { useState, useEffect } from "react"
import { MapPin, Clock, Star, Plus, Navigation, List, Grid3X3, ChevronDown, Eye } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useTheme } from "../contexts/theme-context"
import Link from "next/link"
import type { Paroquia, MissaHorario } from "../types/paroquia" // Importar a interface unificada

export default function MissasPage() {
  const { currentTheme, isDarkMode } = useTheme()
  const [viewMode, setViewMode] = useState<"grid" | "list" | "map">("grid")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [novaParoquia, setNovaParoquia] = useState({
    nome: "",
    endereco: "",
    telefone: "",
    padre: "",
    descricao: "",
    capacidade: "",
    fundacao: "",
    missasSemana: "",
    missasSabado: "",
    missasDomingo: "",
  })

  const [paroquias, setParoquias] = useState<Paroquia[]>([
    {
      id: "1",
      nome: "Paróquia São José",
      endereco: "Rua das Flores, 123",
      distancia: "0.5 km",
      proximaMissa: "19:00",
      favorita: true,
      coordenadas: { lat: -23.5505, lng: -46.6333 },
      telefone: "(11) 1234-5678",
      descricao: "Paróquia tradicional do bairro, fundada em 1950.",
      missas: [
        { dia: "Segunda a Sexta", horarios: ["07:00", "19:00"] },
        { dia: "Sábado", horarios: ["19:00", "20:30"] },
        { dia: "Domingo", horarios: ["07:00", "09:00", "19:00", "20:30"] },
      ],
      padre: "Pe. João Silva",
      fundacao: "1950",
      capacidade: "300 pessoas",
      imagem: "/placeholder.svg?height=200&width=400",
    },
    {
      id: "2",
      nome: "Igreja N. Sra. Aparecida",
      endereco: "Av. Principal, 456",
      distancia: "1.2 km",
      proximaMissa: "18:30",
      favorita: false,
      coordenadas: { lat: -23.5515, lng: -46.6343 },
      telefone: "(11) 2345-6789",
      descricao: "Santuário dedicado à Padroeira do Brasil.",
      missas: [
        { dia: "Segunda a Sexta", horarios: ["06:30", "18:30"] },
        { dia: "Sábado", horarios: ["18:30", "20:00"] },
        { dia: "Domingo", horarios: ["06:30", "08:00", "10:00", "18:30", "20:00"] },
      ],
      padre: "Pe. Carlos Santos",
      fundacao: "1965",
      capacidade: "500 pessoas",
      imagem: "/placeholder.svg?height=200&width=400",
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
    },
  ])

  // Carregar paróquias do localStorage ao inicializar
  useEffect(() => {
    const paroquiasSalvas = localStorage.getItem("paroquias-personalizadas")
    if (paroquiasSalvas) {
      const paroquiasPersonalizadas = JSON.parse(paroquiasSalvas) as Paroquia[]
      setParoquias((prev) => {
        // Filtrar duplicatas se houver (baseado no ID)
        const existingIds = new Set(prev.map((p) => p.id))
        const newParishes = paroquiasPersonalizadas.filter((p) => !existingIds.has(p.id))
        return [...prev, ...newParishes]
      })
    }
  }, [])

  const toggleFavorita = (id: string) => {
    setParoquias((prev) => {
      const updatedParoquias = prev.map((p) => (p.id === id ? { ...p, favorita: !p.favorita } : p))
      // Atualizar localStorage para paróquias personalizadas
      const customParoquias = updatedParoquias.filter((p) => p.id.length > 5) // Heurística para IDs gerados
      localStorage.setItem("paroquias-personalizadas", JSON.stringify(customParoquias))
      return updatedParoquias
    })
  }

  const resetForm = () => {
    setNovaParoquia({
      nome: "",
      endereco: "",
      telefone: "",
      padre: "",
      descricao: "",
      capacidade: "",
      fundacao: "",
      missasSemana: "",
      missasSabado: "",
      missasDomingo: "",
    })
  }

  const adicionarParoquia = () => {
    // Validação
    if (!novaParoquia.nome.trim()) {
      alert("Por favor, informe o nome da paróquia")
      return
    }
    if (!novaParoquia.endereco.trim()) {
      alert("Por favor, informe o endereço da paróquia")
      return
    }

    // Processar horários de missas para a estrutura unificada
    const missasStructured: MissaHorario[] = []
    if (novaParoquia.missasSemana) {
      missasStructured.push({
        dia: "Segunda a Sexta",
        horarios: novaParoquia.missasSemana.split(",").map((h) => h.trim()),
      })
    }
    if (novaParoquia.missasSabado) {
      missasStructured.push({ dia: "Sábado", horarios: novaParoquia.missasSabado.split(",").map((h) => h.trim()) })
    }
    if (novaParoquia.missasDomingo) {
      missasStructured.push({ dia: "Domingo", horarios: novaParoquia.missasDomingo.split(",").map((h) => h.trim()) })
    }

    const nova: Paroquia = {
      id: Date.now().toString(), // ID único para paróquias adicionadas
      nome: novaParoquia.nome,
      endereco: novaParoquia.endereco,
      telefone: novaParoquia.telefone || "Não informado",
      padre: novaParoquia.padre || "Não informado",
      descricao: novaParoquia.descricao || "Paróquia adicionada pelo usuário.",
      capacidade: novaParoquia.capacidade || "Não informado",
      fundacao: novaParoquia.fundacao || "Não informado",
      distancia: "-- km", // Distância pode ser calculada dinamicamente se houver localização real
      proximaMissa: missasStructured[0]?.horarios[0] || "--:--", // Pega o primeiro horário disponível
      favorita: false,
      coordenadas: { lat: -23.5505, lng: -46.6333 }, // Coordenadas padrão, idealmente seriam obtidas por geocoding
      missas: missasStructured,
      imagem: "/placeholder.svg?height=200&width=400", // Imagem padrão
    }

    // Adicionar à lista
    setParoquias((prev) => [...prev, nova])

    // Salvar no localStorage
    const paroquiasSalvas = JSON.parse(localStorage.getItem("paroquias-personalizadas") || "[]") as Paroquia[]
    paroquiasSalvas.push(nova)
    localStorage.setItem("paroquias-personalizadas", JSON.stringify(paroquiasSalvas))

    // Resetar formulário e fechar dialog
    resetForm()
    setDialogOpen(false)

    // Feedback para o usuário
    alert("Paróquia adicionada com sucesso!")
  }

  const themeStyles = {
    backgroundColor: currentTheme.colors.primary,
    color: "white",
  }

  const backgroundClass = isDarkMode ? "bg-gray-900" : "bg-gray-50"
  const cardClass = isDarkMode ? "bg-gray-800 border-gray-700 text-white" : "bg-white"

  return (
    <div className={`min-h-screen ${backgroundClass}`}>
      <div className="max-w-md mx-auto">
        {/* Header Simplificado */}
        <div className={cardClass}>
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl font-bold">Paróquias Próximas</h1>
                <p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                  Encontre missas na sua região
                </p>
              </div>
              <Link href="/perfil">
                <Button variant="outline" size="sm">
                  Perfil
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Controles de Visualização Melhorados */}
        <div className={`${cardClass} border-b p-4`}>
          <div className="flex items-center justify-between">
            <span className="font-medium">Visualização</span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  {viewMode === "grid" && <Grid3X3 className="h-4 w-4 mr-2" />}
                  {viewMode === "list" && <List className="h-4 w-4 mr-2" />}
                  {viewMode === "map" && <Navigation className="h-4 w-4 mr-2" />}
                  {viewMode === "grid" ? "Grade" : viewMode === "list" ? "Lista" : "Mapa"}
                  <ChevronDown className="h-4 w-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setViewMode("grid")}>
                  <Grid3X3 className="h-4 w-4 mr-2" />
                  Grade
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setViewMode("list")}>
                  <List className="h-4 w-4 mr-2" />
                  Lista
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setViewMode("map")}>
                  <Navigation className="h-4 w-4 mr-2" />
                  Mapa
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Conteúdo Principal */}
        <div className="p-4">
          {viewMode === "grid" && (
            <div className="space-y-4">
              {/* Botão Adicionar Melhorado */}
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="w-full text-white" style={themeStyles}>
                    <Plus className="h-4 w-4 mr-2" />
                    Adicionar Paróquia
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Nova Paróquia</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    {/* Informações Básicas */}
                    <div className="space-y-3">
                      <h3 className="font-semibold text-sm">Informações Básicas *</h3>
                      <div>
                        <Label>Nome da Paróquia *</Label>
                        <Input
                          value={novaParoquia.nome}
                          onChange={(e) => setNovaParoquia((prev) => ({ ...prev, nome: e.target.value }))}
                          placeholder="Ex: Igreja São Pedro"
                        />
                      </div>
                      <div>
                        <Label>Endereço Completo *</Label>
                        <Input
                          value={novaParoquia.endereco}
                          onChange={(e) => setNovaParoquia((prev) => ({ ...prev, endereco: e.target.value }))}
                          placeholder="Ex: Rua das Palmeiras, 123 - Centro"
                        />
                      </div>
                      <div>
                        <Label>Telefone</Label>
                        <Input
                          value={novaParoquia.telefone}
                          onChange={(e) => setNovaParoquia((prev) => ({ ...prev, telefone: e.target.value }))}
                          placeholder="Ex: (11) 1234-5678"
                        />
                      </div>
                    </div>

                    {/* Informações da Paróquia */}
                    <div className="space-y-3">
                      <h3 className="font-semibold text-sm">Detalhes da Paróquia</h3>
                      <div>
                        <Label>Pároco</Label>
                        <Input
                          value={novaParoquia.padre}
                          onChange={(e) => setNovaParoquia((prev) => ({ ...prev, padre: e.target.value }))}
                          placeholder="Ex: Pe. João Silva"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <Label>Ano de Fundação</Label>
                          <Input
                            value={novaParoquia.fundacao}
                            onChange={(e) => setNovaParoquia((prev) => ({ ...prev, fundacao: e.target.value }))}
                            placeholder="Ex: 1950"
                          />
                        </div>
                        <div>
                          <Label>Capacidade</Label>
                          <Input
                            value={novaParoquia.capacidade}
                            onChange={(e) => setNovaParoquia((prev) => ({ ...prev, capacidade: e.target.value }))}
                            placeholder="Ex: 300 pessoas"
                          />
                        </div>
                      </div>
                      <div>
                        <Label>Descrição</Label>
                        <Textarea
                          value={novaParoquia.descricao}
                          onChange={(e) => setNovaParoquia((prev) => ({ ...prev, descricao: e.target.value }))}
                          placeholder="Breve descrição da paróquia..."
                          rows={3}
                        />
                      </div>
                    </div>

                    {/* Horários de Missas */}
                    <div className="space-y-3">
                      <h3 className="font-semibold text-sm">Horários de Missas</h3>
                      <div>
                        <Label>Segunda a Sexta</Label>
                        <Input
                          value={novaParoquia.missasSemana}
                          onChange={(e) => setNovaParoquia((prev) => ({ ...prev, missasSemana: e.target.value }))}
                          placeholder="Ex: 07:00, 19:00"
                        />
                      </div>
                      <div>
                        <Label>Sábado</Label>
                        <Input
                          value={novaParoquia.missasSabado}
                          onChange={(e) => setNovaParoquia((prev) => ({ ...prev, missasSabado: e.target.value }))}
                          placeholder="Ex: 19:00, 20:30"
                        />
                      </div>
                      <div>
                        <Label>Domingo</Label>
                        <Input
                          value={novaParoquia.missasDomingo}
                          onChange={(e) => setNovaParoquia((prev) => ({ ...prev, missasDomingo: e.target.value }))}
                          placeholder="Ex: 07:00, 09:00, 19:00"
                        />
                      </div>
                      <p className="text-xs text-gray-500">Separe os horários por vírgula</p>
                    </div>

                    <div className="flex gap-2">
                      <Button onClick={adicionarParoquia} className="flex-1 text-white" style={themeStyles}>
                        Adicionar Paróquia
                      </Button>
                      <Button
                        onClick={() => {
                          resetForm()
                          setDialogOpen(false)
                        }}
                        variant="outline"
                        className="flex-1"
                      >
                        Cancelar
                      </Button>
                    </div>
                    <p className="text-xs text-gray-500 text-center">* Campos obrigatórios</p>
                  </div>
                </DialogContent>
              </Dialog>

              {/* Grid de Paróquias */}
              <div className="grid grid-cols-2 gap-3">
                {paroquias.map((paroquia) => (
                  <Card key={paroquia.id} className={`relative overflow-hidden ${cardClass}`}>
                    <CardContent className="p-4 text-center space-y-3">
                      {/* Ícone da Igreja */}
                      <div className="w-12 h-12 mx-auto bg-gray-100 rounded-lg flex items-center justify-center">
                        <div className="w-8 h-8 bg-gray-300 rounded"></div>
                      </div>

                      {/* Nome da Paróquia */}
                      <h3 className="font-medium text-sm leading-tight">{paroquia.nome}</h3>

                      {/* Distância */}
                      <Badge variant="outline" className="text-xs">
                        {paroquia.distancia}
                      </Badge>

                      {/* Próxima Missa */}
                      <div
                        className={`text-xs flex items-center justify-center gap-1 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}
                      >
                        <Clock className="h-3 w-3" />
                        {paroquia.proximaMissa}
                      </div>

                      {/* Botões de Ação */}
                      <div className="space-y-2">
                        <Link href={`/paroquia/${paroquia.id}`}>
                          <Button size="sm" className="w-full text-white text-xs" style={themeStyles}>
                            <Eye className="h-3 w-3 mr-1" />
                            Ver Detalhes
                          </Button>
                        </Link>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => toggleFavorita(paroquia.id)}
                          className="w-full text-xs"
                        >
                          <Star className={`h-3 w-3 mr-1 ${paroquia.favorita ? "fill-current text-yellow-500" : ""}`} />
                          {paroquia.favorita ? "Favorita" : "Favoritar"}
                        </Button>
                      </div>

                      {/* Indicador de Favorita */}
                      {paroquia.favorita && (
                        <div className="absolute top-2 right-2">
                          <Star className="h-4 w-4 fill-current text-yellow-500" />
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {viewMode === "list" && (
            <div className="space-y-3">
              {paroquias.map((paroquia) => (
                <Card key={paroquia.id} className={cardClass}>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      {/* Ícone */}
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <div className="w-6 h-6 bg-gray-300 rounded"></div>
                      </div>

                      {/* Informações */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium text-sm truncate">{paroquia.nome}</h3>
                          {paroquia.favorita && <Star className="h-4 w-4 fill-current text-yellow-500 flex-shrink-0" />}
                        </div>
                        <p className={`text-xs truncate ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                          {paroquia.endereco}
                        </p>
                        <div className="flex items-center justify-between mt-1">
                          <span className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                            {paroquia.distancia}
                          </span>
                          <div
                            className={`flex items-center gap-1 text-xs ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}
                          >
                            <Clock className="h-3 w-3" />
                            {paroquia.proximaMissa}
                          </div>
                        </div>
                      </div>

                      {/* Botão de Ação */}
                      <Link href={`/paroquia/${paroquia.id}`}>
                        <Button size="sm" className="text-white text-xs" style={themeStyles}>
                          Ver
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {viewMode === "map" && (
            <div className="space-y-4">
              {/* Google Maps Integration */}
              <Card className={cardClass}>
                <CardContent className="p-0">
                  <div className="h-64 bg-gray-100 relative rounded-lg overflow-hidden">
                    {/* Simulação do Google Maps */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-green-100">
                      {/* Grid de ruas simulado */}
                      <div className="absolute inset-0 opacity-20">
                        {[...Array(10)].map((_, i) => (
                          <div key={i}>
                            <div className="absolute bg-gray-400 h-px w-full" style={{ top: `${(i + 1) * 10}%` }} />
                            <div className="absolute bg-gray-400 w-px h-full" style={{ left: `${(i + 1) * 10}%` }} />
                          </div>
                        ))}
                      </div>

                      {/* Marcadores das Paróquias */}
                      {paroquias.slice(0, 6).map((paroquia, index) => (
                        <div
                          key={paroquia.id}
                          className="absolute w-8 h-8 rounded-full border-2 border-white shadow-lg flex items-center justify-center cursor-pointer hover:scale-110 transition-transform"
                          style={{
                            left: `${15 + (index % 3) * 25}%`,
                            top: `${20 + Math.floor(index / 3) * 30}%`,
                            backgroundColor: currentTheme.colors.primary,
                          }}
                          title={paroquia.nome}
                        >
                          <MapPin className="h-4 w-4 text-white" />
                        </div>
                      ))}

                      {/* Indicador de Localização do Usuário */}
                      <div className="absolute bottom-6 right-6 w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg animate-pulse"></div>

                      {/* Controles do Google Maps */}
                      <div className="absolute top-4 right-4 space-y-2">
                        <Button size="sm" variant="secondary" className="w-8 h-8 p-0">
                          +
                        </Button>
                        <Button size="sm" variant="secondary" className="w-8 h-8 p-0">
                          -
                        </Button>
                      </div>

                      {/* Logo Google Maps */}
                      <div className="absolute bottom-2 left-2 text-xs text-gray-600 bg-white px-2 py-1 rounded">
                        Google Maps
                      </div>

                      {/* Botão de localização */}
                      <div className="absolute bottom-2 right-2">
                        <Button size="sm" variant="secondary" className="w-8 h-8 p-0">
                          <Navigation className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Lista de Paróquias no Mapa */}
              <div className="space-y-2">
                <h3 className="font-medium text-sm">Paróquias Próximas</h3>
                {paroquias.slice(0, 3).map((paroquia) => (
                  <Link key={paroquia.id} href={`/paroquia/${paroquia.id}`}>
                    <Card className={`cursor-pointer hover:bg-gray-50 ${cardClass}`}>
                      <CardContent className="p-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium text-sm">{paroquia.nome}</h4>
                            <p className={`text-xs ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                              {paroquia.distancia} • {paroquia.proximaMissa}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            {paroquia.favorita && <Star className="h-3 w-3 fill-current text-yellow-500" />}
                            <MapPin className="h-4 w-4" style={{ color: currentTheme.colors.primary }} />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
