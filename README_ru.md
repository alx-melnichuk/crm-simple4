## Приложение _Angular_ с подгружаемыми модулями (ленивой загрузкой). 

### Введение

Обычно приложение _Angular_ для корпоративного клиента создается по схеме монолита. То есть одно большое приложение. Со временем, функциональность такого приложения увеличивается. При чем часто заказчик ставит сжатые сроки разработки. В результате приложение _Angular_ имеет огромный размер. Попытка разделить такое приложение на отдельные модули заканчивается неудачей. Это происходит по тому, что модули сильно связаны друг с другом. По этой же причине, данное приложение становится сложно сопровождать - тратиться много времени.

Выход из данной ситуации - создавать приложение по модульном принципу. То есть функционал главного меню выносится в отдельные независимые модули. И эти модули должны подгружаться ленивой загрузкой. И при старте приложения будет загружаться только требуемый модуль. Время загрузки сокращается и не зависит от общего количества модулей. Если пользователь перейдет на следующий пункт глобального меню, то выполниться ленивая загрузка следующего модуля и так далее. Сокращение времени загрузки приложения _Angular_ увеличивает количество обработанных запросов в единицу времени. Особенно это важно при масштабировании нашего сервера в облаке.

Если уже имеется большое монолитное приложение на _Angular_ и стоит задача по его улучшению, то можно организовать его как приложение с одним загружаемым модулем. И начать выделять из него отдельные независимые модули. Модуль с отдельным функционалом будем называть доменным модулем. И эти доменные модули должны быть загружаемыми ленивой загрузкой (_lm - loadable modules_). 

### Создадим основное приложение.

Создать каталог для проекта перейти в него:

```bash
$ mkdir /home/alexey/ws_ts3/crm-simple4/ && cd /home/alexey/ws_ts3/crm-simple4/
```

Установить локально требуемую версию @angular/cli (использовалась версия Angular 10):
```bash
$ npm install @angular/cli@10
```
Можно установить локально последнюю версию:
```bash
$ npm install @angular/cli@latest
```
В результате в текущем каталоге появляется новый подкаталог `node_modules`, в котором содержится требуемая версия `@angular/cli`.

Выполнить создание рабочего пространства и основного приложения _crm-simple_:
```bash
$ npx ng new crm-simple --directory=. --routing=true --style=scss
```
- `ng new crm-simple` - создать новое приложение
- `--directory=.` - в текущем каталоге
- `--routing=true` - генерировать модуль routing
- `--style=scss` - использовать preprocessor 'scss'

### Добавим в проект  _Angular Material_.

Библиотека _Angular Material_ содержит много полезных компонент, которые помогут нам создать надежное и красивое приложение. С описанием этой библиотеки можно ознакомится на сайте [https://material.angular.io/](https://material.angular.io/).

Добавим в проект библиотеку _Angular Material_ версии 10, так как был установлен _Angular_ версии 10.
```bash
$ npx ng add @angular/material@10
```
Во время установки требуется указать тему оформления (например 'Indigo/Pink'). Так как все компоненты этой библиотеки поддерживают тему оформления (одну из предварительно установленных или пользовательскую). По этому требуется указать тему оформления по умолчанию.

И соглашаемся с установкой библиотеку анимации. Она обеспечит плавную анимацию работы стандартных компонент библиотеки _Angular Material_ (таких как: кнопки, радио-кнопки и так далее). Без анимации не будет корректно работать компонент спинера.

На остальные параметры указываем ответ по умолчанию.

Так как данная библиотека имеет свой набор стилей, то этот набор автоматически добавляется в файл описания проекта.\
_./angular.json_

```json
"styles": [
  "./node_modules/@angular/material/prebuilt-themes/indigo-pink.css",
  "src/styles.scss"
],
```
Библиотека _Angular Material_ потребуется, так как планируется использовать компонент _MatTable_ для отображения таблицы.

### Создание сущностей общего использования.

Для работы приложения нам потребуется декоратор автоматической отписки от _subscribe_ (_AutoUnsubscribe_). Добавим в приложение новый файл */src/app/_decorators/auto-unsubscribe.ts*. Теперь можно указать данный декоратор для компонента и он автоматически выполнит все отписки _subscribe_.

### Создание сервиса для хранения профиля пользователя.

Для продолжения переходим в каталог:

```bash
$ cd /home/alexey/ws_ts3/crm-simple4/
```

При загрузки приложения получаем профиль пользователя, в котором имеется массив с разрешениями. По данным массива разрешений определяем какие маршруты доступны текущему пользователю. Например, если массиве разрешений имеется значение _lm-client_, значит пользователю доступно глобальное меню `Clients` и может загрузиться доменный модуль _lm-client_. Иначе, если в массиве разрешений нет значения _lm-client_, то пользователь не может загрузить доменный модуль _lm-client_ и у него не будет элемента глобального меню `Clients`.

Создадим интерфейс профиля пользователя.

```bash
$ npx ng generate interface _interfaces/profileDto interface
```

Создадим сервис для хранения профиля пользователя.

```bash
$ npx ng generate service _services/profile
```

Укажем данный сервис _profile_ в списке провайдеров в основном модуле _/app/app.module.ts_. В других модулях нельзя указывать сервис _profile_ в списке провайдеров, иначе будет создан новый экземпляр данного сервиса. Так как мы планируем получать данные профиля пользователя из доменных модулей, то экземпляр сервиса _profile_ должен быть только один.

### Создание охранника для проверки разрешений маршрутов.

Добавим в основное приложение класс охранника. Данный класс решает следующие задачи:

- получить список требуемых разрешений из параметров маршрута _Route.data.permissions_;
- получить список имеющихся разрешений из профиля текущего пользователя;
- дать разрешение, если у пользователя имеются все требуемые разрешения;

Создадим охранника и  укажем признаки создания двух интерфейсов:

- интерфейс _CanActivate_ - активация маршрута;
- интерфейс _CanLoad_ - загрузка маршрута с "ленивой загрузкой";

```bash
$ npx ng generate guard _guards/permissions --implements CanActivate --implements CanLoad
```

### Создание доменного модуля _lm-client_ по работе с клиентами.

Для продолжения переходим в каталог:
```bash
$ cd /home/alexey/ws_ts3/crm-simple4/
```

Приставка  _lm_ (_loadable modules_) обозначает то, что это доменный модуль с ленивой загрузкой.

Добавим в наше приложение доменный модуль по работе с клиентами.

```bash
$ npx ng generate module lm-client --routing=true --route=lm-client --module=app-routing.module
```

- `--routing=true` - генерировать модуль routing.

- `--route=lm-client` - наименование маршрута для модуля с отложенной загрузкой. Создает компонент в новом модуле и добавляет маршрут к этому компоненту в `Routes`, указанного в модуле опции `--module`.

- `--module=app-routing.module` - модуль в массив `Routes` которого добавляет маршрут к новому компоненту.

В результате в каталоге _/app_ будет создан модуль и компонент _lm-client_. В родительском модуле _app-routing.module_ модуль _lm-client_ указан с ленивой загрузкой. В доменном модуле будут использоваться константы, создадим для них файл */_consts/lm-client.consts.ts*. 

Создадим компоненты для отображения списка клиентов. Каждый компонент имеет свой модуль, в котором описываются в списке импорта все требуемые для работы сторонние модули. Наличие у компонента модуля делает его самодостаточным и готовым к использованию.

### Создание перехватчика по клиентах модуля _lm-client_.

У нас отсутствует BackEnd и для ответа сервера используем перехватчик, которые симулируют работу сервера API. Создадим файл, в котором будет логика работы с данными о клиентах.

Создание перехватчика по запросам работы с клиентами */app/_interceptors/mock-client.interceptor.ts*. 

```bash
$ npx ng generate interceptor _interceptors/mock-client
```

Добавим этот перехватчик в список провайдеров в главном модуле приложения _/src/app/app.module.ts_

```ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { environment } from '../environments/environment';

import { Tracing } from './_consts/app.consts';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MockClientInterceptor } from './_interceptors/mock-client.interceptor';

const provideMock = [
  { provide: HTTP_INTERCEPTORS, useClass: MockClientInterceptor, multi: true }
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, // ** Must be loaded first **
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    ...(!environment.production ? provideMock : [])
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    Tracing.log('AppModule();');
  }
}
```

### Создание сервиса по клиентам для модуля _lm-client_.

Для продолжения переходим в каталог:

```bash
$ cd /home/alexey/ws_ts3/crm-simple4/src/app/lm-client/
```

Создадим интерфейс, в котором описаны свойства клиента.

```bash
$ npx ng generate interface _interfaces/clientDto interface
```

Создадим сервис для работы с данными о клиентах.

```bash
$ npx ng generate service /_services/client-api
```

Для работы данного сервиса требуется объект класса `HttpClient`, который содержится в модуле `HttpClientModule`. Так как сервисы будут создаваться и в других доменных модулях, то вынесем описание импорта модуля `HttpClientModule` в главный модуль приложения _/src/app/app.module.ts_.

### Создание компонент отображения данных для модуля _lm-client_.

Создадим модуль и компонент для списка клиентов.

```bash
$ npx ng generate module client-list
$ npx ng generate component client-list --export=true
```

Создадим модуль и компонент _c-l-header_ заголовка для списка клиентов.

```bash
$ npx ng generate module /client-list/c-l-header
$ npx ng generate component /client-list/c-l-header --export=true
```

Создадим модуль и компонент _c-l-middle_ средней части для списка клиентов.

```bash
$ npx ng generate module /client-list/c-l-middle
$ npx ng generate component /client-list/c-l-middle --export=true
```

Создадим сервис _Resolve_ для получения данных списка клиентов.

```bash
$ npx ng generate service /client-list/_resolvers/client-list-resolver
```

Создадим модуль и компонент для свойств клиента.

```bash
$ npx ng generate module client-view
$ npx ng generate component client-view --export=true
```

Создадим модуль и компонент _c-v-header_ заголовка для свойств клиента.

```bash
$ npx ng generate module /client-view/c-v-header
$ npx ng generate component /client-view/c-v-header --export=true
```

Создадим модуль и компонент _c-v-middle_ средней части для свойств клиента.

```bash
$ npx ng generate module /client-view/c-v-middle
$ npx ng generate component /client-view/c-v-middle --export=true
```

Создадим сервис _Resolve_ для получения данных списка клиентов.

```bash
$ npx ng generate service /client-view/_resolvers/client-view-resolver
```

Создание маршрутов для модуля _lm-client_.

В доменном модуле _lm-client_ для работы с клиентами опишем два маршрута:

- `/list` отображение списка клиентов;

- `/view/:clientId` отображение свойств выбранного клиента;

Создадим файл _/app/lm-client/lm-client-routing.module.ts_ с описанием этих маршрутов. Так же укажем для каждого маршрута раздел получения данных _Resolve_.

```ts
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LmClientComponent } from './lm-client.component';
import { ClientListComponent } from './client-list/client-list.component';
import { ClientViewComponent } from './client-view/client-view.component';
import { ClientListResolverService } from './client-list/_resolvers/client-list-resolver.service';
import { ClientViewResolverService } from './client-view/_resolvers/client-view-resolver.service';

const itemRoutes: Routes = [
  {
    path: 'list',
    component: ClientListComponent,
    resolve: {
      clientList: ClientListResolverService
    }
  },
  {
    path: 'view/:clientId',
    component: ClientViewComponent,
    resolve: {
      client: ClientViewResolverService
    }
  },
  {
    path: '**',
    redirectTo: 'list'
  }
];

const routes: Routes = [
  { path: '', component: LmClientComponent, children: itemRoutes }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    ClientListResolverService,
    ClientViewResolverService
  ]
})
export class LmClientRoutingModule { }
```

### Создание доменного модуля _lm-task_ по работе с задачами.

Для продолжения переходим в каталог:
```bash
$ cd /home/alexey/ws_ts3/crm-simple4/
```

Добавим в наше приложение доменный модуль по работе с клиентами.

```bash
$ npx ng generate module lm-task --routing=true --route=lm-task --module=app-routing.module
```

- `--routing=true` - генерировать модуль routing.

- `--route=lm-task` - наименование маршрута для модуля с отложенной загрузкой. Создает компонент в новом модуле и добавляет маршрут к этому компоненту в `Routes`, указанного в модуле опции `--module`.

- `--module=app-routing.module` - модуль в массив `Routes` которого добавляет маршрут к новому компоненту.

В результате в каталоге _/app_ будет создан модуль и компонент _lm-task_. В родительском модуле _app-routing.module_ модуль _lm-task_ указан с ленивой загрузкой. Для констант создадим файл */_consts/lm-task.consts.ts*. 

### Создание перехватчика по задачах модуля _lm-task_.

У нас отсутствует BackEnd и для ответа сервера используем перехватчик, которые симулируют работу сервера API. Создадим файл, в котором будет логика работы с данными о задачах.

Создание перехватчика по запросам работы с задачами */app/_interceptors/mock-task.interceptor.ts*.

```bash
$ npx ng generate interceptor _interceptors/mock-task
```

Добавим этот перехватчик в список провайдеров в главном модуле приложения _/src/app/app.module.ts_

```ts
const provideMock = [
  { provide: HTTP_INTERCEPTORS, useClass: MockClientInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: MockTaskInterceptor, multi: true }
];
```

### Создание сервиса по задачах для модуля _lm-task_.

Для продолжения переходим в каталог:

```bash
$ cd /home/alexey/ws_ts3/crm-simple4/src/app/lm-task/
```

Создадим интерфейс, в котором описаны свойства задач.

```bash
$ npx ng generate interface _interfaces/taskDto interface
```

Создадим сервис для работы с данными о задачах.

```bash
$ npx ng generate service /_services/task-api
```

### Создание компонент отображения данных для модуля _lm-task_.

Создадим модуль и компонент для списка задач.

```bash
$ npx ng generate module task-list
$ npx ng generate component task-list --export=true
```

Создадим модуль и компонент _t-l-header_ заголовка для списка задач.

```bash
$ npx ng generate module /task-list/t-l-header
$ npx ng generate component /task-list/t-l-header --export=true
```

Создадим модуль и компонент _t-l-middle_ средней части для списка задач.

```bash
$ npx ng generate module /task-list/t-l-middle
$ npx ng generate component /task-list/t-l-middle --export=true
```

Создадим сервис _Resolve_ для получения данных списка задач.

```bash
$ npx ng generate service /task-list/_resolvers/task-list-resolver
```

Создадим модуль и компонент для свойств задачи.

```bash
$ npx ng generate module task-view
$ npx ng generate component task-view --export=true
```

Создадим модуль и компонент _t-v-header_ заголовка для свойств задачи.

```bash
$ npx ng generate module /task-view/t-v-header
$ npx ng generate component /task-view/t-v-header --export=true
```

Создадим модуль и компонент _t-v-middle_ средней части для свойств задачи.

```bash
$ npx ng generate module /task-view/t-v-middle
$ npx ng generate component /task-view/t-v-middle --export=true
```

Создадим сервис _Resolve_ для получения данных списка задач.

```bash
$ npx ng generate service /task-view/_resolvers/task-view-resolver
```

Запустим и проверим работоспособность всего приложения командой:
```bash
$ npx ng serve --port 4250
```
И в браузере проверить по ссылке:  [http://localhost:4250/lm-client/list](http://localhost:4250/lm-client/list)



Исходный код можно скачать [github-crm-simple4](https://github.com/alx-melnichuk/crm-simple4). (Запустите  `npm install` перед запуском приложения.)

Запустить проект на сайте StackBlitz можно по ссылке [https://stackblitz.com/github/alx-melnichuk/crm-simple4](https://stackblitz.com/github/alx-melnichuk/crm-simple4).

