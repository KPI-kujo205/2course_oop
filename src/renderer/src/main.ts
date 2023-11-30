import MyEditor from './MyEditor'

/*
 * TODO:
 * [] classical singleton pattern
 * [] a button to open a separate window, which automagically closes once you exit thr program
 * [] a window class should have table class in it
 * [] write objects to a table and display them
 * [] heirarchy diagram
 * additional points:
 * [] highlighting a row in table highlights objects on a canvas
 *
 *  При виконанні бонусів 1 та 2 забороняється робити для цього нові
    залежності модуля my_table від інших .cpp файлів. Тоді як надіслати
    повідомлення (наприклад, про виділення користувачем якогось рядка
    таблиці) від вікна таблиці клієнту цього вікна (наприклад, коду головного
    файлу .cpp)? Підказки можна знайти у матеріалі лекції стосовно технології
    Callback, а також патернів Observer, Listener.
 *
 * [] deleting an object in a table
 * [] upload written file
 * */

export default new MyEditor()
