const routes = {
  home: `<h1>Home Page</h1><p>This is the home page content.</p>`,
  about: `<h1>About Page</h1><p>This is the about page content.</p>`,
  contact: `<h1>Contact Page</h1><p>This is the contact page content.</p>`,
};

function navigate(route) {
  const contentDiv = document.getElementById("content");
  contentDiv.innerHTML = routes[route] || `<h1>404</h1><p>Page not found!</p>`;
}

// Handle initial load
window.addEventListener("load", () => {
  const hash = window.location.hash.substring(1); // Remove "#" from the hash
  navigate(hash || "home");
});

// Handle back/forward navigation
window.addEventListener("hashchange", () => {
  const hash = window.location.hash.substring(1);
  navigate(hash || "home");
});
