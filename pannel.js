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
    var s = "<div class=\"tete_document\">\
    <p> message numero " +  this.id +"  de  " + this.auteur.login +"</p>\
   </div>\
<div class='message'>\
 <p>" + this.texte +"</p><p>" + this.date +"</p><div class=\"debut_comments\"></div>"
    for (var i =0; i< this.comments.length ; i++){
        s = s + this.comments[i].getHtml();
    }
    s = s + "<div class=\"debut_comments\"></div><div class=\"nouveau_commentaire\"><p> Laissez un commentaire </p>\
    <form action=\"javascript:function(){return;}()\" method =\"get\" onSubmit =\"javascript=connexion(this)\"/ id=>\
<input type=\"text\" name=\"commentaire\" id=\"commentaire\" placeholder=\"votre commentaire...\" required/>\
<input class=\"submit_com\" type=\"submit\" value=\"poster votre commentaire\">\
</form>\
";
    s = s + "</div>";
    return s;
}

function Commentaire(id,auteur,texte,date){
    this.id = id;
    this.auteur = auteur;
    this.texte = texte;
    this.date = date;
}

Commentaire.prototype.getHtml = function(){
    var s = "<div class='commentaire'>" + "<div class='auteur'> <p> commentaire numero  " + this.id + " de  " +  this.auteur.login + "</p> </div>" + "<div class='texte'> <p>" + this.texte  + "</p><p>" +  this.date +  "</p></div></div>" ;
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
    //Une variable déclarere sans l'attribut var sera une variable globale
    //alert("la fonction init est lancé");
    env = new Object();
    env.noConnexion = true;
    localdb = [];
    follow = [];
    setVirtualMessage();
    //alert(follow.length);
}
    
function setVirtualMessage(){
    // on créer une base de donnée local pour les test;
    var user1 = {"id":1,"login":"bob"};
    var user2 = {"id":2,"login":"toto"};
    var user3 = {"id":3,"login":"raoul"};
    follow[1] = new Set();
    follow[1].add(2);
    follow[1].add(3);
    follow[2] = new Set();
    follow[2].add(1);
    follow[3] = new Set();
    follow[3].add(2);
    var com1 = new Commentaire(5,user3,"hum",new Date());
    var com2 = new Commentaire(6,user1,"Hi !",new Date());
    var t1 = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis lobortis sollicitudin luctus. In aliquet elementum nisi, id condimentum metus scelerisque nec. Aliquam erat volutpat. Quisque tellus orci, blandit sit amet nibh eu, sollicitudin volutpat felis. Quisque in arcu est. Integer tincidunt tincidunt finibus. Curabitur fermentum pulvinar maximus. In vel pellentesque nisi, a finibus turpis. Quisque posuere vestibulum nisi, sed gravida orci."
    var t2 = "Sed fringilla posuere sapien, sed lobortis lectus facilisis vulputate. In non ante ultrices, gravida mauris vitae, pulvinar augue. Integer vitae lacus hendrerit, dictum leo in, bibendum risus. Aenean scelerisque massa in sem cursus, ut molestie nisi suscipit. Vivamus vestibulum dui vitae risus consequat porttitor. Fusce eu risus turpis. Donec ornare tempor metus, a consectetur nulla auctor id. Suspendisse massa mi, ornare eu dui nec, pretium laoreet leo."
    localdb[0] = new Message(42,user1,t1,new Date(),[com1,com2]);
    localdb[1] = new Message(43, user2,t2, new Date(), [com1]);
    //alert(localdb.length);
}

function getFromLocalDB(from, minId, maxId, nbMax){
    var tab = [];
    var nb = 0;
    var f = undefined;
    if (from > 0){
        f = folowers[from];
        if (f == undefined){
            f = new Set()
        }
    }
    for (var i = local.db.lenght -1 ; i >= 0; i--){
        if ((nbMax >=0) && (nb > nbMax)){
            break;
        }
        var m = localdb
        if ((maxId < 0) || (m.id < maxId) && m.id > minId){
            if ((f == undefined) || (m.auteur.id == from) || (f.has(m.auteur.id))){
                tab.push(m)
            }
        }
        return tab
    }
}

//Les messages
function developperMessage(id){
    var m = env.msg[id];
    var el = $("#message" + id + "m.comments");
    for (var i=0; i < m.comments.lenght;i++){
        var c = m.comments[i];
        el.append(i.gethtml());
    }
}

function newComment(id){
    var texte = $("#new_"+id).val();
    if (!noConnection()){
        // to do
        b = "rien";
    }
    else{
        newComment = response(id_JSON-Stringfy(new Commentaire(env.msg[id].comments.lengh+1,{"id":env.id,"login":envLogin}, text, newDate())));
    
    }
}

function newCommentResponse(d,rep){
    var com = JSON.parse(rep,revival);
    if (( com != undefined) && (com.erreur = undefined)){
        var el = $("#message_"+id+".comments");
        el.append(com.gethtml())
        env.mgs[id].comments.push(com)
        if (noConnection){
            localdb[id] = env.msg[id];
        }
    }
}

function refreshMessages(){
	if (env.query != undefined){
		return ;
	}
	if (! env.noConnection){
		$.ajax({
			type: "POST",
			url: "message/list",
			data: "key=" + env.key + "&from=" + env.fromId 
				+ "&id_max=" + env.maxId + "&id_min=" + env.minId + "&nb=" + 10,
			datatype: "text",
			success: function(rep){
    			refreshMessagesResponse(JSON.stringify(rep));
    		},
    		error: function(xhr, status, err){
    			func_error(status);
    		}
		});
	}
    else {
        messages = getFromLocalDB(env.fromId, env.minId, env.maxId, env.nbMax);
        refreshMessagesResponse(messages);
    }
}

function getAllMessage(){
    //les messages sont contenus dans localdb
    //alert("je suis dans la fonction getAllMessage");
    //alert(localdb.length)
    for(var i=0; i < localdb.length; i++){
        var msg = localdb[i];
        //alert(msg.getHtml())
        $(msg.getHtml()).appendTo(".message-list");
    }
}

function getSomeMessage(idMin, idMax, nb){
    var cpt = 0
    //alert("getSomeMessage")
    for(var i=0; i < localdb.length; i++){
        var msg = localdb[i]
        
        if (msg.id >= idMin && msg.id <= idMax && cpt < idMax){
            $(msg.getHtml()).appendTo(".new-message")
        }
    }
}


function refreshMessagesResponse(rep){
	var tab = JSON.parse(rep, revival);
	for (var i = tab.messages.length-1; i >= 0; i--){
		var msg = tab.messages[i];
		//$(".message-list").prepend(msg.getHtml());
		$(msg.getHtml()).prependTo(".message-list").hide().slideToggle();
		env.messages[msg.id] = msg;
		if (msg.id > env.maxId){
			env.maxId = msg.id;
		}
		if (env.minId < 0 || msg.id < env.minId){
			env.minId = msg.id;
		}
	}
}





//-------------------------------------------------------------------
//                         CREATION DES PANNELS
//-------------------------------------------------------------------

function makeConnexionPannel(){
    //alert('ici')
    $("body").empty();
    var s = "<div id=\"connexion \">\
      <header class=\"navigation \">\
        <div class=\"logo\">\
          <p>Logo</p>\
        </div>\
        <div class=\"headElem\">\
          <p>accueil</p>\
        </div>\
        <div class=\"headElem\">\
          <p>recherche</p>\
        </div>\
        <div class=\"headElem\">\
          <p>profil</p>\
        </div>\
        <div class=\"active\">\
          <p>connexion</p>\
        </div>\
      </header>\
      <div class=\"titre_panneau\"> <p>Ouvrir une session</p></div>\
      <div class= \"Panneau_avec_titre\">\
        <form action=\"javascript:function(){return;}()\" method =\"get\" onSubmit =\"javascript=connexion(this)\"/ id=>\
        <label for=\"login\">Login</br></label>\
        <input type=\"text\" name=\"login\" id=\"login\" placeholder=\"Login\" required/>\
        </br>\
        \
        <label for=\"password\">Mot de passe</br></label>\
        <input type=\"text\"  name=\"password\" id=\"password\" placeholder=\"Mot de passe\" required/>\
        </br>\
        <input type=\"submit\" value=\"connexion\"/>\
        <div class=\"liens\">\
          <div class=\"lien\"><span>Mot de passe perdu</span></div>\
          <div class=\"lien\" onclick=\"makeInscriptionPannel()\"><span>Pas encore inscrit ?</span></div>\
        </div>\
        </form>\
</div>";
    //a = document.getElementsByTagName('body')[0];
    //alert(a);
    //a.innerHTML = s;
    $("body").html(s);
//    $("body").html(s);
}

// dans form = action=\"javascript:function(){return;}

function makeInscriptionPannel() {
    //$("body").empty();
    var s = "\
    <header class=\"navigation\">\
        <div class=\"logo\">\
          <p>Logo</p>\
        </div>\
        <div class=\"headElem\">\
          <p>accueil</p>\
        </div>\
        <div class=\"headElem\">\
          <p>recherche</p>\
        </div>\
        <div class=\"headElem\">\
          <p>profil</p>\
        </div>\
        <div class=\"active\">\
          <p>inscription</p>\
        </div>\
    </header>\
  <div class=\"titre_panneau\"> <p>Inscription</p> </div>\
  <div class=\"Panneau_avec_titre\">\
    <form action=\"javascript:function(){return;}()\" method =\"get\" onSubmit =\"javascript=connexion(this)\"/ id=>\
    <label for=\"login\">Login</br></label>\
    <input type=\"text\" name=\"login\" id=\"login\" placeholder=\"Login\" required/>\
    </br>\
    <label for=\"nom\">Nom</label></br>\
    <input type=\"text\" name=\"nom\" id=\"nom\" placeholder=\"Votre nom\" required/>\
    </br>\
    <label for=\"prenom\">Prenom</label></br>\
    <input type=\"text\" name=\"prenom\" id=\"prenom\" placeholder=\"Votre prenom\" required/>\
    </br>\
    <label for=\"password\">Mot de passe</label></br>\
    <input type=\"text\" name=\"password\" id=\"password\" placeholder=\"Votre mot de passe\" required/>\
    </br>\
    <label for=\"email\">Email</label></br>\
    <input type=\"text\" name=\"email\" id=\"email\" placeholder=\"Votre addresse mail\" required/>\
    </br>\
    <input type=\"submit\" value=\"connexion\">\
</form>\
<div class=\"lien\"><span onclick=\"makeConnexionPannel()\">Deja inscrit ? </span></div> \
        </div>"
    //a = document.getElementsByTagName('body')[0];
    //alert(a);
    //a.innerHTML = s;
    $("body").html(s);
}

function makeProfilPannel(){
    s = "<header class=\"navigation\">\
        <div class=\"logo\">\
          <p>Logo</p>\
        </div>\
        <div class=\"headElem\">\
          <p>accueil</p>\
        </div>\
        <div class=\"headElem\">\
          <p>recherche</p>\
        </div>\
        <div class=\"active\">\
          <p>profil</p>\
        </div>\
        <div class=\"headElem\" onclick=\"makeConnexionPannel();\">\
          <p>déconnexion</p>\
        </div>\
    </header>\
    <div class=\"Principal\">\
      <div class=\"titre_panneau\"><p>Ecrire un nouveau message</p></div>\
      <div class=\"Panneau_avec_titre\">\
        <form action=\"javascript:function(){return;}()\" method =\"get\" onSubmit =\"javascript=connexion(this)\"/ id=>\
          <input type=\"text\" name=\"commentaire\" placeholder=\"Votre message...\" required/>\
          <input class=\"submit_com\" type=\"submit\" value=\"poster votre message\"\>\
        </form>\
      </div>\
      <div class=\"titre_panneau\"></p>Liste des amis</p></div>\
      <div class=\"Panneau_avec_titre\">\
        <p> bla bla bla bla bla bla</p>\
      </div>"
    $("body").html(s)
}

function makeMainPannel(id, login, query){
    env.mongo = [];
    env.minId = -1;
    env.maxId = -1;
    env.fromId = id;
    env.fromLogin = login;
    env.query = query;
    var s = "<header class=\"navigation\">\
            <div class=\"logo\">\
            <p>Logo</p>\
            </div>\
            <div class=\"active\">\
              <p>accueil</p>\
            </div>\
            <div class=\"headElem\">\
              <p>recherche</p>\
            </div>\
            <div class=\"headElem\" onclick=\"makeProfilPannel();\">\
              <p>profil : "+login+"</p>\
             </div>\
            <div class=\"headElem\" onclick=\"makeConnexionPannel();\">\
                <p>déconnexion</p>\
            </div>\
        </header>\
        <div id=\"Principal\">\
        <nav class = \"Panneau\">\
          <p>Il y a les statistique ici</p>\
        </nav>\
        <div id=\"corp\">\
        <div class=\"titre\"><p>Nouveaux messages</p></div>\
        <div class=\"new-message\">\
        </div>\
        <div class=\"titre\"><p>Tous les messages</p></div>\
        <div class=\"message-list\">\
        </div>\
        </div>\
        </div>\
        <footer class=\"Panneau\">\
          <p> Me contacter : <a href=\"\">lucas.becirspahic@gmail.com</p>\
        </footer>"
    $("body").html(s)
    getAllMessage();
    getSomeMessage(0,42,5);
}

$(function(){
    init();
    makeConnexionPannel(1,2,3);
    
    //$(document).on('submit', '.form', function(e) {
//	e.preventDefault();
//	verif_form_connexion(this);
  //  });
    // jQuery methods go here...
});
