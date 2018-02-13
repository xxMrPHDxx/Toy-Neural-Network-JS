global.Matrix = require('./matrix.js');

expect.extend({
	toBeRandom(received) {
		let isRandom = true;
		if(received instanceof Matrix){
			received.data.forEach(rows => {
				rows.forEach(value => {
					isRandom = isRandom && value !== 0;
				});
			});
		}

		return {message: `expected ${received.data} to be random`,pass: isRandom};
	}
});

// Contruct a new Matrix object
test("Creating Matrix object with arguments",() => {
	let matrix = new Matrix(2,2);
	expect(matrix).toEqual({
		rows: 2,
		cols: 2,
		data: [
			[0,0],
			[0,0]
		]
	});
});

// Contruct a new Matrix object
test("Creating Matrix object without arguments",() => {
	let matrix = new Matrix();
	expect(matrix).toEqual({
		rows: 1,
		cols: 1,
		data: [[0]]
	});
});

// Static from array
test("Matrix:fromArray",() => {
	let matrix = Matrix.fromArray([1,2,3,4]);
	expect(matrix).toEqual({
		rows: 4,
		cols: 1,
		data: [[1],[2],[3],[4]]
	})
});

// Static from array
test("Matrix:fromArray | error handling",() => {
	let matrix = Matrix.fromArray(5);
	expect(matrix).toBe(undefined)
});

// Subtracting two matrices
test("Matrix:subtract",() => {
	let m1 = new Matrix(2,2).map((_,i,j) => i * 2 + j + 1);
	let m2 = new Matrix(2,2).map((_,i,j) => i * 2 + j);
	let result = Matrix.subtract(m1,m2);
	expect(result).toEqual({
		rows: 2,
		cols: 2,
		data: [
			[1,1],
			[1,1]
		]
	});
});

// Subtracting two matrices
test("Matrix:subtract | error handling",() => {
	let m1 = new Matrix(2,2).map((_,i,j) => i * 2 + j + 1);
	let m2 = 1;
	let result = Matrix.subtract(m1,m2);
	expect(result).toBe(undefined);
});

// Convert to Array
test("Matrix.toArray",() => {
	let m1 = new Matrix(2,2).map((_,i,j) => i * 2 + j + 1);
	let result = m1.toArray();
	expect(result).toEqual(
		[1,2,3,4]
	);
});

// Randomize a matrix
test("Matrix.randomize",() => {
	let result = new Matrix(2,2);
	result.randomize();
	expect(result).toBeRandom();
});

// Adding two matrices
test("Matrix.add | Adding a matrix",() => {
	let result = new Matrix(2,3).map((_,i,j) => i * 3 + j + 1);
	let adder = new Matrix(2,3).map(() => 1);
	result.add(adder);
	expect(result).toEqual({
		rows: 2,
		cols: 3,
		data: [
			[2,3,4],
			[5,6,7]
		]
	});
});

// Adding two matrices
test("Matrix.add | Adding a number",() => {
	let result = new Matrix(2,3).map((_,i,j) => i * 3 + j + 1);
	let adder = 1;
	result.add(adder);
	expect(result).toEqual({
		rows: 2,
		cols: 3,
		data: [
			[2,3,4],
			[5,6,7]
		]
	});
});

// Adding two matrices
test("Matrix.add | Adding an undefined argument",() => {
	let result = new Matrix(2,3).map((_,i,j) => i * 3 + j + 1);
	let expected = new Matrix(2,3).map((_,i,j) => i * 3 + j + 1);
	result.add(undefined);
	expect(result).toEqual(expected);
});

// Transpose a matrix
test("Matrix:transpose",() => {
	let result = new Matrix(2,3).map((_,i,j) => i * 3 + j + 1);
	let expected = new Matrix(3,2).map((_,i,j) => i + j * 3 + 1);
	let transpose = Matrix.transpose(result);
	expect(transpose).toEqual(expected);
});

// Transpose a matrix
test("Matrix:transpose | error handling",() => {
	let transpose = Matrix.transpose(undefined);
	expect(transpose).toBe(undefined);
});

// Multiply two matrices
test("Matrix:multiply",() => {
	let m1 = new Matrix(2,3).map((_,i,j) => i * 3 + j + 1);
	let m2 = new Matrix(3,3).map((_,i,j) => i === j ? 1 : 0);  // Identity
	let result = Matrix.multiply(m1,m2);
	expect(result).toEqual(m1); 		// MI = M
});

// Multiply two matrices
test("Matrix:multiply | error handling #1 - Arguments are not matrices",() => {
	try{
		Matrix.multiply(1,2);
	}catch(e){
		expect(e).toEqual(new Error('Matrix.multiply : Arguments must be Matrix object'));
	}
});

// Multiply two matrices
test("Matrix:multiply | error handling #1 - Column of A and rows of b unmatched",() => {
	let m1 = new Matrix(2,3);
	let m2 = new Matrix(2,3);
	try{
		Matrix.multiply(m1,m2);
	}catch(e){
		expect(e).toEqual(new Error('Matrix.multiply : Columns of A must match rows of B.'));
	}
});

// Multiply two matrices
test("Matrix.multiply | hadamart product",() => {
	let m1 = new Matrix(2,3).map(() => 2);
	let m2 = new Matrix(2,3).map(() => 3);
	let expected = new Matrix(2,3).map(() => 6);
	let result = m1.multiply(m2);
	expect(result).toEqual(expected);
});

// Multiply two matrices
test("Matrix.multiply | scalar product",() => {
	let m1 = new Matrix(2,3).map(() => 2);
	let expected = new Matrix(2,3).map(() => 6);
	let result = m1.multiply(3);
	expect(result).toEqual(expected);
});

// Mapping
test("Matrix.map",() => {
	let result = new Matrix(2,3).map((_,i,j) => i * 3 + j + 1);
	expect(result).toEqual({
		rows: 2,
		cols: 3,
		data: [
			[1,2,3],
			[4,5,6]
		]
	});
});

// Static mapping
test("Matrix:map",() => {
	let result = Matrix.map(new Matrix(2,3),(_,i,j) => i * 3 + j + 1);
	expect(result).toEqual({
		rows: 2,
		cols: 3,
		data: [
			[1,2,3],
			[4,5,6]
		]
	});
});