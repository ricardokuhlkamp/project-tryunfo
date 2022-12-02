import React from 'react';
import PropTypes from 'prop-types';

class Form extends React.Component {
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
      hasTrunfo,
      isSaveButtonDisabled,
      onInputChange,
      onSaveButtonClick,
    } = this.props;
    return (
      <form>
        <label htmlFor="cardName">
          Nome
          <input
            type="text"
            data-testid="name-input"
            id="cardName"
            name="cardName"
            value={ cardName }
            onChange={ onInputChange }
          />
        </label>
        <label htmlFor="cardDescription">
          Descrição
          <textarea
            data-testid="description-input"
            id="cardDescription"
            name="cardDescription"
            value={ cardDescription }
            onChange={ onInputChange }
          />
        </label>
        <label htmlFor="cardAttr1">
          Atributo-01
          <input
            type="number"
            data-testid="attr1-input"
            id="cardAttr1"
            name="cardAttr1"
            value={ cardAttr1 }
            onChange={ onInputChange }
          />
        </label>
        <label htmlFor="cardAttr2">
          Atributo-02
          <input
            type="number"
            data-testid="attr2-input"
            id="cardAttr2"
            name="cardAttr2"
            value={ cardAttr2 }
            onChange={ onInputChange }
          />
        </label>
        <label htmlFor="cardAttr3">
          Atributo-03
          <input
            type="number"
            data-testid="attr3-input"
            id="cardAttr3"
            name="cardAttr3"
            value={ cardAttr3 }
            onChange={ onInputChange }
          />
        </label>
        <label htmlFor="cardImage">
          URL - imagem
          <input
            type="text"
            data-testid="image-input"
            id="cardImage"
            name="cardImage"
            value={ cardImage }
            onChange={ onInputChange }
          />
        </label>
        <label htmlFor="cardRare">
          Raridade
          <select
            id="cardRare"
            data-testid="rare-input"
            name="cardRare"
            value={ cardRare }
            onChange={ onInputChange }
          >
            <option key="normal">normal</option>
            <option key="raro">raro</option>
            <option key="muito-raro">muito raro</option>
          </select>
        </label>
        {!hasTrunfo ? (
          <label htmlFor="cardTrunfo">
            Super Trunfo
            <input
              type="checkbox"
              data-testid="trunfo-input"
              id="cardTrunfo"
              name="cardTrunfo"
              checked={ cardTrunfo }
              onChange={ onInputChange }
            />
          </label>)
          : (
            <p>Você já tem um Super Trunfo em seu baralho</p>
          )}
        <button
          type="submit"
          data-testid="save-button"
          disabled={ isSaveButtonDisabled }
          onClick={ onSaveButtonClick }
        >
          Salvar
        </button>
      </form>
    );
  }
}

Form.propTypes = {
  cardName: PropTypes.string,
  cardDescription: PropTypes.string,
  cardAttr1: PropTypes.string,
  cardAttr2: PropTypes.string,
  cardAttr3: PropTypes.string,
  cardImage: PropTypes.string,
  cardRare: PropTypes.string,
  cardTrunfo: PropTypes.bool,
  hasTrunfo: PropTypes.boolean,
  isSaveButtonDisabled: PropTypes.bool,
  onInputChange: PropTypes.func,
  onSaveButtonClick: PropTypes.func,
}.isRequired;

export default Form;
