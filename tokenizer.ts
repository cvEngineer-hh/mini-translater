export enum types { 
  paren = 'paren',
  name = 'name',
  number = 'number',
}

export interface token { 
  type: types,
  value: string
}

export function tokenizer(str: string): token[] { 
  let i = 0,
    val = '',
    lastType: types,
    arr: token[] = [];
  
  while (i < str.length) {
    const checks: { [key in types]: RegExp } = {
      [types.paren]: /[\(|\)|+|-]/,
      [types.number]: /[1-9]/,
      [types.name]: /[a-zA-Z]/,
    }

    if (checks.paren.test(str[i])) {
      arr.push({ type: types.paren, value: str[i] });
    }

    if (checks.number.test(str[i])) { 
      val += str[i];
      if (/\s/.test(str[i + 1])) { 
        arr.push({ type: types.number, value: val });
        val = '';
      }
    }

    if (checks.name.test(str[i])) { 
      val += str[i];
      if (/\s/.test(str[i + 1])) { 
        arr.push({ type: types.name, value: val });
        val = '';
      }
    }
    i += 1;
  }
  
  return arr;
}