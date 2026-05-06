Автоматизация парсинга расписания АНО "Вершина первая помощь" из VK и выкладывание его на сайт с модификацией.
https://github.com/Globalizator/vk-schedule

Принцип работы:
1) Скачивается страница https://vk.com/page-34729581_49195330
2) Парсится, из неё вырезается table с расписанием
3) Ссылки вида href="/away.php?to= заменяются на прямые
4) Полученный результат выкладывается на https://raw.githubusercontent.com/Globalizator/vk-schedule/main/schedule.html
Для активации в первый раз - необходимо в меню гитхаба выбрать Actions - Scrape VK Schedule - Run workflow

Далее результат публикуется на странице https://vershina-first-aid.ru/raspisanie/

Далее на самом хостинге:
1) На сайте под управлением WordPress / Elementor добавляем плагин Code snippets
2) Добавляем новый сниппет с текстом из файла vk_schedule2.snippet, сохраняем и активируем
3)На нужную страницу с расписанием добавляем шорткод [vk_schedule2]
...
Profit!

P.S. Кэш обновляется каждый час. Если надо быстрее - можно раскомментировать в коде сниппета delete_transient('vk_schedule_table');, запустить, а потом закомментить обратно.
