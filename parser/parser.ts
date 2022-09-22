import { token, types } from '../tokenizer/tokenizer';

export enum parserNodeTypes {
  Program = 'program',
  Number = 'number',
  CallExpression = 'callExpression',
}

export interface RootNode {
  type: parserNodeTypes.Program,
  body: ChildrenNode[],
  context?: any,
}

export interface ChildrenNode {
  type: parserNodeTypes.Number | parserNodeTypes.CallExpression,
  value: string,
  params?: ChildrenNode[]
  context?: any,
}

const createRootNode = (): RootNode => ({
  type: parserNodeTypes.Program,
  body: []
})

function createChildrenNode(token: token): ChildrenNode {
  const type: ChildrenNode['type'] = token.type === types.name ? parserNodeTypes.CallExpression : parserNodeTypes.Number;
  const node = {
    type,
    value: token.value,
  }
  if (token.type === types.name) {
    Reflect.set(node, 'params', []);
  }

  return node;
}

export function parser(tokens: token[]) {
  const rootNode = createRootNode();
  let i = 0;
  let token = tokens[i];

  function walk(): ChildrenNode { 
    token = tokens[i];

    if (token.type === types.number || token.type === types.name) {
      i += 1;
      return createChildrenNode(token);
    }
  
    if (token.type === types.paren && token.value === '(') {
      token = tokens[++i];
      let childrenNode = createChildrenNode(token);
      token = tokens[++i];
      
      while (!(token.type == types.paren && token.value == ')')) {
        childrenNode.params?.push(walk());
        token = tokens[i];
      }
      i += 1;

      return childrenNode;
    }
    throw new Error(`语法错误：${token.type} -- ${token.value}`);
  }

  while (i < tokens.length) {
    rootNode.body.push(walk())
  }

  return rootNode;
}