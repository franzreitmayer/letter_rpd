const Spec = [{
        // Single line comment
        regExPattern: /^\/\/.*/,
        tokenType: null
    },
    {
        // multiline comment
        regExPattern: /^\/\*[\s\S]*?\*\//,
        tokenType: null
    },
    {
        // SEMI - Semikolon as delimiter
        regExPattern: /^;/,
        tokenType: 'SEMI'
    },
    {
        // OPEN CURLY BRACKET
        regExPattern: /^\{/,
        tokenType: '{'
    },
    {
        // CLOSING CURLY BRACKET
        regExPattern: /^\}/,
        tokenType: '}'
    },
    {
        regExPattern: /^\s+/,
        tokenType: null
    },
    {
        regExPattern: /^\d+/,
        tokenType: 'NUMBER'
    },
    {
        regExPattern: /^"[^"]*"/,
        tokenType: 'STRING'
    },
    {
        regExPattern: /^'[^']*'/,
        tokenType: 'STRING'
    }
];


class Tokenizer {
    init(string) {
        this._string = string;
        this._cursor = 0;
    }

    hasMoreTokens() {
        return this._cursor < this._string.length;
    }


    getNextToken() {
        if (!this.hasMoreTokens()) {

            return null;
        }

        const string = this._string.slice(this._cursor);
        for (const { regExPattern, tokenType }
            of Spec) {
            // const [regExPattern, tokenType] = Spec[i];
            const tokenValue = this._match(regExPattern, string);
            if (tokenValue == null) {
                continue;
            }

            if (tokenType == null) {
                return this.getNextToken(); // as null is returned from whitespaces ignore it and return next token
            }
            return {
                type: tokenType,
                value: tokenValue
            }
        }

        throw new SyntaxError(`Could not match any token at ${string}`);

        if (!Number.isNaN(Number(string[0]))) {
            let number = '';
            while (!(Number.isNaN(Number(string[this._cursor])))) {
                number += string[this._cursor]
                this._cursor++;
            }
            return {
                type: 'NUMBER',
                value: number
            }
        }
    }

    _match(regularExpression, string) {
        const matched = regularExpression.exec(string);
        if (matched == null) {
            return null;
        }
        this._cursor += matched[0].length;
        return matched[0];
    }
}

module.exports = {
    Tokenizer
}