// --- Initial State and Data Setup ---

// Check if there are projects in localStorage, if not, load some default sample projects
if (!localStorage.getItem('projects')) {
  const sampleProjects = [
    {
      id: 1,
      title: 'Portfolio Website',
      description: 'A responsive personal portfolio built with HTML and CSS to showcase my skills.',
      tag: 'Web',
      link: 'https://github.com/',
      likes: 5,
      comments: [{ username: 'Alex', text: 'Looks really clean!' }]
    },
    {
      id: 2,
      title: 'Chatbot UI',
      description: 'A simple AI chatbot interface using vanilla JS and CSS grid.',
      tag: 'AI',
      link: 'https://github.com/',
      likes: 12,
      comments: []
    },
    {
      id: 3,
      title: 'Expense Tracker',
      description: 'Mobile friendly expense tracking app for beginners.',
      tag: 'Mobile',
      link: 'https://github.com/',
      likes: 8,
      comments: [{ username: 'Sarah', text: 'Very useful, thanks for sharing.' }]
    }
  ];
  localStorage.setItem('projects', JSON.stringify(sampleProjects));
}

// Retrieve projects from localStorage
let projects = JSON.parse(localStorage.getItem('projects'));

// State variables for currently logged in user
let currentUser = localStorage.getItem('username');

// Get DOM Elements
const usernameModal = document.getElementById('username-modal');
const usernameInput = document.getElementById('username-input');
const saveUsernameBtn = document.getElementById('save-username-btn');
const userInfoDisplay = document.getElementById('user-info');
const projectFeed = document.getElementById('project-feed');
const projectForm = document.getElementById('project-form');
const searchInput = document.getElementById('search-input');
const filterButtons = document.querySelectorAll('.filter-btn');

// --- Initialization ---

// Check if user is logged in
if (!currentUser) {
  // Show modal if no username is found
  usernameModal.classList.add('active');
} else {
  // Update header with username
  updateUserInfo();
}

// Render projects on page load
renderProjects(projects);


// --- Event Listeners ---

// Handle Username submission
saveUsernameBtn.addEventListener('click', () => {
  const username = usernameInput.value.trim();
  if (username) {
    currentUser = username;
    localStorage.setItem('username', currentUser);
    usernameModal.classList.remove('active');
    updateUserInfo();
    renderProjects(projects); // Re-render to update like button states for this user
  }
});

// Handle Project Submission
projectForm.addEventListener('submit', (e) => {
  e.preventDefault(); // Prevent page reload

  // Gather form data
  const title = document.getElementById('title').value;
  const description = document.getElementById('description').value;
  const tag = document.getElementById('tag').value;
  const link = document.getElementById('link').value;

  // Create new project object
  const newProject = {
    id: Date.now(), // Generate a unique ID
    title: title,
    description: description,
    tag: tag,
    link: link,
    likes: 0,
    comments: []
  };

  // Add to array and save to localStorage
  projects.unshift(newProject); // Add to beginning of array
  saveProjects();

  // Re-render feed and reset form
  renderProjects(projects);
  projectForm.reset();
  
  // Also reset filters and search when adding a new project
  searchInput.value = '';
  filterButtons.forEach(btn => btn.classList.remove('active'));
  document.querySelector('.filter-btn[data-tag="All"]').classList.add('active');
});

// Handle Search
searchInput.addEventListener('input', (e) => {
  const searchTerm = e.target.value.toLowerCase();
  
  // Filter projects based on title or description matching search term
  const filteredProjects = projects.filter(project => 
    project.title.toLowerCase().includes(searchTerm) || 
    project.description.toLowerCase().includes(searchTerm)
  );
  
  renderProjects(filteredProjects);
});

// Handle Tag Filtering
filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Remove active class from all buttons
    filterButtons.forEach(btn => btn.classList.remove('active'));
    // Add active class to clicked button
    button.classList.add('active');

    const selectedTag = button.getAttribute('data-tag');
    
    if (selectedTag === 'All') {
      renderProjects(projects);
    } else {
      const filteredProjects = projects.filter(project => project.tag === selectedTag);
      renderProjects(filteredProjects);
    }
    
    // Clear search input when filtering by tag to avoid confusion
    searchInput.value = '';
  });
});


// --- Core Functions ---

function updateUserInfo() {
  userInfoDisplay.textContent = `Logged in as: ${currentUser}`;
}

function saveProjects() {
  localStorage.setItem('projects', JSON.stringify(projects));
}

// Check if the current user has liked a specific project
function hasUserLiked(projectId) {
  if (!currentUser) return false;
  // Get list of liked project IDs for the current user, or empty array if none
  const userLikesKey = `likes_${currentUser}`;
  const likedProjectIds = JSON.parse(localStorage.getItem(userLikesKey)) || [];
  return likedProjectIds.includes(projectId);
}

// Toggle like status for a project
function toggleLike(projectId) {
  if (!currentUser) {
    alert("Please set a username by refreshing the page to like projects.");
    return;
  }

  const userLikesKey = `likes_${currentUser}`;
  let likedProjectIds = JSON.parse(localStorage.getItem(userLikesKey)) || [];
  
  const project = projects.find(p => p.id === projectId);
  
  if (likedProjectIds.includes(projectId)) {
    // User already liked it, so unlike it
    likedProjectIds = likedProjectIds.filter(id => id !== projectId);
    project.likes--;
  } else {
    // User hasn't liked it, so like it
    likedProjectIds.push(projectId);
    project.likes++;
  }

  // Save changes
  localStorage.setItem(userLikesKey, JSON.stringify(likedProjectIds));
  saveProjects();
  
  // Re-render to reflect changes, respecting both tag and search filters
  const activeBtn = document.querySelector('.filter-btn.active');
  const currentTag = activeBtn ? activeBtn.getAttribute('data-tag') : 'All';
  const searchTerm = searchInput.value.toLowerCase();
  
  let filtered = projects;
  if(currentTag !== 'All') {
    filtered = filtered.filter(p => p.tag === currentTag);
  }
  if(searchTerm) {
    filtered = filtered.filter(p => p.title.toLowerCase().includes(searchTerm) || p.description.toLowerCase().includes(searchTerm));
  }
  
  renderProjects(filtered);
}

// Add a comment to a project
function addComment(projectId, commentText) {
  if (!currentUser) {
    alert("Please set a username by refreshing the page to comment.");
    return;
  }

  const project = projects.find(p => p.id === projectId);
  
  project.comments.push({
    username: currentUser,
    text: commentText
  });

  saveProjects();
  
  // Re-render, respecting both tag and search filters
  const activeBtn = document.querySelector('.filter-btn.active');
  const currentTag = activeBtn ? activeBtn.getAttribute('data-tag') : 'All';
  const searchTerm = searchInput.value.toLowerCase();
  
  let filtered = projects;
  if(currentTag !== 'All') {
    filtered = filtered.filter(p => p.tag === currentTag);
  }
  if(searchTerm) {
    filtered = filtered.filter(p => p.title.toLowerCase().includes(searchTerm) || p.description.toLowerCase().includes(searchTerm));
  }
  
  renderProjects(filtered);
}

// Render the project cards to the screen
function renderProjects(projectsToRender) {
  projectFeed.innerHTML = ''; // Clear current feed

  if (projectsToRender.length === 0) {
    projectFeed.innerHTML = '<p>No projects found.</p>';
    return;
  }

  projectsToRender.forEach(project => {
    // Create card container
    const card = document.createElement('div');
    card.className = 'card';

    // Determine if the current user has liked this project
    const isLiked = hasUserLiked(project.id);
    const heartIcon = isLiked ? '❤️' : '🤍';
    const likeBtnClass = isLiked ? 'btn like-btn liked' : 'btn like-btn';

    // Generate HTML for comments
    let commentsHTML = '';
    project.comments.forEach(comment => {
      commentsHTML += `
        <div class="comment">
          <strong>${comment.username}:</strong> ${comment.text}
        </div>
      `;
    });

    // Build card HTML
    card.innerHTML = `
      <div class="card-header">
        <div class="card-title">${project.title}</div>
        <div class="card-tag">${project.tag}</div>
      </div>
      <div class="card-desc">${project.description}</div>
      <a href="${project.link}" target="_blank" class="card-link">View Demo / Code &rarr;</a>
      
      <div class="card-actions">
        <button class="${likeBtnClass}" onclick="toggleLike(${project.id})">
          ${heartIcon} Like
        </button>
        <span class="likes-count">${project.likes} likes</span>
      </div>

      <div class="comments-section">
        <div class="comments-list">
          ${commentsHTML || '<p style="font-size: 13px; color: #6b7280; text-align: center;">No comments yet.</p>'}
        </div>
        <form class="comment-form" onsubmit="handleCommentSubmit(event, ${project.id})">
          <input type="text" class="comment-input" placeholder="Add a comment..." required>
          <button type="submit" class="btn primary-btn" style="padding: 6px 12px; font-size: 13px;">Post</button>
        </form>
      </div>
    `;

    projectFeed.appendChild(card);
  });
}

// Wrapper function for comment form submission from inline HTML
function handleCommentSubmit(event, projectId) {
  event.preventDefault();
  const input = event.target.querySelector('.comment-input');
  const commentText = input.value.trim();
  
  if (commentText) {
    addComment(projectId, commentText);
  }
}
