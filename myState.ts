class myState
{
    public player_x:number
    public player_y:number

    public itemsInWorld : myItem[];
    public itemsInInventory : myItem[];
    public itemsGrouped:myItem[][]; // An Array of Arrays, Every entry contains a list of myItem objects of same type. Only valid during inventory storyboard active.

    constructor()
    {
        this.itemsInWorld=[]
        this.itemsInInventory=[]
        this.itemsGrouped=[]
    }

}