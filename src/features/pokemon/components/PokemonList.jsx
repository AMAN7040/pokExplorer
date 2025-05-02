import { useQuery } from "@tanstack/react-query";
import { usePagination } from "../context/PaginationContext";
import { usePokemon } from "../hooks/usePokemonList";
import { getPokemonDetails } from "../services/pokemonDetails";
import PokemonCardWithDetails from "./PokemonCardWithDetails";
import Skeleton from "../../../components/Skeleton";
import PaginationControls from "./PaginationControls";

export const PokemonList = () => {
  const { data: pokemonList, isLoading, isError } = usePokemon();
  const { currentPage, itemsPerPage } = usePagination();

  const startIdx = (currentPage - 1) * itemsPerPage;
  const paginated = pokemonList?.slice(startIdx, startIdx + itemsPerPage) || [];

  const { data: detailedData, isLoading: isDetailLoading } = useQuery({
    queryKey: ["visible-pokemon-details", paginated],
    queryFn: () => Promise.all(paginated.map((p) => getPokemonDetails(p.url))),
    enabled: paginated.length > 0,
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading || isDetailLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
        {Array.from({ length: itemsPerPage }).map((_, idx) => (
          <Skeleton key={idx} />
        ))}
      </div>
    );
  }

  if (isError) {
    return <div className="text-red-600 p-4">Failed to load Pokémon list.</div>;
  }

  return (
    <>
      <section
        aria-label="Pokémon Grid"
        className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 content-visibility-auto"
      >
        {detailedData?.map((pokemon) => (
          <PokemonCardWithDetails
            key={pokemon}
            name={pokemon?.name}
            pokemon={pokemon}
          />
        ))}
      </section>
      <PaginationControls />
    </>
  );
};
