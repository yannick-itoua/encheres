//auctioneer
const socket = io();
const statusLabel = document.getElementById("gameInfo");
const price = document.getElementById("startingprice");
const desc = document.getElementById("description");
const finalprice = document.getElementById("actualprice");
let lastBidderId = null;
let finalValue = null;
const BTstart = document.getElementById("start");
const BTbid = document.getElementById("terminer");

// Fonction pour désactiver les boutons de jeu
const disableButtons = () => {
BTstart.disabled = true;
BTbid.disabled = true;
}

// Fonction pour activer les boutons de jeu
const enableButtons = () => {
BTstart.disabled = false;
BTbid.disabled = false;
}

const refreshStatus = (value) => {
if(value == 'waiting') {
statusLabel.innerHTML = "En attente des encherisseurs...";
disableButtons();
}
else if(value == 'playing') {
statusLabel.innerHTML = "Veuillez debuter l'enchere";
enableButtons();
}
}

BTstart.addEventListener("click", () => {
  let priceValue = price.value; 
  let descValue = desc.value;
socket.emit('start',priceValue,descValue);
statusLabel.innerHTML = "Enchere en cours";
BTstart.disabled = true;
});

socket.on('maj', (totalPrice,value,id) => {
  console.log(totalPrice); 
  console.log(value); 
  console.log(id); 
  document.querySelector('#info').innerHTML = "Enchere reçue de";
  document.querySelector('#infotxt').innerHTML = ":+ ";
  document.querySelector('#encheregain').innerHTML = value+"€";
  document.querySelector('#encherisseur').innerHTML = id;
  document.querySelector('#actualprice').innerHTML = totalPrice;
  finalValue = totalPrice;
  lastBidderId = id;
});

BTbid.addEventListener("click", () => {
  console.log("BTbid clicked"); 
  let descValue = desc.value;
  console.log(`Emitting 'end' with ${finalValue}, ${descValue}, ${lastBidderId}`);
socket.emit('end',finalValue,descValue,lastBidderId);
statusLabel.innerHTML = "";
BTbid.disabled = true;
});

socket.on('end', (finalValue,descValue,lastBidderId) => {
  console.log(finalValue); 
  console.log(descValue); 
  console.log("vainqueur : "+lastBidderId); 
  document.querySelector('#info').innerHTML = "Fin de l'enchère !!!!";
  document.querySelector('#infotxt').innerHTML = "";
  document.querySelector('#encheregain').innerHTML = "";
  document.querySelector('#encherisseur').innerHTML ="";
  document.querySelector('#actualprice').innerHTML = "-€";
  document.querySelector('#fin').innerHTML =descValue +" conclut à "+finalValue+"€ par "+lastBidderId;
  statusLabel.innerHTML = "Retour à l'accueil pour refaire une nouvelle mise au enchère";
});

// Désactivation des boutons de jeu au début
disableButtons();
socket.emit('commissaire');
socket.on('status', value => refreshStatus(value));

socket.on('maxCommissaireReached', () => {
console.log("Le nombre maximum de joueurs a été atteint, connexion refusée.");
statusLabel.innerHTML = "Nombre maximal de joueurs atteint, connexion refusée.";
disableButtons();
});