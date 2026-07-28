export function Footer() {
  return (
    <footer className="mt-auto bg-surface">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 px-5 py-10 text-center text-xs text-muted sm:px-6">
        <span>그날의 나에게 (가칭) — 아이디어 검증 단계입니다.</span>
        <span>&copy; {new Date().getFullYear()} 그날의 나에게</span>
      </div>
    </footer>
  );
}
