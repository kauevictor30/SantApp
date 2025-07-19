"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Calendar, ChurchIcon as Rosary, BookOpen, Home, Settings, Heart, Users } from "lucide-react"
import { useTheme } from "../contexts/theme-context"
import { useMassNotifications } from "../hooks/use-mass-notifications" // Importar o hook de notificações
import "./globals.css"
import DonationPopup from "../components/donation-popup"

const navigation = [
  { name: "Início", href: "/", icon: Home },
  { name: "Terço", href: "/terco", icon: Rosary },
  { name: "Novena", href: "/novena", icon: Calendar },
  { name: "Homílias", href: "/homilias", icon: BookOpen },
  { name: "Comunidade", href: "/comunidade", icon: Users },
  { name: "Doar", href: "#", icon: Heart },
  { name: "Config", href: "/configuracoes", icon: Settings },
]

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const { currentTheme, isDarkMode } = useTheme()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [donationOpen, setDonationOpen] = useState(false)

  // Ativar o hook de notificações
  useMassNotifications()

  const backgroundClass = isDarkMode ? "bg-gray-900" : "bg-gray-50"
  const navBackgroundClass = isDarkMode ? "bg-gray-800" : "bg-white"

  return (
    <div className={`min-h-screen ${backgroundClass}`}>
      {/* Mobile Bottom Navigation */}
      <div className={`fixed bottom-0 left-0 right-0 ${navBackgroundClass} border-t shadow-lg z-50 md:hidden`}>
        <div className="grid grid-cols-7 h-16">
          {navigation.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href

            if (item.name === "Doar") {
              return (
                <button
                  key={item.name}
                  onClick={() => setDonationOpen(true)}
                  className={`flex flex-col items-center justify-center space-y-1 transition-colors ${
                    isActive
                      ? isDarkMode
                        ? "text-white"
                        : "text-gray-900"
                      : isDarkMode
                        ? "text-gray-400"
                        : "text-gray-600"
                  }`}
                  style={isActive ? { color: currentTheme.colors.primary } : {}}
                >
                  <Icon className="h-4 w-4" />
                  <span className="text-xs font-medium">{item.name}</span>
                </button>
              )
            }

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex flex-col items-center justify-center space-y-1 transition-colors ${
                  isActive
                    ? isDarkMode
                      ? "text-white"
                      : "text-gray-900"
                    : isDarkMode
                      ? "text-gray-400"
                      : "text-gray-600"
                }`}
                style={isActive ? { color: currentTheme.colors.primary } : {}}
              >
                <Icon className="h-4 w-4" />
                <span className="text-xs font-medium">{item.name}</span>
              </Link>
            )
          })}
        </div>
      </div>

      {/* Desktop Header */}
      <header className={`${navBackgroundClass} shadow-sm border-b sticky top-0 z-40 hidden md:block`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold"
                style={{ backgroundColor: currentTheme.colors.primary }}
              >
                S
              </div>
              <span className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>Santo App</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="flex space-x-8">
              {navigation.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                return item.name === "Doar" ? (
                  <button
                    key={item.name}
                    onClick={() => setDonationOpen(true)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? `text-white`
                        : isDarkMode
                          ? "text-gray-300 hover:text-white hover:bg-gray-700"
                          : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                    }`}
                    style={isActive ? { backgroundColor: currentTheme.colors.primary } : {}}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </button>
                ) : (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? `text-white`
                        : isDarkMode
                          ? "text-gray-300 hover:text-white hover:bg-gray-700"
                          : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                    }`}
                    style={isActive ? { backgroundColor: currentTheme.colors.primary } : {}}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Link>
                )
              })}
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 pb-20 md:pb-0">{children}</main>

      {/* Footer - apenas desktop */}
      <footer className={`${navBackgroundClass} border-t mt-12 hidden md:block`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-2">
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center text-white font-bold text-sm"
                style={{ backgroundColor: currentTheme.colors.primary }}
              >
                S
              </div>
              <span className={`text-lg font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>Santo App</span>
            </div>
            <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
              Aplicativo Católico de Espiritualidade e Organização Litúrgica
            </p>
            <div className={`flex justify-center space-x-6 text-sm ${isDarkMode ? "text-gray-500" : "text-gray-500"}`}>
              <span>Desenvolvido com React & JavaScript</span>
              <span>•</span>
              <span>Construído com V0.dev</span>
            </div>
          </div>
        </div>
      </footer>
      <DonationPopup isOpen={donationOpen} onClose={() => setDonationOpen(false)} />
    </div>
  )
}
