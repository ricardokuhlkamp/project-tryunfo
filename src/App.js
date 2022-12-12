import React from 'react';
import Card from './components/Card';
import Form from './components/Form';
import styles from './components/App.module.css';

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
    randomCards: [],
    positionCard: 0,
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
    this.setState({ [name]: value }, this.valida);
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
      this.setState({ hasTrunfo: true });
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

  deleteCardBtn = (name, trunfo) => {
    const { savedCards } = this.state;
    const novoArray = savedCards.filter((card) => card.cardName !== name);
    if (trunfo) {
      this.setState({ savedCards: novoArray, hasTrunfo: false });
    } else {
      this.setState({ savedCards: novoArray });
    }
  };

  handleFilterCard = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({ [name]: value }, () => this.desabilitaSelect());
  };

  desabilitaSelect = () => {
    const { filterSuperTrunfo } = this.state;
    if (filterSuperTrunfo) {
      this.setState({ isFilterBtnSuperTrunfoDisabled: true });
    } else {
      this.setState({ isFilterBtnSuperTrunfoDisabled: false });
    }
  };

  randomCardsFunc = () => {
    const n = 0.5;
    const { savedCards } = this.state;
    const arrayCopy = [...savedCards];
    this.setState({ randomCards: arrayCopy.sort(() => Math.random() - n) });
  };

  nextCard = () => {
    this.setState((prevState) => ({ positionCard: prevState.positionCard + 1 }));
  };

  inicioIndex = () => {
    const n = 0.5;
    this.setState((prevState) => ({ positionCard: 0,
      randomCards: prevState.randomCards.sort(() => Math.random() - n),
    }));
  };

  render() {
    const {
      savedCards,
      filterCardName,
      filterRareCards,
      filterSuperTrunfo,
      isFilterBtnSuperTrunfoDisabled,
      randomCards,
      positionCard,
    } = this.state;

    return (
      <div>
        <h1>Tryunfo</h1>
        <h2>Crie suas cartas e vamos jogar!</h2>
        <div className={ styles.containerCreateAndPre }>
          <Form
            { ...this.state }
            onInputChange={ this.onInputChange }
            onSaveButtonClick={ this.onSaveButtonClick }
          />
          <Card { ...this.state } />
        </div>
        <div className={ styles.containerSearch }>
          <label htmlFor="filterCardName" className={ styles.labelStyles }>
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
          <label htmlFor="filterRareCards" className={ styles.labelStyles }>
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
          <label htmlFor="filterSuperTrunfo" className={ styles.labelStyles }>
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
        <div className={ styles.containerCards }>
          { savedCards.filter((savedCard) => (
            savedCard.cardName.includes(filterCardName)
            && (filterRareCards !== 'todas' ? (savedCard
              .cardRare === filterRareCards) : (savedCard.cardRare))
            && (filterSuperTrunfo ? (savedCard
              .cardTrunfo) : ({}))
          )).map((card) => (
            <div key={ card.cardName }>
              <Card { ...card } />
              <button
                type="button"
                data-testid="delete-button"
                onClick={ () => this.deleteCardBtn(card.cardName, card.cardTrunfo) }
              >
                Excluir
              </button>
            </div>
          )) }
        </div>
        <div className={ styles.containerCardPlay }>
          { randomCards && randomCards
            .filter((_card, indice) => (indice === positionCard))
            .map((card) => (
              <div key={ card.name }>
                <Card { ...card } />
              </div>
            )) }
        </div>
        <div className={ styles.playBtns }>
          <button type="button" onClick={ this.randomCardsFunc }>Jogar</button>
          { positionCard > randomCards.length - 1 ? (
            <button type="button" onClick={ this.inicioIndex }>Embaralhar cartas</button>)
            : (<button type="button" onClick={ this.nextCard }>Próxima carta</button>
            ) }
        </div>
      </div>
    );
  }
}

export default App;
