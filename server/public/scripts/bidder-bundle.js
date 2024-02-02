/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/scripts/bidder.js":
/*!*******************************!*\
  !*** ./src/scripts/bidder.js ***!
  \*******************************/
/***/ (() => {

eval("//bidder\r\nconst socket = io();\r\nconst statusLabel = document.getElementById(\"gameInfo\");\r\nconst status = document.getElementById(\"offre\");\r\nconst BT10 = document.getElementById(\"10\");\r\nconst BT50 = document.getElementById(\"50\");\r\nconst BT100 = document.getElementById(\"100\");\r\n\r\n// Fonction pour désactiver les boutons de jeu\r\nconst disableButtons = () => {\r\n  BT10.disabled = true;\r\n  BT50.disabled = true;\r\n  BT100.disabled = true;\r\n}\r\n\r\n// Fonction pour activer les boutons de jeu\r\nconst enableButtons = () => {\r\n  BT10.disabled = false;\r\n  BT50.disabled = false;\r\n  BT100.disabled = false;\r\n}\r\n\r\nconst refreshStatus = (value) => {\r\n  if(value == 'waiting') {\r\n    statusLabel.innerHTML = \"En attente du debut de l'enchere...\";\r\n    disableButtons();\r\n  }\r\n  else if(value == 'playing') {\r\n    statusLabel.innerHTML = \"Enchere en cours\";\r\n    disableButtons();\r\n  }\r\n}\r\n\r\nBT10.addEventListener(\"click\", () => {\r\n  disableButtons();\r\n  statusLabel.innerHTML = \"\";\r\n  status.innerHTML=\"10\";\r\n  socket.emit('newoffer', 10);\r\n  enableButtons();\r\n});\r\n\r\nBT50.addEventListener(\"click\", () => {\r\n  disableButtons();\r\n  statusLabel.innerHTML = \"\";\r\n  status.innerHTML=\"50\";\r\n  socket.emit('newoffer', 50);\r\n  enableButtons();\r\n  statusLabel.innerHTML = \"Veuillez faire une offre\";\r\n});\r\n\r\nBT100.addEventListener(\"click\", () => {\r\n  disableButtons();\r\n  statusLabel.innerHTML = \"\";\r\n  status.innerHTML=\"100\";\r\n  socket.emit('newoffer', 100);\r\n  enableButtons();\r\n  statusLabel.innerHTML = \"Veuillez faire une offre\";\r\n});\r\n\r\nsocket.on('update', (price,desc) => {\r\n  console.log(price); \r\n  console.log(desc);\r\n  document.querySelector('#item').innerHTML = desc;\r\n  document.querySelector('#itemprice').innerHTML = price;\r\n  enableButtons();\r\n  statusLabel.innerHTML = \"Veuillez faire une offre\";\r\n});\r\n\r\nsocket.on('maj', (totalPrice,value,id) => {\r\n  console.log(totalPrice); \r\n  console.log(value); \r\n  document.querySelector('#itemprice').innerHTML = totalPrice;\r\n  if(socket.id == id){\r\n    document.querySelector('#fin').innerHTML =\"Vous avez fait une enchere de + \"+value+\"€\";\r\n  }\r\n  else{\r\n    document.querySelector('#fin').innerHTML =\"Nouvelle enchere de + \"+value+\"€\";\r\n  }\r\n});\r\n\r\nsocket.on('end', (finalValue,descValue,lastBidderId) => {\r\n  console.log(finalValue); \r\n  console.log(descValue); \r\n  console.log(\"vainqueur : \"+lastBidderId); \r\n  statusLabel.innerHTML = \"Retour à l'accueil pour refaire une nouvelle mise au enchère\";\r\n  if(socket.id == lastBidderId) {\r\n    document.querySelector('#fin').innerHTML = \"Fin de l'enchère !!!! Vous avez gagné \" + descValue;\r\n  } else {\r\n    document.querySelector('#fin').innerHTML = \"Fin de l'enchère !!!! \" + descValue + \" a été gagné par \" + lastBidderId;\r\n  }\r\n});\r\n\r\ndisableButtons();\r\nsocket.emit('encherisseur');\r\nsocket.on('status', value => refreshStatus(value));\r\n\r\nsocket.on('maxEncherisseurReached', () => {\r\n  console.log(\"Le nombre maximum de joueurs a été atteint, connexion refusée.\");\r\n  statusLabel.innerHTML = \"Nombre maximal de joueurs atteint, connexion refusée.\";\r\n  document.querySelector('#item').innerHTML = \"en attente\";\r\n  document.querySelector('#itemprice').innerHTML = \"-€\";\r\n  disableButtons();\r\n});\n\n//# sourceURL=webpack://client/./src/scripts/bidder.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/scripts/bidder.js"]();
/******/ 	
/******/ })()
;