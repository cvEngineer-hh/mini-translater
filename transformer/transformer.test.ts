import { expect, test } from 'vitest';
import { tokenizer } from '../tokenizer/tokenizer';
import { parser } from '../parser/parser';
import { AstTypes, Ast, transformer } from './transformer';

test('测试transformer', () => { 
  const tokens = tokenizer('(add 2 (subtract 4 2))');
  const parsers = parser(tokens);
  const AST: Ast = {
    type: AstTypes.Program,
    body: [
      {
        type: AstTypes.ExpressionStatement,
        expression: {
          callee: {
            type: AstTypes.Identifier,
            name: 'add',
          },

          arguments: [
            { type: AstTypes.NumberLiteral, value: '2' },
            {
              type: AstTypes.CallExpression,
              callee: {
                type: AstTypes.Identifier,
                name: 'subtract',
              },
              arguments: [
                { type: AstTypes.NumberLiteral, value: '4' },
                { type: AstTypes.NumberLiteral, value: '2' },
              ]
            },
          ],
        }
      }
    ],
  }

  
  expect(transformer(parsers)).toEqual(AST);
})