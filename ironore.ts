class myIronOre extends myItem {
    constructor(init_x: number, init_y: number) {
        super(init_x, init_y)
        this.name = "Iron Ore"
        this.img = assets.image`ironore`
        this.update()
    }


    public interact(): [myItem[], myItem[]] {
        return [[], [this]]
    }

}