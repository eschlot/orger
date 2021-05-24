class myIron extends myItem {
    constructor(init_x: number, init_y: number) {
        super(init_x, init_y)
        this.name = "Iron"
        this.img = assets.image`iron`
        this.update()
    }

    public interact(): [myItem[], myItem[]] {
        // this goes to the inventory when it is interacted with.
        return [[], [this]]
    }
}
