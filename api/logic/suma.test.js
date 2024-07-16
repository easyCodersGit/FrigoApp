import suma from "./suma.js"

test('sumar 1 + 2 es igual a 3', () => {
    expect(suma(1, 2)).toBe(3)
})

test('sumar 1 + 2 no es igual a 4', () => {
    expect(suma(1, 2)).not.toBe(4)
})