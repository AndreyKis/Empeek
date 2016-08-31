app.service("APIService", function ($http) {
    this.getBooks = function () {
        return $http.get("api/values");
    }
});

app.service("DirsService", function ($http) {
    this.GetDirectories = function () {
        return $http.get("api/DirsAndFiles");
    };

    this.InitDirectories = function() {
        return $http.get("api/InitDirsAndFiles");
    }
    var result;
    this.GetDirsByDir = function (directory) {
        result = $http.post("api/DirsAndFiles?path=" + directory).success(function (data, status) {
            result = (data);
        });
        return result;
    };
});