import axios from "axios";

export default async function getServers(animeId, episodeId) {
  try {
    const api_url = import.meta.env.VITE_API_URL;
    
    // Validamos que la URL de la API exista para evitar errores de undefined
    if (!api_url) throw new Error("VITE_API_URL no está configurada");

    const response = await axios.get(
      `${api_url}/servers/${animeId}?ep=${episodeId}`
    );

    // Retornamos los resultados o un array vacío si no hay nada
    return response.data.results || [];
  } catch (error) {
    console.error("Error en getServers:", error.message);
    // IMPORTANTE: Retornar [] evita que el .map() de tu componente falle
    return []; 
  }
}
