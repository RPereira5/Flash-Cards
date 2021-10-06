const modalWrapper = document.querySelector('.modal-wrapper');
// modal add
const addModal = document.querySelector('.add-modal');
const addModalForm = document.querySelector('.add-modal .form');

// modal edit
const editModal = document.querySelector('.edit-modal');
const editModalForm = document.querySelector('.edit-modal .form');

// modal delete
const deleteModal = document.querySelector('.delete-modal');
const deleteModalButton = document.querySelector('.btn-delete-modal');

const btnAdd = document.querySelector('.btn-add');
const headerBtnAdd = document.getElementById('addCardButton');

const flashCardsList = document.querySelector('.flashCardsList');

let id;

// Create element and render flashCardsList
const renderUser = doc => {
    const accordion = `
        <div class="accordion accordion-flush" id="accordionCards" >
            <div class="accordion-item" data-id='${doc.id}'>
                <h2 class="accordion-header" id="flush-heading${doc.id}">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse${doc.id}" aria-expanded="false" aria-controls="flush-collapse${doc.id}">${doc.data().title}</button>
                </h2>
                <div id="flush-collapse${doc.id}" class="accordion-collapse collapse" aria-labelledby="flush-heading${doc.id}">
                    <div class="accordion-body">${doc.data().desc}
                        <button class="btn btn-delete" id="editBtn${doc.id}" title="Delete this card." style="float:right">Delete</button>
                        <button class="btn btn-edit" id="editBtn${doc.id}" title="Edit this card's information." style="float:right">Edit</button>
                    </div>
                </div>
            </div>
        </div>`;
    flashCardsList.insertAdjacentHTML('beforeend', accordion);

    // Click edit
    const btnEdit = document.querySelector(`[data-id='${doc.id}'] .btn-edit`);
    btnEdit.addEventListener('click', () => {
        editModal.classList.add('modal-show');

        id = doc.id;
        editModalForm.title.value = doc.data().title;
        editModalForm.desc.value = doc.data().desc;
    });

    // Click delete
    const btnDelete = document.querySelector(`[data-id='${doc.id}'] .btn-delete`);
    btnDelete.addEventListener('click', () => {
        deleteModal.classList.add('modal-show');
        id = doc.id;
        document.getElementById('deleteModalTitle').innerHTML = `Title: ${doc.data().title}`
        document.getElementById('deleteModalDesc').innerHTML = `Description: ${doc.data().desc}`
        document.getElementById('deleteModalTimestamp').innerHTML = `Date Created: ${doc.data().date.toDate()}`;
        document.getElementById('deleteModalId').innerHTML = id;
    });
}

// Click Add Card
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
            let accordion = document.querySelector(`[data-id='${change.doc.id}']`);
            flashCardsList.removeChild(accordion.parentElement);
        }
        if (change.type === 'modified'){
            let accordion = document.querySelector(`[data-id='${change.doc.id}']`);
            flashCardsList.removeChild(accordion.parentElement);
            renderUser(change.doc);
        }
    })
})

// User clicks outside of modal
window.addEventListener('click', e => {
    if(e.target === addModal) {
        addModal.classList.remove('modal-show');
    }
    if(e.target === editModal) {
        editModal.classList.remove('modal-show');
    }
    if(e.target === deleteModal) {
        deleteModal.classList.remove('modal-show');
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
            date: new Date()
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

// Click delete in delete modal
deleteModalButton.addEventListener('click', e => {
    e.preventDefault();
    db.collection('flashCardsList').doc(id).delete().then(() => {
        console.log('Document successfully deleted!');
    }).catch(err => {
        console.log('Error removing document: ', err);
    });
})


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