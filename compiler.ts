import { tokenizer } from './tokenizer/tokenizer';
import { parser } from './parser/parser';
import { transformer } from './transformer/transformer';
import { codegen } from './codegen/codegen';

let data: any;

function compilerStep(message: string, cb: typeof tokenizer | typeof parser | typeof transformer | typeof codegen) {
  data = cb(data);
  console.log('------------------------------------------------');
  console.log(message, data);
};

export function compiler(code: string = '(add 2 (subtract 4 2))') {
  data = code;
  console.log('初始化完成，正在转换代码：', code);

  compilerStep('转换为tokenizer：', tokenizer);
  compilerStep('转换为parser：', parser);
  compilerStep('转换为Ast树：', transformer);
  compilerStep('转换完成：', codegen);

  return data;
}