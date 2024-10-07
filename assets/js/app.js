import { auth } from './firebase.js';
import { router } from './router.js';

document.addEventListener("DOMContentLoaded", () => {
    // Check for user login state
    // auth.onAuthStateChanged(user => {
    //     if (user) {
    //         router();  // User is signed in, proceed with app
    //     } else {
    //         window.location.pathname = '/auth';  // Redirect to login
    //     }
    // });
});

document.body.addEventListener("click", e => {
    if (e.target.matches("[data-link]")) {
        e.preventDefault();
        history.pushState(null, null, e.target.href);
        router();
    }
});

window.addEventListener("popstate", router);
