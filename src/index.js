// Простой скрипт для рендеринга списка проектов
document.addEventListener('DOMContentLoaded', function () {
  var projects = [
    {
      title: 'Project One',
      description: 'Короткое описание проекта №1',
      link: '#'
    },
    {
      title: 'Project Two',
      description: 'Короткое описание проекта №2',
      link: '#'
    },
    {
      title: 'Project Three',
      description: 'Короткое описание проекта №3',
      link: '#'
    }
  ];

  var list = document.getElementById('projects-list');
  projects.forEach(function (p) {
    var el = document.createElement('div');
    el.className = 'card';
    el.innerHTML = '<h3>' + p.title + '</h3>' +
      '<p>' + p.description + '</p>' +
      '<p><a href="' + p.link + '">Подробнее</a></p>';
    list.appendChild(el);
  });

  document.getElementById('year').textContent = new Date().getFullYear();
});
