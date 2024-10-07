// Router logic for Google Classroom clone
export const router = async () => {
    const routes = [
        { path: "/", view: () => "views/dashboard.html" },
        { path: "/profile", view: () => "views/profile.html" },
        { path: "/classroom/:id", view: () => "views/classroom.html" },
        { path: "/assignment/:id", view: () => "views/assignment.html" },
        { path: "/submission/:id", view: () => "views/submission.html" }
    ];

    // Get current path and match route
    const pathToRegex = path => new RegExp(`^${path.replace(/:\w+/g, "(.+)")}$`);
    const potentialMatches = routes.map(route => {
        return {
            route: route,
            result: location.pathname.match(pathToRegex(route.path))
        };
    });

    // Find the match
    let match = potentialMatches.find(potentialMatch => potentialMatch.result !== null);

    // Default to dashboard if no match
    if (!match) {
        match = { route: routes[0], result: [location.pathname] };
    }

    // Load the matched page
    const view = await fetch(match.route.view())
        .then(res => res.text())
        .catch(err => console.error("Error loading page:", err));

    document.querySelector("#app").innerHTML = view;

    // Optionally, you can trigger page-specific JavaScript based on the route
};
