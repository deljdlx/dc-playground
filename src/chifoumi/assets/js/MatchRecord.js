
class MatchRecord
{
  playerChoice = null;
  computerChoice = null;
  result = null;
  date = null;

  constructor() {
    this.date = new Date();
  }

  getDate() {
    return this.date.toLocaleString();
  }

  setUserChoice(userChoice) {
    this.playerChoice = userChoice;
  }

  setResult(result) {
    this.result = result;
  }

  getResult() {
    return this.result;
  }

  getUserChoice() {
    return this.playerChoice;
  }

  setComputerChoice(computerChoice) {
    this.computerChoice = computerChoice;
  }

  getComputerChoice() {
    return this.computerChoice;
  }
}

