// убрал громоздкие методы из контроллера, чтобы не мешали
function getLangs(key, callback) {
    var ui = "ru";
    var container = {};
    var jqXHR = $.ajax({
        url: "https://translate.yandex.net/api/v1.5/tr.json/getLangs",
        method: "POST",
        data: {
            key: key,
            ui: ui
        },
        complete: function (resp) {
            jqXHR.langs = Array();
            for (k in resp.responseJSON.langs)
            {
                jqXHR.langs.push({
                    key: k,
                    desc: resp.responseJSON.langs[k]
                });
            }
            callback(resp.responseJSON.langs);
        }
    });
    return jqXHR;
}

function getTranslation(key, lang, text, callback) {
    var jqXHR = $.ajax({
        url: "https://translate.yandex.net/api/v1.5/tr.json/translate",
        method: "POST",
        data: {
            key: key,
            text: text,
            lang: lang
        },
        complete: function (resp) {
            jqXHR.text = resp.responseJSON.text;
            callback(resp.responseJSON.text);
        }
    });
    return jqXHR;
}

function detectLang(key, text, callback) {
    var jqXHR = $.ajax({
        url: "https://translate.yandex.net/api/v1.5/tr.json/detect",
        method: "POST",
        data: {
            key: key,
            text: text
        },
        complete: function (resp) {
            jqXHR.text = resp.responseJSON;
            callback(resp.responseJSON.lang);
        }
    });
    return jqXHR;
}

function getKeyByValye(dict, val){
    for (k in dict) {
        if (dict[k] == val) {
            return k;
        }
    }
    return "";
}
