import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css' // Aquí puedes meter tus estilos personalizados después

function App() {
  // Estados para controlar la foto, la carga y posibles errores
  const [dogUrl, setDogUrl] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Función para conectar con la API usando Axios
  const fetchDog = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await axios.get('https://dog.ceo/api/breeds/image/random')
      setDogUrl(response.data.message)
    } catch (err) {
      console.error("Error al traer el perrito", err)
      setError("No se pudo cargar el perrito ")
    } finally {
      setLoading(false)
    }
  }

  // useEffect para que cargue un perro automáticamente la primera vez que entras
  useEffect(() => {
    fetchDog()
  }, [])

  return (
    <div style={{ textAlign: 'center', fontFamily: 'sans-serif', marginTop: '50px' }}>
      <h1>Mini SPA de Perritos con React</h1>
      
      <div style={{ 
        width: '350px', 
        height: '350px', 
        margin: '20px auto', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        border: '1px solid #ccc',
        borderRadius: '10px',
        overflow: 'hidden',
        backgroundColor: '#f9f9f9'
      }}>
        {loading ? (
          <p>Cargando perrito...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <img 
            src={dogUrl} 
            alt="Perro aleatorio" 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
          />
        )}
      </div>

      <button 
        onClick={fetchDog} 
        disabled={loading}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          cursor: 'pointer',
          backgroundColor: '#61dafb',
          border: 'none',
          borderRadius: '5px',
          fontWeight: 'bold'
        }}
      >
        {loading ? 'Buscando...' : '¡Otro perrito!'}
      </button>
    </div>
  )
}

export default App