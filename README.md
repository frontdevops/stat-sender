# Отправка статистики на сервер

Универсальный транспорт для отправки различных статистических данных на сервер.

Всегда используется POST!

По приоритету вызываются:
- navigator.sendBeacon
- window.fetch
- window.XMLHttpRequest

Каждый следующий вызывается, если не найдено предыдущее API

# Usage
В глобальном скопе доступна функция send2server(). Модуль универсальный, написан с учетом, того, что он может использоваться
вне сборщиков и всевозможных модульных систем.

## Browser

```html
<script src="node_modules/lib/index.js"></script>
<script>
    var data = { foo: 123 };
    send2server('https://some.url', data);
</script>
```

## Nodejs
Только для тестов. Для Nodejs не использовать, так как для этих целей нужно использовать Fetch API

```js
require('../../lib/index');

// Доступен в глобальном скопе
send2server('https://www.tutu.ru/station/suggest.php', data);
```

💂
