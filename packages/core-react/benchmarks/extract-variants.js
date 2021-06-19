const { objectLoop } = require('@aesthetic/utils');
const Benchmark = require('benchmark');

const suite = new Benchmark.Suite();
const obj = {
	a: 1,
	b: 2,
	c: 3,
	d: 4,
	e: 5,
	f: 6,
	g: 7,
	h: 8,
	i: 9,
	j: 10,
};

const types = new Set(['b', 'h', 'j']);

suite.add('Object.keys loop', () => {
	const props = {};
	const variants = {};

	Object.keys(obj).forEach((key) => {
		if (types.has(key)) {
			variants[key] = obj[key];
		} else {
			props[key] = obj[key];
		}
	});
});

suite.add('Object loop', () => {
	const props = {};
	const variants = {};

	objectLoop(obj, (value, key) => {
		if (types.has(key)) {
			variants[key] = value;
		} else {
			props[key] = value;
		}
	});
});

suite.add('Variant loop + undefined', () => {
	const props = { ...obj };
	const variants = {};

	types.forEach((type) => {
		if (type in props) {
			variants[type] = props[type];
			props[type] = undefined;
		}
	});
});

suite.add('Variant loop + undefined + assign', () => {
	const props = Object.assign({}, obj);
	const variants = {};

	types.forEach((type) => {
		if (type in props) {
			variants[type] = props[type];
			props[type] = undefined;
		}
	});
});

suite.add('Variant loop + delete', () => {
	const props = { ...obj };
	const variants = {};

	types.forEach((type) => {
		if (type in props) {
			variants[type] = props[type];
			delete props[type];
		}
	});
});

suite.add('Variant loop + delete + assign', () => {
	const props = Object.assign({}, obj);
	const variants = {};

	types.forEach((type) => {
		if (type in props) {
			variants[type] = props[type];
			delete props[type];
		}
	});
});

// Run all benchmarks
suite
	.on('cycle', function cycle(event) {
		console.log(String(event.target));
	})
	.on('complete', function complete() {
		console.log(`Fastest is ${this.filter('fastest').map('name')}`);
	})
	.run();
