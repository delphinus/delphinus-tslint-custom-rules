import * as Lint from "tslint"
import { IOptions } from "tslint/lib/language/rule/rule"
import * as ts from "typescript"

interface NoErrorConstructorRuleOptions {
    ignorePattern?: RegExp
}

export class Rule extends Lint.Rules.AbstractRule {
    apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
        return this.applyWithWalker(new Walk(sourceFile, this.getOptions()))
    }
}

class Walk extends Lint.RuleWalker {
    private ignorePattern: RegExp | undefined

    constructor(sourceFile: ts.SourceFile, options: IOptions) {
        super(sourceFile, options)
        const argument = options.ruleArguments[0]
        if (argument) {
            const pattern = argument.ignorePattern
            if (typeof pattern === "string") {
                this.ignorePattern = new RegExp(pattern)
            }
        }
    }

    visitClassExpression(node: ts.ClassExpression) {
        if (node.name) {
        }
        super.visitClassExpression(node)
    }
}
