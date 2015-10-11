'use strict'

var equal = require('assert').strictEqual;
var rs    = require('../')

var A_ACTION_CONST = 'A_ACTION_CONST'

// mocks
var fakeStore = {
    dispatch: function (action) {
        equal(action.type, A_ACTION_CONST);
        return action;
    }
}


suite('redux-string', function () {
    var nextHandler = rs(fakeStore);

    test('must return a function to handle next', function () {
        equal(typeof nextHandler, 'function', 'should be a function');
        equal(nextHandler.length, 1, 'function should have one argument');
    });

    suite('handle next', function () {
        test('must dispatch an action if input is a string', function () {
            var actionHandler = nextHandler();
            var result = actionHandler(A_ACTION_CONST);

            equal(result.type, A_ACTION_CONST);
        });

        test('must pass on actions to next if not a string', function (done) {
            var actionObj = { type: A_ACTION_CONST };
            var actionHandler = nextHandler(function (action) {
                equal(action, actionObj);
                done();
            });

            actionHandler(actionObj);
        });
    });

});
