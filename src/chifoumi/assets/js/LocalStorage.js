class LocalStorage
{
  addMatch(match) {

    const matchRecord = new MatchRecord();
    matchRecord.setUserChoice(match.getUserChoice());
    matchRecord.setComputerChoice(match.getComputerChoice());
    matchRecord.setResult(match.getResult());

    const json = localStorage.getItem('matchHistory');

    let history = [];
    if(json) {
      history = JSON.parse(json);
    }

    history.push(matchRecord);

    localStorage.setItem(
      'matchHistory',
      JSON.stringify(history)
    );
  }

  async clear() {
    localStorage.removeItem('matchHistory');
  }


  getMatchHistory() {
    const json = localStorage.getItem('matchHistory');

    let rawHistory = [];
    let history = [];
    if(json) {
      rawHistory = JSON.parse(json);
      rawHistory.forEach((rawObject) => {
        const matchRecord = new MatchRecord(rawObject.date);
        matchRecord.setUserChoice(rawObject.playerChoice);
        matchRecord.setComputerChoice(rawObject.computerChoice);
        matchRecord.setResult(rawObject.result);
        history.push(matchRecord);
      });
    }
    return history;
  }
}
