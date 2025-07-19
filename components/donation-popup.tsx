"use client"

import type React from "react"

import { useState } from "react"
import { Heart, CreditCard, Smartphone, FileText, Check } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { useTheme } from "../contexts/theme-context"

interface DonationPopupProps {
  isOpen: boolean
  onClose: () => void
}

export default function DonationPopup({ isOpen, onClose }: DonationPopupProps) {
  const { currentTheme, isDarkMode } = useTheme()
  const [valor, setValor] = useState("")
  const [metodoPagamento, setMetodoPagamento] = useState<"pix" | "cartao" | "boleto" | null>(null)
  const [processando, setProcessando] = useState(false)
  const [sucesso, setSucesso] = useState(false)

  const cardClass = isDarkMode ? "bg-gray-800 border-gray-700 text-white" : "bg-white"

  const themeStyles = {
    backgroundColor: currentTheme.colors.primary,
    color: "white",
  }

  const formatarValor = (value: string) => {
    // Remove tudo que não é número
    const numero = value.replace(/\D/g, "")

    // Converte para formato de moeda
    const valorFormatado = (Number.parseInt(numero) / 100).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    })

    return valorFormatado
  }

  const handleValorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valorFormatado = formatarValor(e.target.value)
    setValor(valorFormatado)
  }

  const getValorNumerico = () => {
    return Number.parseFloat(valor.replace(/[^\d,]/g, "").replace(",", ".")) || 0
  }

  const processarPagamento = async () => {
    if (getValorNumerico() < 1) {
      alert("O valor mínimo para doação é R$ 1,00")
      return
    }

    if (!metodoPagamento) {
      alert("Selecione um método de pagamento")
      return
    }

    setProcessando(true)

    // Simulação de API de pagamento
    try {
      // Simular chamada para API de pagamento
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Simular resposta da API
      const pagamentoData = {
        id: Date.now().toString(),
        valor: getValorNumerico(),
        metodo: metodoPagamento,
        status: "aprovado",
        data: new Date().toISOString(),
      }

      // Salvar no localStorage (simulando persistência)
      const doacoes = JSON.parse(localStorage.getItem("doacoes") || "[]")
      doacoes.push(pagamentoData)
      localStorage.setItem("doacoes", JSON.stringify(doacoes))

      setSucesso(true)
    } catch (error) {
      alert("Erro ao processar pagamento. Tente novamente.")
    } finally {
      setProcessando(false)
    }
  }

  const resetForm = () => {
    setValor("")
    setMetodoPagamento(null)
    setProcessando(false)
    setSucesso(false)
  }

  const handleClose = () => {
    resetForm()
    onClose()
  }

  if (sucesso) {
    return (
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className={`max-w-md ${cardClass}`}>
          <div className="text-center space-y-4 p-6">
            <div
              className="w-16 h-16 mx-auto rounded-full flex items-center justify-center"
              style={{ backgroundColor: currentTheme.colors.primary }}
            >
              <Check className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold">Doação Realizada!</h2>
            <p className={`${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
              Obrigado por sua generosidade! Sua doação de {valor} foi processada com sucesso.
            </p>
            <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
              Que Deus abençoe sua vida abundantemente! 🙏
            </p>
            <Button onClick={handleClose} className="w-full text-white" style={themeStyles}>
              Fechar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className={`max-w-md ${cardClass}`}>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5" style={{ color: currentTheme.colors.primary }} />
            Apoie o SantApp
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Mensagem de apoio */}
          <div className="text-center space-y-2">
            <p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
              Sua doação nos ajuda a manter o aplicativo gratuito e desenvolver novas funcionalidades para fortalecer
              sua vida espiritual.
            </p>
          </div>

          {/* Campo de valor */}
          <div className="space-y-2">
            <Label htmlFor="valor">Valor da Doação</Label>
            <Input
              id="valor"
              value={valor}
              onChange={handleValorChange}
              placeholder="R$ 0,00"
              className="text-lg text-center"
            />
            <p className={`text-xs text-center ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
              Valor mínimo: R$ 1,00
            </p>
          </div>

          {/* Valores sugeridos */}
          {!valor && (
            <div className="space-y-2">
              <Label>Valores Sugeridos</Label>
              <div className="grid grid-cols-3 gap-2">
                {["R$ 5,00", "R$ 10,00", "R$ 25,00"].map((valorSugerido) => (
                  <Button
                    key={valorSugerido}
                    variant="outline"
                    size="sm"
                    onClick={() => setValor(valorSugerido)}
                    className="bg-transparent"
                  >
                    {valorSugerido}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Métodos de pagamento */}
          {getValorNumerico() >= 1 && (
            <div className="space-y-3">
              <Label>Método de Pagamento</Label>
              <div className="space-y-2">
                <Card
                  className={`cursor-pointer transition-all ${
                    metodoPagamento === "pix" ? "ring-2" : isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-50"
                  } ${cardClass}`}
                  style={{
                    ringColor: metodoPagamento === "pix" ? currentTheme.colors.primary : "transparent",
                  }}
                  onClick={() => setMetodoPagamento("pix")}
                >
                  <CardContent className="p-3">
                    <div className="flex items-center space-x-3">
                      <Smartphone className="h-5 w-5" style={{ color: currentTheme.colors.primary }} />
                      <div>
                        <p className="font-medium">PIX</p>
                        <p className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                          Pagamento instantâneo
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card
                  className={`cursor-pointer transition-all ${
                    metodoPagamento === "cartao" ? "ring-2" : isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-50"
                  } ${cardClass}`}
                  style={{
                    ringColor: metodoPagamento === "cartao" ? currentTheme.colors.primary : "transparent",
                  }}
                  onClick={() => setMetodoPagamento("cartao")}
                >
                  <CardContent className="p-3">
                    <div className="flex items-center space-x-3">
                      <CreditCard className="h-5 w-5" style={{ color: currentTheme.colors.primary }} />
                      <div>
                        <p className="font-medium">Cartão de Crédito</p>
                        <p className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                          Visa, Mastercard, Elo
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card
                  className={`cursor-pointer transition-all ${
                    metodoPagamento === "boleto" ? "ring-2" : isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-50"
                  } ${cardClass}`}
                  style={{
                    ringColor: metodoPagamento === "boleto" ? currentTheme.colors.primary : "transparent",
                  }}
                  onClick={() => setMetodoPagamento("boleto")}
                >
                  <CardContent className="p-3">
                    <div className="flex items-center space-x-3">
                      <FileText className="h-5 w-5" style={{ color: currentTheme.colors.primary }} />
                      <div>
                        <p className="font-medium">Boleto Bancário</p>
                        <p className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                          Vencimento em 3 dias
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Botões de ação */}
          <div className="space-y-3">
            {getValorNumerico() >= 1 && metodoPagamento && (
              <Button
                onClick={processarPagamento}
                disabled={processando}
                className="w-full text-white"
                style={themeStyles}
              >
                {processando ? "Processando..." : `Doar ${valor}`}
              </Button>
            )}
            <Button onClick={handleClose} variant="outline" className="w-full bg-transparent">
              Cancelar
            </Button>
          </div>

          {/* Informação de segurança */}
          <div className="text-center">
            <p className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
              🔒 Pagamento seguro e criptografado
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
