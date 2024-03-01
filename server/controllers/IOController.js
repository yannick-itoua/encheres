export default class IOController {
  
  constructor(io){
    this.io=io;
    this.id='';
    this.playerC = '';
    this.playerCSocket;
    this.playersE = new Map();
    this.finished = false;
    this.price='';
    this.nprice='';
    this.totalPrice=0;
    this.description='';
    this.playing = false; 
  }
  
  registerSocket(socket){
    socket.on('commissaire', () => this.registerCommissaire(socket));
    socket.on('encherisseur', () => this.registerEncherisseur(socket));
    socket.on('start', (price,desc) => this.play(socket,price,desc));
    socket.on('newoffer', (value) => this.encherir(socket,value));
    socket.on('end', (finalValue,descValue,lastBidderId) => this.end(socket,finalValue,descValue,lastBidderId));
    socket.on('disconnect', () => this.leave(socket));
  }
  
  registerCommissaire(socket) {
      console.log(`Commissaire connexion ID : ${socket.id}`);
      if(this.playerC == '') {
          this.playerC = socket.id;
          this.playerCSocket = socket;
          console.log('Connexion Commissaire enregistrée');
      }
      
      else {
          socket.emit('maxCommissaireReached');
          socket.disconnect(true);
          console.log('Nouvelle connexion refusée : 1 commissaire maximum');
      }
      this.sayIfReady();
  }
  
  sendGameState() {
  const gameState = this.playing ? 'playing' : 'waiting';
  if (this.playerCSocket) {
    this.playerCSocket.emit('gameState', gameState);
  }
  this.playersE.forEach((socket, id) => {
    socket.emit('gameState', gameState);
  });
}

  
  registerEncherisseur(socket) {
  console.log(`Encherisseur connexion ID : ${socket.id}`);
  // Ajoutez cette condition pour vérifier si le jeu est déjà en cours
  if(this.playing) {
    socket.emit('maxEncherisseurReached');
    socket.disconnect(true);
    console.log('Nouvelle connexion refusée : Le jeu a déjà commencé');
  } else {
    this.playersE.set(socket.id, socket);
    console.log('Connexion Encherisseur enregistrée');
  }
  this.sayIfReady();
  this.sendGameState();
}

  
  leave(socket) {
    console.log(`Déconnexion ID : ${socket.id}`);
    if(this.playerC == socket.id) {
      this.playerC = '';
      console.log('Commissaire s\'est déconnecté');
    }
    else if(this.playersE.has(socket.id)) {
        this.playersE.delete(socket.id);
        console.log('Encherisseur s\'est déconnecté');
    }
    if(!this.finished) { this.sayIfReady(); }
    else { this.finishedGame = true; }
  }
  
  sayIfReady() {
    if(this.playerC != '' && this.playersE.size == 0) {
        this.playerCSocket.emit('status', 'waiting');
    }
    else if(this.playerC == '' && this.playersE.size > 0) {
        this.playersE.forEach((socket, id) => {
            socket.emit('status', 'waiting');
        });
    }
    else if(this.playerC != '' && this.playersE.size > 0) {
        this.playerCSocket.emit('status', 'playing');
        this.playersE.forEach((socket, id) => {
            socket.emit('status', 'playing');
        });
    }
  }
  
  
  play(socket,price,desc){
    if(socket.id == this.playerC) {
      this.playing = true;
        this.price = price;
        this.description=desc;
        this.playersE.forEach((socket, id) => {
            socket.emit('update',price,desc);
        });
        this.playerCSocket.emit('update',price);
    }
    this.sendGameState();
  }
  
  encherir(socket,value){
    if(this.playersE.has(socket.id)){
      this.nprice=parseInt(this.price)+parseInt(value);
      this.totalPrice = this.nprice;
      this.price = this.nprice;
      this.id=socket.id;
      this.playersE.forEach((socket, id) => {
            socket.emit('maj',this.totalPrice,value,this.id);
        });
      this.playerCSocket.emit('maj',this.totalPrice,value,this.id);
    }
  }
  
  end(socket,finalValue,descValue,lastBidderId){
    if(socket.id==this.playerC){
      this.playersE.forEach((socket, id) => {
            socket.emit('end',finalValue,descValue,lastBidderId);
        });
      this.playerCSocket.emit('end',finalValue,descValue,lastBidderId);
    }
    this.playing=false;
    this.sendGameState();
  }
}
