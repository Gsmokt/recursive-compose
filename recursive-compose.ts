// Taka opcja, bo w sumie po cholere pisać jakiś
// compose z reducem, jak można z tym samym
// skutkiem zrobić rekurencyjnie
// łatwiej to czytać i w ts otypować

// Funkcje wyjściowe, powiedzmy, że jakieś promisy

const first = (a: string): Promise<String> => {
  return Promise.resolve(a.toUpperCase());
};

const second = (a: string): Promise<String> => {
  return Promise.resolve(a.trim());
};

const third = (a: string): Promise<String[]> => {
  return Promise.resolve(a.split(" "));
};

// 1. Wersja, w której iteruje po tablicy,
//  bez żadnych reduców, calli, sliców
//  zwykła pętla po tablicy

// const compose = (...a: Array<Function>): (x:string) => Promise<String[]> => {
//     const innerFunc = async (b:String,x = a.length-1) => {
//         if(x === 0) return (a[x])(b)
//         return  innerFunc(await (a[x])(b), x-1)
//     }
//     return innerFunc
// }

// const result = compose(third,second,first)(" hello world");
// result.then(x => console.log(x))

// 2. Tu z tą różnicą, że ze slicem
//  można upchać w jednej linii
//  i pewnie bardziej czytelne,
//  od indeksów i x-ów można oczopląsu dostać

const compose = (y: Array<Function>): ((x: string) => Promise<String[]>) =>
  y.length === 1
    ? async (a: string) => await y[0](a)
    : async (a: string) => compose(y.slice(1))(await y[0](a));

// W pierwszej wersji jest tablica na odwrót,
// bo łatwiej iterować od końca i zmiena się kolejność
// Ze slicem można zacząć od pierwszego indeksu,

const result = compose([first, second, third])(" hello world");
result.then((x) => console.log(x));
