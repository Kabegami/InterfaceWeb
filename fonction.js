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
    //var s = "<div id='message'" + this.id + "class='message'";
    var s = "<div id='message'>" + this.id +" " + this.auteur +" " + this.texte +" " + this.date +" " + this.comments + " !" + "</div>"
    return s;
}

function Commentaire(id,auteur,texte,date){
    this.id = id;
    this.auteur = auteur;
    this.texte = texte;
    this.date = date;
}

Commentaire.prototype.getHtml = function(){
    var s = "<div class='commentaire'>" + "<div class='auteur'>" + this.auteur + "</div>" + "<div class='texte'>" + this.texte "+</div>" 
    return s;
}

Message.prototype.getHtml = function(){
    //var s = "<div id='message'" + this.id + "class='message'";
    var s = "<div id='message'>" + this.id +" " + this.auteur +" " + this.texte +" " + this.date +" " + this.comments + " !" + "</div>"
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

m = new Message(1,"raoul","Bonjour !","blabla",12, "comment")
c= new Commentaire(2,"bily","Hey !","blabla",12)
s = c.getHtml()
document.getElementById("test").innerHTML = s
