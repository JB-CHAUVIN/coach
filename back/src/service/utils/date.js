function convertirTempsEnSecondes(minutes, secondes) {
  return minutes * 60 + secondes;
}

function calculerAllureMoyenne(temps, distances) {
  // Convertir chaque temps en secondes et calculer le temps total
  let tempsTotalSecondes = temps.reduce((a, b) => a + b, 0);

  // Calculer la distance totale en kilomètres
  let distanceTotaleKm = distances.reduce((a, b) => a + b, 0) / 1000;

  // Calculer l'allure moyenne (secondes par km)
  let allureMoyenneSecondes = tempsTotalSecondes / distanceTotaleKm;

  // Convertir l'allure moyenne en minutes et secondes
  let minutes = Math.floor(allureMoyenneSecondes / 60);
  let secondes = Math.round(allureMoyenneSecondes % 60);

  return `moyenne ≈ @${minutes}:${secondes}/km`;
}

module.exports = {
  convertirTempsEnSecondes,
  calculerAllureMoyenne
}
