import { useQuery } from "@tanstack/react-query";
import { getPokemonDetails } from "../services/pokemonDetails";

export const useDetails = (url) => {
  return useQuery({
    queryKey: ["Pokemon_Details", url],
    queryFn: () => getPokemonDetails(url),
    enabled: !!url,
  });
};
