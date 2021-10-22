// listen for auth status changes
auth.onAuthStateChanged(user => {
    if (user) {
        db.collection('flashCardsList').onSnapshot(snapshot => {
            if (snapshot.docs.length <= 0) {
                noCards.innerHTML = '<div class="noCardsText" style="text-align:center; padding:10rem"><h4><strong>No Cards</strong></h4><h5>Click Add Card to create one.<br></h5><img src="noun_Cactus_1578234.svg" alt="Cactus Vector Image" title="Cactus" width="100px" height="200px"></div>';
            } else {
                console.log("Signed in as",user.email);
                setupUI(user);
                renderCards(snapshot.docs);
                noCards.innerHTML = "";
            }
        }, err => console.log(err.message));
    } else {
        console.log("Logged out.")
        setupUI();
        noCards.innerHTML = '<div class="noCardsText" style="text-align:center; padding:10rem"><h4><strong>No Cards</strong></h4><h5>Log in to show cards.<br></h5><img src="noun_Cactus_1578234.svg" alt="Cactus Vector Image" title="Cactus" width="100px" height="200px"></div>';
    }
});

// signup
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', e => {
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
logout.addEventListener('click', e => {
    e.preventDefault();
    auth.signOut();
    accountModal.classList.remove('modal-show');
    navbar.classList.add('sticky-top');
});

// login
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', e => {
    e.preventDefault();

    // get user info
    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;

    // log in the user
    auth.signInWithEmailAndPassword(email, password).then(_cred => {
        loginModal.classList.remove('modal-show');
        loginForm.reset();
    });
});