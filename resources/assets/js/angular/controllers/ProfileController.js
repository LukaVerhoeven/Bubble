app.controller('ProfileController', function($scope, $http, API_URL, $rootScope, fileReader) {
    $scope.uploadImage = function(image){
        // var t = $('#profilepicUpload').val();
        // var profilepic = [image['0']];
        // var formData = new FormData($("#profilepicUpload")[0]);
        var fromdata = new FormData();
        var file = image['0'];
         var text = $('#myInputField');  
  var myObj = {title: 'Some title', content: text};  
        fromdata.append("texta", 'drol');
        fromdata.append("fileToUpload", file);
        var reader  = new FileReader();
        var imagefile;
       reader.onload = function (e) {
            // console.log(e.target.result);
        };
        reader.addEventListener("load", function (e) {
            imagefile = reader.result;
            console.log(e);
            console.log(data);
        }, false);
        reader.readAsDataURL(file);

        console.log(window.URL.createObjectURL(file), file,  fromdata);
            var data = {
                image :  file,
            };
            console.log(data)
            $.ajax({
              url: API_URL + 'profileImage',
              type: 'POST',
              data: fromdata,
              processData: false,
              contentType: false,
                headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
            });
            // $rootScope.postRequest(data ,'profileImage', '');
        
    }

    $scope.getFile = function () {
        $scope.progress = 0;
        fileReader.readAsDataUrl($scope.file, $scope)
                      .then(function(result) {
                          $scope.uploadImage(result);
                      });
    };
})

app.directive("ngFileSelect",function(){
  return {
    link: function($scope,el){
      
      el.bind("change", function(e){
      
        $scope.file = (e.srcElement || e.target).files[0];
        $scope.getFile();
      })
    }
  }
})