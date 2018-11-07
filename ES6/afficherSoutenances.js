class Planning{
    constructor ( racineId, lesJours, largeur, creneaux, salles) {
          this.racineId = racineId;
          this.lesJours = lesJours;
          this.largeur = largeur;
          this.creneaux = creneaux;
          this.salles = salles;
    }
    
    construitColonnesJours () {
      var racine = document.getElementById(this.racineId);
      var row = document.createElement('div');
      row.className = 'row';
      racine.appendChild(row);
      for (var i = 0; i < this.lesJours.length; i++) {
        var balise = document.createElement('div');
        balise.setAttribute('id','0'+this.lesJours[i]);
        var tailleBalise = "col-lg-" + this.largeur;
        balise.className = tailleBalise;
        row.appendChild(balise);
      }

    }
    
    trierCreneaux() {
      this.creneaux = this.creneaux.sort(function(soutenance1, soutenance2){
        var h1 = soutenance1.debut.split(':')
        h1= h1[0] * 60 + h1[1]
        var h2 = soutenance2.debut.split(':')
        h2= h2[0] * 60 + h2[1]
         return soutenance1.jour - soutenance2.jour || h1 - h2 ;
      });
        return this.creneaux;
    }
    
     afficherCreneaux()
    {
        this.creneaux.forEach(function(creneau){
            new PanelCreneau(document.getElementById(creneau.jour),creneau);
        });
    }
    
    getColoneJour(jour) {
      var divElementPere = document.getElementById(jour);
      return divElementPere;
    }
    
    razCreneaux(){
         this.creneaux.forEach(function(creneau){
           var nodes = document.getElementById(creneau.jour).childNodes;
           nodes.forEach(function(node){
               document.getElementById(creneau.jour).removeChild(node);
           })
        });
    }
    
    afficherCreneauxACondition(condition){
        this.creneaux.forEach(function(creneau){
            if(condition(creneau))
                new PanelCreneau(document.getElementById(creneau.jour),creneau);
        });
    }
    
    ajouterBalise(nom, className) {
        if(className){
            var balise = document.createElement(nom);
            balise.className = className;
            return balise;
        }
    }

    ajouterTexte(element, texte)
    {
        var text = document.createTextNode(texte);
        element.appendChild(text);
    }

}


class PanelCreneau{
    constructor(baliseMere, creneau ) {
        this.baliseMere = baliseMere;
        this.creneau = creneau;
        this.creerPanel();
        this.entete = creneau.debut;
        this.corps = creneau.etudiant;
        this.corps = creneau.societe;
        this.corps = creneau.tuteur;
        this.pied = Salles[creneau.specialite][creneau.jour] + " / " + creneau.specialite;
    }

    creerPanel()
    {
        this.panelDefault = document.createElement('div');
        this.panelDefault.className = "panel panel-default";

        this.panelHeading = document.createElement('div');
        this.panelHeading.className = "panel-heading";

        this.panelBody = document.createElement('div');
        this.panelBody.className = "panel-body";

        this.panelFooter = document.createElement('div');
        this.panelFooter.className = "panel-footer";

        this.baliseMere.appendChild(this.panelDefault);
        this.panelDefault.appendChild(this.panelHeading);
        this.panelDefault.appendChild(this.panelBody);
        this.panelDefault.appendChild(this.panelFooter);
    }

    set entete(value) {
        var baliseHeure = document.createElement("b");
        baliseHeure.appendChild(document.createTextNode(value));
        this.panelHeading.appendChild(baliseHeure);
    }

    set corps(value) {
        var baliseEtudiant = document.createElement("b");
        baliseEtudiant.appendChild(document.createTextNode(value));
        this.panelBody.appendChild(baliseEtudiant);
        this.panelBody.appendChild(document.createElement("br"));
    }

    set pied(value){
        this.panelFooter.appendChild(document.createTextNode(value));
    }
}

class SelectionSpecialite{

    constructor(planning, baliseMere){
        this.planning = planning;
        this.baliseMere = baliseMere;
        this.creerListe();
    }

    creerListe(){
            var div = document.createElement("div");
            div.className = "list-group";

            for(let specialite in Specialites)
            {
                var a = document.createElement("a");
                a.className = "list-group-item";
                a.setAttribute("href", "#");
                a.onclick = ()=>{ 
                                 this.planning.razCreneaux();
                                 this.planning.afficherCreneauxACondition( (creneau) => {
                                      return (creneau.specialite==Specialites[specialite]);
                                 })  
                            };
                a.appendChild(document.createTextNode(Specialites[specialite]));
                div.appendChild(a);
            };
            this.baliseMere.appendChild(div);
    }
}

class SelectionSalle{

    constructor(planning, baliseMere){
        this.planning = planning;
        this.baliseMere = baliseMere;
        this.creerListe();
    }

    creerListe(){
        var sallesPlanning={
            A2, A6, A7
        }
            var div = document.createElement("div");
            div.className = "list-group";
            console.log(sallesPlanning);
            for(let salle in sallesPlanning)
            {
                var a = document.createElement("a");
                a.className = "list-group-item";
                a.setAttribute("href", "#");
                a.onclick = ()=>{ 
                                 this.planning.razCreneaux();
                                 this.planning.afficherCreneauxACondition( (creneau) => {
                                      return (Salles[creneau.specialite][creneau.jour]==sallesPlanning[salle]);
                                 })  
                            };
               
                a.appendChild(document.createTextNode(sallesPlanning[salle]));
                div.appendChild(a);
            };
            this.baliseMere.appendChild(div);
    }
}

class Selection{
    constructor(planning, baliseMere, objetValeurs, fonction){
        this.planning = planning;
        this.baliseMere = baliseMere;
        this.objetValeurs = objetValeurs;
        this.fonction = fonction
        this.creerListe(this.objetValeurs,this.fonction,this.planning.creneaux);
    }
    
    creerListe(objetValeurs,fonction,creneau){
       
            var div = document.createElement("div");
            div.className = "list-group";
        
            for(let item in objetValeurs)
            {
                var a = document.createElement("a");
                a.className = "list-group-item";
                a.setAttribute("href", "#");
                a.onclick = ()=>{ 
                                 this.planning.razCreneaux();
                                 this.planning.afficherCreneauxACondition((creneau)=> fonction(creneau,objetValeurs[item]))  
                            };
               
                a.appendChild(document.createTextNode(objetValeurs[item]));
                div.appendChild(a);
            };
            this.baliseMere.appendChild(div);
    }
}

c = new Planning('Planning', [4,5,6,7],3, lesSoutenances, Salles);

c.construitColonnesJours();
c.trierCreneaux();
c.afficherCreneaux();
new Selection(c, document.getElementById("Outils"), Specialites,
   (creneau, specialite) =>  {console.log(creneau.specialite +":"+ specialite);return creneau.specialite == specialite;}
);
new Selection(c, document.getElementById("Outils"), {A2: "M5 - A2",A6: "M5 - A6",A7: "M5 - A7"},
   (creneau, salle) => {console.log(Salles[creneau.specialite][creneau.jour]+":"+salle+":"+(Salles[creneau.specialite][creneau.jour]==salle));return (Salles[creneau.specialite][creneau.jour]==salle)}
);
