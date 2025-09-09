

### 1) What is the difference between var, let, and const?
### Ans:
  - **var** - Function-scoped, hoisted, can be      redeclared & reassigned.
   
   - **let** - Block-scoped, not redeclarable, can be reassigned.
    
   - **const** → Block-scoped, not redeclarable, cannot be reassigned.


### 2) What is the difference between map(), forEach(), and filter()? 
### Ans:
- **forEach()** → Executes a function on each element, returns `undefined`.
- **map()** → Transforms each element, returns a **new array**.
- **filter()** → Selects elements based on a condition, returns a **new array**.

example
const numbers = [1,2,3,4];

numbers.forEach(n => console.log(n));      output: 1 2 3 4
const doubled = numbers.map(n => n*2);     output: [2,4,6,8]
const even = numbers.filter(n => n%2===0); output: [2,4]


### 3) What are arrow functions in ES6?
### Ans:
- Shorter syntax for writing functions using `=>`.
- Lexically binds `this` (inherits `this` from surrounding code).

const add = function(a, b) { return a + b; }
const add = (a, b) => a + b;


### 4) How does destructuring assignment work in ES6?
   ### Ans
- Allows unpacking values from **arrays** or **objects** into separate variables.

const [a, b] = [1, 2];   a = 1, b = 2
const {name, age} = {name: "Rajat", age: 23}; // name = "Rajat", age = 23


### 5) Explain template literals in ES6. How are they different from string concatenation?
   ### Ans
- Use backticks `` ` `` to create strings.
- Allow **interpolation** (`${}`) and **multi-line strings**.
- Cleaner and more readable than traditional string concatenation.

const name = "Rajat";
const age = 23;

const message = `My name is ${name} and I am ${age} years old.`;
const oldMessage = "My name is " + name + " and I am " + age + " years old.";


