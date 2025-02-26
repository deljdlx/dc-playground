class MatchResultRenderer
{

  render(targetElement, match) {
    const result = match.getResult();
    const resultElement = document.createElement('div');
    resultElement.classList.add('match__result');
    resultElement.classList.add('match__result--' + result);
    targetElement.appendChild(resultElement);

    const resultTextElement = document.createElement('div');
    resultTextElement.classList.add('match__result__text');

    if(result === -1 ){
      resultTextElement.innerHTML = _('lost');
    }
    else if(result === 0 ) {
      resultTextElement.innerHTML = _('draw');
    }
    else if(result === 1 ) {
      resultTextElement.innerHTML = _('win');
    }

    resultElement.appendChild(resultTextElement);

    const userChoiceElementContainer = document.createElement('div');
    userChoiceElementContainer.classList.add('match__result__choice-container');
    resultElement.appendChild(userChoiceElementContainer);

    const userChoiceElement = document.createElement('div');
    userChoiceElementContainer.appendChild(userChoiceElement);
    userChoiceElement.classList.add('match__result__choice');
    userChoiceElement.classList.add('choice');
    userChoiceElement.classList.add('choice--' + match.userChoice);

    const userChoiceTextElement = document.createElement('div');
    userChoiceElement.appendChild(userChoiceTextElement);
    userChoiceTextElement.classList.add('match__result__choice-text');
    userChoiceTextElement.innerHTML = _('player-choice');



    const computerChoiceElement = document.createElement('div');
    userChoiceElementContainer.appendChild(computerChoiceElement);
    computerChoiceElement.classList.add('match__result__choice');
    computerChoiceElement.classList.add('choice');
    computerChoiceElement.classList.add('choice--' + match.computerChoice);

    const computerChoiceTextElement = document.createElement('div');
    computerChoiceElement.appendChild(computerChoiceTextElement);
    computerChoiceTextElement.classList.add('match__result__choice-text');
    computerChoiceTextElement.innerHTML = _('computer-choice');


  }
}
