module.exports = test => {
    test(`2 + 3;`, {
        type: 'Program',
        body: [{
            type: 'ExpressionStatement',
            expression: {
                type: 'BinaryExpression',
                operator: '+',
                left: {
                    type: 'NumericalLiteral',
                    value: 2
                },
                right: {
                    type: 'NumericalLiteral',
                    value: 3
                }
            }
        }]
    });

    test('3 + 2 - 1', {
        type: 'Program',
        body: [{
            type: 'ExpressionStatement',
            expression: {
                type: 'BinaryExpression',
                operator: '-',
                left: {
                    type: 'BinaryExpression',
                    operator: '+',
                    left: {
                        type: 'NumericalLiteral',
                        value: '3'
                    },
                    right: {
                        type: 'NumericalLiteral',
                        value: '2'
                    }
                },
                right: {
                    type: 'NumericalLiteral',
                    value: '1'
                }
            }
        }]
    });
}