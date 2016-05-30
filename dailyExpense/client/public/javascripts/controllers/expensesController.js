expenses.controller('mainController',function($scope,$http,ngDialog,
                                                                getAllExpenses /*addExpense, deleteExpense*/){
    $scope.formData={};
    $scope.expenseData={};
    getAllExpenses.success(function(data){
      for (var i = 0; i < data.length; i++) {
        data[i].transactiondate = moment(data[i].transactiondate).format('DD MMMM YYYY');
      }
      $scope.expenseData=data;
      console.log(data);
    }).error(function(error){
      console.log('Error: '+error);
    });

    $scope.openEditPopUp = function(){
      ngDialog.open({
        template:'templates/editPopUp.html'
      });
    }
});

expenses.controller('editExpenseController',function($scope,$http){

})
