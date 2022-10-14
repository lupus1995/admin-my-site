# webpack-ssr

## EN

Setting up webpack for frontend projects. It also contains a ssr template made on express.

Console commands for project management

- npm run start - starts the main frontend project in development mode, server side rendering is available in production mode;
- npm run build - starts building the frontend project for deployment to the server. The contents of the assembly are placed in the dist folder;
- npm run build:dev - runs the build of the express server in order to start server side rendering for the project
- npm run dev - starts the express server in server side rendering mode, you need to run the npm run build:dev command before running this command.

Design modes in a project

- production - mode for the final assembly of the frontend project, server side rendering is available only in the mode;
- development - main development mode in the project.

In the project, each mode has its own entry point into the project. For production mode - index.prod.tsx, for development - index.dev.tsx.

Project start instructions

- clone the repository;
- install npm packages, development was carried out on the 16th version of node js;
- for main development, run the npm run start command;
- to build a build on the server, run npm run build and npm run build:dev, take the finished files from the build, if necessary, correct the path to the server side rendering build files, for finer tuning of server side rendering;
- to check the final build of the frontend, run the following commands npm run build, npm run build:dev, npm run dev - this command will start the local server, which will display the build result and how it will behave on the server.

#

## RU

Настройка webpack для frontend проектов. Также содержит в себе заготовку ssr сделанную на express.

Консольные команды для управленя проектом

- npm run start - запускает основной проект frontend в режиме разработки, server side rendering доступен в режиме production;
- npm run build - запускает сборку frontend проекта для деплоя на сервер. Содержимое сборки помещается в папку dist;
- npm run build:dev - запускает сборку сервера express для того чтобы запустить server side rendering для проекта
- npm run dev - запускает сервер express в режиме server side rendering, перед запуском этой команды необходимо запустить команду npm run build:dev.

Режимы разработи в проекте

- production - режим для финальной сборки frontend проекта, server side rendering доступен только в режиме;
- development - режим основной разработки в проекте.

В проекте под каждый режим своя точка входа в проект. Для режима production - index.prod.tsx, для development - index.dev.tsx.

Инструкция по запуску проекта

- склониовать репозиторий;
- установить npm пакеты, разработка велась на 16-й версии node js;
- для основной разработки запустить команду npm run start;
- для построения сборки на сервер запустить npm run build и npm run build:dev, забрать готовые файлы из сборки, по необходимости поправить путь к файлам сборки server side rendering, для более тонкой настройки server side rendering;
- для проверки финальной сборки фронтенда запустить следующие команды npm run build, npm run build:dev, npm run dev - данная команда запустит локальный сервер, который выведет результат сборки и то как она будет себя вести на сервере.
