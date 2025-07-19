"use client"

import { useState, useEffect } from "react"
import { RotateCcw, Moon, Sun, Play, Pause, ChevronLeft, ChevronRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useTheme } from "../../contexts/theme-context"

interface ContaTerco {
  id: number
  tipo: "pai-nosso" | "ave-maria" | "gloria" | "credo" | "oferecimento"
  oracao: string
  titulo: string
}

const misterios = {
  segunda: "Mistérios Gozosos",
  terca: "Mistérios Dolorosos",
  quarta: "Mistérios Gloriosos",
  quinta: "Mistérios Luminosos",
  sexta: "Mistérios Dolorosos",
  sabado: "Mistérios Gozosos",
  domingo: "Mistérios Gloriosos",
}

const oracoes = {
  credo: {
    titulo: "Creio em Deus Pai",
    texto:
      "Creio em Deus Pai todo-poderoso, criador do céu e da terra; e em Jesus Cristo, seu único Filho, nosso Senhor, que foi concebido pelo poder do Espírito Santo; nasceu da Virgem Maria; padeceu sob Pôncio Pilatos, foi crucificado, morto e sepultado...",
  },
  "pai-nosso": {
    titulo: "Pai Nosso",
    texto:
      "Pai nosso que estais nos céus, santificado seja o vosso nome, venha a nós o vosso reino, seja feita a vossa vontade assim na terra como no céu. O pão nosso de cada dia nos dai hoje, perdoai-nos as nossas ofensas assim como nós perdoamos a quem nos tem ofendido, e não nos deixeis cair em tentação, mas livrai-nos do mal. Amém.",
  },
  "ave-maria": {
    titulo: "Ave Maria",
    texto:
      "Ave Maria, cheia de graça, o Senhor é convosco, bendita sois vós entre as mulheres e bendito é o fruto do vosso ventre, Jesus. Santa Maria, Mãe de Deus, rogai por nós pecadores, agora e na hora da nossa morte. Amém.",
  },
  gloria: {
    titulo: "Glória ao Pai",
    texto:
      "Glória ao Pai, ao Filho e ao Espírito Santo, como era no princípio, agora e sempre, pelos séculos dos séculos. Amém.",
  },
  oferecimento: {
    titulo: "Oferecimento do Terço",
    texto:
      "Divino Jesus, nós Vos oferecemos este terço que vamos rezar, meditando nos mistérios da Vossa Redenção. Concedei-nos, por intercessão da Virgem Maria, Mãe Vossa e nossa, as virtudes que nos são necessárias para bem rezá-lo e a graça de ganharmos as indulgências desta santa devoção.",
  },
}

export default function TercoPage() {
  const { currentTheme, isDarkMode } = useTheme()
  const [contaAtual, setContaAtual] = useState(0)
  const [misterioSelecionado, setMisterioSelecionado] = useState("")
  const [tocando, setTocando] = useState(false)

  const gerarContasTerco = (): ContaTerco[] => {
    const contas: ContaTerco[] = []

    // Oferecimento
    contas.push({
      id: 0,
      tipo: "oferecimento",
      oracao: oracoes.oferecimento.texto,
      titulo: oracoes.oferecimento.titulo,
    })

    // Credo
    contas.push({
      id: 1,
      tipo: "credo",
      oracao: oracoes.credo.texto,
      titulo: oracoes.credo.titulo,
    })

    // Pai Nosso inicial
    contas.push({
      id: 2,
      tipo: "pai-nosso",
      oracao: oracoes["pai-nosso"].texto,
      titulo: oracoes["pai-nosso"].titulo,
    })

    // 3 Ave Marias iniciais
    for (let i = 0; i < 3; i++) {
      contas.push({
        id: 3 + i,
        tipo: "ave-maria",
        oracao: oracoes["ave-maria"].texto,
        titulo: oracoes["ave-maria"].titulo,
      })
    }

    // Glória inicial
    contas.push({
      id: 6,
      tipo: "gloria",
      oracao: oracoes.gloria.texto,
      titulo: oracoes.gloria.titulo,
    })

    // 5 Dezenas do terço
    for (let dezena = 0; dezena < 5; dezena++) {
      // Pai Nosso da dezena
      contas.push({
        id: 7 + dezena * 11,
        tipo: "pai-nosso",
        oracao: oracoes["pai-nosso"].texto,
        titulo: `${oracoes["pai-nosso"].titulo} - ${dezena + 1}ª Dezena`,
      })

      // 10 Ave Marias da dezena
      for (let ave = 0; ave < 10; ave++) {
        contas.push({
          id: 8 + dezena * 11 + ave,
          tipo: "ave-maria",
          oracao: oracoes["ave-maria"].texto,
          titulo: `${oracoes["ave-maria"].titulo} - ${dezena + 1}ª Dezena (${ave + 1}/10)`,
        })
      }

      // Glória da dezena
      contas.push({
        id: 18 + dezena * 11,
        tipo: "gloria",
        oracao: oracoes.gloria.texto,
        titulo: `${oracoes.gloria.titulo} - ${dezena + 1}ª Dezena`,
      })
    }

    return contas
  }

  const [contas] = useState<ContaTerco[]>(gerarContasTerco())

  useEffect(() => {
    const hoje = new Date().getDay()
    const diasSemana = ["domingo", "segunda", "terca", "quarta", "quinta", "sexta", "sabado"]
    const diaAtual = diasSemana[hoje] as keyof typeof misterios
    setMisterioSelecionado(misterios[diaAtual])
  }, [])

  const reiniciarTerco = () => {
    setContaAtual(0)
    setTocando(false)
  }

  const proximaConta = () => {
    if (contaAtual < contas.length - 1) {
      setContaAtual((prev) => prev + 1)
    } else {
      setTocando(false)
    }
  }

  const contaAnterior = () => {
    if (contaAtual > 0) {
      setContaAtual((prev) => prev - 1)
    }
  }

  const backgroundClass = isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50"
  const cardClass = isDarkMode ? "bg-gray-800 border-gray-700 text-white" : "bg-white"

  const themeStyles = {
    backgroundColor: currentTheme.colors.primary,
    color: "white",
  }

  // Função para gerar posições do terço em círculo (voltando ao design original)
  const gerarPosicoesTerco = () => {
    const posicoes: { x: number; y: number }[] = []
    const centerX = 150
    const centerY = 150
    const radius = 120

    for (let i = 0; i < contas.length; i++) {
      const angle = (i / contas.length) * 2 * Math.PI - Math.PI / 2
      const x = centerX + radius * Math.cos(angle)
      const y = centerY + radius * Math.sin(angle)
      posicoes.push({ x, y })
    }

    return posicoes
  }

  const posicoes = gerarPosicoesTerco()

  return (
    <div className={`min-h-screen ${backgroundClass}`}>
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className={cardClass}>
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl font-bold">Santo Terço</h1>
                <p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>{misterioSelecionado}</p>
              </div>
              <Button onClick={() => setTocando(!tocando)} variant="outline" size="sm">
                {isDarkMode ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </div>

        <div className="p-4 space-y-4">
          {/* Controles */}
          <Card className={cardClass}>
            <CardContent className="p-4">
              <div className="flex gap-2 mb-4">
                <Button onClick={reiniciarTerco} variant="outline" size="sm" className="flex-1 bg-transparent">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reiniciar
                </Button>
                <Button
                  onClick={() => setTocando(!tocando)}
                  className="flex-1 text-white"
                  style={themeStyles}
                  size="sm"
                >
                  {tocando ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
                  {tocando ? "Pausar" : "Iniciar"}
                </Button>
              </div>

              <Select value={misterioSelecionado} onValueChange={setMisterioSelecionado}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o mistério" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Mistérios Gozosos">Mistérios Gozosos</SelectItem>
                  <SelectItem value="Mistérios Dolorosos">Mistérios Dolorosos</SelectItem>
                  <SelectItem value="Mistérios Gloriosos">Mistérios Gloriosos</SelectItem>
                  <SelectItem value="Mistérios Luminosos">Mistérios Luminosos</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Terço Visual em Círculo */}
          <Card className={cardClass}>
            <CardContent className="p-4">
              <div className="relative w-full h-80 flex items-center justify-center">
                <svg width="300" height="300" className="overflow-visible">
                  {/* Círculo conectando as contas */}
                  <circle
                    cx="150"
                    cy="150"
                    r="120"
                    fill="none"
                    stroke={isDarkMode ? "#374151" : "#d1d5db"}
                    strokeWidth="2"
                  />

                  {/* Contas do terço */}
                  {contas.map((conta, index) => {
                    if (index >= posicoes.length) return null

                    const pos = posicoes[index]
                    const isActive = index === contaAtual
                    const isCompleted = index < contaAtual

                    let radius = 4
                    let color = currentTheme.colors.secondary

                    if (conta.tipo === "pai-nosso") {
                      radius = 7
                      color = currentTheme.colors.primary
                    } else if (conta.tipo === "gloria") {
                      radius = 5
                      color = "#8b5cf6"
                    } else if (conta.tipo === "credo") {
                      radius = 8
                      color = "#dc2626"
                    } else if (conta.tipo === "oferecimento") {
                      radius = 6
                      color = "#059669"
                    }

                    if (isActive) {
                      color = "#ef4444"
                    } else if (isCompleted) {
                      color = "#10b981"
                    }

                    return (
                      <g key={conta.id}>
                        <circle
                          cx={pos.x}
                          cy={pos.y}
                          r={radius}
                          fill={color}
                          stroke={isActive ? "#dc2626" : "transparent"}
                          strokeWidth="2"
                          className="cursor-pointer transition-all hover:scale-110"
                          onClick={() => setContaAtual(index)}
                        />
                        {isActive && (
                          <circle
                            cx={pos.x}
                            cy={pos.y}
                            r={radius + 4}
                            fill="none"
                            stroke="#ef4444"
                            strokeWidth="2"
                            className="animate-pulse"
                          />
                        )}
                      </g>
                    )
                  })}
                </svg>

                {/* Contador central */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center space-y-2">
                    <div className="text-2xl font-bold">
                      {contaAtual + 1}/{contas.length}
                    </div>
                    <Badge
                      variant={
                        contas[contaAtual]?.tipo === "pai-nosso"
                          ? "default"
                          : contas[contaAtual]?.tipo === "gloria"
                            ? "secondary"
                            : "outline"
                      }
                      className={contas[contaAtual]?.tipo === "pai-nosso" ? "bg-red-500" : ""}
                    >
                      {contas[contaAtual]?.tipo === "pai-nosso"
                        ? "Pai Nosso"
                        : contas[contaAtual]?.tipo === "gloria"
                          ? "Glória"
                          : contas[contaAtual]?.tipo === "credo"
                            ? "Credo"
                            : contas[contaAtual]?.tipo === "oferecimento"
                              ? "Oferecimento"
                              : "Ave Maria"}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Oração Atual */}
          <Card className={cardClass}>
            <CardHeader>
              <CardTitle className="text-center text-lg">{contas[contaAtual]?.titulo}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div
                className={`p-4 rounded-lg text-center leading-relaxed ${isDarkMode ? "bg-gray-700" : "bg-gray-50"}`}
              >
                <p className="text-sm">{contas[contaAtual]?.oracao}</p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progresso</span>
                  <span>{Math.round((contaAtual / (contas.length - 1)) * 100)}%</span>
                </div>
                <div className={`w-full h-2 rounded-full ${isDarkMode ? "bg-gray-700" : "bg-gray-200"}`}>
                  <div
                    className="h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${(contaAtual / (contas.length - 1)) * 100}%`,
                      backgroundColor: currentTheme.colors.primary,
                    }}
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={contaAnterior}
                  disabled={contaAtual <= 0}
                  variant="outline"
                  className="flex-1 bg-transparent"
                >
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Anterior
                </Button>
                <Button
                  onClick={proximaConta}
                  disabled={contaAtual >= contas.length - 1}
                  className="flex-1 text-white"
                  style={themeStyles}
                >
                  {contaAtual >= contas.length - 1 ? "Concluído!" : "Próxima"}
                  {contaAtual < contas.length - 1 && <ChevronRight className="h-4 w-4 ml-2" />}
                </Button>
              </div>

              {contaAtual === contas.length - 1 && (
                <div className="text-center p-4 rounded-lg" style={{ backgroundColor: currentTheme.colors.accent }}>
                  <p className="font-semibold" style={{ color: currentTheme.colors.primary }}>
                    🙏 Santo Terço Concluído!
                  </p>
                  <p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                    Que Nossa Senhora interceda por você.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
