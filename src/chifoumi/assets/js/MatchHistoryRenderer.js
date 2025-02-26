class MatchHistoryRenderer
{
  render(targetElement, matchHistory) {

    targetElement.innerHTML = '';

    const containerElement = document.createElement('div');
    containerElement.classList.add('match-history-container');

    const tableElement = document.createElement('table');
    tableElement.classList.add('match-history');
    containerElement.appendChild(tableElement);

    const trHeader = document.createElement('tr');
    trHeader.innerHTML = '<th>' + _('history-date') + '</th><th>' + _('history-player') + '</th><th>' + _('history-computer') + '</th><th>' + _('history-result') + '</th>';
    tableElement.appendChild(trHeader);

    matchHistory.forEach((matchRecord) => {
      tableElement.appendChild(
        this.renderRow(matchRecord)
      );
    });

    targetElement.appendChild(containerElement);
  }

  renderRow(matchRecord) {
    const tr = document.createElement('tr');
    tr.classList.add('match-history__row');


    const tdDate = document.createElement('td');
    tdDate.innerHTML = matchRecord.getDate();
    tr.appendChild(tdDate);

    const tdUserChoice = document.createElement('td');
    tdUserChoice.innerHTML = '<span class="match-history__choice choice choice--' + matchRecord.getUserChoice() + '"></span>';
    tr.appendChild(tdUserChoice);

    const tdComputerChoice = document.createElement('td');
    tdComputerChoice.innerHTML = '<span class="match-history__choice choice choice--' + matchRecord.getComputerChoice() + '"></span>';
    tr.appendChild(tdComputerChoice);

    const tdResult = document.createElement('td');
    tdResult.classList.add('match-history__result');
    tdResult.innerHTML = '<span class="match-history__result match-history__result--' + matchRecord.getResult() + '">' + _('history-result-' + matchRecord.getResult()) + '</span>';
    tr.appendChild(tdResult);

    return tr;
  }
}
