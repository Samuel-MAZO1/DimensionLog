// Union types literales: solo estos valores exactos son válidos.
// TypeScript te avisará en tiempo de compilación si usas 'Vivo' en lugar de 'Alive'.
export type CharacterStatus = 'Alive' | 'Dead' | 'unknown';
export type CharacterGender = 'Female' | 'Male' | 'Genderless' | 'unknown';

// Interfaz completa del personaje, espejando exactamente la respuesta de la API.
export interface Character {
  id: number;
  name: string;
  status: CharacterStatus;
  species: string;
  type: string;          // Subtipo/variante del personaje (puede estar vacío "")
  gender: CharacterGender;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;         // URL de la imagen del personaje
  episode: string[];     // Array de URLs de los episodios donde aparece
  url: string;
  created: string;       // Fecha ISO 8601
}

// Filtros que el usuario puede aplicar en la lista.
// 'all' en status significa "sin filtro" — la API devuelve todos.
export interface CharacterFilters {
  name: string;
  status: CharacterStatus | 'all';
  species: string;
  page: number;
}