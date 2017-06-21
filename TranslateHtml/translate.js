var apiKey = "trnsl.1.1.20170620T205948Z.2d4961ed8cdc9f6b.5742eade6518509ff3ba87a36d94e6e34ca53f1c";
function TranslatorController($scope) {
    $scope.langs = [{ key: "ru", desc: "Русский" }, { key: "en", desc: "Английский" }];
    getLangs(apiKey, function (data) {
        $scope.langs = data;
        $scope.$apply();
    });
    $scope.translate = function () {
        getTranslation(apiKey, $scope.direction(), $scope.textSrc, function (translatedText) {
            $scope.textDest = translatedText;
            $scope.$apply();
        });
    };
    $scope.direction = function () {
        var src = getKeyByValye($scope.langs, $scope.langSrc);
        var dest = getKeyByValye($scope.langs, $scope.langDest);
        if( src.length > 0 && dest.length > 0){
            return src + "-" + dest;
        } else if (src.length == 0 && dest.length > 0){
            return dest;
        }
        return "";
    };
}
var app = angular.module('translateApp', []).controller('TranslatorController', TranslatorController);