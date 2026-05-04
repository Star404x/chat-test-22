module.exports = (req, res) => {
  const html = `<!doctype html>
<html lang="ru">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Mini Portfolio</title>
  <style>
    :root{--bg:#0f1724;--card:#0b1220;--accent:#06b6d4;--text:#e6eef8}
    *{box-sizing:border-box}
    body{margin:0;font-family:Inter, Roboto, Arial, sans-serif;background:linear-gradient(180deg,#071428 0%,#081427 100%);color:var(--text);min-height:100vh}
    .container{max-width:980px;margin:32px auto;padding:20px}
    header{display:flex;align-items:center;gap:16px}
    .avatar{width:84px;height:84px;border-radius:12px;background:linear-gradient(135deg,var(--accent),#7c3aed);display:flex;align-items:center;justify-content:center;font-weight:700}
    h1{margin:0;font-size:1.4rem}
    p.lead{margin:6px 0 20px;color:#bcd6e8}
    .grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:16px}
    .card{background:var(--card);padding:14px;border-radius:10px;box-shadow:0 4px 18px rgba(2,6,23,0.6)}
    .card h3{margin:0 0 8px;font-size:1rem}
    .btn{display:inline-block;padding:8px 12px;background:var(--accent);color:#042;border-radius:8px;text-decoration:none;font-weight:600}
    footer{margin-top:22px;color:#9fb7c9;font-size:0.9rem}
    @media (max-width:420px){.container{padding:12px}.avatar{width:64px;height:64px}}
  </style>
</head>
<body>
  <div class="container">
    <header>
      <div class="avatar">MP</div>
      <div>
        <h1>Имя Фамилия — Mini Portfolio</h1>
        <p class="lead">Front-end / Fullstack разработчик — небольшое адаптивное портфолио для демонстрации работ, резюме и контактов.</p>
        <div>
          <a class="btn" href="#projects">Мои работы</a>
          <a class="btn" href="#contact" style="margin-left:8px;background:#7c3aed;color:#fff">Контакты</a>
        </div>
      </div>
    </header>

    <section id="projects" style="margin-top:18px">
      <h2 style="margin-bottom:8px">Проекты</h2>
      <div class="grid">
        <article class="card">
          <h3>Проект 1</h3>
          <p style="margin:0 0 10px;color:#bcd6e8">Короткое описание проекта, стек, роль и ссылка на демо / репозиторий.</p>
          <a class="btn" href="#" aria-label="Open project 1">Смотреть</a>
        </article>
        <article class="card">
          <h3>Проект 2</h3>
          <p style="margin:0 0 10px;color:#bcd6e8">Короткое описание проекта, стек, роль и ссылка на демо / репозиторий.</p>
          <a class="btn" href="#" aria-label="Open project 2">Смотреть</a>
        </article>
        <article class="card">
          <h3>Проект 3</h3>
          <p style="margin:0 0 10px;color:#bcd6e8">Короткое описание проекта, стек, роль и ссылка на демо / репозиторий.</p>
          <a class="btn" href="#" aria-label="Open project 3">Смотреть</a>
        </article>
      </div>
    </section>

    <section id="resume" style="margin-top:18px">
      <h2 style="margin-bottom:8px">Резюме</h2>
      <div class="card">
        <p style="margin:0;color:#bcd6e8">Краткое резюме, ключевые навыки: JavaScript, Node.js, React, адаптивная верстка, API.</p>
      </div>
    </section>

    <section id="contact" style="margin-top:18px">
      <h2 style="margin-bottom:8px">Контакты</h2>
      <div class="card">
        <p style="margin:0 0 8px;color:#bcd6e8">Почта: <a href="mailto:you@example.com" style="color:var(--accent);text-decoration:none">you@example.com</a></p>
        <p style="margin:0;color:#bcd6e8">LinkedIn / GitHub: добавьте ссылки на ваши профили.</p>
      </div>
    </section>

    <footer>
      <p>Сделано с ♥. Этот сайт разворачивается на Vercel как serverless-функция (api/index.js).</p>
    </footer>
  </div>
</body>
</html>`;
  res.setHeader('Content-Type', 'text/html;charset=utf-8');
  res.statusCode = 200;
  res.end(html);
};
