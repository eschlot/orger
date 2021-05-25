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

        
        let coalPresent = -1
        let ironOrePresent = -1
        state.itemsGrouped.forEach(function (value: myItem[], index: number) {
            if (value[0] instanceof myCoal)
            {
                if (value.length>10)
                {
                    coalPresent=index
                }
            }
            if (value[0] instanceof myIronOre) {
                if (value.length > 5) {
                    ironOrePresent = index
                }
            }
        })
        if ((ironOrePresent >= 0) && (coalPresent>=0))
        {
            let coalToBeRemoved = 10
            let ironOreToBeRemoved=5
            for (let i=state.itemsInInventory.length-1;i>=0;i--)
            {
                if ((state.itemsInInventory[i] instanceof myCoal) && (coalToBeRemoved>0))
                {
                    state.itemsInInventory.removeAt(i)
                    coalToBeRemoved= coalToBeRemoved-1
                }
                if ((state.itemsInInventory[i] instanceof myIronOre) && (ironOreToBeRemoved > 0)) {
                    state.itemsInInventory.removeAt(i)
                    ironOreToBeRemoved=ironOreToBeRemoved-1
                }
            }
            state.itemsInInventory.push(new myIron(state.player_x,state.player_y))
        }
        return state
    }



}
