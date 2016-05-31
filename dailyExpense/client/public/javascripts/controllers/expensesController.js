expenses.controller('mainController',function($scope,$http,$timeout,
                                                                getAllExpenses /*addExpense, deleteExpense*/){
    $scope.formData={};
    $scope.expenseData={};
    $scope.edit={};
    $scope.add={};
    $scope.getExpenses = function(){
      $http.get('/api/common/expense').success(function(data){
        for (var i = 0; i < data.length; i++) {
          data[i].transactiondate = moment(data[i].transactiondate).format('DD MMMM YYYY');
        }
        $scope.expenseData=data;
        if(Object.keys(data).length!==0&&data.constructor!==Object){
          $scope.showChart($scope.expenseData);
        }
        console.log(data);
      }).error(function(error){
        console.log('Error: '+error);
      });
    };
    $scope.getExpenses();
    $scope.addExpense = function(){
      $http.post('/api/common/expense',$scope.add).success(function(data){
        for (var i = 0; i < data.length; i++) {
          data[i].transactiondate = moment(data[i].transactiondate).format('DD MMMM YYYY');
        }
        $scope.add={};
        $scope.expenseData=data;
        $scope.showChart($scope.expenseData);
        console.log(data);
        $("#addModal").modal('hide');
      }).error(function(error){
        console.log('Error: '+error);
      });
    };
    $scope.deleteExpense=function(expense_id){
      $http.delete('/api/common/expense/'+expense_id).success(function(data){
        for (var i = 0; i < data.length; i++) {
          data[i].transactiondate = moment(data[i].transactiondate).format('DD MMMM YYYY');
        }
        $scope.add={};
        $scope.expenseData=data;
        console.log(data);
      }).error(function(error){
        console.log('Error: '+error);
      });
    };
    $scope.openEditPopUp = function(){
      ngDialog.open({
        template:'templates/editPopUp.html'
      });
    }
$scope.showChart=function(expensesData){
  $scope.labels = [];
  $scope.data=[];
  $scope.amountList=[];
  $scope.series = ['Series A'];
  for (var i = 0; i < expensesData.length; i++) {
    var date = expensesData[i].transactiondate;
    var amount = expensesData[i].amount
    console.log(amount);
    $scope.labels.push(date);
    $scope.amountList.push(amount);
  }
  $scope.data.push($scope.amountList);
  $scope.onClick = function (points, evt) {
    console.log(points, evt);
  };

  // Simulate async data update
  //$timeout(function () {
  //  $scope.data = [
  //    [28, 48, 40, 19, 86, 27, 90],
  //    [65, 59, 80, 81, 56, 55, 40]
  //  ];
  //}, 3000);
}

});

expenses.controller('editExpenseController',function($scope,$http){

})
