import { expect, test } from 'vitest';
import { traverser, Options } from './traverser';
import { tokenizer } from '../tokenizer/tokenizer';
import { parser } from '../parser/parser';

test('traverser', () => { 
  const tokens = tokenizer('(add 2 (subtract 4 2))');
  const parsers = parser(tokens);

  const activeArr: string[] = [];
  const options: Options = {
    program: {
      enter() { 
        activeArr.push('program-enter')
      },

      exit() {
        activeArr.push('program-exit')
      },
    },

    number: {
      enter() { 
        activeArr.push('number-enter')
      },

      exit() {
        activeArr.push('number-exit')
      },
    },

    callExpression: {
      enter() { 
        activeArr.push('callExpression-enter')
      },

      exit() {
        activeArr.push('callExpression-exit')
      },
    },

  }

  traverser(parsers, options);

  expect(activeArr).toEqual([
    'program-enter',
    'callExpression-enter',
    'number-enter',
    'number-exit',
    'callExpression-enter',
    'number-enter',
    'number-exit',
    'number-enter',
    'number-exit',
    'callExpression-exit',
    'callExpression-exit',
    'program-enter'
  ])
})