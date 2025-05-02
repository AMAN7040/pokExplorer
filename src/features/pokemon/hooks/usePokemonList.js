import { useQuery } from "@tanstack/react-query";
import { getPokemons } from "../services/pokemonListService";

export const usePokemon = () => {
  return useQuery({
    queryKey: ["pokemons"],
    queryFn: getPokemons,
  });
};
