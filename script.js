    const gallery = document.getElementById('gallery');
    const posts = [
      { src: 'https://raw.githubusercontent.com/SKR0411/Sujan-Social/Assets/photo1.jpg', caption: 'Working on my latest app.', date: 'Oct 20, 2025' },
      { src: 'https://raw.githubusercontent.com/SKR0411/Sujan-Social/Assets/photo2.jpg', caption: 'College life at Gurucharan University.', date: 'Sep 12, 2025' },
      { src: 'https://raw.githubusercontent.com/SKR0411/Sujan-Social/Assets/photo3.jpg', caption: 'Exploring data visualization.', date: 'Aug 28, 2025' }
    ];

    posts.forEach(post => {
      const div = document.createElement('div');
      div.className = 'photo-card';
      div.innerHTML = `
        <img src="${post.src}" alt="Photo">
        <div class="photo-info">
          <small>${post.date}</small>
          <p>${post.caption}</p>
        </div>
      `;
      gallery.appendChild(div);
    });
