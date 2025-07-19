"use client"

import { useState } from "react"
import { ArrowLeft, Heart, MessageCircle, Share2, Plus, Send, MoreVertical, Users } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useTheme } from "../../contexts/theme-context"
import Link from "next/link"

interface Post {
  id: string
  autor: string
  avatar: string
  tempo: string
  conteudo: string
  categoria: string
  curtidas: number
  comentarios: number
  curtido: boolean
  paroquia?: string
}

export default function ComunidadePage() {
  const { currentTheme, isDarkMode } = useTheme()
  const [novoPost, setNovoPost] = useState({
    conteudo: "",
    categoria: "",
  })
  const [dialogOpen, setDialogOpen] = useState(false)

  const [posts, setPosts] = useState<Post[]>([
    {
      id: "1",
      autor: "Maria Silva",
      avatar: "/placeholder.svg?height=40&width=40",
      tempo: "2h",
      conteudo:
        "Que alegria participar da missa de hoje! O padre falou sobre a importância da oração em família. Que Deus abençoe todos nós! 🙏",
      categoria: "Testemunho",
      curtidas: 12,
      comentarios: 3,
      curtido: false,
      paroquia: "Paróquia São José",
    },
    {
      id: "2",
      autor: "Pe. João Silva",
      avatar: "/placeholder.svg?height=40&width=40",
      tempo: "4h",
      conteudo:
        "Lembrem-se: a oração não muda Deus, ela nos muda. Quando oramos, abrimos nosso coração para receber a graça divina. Tenham uma semana abençoada!",
      categoria: "Reflexão",
      curtidas: 28,
      comentarios: 8,
      curtido: true,
    },
    {
      id: "3",
      autor: "Carlos Santos",
      avatar: "/placeholder.svg?height=40&width=40",
      tempo: "6h",
      conteudo:
        "Alguém sabe os horários de missa da Igreja Nossa Senhora Aparecida para amanhã? Preciso participar da missa das 19h. Obrigado!",
      categoria: "Pergunta",
      curtidas: 5,
      comentarios: 12,
      curtido: false,
      paroquia: "Igreja N. Sra. Aparecida",
    },
    {
      id: "4",
      autor: "Ana Costa",
      avatar: "/placeholder.svg?height=40&width=40",
      tempo: "8h",
      conteudo:
        "Hoje completei minha novena a Santa Teresinha! Sinto uma paz imensa no coração. Que Nossa Senhora interceda por todos nós. 🌹",
      categoria: "Testemunho",
      curtidas: 18,
      comentarios: 6,
      curtido: false,
    },
    {
      id: "5",
      autor: "José Maria",
      avatar: "/placeholder.svg?height=40&width=40",
      tempo: "12h",
      conteudo:
        "Reflexão do dia: 'Tudo posso naquele que me fortalece' (Filipenses 4:13). Que esta palavra nos anime a enfrentar os desafios com fé!",
      categoria: "Reflexão",
      curtidas: 22,
      comentarios: 4,
      curtido: true,
    },
  ])

  const backgroundClass = isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50"
  const cardClass = isDarkMode ? "bg-gray-800 border-gray-700 text-white" : "bg-white"

  const themeStyles = {
    backgroundColor: currentTheme.colors.primary,
    color: "white",
  }

  const curtirPost = (postId: string) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? {
              ...post,
              curtido: !post.curtido,
              curtidas: post.curtido ? post.curtidas - 1 : post.curtidas + 1,
            }
          : post,
      ),
    )
  }

  const criarPost = () => {
    if (!novoPost.conteudo.trim()) {
      alert("Por favor, escreva algo para compartilhar")
      return
    }

    const post: Post = {
      id: Date.now().toString(),
      autor: "Você",
      avatar: "/placeholder.svg?height=40&width=40",
      tempo: "agora",
      conteudo: novoPost.conteudo,
      categoria: novoPost.categoria || "Geral",
      curtidas: 0,
      comentarios: 0,
      curtido: false,
    }

    setPosts((prev) => [post, ...prev])
    setNovoPost({ conteudo: "", categoria: "" })
    setDialogOpen(false)
  }

  const getCategoriaColor = (categoria: string) => {
    switch (categoria) {
      case "Testemunho":
        return "bg-green-100 text-green-800"
      case "Reflexão":
        return "bg-blue-100 text-blue-800"
      case "Pergunta":
        return "bg-yellow-100 text-yellow-800"
      case "Oração":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
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
                  <h1 className="text-xl font-bold">Comunidade Católica</h1>
                  <p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                    Compartilhe sua fé com outros católicos
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  <Users className="h-3 w-3 mr-1" />
                  1.2k online
                </Badge>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 space-y-4">
          {/* Botão Criar Post */}
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="w-full text-white" style={themeStyles}>
                <Plus className="h-4 w-4 mr-2" />
                Compartilhar Reflexão
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Nova Publicação</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>Categoria</Label>
                  <Select
                    value={novoPost.categoria}
                    onValueChange={(value) => setNovoPost({ ...novoPost, categoria: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Testemunho">Testemunho</SelectItem>
                      <SelectItem value="Reflexão">Reflexão</SelectItem>
                      <SelectItem value="Pergunta">Pergunta</SelectItem>
                      <SelectItem value="Oração">Pedido de Oração</SelectItem>
                      <SelectItem value="Geral">Geral</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Sua mensagem</Label>
                  <Textarea
                    value={novoPost.conteudo}
                    onChange={(e) => setNovoPost({ ...novoPost, conteudo: e.target.value })}
                    placeholder="Compartilhe sua reflexão, testemunho ou pergunta..."
                    rows={4}
                  />
                </div>
                <div className="flex gap-2">
                  <Button onClick={criarPost} className="flex-1 text-white" style={themeStyles}>
                    <Send className="h-4 w-4 mr-2" />
                    Publicar
                  </Button>
                  <Button onClick={() => setDialogOpen(false)} variant="outline" className="flex-1">
                    Cancelar
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          {/* Feed de Posts */}
          <div className="space-y-4">
            {posts.map((post) => (
              <Card key={post.id} className={cardClass}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={post.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{post.autor.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-sm">{post.autor}</h3>
                        <div className="flex items-center gap-2">
                          <p className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>{post.tempo}</p>
                          <Badge variant="outline" className={`text-xs ${getCategoriaColor(post.categoria)}`}>
                            {post.categoria}
                          </Badge>
                        </div>
                        {post.paroquia && (
                          <p className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>{post.paroquia}</p>
                        )}
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm leading-relaxed">{post.conteudo}</p>

                  {/* Ações do Post */}
                  <div className="flex items-center justify-between pt-2 border-t">
                    <div className="flex items-center space-x-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => curtirPost(post.id)}
                        className={`flex items-center gap-1 ${post.curtido ? "text-red-500" : ""}`}
                      >
                        <Heart className={`h-4 w-4 ${post.curtido ? "fill-current" : ""}`} />
                        <span className="text-xs">{post.curtidas}</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="flex items-center gap-1">
                        <MessageCircle className="h-4 w-4" />
                        <span className="text-xs">{post.comentarios}</span>
                      </Button>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Informações da Comunidade */}
          <Card className={cardClass}>
            <CardContent className="p-4 text-center">
              <div className="space-y-2">
                <div className="text-2xl">⛪</div>
                <h3 className="font-semibold">Comunidade Católica</h3>
                <p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                  Um espaço seguro para compartilhar sua fé, fazer perguntas e fortalecer sua vida espiritual junto com
                  outros católicos.
                </p>
                <div className="flex justify-center gap-4 text-xs text-gray-500 mt-3">
                  <span>1.2k membros</span>
                  <span>•</span>
                  <span>50 posts hoje</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
