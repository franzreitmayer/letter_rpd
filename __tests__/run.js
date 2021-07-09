const { Parser } = require('../src/Parser.js');

const parser = new Parser();

const program = `
    /**
     * Dokumentation comment
     * 
     */
     42
`;

const ast = parser.parse(program);

console.log(JSON.stringify(ast, null, 2));