import {
  BaseType,
  _Const,
  _Date,
  _Enum,
  _Float,
  _Index,
  _Int,
  _List,
  _Object,
} from './type';

export const fakerSDK = () => {
  const enums = <R>(e: R[]) => new _Enum<R>(e);
  const index = () => new _Index();
  const constant = <R>(value: R) => new _Const(value);

  const int = (min: number, max: number) => new _Int(min, max);
  const date = (from: string, to: string) => new _Date(from, to);

  const array = <R>(element: BaseType<R>, size: number) =>
    new _List(element, size);

  const object = <R>(conf: Record<string, BaseType<any>>) =>
    new _Object<R>(conf);

  const float = (min: number, max: number, decimals: number) =>
    new _Float(min, max, decimals);

  return {
    int,
    array,
    index,
    date,
    enums,
    float,
    object,
    constant,
  };
};
