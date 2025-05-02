export const getPokemonDetails = async (url) => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!response.ok) {
      throw new Error("Failed to fetch Pokémon details");
    }

    const data = await response.json();

    return {
      id: data?.id ?? null,
      name: data?.name ?? "Unknown",
      image: data?.sprites?.front_default ?? "",
      type: Array.isArray(data?.types)
        ? data.types.map((t) => t.type.name)
        : [],
    };
  } catch (error) {
    if (error.name === "AbortError") {
      console.warn("[getPokemonDetails] Timeout occurred");
      throw new Error("Request timeout. Please try again.");
    }

    console.error("[getPokemonDetails] Error:", error);
    throw error;
  }
};
