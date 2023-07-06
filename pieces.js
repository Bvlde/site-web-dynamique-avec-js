import { ajoutListennersAvis } from "./avis.js";


const reponse = await fetch("http://localhost:8081/pieces");
const tabPieces = await reponse.json(); //extraire les element de json

function genererPiece(listePiece){
    
for(let i=0 ; i<listePiece.length ; i++){
    //chaque objet est representer par article
    const article = listePiece[i];

    //creation des balises
    const imageElement = document.createElement("img");
    imageElement.src = article.image;
    
    const nomElement = document.createElement("h2");
    nomElement.innerText = article.nom ;
    
    const prixElement= document.createElement("p");
    prixElement.innerText = `prix : ${article.prix} £`;
    
    const categorieElement = document.createElement("p");
    categorieElement.innerText = article.categorie ?? "(aucune categorie)";
    
    const descriptionElement =  document.createElement("p");
    descriptionElement.innerText = article.description ?? "pas de description pour le moment";

    const stockElement = document.createElement("p");
    stockElement.innerText = article.disponibilite ? "En stock" : "En rupture de stock";
    
    //creation du button avis client
    const avisButton = document.createElement("button");
    avisButton.dataset.id = article.id;
    avisButton.textContent = "Afficher les avis" ;


    //on attaches la balise article a la section fiches
    const sectionFiches = document.querySelector(".fiches");
    const pieceElement = document.createElement("article");
    sectionFiches.appendChild(pieceElement);
    
    pieceElement.appendChild(imageElement);
    pieceElement.appendChild(nomElement);
    pieceElement.appendChild(prixElement);
    pieceElement.appendChild(categorieElement);
    pieceElement.appendChild(stockElement);
    pieceElement.appendChild(avisButton);
    }
    ajoutListennersAvis();
}
//appelle de la fonction
genererPiece(tabPieces);

//button pour trier les prix par ordre croissant

   const buttonTrier = document.querySelector(".btn-trier");
    buttonTrier.addEventListener("click", function (){
        const copyTableTrier = Array.from(tabPieces); //on fais une copie de de tabPieces pour ne rien melanger;
        copyTableTrier.sort(function(a,b){
            return a.prix - b.prix ;
        });
        document.querySelector(".fiches").innerHTML="";
        genererPiece(copyTableTrier);
        
    });

    //button pour filtrer les prix abordables
    const buttonFiltre = document.querySelector(".btn-filtre");
    buttonFiltre.addEventListener("click",function (){

        const pieceFiltrees = tabPieces.filter(function(piece){
            return piece.prix <= 35 ;//retourne les prix non negociable
        });
        document.querySelector('.fiches').innerHTML = "";
        genererPiece(pieceFiltrees);
        
    });

    //button pour trier les prix par ordre decroissant
    const buttonTrieDecroissant = document.querySelector(".btn-decroissant");
    buttonTrieDecroissant.addEventListener("click", ()=>{
        const copieTableDecroissant = Array.from(tabPieces);

        copieTableDecroissant.sort(function (a,b){
            return b.prix - a.prix ;
        }); 
        document.querySelector('.fiches').innerHTML = "";
        genererPiece(copieTableDecroissant);
        
    });

    //filtrer(enlever) les pieces sans description
    const buttonFiltreDescription = document.querySelector(".btn-sans-description");
    buttonFiltreDescription.addEventListener("click", ()=> {

        const pieceAvecDescription = tabPieces.filter(function(piece){
            return piece.description;
        });
        document.querySelector('.fiches').innerHTML = "";
        genererPiece(pieceAvecDescription);
    });

    //filtrer par prix maximum
    let range = document.querySelector('#Prix-Max');
    range.addEventListener("input",()=>{
        const prixFiltres = tabPieces.filter(function(piece){
            return piece.prix <= range.value;
        });
        document.querySelector('.fiches').innerHTML = "";
        genererPiece(prixFiltres);
         
    })

    // part 2

    //Affichage d'une liste des prix abordables
    const tabNom = tabPieces.map(pieces => pieces.nom);//fonction lambda

    for(let i = tabPieces.length-1; i>=0; i--){
        if(tabPieces[i].prix > 35){
            tabNom.splice(i,1);  
        }
    }
    
    //creation de la liste ul
    const ul = document.createElement("ul");
    for(let piece of tabNom){
        const li = document.createElement("li");
        li.innerText = piece;
        ul.appendChild(li);
    }
    document.querySelector(".Abordable").appendChild(ul);

    const tabPrixDisponible = tabPieces.map(piece => piece.prix);//recup tout les prix
    const tabNomDisponible = tabPieces.map(piece => piece.nom);//recup les noms

    for(let i = tabPieces.length-1; i>=0; i--){
        if(tabPieces[i].disponibilite === false){
            tabPrixDisponible.splice(i,1);
            tabNomDisponible.splice(i,1);
        }
    }
   
    const ull = document.createElement("ul")
   
    for(let i=0; i<tabNomDisponible.length;i++){
        const li = document.createElement("li");
        li.innerText = `${tabNomDisponible[i]} -- ${tabPrixDisponible[i]} £`;
        ull.appendChild(li);
    }
    document.querySelector(".p-disponible").appendChild(ull);
