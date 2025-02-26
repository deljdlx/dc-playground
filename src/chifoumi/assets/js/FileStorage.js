class FileStorage
{
  addMatch(matchRecord) {
    const json = JSON.stringify(matchRecord);
    // send post fetch query to server
    fetch('save.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: json,
    });
  }


  async getMatchHistory() {
    // fetch query to retrieve data from server
    return fetch('history.json').then((response) => {
      return response.json();
    }).then((rawHistory) => {
      const history = [];
      rawHistory.forEach((rewObject) => {
        const matchRecord = new MatchRecord();
        matchRecord.setUserChoice(rewObject.playerChoice);
        matchRecord.setComputerChoice(rewObject.computerChoice);
        matchRecord.setResult(rewObject.result);
        history.push(matchRecord);
      });
      console.log(history);
      return history;
    });
  }
}
