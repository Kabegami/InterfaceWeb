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
      <div class= \"Panneau\">\
        <h2 class=\"titre\"> Ouvrir une session</h1>\
        <form action=\"javascript:function(){return;}()\" method =\"get\" onSubmit =\"javascript=connexion(this)\"/>\
        <label for=\"login\">Login</br></label>\
        <input type=\"text\" name=\"login\" id=\"login\" placeholder=\"Login\" />\
        </br>\
        \
        <label for=\"password\">Mot de passe</br></label>\
        <input type=\"text\"  name=\"password\" id=\"password\" placeholder=\"Mot de passe\" />\
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
  <div class=\"Panneau\">\
    <h2> Inscription </h2>\
    <form action=\"javascript:function(){return;}()\" method=\"get\" onSubmit =\"javascript=connexion(this)\"/>\
    <label for=\"login\">Login</br></label>\
    <input type=\"text\" name=\"login\" id=\"login\" placeholder=\"Login\"/>\
    </br>\
    <label for=\"nom\">Nom</label></br>\
    <input type=\"text\" name=\"nom\" id=\"nom\" placeholder=\"Votre nom\"/>\
    </br>\
    <label for=\"prenom\">Prenom</label></br>\
    <input type=\"text\" name=\"prenom\" id=\"prenom\" placeholder=\"Votre prenom\"/>\
    </br>\
    <label for=\"password\">Mot de passe</label></br>\
    <input type=\"text\" name=\"password\" id=\"password\" placeholder=\"Votre mot de passe\"/>\
    </br>\
    <label for=\"email\">Email</label></br>\
    <input type=\"text\" name=\"email\" id=\"email\" placeholder=\"Votre addresse mail\"/>\
    </br>\
    <input type=\"submit\" value=\"Inscription\">\
        </div>"
    //a = document.getElementsByTagName('body')[0];
    //alert(a);
    //a.innerHTML = s;
    $("body").html(s);
}

$(function(){
    makeConnexionPannel();
    // jQuery methods go here...
});
