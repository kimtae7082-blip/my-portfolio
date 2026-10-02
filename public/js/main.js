document.addEventListener('DOMContentLoaded', () => {
  let allProjects = [];

  // 백엔드 API로부터 프로젝트 데이터를 비동기로 불러옴
  async function fetchProjects() {
    try {
      const response = await fetch('/api/projects');
      if (!response.ok) throw new Error('네트워크 응답 오류');
      allProjects = await response.json();
      renderProjects(allProjects);
    } catch (error) {
      console.error('프로젝트를 불러오는데 실패했습니다:', error);
    }
  }

  // 프로젝트 카드 동적 렌더링
  function renderProjects(projects) {
    const grid = document.getElementById('portfolio-grid');
    grid.innerHTML = '';

    projects.forEach(project => {
      const card = document.createElement('article');
      card.className = 'card';
      
      const tagsHTML = project.tags.map(tag => `<span class="tag">${tag}</span>`).join('');

      card.innerHTML = `
        <div>
          <span class="card-category">${project.category}</span>
          <h2 class="card-title">${project.title}</h2>
          <p class="card-desc">${project.description}</p>
        </div>
        <div>
          <div class="tags">${tagsHTML}</div>
          <a href="${project.link}" class="card-link" target="_blank">자세히 보기 &rarr;</a>
        </div>
      `;
      grid.appendChild(card);
    });
  }

  // 카테고리 필터링 기능
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      filterBtns.forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');

      const category = e.target.getAttribute('data-category');
      if (category === 'all') {
        renderProjects(allProjects);
      } else {
        const filtered = allProjects.filter(p => p.category === category);
        renderProjects(filtered);
      }
    });
  });

  fetchProjects();
});