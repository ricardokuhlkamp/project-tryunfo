import React from 'react';

class Form extends React.Component {
  render() {
    return (
      <form>
        <label htmlFor="nome">
          Nome
          <input
            type="text"
            data-testid="name-input"
            id="nome"
            name="nome"
          />
        </label>
        <label htmlFor="descriptionCard">
          Descrição
          <textarea
            data-testid="description-input"
            id="descriptionCard"
            name="descriptionCard"
          />
        </label>
        <label htmlFor="attr1">
          Atributo-01
          <input
            type="number"
            data-testid="attr1-input"
            id="attr1"
            name="attr1"
          />
        </label>
        <label htmlFor="attr2">
          Atributo-02
          <input
            type="number"
            data-testid="attr2-input"
            id="attr2"
            name="attr2"
          />
        </label>
        <label htmlFor="attr3">
          Atributo-03
          <input
            type="number"
            data-testid="attr3-input"
            id="attr3"
            name="attr3"
          />
        </label>
        <label htmlFor="urlImg">
          URL - imagem
          <input
            type="text"
            data-testid="image-input"
            id="urlImg"
            name="urlImg"
          />
        </label>
        <label htmlFor="rarity">
          Raridade
          <select
            id="rarity"
            data-testid="rare-input"
            name="rarity"
          >
            <option key="normal">normal</option>
            <option key="raro">raro</option>
            <option key="muito-raro">muito raro</option>
          </select>
        </label>
        <label htmlFor="checkbox">
          Nome
          <input
            type="check"
            data-testid="trunfo-input"
            id="check"
            name="check"
          />
        </label>
        <button
          type="submit"
          data-testid="save-button"
          value="save"
        >
          Salvar
        </button>
      </form>
    );
  }
}

export default Form;
