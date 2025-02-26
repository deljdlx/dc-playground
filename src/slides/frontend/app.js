class Application
{
  backendURL = '';
  currentSlide = 0;
  slideContainer = null;

  constructor(backendURL, selector) {
    this.backendURL = backendURL
    this.slideContainer = document.querySelector(selector);
  }

  run() {
    if(document.location.toString().match(/presentator/)) {
      document.addEventListener('keyup', (event) => {
        if(event.key === 'ArrowRight') {
          this.currentSlide++;
          this.getContent();
          return;
        }
        if(event.key === 'ArrowLeft') {
          this.currentSlide--;
          this.getContent();
          return;
        }
      });
    }
    this.getCurrentSlide();
    this.getContent();
  }

  getCurrentSlide() {

    const url = this.backendURL + '/get-current-slide.php';
    const evtSource = new EventSource(url, { withCredentials: true } );
    evtSource.addEventListener('message', (event) => {
      const data = JSON.parse(event.data);
      const slideNumber = data.currentSlide;
      if (slideNumber !== this.currentSlide) {
        this.currentSlide = slideNumber;
        this.getContent();
      }
    });
  }

  getContent() {
    const url = this.backendURL + '/get-slide.php' + '?slide=' + this.currentSlide;
    fetch(url)
      .then((response) => response.json())
      .then(data => {
        this.slideContainer.innerHTML = data.content;
      })
  }
}

const application = new Application(
  '../backend',
  '#slide-container'
);

application.run();