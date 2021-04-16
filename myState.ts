class myState
{
    public player_x:number
    public player_y:number

    public itemsInWorld : myItem[];
    public itemsInInventory : myItem[];

    constructor()
    {
        this.itemsInWorld=[]
        this.itemsInInventory=[]
    }

}