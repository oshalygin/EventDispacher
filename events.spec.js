var Events = require('./events');

describe("Event Dispatcher", function () {
    it("is an object", function () {

        expect(typeof Events).toBe("object");
    });

    it("can register a callback", function () {
        var actual = Events.on('foo', function () {
            return 'bar';
        })();

        var expected = "bar";
        expect(actual).toBe(expected);
    });

    it("can register a callback with a scope", function () {
        Events.on('foo', function () {
            return 'bar';
        }, this);
    });

    it("can trigger an event", function () {
        var bar = 1;

        Events.on('foo', function () {
            bar = 2;
        });

        Events.trigger('foo');
        expect(bar).toBe(2);
    });

    it("can trigger an event with arguments", function () {
        var bar = 1;

        Events.on('foo', function (v) {
            bar = v;
        });

        Events.trigger('foo', 5);

        expect(bar).toBe(5);
    });

    it("can trigger multiple callbacks on an event", function () {

        (function () {
            var baz = 'HauteLook';

            Events.on('foo', function () {
                expect(baz).toBe('Nordstomrack');
            });

            baz = 'Nordstomrack';
        })();

        var bar = 1;
        Events.on('foo', function () {
            bar = 2;
        });

        Events.trigger('foo');
        expect(bar).toBe(2);
    });

    it("can remove callbacks from an event", function () {
        var bar = 1;

        Events.on('foo', function () {
            bar += 1;
        });

        Events.trigger('foo');
        Events.off('foo');
        Events.trigger('foo');
        expect(bar).toBe(2);
    });

    it("can remove specific callbacks from an event", function () {
        var bar = 1;

        var adder = function (v) {
            bar += v;
        };

        var multiplier = function (v) {
            bar *= v;
        };

        Events.on('foo', adder);
        Events.trigger('foo', 1);
        expect(bar).toBe(2);
        Events.on('foo', multiplier);
        Events.off('foo', adder);
        Events.trigger('foo', 100);
        expect(bar).toBe(200);
    });

    it("event names are independent of each other", () => {
        var foo = 1;

        Events.on("foo", () => {
            foo = 3;
        });

        Events.trigger("foo");
        expect(foo).toBe(3);

        Events.on("baz", () => {
            foo = 4;
        });

        Events.trigger("baz");
        expect(foo).toBe(4);

        Events.off("foo");
        Events.trigger("foo");
        expect(foo).toBe(4);

    });
});
