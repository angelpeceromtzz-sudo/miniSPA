import { useState, useEffect } from 'react'
import axios from 'axios' // Importa la librería axios para hacer solicitudes HTTP

const API_URL = 'https://dog.ceo/api/breeds/image/random'

  // Componente principal de la aplicación
function App() {
  const [urls, setUrls] = useState([])
  const [loading, setLoading] = useState(true)

  // Función para obtener tres imágenes de perros aleatorias
  const fetchAll = () => {
    setLoading(true)
    Promise.all([
      axios.get(API_URL),
      axios.get(API_URL),
      axios.get(API_URL),
    ]).then(responses => {
      setUrls(responses.map(r => r.data.message))
      setLoading(false)
    })
  }

  // Llamada a fetchAll cuando el componente se monta
  useEffect(() => { fetchAll() }, [])

  // Renderizado del componente
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4">
      <div className="rounded-2xl p-6 max-w-lg w-full">
        <h1 className="text-2xl font-bold text-center text-yellow-400 mb-6">DOG SLOTS</h1>

        <div className="flex justify-center gap-4 mb-8">
          {[0, 1, 2].map(i => (
            <div key={i} className="w-35 h-35 rounded-lg flex items-center justify-center overflow-hidden">
              {loading ? (
                <span className="animate-bounce text-4xl">🐕</span>
              ) : (
                <img src={urls[i]} alt="perro" className="w-full h-full object-cover" />
              )}
            </div>
          ))}
        </div>
          
        <button onClick={fetchAll} disabled={loading} // Botón para obtener nuevas imágenes de perros
          className={`w-full px-4 py-3 font-bold rounded-lg ${
            loading ? 'text-gray-400' : 'bg-red-600 text-white hover:bg-red-500'
          }`}>
          {loading ? 'Cargando...' : 'Nuevos perros'}
        </button>
      </div>
    </div>
  )
}

export default App
