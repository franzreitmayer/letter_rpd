const { Tokenizer } = require('./Tokenizer.js');

class Parser {

    constructor() {
        this._string = '';
        this._tokenizer = new Tokenizer();
    }

    /**
     * Parse a string to AST
     * @param {} string 
     */
    parse(string) {
        this._string = string;
        this._tokenizer.init(this._string);

        this._lookahead = this._tokenizer.getNextToken();
        return this.Program();
    }

    /**
     * 
     * @returns 
     */
    Program() {
        return {
            type: 'Program',
            body: this.StatementList()
        }
    }

    /**
     * StatementList:
     *  : Statement
     *  | StatmentList Statement
     * 
     *        ^
     *        |
     *    This is left recursion and must be rewritten
     * 
     * StatementList:
     *  : Statement
     *  | StatementList Statement -> Statement Statement Statement Statement ...
     * 
     */
    StatementList(stopLookahead = null) {
        const statementList = [this.Statement()];

        while (this._lookahead != null && this._lookahead.type !== stopLookahead) {
            statementList.push(this.Statement());
        }
        return statementList;
    }

    /**
     * Statement
     *  : ExpressionStatement
     *  | BlockStatement
     *  ;
     * 
     * @returns 
     */
    Statement() {
        switch (this._lookahead.type) {
            case '{':
                return this.BlockStatement();
            default:
                return this.ExpressionStatement();
        }

    }

    /**
     * BlockStatement
     *  : '{' OptStatementList '}'
     *  ;
     */
    BlockStatement() {
        this._eat('{');

        const body = this._lookahead.type !== '}' ? this.StatementList('}') : [];

        this._eat('}');

        return {
            type: 'BlockStatement',
            body: body
        }
    }


    /**
     * ExpressionStatement
     *  : Expression ';'
     */
    ExpressionStatement() {
        const expression = this.Expression();
        this._eat('SEMI'); // eat up semicolon delimiter
        return {
            type: 'ExpressionStatement',
            expression: expression
        }
    }

    /**
     * 
     * @returns 
     */
    Expression() {
        return this.Literal();
    }


    /**
     * NumericLiteral | StringLiteral
     */
    Literal() {
        switch (this._lookahead.type) {
            case 'NUMBER':
                return this.NumericalLiteral();
            case 'STRING':
                return this.StringLiteral();
        }
        throw new SyntaxError(`Expexted token NUMBER or STRING, but saw ${this._lookahead.type}`);
    }

    StringLiteral() {
        const token = this._eat('STRING');
        return {
            type: 'StringLiteral',
            value: token.value.slice(1, -1)
        }
    }

    NumericalLiteral() {
        const token = this._eat('NUMBER');
        return {
            type: 'NumericalLiteral',
            value: Number(token.value)
        }
    }

    _eat(tokenType) {
        const token = this._lookahead;
        if (token == null) {
            throw new SyntaxError(`Unexpected end of input, expected ${tokenTyp}`);
        }

        if (token.type !== tokenType) {
            throw new SyntaxError(
                `Unexpected token: "${token.type}", expected "${tokenType}"`
            );
        }

        this._lookahead = this._tokenizer.getNextToken();

        return token;
    }
}

module.exports = {
    Parser
}