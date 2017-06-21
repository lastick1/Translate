function TranslatorController($scope) {
    $scope.langs = { ru: "Русский" , en: "Английский" };
    $scope.langDest = "Русский";
    getLangs(apiKey, function (data) {
        $scope.langs = data;
        $scope.$apply();
    });
    $scope.$watch('textSrc', function () {
        if ($scope.textSrc && $scope.langSrc === undefined)
        {
            detectLang(apiKey, $scope.textSrc, function (code) {
                $scope.langSrc = $scope.langs[code];
                $scope.$apply();
            });
        }
    });
    $scope.translate = function () {
        if ($scope.langDest && $scope.textSrc) {
            getTranslation(apiKey, $scope.direction(), $scope.textSrc, function (translatedText) {
                $scope.textDest = translatedText;
                $scope.$apply();
            });
        } else {
            $scope.textDest = "";
        }
    };
    $scope.direction = function () {
        var src = getKeyByValye($scope.langs, $scope.langSrc);
        var dest = getKeyByValye($scope.langs, $scope.langDest);
        if( src.length > 0 && dest.length > 0){
            return src + "-" + dest;
        } else if (src.length == 0 && dest.length > 0) {
            return dest;
        }
        return "";
    };
}
var app = angular.module('translateApp', []).controller('TranslatorController', TranslatorController);