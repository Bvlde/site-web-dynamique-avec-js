
export function ajoutListennersAvis(){
    const buttonAvisCliquer = document.querySelectorAll(".fiches article button");

    for(let i=0;i<buttonAvisCliquer.length;i++){

        buttonAvisCliquer[i].addEventListener("click",async function(event){

            const id = event.target.dataset.id ;//recup l'id du btn clique
            const reponse = fetch(`http://localhost:8081/pieces/${id}/avis`);

            const avis = await reponse.json();//deserialisez les datas
            const pieceElement = event.target.parentElement;

            const avisElement = document.createElement("p");
            for(let i=0;i<avis.length;i++){
                avisElement.innerHTML +=`<br> ${avis[i].utilisateur} :<br> ${avis[i].commentaire} <br>`;
            }

            pieceElement.appendChild(avisElement);
            
        });
    }
}

