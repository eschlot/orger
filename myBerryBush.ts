class myBerryBush extends myItem {
    constructor(init_x: number, init_y: number) {
        super(init_x, init_y)
        this.name = "Berry bush"
        this.img = assets.image`berrybush`
        this.update()
    }


    public interact(): [myItem[], myItem[]] {
        return [[new myBerrys(this.x, this.y)], []]
    }

}