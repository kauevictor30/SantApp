"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, Palette, Moon, Sun, Bell, MapPin, Smartphone } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { useTheme, saintThemes } from "../../contexts/theme-context"
import { useMassNotifications } from "../../hooks/use-mass-notifications" // Importar o hook de notificações
import Link from "next/link"

export default function ConfiguracoesPage() {
  const { currentTheme, isDarkMode, setTheme, toggleDarkMode } = useTheme()
  const { requestNotificationPermission } = useMassNotifications() // Usar o hook
  const [notificacoes, setNotificacoes] = useState(true)
  const [localizacao, setLocalizacao] = useState(true)
  const [lembreteAntes, setLembreteAntes] = useState([30])
  const [volumeAlarme, setVolumeAlarme] = useState([80])
  const [vibrar, setVibrar] = useState(true)

  useEffect(() => {
    // Carregar configurações salvas
    setNotificacoes(localStorage.getItem("notificacoes") === "true")
    setLocalizacao(localStorage.getItem("localizacao") === "true")
    setLembreteAntes([Number.parseInt(localStorage.getItem("lembreteAntes") || "30", 10)])
    setVolumeAlarme([Number.parseInt(localStorage.getItem("volumeAlarme") || "80", 10)])
    setVibrar(localStorage.getItem("vibrar") === "true")
  }, [])

  useEffect(() => {
    // Salvar configurações ao mudar
    localStorage.setItem("notificacoes", notificacoes.toString())
    localStorage.setItem("localizacao", localizacao.toString())
    localStorage.setItem("lembreteAntes", lembreteAntes[0].toString())
    localStorage.setItem("volumeAlarme", volumeAlarme[0].toString())
    localStorage.setItem("vibrar", vibrar.toString())
  }, [notificacoes, localizacao, lembreteAntes, volumeAlarme, vibrar])

  const backgroundClass = isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50"
  const cardClass = isDarkMode ? "bg-gray-800 border-gray-700 text-white" : "bg-white"

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
              <div>
                <h1 className="text-xl font-bold">Configurações</h1>
                <p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>Personalize seu SantApp</p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 space-y-6">
          {/* Temas dos Santos */}
          <Card className={cardClass}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Temas dos Santos
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                Escolha um santo para personalizar as cores do app
              </p>

              <div className="grid grid-cols-1 gap-3">
                {saintThemes.map((theme) => (
                  <div
                    key={theme.id}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      currentTheme.id === theme.id
                        ? "border-current"
                        : isDarkMode
                          ? "border-gray-600 hover:border-gray-500"
                          : "border-gray-200 hover:border-gray-300"
                    }`}
                    style={{
                      borderColor: currentTheme.id === theme.id ? theme.colors.primary : undefined,
                    }}
                    onClick={() => setTheme(theme.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">{theme.name}</h3>
                        <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>{theme.saint}</p>
                      </div>
                      <div className="flex space-x-1">
                        <div
                          className="w-4 h-4 rounded-full border"
                          style={{ backgroundColor: theme.colors.primary }}
                        />
                        <div
                          className="w-4 h-4 rounded-full border"
                          style={{ backgroundColor: theme.colors.secondary }}
                        />
                        <div className="w-4 h-4 rounded-full border" style={{ backgroundColor: theme.colors.accent }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Aparência */}
          <Card className={cardClass}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {isDarkMode ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                Aparência
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Modo Escuro</h3>
                  <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                    Alterna entre tema claro e escuro
                  </p>
                </div>
                <Switch checked={isDarkMode} onCheckedChange={toggleDarkMode} />
              </div>
            </CardContent>
          </Card>

          {/* Notificações */}
          <Card className={cardClass}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notificações
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Alertas de Missa</h3>
                  <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                    Receber lembretes das missas
                  </p>
                </div>
                <Switch checked={notificacoes} onCheckedChange={setNotificacoes} />
              </div>

              {notificacoes && (
                <>
                  <Button onClick={requestNotificationPermission} variant="outline" className="w-full bg-transparent">
                    Solicitar Permissão de Notificação
                  </Button>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Lembrar antes</span>
                      <span className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                        {lembreteAntes[0]} minutos
                      </span>
                    </div>
                    <Slider
                      value={lembreteAntes}
                      onValueChange={setLembreteAntes}
                      max={120}
                      min={5}
                      step={5}
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Volume do Alarme</span>
                      <span className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                        {volumeAlarme[0]}%
                      </span>
                    </div>
                    <Slider
                      value={volumeAlarme}
                      onValueChange={setVolumeAlarme}
                      max={100}
                      min={0}
                      step={10}
                      className="w-full"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Vibração</h3>
                      <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                        Vibrar ao receber notificações
                      </p>
                    </div>
                    <Switch checked={vibrar} onCheckedChange={setVibrar} />
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Localização */}
          <Card className={cardClass}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Localização
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Usar Localização</h3>
                  <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                    Encontrar paróquias próximas automaticamente
                  </p>
                </div>
                <Switch checked={localizacao} onCheckedChange={setLocalizacao} />
              </div>

              <div className="space-y-2">
                <label className="font-medium">Raio de Busca</label>
                <Select defaultValue="5km">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1km">1 km</SelectItem>
                    <SelectItem value="3km">3 km</SelectItem>
                    <SelectItem value="5km">5 km</SelectItem>
                    <SelectItem value="10km">10 km</SelectItem>
                    <SelectItem value="20km">20 km</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Outras Configurações */}
          <Card className={cardClass}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Smartphone className="h-5 w-5" />
                Outras Configurações
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="font-medium">Idioma</label>
                <Select defaultValue="pt-br">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pt-br">Português (Brasil)</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Español</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="font-medium">Formato de Hora</label>
                <Select defaultValue="24h">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="24h">24 horas</SelectItem>
                    <SelectItem value="12h">12 horas (AM/PM)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Botões de Ação */}
          <div className="space-y-3">
            <Button variant="outline" className="w-full bg-transparent">
              Exportar Configurações
            </Button>
            <Button variant="outline" className="w-full bg-transparent">
              Restaurar Padrões
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
