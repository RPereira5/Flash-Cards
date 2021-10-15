const navbar = document.querySelector('.navbar');

const modalWrapper = document.querySelector('.modal-wrapper');

// modal add
const addModal = document.querySelector('.add-modal');
const addModalForm = document.querySelector('.add-modal .form');

// modal edit
const editModal = document.querySelector('.edit-modal');
const editModalForm = document.querySelector('.edit-modal .form');

// modal details
const detailsModal = document.querySelector('.details-modal');
const closeDtlsBtn = document.querySelector('.close-details-btn');

// modal delete
const deleteModal = document.querySelector('.delete-modal');
const deleteModalButton = document.querySelector('.btn-delete-modal');
const cancelBtn = document.querySelector('.btn-secondary-modal');

// modal sort
const sortModal = document.querySelector('.sort-modal');
const alphaAsc = document.querySelector('.alphaAsc');
const alphaDesc = document.querySelector('.alphaDesc');
const createdAsc = document.querySelector('.createdAsc');
const createdDesc = document.querySelector('.createdDesc');
const editedAsc = document.querySelector('.editedAsc');
const editedDesc = document.querySelector('.editedDesc');

// modal help
const helpModal = document.querySelector('.help-modal');

const btnAdd = document.querySelector('.btn-add');
const headerBtnAdd = document.getElementById('addCardButton');
const themeToggler = document.getElementById('themeToggler');
const sortBtn = document.getElementById('sortButton');
const helpBtn = document.getElementById('helpBtn');

const flashCardsList = document.querySelector('.flashCardsList');
const settings = document.querySelector('.settings');

const spanAdd = document.getElementById('spanAdd');
const spanSort = document.getElementById('spanSort');
const spanLogin = document.getElementById('spanLogin');
const spanSignup = document.getElementById('spanSignup');

let id;

// Create element and render flashCardsList
const renderCard = doc => {
    const accordion = `
        <div class="accordion accordion-flush" id="accordionCards${doc.id}" >
            <div class="accordion-item" data-id='${doc.id}'>
                <h2 class="accordion-header" id="flush-heading${doc.id}">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse${doc.id}" aria-expanded="false" aria-controls="flush-collapse${doc.id}">${doc.data().title}</button>
                </h2>
                <div id="flush-collapse${doc.id}" class="accordion-collapse collapse" aria-labelledby="flush-heading${doc.id}">
                    <div class="accordion-body">${doc.data().desc}
                        <button class="btn btn-delete" id="deleteBtn${doc.id}" title="Delete this card." style="float:right">Delete</button>
                        <button class="btn btn-edit" id="editBtn${doc.id}" title="Edit this card's information." style="float:right">Edit</button>
                        <button class="btn btn-details" id="detailBtn${doc.id}" title="Show this card's details." style="float:right">Details</button>
                    </div>
                </div>
            </div>
        </div>`;
    flashCardsList.insertAdjacentHTML('beforeend', accordion);

    // Click details
    const btnDetails = document.querySelector(`[data-id='${doc.id}'] .btn-details`);
    btnDetails.addEventListener('click', () => {
        document.getElementById('detailsModalTitle').innerHTML = `<b>Title: </b>${doc.data().title}`
        document.getElementById('detailsModalDesc').innerHTML = `<b>Description: </b>${doc.data().desc}`
        document.getElementById('detailsModalTimestampCreated').innerHTML = `<b>Date Created: </b>${doc.data().dateCreated.toDate().toDateString()}, ${doc.data().dateCreated.toDate().toLocaleTimeString()}`;
        document.getElementById('detailsModalTimestampModified').innerHTML = `<b>Last Modified: </b>${doc.data().dateModified.toDate().toDateString()}, ${doc.data().dateModified.toDate().toLocaleTimeString()}`
        detailsModal.classList.add('modal-show');
        navbar.classList.remove('sticky-top');
    });

    // Click edit
    const btnEdit = document.querySelector(`[data-id='${doc.id}'] .btn-edit`);
    btnEdit.addEventListener('click', () => {
        editModal.classList.add('modal-show');
        navbar.classList.remove('sticky-top');

        id = doc.id;
        editModalForm.title.value = doc.data().title;
        editModalForm.desc.value = doc.data().desc;
    });

    // Click delete (accordion)
    const btnDelete = document.querySelector(`[data-id='${doc.id}'] .btn-delete`);
    btnDelete.addEventListener('click', () => {
        document.getElementById('deleteModalTitle').innerHTML = `<b>Title: </b>${doc.data().title}`
        document.getElementById('deleteModalDesc').innerHTML = `<b>Description: </b>${doc.data().desc}`
        document.getElementById('deleteModalTimestampCreated').innerHTML = `<b>Date Created: </b>${doc.data().dateCreated.toDate().toDateString()}, ${doc.data().dateCreated.toDate().toLocaleTimeString()}`;
        document.getElementById('deleteModalTimestampModified').innerHTML = `<b>Last Modified: </b>${doc.data().dateModified.toDate().toDateString()}, ${doc.data().dateModified.toDate().toLocaleTimeString()}`
        deleteModal.classList.add('modal-show');
        navbar.classList.remove('sticky-top');
        deleteFromDB(doc.id);
    });
}

// Click Add Card
btnAdd.addEventListener('click', () => {
    addModal.classList.add('modal-show');
    navbar.classList.remove('sticky-top');

    addModalForm.title.value = '';
    addModalForm.desc.value = '';
});
headerBtnAdd.addEventListener('click', () => {
    addModal.classList.add('modal-show');
    navbar.classList.remove('sticky-top');

    addModalForm.title.value = '';
    addModalForm.desc.value = '';
});
spanAdd.addEventListener('click', () => {
    helpModal.classList.remove('modal-show');
    addModal.classList.add('modal-show');
    navbar.classList.remove('sticky-top');

    addModalForm.title.value = '';
    addModalForm.desc.value = '';
})

// Realtime listener
db.collection('flashCardsList').orderBy("dateCreated").onSnapshot((snapshot) => {
    snapshot.docChanges().forEach(change => {
        if (change.type === 'added'){
            renderCard(change.doc);
        }
        if (change.type === 'removed'){
            let accordion0 = document.querySelector(`[data-id='${change.doc.id}']`);
            flashCardsList.removeChild(accordion0.parentElement);
        }
        if (change.type === 'modified'){
            let accordion0 = document.querySelector(`[data-id='${change.doc.id}']`);
            flashCardsList.removeChild(accordion0.parentElement);
            renderCard(change.doc);
        }
    })
})

// User clicks outside of modal
window.addEventListener('click', e => {
    if(e.target === addModal) {
        addModal.classList.remove('modal-show');
        navbar.classList.add('sticky-top');
    }
    if(e.target === detailsModal){
        detailsModal.classList.remove('modal-show');
        navbar.classList.add('sticky-top');
    }
    if(e.target === editModal) {
        editModal.classList.remove('modal-show');
        navbar.classList.add('sticky-top');
    }
    if(e.target === deleteModal) {
        deleteModal.classList.remove('modal-show');
        navbar.classList.add('sticky-top');
    }
    if(e.target === sortModal) {
        sortModal.classList.remove('modal-show');
        navbar.classList.add('sticky-top');
    }
    if(e.target === helpModal) {
        helpModal.classList.remove('modal-show');
        navbar.classList.add('sticky-top');
    }
});

// Click submit in add modal
addModalForm.addEventListener('submit', e => {
    e.preventDefault();
    if (addModalForm.title.value == ""){
        alert("Please input a title.");
    }
    else if (addModalForm.desc.value == ""){
        alert("Please input a description.");
    }
    else {
        db.collection('flashCardsList').add({
            title: addModalForm.title.value,
            desc: addModalForm.desc.value,
            dateCreated: new Date(),
            dateModified: new Date()
        });
        modalWrapper.classList.remove('modal-show');
        navbar.classList.add('sticky-top');
    }
});

// Click submit in edit modal
editModalForm.addEventListener('submit', e => {
    e.preventDefault();
    if (editModalForm.title.value == ""){
        alert("Please input a title.");
    }
    else if (editModalForm.desc.value == ""){
        alert("Please input a description.");
    }
    else {
        db.collection('flashCardsList').doc(id).update({
            title: editModalForm.title.value,
            desc: editModalForm.desc.value,
            dateModified: new Date()
        });
        editModal.classList.remove('modal-show');
        navbar.classList.add('sticky-top');
    }
});

// Click delete in delete modal
function deleteFromDB(id){
    deleteModalButton.addEventListener('click', doSomething(id));
};

function doSomething(id){
        db.collection('flashCardsList').doc(id).delete().then(() => {
            console.log('Document', id, 'successfully deleted!');
        }).catch(err => console.log('Error removing document: ', err));
        deleteModal.classList.remove('modal-show');
        navbar.classList.add('sticky-top');
        deleteModalButton.removeEventListener('click', doSomething);
}

// Click help button
helpBtn.addEventListener('click', () => {
    helpModal.classList.add('modal-show');
    navbar.classList.remove('sticky-top');
});

// Click sort cards
sortBtn.addEventListener('click', () => {
    sortModal.classList.add('modal-show');
    navbar.classList.remove('sticky-top');
});
spanSort.addEventListener('click', () => {
    helpModal.classList.remove('modal-show');
    sortModal.classList.add('modal-show');
    navbar.classList.remove('sticky-top');
})

// Click sort buttons (any)
alphaAsc.addEventListener('click', () => {
    flashCardsList.innerHTML = "";
    db.collection('flashCardsList').orderBy("title").get().then ((snapshot) => snapshot.docs.forEach(doc => renderCard(doc)));
    sortModal.classList.remove('modal-show')
    alphaAsc.classList.add('active');
    alphaDesc.classList.remove('active');
    createdAsc.classList.remove('active');
    createdDesc.classList.remove('active');
    editedAsc.classList.remove('active');
    editedDesc.classList.remove('active');
    
});
alphaDesc.addEventListener('click', () => {
    flashCardsList.innerHTML = "";
    db.collection('flashCardsList').orderBy("title", "desc").get().then ((snapshot) => snapshot.docs.forEach(doc => renderCard(doc)));
    sortModal.classList.remove('modal-show');
    alphaDesc.classList.add('active');
    alphaAsc.classList.remove('active');
    createdAsc.classList.remove('active');
    createdDesc.classList.remove('active');
    editedAsc.classList.remove('active');
    editedDesc.classList.remove('active');
});
createdAsc.addEventListener('click', () => {
    flashCardsList.innerHTML = "";
    db.collection('flashCardsList').orderBy("dateCreated").get().then ((snapshot) => snapshot.docs.forEach(doc => renderCard(doc)));
    sortModal.classList.remove('modal-show');
    createdAsc.classList.add('active');
    alphaAsc.classList.remove('active');
    alphaDesc.classList.remove('active');
    createdDesc.classList.remove('active');
    editedAsc.classList.remove('active');
    editedDesc.classList.remove('active');
});
createdDesc.addEventListener('click', () => {
    flashCardsList.innerHTML = "";
    db.collection('flashCardsList').orderBy("dateCreated", "desc").get().then ((snapshot) => snapshot.docs.forEach(doc => renderCard(doc)));
    sortModal.classList.remove('modal-show');
    alphaAsc.classList.remove('active');
    alphaDesc.classList.remove('active');
    createdAsc.classList.remove('active');
    createdDesc.classList.add('active');
    editedAsc.classList.remove('active');
    editedDesc.classList.remove('active');
});
editedAsc.addEventListener('click', () => {
    flashCardsList.innerHTML = "";
    db.collection('flashCardsList').orderBy("dateModified").get().then ((snapshot) => snapshot.docs.forEach(doc => renderCard(doc)));
    sortModal.classList.remove('modal-show');
    editedAsc.classList.add('active');
    alphaAsc.classList.remove('active');
    alphaDesc.classList.remove('active');
    createdAsc.classList.remove('active');
    createdDesc.classList.remove('active');
    editedDesc.classList.remove('active');
});
editedDesc.addEventListener('click', () => {
    flashCardsList.innerHTML = "";
    db.collection('flashCardsList').orderBy("dateModified", "desc").get().then ((snapshot) => snapshot.docs.forEach(doc => renderCard(doc)));
    sortModal.classList.remove('modal-show');
    editedDesc.classList.add('active');
    alphaAsc.classList.remove('active');
    alphaDesc.classList.remove('active');
    createdAsc.classList.remove('active');
    createdDesc.classList.remove('active');
    editedAsc.classList.remove('active');
});

// Click cancel in delete modal
cancelBtn.addEventListener('click', () => {
    deleteModal.classList.remove('modal-show');
    navbar.classList.add('sticky-top');
});

// Click close in details modal
closeDtlsBtn.addEventListener('click', () => {
    detailsModal.classList.remove('modal-show');
    navbar.classList.add('sticky-top');
});

// Change theme button
themeToggler.addEventListener("click", () => {
    // db.collection('settings').get().then ((snapshot) => console.log(snapshot.docs));
    if (document.getElementById("themeToggler").innerHTML === "Switch to Dark Mode"){
        document.getElementById("themeToggler").innerHTML = "Switch to Light Mode";
        document.getElementById("mySheet").href = "flashCards2Dark.css";
        document.getElementById("themeMsg").innerHTML = "If you prefer, change the page theme to light with the \"Switch to Light Theme\" button.";
    }
    else {
        document.getElementById("themeToggler").innerHTML = "Switch to Dark Mode";
        document.getElementById("mySheet").href = "flashCards2Light.css";
        document.getElementById("themeMsg").innerHTML = "If you prefer, change the page theme to dark with the \"Switch to Dark Theme\" button.";
    }
});

/* function toggleTheme(isLightTheme){
    if (isLightTheme === false){
        document.getElementById("themeToggler").innerHTML = "Switch to Light Mode";
        document.getElementById("mySheet").href = "flashCards2Dark.css";
        db.collection('settings').doc(id).update({isLightTheme: true});
    }
    else {
        document.getElementById("themeToggler").innerHTML = "Switch to Dark Mode";
        document.getElementById("mySheet").href = "flashCards2Light.css";
        db.collection('settings').doc(id).update({isLightTheme: false});
    }
}; */