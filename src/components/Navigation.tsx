import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Menu, X, Home, Telescope, Info, Mail } from 'lucide-react'

interface NavigationProps {
  currentPage: string
  onPageChange: (page: string) => void
  onAdminClick?: () => void
}

export default function Navigation({ currentPage, onPageChange, onAdminClick }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false)
  
  const menuItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'explore', label: 'Explore', icon: Telescope },
    { id: 'about', label: 'About', icon: Info },
    { id: 'contact', label: 'Contact', icon: Mail },
    { id: 'admin', label: 'Admin', icon: Info, action: onAdminClick },
  ]

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-6 right-6 z-50 lg:hidden glass-panel"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      {/* Desktop Navigation */}
      <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-40 hidden lg:block">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="glass-panel rounded-2xl px-2 py-2"
        >
          <div className="flex space-x-2">
            {menuItems.map((item) => {
              const Icon = item.icon
              return (
                <Button
                  key={item.id}
                  variant={currentPage === item.id ? "default" : "ghost"}
                  className={`nav-item ${
                    currentPage === item.id 
                      ? 'bg-primary text-primary-foreground shadow-lg' 
                      : 'hover:bg-white/10'
                  }`}
                  onClick={() => (item as any).action ? (item as any).action() : onPageChange(item.id)}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {item.label}
                </Button>
              )
            })}
          </div>
        </motion.div>
      </nav>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden"
            onClick={() => setIsOpen(false)}
          >
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
            <motion.nav
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="absolute right-0 top-0 h-full w-80 glass-panel p-6"
              onClick={(e) => e.stopPropagation()}
            >
                <div className="mt-16 space-y-4">
                  {menuItems.map((item) => {
                    const Icon = item.icon
                    return (
                      <Button
                        key={item.id}
                        variant={currentPage === item.id ? "default" : "ghost"}
                        className={`w-full justify-start nav-item ${
                          currentPage === item.id 
                            ? 'bg-primary text-primary-foreground' 
                            : 'hover:bg-white/10'
                        }`}
                        onClick={() => {
                          if ((item as any).action) {
                            (item as any).action()
                          } else {
                            onPageChange(item.id)
                          }
                          setIsOpen(false)
                        }}
                      >
                        <Icon className="h-5 w-5 mr-3" />
                        {item.label}
                      </Button>
                    )
                  })}
                </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}