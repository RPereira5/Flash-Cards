function newCard(){
    document.getElementById('newTitleLabel').style.display='block';
    document.getElementById('newTitle').style.display='block';
    document.getElementById('newDescLabel').style.display='block';
    document.getElementById('newDesc').style.display='block';
    document.getElementById('submitForm').style.display='block';
}

function createNewCard(){
    if (document.getElementById("newTitle").value == ""){
        alert("Please input the card title.");
    }
    else if (document.getElementById("newDesc").value == ""){
        alert("Please input the card description.")
    }
    else {
        let text = '<div class="accordion" id="accordionHeader"><div class="accordion-item"><h2 class="accordion-header" id="headingOne">';
        const card0 = {title:document.getElementById("newTitle").value, desc:document.getElementById("newDesc").value};
        cardList.push(card0);
        for (var i = 0; i < cardList.length; i++) {
            text += '<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse'+[i]+'" aria-expanded="false" aria-controls="collapse+">' + cardList[i].title + '</button> </h2>';
            text += '<button type="button" class="btn btn-outline-info" data-bs-toggle="modal" data-bs-target="#deletingModal">Delete card</button>';
            //text += '<button type="button" class="btn-close" id="close'+[i]+'" aria-label="Close" onclick=deleteCard('+i+')></button>';
            text += '<div id="collapse'+[i]+'" class="accordion-collapse collapse" aria-labelledby="heading'+[i]+'" data-bs-parent="#accordionHeader"> <div class="accordion-body">' + cardList[i].desc + '</div></div></div></div>';
        }
        document.getElementById("cards").innerHTML = text;

        document.getElementById("newTitle").value = "";
        document.getElementById("newDesc").value = "";
        document.getElementById('newTitleLabel').style.display='none';
        document.getElementById('newTitle').style.display='none';
        document.getElementById('newDescLabel').style.display='none';
        document.getElementById('newDesc').style.display='none';
        document.getElementById('submitForm').style.display='none';
    }
}

function deleteCard(index){
    cardList.splice(index,1);
    let text = '<div class="accordion" id="accordionHeader"><div class="accordion-item"><h2 class="accordion-header" id="headingOne">';
    for (var i = 0; i < cardList.length; i++) {
        text += '<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse'+[i]+'" aria-expanded="false" aria-controls="collapse+">' + cardList[i].title + '</button> </h2>';
        text += '<button type="button" class="btn btn-outline-info" data-bs-toggle="modal" data-bs-target="#deletingModal">Delete card</button>';
        //text += '<button type="button" class="btn-close" id="close'+[i]+'" aria-label="Close" data-bs-toggle="modal" data-bs-target="#DeletionModal"></button>';
        text += '<div id="collapse'+[i]+'" class="accordion-collapse collapse" aria-labelledby="heading'+[i]+'" data-bs-parent="#accordionHeader"> <div class="accordion-body">' + cardList[i].desc + '</div></div></div></div>';
    }
    document.getElementById("cards").innerHTML = text;
}