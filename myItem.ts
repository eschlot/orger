class myItem {
    public x: number;
    public y: number;
    public img:Image;

    constructor(init_x: number, init_y:number) {
        //this.greeting = message;
        this.x=init_x
        this.y=init_y        
    }

    update()
    {
        
    }

    public interact():[myItem[],myItem[]]
    {

        console.log("interact invoked on base class.")
        return [[],[]]
    }

}