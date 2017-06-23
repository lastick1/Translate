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
