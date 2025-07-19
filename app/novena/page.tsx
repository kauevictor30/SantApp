"use client"

import { useState } from "react"
import { Calendar, CheckCircle, Clock, Star, Plus } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"

interface Novena {
  id: string
  titulo: string
  santo: string
  descricao: string
  diasConcluidos: boolean[]
  dataInicio?: string
}

const novenaTextos = {
  "nossa-senhora-aparecida": {
    titulo: "Novena a Nossa Senhora Aparecida",
    santo: "Nossa Senhora Aparecida",
    oracao:
      "Ó incomparável Senhora da Conceição Aparecida, Mãe de meu Deus, Rainha dos Anjos, Advogada dos pecadores, Refúgio dos aflitos e atribulados...",
    reflexao:
      "Nossa Senhora Aparecida nos ensina sobre a fé simples e confiante. Mesmo nas águas turvas do Rio Paraíba, ela se manifestou para mostrar que Deus está presente em todas as situações.",
  },
  "sao-jose": {
    titulo: "Novena a São José",
    santo: "São José",
    oracao:
      "Ó glorioso São José, escolhido por Deus para ser o pai putativo de Jesus, o esposo puríssimo da Virgem Mãe de Deus e o chefe da Sagrada Família...",
    reflexao:
      "São José nos ensina a virtude do silêncio, da obediência e do trabalho. Ele é modelo de pai e esposo, sempre disposto a cumprir a vontade de Deus.",
  },
  "sagrado-coracao": {
    titulo: "Novena ao Sagrado Coração de Jesus",
    santo: "Sagrado Coração de Jesus",
    oracao:
      "Ó Jesus de bondade infinita, que inflamado de amor pelos homens, vos dignastes tomar um Coração de carne semelhante ao nosso...",
    reflexao:
      "O Sagrado Coração de Jesus representa o amor infinito de Deus por nós. É fonte de misericórdia e perdão para todos os pecadores.",
  },
}

export default function NovenaPage() {
  const [novenas, setNovenas] = useState<Novena[]>([
    {
      id: "nossa-senhora-aparecida",
      titulo: "Nossa Senhora Aparecida",
      santo: "Nossa Senhora Aparecida",
      descricao: "Padroeira do Brasil",
      diasConcluidos: [true, true, false, false, false, false, false, false, false],
      dataInicio: "2024-01-15",
    },
    {
      id: "sao-jose",
      titulo: "São José",
      santo: "São José",
      descricao: "Pai Putativo de Jesus",
      diasConcluidos: [false, false, false, false, false, false, false, false, false],
    },
    {
      id: "sagrado-coracao",
      titulo: "Sagrado Coração de Jesus",
      santo: "Sagrado Coração de Jesus",
      descricao: "Amor Infinito de Deus",
      diasConcluidos: [true, true, true, true, true, false, false, false, false],
    },
  ])

  const [novenaSelecionada, setNovenaSelecionada] = useState<string>("nossa-senhora-aparecida")

  const concluirDia = (novenaId: string, dia: number) => {
    setNovenas((prev) =>
      prev.map((novena) => {
        if (novena.id === novenaId) {
          const novosDias = [...novena.diasConcluidos]
          novosDias[dia] = true
          return { ...novena, diasConcluidos: novosDias }
        }
        return novena
      }),
    )
  }

  const reiniciarNovena = (novenaId: string) => {
    setNovenas((prev) =>
      prev.map((novena) => {
        if (novena.id === novenaId) {
          return {
            ...novena,
            diasConcluidos: [false, false, false, false, false, false, false, false, false],
            dataInicio: new Date().toISOString().split("T")[0],
          }
        }
        return novena
      }),
    )
  }

  const calcularProgresso = (diasConcluidos: boolean[]) => {
    const concluidos = diasConcluidos.filter((dia) => dia).length
    return (concluidos / 9) * 100
  }

  const proximoDia = (diasConcluidos: boolean[]) => {
    const proximoIndex = diasConcluidos.findIndex((dia) => !dia)
    return proximoIndex === -1 ? 9 : proximoIndex + 1
  }

  const novenaAtual = novenas.find((n) => n.id === novenaSelecionada)
  const textoNovena = novenaTextos[novenaSelecionada as keyof typeof novenaTextos]

  const themeStyles = {
    background: "linear-gradient(to right, #667eea, #764ba2)",
    color: "#fff",
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-800">Novenas</h1>
          <p className="text-gray-600">Nove dias de oração e reflexão</p>
        </div>

        {/* Botão Adicionar Novena */}
        <div className="flex justify-center">
          <Link href="/novena/criar">
            <Button className="text-white" style={themeStyles}>
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Nova Novena
            </Button>
          </Link>
        </div>

        {/* Lista de Novenas */}
        <div className="grid md:grid-cols-3 gap-4">
          {novenas.map((novena) => (
            <Card
              key={novena.id}
              className={`cursor-pointer transition-all hover:shadow-lg ${
                novenaSelecionada === novena.id ? "ring-2 ring-purple-500" : ""
              }`}
              onClick={() => setNovenaSelecionada(novena.id)}
            >
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">{novena.titulo}</CardTitle>
                <p className="text-sm text-gray-600">{novena.descricao}</p>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Progresso</span>
                  <Badge variant="outline">{novena.diasConcluidos.filter((d) => d).length}/9 dias</Badge>
                </div>
                <Progress value={calcularProgresso(novena.diasConcluidos)} className="h-2" />

                {calcularProgresso(novena.diasConcluidos) === 100 ? (
                  <Badge variant="default" className="w-full justify-center bg-green-500">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Novena Concluída!
                  </Badge>
                ) : (
                  <Badge variant="outline" className="w-full justify-center">
                    <Clock className="h-4 w-4 mr-1" />
                    Próximo: Dia {proximoDia(novena.diasConcluidos)}
                  </Badge>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Novena Selecionada */}
        {novenaAtual && textoNovena && (
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl">{textoNovena.titulo}</CardTitle>
                  <p className="text-gray-600 mt-1">{novenaAtual.descricao}</p>
                </div>
                <Button onClick={() => reiniciarNovena(novenaAtual.id)} variant="outline" size="sm">
                  Reiniciar Novena
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="dias" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="dias">Dias da Novena</TabsTrigger>
                  <TabsTrigger value="oracao">Oração e Reflexão</TabsTrigger>
                </TabsList>

                <TabsContent value="dias" className="space-y-4">
                  <div className="grid grid-cols-3 gap-3">
                    {novenaAtual.diasConcluidos.map((concluido, index) => (
                      <Card
                        key={index}
                        className={`transition-all ${
                          concluido
                            ? "bg-green-50 border-green-200"
                            : index === proximoDia(novenaAtual.diasConcluidos) - 1
                              ? "bg-blue-50 border-blue-200"
                              : "hover:bg-gray-50"
                        }`}
                      >
                        <CardContent className="p-4 text-center">
                          <div className="space-y-2">
                            <div className="text-lg font-bold">Dia {index + 1}</div>
                            {concluido ? (
                              <Badge variant="default" className="bg-green-500">
                                <CheckCircle className="h-3 w-3 mr-1" />
                                Concluído
                              </Badge>
                            ) : index === proximoDia(novenaAtual.diasConcluidos) - 1 ? (
                              <div className="space-y-2">
                                <Badge variant="outline" className="border-blue-500 text-blue-600">
                                  Próximo Dia
                                </Badge>
                                <Button size="sm" onClick={() => concluirDia(novenaAtual.id, index)} className="w-full">
                                  Concluir Dia
                                </Button>
                              </div>
                            ) : (
                              <Badge variant="secondary">Pendente</Badge>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <div className="mt-6 p-4 bg-purple-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Star className="h-5 w-5 text-purple-600" />
                      <h3 className="font-semibold text-purple-800">Progresso da Novena</h3>
                    </div>
                    <Progress value={calcularProgresso(novenaAtual.diasConcluidos)} className="h-3 mb-2" />
                    <p className="text-sm text-purple-700">
                      {novenaAtual.diasConcluidos.filter((d) => d).length} de 9 dias concluídos (
                      {Math.round(calcularProgresso(novenaAtual.diasConcluidos))}%)
                    </p>
                  </div>
                </TabsContent>

                <TabsContent value="oracao" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Calendar className="h-5 w-5" />
                        Oração da Novena
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="prose max-w-none">
                        <p className="text-lg leading-relaxed text-justify">{textoNovena.oracao}</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Reflexão Diária</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="prose max-w-none">
                        <p className="text-base leading-relaxed text-justify text-gray-700">{textoNovena.reflexao}</p>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="text-center">
                    <Button
                      onClick={() => {
                        const proximoDiaIndex = proximoDia(novenaAtual.diasConcluidos) - 1
                        if (proximoDiaIndex < 9 && proximoDiaIndex >= 0) {
                          concluirDia(novenaAtual.id, proximoDiaIndex)
                        }
                      }}
                      disabled={calcularProgresso(novenaAtual.diasConcluidos) === 100}
                      size="lg"
                    >
                      {calcularProgresso(novenaAtual.diasConcluidos) === 100
                        ? "Novena Concluída!"
                        : `Concluir Dia ${proximoDia(novenaAtual.diasConcluidos)}`}
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
