
class MatchRenderer
{

  containerElement = null;
  buttonElements = [];
  match;

  constructor(match) {
    this.match = match;
  }

  destroyDom() {
    this.containerElement.remove();
  }

  renderMatch(targetElement) {
    targetElement.innerHTML = '';
    this.containerElement = document.createElement('div');
    this.containerElement.classList.add('match');
    targetElement.appendChild(this.containerElement);

    const titleElement = document.createElement('h2');
    titleElement.classList.add('match__title');
    titleElement.innerHTML = _('match-title');
    this.containerElement.appendChild(titleElement);

    this.choiceContainerElement = document.createElement('div');
    this.choiceContainerElement.classList.add('match__choice-container');
    this.containerElement.appendChild(this.choiceContainerElement);

    for(let i = 0; i < 3; i++) {
      const buttonElement = document.createElement('button');
      buttonElement.classList.add('match__choice');
      buttonElement.classList.add('choice');
      buttonElement.classList.add('choice--' + i);
      buttonElement.addEventListener('click', (event) => {
        this.select(event, i);
      });

      this.buttonElements.push(buttonElement);
      if(Math.random() > 0.5) {
        this.choiceContainerElement.appendChild(buttonElement);
      }
      else {
        this.choiceContainerElement.prepend(buttonElement);
      }
    }
  }

  select(event, choice) {
    if(this.match.getUserChoice() !== null) {
      return false;
    }

    this.choiceContainerElement.classList.add('match__choice-container--disabled');
    this.buttonElements.forEach((buttonElement) => {
      buttonElement.classList.add('match__choice--disabled');
    });

    event.target.classList.add('match__choice--selected');
    event.target.classList.remove('match__choice--disabled');


    this.match.setUserChoice(choice);
    this.match.generateComputerChoice();
    this.match.finish();
  }
}
