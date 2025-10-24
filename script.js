const addPostBtn = document.getElementById('addPostBtn');
const modal = document.getElementById('modal');
const cancelBtn = document.getElementById('cancelBtn');
const saveBtn = document.getElementById('saveBtn');
const postInput = document.getElementById('postInput');
const postFile = document.getElementById('postFile');
const fileError = document.getElementById('fileError');
const postsContainer = document.getElementById('posts');

let posts = JSON.parse(localStorage.getItem('posts')) || [];

function renderPosts() {
  postsContainer.innerHTML = '';
  posts.forEach((post, index) => {
    const postEl = document.createElement('div');
    postEl.classList.add('post');

    let contentHTML = '';
    if (post.type === 'text') {
      contentHTML = `<p class="text">${post.content}</p>`;
    } else if (post.type === 'image') {
      contentHTML = `<img src="${post.content}" alt="Image Post" class="post-media">`;
    } else if (post.type === 'video') {
      contentHTML = `<video controls src="${post.content}" class="post-media"></video>`;
    } else if (post.type === 'audio') {
      contentHTML = `<audio controls src="${post.content}" class="post-media"></audio>`;
    }

    postEl.innerHTML = `
      ${contentHTML}
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

function dataURLFromFile(file, callback) {
  const reader = new FileReader();
  reader.onload = e => callback(e.target.result);
  reader.readAsDataURL(file);
}

addPostBtn.onclick = () => modal.style.display = 'flex';
cancelBtn.onclick = () => {
  modal.style.display = 'none';
  postInput.value = '';
  postFile.value = '';
  fileError.style.display = 'none';
};

saveBtn.onclick = () => {
  const text = postInput.value.trim();
  const file = postFile.files[0];

  if (!text && !file) return;

  if (file) {
    if (file.size > 2 * 1024 * 1024) { // 2MB limit
      fileError.style.display = 'block';
      return;
    } else {
      fileError.style.display = 'none';
    }

    dataURLFromFile(file, dataURL => {
      let type = 'text';
      if (file.type.startsWith('image')) type = 'image';
      else if (file.type.startsWith('video')) type = 'video';
      else if (file.type.startsWith('audio')) type = 'audio';

      posts.push({ type, content: dataURL, likes: 0 });
      if (text) posts[posts.length-1].textContent = text; // optional caption
      localStorage.setItem('posts', JSON.stringify(posts));
      renderPosts();
    });
  } else {
    posts.push({ type: 'text', content: text, likes: 0 });
    localStorage.setItem('posts', JSON.stringify(posts));
    renderPosts();
  }

  postInput.value = '';
  postFile.value = '';
  modal.style.display = 'none';
};

window.onload = renderPosts;