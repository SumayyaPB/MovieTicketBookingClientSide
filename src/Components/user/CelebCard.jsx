// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';
import './CelebCard.css';

const CelebCard = ({ imageUrl, name, role }) => {
  return (
    <div className='celebcard'>
      <img src={imageUrl} alt={name} width={200} height={200} />
      <h3>{name}</h3>
      <h4>{role}</h4>
    </div>
  );
};

CelebCard.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
};

export default CelebCard;
