function PanelCreneau ( baliseMere, creneau ) {
   this.baliseMere=baliseMere;
   this.creneau = creneau;
   this.creerPanel();
   this.entete=creneau.debut;
   this.corps=creneau.etudiant;
   this.corps=creneau.societe;
   this.corps=creneau.tuteur;
   this.pied=Salles[creneau.specialite][creneau.jour]+" / "+creneau.specialite;
}

PanelCreneau.prototype.__defineSetter__("entete", function(value){
    var baliseHeure = document.createElement("b");
    baliseHeure.appendChild(document.createTextNode(value));
    this.panelHeading.appendChild(baliseHeure);
});

PanelCreneau.prototype.__defineSetter__("corps", function(value){
    var baliseEtudiant = document.createElement("b");
    baliseEtudiant.appendChild(document.createTextNode(value));
    this.panelBody.appendChild(baliseEtudiant);
    this.panelBody.appendChild(document.createElement("br"));
});

 PanelCreneau.prototype.__defineSetter__("pied", function(value){
     this.panelFooter.appendChild(document.createTextNode(value));
 });


function Planning ( racineId, lesJours, largeur, creneaux, salles) {
  this.racineId = racineId;
  this.lesJours = lesJours;
  this.largeur = largeur;
  this.creneaux = creneaux;
  this.salles = salles;
}

Planning.prototype.construitColonnesJours = function () {

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

Planning.prototype.trierCreneaux = function() {
  this.creneaux = this.creneaux.sort(function(soutenance1, soutenance2){
    var h1 = soutenance1.debut.split(':')
    h1= h1[0] * 60 + h1[1]
    var h2 = soutenance2.debut.split(':')
    h2= h2[0] * 60 + h2[1]

     return soutenance1.jour - soutenance2.jour || h1 - h2 ;
  });

  return this.creneaux;
}

// Planning.prototype.afficherCrineaux = function() {
//   var salles = this.salles;
//   this.creneaux.forEach(function(item, index) {
//
//     var divElementPere = document.getElementById(item.jour);
//
//         var panelDefault = document.createElement('div');
//         panelDefault.className = "panel panel-default";
//
//         var panelHeading = document.createElement('div');
//         panelHeading.className = 'panel-heading';
//
//           var heure = document.createElement('b');
//           heure.appendChild(document.createTextNode(item.debut));
//
//           panelHeading.appendChild(heure)
//
//           var panelBody = document.createElement('div');
//             panelBody.className = 'panel-body';
//             var nameEtudiant = document.createElement('b');
//             var br = document.createElement('br');
//             nameEtudiant.appendChild(document.createTextNode(item.etudiant));
//
//             panelBody.appendChild(nameEtudiant)
//             panelBody.appendChild(br);
//             // panelBody.appendChild(document.createTextNode(item.societe));
//             panelBody.appendChild(br);
//           panelBody.appendChild(document.createTextNode('Tuteur: ' + item.tuteur));
//
//           var panelFooter = document.createElement('div');
//             panelFooter.className = 'panel-footer';
//             panelFooter.appendChild(document.createTextNode(salles[item.specialite][item.jour] + '  ' + item.specialite));
//
//
//
//
//
//       panelDefault.appendChild(panelHeading)
//       panelDefault.appendChild(panelBody)
//       panelDefault.appendChild(panelFooter)
//
//     divElementPere.appendChild(panelDefault)
//   });
// }

PanelCreneau.prototype.creerPanel = function()
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
};

Planning.prototype.afficherCrineauxNew = function() {
  this.creneaux.forEach(function(creneau){
       console.log(creneau.jour)
       new PanelCreneau(document.getElementById(creneau.jour),creneau);
   });
}

Planning.prototype.getColoneJour = function(jour) {
  var divElementPere = document.getElementById(jour);
  return divElementPere;
}

c = new Planning('Planning', [4,5,6,7],3, lesSoutenances, Salles);

c.construitColonnesJours();
c.trierCreneaux();
c.afficherCrineauxNew();
c.getColoneJour('04');
