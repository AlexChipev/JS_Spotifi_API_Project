let login_ctrl = angular.module('Login_Page', []);

login_ctrl.controller('loginCtrl', ['$scope', '$http', ($scope, $http) => {

$http.get('/loginCtrl').then((res) => {

    $scope.message = res.data;
  });
}])
