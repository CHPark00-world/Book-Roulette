# 책방 📚

> AI가 추천해주는 나만의 책방, 다독러들과 함께하는 독서 커뮤니티

🔗 **배포 링크**: [https://book-roulette.vercel.app](https://book-roulette.vercel.app)

---

## 소개

책방은 AI와의 대화를 통해 나에게 맞는 책을 추천받고, 다른 독서 애호가들과 자유롭게 소통할 수 있는 웹 서비스입니다.

---

## 기술 스택

| 분류     | 기술                         |
| -------- | ---------------------------- |
| Frontend | React, TypeScript, Vite      |
| Styling  | Tailwind CSS                 |
| 상태관리 | Zustand                      |
| Backend  | Supabase (DB, Auth, Storage) |
| AI       | Claude API (Anthropic)       |
| API      | 알라딘 Open API              |
| 배포     | Vercel                       |

---

## 주요 기능

### 🤖 AI 도서 추천

- Claude AI와 스무고개 방식의 대화를 통해 취향에 맞는 책 추천
- 알라딘 API 연동으로 책 상세 정보 제공

### 🔐 인증

- 이메일 회원가입 / 로그인
- Zustand를 활용한 전역 인증 상태 관리
- 세션 유지

### 💬 커뮤니티 (자유 북토크 / 릴레이 독후감 / 고유 필사)

- 게시글 작성 / 삭제
- 이미지 첨부 (Supabase Storage)
- 좋아요 기능 (중복 방지)
- 댓글 작성 / 삭제
