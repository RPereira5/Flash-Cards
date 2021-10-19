// listen for auth status changes
auth.onAuthStateChanged(user => {
    if (user) {
        db.collection('flashCardsList').onSnapshot(snapshot => {
            if (snapshot.docs.length <= 0) {
                console.log("Success!");
                flashCardsList.innerHTML = '<div class="noCardsText" style="text-align:center"><h4><strong>No Cards</strong></h4><h5>Log in to show cards.<br></h5><img src="noun_Cactus_1578234.svg" alt="Cactus Vector Image" title="Cactus" width="100px" height="200px"></div>';
            } else {
                renderCards(snapshot.docs);
                setupUI(user);
            }
        }, err => console.log(err.message));
    } else {
        setupUI();
        renderCards([]);
    }
});

// add new card
const addForm = document.querySelector('#add-form');
addForm.addEventListener('submit', (e) => {
    e.preventDefault();

    db.collection('flashCardsList').add({
        title: addForm['title'].value,
        desc: addForm['desc'].value
    }).then(() => {
        addModal.classList.remove('modal-show');
        addForm.reset();
    }).catch(err => {
        console.log(err.message);
    })
});

// signup
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // get user info
    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;

    // sign up the user
    auth.createUserWithEmailAndPassword(email, password).then(cred => {
        return db.collection('users').doc(cred.user.uid).set({
            email: signupForm['signup-email'].value
        })
    }).then(() => {
        signupModal.classList.remove('modal-show');
        signupForm.reset();
    });
});

// logout
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut();
});

// login
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // get user info
    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;

    // log in the user
    auth.signInWithEmailAndPassword(email, password).then(cred => {
        loginModal.classList.remove('modal-show');
        loginForm.reset();
    });
});