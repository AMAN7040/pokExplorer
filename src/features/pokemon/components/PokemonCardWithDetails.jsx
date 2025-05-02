import PokemonCard from "./PokemonCard";

const PokemonCardWithDetails = ({ pokemon }) => {
  return (
    <PokemonCard
      id={pokemon?.id}
      name={pokemon?.name}
      image={pokemon?.image}
      type={pokemon?.type}
    />
  );
};

export default PokemonCardWithDetails;
