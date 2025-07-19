"use client"

import { useState, useEffect } from "react"
import { Calendar, Share2, BookOpen, Clock, ChevronLeft, ChevronRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useTheme } from "../../contexts/theme-context"

interface Homilia {
  id: string
  data: string
  tempoLiturgico: string
  evangelho: string
  titulo: string
  autor: string
  conteudo: string
  reflexao: string
}

const homilias: Homilia[] = [
  {
    id: "1",
    data: "2024-01-21",
    tempoLiturgico: "Tempo Comum",
    evangelho: "Marcos 1,14-20",
    titulo: "O Chamado dos Primeiros Discípulos",
    autor: "Pe. João Silva",
    conteudo:
      "Depois que João foi preso, Jesus foi para a Galileia e começou a anunciar o Evangelho de Deus: 'O tempo se completou e o Reino de Deus está próximo. Convertei-vos e crede no Evangelho!'",
    reflexao:
      "Jesus nos chama a deixar nossas redes, nossos apegos e seguí-lo. O chamado é urgente e requer uma resposta imediata. Como os primeiros discípulos, somos convidados a abandonar nossa zona de conforto para anunciar o Reino de Deus.",
  },
  {
    id: "2",
    data: "2024-01-20",
    tempoLiturgico: "Tempo Comum",
    evangelho: "João 1,35-42",
    titulo: "Vinde e Vede",
    autor: "Pe. Maria Santos",
    conteudo:
      "No dia seguinte, João estava de novo ali com dois dos seus discípulos. Vendo Jesus passar, disse: 'Eis o Cordeiro de Deus!' Os dois discípulos ouviram essas palavras e seguiram Jesus.",
    reflexao:
      "O convite de Jesus é simples: 'Vinde e vede'. Ele não nos força, mas nos convida a experimentar sua presença. A fé nasce do encontro pessoal com Cristo, não apenas de conceitos teóricos.",
  },
  {
    id: "3",
    data: "2024-01-19",
    tempoLiturgico: "Tempo Comum",
    evangelho: "Mateus 4,12-23",
    titulo: "Jesus Inicia Sua Missão",
    autor: "Pe. Carlos Oliveira",
    conteudo:
      "Quando Jesus soube que João tinha sido preso, retirou-se para a Galileia. Deixando Nazaré, foi morar em Cafarnaum, cidade situada à beira-mar, no território de Zabulon e Neftali.",
    reflexao:
      "Jesus escolhe começar sua missão na Galileia dos gentios, região desprezada. Deus escolhe o que é pequeno e desprezado para manifestar sua glória. Nossa missão também pode começar nos lugares mais simples.",
  },
  {
    id: "4",
    data: "2024-01-18",
    tempoLiturgico: "Tempo Comum",
    evangelho: "Lucas 4,14-21",
    titulo: "Jesus na Sinagoga de Nazaré",
    autor: "Pe. Antonio Lima",
    conteudo:
      "Jesus voltou para a Galileia com a força do Espírito, e sua fama espalhou-se por toda a região. Ensinava nas sinagogas e todos o elogiavam.",
    reflexao:
      "Jesus proclama que veio para libertar os cativos e dar vista aos cegos. Sua missão é de libertação integral do ser humano. Somos chamados a continuar esta missão de libertação em nosso tempo.",
  },
  {
    id: "5",
    data: "2024-01-17",
    tempoLiturgico: "Tempo Comum",
    evangelho: "João 2,1-11",
    titulo: "As Bodas de Caná",
    autor: "Pe. Francisco Costa",
    conteudo:
      "Três dias depois, houve um casamento em Caná da Galileia, e a mãe de Jesus estava lá. Jesus também foi convidado para o casamento, junto com seus discípulos.",
    reflexao:
      "Maria intercede pelos necessitados e Jesus atende ao seu pedido. Este primeiro sinal revela a glória de Jesus e fortalece a fé dos discípulos. Maria nos ensina a confiar na providência divina.",
  },
]

export default function HomiliasPage() {
  const { currentTheme, isDarkMode } = useTheme()
  const [homiliaAtual, setHomiliaAtual] = useState(0)

  // Calcular qual homília mostrar baseado na data
  useEffect(() => {
    const hoje = new Date()
    const dataBase = new Date("2024-01-17") // Data da primeira homília
    const diasPassados = Math.floor((hoje.getTime() - dataBase.getTime()) / (1000 * 60 * 60 * 24))
    const indiceHomilia = diasPassados % homilias.length
    setHomiliaAtual(indiceHomilia >= 0 ? indiceHomilia : 0)
  }, [])

  const backgroundClass = isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50"
  const cardClass = isDarkMode ? "bg-gray-800 border-gray-700 text-white" : "bg-white"

  const themeStyles = {
    backgroundColor: currentTheme.colors.primary,
    color: "white",
  }

  const formatarData = (data: string) => {
    return new Date(data + "T00:00:00").toLocaleDateString("pt-BR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const compartilhar = async (homilia: Homilia) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: homilia.titulo,
          text: `Homília: ${homilia.titulo} - ${homilia.autor}`,
          url: window.location.href,
        })
      } catch (err) {
        console.log("Erro ao compartilhar:", err)
      }
    } else {
      navigator.clipboard.writeText(`${homilia.titulo} - ${homilia.autor}\n\n${homilia.reflexao}`)
      alert("Texto copiado para a área de transferência!")
    }
  }

  const proximaHomilia = () => {
    setHomiliaAtual((prev) => (prev + 1) % homilias.length)
  }

  const homiliaAnterior = () => {
    setHomiliaAtual((prev) => (prev - 1 + homilias.length) % homilias.length)
  }

  const homilia = homilias[homiliaAtual]

  return (
    <div className={`min-h-screen ${backgroundClass}`}>
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className={`${cardClass} shadow-sm`}>
          <div className="p-4">
            <div className="text-center space-y-2">
              <h1 className="text-xl font-bold">Homília do Dia</h1>
              <p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                Reflexão diária baseada no Evangelho
              </p>
            </div>
          </div>
        </div>

        <div className="p-4 space-y-6">
          {/* Homília em Destaque */}
          <Card className={cardClass}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">{homilia.tempoLiturgico}</Badge>
                    <Badge variant="outline">{homilia.evangelho}</Badge>
                  </div>
                  <CardTitle className="text-xl">{homilia.titulo}</CardTitle>
                  <p className={`text-sm flex items-center gap-2 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                    <Calendar className="h-4 w-4" />
                    {formatarData(homilia.data)}
                  </p>
                  <p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>Por {homilia.autor}</p>
                </div>
                <Button variant="outline" size="sm" onClick={() => compartilhar(homilia)}>
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Evangelho */}
              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <BookOpen className="h-5 w-5" style={{ color: currentTheme.colors.primary }} />
                  Evangelho do Dia
                </h3>
                <div
                  className="p-4 rounded-lg border-l-4"
                  style={{
                    backgroundColor: isDarkMode ? "rgba(55, 65, 81, 0.5)" : "rgba(251, 191, 36, 0.1)",
                    borderLeftColor: currentTheme.colors.primary,
                  }}
                >
                  <p className="text-base leading-relaxed text-justify italic">"{homilia.conteudo}"</p>
                </div>
              </div>

              {/* Reflexão */}
              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <Clock className="h-5 w-5" style={{ color: currentTheme.colors.secondary }} />
                  Reflexão
                </h3>
                <div className="prose max-w-none">
                  <p
                    className={`text-base leading-relaxed text-justify ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                  >
                    {homilia.reflexao}
                  </p>
                </div>
              </div>

              {/* Navegação */}
              <div className="flex items-center justify-between pt-4 border-t">
                <Button onClick={homiliaAnterior} variant="outline" size="sm">
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Anterior
                </Button>

                <div className="text-center">
                  <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                    {homiliaAtual + 1} de {homilias.length}
                  </p>
                </div>

                <Button onClick={proximaHomilia} variant="outline" size="sm">
                  Próxima
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </div>

              {/* Ações */}
              <div className="flex gap-3 pt-4">
                <Button onClick={() => compartilhar(homilia)} className="flex-1 text-white" style={themeStyles}>
                  <Share2 className="h-4 w-4 mr-2" />
                  Compartilhar
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Informação sobre renovação diária */}
          <Card className={cardClass}>
            <CardContent className="p-4 text-center">
              <div className="space-y-2">
                <div className="text-2xl">📅</div>
                <h3 className="font-semibold">Renovação Diária</h3>
                <p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                  Uma nova homília é disponibilizada a cada 24 horas, baseada no Evangelho do dia litúrgico.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Estatísticas */}
          <div className="grid grid-cols-2 gap-4">
            <Card className={cardClass}>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold" style={{ color: currentTheme.colors.primary }}>
                  {homilias.length}
                </div>
                <p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>Homílias Disponíveis</p>
              </CardContent>
            </Card>

            <Card className={cardClass}>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold" style={{ color: currentTheme.colors.secondary }}>
                  {new Set(homilias.map((h) => h.autor)).size}
                </div>
                <p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>Autores</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
