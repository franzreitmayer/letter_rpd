module.exports = test => {
    test(`
    
        {
            "Hello World!"; // StringLiteral
            42; // NumericalLiteral
        }
    
    `, {
        type: "Program",
        body: [{
            type: "BlockStatement",
            body: [{
                    type: "ExpressionStatement",
                    expression: {
                        type: 'StringLiteral',
                        value: 'Hello World!'
                    }
                },

                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: "NumericalLiteral",
                        value: 42
                    }
                }
            ]
        }]
    });

    // Testing empty block
    test(`
    
    {
    }

`, {
        type: "Program",
        body: [{
            type: "BlockStatement",
            body: []
        }]
    });


    // Testing nested block block
    test(`
    
   {
        42;
        {
            "hello";
        }
    }

`, {
        type: "Program",
        body: [{
                type: "BlockStatement",
                body: [{
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'NumericalLiteral',
                            value: 42
                        }
                    },
                    {
                        type: 'BlockStatement',
                        body: [{
                            type: 'ExpressionStatement',
                            expression: {
                                type: 'StringLiteral',
                                value: 'hello'
                            }
                        }]
                    }
                ]
            }

        ]
    });

}