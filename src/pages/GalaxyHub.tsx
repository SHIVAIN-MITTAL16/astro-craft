import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Galaxy3D from '@/components/Galaxy3D'
import Navigation from '@/components/Navigation'
import HeroSection from '@/components/HeroSection'
import PlanetCard from '@/components/PlanetCard'

// Sample planet data
const samplePlanets = [
  {
    id: 'mercury',
    name: 'Mercury',
    position: [2, 0, 0] as [number, number, number],
    size: 0.3,
    color: '#8C7853',
    orbitRadius: 3,
    orbitSpeed: 0.8,
    description: 'The smallest and innermost planet in our solar system.',
    funFact: 'A day on Mercury lasts longer than its year!'
  },
  {
    id: 'venus',
    name: 'Venus',
    position: [3, 0, 0] as [number, number, number],
    size: 0.5,
    color: '#FFC649',
    orbitRadius: 4.5,
    orbitSpeed: 0.6,
    description: 'The hottest planet in our solar system with thick clouds.',
    funFact: 'Venus rotates backwards compared to most planets!'
  },
  {
    id: 'earth',
    name: 'Earth',
    position: [4, 0, 0] as [number, number, number],
    size: 0.5,
    color: '#6B93D6',
    orbitRadius: 6,
    orbitSpeed: 0.4,
    description: 'Our beautiful blue home planet, teeming with life.',
    funFact: 'Earth is the only known planet with liquid water on its surface!'
  },
  {
    id: 'mars',
    name: 'Mars',
    position: [5, 0, 0] as [number, number, number],
    size: 0.4,
    color: '#CD5C5C',
    orbitRadius: 7.5,
    orbitSpeed: 0.3,
    description: 'The red planet, our next destination for human exploration.',
    funFact: 'Mars has the largest volcano in the solar system - Olympus Mons!'
  },
  {
    id: 'jupiter',
    name: 'Jupiter',
    position: [8, 0, 0] as [number, number, number],
    size: 1.2,
    color: '#D8CA9D',
    orbitRadius: 10,
    orbitSpeed: 0.2,
    description: 'The largest planet, a gas giant with many moons.',
    funFact: 'Jupiter has more than 80 known moons!'
  },
  {
    id: 'saturn',
    name: 'Saturn',
    position: [10, 0, 0] as [number, number, number],
    size: 1.0,
    color: '#FAD5A5',
    orbitRadius: 12,
    orbitSpeed: 0.15,
    description: 'Famous for its spectacular ring system.',
    funFact: 'Saturn is less dense than water - it would float!'
  }
]

export default function GalaxyHub() {
  const [currentPage, setCurrentPage] = useState('home')
  const [selectedPlanet, setSelectedPlanet] = useState<string | null>(null)
  const [showHero, setShowHero] = useState(true)

  const handlePlanetClick = (planetId: string) => {
    setSelectedPlanet(planetId)
  }

  const handleExplore = () => {
    setShowHero(false)
    setCurrentPage('explore')
  }

  const selectedPlanetData = selectedPlanet 
    ? samplePlanets.find(p => p.id === selectedPlanet)
    : null

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* 3D Galaxy Background */}
      <Galaxy3D 
        planets={samplePlanets} 
        onPlanetClick={handlePlanetClick}
      />
      
      {/* Navigation */}
      <Navigation 
        currentPage={currentPage} 
        onPageChange={setCurrentPage}
      />
      
      {/* Hero Section */}
      <AnimatePresence>
        {showHero && currentPage === 'home' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <HeroSection onExplore={handleExplore} />
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Planet Detail Modal */}
      <AnimatePresence>
        {selectedPlanet && selectedPlanetData && (
          <PlanetCard
            planet={selectedPlanetData}
            onBack={() => setSelectedPlanet(null)}
          />
        )}
      </AnimatePresence>
      
      {/* Page Content */}
      <AnimatePresence mode="wait">
        {!showHero && currentPage !== 'home' && (
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 min-h-screen flex items-center justify-center p-4"
          >
            <div className="glass-panel rounded-2xl p-8 max-w-4xl w-full">
              {currentPage === 'explore' && (
                <div className="text-center">
                  <h1 className="title-space text-4xl mb-6">Explore the Galaxy</h1>
                  <p className="text-lg text-muted-foreground mb-8">
                    Click on any planet in the 3D view to learn more about it. 
                    Use your mouse to navigate around the galaxy and discover new worlds.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {samplePlanets.map((planet) => (
                      <div
                        key={planet.id}
                        className="glass-panel p-4 rounded-lg cursor-pointer planet-hover"
                        onClick={() => handlePlanetClick(planet.id)}
                      >
                        <div
                          className="w-16 h-16 rounded-full mx-auto mb-3"
                          style={{
                            background: `radial-gradient(circle at 30% 30%, ${planet.color}, #1a1a2e)`,
                            boxShadow: `0 0 20px ${planet.color}40`
                          }}
                        />
                        <h3 className="font-semibold text-center">{planet.name}</h3>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {currentPage === 'about' && (
                <div className="text-center">
                  <h1 className="title-space text-4xl mb-6">About Live Galaxy</h1>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Live Galaxy is an immersive 3D space exploration platform that brings the wonders 
                    of our solar system to your fingertips. Experience real-time planetary motion, 
                    discover fascinating facts about each celestial body, and journey through space 
                    with cutting-edge web technology.
                  </p>
                </div>
              )}
              
              {currentPage === 'contact' && (
                <div className="text-center">
                  <h1 className="title-space text-4xl mb-6">Contact Mission Control</h1>
                  <p className="text-lg text-muted-foreground mb-8">
                    Ready to embark on your own space mission? Get in touch with our team.
                  </p>
                  <div className="glass-panel p-6 rounded-lg max-w-md mx-auto">
                    <p className="text-primary">coming.soon@livegalaxy.space</p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}