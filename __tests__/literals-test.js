module.exports = test => {
    // Numerical literal
    test('42', {
        type: 'Program',
        body: {
            type: 'NumericalLiteral',
            value: 42
        }
    });

    // String Literal (double quotes)
    test('"Hello World!"', {
        type: 'Program',
        body: {
            type: 'StringLiteral',
            value: 'Hello World!'
        }
    });

    // String literal (single quotes)
    test("'Hello World!'", {
        type: 'Program',
        body: {
            type: 'StringLiteral',
            value: 'Hello World!'
        }
    });
};