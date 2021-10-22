const navbar = document.querySelector('.navbar');
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');

const addBtn = document.getElementById('addCardButton');
const themeToggler = document.getElementById('themeToggler');
const sortBtn = document.getElementById('sortButton');

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

// modal account
const accountBtn = document.getElementById('accountDetails');
const accountModal = document.getElementById('modal-account');
const accountDetails = document.querySelector('.account-details');

// auth
const signupModal = document.querySelector('#modal-signup');
const signupLink = document.querySelector('#signup');
const loginModal = document.querySelector('#modal-login');
const loginLink = document.querySelector('#login');

const flashCardsList = document.querySelector('.flashCardsList');
const noCards = document.querySelector('.noCards');

let id;

const setupUI = user => {
    if (user) { // logged in

        // account info
        db.collection('users').doc(user.uid).get().then(_doc => {
            const html = `<div>Logged in as ${user.email}</div>`;
            accountDetails.innerHTML = html;
        })

        // toggle UI elements
        loggedInLinks.forEach(item => item.style.display = 'block');
        loggedOutLinks.forEach(item => item.style.display = 'none');
        
    } else { // logged out

        // hide account info
        accountDetails.innerHTML = "";

        // toggle UI elements
        loggedInLinks.forEach(item => item.style.display = 'none');
        loggedOutLinks.forEach(item => item.style.display = 'block');
    }
}

// Create element and render flashCardsList
const renderCards = doc => {
    console.log(doc.data());
    const accordion = `
        <div class="accordion accordion-flush" id="accordionCards${doc.id}">
            <div class="accordion-item" data-id='${doc.id}'>
                <h2 class="accordion-header" id="flush-heading${doc.id}">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse${doc.id}" aria-expanded="false" aria-controls="flush-collapse${doc.id}">${doc.data().title}</button>
                </h2>
                <div id="flush-collapse${doc.id}" class="accordion-collapse collapse" aria-labelledby="flush-heading${doc.id}">
                    <div class="accordion-body">${doc.data().desc}
                        <button class="btn btn-delete" id="deleteBtn${doc.id}" title="Delete this card." style="float:right">Delete</button>
                        <button class="btn btn-edit" id="editBtn${doc.id}" title="Edit this card's information." style="float:right">Edit</button>
                        <button class="btn btn-details" id="detailsBtn${doc.id}" title="Show this card's details." style="float:right">Details</button>
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
    addBtn.addEventListener('click', () => {
    addModal.classList.add('modal-show');
    navbar.classList.remove('sticky-top');

    addModalForm.title.value = '';
    addModalForm.desc.value = '';
});

// Click Sign Up
signupLink.addEventListener('click', () => {
    signupModal.classList.add('modal-show');
    navbar.classList.remove('sticky-top');
})

// Click Login
loginLink.addEventListener('click', () => {
    loginModal.classList.add('modal-show');
    navbar.classList.remove('sticky-top');
})

// Click Account
accountBtn.addEventListener('click', () => {
    accountModal.classList.add('modal-show');
    navbar.classList.remove('sticky-top');
})

// Realtime listener
db.collection('flashCardsList').orderBy("dateCreated").onSnapshot(snapshot => {
    snapshot.docChanges().forEach(change => {
        if (change.type === 'added'){
            console.log("Added card");
            renderCards(change.doc);
        }
        if (change.type === 'removed'){
            let accordion0 = document.querySelector(`[data-id='${change.doc.id}']`);
            flashCardsList.removeChild(accordion0.parentElement);
        }
        if (change.type === 'modified'){
            let accordion0 = document.querySelector(`[data-id='${change.doc.id}']`);
            flashCardsList.removeChild(accordion0.parentElement);
            console.log("Modified card");
            renderCards(change.doc);
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
    if(e.target === signupModal) {
        signupModal.classList.remove('modal-show');
        navbar.classList.add('sticky-top');
        signupForm.reset();
    }
    if(e.target === loginModal) {
        loginModal.classList.remove('modal-show');
        navbar.classList.add('sticky-top');
        loginForm.reset();
    }
    if(e.target === accountModal) {
        accountModal.classList.remove('modal-show');
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
        }).then(() => {
            modalWrapper.classList.remove('modal-show');
            navbar.classList.add('sticky-top');
            addModalForm.reset();
        }).catch(err => {
            console.log(err.message);
        })
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

// Click sort cards
sortBtn.addEventListener('click', () => {
    sortModal.classList.add('modal-show');
    navbar.classList.remove('sticky-top');
});

// Click sort buttons (any)
alphaAsc.addEventListener('click', () => {
    flashCardsList.innerHTML = "";
    db.collection('flashCardsList').orderBy("title").get().then (snapshot => snapshot.docs.forEach(doc => renderCards(doc)));
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
    db.collection('flashCardsList').orderBy("title", "desc").get().then (snapshot => snapshot.docs.forEach(doc => renderCards(doc)));
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
    db.collection('flashCardsList').orderBy("dateCreated").get().then (snapshot => snapshot.docs.forEach(doc => renderCards(doc)));
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
    db.collection('flashCardsList').orderBy("dateCreated", "desc").get().then (snapshot => snapshot.docs.forEach(doc => renderCards(doc)));
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
    db.collection('flashCardsList').orderBy("dateModified").get().then (snapshot => snapshot.docs.forEach(doc => renderCards(doc)));
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
    db.collection('flashCardsList').orderBy("dateModified", "desc").get().then (snapshot => snapshot.docs.forEach(doc => renderCards(doc)));
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
    // db.collection('settings').get().then (snapshot => console.log(snapshot.docs));
    if (document.getElementById("themeToggler").innerHTML === "Switch to Dark Mode"){
        document.getElementById("themeToggler").innerHTML = "Switch to Light Mode";
        document.getElementById("mySheet").href = "flashCards2Dark.css";
    }
    else {
        document.getElementById("themeToggler").innerHTML = "Switch to Dark Mode";
        document.getElementById("mySheet").href = "flashCards2Light.css";
    }
});