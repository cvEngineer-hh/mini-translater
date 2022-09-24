import { RootNode, parserNodeTypes } from '../parser/parser';
import { traverser } from '../traverser/traverser';

export enum AstTypes { 
  Program = 'program',
  ExpressionStatement = 'expressionStatement',
  CallExpression = 'callExpression',
  Identifier = 'identifier',
  NumberLiteral = 'NumberLiteral',
}

export type AstCallExpressionNode_nested = {
  type: AstTypes.CallExpression,
  callee: {
    type: AstTypes.Identifier,
    name: string,
  },
  arguments: (AstCallExpressionNode_nested | AstNumberLiteralNode)[]
}

export interface AstCallExpressionNode { 
  type: AstTypes.ExpressionStatement,
  expression: Omit<AstCallExpressionNode_nested, 'type'>,
}

export interface AstNumberLiteralNode { 
  type: AstTypes.NumberLiteral,
  value: string,
}

export interface Ast { 
  type: AstTypes.Program,
  body: (AstCallExpressionNode | AstNumberLiteralNode)[]
}

export function transformer(parser: RootNode): Ast { 
  const rootAst: Ast = {
    type: AstTypes.Program,
    body: [],
  }
  parser.context = rootAst.body as any;

  traverser(parser, {
    // program: {
    //   enter(node) { 
    //     node.context = rootAst.body as any;
    //   }
    // },

    callExpression: {
      enter(node, parent) {        
        let expression = {
          callee: {
            type: AstTypes.Identifier,
            name: node.value,
          },
          arguments: [],
        }

        node.context = expression.arguments;
        
        if (parent.type !== parserNodeTypes.Program) {
          parent.context?.push({
            type: AstTypes.CallExpression,
            ...expression,
          } as any)
        } else { 
          parent.context?.push({
            type: AstTypes.ExpressionStatement,
            expression,
          } as any)
        }
      },
    },

    number: {
      enter(node, parent) {
        parent.context.push({
          type: AstTypes.NumberLiteral,
          value: node.value
        } as any)
      }
    }
  })
  
  return rootAst
}