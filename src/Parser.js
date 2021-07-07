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
            body: this.Literal()
        }
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