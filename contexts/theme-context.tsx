"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

export interface SaintTheme {
  id: string
  name: string
  saint: string
  colors: {
    primary: string
    primaryHover: string
    secondary: string
    accent: string
    text: string
  }
}

export const saintThemes: SaintTheme[] = [
  {
    id: "jesus-cristo",
    name: "Jesus Cristo",
    saint: "Nosso Senhor Jesus Cristo",
    colors: {
      primary: "rgb(218, 165, 32)", // Dourado
      primaryHover: "rgb(184, 134, 11)",
      secondary: "rgb(30, 144, 255)", // Azul celestial
      accent: "rgb(255, 255, 255)", // Branco puro
      text: "rgb(139, 69, 19)", // Marrom dourado
    },
  },
  {
    id: "nossa-senhora",
    name: "Nossa Senhora",
    saint: "Virgem Maria",
    colors: {
      primary: "rgb(70, 130, 180)", // Azul mariano
      primaryHover: "rgb(65, 105, 225)",
      secondary: "rgb(176, 196, 222)", // Azul claro
      accent: "rgb(255, 255, 255)",
      text: "rgb(25, 25, 112)",
    },
  },
  {
    id: "santa-luzia",
    name: "Santa Luzia",
    saint: "Padroeira dos Olhos",
    colors: {
      primary: "rgb(220, 20, 60)", // Vermelho vibrante
      primaryHover: "rgb(178, 34, 34)",
      secondary: "rgb(34, 139, 34)", // Verde esperança
      accent: "rgb(255, 240, 245)",
      text: "rgb(139, 0, 0)",
    },
  },
  {
    id: "carlo-acutis",
    name: "Carlo Acutis",
    saint: "Padroeiro da Internet",
    colors: {
      primary: "rgb(0, 191, 255)", // Azul tech vibrante
      primaryHover: "rgb(30, 144, 255)",
      secondary: "rgb(138, 43, 226)", // Roxo digital
      accent: "rgb(240, 248, 255)",
      text: "rgb(25, 25, 112)",
    },
  },
  {
    id: "sao-jose",
    name: "São José",
    saint: "Pai Putativo de Jesus",
    colors: {
      primary: "rgb(160, 82, 45)", // Marrom carpinteiro
      primaryHover: "rgb(139, 69, 19)",
      secondary: "rgb(222, 184, 135)", // Bege
      accent: "rgb(255, 248, 220)",
      text: "rgb(101, 67, 33)",
    },
  },
  {
    id: "santa-teresinha",
    name: "Santa Teresinha",
    saint: "Doutora da Igreja",
    colors: {
      primary: "rgb(219, 112, 147)", // Rosa suave
      primaryHover: "rgb(199, 21, 133)",
      secondary: "rgb(255, 182, 193)", // Rosa claro
      accent: "rgb(255, 240, 245)",
      text: "rgb(139, 69, 19)",
    },
  },
  {
    id: "sao-francisco",
    name: "São Francisco",
    saint: "Patrono da Ecologia",
    colors: {
      primary: "rgb(101, 67, 33)", // Marrom franciscano
      primaryHover: "rgb(83, 53, 10)",
      secondary: "rgb(107, 142, 35)", // Verde oliva
      accent: "rgb(245, 245, 220)",
      text: "rgb(85, 107, 47)",
    },
  },
]

interface ThemeContextType {
  currentTheme: SaintTheme
  isDarkMode: boolean
  setTheme: (themeId: string) => void
  toggleDarkMode: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState<SaintTheme>(saintThemes[0])
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    const savedTheme = localStorage.getItem("saint-theme")
    const savedDarkMode = localStorage.getItem("dark-mode") === "true"

    if (savedTheme) {
      const theme = saintThemes.find((t) => t.id === savedTheme)
      if (theme) setCurrentTheme(theme)
    }
    setIsDarkMode(savedDarkMode)
  }, [])

  const setTheme = (themeId: string) => {
    const theme = saintThemes.find((t) => t.id === themeId)
    if (theme) {
      setCurrentTheme(theme)
      localStorage.setItem("saint-theme", themeId)
    }
  }

  const toggleDarkMode = () => {
    const newMode = !isDarkMode
    setIsDarkMode(newMode)
    localStorage.setItem("dark-mode", newMode.toString())
  }

  return (
    <ThemeContext.Provider value={{ currentTheme, isDarkMode, setTheme, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
