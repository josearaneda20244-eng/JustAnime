import axios from "axios";

export default async function getStreamInfo(episodeId, serverName) {
  try {
    const api_url = import.meta.env.VITE_API_URL;
    const proxy_url = import.meta.env.VITE_M3U8_PROXY_URL || "";

    const response = await axios.get(
      `${api_url}/watch/${episodeId}?server=${serverName}`
    );

    const data = response.data.results;

    // Si la respuesta es un archivo de video (.m3u8), le aplicamos el proxy
    if (data.sources && data.sources.length > 0) {
      data.sources = data.sources.map(source => {
        if (source.url.includes(".m3u8")) {
          return {
            ...source,
            // Concatenamos el proxy con la URL del video codificada
            url: `${proxy_url}${encodeURIComponent(source.url)}`
          };
        }
        return source;
      });
    }

    return data;
  } catch (error) {
    console.error("Error en getStreamInfo:", error.message);
    return null; // Devolvemos null para que el Player muestre un mensaje de error
  }
}
