> Article in Russian [README_ru.md](https://github.com/alx-melnichuk/crm-simple4/blob/master/README_ru.md)

## _Angular_ application with loadable modules (lazy loading).

### Introduction

Typically, an _Angular_ application for a corporate client is created as a monolith. That is one big application. Over time, the functionality of such an application increases. Moreover, the customer often sets a tight deadline for development. As a result, the _Angular_ application is huge. An attempt to split such an application into separate modules fails. This is because the modules are tightly coupled to each other. For the same reason, this application becomes difficult to maintain - a lot of time wasted.

The way out of this situation is to create an application on a modular basis. That is, the functionality of the main menu is placed in separate independent modules. And these modules should be lazy loaded. And when the application starts, only the required module will be loaded. Loading time is reduced and does not depend on the total number of modules. If the user goes to the next item of the global menu, then the next module will be lazy loaded, and so on. Reducing the load time of the _Angular_ application increases the number of processed requests per unit of time. This is especially important when scaling our server in the cloud.

If you already have a large monolithic application on _Angular_ and the task is to improve it, you can organize it as an application with one loadable module. And start separating separate independent modules from it. A module with a separate functionality will be called a domain module. And these domain modules must be loadable modules (_lm - loadable modules_).

### Let's create the main application.

Create a directory for the project go to it:

```bash
$ mkdir /home/alexey/ws_ts3/crm-simple4/ && cd /home/alexey/ws_ts3/crm-simple4/
```

Install locally required version of @angular/cli (Angular 10 version was used):

```bash
$ npm install @angular/cli@10
```

You can install the latest version locally:

```bash
$ npm install @angular/cli@latest
```

As a result, a new subdirectory `node_modules` appears in the current directory, which contains the required version of `@angular/cli`.

Create workspace and main application _crm-simple_:

```bash
$ npx ng new crm-simple --directory=. --routing=true --style=scss
```

- `ng new crm-simple` - create a new application
- `--directory=.` - in the current directory
- `--routing=true` - generate module routing
- `--style=scss` - use preprocessor 'scss'

### Add _Angular Material_ to the project.

The _Angular Material_ library contains many useful components that will help us create a robust and beautiful application. A description of this library can be found on the website [https://material.angular.io/](https://material.angular.io/).

Let's add the _Angular Material_ version 10 library to the project, since _Angular_ version 10 was installed.

```bash
$ npx ng add @angular/material@10
```

During installation, you need to specify a theme (for example 'Indigo / Pink'). Since all components of this library support the skin (one of the pre-installed or custom). Therefore, you need to specify a default theme.

And agree to install the animation library. It will provide smooth animation of work of standard components of the _Angular Material_ library (such as: buttons, radio buttons, and so on). The spinner component will not work correctly without animation.

We specify the default answer for the rest of the parameters.

Since this library has its own set of styles, this set is automatically added to the project description file.
_./angular.json_

```json
"styles": [
  "./node_modules/@angular/material/prebuilt-themes/indigo-pink.css",
  "src/styles.scss"
],
```

The _Angular Material_ library will be required, since it is planned to use the _MatTable_ component to display the table.

### Creation of entities of general use.

Для работы приложения нам потребуется декоратор автоматической отписки от _subscribe_ (_AutoUnsubscribe_). Добавим в приложение новый файл */src/app/_decorators/auto-unsubscribe.ts*. Теперь можно указать данный декоратор для компонента и он автоматически выполнит все отписки _subscribe_.

For the application to work, we need the _subscribe_ (_AutoUnsubscribe_) auto-unsubscribe decorator. Add a new file */src/app/_decorators/auto-unsubscribe.ts* to the application. Now you can specify this decorator for the component and it will automatically complete all _subscribe_ unsubscribes.

### Creating a service to store the user profile.

To continue, go to the directory:

```bash
$ cd /home/alexey/ws_ts3/crm-simple4/
```

When loading the application, we get the user profile, which contains an array with permissions. According to the array of permissions, we determine which routes are available to the current user. For example, if the array of permissions has the value _lm-client_, then the user has access to the global menu `Clients` and the domain module _lm-client_ can be loaded. Otherwise, if there is no _lm-client_ value in the permissions array, then the user cannot load the _lm-client_ domain module and he will not have the `Clients` global menu item.

Let's create a user profile interface.

```bash
$ npx ng generate interface _interfaces/profileDto interface
```

Let's create a service to store the user profile.

```bash
$ npx ng generate service _services/profile
```

Let's specify this service _profile_ in the list of providers in the main module _/app/app.module.ts_. In other modules, the _profile_ service cannot be specified in the list of providers, otherwise a new instance of this service will be created. Since we plan to receive user profile data from domain modules, there should be only one instance of the _profile_ service.

### Create a guard to check route permissions.

Let's add a guard class to the main application. This class solves the following tasks:

- get a list of required permissions from the parameters of the route _Route.data.permissions_;
- get a list of available permissions from the profile of the current user;
- give permission if the user has all the required permissions;

Let's create a guard and indicate the signs of creating two interfaces:

- _CanActivate_ interface - route activation;
- interface _CanLoad_ - loading a route with "lazy loading";

```bash
$ npx ng generate guard _guards/permissions --implements CanActivate --implements CanLoad
```

### Creating a domain module _lm-client_ for working with clients.

To continue, go to the directory:

```bash
$ cd /home/alexey/ws_ts3/crm-simple4/
```

The _lm_ (_loadable modules_) prefix denotes that this is a lazy-loaded domain module.

Let's add a domain module for working with clients to our application.

```bash
$ npx ng generate module lm-client --routing=true --route=lm-client --module=app-routing.module
```

- `--routing=true` - generate module routing.

- `--route=lm-client` - the name of the route for the lazy load module. Creates a component in a new module and adds a route to that component in the `Routes` specified in the module's `--module` option.

- `--module=app-routing.module` - a module in the `Routes` array which adds a route to a new component.

As a result, the _lm-client_ module and component will be created in the _/app_ directory. In the parent module _app-routing.module_, the _lm-client_ module is specified with lazy loading. The domain module will use constants, create a file */_consts/lm-client.consts.ts* for them.

Let's create components for displaying a list of customers. Each component has its own module, which describes in the import list all third-party modules required for work. The presence of a module in a component makes it self-sufficient and ready to use.

### Creating an interceptor for clients of the _lm-client_ module.

We do not have a BackEnd and for the server response we use an interceptor that simulates the operation of the API server. Let's create a file containing the logic for working with customer data.

Creating an interceptor for customer service requests */app/_interceptors/mock-client.interceptor.ts*. 

```bash
$ npx ng generate interceptor _interceptors/mock-client
```

Add this interceptor to the list of providers in the main application module _/src/app/app.module.ts_

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

### Creating a client service for the _lm-client_ module.

To continue, go to the directory:

```bash
$ cd /home/alexey/ws_ts3/crm-simple4/src/app/lm-client/
```

Let's create an interface that describes the client's properties.

```bash
$ npx ng generate interface _interfaces/clientDto interface
```

Let's create a service for working with customer data.

```bash
$ npx ng generate service /_services/client-api
```

This service requires an object of the `HttpClient` class, which is contained in the `HttpClientModule` module. Since services will be created in other domain modules as well, we will move the description of importing the `HttpClientModule` module into the main application module _/src/app/app.module.ts_.

### Creation of data display components for the _lm-client_ module.

Let's create a module and a component for the customer list.

```bash
$ npx ng generate module client-list
$ npx ng generate component client-list --export=true
```

Let's create a module and a _c-l-header_ header component for the client list.

```bash
$ npx ng generate module /client-list/c-l-header
$ npx ng generate component /client-list/c-l-header --export=true
```

Let's create a module and a _c-l-middle_ component for the middle part for the customer list.

```bash
$ npx ng generate module /client-list/c-l-middle
$ npx ng generate component /client-list/c-l-middle --export=true
```

Let's create a service _Resolve_ to get data from a list of clients.

```bash
$ npx ng generate service /client-list/_resolvers/client-list-resolver
```

Let's create a module and a component for client properties.

```bash
$ npx ng generate module client-view
$ npx ng generate component client-view --export=true
```

Let's create a module and a _c-v-header_ header component for client properties.

```bash
$ npx ng generate module /client-view/c-v-header
$ npx ng generate component /client-view/c-v-header --export=true
```

Let's create a module and a _c-v-middle_ middle part for client properties.

```bash
$ npx ng generate module /client-view/c-v-middle
$ npx ng generate component /client-view/c-v-middle --export=true
```

Let's create a service _Resolve_ to get data from a list of clients.

```bash
$ npx ng generate service /client-view/_resolvers/client-view-resolver
```

Creating routes for the _lm-client_ module.

In the domain module _lm-client_, we will describe two routes for working with clients:

- `/ list` display the list of clients;

- `/ view /: clientId` displays properties of the selected client;

Let's create a file _/app/lm-client/lm-client-routing.module.ts_ with a description of these routes. We will also indicate the section for receiving data _Resolve_ for each route.

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

### Creating a domain module _lm-task_ for working with tasks.

To continue, go to the directory:

```bash
$ cd /home/alexey/ws_ts3/crm-simple4/
```

Let's add a domain module for working with clients to our application.

```bash
$ npx ng generate module lm-task --routing=true --route=lm-task --module=app-routing.module
```

- `--routing = true` - generate the routing module.

- `--route = lm-task` - name of the route for the lazy load module. Creates a component in a new module and adds a route to that component in the `Routes` specified in the module's `--module` option.

- `--module = app-routing.module` - a module in the `Routes` array which adds a route to a new component.

As a result, the _lm-task_ module and component will be created in the _/app_ directory. In the parent module _app-routing.module_, the _lm-task_ module is specified with lazy loading. For constants, create a file */_consts/lm-task.consts.ts*.

### Creation of an interceptor for tasks of the _lm-task_ module.

We do not have a BackEnd and for the server response we use an interceptor that simulates the operation of the API server. Let's create a file containing the logic for working with task data.

Creating an interceptor for requests for working with tasks */app/_interceptors/mock-task.interceptor.ts*.

```bash
$ npx ng generate interceptor _interceptors/mock-task
```

Add this interceptor to the list of providers in the main application module _/src/app/app.module.ts_

```ts
const provideMock = [
  { provide: HTTP_INTERCEPTORS, useClass: MockClientInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: MockTaskInterceptor, multi: true }
];
```

### Creating a service by tasks for the _lm-task_ module.

To continue, go to the directory:

```bash
$ cd /home/alexey/ws_ts3/crm-simple4/src/app/lm-task/
```

Let's create an interface that describes the properties of tasks.

```bash
$ npx ng generate interface _interfaces/taskDto interface
```

Let's create a service for working with task data.

```bash
$ npx ng generate service /_services/task-api
```

### Creating a data display component for the _lm-task_ module.

Let's create a module and a component for the task list.

```bash
$ npx ng generate module task-list
$ npx ng generate component task-list --export=true
```

Let's create a module and a _t-l-header_ header component for the task list.

```bash
$ npx ng generate module /task-list/t-l-header
$ npx ng generate component /task-list/t-l-header --export=true
```

Let's create a module and a _t-l-middle_ component for the middle part for the task list.

```bash
$ npx ng generate module /task-list/t-l-middle
$ npx ng generate component /task-list/t-l-middle --export=true
```

Let's create a _Resolve_ service to receive data from the list of tasks.

```bash
$ npx ng generate service /task-list/_resolvers/task-list-resolver
```

Let's create a module and a component for task properties.

```bash
$ npx ng generate module task-view
$ npx ng generate component task-view --export=true
```

Let's create a module and a _t-v-header_ header component for the task properties.

```bash
$ npx ng generate module /task-view/t-v-header
$ npx ng generate component /task-view/t-v-header --export=true
```

Let's create a module and a _t-v-middle_ component for the task properties.

```bash
$ npx ng generate module /task-view/t-v-middle
$ npx ng generate component /task-view/t-v-middle --export=true
```

Let's create a _Resolve_ service to receive data from the list of tasks.

```bash
$ npx ng generate service /task-view/_resolvers/task-view-resolver
```

Let's start and check the performance of the entire application with the command:

``` bash
$ npx ng serve --port 4250
```

And in the browser, check the link: [http://localhost:4250/lm-client/list](http://localhost:4250/lm-client/list)



The source code can be downloaded from [github-crm-simple4] (https://github.com/alx-melnichuk/crm-simple4). (Run `npm install` before starting the application.)

You can launch the project on the StackBlitz website by following the link [https://stackblitz.com/github/alx-melnichuk/crm-simple4](https://stackblitz.com/github/alx-melnichuk/crm-simple4).