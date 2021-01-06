# LRWTS #
Расширение для VSCode для меня

![alt text](https://github.com/1amL0st/lrwts/blob/master/showcase/screenshot_1.png?raw=true)

## Зачем? Небольшое предисловие: ##
Являюсь казуальным пользователем Emacs(a). Опыт в районе 2-х месяцев использования. За это время успел привыкнуть к его горячим клавишам так, что не могу от них отвыкнуть. В данном расширении я реализовал всё что мне нужно для работы в VSCode.

## Зависимости: ##
1. [alefragnani.Bookmarks](https://marketplace.visualstudio.com/items?itemName=alefragnani.Bookmarks "alefragnani.Bookmarks") - используется для закладок
2. [zhuangtongfa.Material-theme](https://marketplace.visualstudio.com/items?itemName=zhuangtongfa.Material-theme "zhuangtongfa.Material-theme") - 'One Dark Pro' используется в качестве основной темы
3. [PKief.material-icon-theme](https://marketplace.visualstudio.com/items?itemName=PKief.material-icon-theme "PKief.material-icon-theme") - иконки
4. [wayou.vscode-todo-highlight](https://marketplace.visualstudio.com/items?itemName=wayou.vscode-todo-highlight "wayou.vscode-todo-highlight") - подсветка ключевых слов

## Шрифты: ##
1. [Comic Mono](https://github.com/dtinth/comic-mono-font "Comic Mono") - используется в качестве основного шрифта

## Изменения: ##
1. Урезанные (лишь основные) горячие клавиши из Emacs
2. Ряд визуальных кастомизаций

## Горячие клвиши: ##
1. ctrl+n, ctrl+p, ctrl+f, ctrl+b - курсор вниз, вверх, вправо, влево.
2. ctrl+v, alt+v - страница вниз, вверх
3. ctrl+w, ctrl+y, alt+w - вырезать, вставить, копировать
4. ctrl+space - поставить точку начала выделения
5. ctrl+g - отменить выделение, также используется для отмены большинства действий
6. ctrl+/ - undo
7. alt+f, alt+b - курсор на следующее слово, курсор на предыдущее слово
8. alt+m - выполнить команду
9. ctrl+x f - искать файл в проекте
10. ctrl+s - искать в файле
11. ctrl+a, ctrl+e курсор в начало строки (к первому символу строки), курсор в конец строки
12. alt+g g - перейти к строке
13. ctrl+t s - поставить закладку в заданной строке, повторное использование убирает закладку
14. ctrl+t n - следующая закладка
15. ctrl+t p - предыдущая закладка
16. ctrl+` - курсор в терминал
17. c.rl+1 - курсор в редактор
18. ctrl+d - удалить слово справа от курса с копированием этого слова в буффер
19. alt+g d - перейти к определению
20. alt+s w - выделить текущее слово
21. alt+s q - выделить всё между кавычками (работает как для двойных '"' так и для одинарных ''')
22. alt+. - курсор в конец файла
23. alt+, - курсор в начало файла
24. alt+g f - курсор вперёд (тоже самое что alt+rightArrow)
25. alt+g b - курсор назад (тоже самое что alt+leftArrow)
26. ctrl+q - показать список аргументов функции (Trigger Parameter Hints)
27. ctrl+shift+space - показать список вариантов (показывает список доступных функций)
28. ctrl+c c - закомментировать выделенную область
29. ctrl+c u - раскомментировать выделенную область
30. alt+s r - заменить подстроку подстрокой в выделенной области
31. alt+r r - удалить выделенный прямуогольник

## Ключевые слова ##
Я использую следующие слова:
- **NOTE:**
- **LostRay:**
- **FIXME:**
-  **TODO:**
<br/>Добавить новые слова можно в настройках. Подробности по настройке есть на странице расширения [wayou.vscode-todo-highlight](https://marketplace.visualstudio.com/items?itemName=wayou.vscode-todo-highlight "wayou.vscode-todo-highlight")

## Установка ##
1. Собираем плагин с помощь "yarn vsce package -o ."
2. Устанавливаем в VSCode

## TODO ##
1. Сделать выделение в кавычках умнее (сейчас может не работать во многих случаях, например, если в строке есть другие кавычки)
2. Редактирование "прямоугольников"
