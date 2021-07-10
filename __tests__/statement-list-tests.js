module.exports = test => {
    test(`
    42;
    "Hello World!";
    `, {
        type: 'Program',
        body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'NumericalLiteral',
                    value: 42
                }
            },
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'StringLiteral',
                    value: 'Hello World!'
                }
            }

        ]
    })
}