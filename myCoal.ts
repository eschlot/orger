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


    public interactInInventory(state: myState): myState {
        let coalPresent = state.itemsGrouped.find(function (value : myItem[], index:number)
        {
            return value[0] instanceof myCoal && value.length>=2
        })
        let ironOrePresent = state.itemsGrouped.find(function (value: myItem[], index: number) {
            return value[0] instanceof myIronOre && value.length >= 1
        })

        if ((ironOrePresent) && (coalPresent))
        {
            let coalToBeRemoved = 2
            let ironOreToBeRemoved=1
            for (let i=state.itemsInInventory.length-1;i>=0;i--)
            {
                if ((state.itemsInInventory[i] instanceof myCoal) && (coalToBeRemoved>0))
                {
                    state.itemsInInventory.removeAt(i)
                    coalToBeRemoved= coalToBeRemoved-1
                }
                else if ((state.itemsInInventory[i] instanceof myIronOre) && (ironOreToBeRemoved > 0)) {
                    state.itemsInInventory.removeAt(i)
                    ironOreToBeRemoved=ironOreToBeRemoved-1
                }
            }
            state.itemsInWorld.push(new myIron(state.player_x/16,state.player_y/16))
        }
        return state
    }



}
