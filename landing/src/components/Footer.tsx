export function Footer() {
  return (
    <footer className="mt-auto">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-2 px-6 py-10 text-center text-xs text-muted">
        <span>그날의 나에게 (가칭) — 아이디어 검증 단계입니다.</span>
        <span>&copy; {new Date().getFullYear()} 그날의 나에게</span>
      </div>
    </footer>
  );
}
