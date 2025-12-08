document.getElementById("languageSelect").value = detectCurrentLang();


// Lang Switcher START
document.getElementById("languageSelect").addEventListener("change", function () {
  switchLanguage(this.value);
});
// Lang Switcher END