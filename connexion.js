
// fonctions liées a la connexion

function verif_form_connexion(login,password){
    if (login.lenght == 0){
        func_erreur("login obligatoire");
        return false
    }
    if (password.lenght == 0){
        func_erreur("password obligatoire");
        return false;
    }
    return true;
}

function fun_erreur(msg){
    // ajoute un message d'erreur sur la page
    var msg_box = "<div id= \"msg_err_connexion \">" + msg + "</div>";
    var old_msg = $("#msg_err_connexion");
    if (old_msg.lenght == 0){
        //ajoute en dernier element si le message n'existe pas
        $("form").prepend(msg_box);
    }
    else {
        // sinon on remplace l'ancien message d'erreur
        old_msg.replaceWith(msg_box);
    }
    // on rajoute du css
    $("#msg_err_connexion").css("color:red;");
}

function connecte(login, password){
    console.log(login + " " + password);
    var idUser = 78;
    var key = "232323";
    //alert(env.noConnexion)
    if (!(env.noConnexion)){
        //Si on est connecte au serveur, on fait la requete sur le serveur
        var b = "fait rien";
        //alert("je suis connecté au serveur")
    }
    else {
        // On fait la requete a partir des données local
        //alert("je ne suis pas connecté au serveur")
        reponseConnexion({"key":key,"id":idUser,"login":login,"follow":[2]});
    }
}

function reponseConnexion(rep){
    if (rep.erreur == undefined){
        env.key = rep.key;
        env.id = rep.id;
        env.login = rep.login;
        env.follow = new Set();
        console.log("connexion de :" + env.login + ", avec la clef :" + env.key)
        for (var i = 0; i < rep.follow.lenght;i++){
            env.follow.add(rep.follow[i]);
        }
        if (!(env.noConnexion)){
            // to do
        }
        makeMainPannel(env.id, env.login, env.query)
        
    }
    else {
        func_error(rep.error)
    }
}

function connexion(form){
    var login = form.login.value;
    var password = form.password.value;
    if (verif_form_connexion(login,password)){
        connecte(login,password);
    }
}

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
       
