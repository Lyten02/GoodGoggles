// ==UserScript==
// @name         Brave Goggles Auto-switch (GoodGoggles)
// @namespace    https://search.brave.com/
// @version      0.1.0
// @description  Auto-apply different Goggles based on keywords in query (configure your Goggles URLs below)
// @match        https://search.brave.com/search*
// @run-at       document-start
// ==/UserScript==

(() => {
  // Paste *raw URL* to your hosted .goggle files here.
  // Example:
  // const GOGGLES = { movies: "https://raw.githubusercontent.com/<user>/<repo>/main/goggles/movies-legal.goggle" };
  const GOGGLES = {
    general: "",
    movies: "",
    ratings: "",
    downloads: "",
  };

  const url = new URL(window.location.href);
  const query = (url.searchParams.get("q") || "").trim();
  const currentGogglesId = url.searchParams.get("goggles_id");

  if (!query || currentGogglesId) return;

  const rules = [
    { re: /(оценка|рейтинг|отзыв(ы)?)/i, gogglesId: GOGGLES.ratings },
    { re: /(фильм|сериал|аниме|мульт|смотреть|онлайн|online)/i, gogglesId: GOGGLES.movies },
    { re: /(скачать|download)/i, gogglesId: GOGGLES.downloads },
  ];

  const matched = rules.find((r) => r.gogglesId && r.re.test(query));
  const gogglesId = matched?.gogglesId || GOGGLES.general;
  if (!gogglesId) return;

  url.searchParams.set("goggles_id", gogglesId);
  window.location.replace(url.toString());
})();
