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
        let text = '<div class="accordion accordion-flush" id="accordionCards">';
        for (var i = 0; i < cardList.length; i++) {
            // text += '<div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample"><div class="accordion-body">Placeholder content for this accordion. This is the first item\'s accordion body.</div></div></div><div class="accordion-item"><h2 class="accordion-header" id="flush-headingTwo"><button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">Accordion Item #2</button></h2><div id="flush-collapseTwo" class="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample"><div class="accordion-body">Placeholder content for this accordion. This is the second item\'s accordion body. </div></div></div><div class="accordion-item"><h2 class="accordion-header" id="flush-headingThree"><button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">Accordion Item #3</button></h2><div id="flush-collapseThree" class="accordion-collapse collapse" aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushExample"><div class="accordion-body">Placeholder content for this accordion.</div></div></div></div>';
            text += '<div class="accordion-item"><h2 class="accordion-header" id="flush-heading'+[i]+'"><button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse'+[i]+'" aria-expanded="false" aria-controls="flush-collapse'+[i]+'">'+ cardList[i].title + '</button> </h2>';
            text += '<button type="button" class="btn-close" id="close'+[i]+' aria-label="Close" data-bs-toggle="modal" data-bs-target="#deletingModal"></button>';
            text += '<div id="flush-collapse'+[i]+'" class="accordion-collapse collapse" aria-labelledby="flush-heading'+[i]+'" data-bs-parent="#accordionFlushHeader"> <div class="accordion-body">' + cardList[i].desc + '</div></div></div></div>';
        }
        document.getElementById("cards").innerHTML = text;

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

function deleteCard(index){
    cardList.splice(index,1);
    let text = '<div class="accordion accordion-flush" id="accordionCards">';
    for (var i = 0; i < cardList.length; i++) {
        text += '<div class="accordion-item"><h2 class="accordion-header" id="heading'+[i]+'"><button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse'+[i]+'" aria-expanded="false" aria-controls="collapse+">' + cardList[i].title + '</button> </h2>';
        text += '<button type="button" class="btn-close" id="close'+[i]+' aria-label="Close" data-bs-toggle="modal" data-bs-target="#deletingModal"></button>';
        text += '<div id="collapse'+[i]+'" class="accordion-collapse collapse" aria-labelledby="heading'+[i]+'" data-bs-parent="#accordionHeader"> <div class="accordion-body">' + cardList[i].desc + '</div></div></div></div>';
    }
    document.getElementById("cards").innerHTML = text;
    if (cardList[0] == null){
        document.getElementById("cards").innerHTML = null;
        document.getElementById("noCardsTitle").style.display = 'block';
        document.getElementById("noCards").style.display = 'block'
        document.getElementById("cactus").style.display = 'block';
    }
}

function deleteArray(){
    let cardList = [];
    let text = '<div class="accordion" id="accordionHeader">';
    for (var i = 0; i < cardList.length; i++) {
        text += '<div class="accordion-item"><h2 class="accordion-header" id="heading'+[i]+'><button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse'+[i]+'" aria-expanded="false" aria-controls="collapse+">' + cardList[i].title + '</button> </h2>';
        text += '<button type="button" class="btn-close" id="close'+[i]+' aria-label="Close" data-bs-toggle="modal" data-bs-target="#deletingModal" title="Delete card"></button>';
        text += '<div id="collapse'+[i]+'" class="accordion-collapse collapse" aria-labelledby="heading'+[i]+'" data-bs-parent="#accordionHeader"> <div class="accordion-body">' + cardList[i].desc + '</div></div></div></div>';
    }
    document.getElementById("cards").innerHTML = text;
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