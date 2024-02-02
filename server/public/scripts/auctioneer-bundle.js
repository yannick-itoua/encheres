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

/***/ "./src/scripts/auctioneer.js":
/*!***********************************!*\
  !*** ./src/scripts/auctioneer.js ***!
  \***********************************/
/***/ (() => {

eval("//auctioneer\r\nconst socket = io();\r\nconst statusLabel = document.getElementById(\"gameInfo\");\r\nconst price = document.getElementById(\"startingprice\");\r\nconst desc = document.getElementById(\"description\");\r\nconst finalprice = document.getElementById(\"actualprice\");\r\nlet lastBidderId = null;\r\nlet finalValue = null;\r\nconst BTstart = document.getElementById(\"start\");\r\nconst BTbid = document.getElementById(\"terminer\");\r\n\r\n// Fonction pour désactiver les boutons de jeu\r\nconst disableButtons = () => {\r\nBTstart.disabled = true;\r\nBTbid.disabled = true;\r\n}\r\n\r\n// Fonction pour activer les boutons de jeu\r\nconst enableButtons = () => {\r\nBTstart.disabled = false;\r\nBTbid.disabled = false;\r\n}\r\n\r\nconst refreshStatus = (value) => {\r\nif(value == 'waiting') {\r\nstatusLabel.innerHTML = \"En attente des encherisseurs...\";\r\ndisableButtons();\r\n}\r\nelse if(value == 'playing') {\r\nstatusLabel.innerHTML = \"Veuillez debuter l'enchere\";\r\nenableButtons();\r\n}\r\n}\r\n\r\nBTstart.addEventListener(\"click\", () => {\r\n  let priceValue = price.value; \r\n  let descValue = desc.value;\r\nsocket.emit('start',priceValue,descValue);\r\nstatusLabel.innerHTML = \"Enchere en cours\";\r\nBTstart.disabled = true;\r\n});\r\n\r\nsocket.on('maj', (totalPrice,value,id) => {\r\n  console.log(totalPrice); \r\n  console.log(value); \r\n  console.log(id); \r\n  document.querySelector('#info').innerHTML = \"Enchere reçue de\";\r\n  document.querySelector('#infotxt').innerHTML = \":+ \";\r\n  document.querySelector('#encheregain').innerHTML = value+\"€\";\r\n  document.querySelector('#encherisseur').innerHTML = id;\r\n  document.querySelector('#actualprice').innerHTML = totalPrice;\r\n  finalValue = totalPrice;\r\n  lastBidderId = id;\r\n});\r\n\r\nBTbid.addEventListener(\"click\", () => {\r\n  console.log(\"BTbid clicked\"); \r\n  let descValue = desc.value;\r\n  console.log(`Emitting 'end' with ${finalValue}, ${descValue}, ${lastBidderId}`);\r\nsocket.emit('end',finalValue,descValue,lastBidderId);\r\nstatusLabel.innerHTML = \"\";\r\nBTbid.disabled = true;\r\n});\r\n\r\nsocket.on('end', (finalValue,descValue,lastBidderId) => {\r\n  console.log(finalValue); \r\n  console.log(descValue); \r\n  console.log(\"vainqueur : \"+lastBidderId); \r\n  document.querySelector('#info').innerHTML = \"Fin de l'enchère !!!!\";\r\n  document.querySelector('#infotxt').innerHTML = \"\";\r\n  document.querySelector('#encheregain').innerHTML = \"\";\r\n  document.querySelector('#encherisseur').innerHTML =\"\";\r\n  document.querySelector('#actualprice').innerHTML = \"-€\";\r\n  document.querySelector('#fin').innerHTML =descValue +\" conclut à \"+finalValue+\"€ par \"+lastBidderId;\r\n  statusLabel.innerHTML = \"Retour à l'accueil pour refaire une nouvelle mise au enchère\";\r\n});\r\n\r\n// Désactivation des boutons de jeu au début\r\ndisableButtons();\r\nsocket.emit('commissaire');\r\nsocket.on('status', value => refreshStatus(value));\r\n\r\nsocket.on('maxCommissaireReached', () => {\r\nconsole.log(\"Le nombre maximum de joueurs a été atteint, connexion refusée.\");\r\nstatusLabel.innerHTML = \"Nombre maximal de joueurs atteint, connexion refusée.\";\r\ndisableButtons();\r\n});\n\n//# sourceURL=webpack://client/./src/scripts/auctioneer.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/scripts/auctioneer.js"]();
/******/ 	
/******/ })()
;