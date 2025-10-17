

export default class Ship{
    constructor(name,length)
    {
        this.name = name;
        this.length = length;
        this.hits = 0;
        this.coordinates = [];
    }

    hit()
    {
        this.hits+=1;
    }

    isSunk()
    {
        return this.hits >= this.length;
    }
}

// module.exports = Ship;