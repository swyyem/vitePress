const a = [1, 2, 3];
const b = a; // 浅拷贝
b[0] = 4;
console.log(a); // [4, 2, 3]
console.log(b); // [4, 2, 3]
