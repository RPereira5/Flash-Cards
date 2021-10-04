const modalWrapper = document.querySelector('.modal-wrapper');
// modal add
const addModal = document.querySelector('.add-modal');
const addModalForm = document.querySelector('.add-modal .form');

// modal edit
const editModal = document.querySelector('.edit-modal');
const editModalForm = document.querySelector('.edit-modal .form');

const btnAdd = document.querySelector('.btn-add');
const headerBtnAdd = document.getElementById('addCardButton');

const flashCardsList = document.querySelector('.flashCardsList');

let id;

// Create element and render flashCardsList
const renderUser = doc => {
    const accordion = `
        <div class="accordion accordion-flush" id="accordionCards" data-id='${doc.id}'>
            <div class="accordion-item">
                <h2 class="accordion-header" id="flush-heading${doc.id}">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse${doc.id}" aria-expanded="false" aria-controls="flush-collapse${doc.id}">${doc.data().title}</button>
                </h2>
                <div id="flush-collapse${doc.id}" class="accordion-collapse collapse" aria-labelledby="flush-heading${doc.id}">
                    <div class="accordion-body">${doc.data().desc}</div>
                </div>
            </div>
            <button class="btn btn-delete" id="editBtn${doc.id}" title="Delete this card." style="float:right">Delete</button>
            <button class="btn btn-edit" id="editBtn${doc.id}" title="Edit this card's information." style="float:right">Edit</button>
        </div>`;
    flashCardsList.insertAdjacentHTML('beforeend', accordion);

    // Click edit card
    const btnEdit = document.querySelector(`[data-id='${doc.id}'] .btn-edit`);
    btnEdit.addEventListener('click', () => {
        editModal.classList.add('modal-show');

        id = doc.id;
        editModalForm.title.value = doc.data().title;
        editModalForm.desc.value = doc.data().desc;
    });

    // Click delete card
    const btnDelete = document.querySelector(`[data-id='${doc.id}'] .btn-delete`);
    btnDelete.addEventListener('click', () => {
        db.collection('flashCardsList').doc(`${doc.id}`).delete().then(() => {
            console.log('Document successfully deleted!');
        }).catch(err => {
            console.log('Error removing document: ', err);
        });
    });
}

// Click Add Card button
btnAdd.addEventListener('click', () => {
    addModal.classList.add('modal-show');
     
    addModalForm.title.value = '';
    addModalForm.desc.value = '';
});
headerBtnAdd.addEventListener('click', () => {
    addModal.classList.add('modal-show');

    addModalForm.title.value = '';
    addModalForm.desc.value = '';
});

// Realtime listener
db.collection('flashCardsList').onSnapshot(snapshot => {
    snapshot.docChanges().forEach(change => {
        if (change.type === 'added'){
            renderUser(change.doc);
        }
        if (change.type === 'removed'){
            let tr = document.querySelector(`[data-id='${change.doc.id}']`);
            let tbody = tr.parentElement;
            flashCardsList.removeChild(tbody);
        }
        if (change.type === 'modified'){
            let tr = document.querySelector(`[data-id='${change.doc.id}']`);
            let tbody = tr.parentElement;
            flashCardsList.removeChild(tbody);
            renderUser(change.doc);
        }
    })
})

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
        });
        modalWrapper.classList.remove('modal-show');
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
        });
        editModal.classList.remove('modal-show');
    }
});

function toggleTheme(){
    if (document.getElementById("themeToggler").innerHTML == "Switch to Dark Mode"){
        document.getElementById("themeToggler").innerHTML = "Switch to Light Mode";
        document.getElementById("mySheet").href = "flashCards2Dark.css";
    }
    else {
        document.getElementById("themeToggler").innerHTML = "Switch to Dark Mode";
        document.getElementById("mySheet").href = "flashCards2Light.css";
    }
};