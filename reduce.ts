// Reduce rekurencyjnie

interface Person {
  name: string;
  age: number;
}

interface Result {
  result: number;
}

type CallBack = (obj: Person, acc: Result) => Result;

const array: Person[] = [
  { name: "Patrick", age: 18 },
  { name: "Jane", age: 12 },
  { name: "Mario", age: 20 },
  { name: "Paul", age: 13 },
  { name: "Janson", age: 35 },
  { name: "Adam", age: 45 },
];

const callBack = (obj: Person, acc: Result): Result => {
  if (obj.age >= 18) acc.result += obj.age;
  return acc;
};

const reduceResult = (cb: CallBack) => {
  const inner = (arr: Person[]) =>
    arr.length == 1
      ? (acc: Result): Result => cb(arr[0], acc)
      : (acc: Result): Result => inner(arr.slice(1))(cb(arr[0], acc));

  return inner;
};

const res = reduceResult(callBack)(array)({ result: 0 });
console.log(res);
