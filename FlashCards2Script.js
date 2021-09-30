const modalWrapper = document.querySelector('.modal-wrapper');
// modal add
const addModal = document.querySelector('.add-modal');
const addModalForm = document.querySelector('.add-modal .form');

// modal edit
const editModal = document.querySelector('.edit-modal');
const editModalForm = document.querySelector('.edit-modal .form');

const btnAdd = document.querySelector('.btn-add');

const tableFlashCardsList = document.querySelector('.table-flashCardsList');

let id;

// Create element and render flashCardsList
const renderUser = doc => {
    const tr = `
    <tr data-id='${doc.id}'>
        <td>${doc.data().title}</td>
        <td>${doc.data().desc}</td>
        <td>
            <button class="btn btn-edit">Edit</button>
            <button class="btn btn-delete">Delete</button>
        </td>
    </tr>`;
    tableFlashCardsList.insertAdjacentHTML('beforeend', tr);

    // Click edit card
    const btnEdit = document.querySelector(`[data-id='${doc.id}'] .btn-edit`)
    btnEdit.addEventListener('click', () => {
        editModal.classList.add('modal-show');

        id = doc.id;
        editModalForm.title.value = doc.data().title;
        editModalForm.desc.value = doc.data().desc;
    })

    // Click delete card
    const btnDelete = document.querySelector(`[data-id='${doc.id}'] .btn-delete`);
    btnDelete.addEventListener('click', () => {
        db.collection('flashCardsList').doc(`${doc.id}`).delete().then(() => {
            console.log('Document successfully deleted!');
        }).catch(err => {
            console.log('Error removing document', err);
        });
    });
}

// Click Add Card button
btnAdd.addEventListener('click', () => {
    addModal.classList.add('modal-show');

    addModalForm.title.value = '';
    addModalForm.desc.value = '';
});

// Real time listener
db.collection('flashCardsList').onSnapshot(snapshot => {
    snapshot.docChanges().forEach(change => {
        if (change.type === 'added'){
            renderUser(change.doc);
        }
        if (change.type === 'removed'){
            let tr = document.querySelector(`[data-id='${change.doc.id}']`);
            let tbody = tr.parentElement;
            tableFlashCardsList.removeChild(tbody);
        }
        if (change.type === 'modified'){
            let tr = document.querySelector(`[data-id='${change.doc.id}']`);
            let tbody = tr.parentElement;
            tableFlashCardsList.removeChild(tbody);
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