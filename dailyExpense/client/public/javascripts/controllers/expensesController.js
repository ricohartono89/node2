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

    $scope.editExpense = function(expense_id){
      $http.put('/api/common/expense/'+expense_id,$scope.edit).success(function(data){
        for (var i = 0; i < data.length; i++) {
          data[i].transactiondate = moment(data[i].transactiondate).format('DD MMMM YYYY');
        }
        $scope.edit={};
        $scope.expenseData=data;
        $scope.showChart($scope.expenseData);
        console.log(data);
        $("#editModal").modal('hide');
      }).error(function(error){
        console.log('Error: '+error);
      });
    };


    $scope.openEditPopUp = function(id){
      $http.get('/api/common/expense/'+id).success(function(data){
        console.log($scope.edit);
        for (var i = 0; i < data.length; i++) {
          data[i].transactiondate = moment(data[i].transactiondate).format('DD/MM/YYYY');
        }
        $scope.edit=angular.copy(data[0]);
        console.log(data[0]);
        $("#editModal").modal('show');
      }).error(function(error){
        console.log('Error: '+error);
      })
    };
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
      $scope.data.push(amount);
    };
    $scope.onClick = function (points, evt) {
      console.log(points, evt);
    };
    var myLine = new Chart(document.getElementById("canvas").getContext("2d")).Line(lineChartData,options);
function done() {
    console.log('done');
	var url=document.getElementById("canvas").toDataURL();
	document.getElementById("url").src=url;

}
};

  $scope.$on('chart-create', function (evt, chart) {
    chart.scales["y-axis-0"].min=0;
  });

});
