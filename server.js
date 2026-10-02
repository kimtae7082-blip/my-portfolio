const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// public 폴더를 정적 파일 제공 디렉토리로 설정
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// 포트폴리오 프로젝트 데이터 (새로운 결과물이 생길 때마다 여기에 객체를 추가)
const projects = [
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