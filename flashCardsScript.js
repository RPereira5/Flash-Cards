function newCard(){
    document.getElementById('noCardsTitle').style.display = 'none';
    document.getElementById('noCards').style.display = 'none';
    document.getElementById('cactus').style.display = 'none';
    document.getElementById('newTitleLabel').style.display = 'block';
    document.getElementById('newTitle').style.display = 'block';
    document.getElementById('newDescLabel').style.display = 'block';
    document.getElementById('newDesc').style.display = 'block';
    document.getElementById('submitForm').style.display = 'block';
}

function drawCards(){
    let text = '<div class="accordion accordion-flush" id="accordionCards">';
    for (var i = 0; i < cardList.length; i++) {
        text += '<div class="row align-items-center"><div class="col-md-auto align-self-start"><br>';
        text += '<button type="button" class="btn-close" id="close'+i+' aria-label="Close" data-bs-toggle="modal" data-bs-target="#deletingModal" onclick=showDeletingModal()></button></div>';
        text += '<div class="col-11"><div class="accordion-item">';
        text += '<h2 class="accordion-header" id="flush-heading'+i+'">';
        text += '<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse'+i+'" aria-expanded="false" aria-controls="flush-collapse'+i+'">'+cardList[i].title+'</button></h2>';
        text += '<div id="flush-collapse'+i+'" class="accordion-collapse collapse" aria-labelledby="flush-heading'+i+'">';
        text += '<div class="accordion-body">'+cardList[i].desc+'</div></div></div></div></div>';
    }
    text += "</div>";
    document.getElementById("cards").innerHTML = text;
}

function createNewCard(){
    if (document.getElementById("newTitle").value == ""){
        alert("Please input the card title.");
    }
    else if (document.getElementById("newDesc").value == ""){
        alert("Please input the card description.")
    }
    else {
        const card0 = {title:document.getElementById("newTitle").value, desc:document.getElementById("newDesc").value};
        cardList.push(card0);
        drawCards();
        document.getElementById('newTitle').value = "";
        document.getElementById('newDesc').value = "";
        document.getElementById('newTitleLabel').style.display = 'none';
        document.getElementById('newTitle').style.display = 'none';
        document.getElementById('newDescLabel').style.display = 'none';
        document.getElementById('newDesc').style.display = 'none';
        document.getElementById('submitForm').style.display = 'none';
        document.getElementById('resetButton').style.display = 'block';
    }
}

function showDeletingModal(cardIndex){
    let modalText = '<div class="modal fade" id="deletingModal" tabindex="-1" aria-labelledby="ModalLabel" aria-hidden="true">';
    modalText += '<div class="modal-dialog">';
    modalText += '<div class="modal-content">';
    modalText += '<div class="modal-header">';
    modalText += '<h5 class="modal-title" id="ModalLabel">Delete card?</h5>';
    modalText += '<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div>';
    modalText += '<div class="modal-body">Are you sure you want to <strong>delete this card</strong>? This action cannot be undone.</div>';         
    modalText += '<div class="modal-footer">';
    modalText += '<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>';
    modalText += '<button type="button" class="btn btn-danger" data-bs-dismiss="modal" onclick=deleteCard('+cardIndex+')>Delete</button>';
    modalText += '</div></div></div></div></div>';
    document.getElementById('deletionModal').innerHTML = modalText;
}

function deleteCard(index){
    cardList.splice(index,1);
    drawCards();
    if (cardList[0] == null){
        document.getElementById("cards").innerHTML = null;
        document.getElementById("noCardsTitle").style.display = 'block';
        document.getElementById("noCards").style.display = 'block'
        document.getElementById("cactus").style.display = 'block';
        document.getElementById("resetButton").style.display = 'none';
    }
}

function deleteArray(){
    let cardList = [];
    drawCards();
    document.getElementById("noCardsTitle").style.display = 'block';
    document.getElementById("noCards").style.display = 'block';
    document.getElementById("cactus").style.display = 'block';
    document.getElementById("resetButton").style.display = 'none';
}

function toggleTheme(){
    if (document.getElementById("toggleTheme").innerHTML == "Dark Mode"){
        document.getElementById("mySheet").href = "flashCardsDarkMode.css";
        document.getElementById("toggleTheme").innerHTML = "Light Mode";
        document.getElementById("submitForm").className = "btn btn-info";
    }
    else {
        document.getElementById("mySheet").href = "flashCardsStyle.css";
        document.getElementById("toggleTheme").innerHTML = "Dark Mode";
        document.getElementById("submitForm").className = "btn btn-outline-info";
    }
}