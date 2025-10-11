const ships = require('./src/Ship');

test("sum the number",()=>{
    const ship = new ships("destroyer",3);
    expect(ship.hits).toBe(0);
    ship.hit();
    expect((ship.hits)).toBe(1);
    ship.hit();
    expect((ship.hits)).toBe(2);
    ship.hit();
    expect((ship.hits)).toBe(3);
    expect(ship.isSunk()).toBe(true);

});