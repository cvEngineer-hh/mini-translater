import { expect, test } from "vitest"
import { tokenizer, types } from './tokenizer'
// import { test } from 'vitest';
test.skip('tets_add', () => { 
  const a = {
    name: '张三'
  }
  expect(a).toEqual({name: '张三'})
}) 

test('测试括号', () => { 
  expect(tokenizer('( )')).toEqual([
    { type: types.paren, value: '('},
    { type: types.paren, value: ')'},
  ])
})

test('测试语法', () => { 
  expect(tokenizer('( 1 + 2 )')).toEqual([
    { type: types.paren, value: '('},
    { type: types.number, value: '1'},
    { type: types.paren, value: '+'},
    { type: types.number, value: '2'},
    { type: types.paren, value: ')'},
  ])
})

test('最终测试', () => { 
  const code = '(add 2 (subtract 4 2))';
  
  const tokens = [
    { type: types.paren, value: '('},
    { type: types.name, value: 'add'},
    { type: types.number, value: '2'},
    { type: types.paren, value: '('},
    { type: types.name, value: 'subtract'},
    { type: types.number, value: '4'},
    { type: types.number, value: '2'},
    { type: types.paren, value: ')'},
    { type: types.paren, value: ')'},
  ]

  expect(tokenizer(code)).toEqual(tokens);
})