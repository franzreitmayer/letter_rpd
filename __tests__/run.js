const { Parser } = require('../src/Parser.js');
const assert = require('assert');

const parser = new Parser();

/**
 * List of tests
 */
const tests = [require('./literals-test.js')];

function exec() {
    const program = `
    /**
     * Dokumentation comment
     * 
     */
     42;
     "Hello World!";
`;

    const ast = parser.parse(program);

    console.log(JSON.stringify(ast, null, 2));
}


function test(program, expectedAST) {
    const ast = parser.parse(program);
    assert.deepEqual(ast, expectedAST);

}

exec();

tests.forEach(testRun => {
    testRun(test);
});