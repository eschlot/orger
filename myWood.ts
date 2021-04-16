class myWood extends myItem
{
    constructor(init_x: number, init_y:number) {
        super(init_x,init_y)
        this.img =assets.image`Wood`
        this.update()
    }
    
    public interact():[myItem[],myItem[]]
    {
        // Wood goes to the inventory when it is interacted with.
        return [[],[this]]
    }
}
