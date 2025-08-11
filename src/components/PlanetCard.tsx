import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Orbit, Zap } from 'lucide-react'

interface Planet {
  id: string
  name: string
  description: string
  orbitSpeed: number
  funFact: string
  image?: string
  color: string
}

interface PlanetCardProps {
  planet: Planet
  onBack: () => void
}

export default function PlanetCard({ planet, onBack }: PlanetCardProps) {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{ type: 'spring', duration: 0.5 }}
      className="fixed inset-0 z-30 flex items-center justify-center p-4"
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onBack} />
      
      <Card className="relative w-full max-w-2xl glass-panel border-primary/30">
        <CardHeader className="text-center pb-4">
          <motion.div
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            className="mx-auto w-32 h-32 rounded-full mb-4 planet-hover"
            style={{
              background: `radial-gradient(circle at 30% 30%, ${planet.color}, #1a1a2e)`,
              boxShadow: `0 0 30px ${planet.color}40`
            }}
          />
          
          <CardTitle className="title-space text-4xl mb-2">
            {planet.name}
          </CardTitle>
          
          <CardDescription className="text-muted-foreground text-lg">
            {planet.description}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="glass-panel p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <Orbit className="h-5 w-5 text-primary mr-2" />
                <span className="font-semibold">Orbit Speed</span>
              </div>
              <p className="text-2xl font-bold text-primary">
                {planet.orbitSpeed.toFixed(2)} AU/year
              </p>
            </div>
            
            <div className="glass-panel p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <Zap className="h-5 w-5 text-accent mr-2" />
                <span className="font-semibold">Fun Fact</span>
              </div>
              <p className="text-sm text-muted-foreground">
                {planet.funFact}
              </p>
            </div>
          </div>
          
          <div className="flex justify-center">
            <Button 
              onClick={onBack}
              className="btn-space"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Galaxy
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}