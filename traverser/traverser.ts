import { RootNode, ChildrenNode, parserNodeTypes } from '../parser/parser';

type OptionsCb = (node: ChildrenNode | RootNode, parser: ChildrenNode | RootNode) => void;
type optionKeys = 'program' | 'number' | 'callExpression';

interface OptionItem { 
  enter: OptionsCb,
  exit: OptionsCb,
}

export type Options = { 
  [key in optionKeys]?: OptionItem;
}

export function traverser(parser: RootNode, options: Options) {
  function deep(nodes: ChildrenNode[], parent: ChildrenNode | RootNode) { 
    nodes.forEach(node => { 
      options[node.type]?.enter(node, parent);
      if (node.type === parserNodeTypes.CallExpression) { 
        node.params && deep(node.params, node);
      }
      options[node.type]?.exit(node, parent);
    })
  }

  options[parser.type]?.enter(parser, parser);
  deep(parser.body, parser)
  options[parser.type]?.enter(parser, parser);
}