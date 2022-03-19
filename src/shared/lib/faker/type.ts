import { random } from '../helpers';

export abstract class BaseType<R> {
  abstract type: string;
  abstract generate(...args: any[]): R;
}

const randomInt = random.int;
const randomFloat = random.float;

export class _Int extends BaseType<number> {
  type = 'int';
  constructor(private min: number, private max: number) {
    super();
  }
  generate() {
    return randomInt(this.min, this.max);
  }
}

export class _Float extends BaseType<number> {
  type = 'int';
  constructor(
    private min: number,
    private max: number,
    private decimals: number
  ) {
    super();
  }
  generate() {
    return randomFloat(this.min, this.max, this.decimals);
  }
}

export class _Enum<R> extends BaseType<R> {
  type = 'enum';
  constructor(private enums: R[]) {
    super();
  }
  generate() {
    const index = randomInt(0, this.enums.length);
    return this.enums[index];
  }
}

export class _Object<R> extends BaseType<any> {
  type = 'object';
  constructor(private conf: Record<keyof R, BaseType<any>>) {
    super();
  }
  generate(index?: number) {
    return Object.entries<BaseType<any>>(this.conf).reduce(
      (acc, [key, value]) => ({
        ...acc,
        [key]: value.generate(index),
      }),
      {} as R
    );
  }
}

export class _Index extends BaseType<number> {
  type = 'index';
  generate(index: number) {
    return index;
  }
}

export class _UniqueList<R> extends BaseType<Array<R>> {
  type = 'uniqueList';
  constructor(private element: BaseType<R>, private size: number) {
    super();
  }
  generate() {
    let set = new Set<R>();
    for (let i = 0; i < this.size; i++) {
      const item = this.element.generate(i);
      if (set.has(item)) {
        --i;
        continue;
      }
      set.add(item);
    }
    return Array.from(set);
  }
}

export class _List<R> extends BaseType<Array<R>> {
  type = 'array';
  constructor(private element: BaseType<R>, private size: number) {
    super();
  }
  generate() {
    let result: R[] = [];
    for (let i = 0; i < this.size; i++) {
      result.push(this.element.generate(i));
    }
    return result;
  }
}

export class _Const<R> extends BaseType<R> {
  type = 'const';
  constructor(private value: R) {
    super();
  }
  generate() {
    return this.value;
  }
}

export class _Date extends BaseType<Date> {
  type = 'date';
  constructor(private from: string, private to: string) {
    super();
  }
  generate(): Date {
    const fromMilli = Date.parse(this.from);
    const dateOffset = randomInt(0, Date.parse(this.to) - fromMilli);

    const newDate = new Date(fromMilli + dateOffset);

    return newDate;
  }
}

export class _Unique<R> extends BaseType<R> {
  type = 'unique';
  private unique: R[] = [];
  constructor(unique: R[]) {
    super();
    this.unique = [...unique];
  }
  generate() {
    const item = this.unique.pop();

    if (!item) {
      throw new Error('Not enough unique items');
    }

    return item;
  }
}
