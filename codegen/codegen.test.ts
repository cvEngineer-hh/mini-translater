import { expect, test } from 'vitest';
import { tokenizer } from '../tokenizer/tokenizer';
import { parser } from '../parser/parser';
import { transformer } from '../transformer/transformer';
import { codegen } from './codegen';

test('测试codegen', () => { 
  const tokens = tokenizer('(add 2 (subtract 4 2))(add 2 (subtract 4 2))');
  const parsers = parser(tokens);
  const Ast = transformer(parsers);
  expect(codegen(Ast)).toBe('add(2, subtract(4, 2))add(2, subtract(4, 2))');
})


  