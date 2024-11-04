document.addEventListener("DOMContentLoaded", () => {
    const githubForm = document.getElementById("github-form");
    const userList = document.getElementById("user-list");
    const reposList = document.getElementById("repos-list");
  
    // Handle form submission
    githubForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const searchInput = document.getElementById("search").value;
  
      if (searchInput) {
        fetchUserData(searchInput);
      }
    });
  
    // Function to fetch user data from GitHub API
    function fetchUserData(username) {
      fetch(`https://api.github.com/users/${username}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("User not found");
          }
          return response.json();
        })
        .then((user) => {
          displayUser(user);
          fetchUserRepos(user.repos_url);
        })
        .catch((error) => {
          console.error(error);
          userList.innerHTML = "<li>User not found</li>";
          reposList.innerHTML = ""; // Clear previous repos
        });
    }
  
    // Function to display user information
    function displayUser(user) {
      userList.innerHTML = `
        <li>
          <img src="${user.avatar_url}" alt="${user.login}" width="50" />
          <a href="${user.html_url}" target="_blank">${user.login}</a>
        </li>
      `;
    }
  
    // Function to fetch user's repositories
    function fetchUserRepos(reposUrl) {
      fetch(reposUrl)
        .then((response) => response.json())
        .then((repos) => {
          displayRepos(repos);
        })
        .catch((error) => {
          console.error("Error fetching repos:", error);
          reposList.innerHTML = "<li>Error fetching repos</li>";
        });
    }
  
    // Function to display user repositories
    function displayRepos(repos) {
      reposList.innerHTML = ""; // Clear previous repos
      repos.forEach((repo) => {
        const li = document.createElement("li");
        li.innerHTML = `
          <a href="${repo.html_url}" target="_blank">${repo.name}</a> - ${repo.description || "No description"}
        `;
        reposList.appendChild(li);
      });
    }
  });
  