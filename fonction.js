//-------------------------------------------------------------------
//                         FONCTION ET CLASSES
//-------------------------------------------------------------------

function Message(id,auteur,texte,date,comments){
    this.id = id;
    this.auteur = auteur;
    this.texte = texte;
    this.date = date;
    if (comments == undefined){
        comments = [];
    }
    this.comments = comments;
}

Message.prototype.getHtml = function(){
    var s = "<div class='message'>" + this.id +" " + this.auteur +" " + this.texte +" " + this.date +" " + this.comments + " !" + "</div>"
    return s;
}

function Commentaire(id,auteur,texte,date){
    this.id = id;
    this.auteur = auteur;
    this.texte = texte;
    this.date = date;
}

Commentaire.prototype.getHtml = function(){
    var s = "<div class='commentaire'>" + "<div class='auteur'>" + this.auteur + "</div>" + "<div class='texte'>" + this.texte  + "</div>" 
    return s;
}

Message.prototype.getHtml = function(){
    var s = "<div id='message'>" + this.id + " " + this.auteur + " " + this.texte + " " + this.date +" " + this.comments + " !" + "</div>"
    return s;
}

function revival(key,value){
    if (value.comment != undefined){
        return new Message(value.id, value.auteur, value.texte, value.date, value.comments);
    }
    if (value.texte != undefined){
        return new Commentaire(value.id, value.auteur, value.texte, value.date)
    }
    if (key="date"){return new Date(value)}
    return value;
}

function init(){
    var noConnection = true;
    var env = {};
    setVirtualMessage()
}
    
function setVirtualMessage(){
    // on créer une base de donnée local pour les test
    var localdb = [];
    var follow = [];
    var user1 = {"id":1,"login":"bob"};
    var user2 = {"id":2,"login":"toto"};
    var user3 = {"id":3,"login":"raoul"};
    follow[1] = new set();
    follow[1].add(2);
    follow[1].add(3);
    follow[2] = new set();
    follow[2].add(1);
    follow[3] = new set();
    follow[3].add(2);
    var com1 = new Commentaire(5,user3,"hum",new Date());
    var com2 = new Commentaire(6,user1,"Hi !",new Date());
    localdb[3] = new Message(42,user1,"rololol",new Date(),[com1,com2]);
}


var m = new Message(1,"raoul","Bonjour !","blabla",12, "comment");
var c= new Commentaire(2,"bily","Hey !","blabla",12);
var s = c.getHtml();
makeConnexionPannel();
//document.getElementById("test").innerHTML = s
