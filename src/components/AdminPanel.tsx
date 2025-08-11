import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Plus, Edit, Trash2, Save, X } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface Moon {
  id: string
  name: string
  size: number
  color: string
  orbitRadius: number
  orbitSpeed: number
  description: string
}

interface Planet {
  id: string
  name: string
  position: [number, number, number]
  description: string
  orbitSpeed: number
  funFact: string
  color: string
  size: number
  orbitRadius: number
  moons: Moon[]
}

interface AdminPanelProps {
  planets: Planet[]
  onPlanetsUpdate: (planets: Planet[]) => void
  onClose: () => void
}

export default function AdminPanel({ planets, onPlanetsUpdate, onClose }: AdminPanelProps) {
  const [currentPlanets, setCurrentPlanets] = useState<Planet[]>(planets)
  const [editingPlanet, setEditingPlanet] = useState<Planet | null>(null)
  const [editingMoon, setEditingMoon] = useState<{ moon: Moon; planetId: string } | null>(null)
  const [isAddingPlanet, setIsAddingPlanet] = useState(false)
  const [isAddingMoon, setIsAddingMoon] = useState<string | null>(null)
  const { toast } = useToast()

  const savePlanet = (planet: Planet) => {
    const updatedPlanets = editingPlanet
      ? currentPlanets.map(p => p.id === planet.id ? planet : p)
      : [...currentPlanets, planet]
    
    setCurrentPlanets(updatedPlanets)
    onPlanetsUpdate(updatedPlanets)
    setEditingPlanet(null)
    setIsAddingPlanet(false)
    toast({
      title: "Success",
      description: editingPlanet ? "Planet updated successfully" : "Planet added successfully"
    })
  }

  const deletePlanet = (planetId: string) => {
    const updatedPlanets = currentPlanets.filter(p => p.id !== planetId)
    setCurrentPlanets(updatedPlanets)
    onPlanetsUpdate(updatedPlanets)
    toast({
      title: "Success",
      description: "Planet deleted successfully"
    })
  }

  const saveMoon = (moon: Moon, planetId: string) => {
    const updatedPlanets = currentPlanets.map(planet => {
      if (planet.id === planetId) {
        const updatedMoons = editingMoon
          ? planet.moons.map(m => m.id === moon.id ? moon : m)
          : [...planet.moons, moon]
        return { ...planet, moons: updatedMoons }
      }
      return planet
    })
    
    setCurrentPlanets(updatedPlanets)
    onPlanetsUpdate(updatedPlanets)
    setEditingMoon(null)
    setIsAddingMoon(null)
    toast({
      title: "Success",
      description: editingMoon ? "Moon updated successfully" : "Moon added successfully"
    })
  }

  const deleteMoon = (moonId: string, planetId: string) => {
    const updatedPlanets = currentPlanets.map(planet => {
      if (planet.id === planetId) {
        return { ...planet, moons: planet.moons.filter(m => m.id !== moonId) }
      }
      return planet
    })
    
    setCurrentPlanets(updatedPlanets)
    onPlanetsUpdate(updatedPlanets)
    toast({
      title: "Success",
      description: "Moon deleted successfully"
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      
      <Card className="relative w-full max-w-6xl max-h-[90vh] overflow-y-auto glass-panel border-primary/30">
        <CardHeader className="text-center">
          <CardTitle className="title-space text-3xl">Galaxy Admin Panel</CardTitle>
          <CardDescription>Manage planets and moons in the solar system</CardDescription>
          <Button onClick={onClose} className="absolute top-4 right-4 btn-space">
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Add Planet Button */}
          <Button 
            onClick={() => setIsAddingPlanet(true)}
            className="btn-space w-full"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add New Planet
          </Button>

          {/* Planet Forms */}
          {(isAddingPlanet || editingPlanet) && (
            <PlanetForm
              planet={editingPlanet}
              onSave={savePlanet}
              onCancel={() => {
                setEditingPlanet(null)
                setIsAddingPlanet(false)
              }}
            />
          )}

          {/* Moon Forms */}
          {(isAddingMoon || editingMoon) && (
            <MoonForm
              moon={editingMoon?.moon}
              planetId={isAddingMoon || editingMoon?.planetId || ''}
              onSave={saveMoon}
              onCancel={() => {
                setEditingMoon(null)
                setIsAddingMoon(null)
              }}
            />
          )}

          {/* Planets List */}
          <div className="grid gap-4">
            {currentPlanets.map((planet) => (
              <div key={planet.id} className="glass-panel p-4 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div
                      className="w-12 h-12 rounded-full mr-4"
                      style={{
                        background: `radial-gradient(circle at 30% 30%, ${planet.color}, #1a1a2e)`,
                        boxShadow: `0 0 20px ${planet.color}40`
                      }}
                    />
                    <div>
                      <h3 className="font-semibold text-lg">{planet.name}</h3>
                      <p className="text-sm text-muted-foreground">{planet.moons.length} moons</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setEditingPlanet(planet)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => deletePlanet(planet.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="ml-16">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setIsAddingMoon(planet.id)}
                    className="mb-3"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Moon
                  </Button>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {planet.moons.map((moon) => (
                      <div key={moon.id} className="flex items-center justify-between p-2 rounded bg-background/20">
                        <div className="flex items-center">
                          <div
                            className="w-6 h-6 rounded-full mr-2"
                            style={{
                              background: `radial-gradient(circle at 30% 30%, ${moon.color}, #1a1a2e)`
                            }}
                          />
                          <span className="text-sm">{moon.name}</span>
                        </div>
                        <div className="flex gap-1">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => setEditingMoon({ moon, planetId: planet.id })}
                          >
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => deleteMoon(moon.id, planet.id)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

function PlanetForm({ planet, onSave, onCancel }: {
  planet: Planet | null
  onSave: (planet: Planet) => void
  onCancel: () => void
}) {
  const [formData, setFormData] = useState<Planet>(
    planet || {
      id: `planet-${Date.now()}`,
      name: '',
      position: [10, 0, 0] as [number, number, number],
      description: '',
      orbitSpeed: 0.1,
      funFact: '',
      color: '#6B93D6',
      size: 0.5,
      orbitRadius: 10,
      moons: []
    }
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <Card className="glass-panel border-primary/30">
      <CardHeader>
        <CardTitle>{planet ? 'Edit Planet' : 'Add New Planet'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="color">Color</Label>
              <Input
                id="color"
                type="color"
                value={formData.color}
                onChange={(e) => setFormData({ ...formData, color: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="size">Size</Label>
              <Input
                id="size"
                type="number"
                step="0.1"
                min="0.1"
                max="2"
                value={formData.size}
                onChange={(e) => setFormData({ ...formData, size: parseFloat(e.target.value) })}
              />
            </div>
            <div>
              <Label htmlFor="orbitRadius">Orbit Radius</Label>
              <Input
                id="orbitRadius"
                type="number"
                step="0.5"
                min="1"
                max="30"
                value={formData.orbitRadius}
                onChange={(e) => setFormData({ ...formData, orbitRadius: parseFloat(e.target.value) })}
              />
            </div>
            <div>
              <Label htmlFor="orbitSpeed">Orbit Speed</Label>
              <Input
                id="orbitSpeed"
                type="number"
                step="0.01"
                min="0.01"
                max="2"
                value={formData.orbitSpeed}
                onChange={(e) => setFormData({ ...formData, orbitSpeed: parseFloat(e.target.value) })}
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
            />
          </div>
          
          <div>
            <Label htmlFor="funFact">Fun Fact</Label>
            <Textarea
              id="funFact"
              value={formData.funFact}
              onChange={(e) => setFormData({ ...formData, funFact: e.target.value })}
              rows={2}
            />
          </div>

          <div className="flex gap-2">
            <Button type="submit" className="btn-space">
              <Save className="h-4 w-4 mr-2" />
              Save Planet
            </Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

function MoonForm({ moon, planetId, onSave, onCancel }: {
  moon: Moon | undefined
  planetId: string
  onSave: (moon: Moon, planetId: string) => void
  onCancel: () => void
}) {
  const [formData, setFormData] = useState<Moon>(
    moon || {
      id: `moon-${Date.now()}`,
      name: '',
      size: 0.1,
      color: '#C0C0C0',
      orbitRadius: 1,
      orbitSpeed: 2,
      description: ''
    }
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData, planetId)
  }

  return (
    <Card className="glass-panel border-accent/30">
      <CardHeader>
        <CardTitle>{moon ? 'Edit Moon' : 'Add New Moon'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="moonName">Name</Label>
              <Input
                id="moonName"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="moonColor">Color</Label>
              <Input
                id="moonColor"
                type="color"
                value={formData.color}
                onChange={(e) => setFormData({ ...formData, color: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="moonSize">Size</Label>
              <Input
                id="moonSize"
                type="number"
                step="0.01"
                min="0.01"
                max="0.5"
                value={formData.size}
                onChange={(e) => setFormData({ ...formData, size: parseFloat(e.target.value) })}
              />
            </div>
            <div>
              <Label htmlFor="moonOrbitRadius">Orbit Radius</Label>
              <Input
                id="moonOrbitRadius"
                type="number"
                step="0.1"
                min="0.5"
                max="5"
                value={formData.orbitRadius}
                onChange={(e) => setFormData({ ...formData, orbitRadius: parseFloat(e.target.value) })}
              />
            </div>
            <div>
              <Label htmlFor="moonOrbitSpeed">Orbit Speed</Label>
              <Input
                id="moonOrbitSpeed"
                type="number"
                step="0.1"
                min="0.5"
                max="10"
                value={formData.orbitSpeed}
                onChange={(e) => setFormData({ ...formData, orbitSpeed: parseFloat(e.target.value) })}
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="moonDescription">Description</Label>
            <Textarea
              id="moonDescription"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={2}
            />
          </div>

          <div className="flex gap-2">
            <Button type="submit" className="btn-space">
              <Save className="h-4 w-4 mr-2" />
              Save Moon
            </Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}