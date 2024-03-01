//bidder
const socket = io();
const statusLabel = document.getElementById("gameInfo");
const status = document.getElementById("offre");
const BT10 = document.getElementById("10");
const BT50 = document.getElementById("50");
const BT100 = document.getElementById("100");
this.playing = false;

// Fonction pour cacher les boutons de jeu
const hiddenButtons = () => {
  BT10.style.visibility = "hidden";
  BT50.style.visibility = "hidden";
  BT100.style.visibility = "hidden";
}

// Fonction pour afficher les boutons de jeu
const showButtons = () => {
  BT10.style.visibility = "visible";
  BT50.style.visibility = "visible";
  BT100.style.visibility = "visible";
}

// Fonction pour désactiver les boutons de jeu
const disableButtons = () => {
  BT10.disabled = true;
  BT50.disabled = true;
  BT100.disabled = true;
}

// Fonction pour activer les boutons de jeu
const enableButtons = () => {
  BT10.disabled = false;
  BT50.disabled = false;
  BT100.disabled = false;
}

const refreshStatus = (value) => {
  if(value == 'waiting') {
    statusLabel.innerHTML = "En attente du debut de l'enchere...";
    hiddenButtons();
    disableButtons();
  }
  else if(value == 'playing') {
    statusLabel.innerHTML = "Enchere en cours";
    showButtons();
    disableButtons();
  }
}

BT10.addEventListener("click", () => {
  disableButtons();
  statusLabel.innerHTML = "";
  status.innerHTML="10";
  socket.emit('newoffer', 10);
  statusLabel.innerHTML = "Veuillez faire une offre";
  enableButtons();
});

BT50.addEventListener("click", () => {
  disableButtons();
  statusLabel.innerHTML = "";
  status.innerHTML="50";
  socket.emit('newoffer', 50);
  statusLabel.innerHTML = "Veuillez faire une offre";
  enableButtons();
});

BT100.addEventListener("click", () => {
  disableButtons();
  statusLabel.innerHTML = "";
  status.innerHTML="100";
  socket.emit('newoffer', 100);
  statusLabel.innerHTML = "Veuillez faire une offre";
  enableButtons();
});

socket.on('update', (price,desc) => {
  console.log(price); 
  console.log(desc);
  document.querySelector('#item').innerHTML = desc;
  document.querySelector('#itemprice').innerHTML = price;
  this.playing = true;
  enableButtons();
  statusLabel.innerHTML = "Veuillez faire une offre";
});

socket.on('maj', (totalPrice,value,id) => {
  console.log(totalPrice); 
  console.log(value); 
  document.querySelector('#itemprice').innerHTML = totalPrice;
  if(socket.id == id){
    document.querySelector('#fin').innerHTML ="Vous avez fait une enchere de + "+value+"€";
  }
  else{
    document.querySelector('#fin').innerHTML ="Nouvelle enchere de + "+value+"€";
  }
});

socket.on('end', (finalValue,descValue,lastBidderId) => {
  console.log(finalValue); 
  console.log(descValue); 
  console.log("vainqueur : "+lastBidderId); 
  statusLabel.innerHTML = "Retour à l'accueil pour refaire une nouvelle mise au enchère";
  if(socket.id == lastBidderId) {
    document.querySelector('#fin').innerHTML = "Fin de l'enchère !!!! Vous avez gagné " + descValue;
  } else {
    document.querySelector('#fin').innerHTML = "Fin de l'enchère !!!! " + descValue + " a été gagné par " + lastBidderId;
  }
  this.playing = false;
});

socket.on('gameState', (gameState) => {
  if (gameState === 'playing') {
    enableButtons();
  } else {
    disableButtons();
  }
});

disableButtons();
hiddenButtons();
socket.emit('encherisseur');
socket.on('status', value => refreshStatus(value));

socket.on('maxEncherisseurReached', () => {
  console.log("Le nombre maximum de joueurs a été atteint, connexion refusée.");
  statusLabel.innerHTML = "Nombre maximal de joueurs atteint, connexion refusée.";
  document.querySelector('#item').innerHTML = "en attente";
  document.querySelector('#itemprice').innerHTML = "-€";
});

