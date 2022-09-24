import { Ast, AstTypes, AstCallExpressionNode_nested, AstCallExpressionNode } from '../transformer/transformer'

type AstChildrenTypes = Ast['body'][number];

export function codegen(node: Ast | AstChildrenTypes | AstCallExpressionNode_nested): string | void {
  // 将表达式类型转换为代码
  function callExpressionToCode(node: AstCallExpressionNode['expression']) { 
    return node.callee.name  + '(' + node.arguments.map(codegen).join(', ') + ')'
  }

  switch (node.type) {
    case AstTypes.NumberLiteral:
      return node.value;
    case AstTypes.CallExpression:
      return callExpressionToCode(node);
    case AstTypes.ExpressionStatement:
      return callExpressionToCode(node.expression);
    case AstTypes.Program: 
      return node.body.map(codegen).join('')
    default:
      break;
  }
}