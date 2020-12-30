# LRWTS #
Расширение для VSCode для меня

## Зачем? Небольшое предисловие: ##
Являюсь казуальным пользователем Emacs(a). Опыт в районе 2-х месяцев использования. За это время успел привыкнуть к его горячим клавишам так, что не могу от них отвыкнуть. В данном расширении я реализовал всё что мне нужно для работы в VSCode.

Зависимости:
1. "alefragnani.Bookmarks" - используется для закладок
2. "zhuangtongfa.Material-theme" - 'One Dark Pro' используется в качестве основной темы
3. "PKief.material-icon-theme" - иконки

Шрифты:   
1. "Comic Mono" - используется в качестве основного шрифта (https://github.com/dtinth/comic-mono-font)

## Шрифты: ##
1. "Comic Mono" - используется в качестве основного шрифта (https://github.com/dtinth/comic-mono-font)

## Изменения: ##
1. Урезанные (лишь основные) горячие клавиши из Emacs
2. Ряд визуальных кастомизаций

## Горячие клвиши: ##
1. ctrl+n, ctrl+p, ctrl+f, ctrl+b - курсор вниз, вверх, вправо, влево.
2. ctrl+v, alt+v - страница вниз, вверх
3. ctrl+w, ctrl+y, alt+w - вырезать, вставить, копировать
4. ctrl+space - поставить точку начала выделения
5. ctrl+g - отменить выделине, также используется для отмены большинств действий
6. ctrl+/ - undo
7. alt+f, alt+b - курсор на следующеей слово, курсор на предыдущие слово
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
18. ctrl+d - удалить слово справа от курса с копирование этого слова в буффер
19. alt+g d - перейти к определиню
20. alt+s w - выделить текущее слово
21. alt+s q - выделить всё между кавчками (работает как для двойных '"' так и для одинарных ''')
22. alt+. - курсор в конец файла
23. alt+, - курсор в начало файла
24. alt+g f - курсор вперёд (тоже самое что alt+rightArrow)
25. alt+g b - курсор назад (тоже самое что alt+leftArrow)

## Установка ##
1. Собираем плагин с помощь "yarn vsce package -o ."
2. Устанавливаем в VSCode
3. Выполняем команду LRWTS Sync Settings после первого запуска, чтобы установить настройки

## TODO ##
1. Сделать выделение в кавычках умнее (сейчас может не работать во многих случаях, например, если в строке есть другие кавычки)
2. Редактирование "прямоугольников"
