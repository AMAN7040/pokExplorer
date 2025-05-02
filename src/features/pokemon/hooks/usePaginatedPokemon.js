import { useMemo } from "react";
import { useQueries } from "@tanstack/react-query";
import { usePokemon } from "./usePokemonList";
import { usePagination } from "../context/PaginationContext";
import { getPokemonDetails } from "../services/pokemonDetails";

export const usePaginatedPokemon = () => {

    
  const { data: allPokemons = [], isLoading: listLoading } = usePokemon();
  const { currentPage, itemsPerPage } = usePagination();

  const start = useMemo(
    () => (currentPage - 1) * itemsPerPage,
    [currentPage, itemsPerPage]
  );
  const currentItems = useMemo(
    () => allPokemons.slice(start, start + itemsPerPage),
    [allPokemons, start, itemsPerPage]
  );

  const queries = useQueries({
    queries: currentItems.map((pokemon) => ({
      queryKey: ["Pokemon_Details", pokemon.url],
      queryFn: () => getPokemonDetails(pokemon.url),
      enabled: !!pokemon.url,
      staleTime: 5 * 60 * 1000,
    })),
  });

  const isDetailLoading = queries.some((q) => q.isLoading);
  const details = queries.map((q) => q.data).filter(Boolean);

  return {
    details,
    isLoading: listLoading || isDetailLoading,
  };
};
