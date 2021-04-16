// Gib deinen Code hier ein
class myStone extends myItem
{
    constructor(init_x: number, init_y:number) {
        super(init_x,init_y)
        this.name = "Stone"
        this.img =assets.image`Stone`
        this.update()
    }
    

    public interact(): [myItem[], myItem[]] {
        return [[new myStoneStaple(this.x, this.y)], []]
    }

}