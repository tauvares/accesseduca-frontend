'use strict';
angular.module('accesseducaApp', ['ui.router', 'ngResource', 'ngDialog', 'lbServices', 'ui.bootstrap', 'ui.mask', 'images-resizer'])
  .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
      // Rota para a página principal
      .state('app', {
        url: '/',
        views: {
          'cabecalho': {
            templateUrl: 'views/cabecalho.html',
            controller: 'CabecalhoController'
          },
          'conteudo': {
            templateUrl: 'views/mapa.html',
            controller: 'CabecalhoController'
          }
        }
      })
      // Rota para a página de usuários
      .state('app.usuarios', {
        url: 'Usuarios/:id',
        views: {
          'conteudo@': {
            templateUrl: 'views/telalogin.html',
            controller: 'CabecalhoController'
          }
        }
      })
      // Rota para a página de facilitadores
      .state('app.facilitadores-cadastro', {
        url: 'Usuarios/:id/facilitadors',
        views: {
          'conteudo@': {
            templateUrl: 'views/facilitadores-cadastro.html',
            controller: 'FacilitadoresController'
          }
        }
      })
      // rota para a página do mapa
      .state('app.mapa', {
        url: '/',
        views: {
          'conteudo@': {
            templateUrl: 'views/mapa.html',
            controller: 'CabecalhoController'
          }
        }
      })
      // Rota para a página de facilitadores por estado
      .state('app.facilitadores', {
        url: 'Facilitadors/:id',
        params: {
          uf: null,
          ativo: 'S'
        },
        views: {
          'conteudo@': {
            templateUrl: 'views/facilitadores.html',
            controller: 'FacilitadoresController'
          }
        }
      })
      // rota para a página de login
      .state('app.login', {
        url: '/Usuarios/telalogin',
        views: {
          'conteudo@': {
            templateUrl: 'views/telalogin.html',
            controller: 'CabecalhoController'
          }
        }
      })
      // Rota para a página de cadastro de novos facilitadores
      .state('app.novo-facilitador', {
        url: 'Facilitadors/:id',
        /*params: {
           uf: null,
           ativo: 'N'
         },*/
        views: {
          'conteudo@': {
            templateUrl: 'views/novo-facilitador.html',
            controller: 'FacilitadoresController'
          }
        }
      });
    $urlRouterProvider.otherwise('/');
  });
