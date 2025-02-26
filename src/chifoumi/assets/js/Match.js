

class Match
{
  application = null;
  userChoice = null;
  computerChoice = null;
  result = null;

  constructor(application) {
    this.application = application;
  }

  finish() {
    this.application.finishMatch();
  }

  relaunch() {
    this.application.launchMatch();
  }

  setUserChoice(userChoice) {
    this.userChoice = userChoice;
  }

  getUserChoice() {
    return this.userChoice;
  }

  getComputerChoice() {
    return this.computerChoice;
  }

  getResult() {
    return this.result;
  }

  generateComputerChoice() {
    this.computerChoice = Math.floor(Math.random() * 3);
  }

  /**
   * 0 pierre / 1 papier / 2 ciseaux
   * @param {integer} userChoice
   * @param {integer} computerChoice
   *
   * @return {integer}
   */
  computeResult() {
    if(this.userChoice === this.computerChoice) {
      return this.result = 0;
    }

    if(

      this.userChoice === 0 && this.computerChoice === 2
      || this.userChoice === 1 && this.computerChoice === 0
      || this.userChoice === 2 && this.computerChoice === 1
    ) {
      return this.result = 1;
    }

    return this.result = -1;
  }

  getResult() {
    return this.result;
  }
}
