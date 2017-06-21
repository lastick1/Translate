var apiKey = "trnsl.1.1.20170620T205948Z.2d4961ed8cdc9f6b.5742eade6518509ff3ba87a36d94e6e34ca53f1c";

QUnit.test("hello test", function (assert) {
    assert.ok(1 == "1", "Passed!");
});

QUnit.test("getLangs returns something", function (assert) {
    var done = assert.async();
    var object = getLangs(apiKey, function () { });
    setTimeout(function () {
        assert.ok(typeof object === "object", "getLangs() returns object");
        assert.ok(typeof object.langs === "object", "getLangs().langs is object");
        var count = 0;
        for (k in object.langs)
        {
            ++count;
        }
        assert.ok(count > 0 === true, "getLangs().langs contains something");
        done();
    }, 150);
});

QUnit.test("detectLang works", function (assert) {
    var texts = ["hi", "привет"];
    var done = assert.async(texts.length);
    for (i in texts)
    {
        var object = detectLang(apiKey, texts[i], function (data) {
            assert.equal(typeof data, "string", " typeof data.lang is string");
            assert.ok(data.length > 0, "data.lang contains something");
            done();
        });
    }
});

QUnit.test("getTranslation works", function (assert) {
    var done = assert.async();
    var dir = "ru-en";
    var object = getTranslation(apiKey, dir, "Привет", function () { });
    setTimeout(function () {
        assert.equal(object.text, "Hi", dir + ": Привет -> Hi");
        done();
    }, 150);
});
