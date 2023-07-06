
export function ajoutListennersAvis(){
    const buttonAvisCliquer = document.querySelectorAll(".fiches article button");

    for(let i=0;i<buttonAvisCliquer.length;i++){

        buttonAvisCliquer[i].addEventListener("click",async function(event){

            const id = event.target.dataset.id ;//recup l'id du btn clique
            const reponse = await fetch(`http://localhost:8081/pieces/${id}/avis`);
            const avis = await reponse.json();//deserialisez les datas

            const paragraphe = document.createElement("p");
            for(let i=0;i<avis.length;i++){
                paragraphe.innerHTML +=`<br> ${avis[i].utilisateur} :<br> ${avis[i].commentaire} <br> nombre etoile : ${avis[i].nbEtoiles} <br>`;
            }
            
            const pieceElement = event.target.parentElement; //recup l'element parent (article)
            pieceElement.appendChild(paragraphe);
        });
    }
}


export function ajoutNouvelleAvis(){
    const formulaireAvis = document.querySelector('.formulaire-avis');

    formulaireAvis.addEventListener('submit',function(event){
        event.preventDefault(); //annule le comportement par defaut du navigateur
        const avis = {
            pieceId : parseInt(event.target.querySelector("[name=piece-id]").value),
            utilisateur : event.target.querySelector("[name=utilisateur]").value,
            commentaire : event.target.querySelector("[name=commentaire]").value,
            nbEtoiles : parseInt(event.target.querySelector("[name=note]").value)
        };

    const chargeUtile = JSON.stringify(avis); //converti l'avis en json

    fetch("http://localhost:8081/avis", {
        method : "POST",
        headers : {"Content-Type" : "application/json"},
        body : chargeUtile
    });
    
    });
}


