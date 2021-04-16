class myItem {
    public x: number;
    public y: number;
    public img:Image;
    public name:string;

    constructor(init_x: number, init_y:number) {
        //this.greeting = message;
        this.x=init_x
        this.y=init_y  
        this.name = "Item"      
    }

    update()
    {
        
    }




    public interact():[myItem[],myItem[]]
    {
        console.log("interact invoked on base class. This is usually a problem in the subclass.")
        return [[],[]]
    }

}