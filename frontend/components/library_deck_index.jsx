const React = require ('react');
const DeckStore = require('../stores/deck_store');
const DeckActions = require('../actions/deck_actions');
const hashHistory = require('react-router').hashHistory;
const Link = require('react-router').Link;

const LibraryDeckIndex = React.createClass({
  getInitialState(){
    return { decks : [] }
  },

  componentDidMount() {
    this.deckListener = DeckStore.addListener(this.handleDeckChange);
    DeckActions.fetchAllDecks();
  },

  componentWillUnmount(){
    this.deckListener.remove();
  },

  componentWillReceiveProps(nextProps){
    this.setState({
      decks: DeckStore.allOfSubject(nextProps.subjectId)
    });
  },

  handleDeckChange(){
    this.setState({
      decks: DeckStore.allOfSubject(this.props.subjectId)
    });
  },

  editDeck(deckId, event){
    hashHistory.push(`decks/${deckId}`);
  },

  createDeck(deckId, event){
    DeckActions.createDeck({
      title: "untitled",
      description: "blank",
      subject_id: this.props.subjectId
    })
  },

  deleteDeck(deckId, event) {
    DeckActions.removeDeck(deckId);
  },

  render(){
    let subjectDecks;
    if (this.state.decks.length > 0) {
      subjectDecks = this.state.decks.map( deck => {
        return (<tr key={deck.id}>
              <td className="table-deck-title">
                {deck.title}
              </td>
              <td className="table-study-link">
                <Link to={`/study/${deck.id}`}>
                 &#9002; Study
                </Link>
              </td>
              <td className="table-study-link">
                <a onClick={this.editDeck.bind(null, deck.id)}>
                  &#9002; Edit
                </a>
              </td>
              <td className="table-study-link">
                <a id="table-delete" onClick={this.deleteDeck.bind(null, deck.id)}>
                  Delete
                </a>
              </td>

          </tr>);
      });
    }

    return(
      <article className="subject-deck-index">
        <table className="subject-deck-table">
          <thead className="subject-deck-table-head">
            <tr>
              <th colSpan="4">
                Decks
                <a onClick={this.createDeck}>Create Deck</a>
              </th>
            </tr>
          </thead>
          <tbody>
            {subjectDecks}
          </tbody>
        </table>
      </article>
    );
  }
});

module.exports = LibraryDeckIndex;
