(
  function(){

    var app=angular.module('myreddit',['ionic','angularMoment']);


    app.controller('RedditCtrl',function($scope,$http){
      // $scope.stories=[
      // {
      //   title: 'First story'
      // },
      // {

      //   title:'Second story'
      // } 

      // ];
      $scope.stories=[];  //intialize stories to be an empty array

      function loadstories(params,callback){


         $http.get('https://www.reddit.com/r/funny/new/.json',{params:params})
         .success(function(response) {
        // console.log(response);
        var stories=[];
           angular.forEach(response.data.children,function(child)
            {
           //    console.log(child.data);
              $scope.stories.push(child.data);
            });
        callback(stories);
        });
      }
     
      $scope.loadOlderStories=function(){
        var params={};
      //  console.log($scope.stories.length);
        if($scope.stories.length>0){
          params['after']=$scope.stories[$scope.stories.length-1].name;
        }
        loadstories(params,function(olderStories){
          $scope.stories=  $scope.stories.concat(olderStories);
           $scope.$broadcast('scroll.infiniteScrollComplete');
        });
          
      };

      $scope.loadNewerStories=function(){
        var params={'before':$scope.stories[0].name};
       // console.log($scope.stories.length);
        if($scope.stories.length>0){
          params['after']=$scope.stories[$scope.stories.length-1].name;
        }
        loadstories(params,function(newerStories){
          $scope.stories=  newerStories.concat($scope);
           $scope.$broadcast('scroll.infiniteScrollComplete');
        });
          
      };
         
      
});
      
  

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});
}()
);
