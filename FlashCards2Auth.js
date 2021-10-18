// listen for auth status changes
auth.onAuthStateChanged(user => {
    if (user) {
        db.collection('flashCardsList').onSnapshot(snapshot => {
            setupCards(snapshot.docs);
            setupUI(user);
        }, err => console.log(err.message));
    } else {
        setupUI();
        setupCards([]);
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
        createForm.reset();
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
        const modal = document.querySelector('#modal-login');
        loginModal.classList.remove('modal-show');
        loginForm.reset();
    });
});