class myCoal extends myItem {
    constructor(init_x: number, init_y: number) {
        super(init_x, init_y)
        this.name = "Coal"
        this.img = assets.image`coal`
        this.update()
    }

    public interact(): [myItem[], myItem[]] {
        // this goes to the inventory when it is interacted with.
        return [[], [this]]
    }
}
