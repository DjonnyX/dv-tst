# DocViewer
### v.0.0.1

Преимущества:
- `FSD` архитектура. Приложение построено на `FSD` архитектуре, дает преимущество стандартизации в командной разработке.
- Гибридный рендеринг вьюпорта страниц (`canvas` + стандартный `DOM`). Даёт прирост в скорости рендеринга. Минусы - более сложная реализация.
- Упор на оптимизацию производительности. При большом количестве страниц, приложение останется работать со стабильно высокой скоростью отображения и не будет потреблять лишних ресурсов памяти.
- Легковесный клиент.
- Не используются сторонние библиотеки и решения `[кроме экосистемы Angular 19]`

Недостатки:
- Реализация `Infinity-скролла` более сложная в данном подходе, чем стандартными средствами `DOM`. Поэтому в рамках тестового задания применил подход постраничного отображения.

Известные проблемы:
- Скроллинг вьюпорта гибридный, реализация сложная. Есть недостаток отсутствия "обратного позиционирования" `scrollbar'ов`, поэтому при инициализации у `thumb'ов` немного "не своя позиция" на треке. Это решается созданием новых и доработками существующих методов `scrollbar'ов`.
- Перемещение анотации не сопровождается анимацией передвижения. Необходима доработка обработчиков `cdkDrag`.

Известные улучшения:
- Безопасность. Для получения манифеста желательно использовать схему валидации для DTO.
- Рефакторинг. Для улучшенного переиспользования кода, можно вынести некоторый функционал в отдельные дерективы, такие как autocomplite, clickOutside и т.п.
- Стили. Вынести стили в `shared` модуль для переиспользуемых элементов `UI`. Добавить миксины на повторяющиеся блоки `scss`.



P.S.: Основным упором было продемонстрировать концепцию гибридного рендеринга вьюпорта. Известные проблемы и возможные улучшения оставил, чтобы не выходить за рамки тестового задания `[не влияет на демонстрацию основного флоу задания]`.

## Development 

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.3.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
