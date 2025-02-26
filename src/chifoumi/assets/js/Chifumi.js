class Chifumi
{

  targetElement = null;

  matchCount = 0;
  matchHistory = [];
  storage;

  historyRenderer = null;

  constructor(targetElement, storage) {

    this.targetElement = targetElement;
    this.storage = storage;
    this.historyRenderer = new MatchHistoryRenderer(this.storage);
  }

  render() {
    this.containerElement = document.createElement('div');
    this.containerElement.classList.add('chifoumi');
    this.targetElement.appendChild(this.containerElement);

    this.matchContainerElement = document.createElement('div');
    this.matchContainerElement.classList.add('match-container');
    this.containerElement.appendChild(this.matchContainerElement);

    this.resultContainerElement = document.createElement('div');
    this.resultContainerElement.classList.add('result-container');
    this.containerElement.appendChild(this.resultContainerElement);
  }

  renderResult() {
    this.resultContainerElement.innerHTML = '';
    const renderer = new MatchResultRenderer();
    renderer.render(this.resultContainerElement, this.match);
    this.renderResultFooter();
  }

  renderResultFooter() {
    this.resultFooter = document.createElement('div');
    this.resultFooter.classList.add('match-result-footer');
    this.resultContainerElement.appendChild(this.resultFooter);


    const replayButtonElement = document.createElement('button');
    replayButtonElement.classList.add('match__result__replay');
    replayButtonElement.innerHTML = _('replay');
    replayButtonElement.addEventListener('click', () => {
      this.launchMatch();
    });
    this.resultFooter.appendChild(replayButtonElement);

    const showHistoryButtonElement = document.createElement('button');
    showHistoryButtonElement.classList.add('match__result__show-history');
    showHistoryButtonElement.innerHTML = _('show-history');
    showHistoryButtonElement.addEventListener('click', () => {
      this.showHistoryPopup();
    });

    this.resultFooter.appendChild(showHistoryButtonElement);
  }

  renderHistoryPopup() {
    let currentClasses= this.historyContainerElement ? this.historyContainerElement.classList : null;
    if(this.historyContainerElement) {
      this.historyContainerElement.remove();
    }

    this.historyContainerElement = document.createElement('div');
    this.historyContainerElement.classList.add('history-container');

    if(currentClasses) {
      this.historyContainerElement.classList.add(...currentClasses);
    }

    const titleElement = document.createElement('h2');
    titleElement.innerHTML = _('history-title');
    this.historyContainerElement.appendChild(titleElement);

    this.historyContentElement = document.createElement('div');
    this.historyContentElement.classList.add('match-history-container__content');
    this.historyContainerElement.appendChild(this.historyContentElement);

    // close button
    const closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('match-history-container__close');
    closeButtonElement.innerHTML = 'X';
    closeButtonElement.addEventListener('click', () => {
      this.closeHistoryPopup();
    });
    this.historyContainerElement.appendChild(closeButtonElement);

    // clear history button
    const deleteHistoryButtonElement = document.createElement('button');
    deleteHistoryButtonElement.classList.add('match-history-container__delete-history');
    deleteHistoryButtonElement.innerHTML = _('delete-history');
    deleteHistoryButtonElement.addEventListener('click', () => {
      this.storage.clear();
      this.renderHistory();
    });
    this.historyContainerElement.appendChild(deleteHistoryButtonElement);
    this.containerElement.appendChild(this.historyContainerElement);
  }

  renderHistory() {
    const history = this.storage.getMatchHistory();
    this.historyRenderer.render(
      this.historyContentElement,
      history
    );
  }

  refresh() {
    console.log('%cChifumi.js :: 107 =============================', 'color: #f00; font-size: 1rem');
    console.log("refresh");
    this.renderResult();
    this.renderHistoryPopup();
    this.renderHistory();

    const matchRenderer = new MatchRenderer(this.match);
    matchRenderer.renderMatch(this.matchContainerElement);
  }


  showHistoryPopup() {
    this.renderHistoryPopup();
    this.renderHistory();
    this.historyContainerElement.classList.add('match-history-container--visible');
  }


  closeHistoryPopup() {
    if(this.historyContainerElement) {
      this.historyContainerElement.classList.remove('match-history-container--visible');
    }
  }

  hideResult() {
    this.matchContainerElement.classList.add('match-container--hidden');
  }

  finishMatch() {
    this.match.computeResult();
    this.saveMatch(this.match);
    this.renderResult();

    this.matchContainerElement.classList.add('match-container--hidden');
    this.resultContainerElement.classList.add('result-container--visible');
  }

  saveMatch(match) {
    this.storage.addMatch(match);
  }

  launchMatch() {
    this.closeHistoryPopup();

    this.match = new Match(this);

    this.resultContainerElement.classList.remove('result-container--visible');

    setTimeout(() => {
      this.matchContainerElement.innerHTML = '';
      const matchRenderer = new MatchRenderer(this.match);
      matchRenderer.renderMatch(this.matchContainerElement);
      this.matchContainerElement.classList.remove('match-container--hidden');
    }, 200);


    return this.match;
  }
}
