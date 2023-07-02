const reponse = await fetch("pieces-autos.json");
const tabPieces = await reponse.json(); //extraire les element de json

for(let i=0 ; i<5 ; i++){
    //chaque objet est representer par article
    const article = tabPieces[i];

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

   
    //on attaches la balise article a la section fiches
    const sectionFiches = document.querySelector(".fiches");
    const pieceElement = document.createElement("article");

    sectionFiches.appendChild(pieceElement);
    
    pieceElement.appendChild(imageElement);
    pieceElement.appendChild(nomElement);
    pieceElement.appendChild(prixElement);
    pieceElement.appendChild(categorieElement);
    pieceElement.appendChild(stockElement);
}

   const buttonTrier = document.querySelector(".btn-trier");
    buttonTrier.addEventListener("click", function (){
        const copyTablePiece = Array.from(tabPieces); //on fais une copie de de tabPieces pour ne rien melanger;

        copyTablePiece.sort(function(a,b){
            return a.prix - b.prix ;
        });
        console.log(copyTablePiece);
    });

    const buttonFiltre = document.querySelector(".btn-filtre");

    buttonFiltre.addEventListener("click",function (){

        const pieceFiltrees = tabPieces.filter(function(piece){
            return piece.prix <= 35 ;//retourne les prix non negociable
        });
        console.log(pieceFiltrees);
    });

    const buttonTrieDecroissant = document.querySelector(".btn-decroissant");
    buttonTrieDecroissant.addEventListener("click", ()=>{
        const copieTablePiece = Array.from(tabPieces);

        copieTablePiece.sort(function (a,b){
            return b.prix - a.prix ;
        }); 
        console.log(copieTablePiece);
    });

    const buttonFiltreDescription = document.querySelector(".btn-sans-description");
    buttonFiltreDescription.addEventListener("click", ()=> {

        const pieceAvecDescription = tabPieces.filter(function(piece){
            return piece.description;
        });
        console.log(pieceAvecDescription);
    });