import { expect, test } from "vitest"
import { tokenizer } from '../tokenizer/tokenizer'
import { parser, parserNodeTypes } from './parser';

test('parser最终测试', () => {
  const tokens = tokenizer('(add 2 (subtract 4 2))');
  const parsers = {
    type: parserNodeTypes.Program,
    body: [

      {
        type: parserNodeTypes.CallExpression,
        value: 'add',
        params: [
          { type: parserNodeTypes.Number, value: '2' },
          {
            type: parserNodeTypes.CallExpression, value: 'subtract',
            params: [
  
              { type: parserNodeTypes.Number, value: '4' },
              { type: parserNodeTypes.Number, value: '2' },
            ]
          },
        ],
      }
    ]
  }

  expect(parser(tokens)).toEqual(parsers)
})

test('测试number', () => { 
  const tokens = tokenizer('2');

  expect(parser(tokens)).toEqual({
    type: parserNodeTypes.Program,
    body: [
      {
        type: parserNodeTypes.Number,
        value: '2',
      }
    ]
  })
})

test('测试add', () => { 
  const tokens = tokenizer('(add 2 4)');
  
  expect(parser(tokens)).toEqual({
    type: parserNodeTypes.Program,
    body: [
      {
        type: parserNodeTypes.CallExpression,
        value: 'add',
        params: [
          { type: parserNodeTypes.Number, value: '2' },
          { type: parserNodeTypes.Number, value: '4' },
        ],
      }
    ]
  })
})