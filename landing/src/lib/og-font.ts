// next/og (Satori) can't rasterize glyphs it doesn't have font data for, and Satori
// needs raw TrueType data rather than the WOFF2 that Google normally serves. Requesting
// with an old-browser User-Agent makes Google Fonts fall back to TTF, and passing `text`
// gets us a subset containing only the glyphs we actually render.
const LEGACY_USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/535.11 (KHTML, like Gecko) Chrome/17.0.963.56 Safari/535.11";

export async function loadKoreanFont(text: string): Promise<ArrayBuffer | null> {
  try {
    const uniqueChars = Array.from(new Set(text.split(""))).join("");
    const cssUrl = `https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@700&text=${encodeURIComponent(uniqueChars)}`;
    const cssResponse = await fetch(cssUrl, {
      headers: { "User-Agent": LEGACY_USER_AGENT },
    });
    if (!cssResponse.ok) return null;

    const css = await cssResponse.text();
    const match = css.match(/src: url\(([^)]+)\)/);
    if (!match) return null;

    const fontResponse = await fetch(match[1]);
    if (!fontResponse.ok) return null;

    return await fontResponse.arrayBuffer();
  } catch {
    return null;
  }
}
