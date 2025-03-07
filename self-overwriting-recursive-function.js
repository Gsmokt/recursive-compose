// Funkcja może recurencyjnie się nadpisywać i
// backtrackować jakiś proces
// przy czym podstawiać można dowolną funkcję
// można zapisać pierwotną funkcję w closure i
// do niej wracać albo do jej zasobów, prototypu itp.

function first(x) {
  const firstFirst = first;
  if (x >= 5) {
    first = (x) => {
      console.log(firstFirst.prototype.name);
      console.log(firstFirst.prototype.protoFunc);
      console.log(firstFirst.arguments);
      if (x >= 10) {
        first = (x) => {
          if (x >= 50) return x;
          console.log(x);
          first(++x);
        };
        return first(0);
      }
      console.log(x);
      return first(++x);
    };
  }
  console.log(x);
  first(++x);
}
first.prototype.name = "";
first.prototype.protoFunc = () => {};
first(0);
