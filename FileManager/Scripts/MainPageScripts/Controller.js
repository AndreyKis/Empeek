app.controller("APIController", function ($scope, APIService) {
    getAll();

    function getAll() {
        var servCall = APIService.getBooks();
        servCall.then(function (d) {
            $scope.Books = d.data;
        }, function (error) {
        });
    }
});

app.controller("DirsController", function ($scope, DirsService, $location) {
    var currPath = "";
    initDirs();

    function initDirs() {
        var path = $location.search().path;
        if (typeof (path) == "undefined" || path == "") {
            currPath = "";
            $scope.CurrPath = "empty";
            $location.search("path=");
            $scope.LessLabel = "-";
            $scope.IntervalLabel = "-";
            $scope.MoreLabel = "-";

            var servCall = DirsService.InitDirectories();
            servCall.then(function(d) {
                $scope.Directories = d.data;
            }, function(error) {
            });
        } else {
            getDirsByDir($location.search().path);
        }
    }

    function getDirsByDir(currDir) {
        currPath += currDir;

        var servCall = DirsService.GetDirsByDir(currPath);
        servCall.then(function(d) {
            var data = d.data;
            //the reason I did that way is in the DirsAndFilesController
            if (data.ErrorNumber == 0) {

                //DirsPart
                $scope.Directories = data.ChildDirs;

                //PathPart
                var currLocalFilePath = data.CurrFilePath; //created this to work with ".." symbols in file paths. Working with them in api controller
                $location.search("path=" + currLocalFilePath);
                $scope.CurrPath = currLocalFilePath;
                currPath = currLocalFilePath;

                //FilePart
                $scope.LessLabel = data.Less;
                $scope.IntervalLabel = data.Interval;
                $scope.MoreLabel = data.More;
            } else {
                alert("Error while opening folder " + currPath + data.ErrorMessage);
            }
        }, function(error) {
            console.log(error);
        });
    }

    
    $scope.InitDirs = initDirs;
    $scope.GetDirsByDir = getDirsByDir;
    $scope.HomeButton = function() {
        $location.search("path=");
        initDirs();
    }
    $scope.IfDisk = function () {
        return currPath[currPath.length - 2] == ":";
    }

    $scope.IfHome = function () {
        return currPath == "";
    }
})