const babylon = require('babylon')
const fs = require('fs')
const traverse = require('babel-traverse').default
const { transformFromAst } = require('babel-core')

module.exports = {
    getAST: (path) => { // 转成ast
        const source = fs.readFileSync(path, 'utf-8')

        return babylon.parse(source, {
            sourceType: 'module'
        })
    },
    getDependencies: (ast) => { // 获取关联依赖
        const dependencies = []
        traverse(ast, {
            ImportDeclaration: ({ node }) => {
                dependencies.push(node.source.value);
            }

        })
        return dependencies
    },
    transform: (ast) => { // 转换成es5代码
        const { code } = transformFromAst(ast, null, {
            presets: ['env']
        })

        return code
    }
}