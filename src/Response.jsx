import PropTypes from "prop-types";

const Response = ({ pokemon }) => {
  return (
    <div>
      <h2>{pokemon.name}</h2>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
    </div>
  );
};

Response.propTypes = {
  pokemon: PropTypes.shape({
    name: PropTypes.string.isRequired,
    sprites: PropTypes.shape({
      front_default: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Response;
