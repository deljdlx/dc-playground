console.log('%capplication.js :: 1 =============================', 'color: #f00; font-size: 1rem');
console.log("Js loaded");


// translation function
function _(key) {
  return ChifoumiLang[key];
}

document.addEventListener('DOMContentLoaded', function () {

  document.querySelectorAll('.theme-selector').forEach((themeSelector) => {
    themeSelector.addEventListener('click', (event) => {
      const theme = event.target.value;
      const themeStyleElement = document.querySelector('#theme');
      themeStyleElement.href = 'assets/themes/' + theme + '/style.css';
    });
  });



  const container = document.querySelector('.game');
  const chifumi = new Chifumi(
    container,
    // new FileStorage()
    new LocalStorage()
  );
  chifumi.render();
  chifumi.launchMatch();

  document.querySelectorAll('.lang-selector').forEach((langSelector) => {
    langSelector.addEventListener('click', (event) => {
      const lang = event.target.value;
      const script = document.querySelector('#language');
      script.remove();
      const scriptElement = document.createElement('script');
      scriptElement.id = 'language';
      scriptElement.src = 'assets/js/langs/' + lang + '.js';

      document.body.appendChild(scriptElement);
      scriptElement.addEventListener('load', () => {
        chifumi.refresh();
      });
    });
  });
});
