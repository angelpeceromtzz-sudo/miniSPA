import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  const [dogUrl, setDogUrl] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [fetchId, setFetchId] = useState(0)

  useEffect(() => {
    let ignore = false

    ;(async () => {
      try {
        const response = await axios.get('https://dog.ceo/api/breeds/image/random')
        if (!ignore) setDogUrl(response.data.message)
      } catch {
        if (!ignore) setError("No se pudo cargar el perrito ")
      } finally {
        if (!ignore) setLoading(false)
      }
    })()

    return () => { ignore = true }
  }, [fetchId])

  const fetchDog = () => {
    setFetchId(id => id + 1)
    setLoading(true)
    setError(null)
  }

  return (
    <div className="text-center font-sans mt-12">
      <h1 className="text-4xl font-bold text-white mb-8">
        Mini SPA de Perritos con React
      </h1>

      <div className="w-[350px] h-[350px] mx-auto mb-6 flex items-center justify-center border border-gray-600 rounded-xl overflow-hidden bg-gray-800">
        {loading ? (
          <p className="text-gray-400">Cargando perrito...</p>
        ) : error ? (
          <p className="text-red-400">{error}</p>
        ) : (
          <img
            src={dogUrl}
            alt="Perro aleatorio"
            className="w-full h-full object-cover"
          />
        )}
      </div>

      <button
        onClick={fetchDog}
        disabled={loading}
        className="px-6 py-3 text-base font-semibold rounded-lg cursor-pointer bg-cyan-500 text-white hover:bg-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {loading ? 'Buscando...' : '¡Otro perrito!'}
      </button>
    </div>
  )
}

export default App
