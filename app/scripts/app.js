'use strict';
angular.module('accesseducaApp', ['ui.router', 'ngResource', 'ngDialog', 'lbServices', 'ui.bootstrap', 'ui.mask', 'images-resizer'])
  .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('accesseduca', {
        templateUrl: 'views/accesseduca.html',
        abstract: true
      })
      .state('accesseduca.publico', {
        templateUrl: 'views/publico.html',
        abstract: true
      })
      .state('accesseduca.publico.mapa', {
        url: '/',
        templateUrl: 'views/mapa.html',
        controller: 'CabecalhoController'
      })
      .state('accesseduca.publico.facilitadores', {
        url: '/',
        params: {
          uf: null,
          ativo: 'S'
        },
        templateUrl: 'views/facilitadores.html',
        controller: 'FacilitadoresController'
      })
      .state('accesseduca.publico.novo-facilitador', {
        url: '/',
        templateUrl: 'views/novo-facilitador.html',
        controller: 'FacilitadoresController'
      })
      .state('accesseduca.sistema', {
        url: '/sistema',
        templateUrl: 'views/sistema.html',
        abstract: true
      })
      .state('accesseduca.sistema.inicio', {
        url: '/',
        views: {
          'cabecalho': {
            templateUrl: 'views/cabecalho.html',
            controller: 'CabecalhoController'
          },
          'conteudo': {
            templateUrl: 'views/telalogin.html',
            controller: 'LoginController'
          }
        }
      })
      .state('accesseduca.sistema.facilitadores', {
        url: '/',
        views: {
          'cabecalho': {
            templateUrl: 'views/cabecalho.html',
            controller: 'CabecalhoController'
          },
          'conteudo': {
            templateUrl: 'views/facilitadores-cadastro.html',
            controller: 'FacilitadoresController'
          }
        }
      });


    $urlRouterProvider.otherwise('/');
  });
