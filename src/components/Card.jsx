import React from 'react';
import PropTypes from 'prop-types';
import styles from './Card.module.css';

class Card extends React.Component {
  render() {
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
    } = this.props;
    return (
      <div className={ styles.card }>
        <div>Card</div>
        <p data-testid="name-card">{ cardName }</p>
        <img
          src={ cardImage }
          alt={ cardName }
          data-testid="image-card"
        />
        <p
          data-testid="description-card"
        >
          { cardDescription }
        </p>
        <p data-testid="attr1-card">
          { cardAttr1 }
          {' '}
          anos
        </p>
        <p data-testid="attr2-card">
          { cardAttr2 }
          {' '}
          ton
        </p>
        <p data-testid="attr3-card">
          { cardAttr3 }
          {' '}
          metros
        </p>
        <p data-testid="rare-card">{ cardRare }</p>
        { cardTrunfo && (<p data-testid="trunfo-card">Super Trunfo</p>)}
      </div>
    );
  }
}

Card.propTypes = {
  cardName: PropTypes.string,
  cardDescription: PropTypes.string,
  cardAttr1: PropTypes.string,
  cardAttr2: PropTypes.string,
  cardAttr3: PropTypes.string,
  cardImage: PropTypes.string,
  cardRare: PropTypes.string,
  cardTrunfo: PropTypes.bool,
}.isRequired;

export default Card;
