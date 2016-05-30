angular.module('expenses').factory('getAllExpenses',function($http){
  return($http.get('/api/common/expense'));
});

/*angular.module('expenses').factory('addExpense',function($http){
  return($http.post('/api/common/expense'));
});

angular.module('expenses').factory('deleteExpense',function($http){
  return($http.delete('/api/common/expense/{id}'));
});*/
