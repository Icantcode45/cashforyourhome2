document.addEventListener("DOMContentLoaded", function () {
  const button = document.querySelector('.btn-6');

  button.addEventListener('mouseenter', function (e) {
    const span = button.querySelector('span');
    const rect = button.getBoundingClientRect();
    const relX = e.pageX - rect.left;
    const relY = e.pageY - rect.top;

    span.style.top = relY + 'px';
    span.style.left = relX + 'px';
  });

  button.addEventListener('mouseout', function (e) {
    const span = button.querySelector('span');
    const rect = button.getBoundingClientRect();
    const relX = e.pageX - rect.left;
    const relY = e.pageY - rect.top;

    span.style.top = relY + 'px';
    span.style.left = relX + 'px';
  });
});
