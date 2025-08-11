import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Telescope, Sparkles } from 'lucide-react'

interface HeroSectionProps {
  onExplore: () => void
}

export default function HeroSection({ onExplore }: HeroSectionProps) {
  return (
    <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-4xl mx-auto"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', duration: 0.8 }}
          className="mb-8"
        >
          <Sparkles className="h-16 w-16 mx-auto text-primary mb-4 animate-glow-pulse" />
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="title-space text-6xl md:text-8xl mb-6 animate-float"
        >
          Live Galaxy
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed"
        >
          Embark on an infinite journey through space and time. 
          <br className="hidden md:block" />
          Discover planets, explore galaxies, and uncover the mysteries of the universe.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button
            onClick={onExplore}
            size="lg"
            className="btn-space text-lg px-8 py-4"
          >
            <Telescope className="h-5 w-5 mr-2" />
            Begin Exploration
          </Button>
          
          <Button
            variant="outline"
            size="lg"
            className="px-8 py-4 text-lg nav-item"
          >
            <Sparkles className="h-5 w-5 mr-2" />
            Learn More
          </Button>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-16 text-sm text-muted-foreground/70"
        >
          <p>Click and drag to navigate • Scroll to zoom • Click planets to explore</p>
        </motion.div>
      </motion.div>
    </div>
  )
}