'use strict';

function stringToAction (store) {
    return function (next) {
        return function (action) {
            return (typeof action === 'string'
                ? store.dispatch({ type: action })
                : next(action));
        };
    };
}

module.exports = stringToAction
