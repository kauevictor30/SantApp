"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "../contexts/theme-context"
import type { Paroquia } from "../types/paroquia"

interface NotificationSettings {
  notificacoes: boolean
  lembreteAntes: number
}

const getNotificationSettings = (): NotificationSettings => {
  if (typeof window === "undefined") return { notificacoes: false, lembreteAntes: 30 }
  const notificacoes = localStorage.getItem("notificacoes") === "true"
  const lembreteAntes = Number.parseInt(localStorage.getItem("lembreteAntes") || "30", 10)
  return { notificacoes, lembreteAntes }
}

const getParoquias = (): Paroquia[] => {
  if (typeof window === "undefined") return []
  const hardcodedParoquias: Paroquia[] = [
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
  ]
  const customParoquias = JSON.parse(localStorage.getItem("paroquias-personalizadas") || "[]")
  return [...hardcodedParoquias, ...customParoquias]
}

const getDayOfWeekString = (dayIndex: number): string => {
  const days = [
    "Domingo",
    "Segunda a Sexta",
    "Segunda a Sexta",
    "Segunda a Sexta",
    "Segunda a Sexta",
    "Segunda a Sexta",
    "Sábado",
  ]
  return days[dayIndex]
}

export function useMassNotifications() {
  const { currentTheme } = useTheme()
  const notifiedMasses = useRef<Set<string>>(new Set()) // Para evitar notificações duplicadas

  useEffect(() => {
    if (typeof window === "undefined") return

    const checkAndNotify = () => {
      const { notificacoes, lembreteAntes } = getNotificationSettings()
      if (!notificacoes || !("Notification" in window) || Notification.permission !== "granted") {
        return
      }

      const now = new Date()
      const currentDayIndex = now.getDay() // 0 for Sunday, 1 for Monday, etc.
      const currentHour = now.getHours()
      const currentMinute = now.getMinutes()

      const allParoquias = getParoquias()
      const favoritedParoquias = allParoquias.filter((p) => p.favorita)

      favoritedParoquias.forEach((paroquia) => {
        paroquia.missas.forEach((missaDia) => {
          const isToday =
            (currentDayIndex === 0 && missaDia.dia === "Domingo") ||
            (currentDayIndex === 6 && missaDia.dia === "Sábado") ||
            (currentDayIndex >= 1 && currentDayIndex <= 5 && missaDia.dia === "Segunda a Sexta")

          if (isToday) {
            missaDia.horarios.forEach((horario) => {
              const [massHourStr, massMinuteStr] = horario.split(":")
              const massHour = Number.parseInt(massHourStr, 10)
              const massMinute = Number.parseInt(massMinuteStr, 10)

              const massTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), massHour, massMinute, 0)
              const timeDiffMs = massTime.getTime() - now.getTime()
              const timeDiffMinutes = Math.round(timeDiffMs / (1000 * 60))

              const notificationId = `${paroquia.id}-${missaDia.dia}-${horario}`

              if (
                timeDiffMinutes > 0 &&
                timeDiffMinutes <= lembreteAntes &&
                !notifiedMasses.current.has(notificationId)
              ) {
                new Notification(`Missa Próxima em ${paroquia.nome}`, {
                  body: `A missa das ${horario}h está começando em ${timeDiffMinutes} minutos. Endereço: ${paroquia.endereco}`,
                  icon: "/favicon.ico", // Ícone do app
                  badge: "/favicon.ico",
                  vibrate: [200, 100, 200],
                  tag: notificationId, // Usar tag para evitar múltiplas notificações visíveis para o mesmo evento
                })
                notifiedMasses.current.add(notificationId)

                // Remover a notificação do set após um tempo para permitir futuras notificações (ex: no dia seguinte)
                setTimeout(
                  () => {
                    notifiedMasses.current.delete(notificationId)
                  },
                  24 * 60 * 60 * 1000,
                ) // 24 horas
              }
            })
          }
        })
      })
    }

    // Verifica a cada minuto
    const interval = setInterval(checkAndNotify, 60 * 1000)

    // Limpa o intervalo ao desmontar o componente
    return () => clearInterval(interval)
  }, [currentTheme]) // Depende do tema para re-renderizar se necessário, mas principalmente para o useEffect rodar uma vez

  const requestNotificationPermission = () => {
    if (!("Notification" in window)) {
      alert("Este navegador não suporta notificações de desktop.")
    } else if (Notification.permission === "granted") {
      console.log("Permissão para notificações já concedida.")
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          console.log("Permissão para notificações concedida!")
          new Notification("Notificações Ativadas", {
            body: "Você receberá alertas de missa das suas paróquias favoritas.",
            icon: "/favicon.ico",
          })
        } else {
          console.log("Permissão para notificações negada.")
          alert(
            "Para receber alertas de missa, por favor, habilite as notificações nas configurações do seu navegador.",
          )
        }
      })
    }
  }

  return { requestNotificationPermission }
}
