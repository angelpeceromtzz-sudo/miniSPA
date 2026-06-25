import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  // Estado del tablero, cartas seleccionadas y bloqueo mientras se comparan
  const [cards, setCards] = useState([]);
  const [sel, setSel] = useState([]);
  const [lock, setLock] = useState(false);

  // Obtiene 8 fotos de perros y crea 16 cartas (8 pares)
  const fetchCards = async () => {
    const res = await Promise.all(
      Array.from({ length: 8 }, () =>
        axios.get("https://dog.ceo/api/breeds/image/random"),
      ),
    );
    const imgs = res.map((r) => r.data.message);
    // Cada imagen aparece 2 veces (un par)
    const deck = imgs.flatMap((url, i) => [
      { pair: i, url, open: false, done: false },
      { pair: i, url, open: false, done: false },
    ]);
    // Barajar (Fisher-Yates)
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    setCards(deck);
    setSel([]);
    setLock(false);
  };

  // Cargar al iniciar
  useEffect(() => {
    fetchCards();
  }, []);

  // Maneja el clic en una carta
  const click = (i) => {
    const c = cards[i];
    // Ignorar si está bloqueada, ya abierta, ya resuelta, o ya hay 2 seleccionadas
    if (lock || c.open || c.done || sel.length >= 2) return;
    // Revelar la carta
    setCards(
      cards.map((card, idx) => (idx === i ? { ...card, open: true } : card)),
    );
    const s = [...sel, i];
    setSel(s);
    // Si hay 2 cartas seleccionadas, comparar
    if (s.length === 2) {
      setLock(true);
      const [a, b] = s;
      setTimeout(() => {
        setCards((prev) =>
          prev.map((card, idx) =>
            idx === a || idx === b
              ? {
                  ...card,
                  done: prev[a].pair === prev[b].pair,
                  open: prev[a].pair === prev[b].pair,
                }
              : card,
          ),
        );
        setSel([]);
        setLock(false);
      }, 700);
    }
  };

  // true cuando todos los pares están resueltos
  const won = cards.length && cards.every((c) => c.done);

  return (
    <div className="text-center font-sans mt-6">
      <h1 className="text-2xl font-bold text-white mb-4">
        Memorama de Perritos
      </h1>
      {won && <p className="text-green-400 mb-3">¡Ganaste!</p>}
      {/* Tablero 4x4 */}
      <div className="grid grid-cols-4 gap-1 max-w-[400px] mx-auto mb-4">
        {cards.map((c, i) => (
          <div
            key={i}
            onClick={() => click(i)}
            className={`aspect-square rounded border cursor-pointer flex items-center justify-center text-2xl overflow-hidden
              ${c.done ? "border-green-500" : c.open ? "border-cyan-400" : "border-gray-600 bg-gray-800 hover:bg-gray-700"}`}
          >
            {c.open || c.done ? (
              <img src={c.url} alt="" className="w-full h-full object-cover" />
            ) : (
              "?"
            )}
          </div>
        ))}
      </div>
      <button
        onClick={fetchCards}
        className="px-5 py-2 rounded bg-cyan-500 text-white hover:bg-cyan-400 cursor-pointer"
      >
        Nuevo juego
      </button>
    </div>
  );
}

export default App;
