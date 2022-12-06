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
    filterCardName: '',
    filterRareCards: 'todas',
    filterSuperTrunfo: false,
    isFilterBtnSuperTrunfoDisabled: false,
  };

  valida = () => {
    const { cardName,
      cardDescription,
      cardImage,
      cardRare,
      cardAttr1,
      cardAttr2,
      cardAttr3,
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
    if (cardTrunfo) {
      this.setState({
        hasTrunfo: true,
      });
    }
    this.setState((prevCard) => ({
      savedCards: [...prevCard.savedCards, newCard],
      cardName: '',
      cardDescription: '',
      cardAttr1: '0',
      cardAttr2: '0',
      cardAttr3: '0',
      cardImage: '',
      cardRare: 'normal',
      cardTrunfo: false,
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

  handleFilterCard = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    }, () => this.desabilitaSelect());
  };

  desabilitaSelect = () => {
    const { filterSuperTrunfo } = this.state;
    if (filterSuperTrunfo) {
      this.setState({
        isFilterBtnSuperTrunfoDisabled: true,
      });
    } else {
      this.setState({
        isFilterBtnSuperTrunfoDisabled: false,
      });
    }
  };

  render() {
    const {
      savedCards,
      filterCardName,
      filterRareCards,
      filterSuperTrunfo,
      isFilterBtnSuperTrunfoDisabled,
    } = this.state;

    return (
      <div>
        <h1>Tryunfo</h1>
        <Form
          { ...this.state }
          onInputChange={ this.onInputChange }
          onSaveButtonClick={ this.onSaveButtonClick }
        />
        <Card { ...this.state } />
        <div>
          <label htmlFor="filterCardName">
            Pesquisa por cardName
            <input
              data-testid="name-filter"
              id="filterCardName"
              type="text"
              name="filterCardName"
              value={ filterCardName }
              onChange={ this.handleFilterCard }
              disabled={ isFilterBtnSuperTrunfoDisabled }
            />
          </label>
          <label htmlFor="filterRareCards">
            <select
              id="filterRareCards"
              name="filterRareCards"
              data-testid="rare-filter"
              value={ filterRareCards }
              onChange={ this.handleFilterCard }
              disabled={ isFilterBtnSuperTrunfoDisabled }
            >
              <option key="allCards">todas</option>
              <option key="nomalCards">normal</option>
              <option key="rareCards">raro</option>
              <option key="veryRareCards">muito raro</option>
            </select>
          </label>
          <label htmlFor="filterSuperTrunfo">
            Super Trunfo
            <input
              id="filterSuperTrunfo"
              type="checkbox"
              data-testid="trunfo-filter"
              name="filterSuperTrunfo"
              checked={ filterSuperTrunfo }
              onChange={ this.handleFilterCard }
            />
          </label>
        </div>
        { savedCards.filter((savedCard) => (
          savedCard.cardName.includes(filterCardName)
          && (filterRareCards !== 'todas' ? (savedCard
            .cardRare === filterRareCards) : (savedCard.cardRare))
              && (filterSuperTrunfo ? (savedCard
                .cardTrunfo) : ({}))
        )).map((card2) => (
          <>
            <Card key={ card2.cardName } { ...card2 } />
            <button
              type="button"
              data-testid="delete-button"
              onClick={ this.deleteCardBtn }
            >
              Excluir
            </button>
          </>
        )) }
      </div>
    );
  }
}

export default App;
