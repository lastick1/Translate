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
    var format = "plain";
    var options = 1;
    var jqXHR = $.ajax({
        url: "https://translate.yandex.net/api/v1.5/tr.json/translate",
        method: "POST",
        data: {
            key: key,
            text: text,
            lang: lang,
            format: format,
            options: options
        },
        complete: function (resp) {
            jqXHR.text = resp.responseJSON.text;
            callback(resp.responseJSON.text);
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
