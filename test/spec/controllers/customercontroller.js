
describe('Controller: UsuariosController', function () {

  // load the controller's module
  beforeEach(module('accesseducaApp'));

  var UsuariosController,
    scope, $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, _$httpBackend_,  $rootScope, customersFactory) {
          // place here mocked dependencies
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET("http://localhost:3000/Usuarios").respond([
        {
          "id": 0,
          "username": "admin",
          "photo": "images/joao.jpg",
          "admin": true,
          "email": "admin@admin"
        },
        {
          "id": 1,
          "username": "joao",
          "photo": "images/joao.jpg",
          "admin": false,
          "email": "joao@joao"
        }
      ]);

    scope = $rootScope.$new();
    UsuariosController = $controller('UsuariosController', {
      $scope: scope, usuariosFactory: usuariosFactory
    });


  }));

  it('should have showDetails as false', function () {
    expect(scope.showDetails).toBe(false);
  });
  it('should create "usuarios" with 2 customers fetched from xhr', function() {
      // expect(scope.dishes.length).toBe(0);
      $httpBackend.flush();
      expect(scope.usuarios.length).toBe(2);
      expect(scope.usuarios[0].username).toBe("admin");
      expect(scope.usuarios[1].email).toBe("joao@joao");

  });

});
