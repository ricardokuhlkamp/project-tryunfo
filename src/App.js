import React from 'react';
import Card from './components/Card';
import Form from './components/Form';

class App extends React.Component {
  state = {
    cardName: '',
    cardDescription: '',
    cardAttr1: '',
    cardAttr2: '',
    cardAttr3: '',
    cardImage: '',
    cardRare: 'normal',
    cardTrunfo: false,
    hasTrunfo: false,
    isSaveButtonDisabled: true,
    savedCards: [],
  };

  valida = () => {
    const { cardName,
      cardDescription,
      cardImage,
      cardRare,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardTrunfo,
    } = this.state;
    const textValidate = cardName.length > 0
      && cardDescription.length > 0
      && cardImage.length > 0
      && cardRare.length > 0;
    const number = 210;
    const numberValidate = (+cardAttr1 + +cardAttr2 + +cardAttr3) <= number;
    const maxNumber = 90;
    const minNumber = 0;
    const cardAttr1Validate = (+cardAttr1) <= maxNumber
      && (+cardAttr1) >= minNumber;
    const cardAttr2Validate = (+cardAttr2) <= maxNumber
      && (+cardAttr2) >= minNumber;
    const cardAttr3Validate = (+cardAttr3) <= maxNumber
      && (+cardAttr3) >= minNumber;
    this.setState({
      isSaveButtonDisabled: !(textValidate
        && numberValidate
        && cardAttr1Validate
        && cardAttr2Validate
        && cardAttr3Validate),
    });
    const trunfoValidate = cardTrunfo === true;
    this.setState({
      hasTrunfo: trunfoValidate,
    });
  };

  onInputChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    }, this.valida);
  };

  onSaveButtonClick = (event) => {
    event.preventDefault();
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
    } = this.state;
    const newCard = {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
    };
    this.setState((prevCard) => ({
      savedCards: [...prevCard.savedCards, newCard],
      cardName: '',
      cardDescription: '',
      cardAttr1: '0',
      cardAttr2: '0',
      cardAttr3: '0',
      cardImage: '',
      cardRare: 'normal',
    }));
  };

  deleteCardBtn = (index) => {
    const { savedCards } = this.state;
    savedCards.splice(index, 1);
    this.setState({
      savedCards,
      hasTrunfo: false,
    });
  };

  render() {
    const { savedCards } = this.state;

    return (
      <div>
        <h1>Tryunfo</h1>
        <Form
          { ...this.state }
          onInputChange={ this.onInputChange }
          onSaveButtonClick={ this.onSaveButtonClick }
        />
        <Card { ...this.state } />
        { savedCards.map((card) => (
          <>
            <Card key={ card.cardName } { ...card } />
            <button
              type="button"
              data-testid="delete-button"
              onClick={ this.deleteCardBtn }
            >
              Excluir
            </button>
          </>
        ))}
      </div>
    );
  }
}

export default App;
