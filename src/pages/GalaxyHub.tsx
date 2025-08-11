import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Galaxy3D from '@/components/Galaxy3D'
import Navigation from '@/components/Navigation'
import HeroSection from '@/components/HeroSection'
import PlanetCard from '@/components/PlanetCard'
import AdminPanel from '@/components/AdminPanel'

// Complete Solar System data with all planets and moons
const solarSystemData = [
  {
    id: 'mercury',
    name: 'Mercury',
    position: [2, 0, 0] as [number, number, number],
    size: 0.3,
    color: '#8C7853',
    orbitRadius: 3,
    orbitSpeed: 0.8,
    description: 'The smallest and innermost planet in our solar system.',
    funFact: 'A day on Mercury lasts longer than its year!',
    moons: []
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
    funFact: 'Venus rotates backwards compared to most planets!',
    moons: []
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
    funFact: 'Earth is the only known planet with liquid water on its surface!',
    moons: [
      {
        id: 'moon',
        name: 'The Moon',
        size: 0.15,
        color: '#C0C0C0',
        orbitRadius: 0.8,
        orbitSpeed: 2.0,
        description: 'Earth\'s only natural satellite.'
      }
    ]
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
    funFact: 'Mars has the largest volcano in the solar system - Olympus Mons!',
    moons: [
      {
        id: 'phobos',
        name: 'Phobos',
        size: 0.05,
        color: '#8B4513',
        orbitRadius: 0.6,
        orbitSpeed: 3.0,
        description: 'The largest moon of Mars.'
      },
      {
        id: 'deimos',
        name: 'Deimos',
        size: 0.03,
        color: '#8B4513',
        orbitRadius: 0.9,
        orbitSpeed: 1.5,
        description: 'The smaller, outer moon of Mars.'
      }
    ]
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
    funFact: 'Jupiter has more than 80 known moons!',
    moons: [
      {
        id: 'io',
        name: 'Io',
        size: 0.2,
        color: '#FFFF99',
        orbitRadius: 1.5,
        orbitSpeed: 4.0,
        description: 'Jupiter\'s volcanic moon.'
      },
      {
        id: 'europa',
        name: 'Europa',
        size: 0.18,
        color: '#87CEEB',
        orbitRadius: 2.0,
        orbitSpeed: 3.0,
        description: 'Jupiter\'s icy moon with subsurface ocean.'
      },
      {
        id: 'ganymede',
        name: 'Ganymede',
        size: 0.25,
        color: '#B8860B',
        orbitRadius: 2.5,
        orbitSpeed: 2.5,
        description: 'The largest moon in our solar system.'
      },
      {
        id: 'callisto',
        name: 'Callisto',
        size: 0.22,
        color: '#2F4F4F',
        orbitRadius: 3.0,
        orbitSpeed: 2.0,
        description: 'Jupiter\'s heavily cratered moon.'
      }
    ]
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
    funFact: 'Saturn is less dense than water - it would float!',
    moons: [
      {
        id: 'titan',
        name: 'Titan',
        size: 0.24,
        color: '#FFA500',
        orbitRadius: 1.8,
        orbitSpeed: 2.8,
        description: 'Saturn\'s largest moon with thick atmosphere.'
      },
      {
        id: 'enceladus',
        name: 'Enceladus',
        size: 0.12,
        color: '#F0F8FF',
        orbitRadius: 1.2,
        orbitSpeed: 3.5,
        description: 'Saturn\'s icy moon with geysers.'
      }
    ]
  },
  {
    id: 'uranus',
    name: 'Uranus',
    position: [12, 0, 0] as [number, number, number],
    size: 0.8,
    color: '#4FD0E7',
    orbitRadius: 15,
    orbitSpeed: 0.1,
    description: 'An ice giant that rotates on its side.',
    funFact: 'Uranus has the coldest atmosphere in the solar system!',
    moons: [
      {
        id: 'miranda',
        name: 'Miranda',
        size: 0.08,
        color: '#C0C0C0',
        orbitRadius: 1.0,
        orbitSpeed: 4.5,
        description: 'Uranus\' small, fractured moon.'
      },
      {
        id: 'ariel',
        name: 'Ariel',
        size: 0.1,
        color: '#D3D3D3',
        orbitRadius: 1.3,
        orbitSpeed: 3.8,
        description: 'One of Uranus\' five major moons.'
      }
    ]
  },
  {
    id: 'neptune',
    name: 'Neptune',
    position: [14, 0, 0] as [number, number, number],
    size: 0.7,
    color: '#4B70DD',
    orbitRadius: 18,
    orbitSpeed: 0.08,
    description: 'The windiest planet with supersonic storms.',
    funFact: 'Neptune has winds that reach up to 2,100 km/h!',
    moons: [
      {
        id: 'triton',
        name: 'Triton',
        size: 0.16,
        color: '#F5DEB3',
        orbitRadius: 1.1,
        orbitSpeed: 3.2,
        description: 'Neptune\'s largest moon, orbits backwards.'
      }
    ]
  },
  {
    id: 'pluto',
    name: 'Pluto',
    position: [16, 0, 0] as [number, number, number],
    size: 0.2,
    color: '#DEB887',
    orbitRadius: 22,
    orbitSpeed: 0.05,
    description: 'The dwarf planet at the edge of our solar system.',
    funFact: 'Pluto was reclassified as a dwarf planet in 2006!',
    moons: [
      {
        id: 'charon',
        name: 'Charon',
        size: 0.1,
        color: '#A0522D',
        orbitRadius: 0.7,
        orbitSpeed: 2.5,
        description: 'Pluto\'s largest moon, nearly half its size.'
      }
    ]
  }
]

export default function GalaxyHub() {
  const [currentPage, setCurrentPage] = useState('home')
  const [selectedPlanet, setSelectedPlanet] = useState<string | null>(null)
  const [showHero, setShowHero] = useState(true)
  const [showAdmin, setShowAdmin] = useState(false)
  const [planets, setPlanets] = useState(solarSystemData)

  const handlePlanetClick = (planetId: string) => {
    setSelectedPlanet(planetId)
  }

  const handleExplore = () => {
    setShowHero(false)
    setCurrentPage('explore')
  }

  const selectedPlanetData = selectedPlanet 
    ? planets.find(p => p.id === selectedPlanet)
    : null

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* 3D Galaxy Background */}
      <Galaxy3D 
        planets={planets} 
        onPlanetClick={handlePlanetClick}
      />
      
      {/* Navigation */}
      <Navigation 
        currentPage={currentPage} 
        onPageChange={setCurrentPage}
        onAdminClick={() => setShowAdmin(true)}
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
                    {planets.map((planet) => (
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
      
      {/* Admin Panel */}
      <AnimatePresence>
        {showAdmin && (
          <AdminPanel
            planets={planets}
            onPlanetsUpdate={setPlanets}
            onClose={() => setShowAdmin(false)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}