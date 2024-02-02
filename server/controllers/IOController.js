export default class IOController {
  
  constructor(io){
    this.io=io;
    this.id='';
    this.playerC = '';
    this.playerCSocket;
    this.playerE1 = '';
    this.playerE1Socket;
    this.playerE2 = '';
    this.playerE2Socket;
    this.playerE3 = '';
    this.playerE3Socket;
    this.finished = false;
    this.price='';
    this.nprice='';
    this.totalPrice=0;
    this.description='';
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
  
  registerEncherisseur(socket) {
      console.log(`Encherisseur connexion ID : ${socket.id}`);
      if(this.playerE1 == '') {
          this.playerE1 = socket.id;
          this.playerE1Socket = socket;
          console.log('Connexion Encherisseur1 enregistrée');
      }
      else if(this.playerE2 == '') {
          this.playerE2 = socket.id;
          this.playerE2Socket = socket;
          console.log('Connexion Encherisseur2 enregistrée');
      }
      else {
          socket.emit('maxEncherisseurReached');
          socket.disconnect(true);
          console.log('Nouvelle connexion refusée : 2 encherisseurs maximum');
      }
      this.sayIfReady();
  }
  
  leave(socket) {
    console.log(`Déconnexion ID : ${socket.id}`);
    if(this.playerC == socket.id) {
      this.playerC = '';
      console.log('Commissaire s\'est déconnecté');
    }
    else if(this.playerE1 == socket.id) {
        this.playerE1 = '';
        console.log('Encherisseur 1 s\'est déconnecté');
    }
    else if(this.playerE2 == socket.id) {
        this.playerE2 = '';
        console.log('Encherisseur 2 s\'est déconnecté');
    }
    else if(this.playerE3 == socket.id) {
        this.playerE3 = '';
        console.log('Encherisseur 3 s\'est déconnecté');
    }
    if(!this.finished) { this.sayIfReady(); }
    else { this.finishedGame = true; }
  }
  
  sayIfReady() {
    if(this.playerC != '' && this.playerE1 == '' && this.playerE2 == '') {
        this.playerCSocket.emit('status', 'waiting');
    }
    else if(this.playerC == '' && this.playerE1 != '' && this.playerE2 == '') {
        this.playerE1Socket.emit('status', 'waiting');
    }
    else if(this.playerC == '' && this.playerE1 == '' && this.playerE2 != '') {
        this.playerE2Socket.emit('status', 'waiting');
    }
    else if(this.playerC != '' && this.playerE1 != '' && this.playerE2 == '') {
        this.playerCSocket.emit('status', 'waiting');
        this.playerE1Socket.emit('status', 'waiting');
    }
    else if(this.playerC != '' && this.playerE1 == '' && this.playerE2 != '') {
        this.playerCSocket.emit('status', 'waiting');
        this.playerE2Socket.emit('status', 'waiting');
    }
    else if(this.playerC == '' && this.playerE1 != '' && this.playerE2 != '') {
        this.playerE1Socket.emit('status', 'waiting');
        this.playerE2Socket.emit('status', 'waiting');
    }
    else if(this.playerC != '' && this.playerE1 != '' && this.playerE2 != '') {
        this.playerCSocket.emit('status', 'playing');
        this.playerE1Socket.emit('status', 'playing');
        this.playerE2Socket.emit('status', 'playing');
    }
}
 
  play(socket,price,desc){
    if(socket.id == this.playerC) {
        this.price = price;
        this.description=desc;
        this.playerE1Socket.emit('update',price,desc);
        this.playerE2Socket.emit('update',price,desc);
        this.playerCSocket.emit('update',price);
    }
  }
  
  encherir(socket,value){
    if(socket.id == this.playerE1){
      this.nprice=parseInt(this.price)+parseInt(value);
      this.totalPrice = this.nprice;
      this.price = this.nprice;
      this.id=this.playerE1;
      this.playerE1Socket.emit('maj',this.totalPrice,value,this.id);
      this.playerE2Socket.emit('maj',this.totalPrice,value,this.id);
      this.playerCSocket.emit('maj',this.totalPrice,value,this.id);
    }
    if(socket.id == this.playerE2){
      this.nprice=parseInt(this.price)+parseInt(value);
      this.totalPrice = this.nprice;
      this.price = this.nprice;
      this.id=this.playerE2;
      this.playerE1Socket.emit('maj',this.totalPrice,value,this.id);
      this.playerE2Socket.emit('maj',this.totalPrice,value,this.id);
      this.playerCSocket.emit('maj',this.totalPrice,value,this.id);
    }
  }
  
  end(socket,finalValue,descValue,lastBidderId){
    if(socket.id==this.playerC){
      this.playerCSocket.emit('end',finalValue,descValue,lastBidderId);
      this.playerE1Socket.emit('end',finalValue,descValue,lastBidderId);
      this.playerE2Socket.emit('end',finalValue,descValue,lastBidderId);
    }
  }
}