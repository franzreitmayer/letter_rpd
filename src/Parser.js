class Parser {
    /**
     * Parse a string to AST
     * @param {} string 
     */
    parse(string) {
        this._string = string;
        return this.Program();
    }

    /**
     * 
     * @returns 
     */
    Program() {
        return this.NumericalLiteral();
    }

    NumericalLiteral() {
        return {
            type: 'NumericalLiteral',
            value: Number(this._string)
        }
    }
}

module.exports = {
    Parser
}