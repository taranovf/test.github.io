// Создаем экземпляр Intersection Observer для элементов с классом "item"
const itemObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Если элемент видим, добавляем ему класс для плавного появления
        entry.target.classList.add('item-visible');
        itemObserver.unobserve(entry.target); // Прекращаем отслеживание для данного элемента
      }
    });
  }, { threshold: 0.5 }); // Минимальное значение видимости элемента, при котором срабатывает обработчик
  
  // Получаем все элементы с классом "item" и начинаем отслеживать каждый элемент
  const items = document.querySelectorAll('.item');
  items.forEach(item => {
    itemObserver.observe(item);
  });
  
  // Создаем экземпляр Intersection Observer для элементов с классом "item-s"
  const itemSObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Если элемент видим, добавляем ему класс для плавного появления с задержкой
        setTimeout(() => {
          entry.target.classList.add('item-s-visible');
        }, index * 200); // Задержка появления элемента, умноженная на его индекс
        itemSObserver.unobserve(entry.target); // Прекращаем отслеживание для данного элемента
      }
    });
  }, { threshold: 0.5 }); // Минимальное значение видимости элемента, при котором срабатывает обработчик
  
  // Получаем все элементы с классом "item-s" и начинаем отслеживать каждый элемент
  const itemS = document.querySelectorAll('.item-s');
  itemS.forEach(item => {
    itemSObserver.observe(item);
  });
  