async function fetchRepos() {
    try {
        const response = await fetch('https://api.github.com/users/matt-dong-123/repos');
        const repos = await response.json();
        const filteredRepos = repos.filter(repo => repo.stargazers_count > 0);
        filteredRepos.sort((a, b) => b.stargazers_count - a.stargazers_count);
        const reposList = document.getElementById('repos-list');
        filteredRepos.forEach(repo => {
            const repoDiv = document.createElement('div');
            repoDiv.className = 'repo-item';
            repoDiv.innerHTML = `
                <h3><a href="${repo.html_url}" target="_blank">${repo.name}</a></h3>
                <p>${repo.description || 'No description'}</p>
                <p>Stars: ${repo.stargazers_count} | Forks: ${repo.forks_count}</p>
            `;
            reposList.appendChild(repoDiv);
        });
    } catch (error) {
        console.error('Error fetching repos:', error);
        document.getElementById('repos-list').innerHTML = '<p>Failed to load repositories.</p>';
    }
}
fetchRepos();
