# 그날의 나에게 — 랜딩 페이지

과거 시장 사건을 다시 체험하는 투자 심리 학습 서비스의 가설 검증용 랜딩 페이지입니다.
Next.js(App Router) + Tailwind CSS로 만들었고, 이메일 신청은 Vercel Postgres에 저장됩니다.

## 로컬 개발

```bash
npm install
npm run dev
```

`http://localhost:3000` 에서 확인할 수 있습니다. 로컬에서는 `POSTGRES_URL`이 없으면
`/api/subscribe` 호출이 500을 반환합니다(폼에는 "잠시 후 다시 시도해주세요" 메시지가
노출됩니다). DB까지 로컬에서 테스트하려면 아래 3번 항목을 먼저 진행하세요.

## Vercel 배포

### 1. Vercel 프로젝트 생성

이 저장소를 GitHub에 올린 뒤, [Vercel 대시보드](https://vercel.com/new)에서 Import 합니다.

- **Root Directory**: `landing` 으로 지정 (모노레포이므로 반드시 설정)
- Framework Preset은 Next.js가 자동으로 인식됩니다.

### 2. Postgres 연결

Vercel 프로젝트의 **Storage** 탭에서 Postgres(또는 Neon) 데이터베이스를 생성하고
이 프로젝트에 연결하세요. 연결하면 `POSTGRES_URL` 등 필요한 환경변수가 자동으로
프로젝트에 주입됩니다. 테이블은 `/api/subscribe`가 첫 호출 시 자동으로 생성합니다
(`subscribers` 테이블, `email` unique).

### 3. 로컬에서 같은 DB로 테스트하고 싶다면

```bash
npm i -g vercel
vercel link
vercel env pull .env.local
npm run dev
```

### 4. 배포

Vercel 프로젝트를 GitHub에 연결해두면 `main` 브랜치에 push할 때마다 자동 배포됩니다.
수동 배포는 `vercel --prod` 로도 가능합니다.

## 수집된 이메일 확인

Vercel 대시보드의 Storage → 연결한 DB → Query 탭에서 아래 쿼리로 확인할 수 있습니다.

```sql
select email, source, created_at from subscribers order by created_at desc;
```
