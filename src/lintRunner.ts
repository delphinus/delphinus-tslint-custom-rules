// This module is written with referring to here.
// https://github.com/wix-incubator/wix-tslint-custom-rules/blob/master/src/lintRunner.ts
import { Configuration, Linter } from "tslint"

interface RuleSetting {
    name: string
    options: string[]
}

interface HelperParameters {
    src: string
    rule: RuleSetting
    fileName?: string
}

export const helper = ({ src, rule, fileName }: HelperParameters) => {
    const linter = new Linter({ fix: false })
    linter.lint(
        fileName || "",
        src,
        Configuration.parseConfigFile({
            rules: {
                [rule.name]: [true, ...rule.options],
            },
            rulesDirectory: "src",
        }),
    )
    return linter.getResult()
}
