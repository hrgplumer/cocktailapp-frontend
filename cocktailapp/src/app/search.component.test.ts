test('Adds 2 + 2 to equal 4', () => {
    expect(add(2,2)).toBe(4);
});

function add(a,b) {
    return a + b;
}