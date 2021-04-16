class myStoneStaple extends myItem {
    constructor(init_x: number, init_y: number) {
        super(init_x, init_y)
        this.name = "Stones"
        this.img = assets.image`StoneStaple`
        this.update()
    }

    public interact(): [myItem[], myItem[]] {
        // Wood goes to the inventory when it is interacted with.
        return [[], [this]]
    }
}
