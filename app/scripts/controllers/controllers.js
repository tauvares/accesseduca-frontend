'use strict';
angular.module('accesseducaApp')
  .controller('CabecalhoController', ['$scope', '$state', '$location', '$rootScope', 'AuthService', 'ngDialog',
    function($scope, $state, $location, $rootScope, AuthService, ngDialog) {
      $rootScope.mantendo = false;
      //console.log($rootScope.mantendo);
      $scope.loggedIn = false;
      $scope.username = '';
      $scope.usuarioId = '';
      if (AuthService.isAuthenticated()) {
        $scope.loggedIn = true;
        $scope.username = AuthService.getUsername();
        $scope.usuarioId = AuthService.getUsuarioId();
      }
      $scope.openLogin = function() {
        //console.log('Entrou');
        ngDialog.open({
          template: 'views/login.html',
          scope: $scope,
          className: 'ngdialog-theme-default',
          controller: "LoginController"
        });
      };
      $scope.logOut = function() {
        AuthService.logout();
        $scope.loggedIn = false;
        $scope.username = '';
        $scope.usuarioId = '';
        //$location.path('/sistem');
        $state.go('accesseduca.sistema.inicio');
      };
      $scope.openHome = function() {
        $state.go('accesseduca.publico');
      };
      $scope.openMapa = function() {
        $state.go('accesseduca.publico.mapa');
      };
      $scope.openUsuarios = function(usuarioId) {
        console.log(usuarioId);
        $state.go('accesseduca.sistema.usuarios', {id: usuarioId.usuarioId});
      };
      $scope.openFacilitadores = function(usuarioId) {
        console.log(usuarioId);
        $state.go('accesseduca.sistema.facilitadores', {id: usuarioId.usuarioId});
      };
      $scope.openFacilitadoresPorEstado = function(estado) {
        //console.log('Entrou0');
        $state.go('accesseduca.publico.facilitadores', {uf: estado});
      };
      $rootScope.$on('login:Successful', function() {
        $scope.loggedIn = AuthService.isAuthenticated();
        $scope.username = AuthService.getUsername();
        $scope.usuarioId = AuthService.getUsuarioId();
        $state.go('accesseduca.sistema.facilitadores');
      });
      $rootScope.$on('registration:Successful', function() {
        $scope.loggedIn = AuthService.isAuthenticated();
        $scope.username = AuthService.getUsername();
        $scope.usuarioId = AuthService.getUsuarioId();
      });
      $scope.stateis = function(curstate) {
        return $state.is(curstate);
      };
    }
  ])
  .controller('LoginController', ['$scope', '$localStorage', 'AuthService', 'ngDialog', function($scope, $localStorage, AuthService, ngDialog) {
    $scope.loginData = $localStorage.getObject('userinfo', '{}');
    $scope.doLogin = function() {
      console.log($scope.loginData);
      if ($scope.rememberMe)
        $localStorage.storeObject('userinfo', $scope.loginData);
      AuthService.login($scope.loginData);
      ngDialog.close();
    };
    $scope.abreRegistro = function() {
      ngDialog.open({
        template: 'views/registro.html',
        scope: $scope,
        className: 'ngdialog-theme-default',
        controller: "RegisterController"
      });
    };
  }])
  .controller('RegisterController', ['$scope', '$localStorage', 'AuthService', 'ngDialog', function($scope, $localStorage, AuthService, ngDialog) {
    $scope.register = {};
    $scope.loginData = {};
    $scope.doRegister = function() {
      AuthService.register($scope.registration);
      ngDialog.close();
    };
  }])

;
