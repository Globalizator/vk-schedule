Автоматизация парсинга расписания АНО "Вершина первая помощь" из VK и выкладывание его на сайт с модификацией.
https://github.com/Globalizator/vk-schedule

Принцип работы:
1) С помощью GitHub Action cкачивается страница https://vk.com/page-34729581_49195330
2) Парсится код, из неё вырезается table с расписанием
3) Ссылки вида href="/away.php?to= заменяются на прямые
4) Полученный результат выкладывается на https://raw.githubusercontent.com/Globalizator/vk-schedule/main/schedule.html
Для активации в первый раз - необходимо в меню гитхаба выбрать Actions - Scrape VK Schedule - Run workflow

Далее результат публикуется на странице https://vershina-first-aid.ru/raspisanie/ следующим механизмом:

На самом хостинге сайта:
1) На сайте под управлением WordPress / Elementor добавляем плагин Code snippets
2) Добавляем новый сниппет с текстом из файла vk_schedule2.snippet, сохраняем и активируем
3) На нужную страницу с расписанием добавляем шорткод [vk_schedule2]
...
Profit!
Также можно указать Custom CSS для применения отдельного стиля к HTML коду, например:

.wk_ext_link {
  color: blue !important;                    /* цвет ссылки */
  transition: all 0.2s ease;      /* плавное изменение свойств */
  text-decoration: underline;     /* подчёркивание */
}

.wk_ext_link:hover {
  color: green !important;                   /* при наведении */
  font-size: calc(1em + 1pt);    /* увеличиваем шрифт на 1 пункт относительно текущего */
}

th{
    background-color: black !important;  
    color: white !important;  
    border-color: white !important;   /* если нужны видимые границы */
}

P.S. Кэш обновляется каждый час. Если надо обновить вручную - можно раскомментировать в коде сниппета delete_transient('vk_schedule_table');, запустить, а потом закомментить обратно.
