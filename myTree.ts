class myTree extends myItem
{
    constructor(init_x: number, init_y:number) {
        super(init_x,init_y)
        this.img =assets.image`Tree`
        this.update()
    }

    public interact(): [myItem[], myItem[]] {
        return [[new myWood(this.x, this.y)], []]
    }
}
