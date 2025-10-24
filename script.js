const addPostBtn = document.getElementById('addPostBtn');
const modal = document.getElementById('modal');
const cancelBtn = document.getElementById('cancelBtn');
const saveBtn = document.getElementById('saveBtn');
const postInput = document.getElementById('postInput');
const postsContainer = document.getElementById('posts');

let posts = JSON.parse(localStorage.getItem('posts')) || [];

function renderPosts() {
  postsContainer.innerHTML = '';
  posts.forEach((post, index) => {
    const postEl = document.createElement('div');
    postEl.classList.add('post');
    postEl.innerHTML = `
      <p class="text">${post.text}</p>
      <button class="like-btn" onclick="likePost(${index})">❤️ ${post.likes}</button>
    `;
    postsContainer.prepend(postEl);
  });
}

function likePost(index) {
  posts[index].likes++;
  localStorage.setItem('posts', JSON.stringify(posts));
  renderPosts();
}

addPostBtn.onclick = () => modal.style.display = 'flex';
cancelBtn.onclick = () => {
  modal.style.display = 'none';
  postInput.value = '';
};

saveBtn.onclick = () => {
  const text = postInput.value.trim();
  if (!text) return;
  posts.push({ text, likes: 0 });
  localStorage.setItem('posts', JSON.stringify(posts));
  renderPosts();
  postInput.value = '';
  modal.style.display = 'none';
};

window.onload = renderPosts;