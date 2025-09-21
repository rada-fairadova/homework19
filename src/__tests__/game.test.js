describe('Game basic tests', () => {
    test('should pass basic math test', () => {
        expect(1 + 1).toBe(2);
    });

    test('should handle object equality', () => {
        const data = { one: 1 };
        data['two'] = 2;
        expect(data).toEqual({ one: 1, two: 2 });
    });
});
