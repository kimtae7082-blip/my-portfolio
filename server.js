const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// CORS 설정
app.use(cors());

// public 폴더를 정적 파일 제공 디렉토리로 설정
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// 포트폴리오 프로젝트 데이터 (새로운 결과물이 생길 때마다 여기에 객체를 추가)
const projects = [
  {
    id: 1,
    title: "실시간 날씨 정보 앱 (Node + FastAPI + MySQL)",
    category: "Web / API",
    description: "Node.js 프론트/웹서버, FastAPI 백엔드, MySQL 데이터베이스를 연동하여 개발한 실시간 날씨 앱입니다. Vercel 및 GitHub에 배포되어 있습니다.",
    tags: ["Node.js", "FastAPI", "MySQL", "JavaScript", "HTML/CSS"],
    type: "web",
    demoUrl: "https://project-lime-psi-25.vercel.app/",
    githubUrl: "https://github.com/kimtae7082-blip/project/tree/main/weather-node-fastapi-mysql-app",
    youtubeId: null
  },
  {
    id: 2,
    title: "AI 뉴스 / AI 저널리즘 영상 콘텐츠",
    category: "Video",
    description: "AI 툴과 생성형 콘텐츠 워크플로우(Runway, ElevenLabs, HeyGen 등)를 활용하여 기획 및 제작한 뉴스 및 정보 전달 영상 프로젝트입니다.",
    tags: ["AI Video", "YouTube", "Content", "Premiere Pro"],
    type: "video",
    demoUrl: "https://www.youtube.com/watch?v=X66iLcSJcc8",
    githubUrl: null,
    youtubeId: "X66iLcSJcc8" // 유튜브 영상 ID
  },
  {
    id: 1,
    title: "AI 제작 영상 콘텐츠",
    category: "Video",
    description: "Runway, Kling 및 HeyGen AI 앵커를 활용하여 제작한 뉴스 영상 프로젝트입니다.",
    tags: ["Runway", "HeyGen", "Premiere Pro", "AI Video"],
    link: "#", // 영상 링크 or Embed URL
    type: "video"
  },
  {
    id: 2,
    title: "실시간 날씨 정보 웹앱",
    category: "Web / API",
    description: "OpenAPI를 연동하여 실시간 날씨 데이터 및 예보 정보를 제공하는 반응형 웹 서비스입니다.",
    tags: ["HTML", "CSS", "JavaScript", "OpenAPI", "Fetch"],
    link: "#",
    type: "web"
  }
];

// 프로젝트 목록 반환 API
app.get('/api/projects', (req, res) => {
  res.json(projects);
});

// 서버 실행
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});