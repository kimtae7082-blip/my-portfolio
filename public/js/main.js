document.addEventListener('DOMContentLoaded', () => {
  let allProjects = [];

  const grid = document.getElementById('portfolio-grid');
  const modal = document.getElementById('project-modal');
  const modalBody = document.getElementById('modal-body');
  const closeBtn = document.querySelector('.close-btn');

  // 백엔드 API에서 데이터 불러오기
  async function fetchProjects() {
    try {
      const response = await fetch('/api/projects');
      if (!response.ok) throw new Error('API 호출 실패');
      allProjects = await response.json();
      renderProjects(allProjects);
    } catch (error) {
      console.error('프로젝트를 불러올 수 없습니다:', error);
    }
  }

  // 카드 렌더링
  function renderProjects(projects) {
    grid.innerHTML = '';

    projects.forEach(project => {
      const card = document.createElement('article');
      card.className = 'card';

      const tagsHTML = project.tags.map(tag => `<span class="tag">${tag}</span>`).join('');

      let buttonsHTML = '';
      if (project.type === 'video' && project.youtubeId) {
        buttonsHTML = `<button class="btn btn-primary open-modal" data-id="${project.id}">영상 보기</button>`;
      } else {
        if (project.demoUrl) {
          buttonsHTML += `<a href="${project.demoUrl}" target="_blank" class="btn btn-primary">웹 앱 방문</a> `;
        }
        if (project.githubUrl) {
          buttonsHTML += `<a href="${project.githubUrl}" target="_blank" class="btn btn-secondary">GitHub</a>`;
        }
      }

      card.innerHTML = `
        <div>
          <span class="card-category">${project.category}</span>
          <h2 class="card-title">${project.title}</h2>
          <p class="card-desc">${project.description}</p>
        </div>
        <div>
          <div class="tags">${tagsHTML}</div>
          <div class="btn-group">${buttonsHTML}</div>
        </div>
      `;
      grid.appendChild(card);
    });

    // 영상 보기 버튼 클릭 이벤트
    document.querySelectorAll('.open-modal').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = parseInt(e.target.getAttribute('data-id'));
        openModal(id);
      });
    });
  }

  // 모달 열기 (유튜브 플레이어 Embed)
  function openModal(id) {
    const project = allProjects.find(p => p.id === id);
    if (!project) return;

    modalBody.innerHTML = `
      <h2>${project.title}</h2>
      <p style="margin-top: 8px; color: #64748b;">${project.description}</p>
      <div class="video-container">
        <iframe src="https://www.youtube.com/embed/${project.youtubeId}" allowfullscreen></iframe>
      </div>
      <div style="margin-top: 15px;">
        <a href="${project.demoUrl}" target="_blank" class="btn btn-primary">유튜브에서 보기</a>
      </div>
    `;
    modal.style.display = 'block';
  }

  // 모달 닫기
  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    modalBody.innerHTML = '';
  });

  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
      modalBody.innerHTML = '';
    }
  });

  // 카테고리 필터링
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