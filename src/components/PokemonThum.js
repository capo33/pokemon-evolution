import React from "react";

function PokemonThum({ id, name, image, type, index }) {
  const style = `thumb-container ${type}`;
  return (
    <div className={style} key={index}>
      <div className="number">
        <small>#0{id}</small>
      </div>
      <img src={image} alt={name} />
      <div className="detail-wrapper">
        <h3>{name}</h3>
        <small>Type: {type}</small>
      </div>
    </div>
  );
}

export default PokemonThum;
