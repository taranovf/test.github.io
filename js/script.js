document.querySelectorAll('.scroll-link').forEach(link => {
    link.addEventListener('click', event => {
      event.preventDefault();
      const targetId = link.getAttribute('data-target');
      document.querySelector(targetId).scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    });
  });