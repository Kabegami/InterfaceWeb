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
    //Une variable déclarere sans l'attribut var sera une variable globale
    //alert("la fonction init est lancé");
    env = new Object();
    env.noConnexion = true;
    setVirtualMessage();
}
    
function setVirtualMessage(){
    // on créer une base de donnée local pour les test
    localdb = [];
    follow = [];
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
    localdb[3] = new Message(42,user1,"rololol",new Date(),[com1,com2]);
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

