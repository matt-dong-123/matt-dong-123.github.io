import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [repos, setRepos] = useState([])
  const username = 'matt-dong-123'

  useEffect(() => {
    fetch(`https://api.github.com/users/${username}/repos?sort=stars&direction=desc&per_page=10`)
      .then(response => response.json())
      .then(data => setRepos(data))
      .catch(error => console.error('Error fetching repos:', error))
  }, [])

  return (
    <div className="portfolio">
      <header>
        <h1>{username}</h1>
      </header>
      <section>
        <h2>About</h2>
        <p>Hi, I'm Matt. I like to do random stuff. I dunno, maybe do some biotech, econ, and random small utilities from time to time.</p>
      </section>
      <section>
        <h2>Most Starred Repositories</h2>
        <div className="repos">
          {repos.map((repo, index) => (
            <div key={repo.id} className="repo">
              <h3>#{index + 1} <a href={repo.html_url} target="_blank" rel="noopener noreferrer">{repo.name}</a></h3>
              <p>{repo.description || 'No description'}</p>
              <span>⭐ {repo.stargazers_count} | {repo.language}</span>
            </div>
          ))}
        </div>
      </section>
      <section>
        <h2>Contact</h2>
        <p>Email: bruckheim@proton.me</p>
      </section>
    </div>
  )
}

export default App
