function inReach (a_x: number, a_y: number, b_x: number, b_y: number):boolean {

    let _b_x = b_x*16+8
    let _b_y = b_y*16+8
    
    if (Math.abs(_b_x-a_x)<=8)
    {
        if (Math.abs(_b_y - a_y) <= 8)
        {
            return true
        }
    }
    return false
}

let state:myState = new myState()
// Baeume
for (let index = 0; index < 20; index++) {
    let x = randint(0, 39)
    let y = randint(0, 24)
    let item = new myTree(x,y)
    state.itemsInWorld.push(item)
}
// Steine
for (let index = 0; index < 25; index++) {
    let x = randint(0, 39)
    let y = randint(0, 24)
    let item2 = new myStone(x,y)
    state.itemsInWorld.push(item2)
}
storyboard.registerScene("game", 
 function()
 {
    tiles.setTilemap(tilemap`Level1`)
    state.itemsInWorld.forEach(function(value: myItem, index: number) {
        tiles.setTileAt(tiles.getTileLocation(value.x, value.y), value.img)            
    })

    let player = sprites.create(sprites.castle.heroFrontAttack1)
    player.x=state.player_x
    player.y=state.player_y

    controller.moveSprite(player)
    scene.cameraFollowSprite(player)

    controller.player1.onButtonEvent(ControllerButton.B, ControllerButtonEvent.Pressed, function() {
        state.player_x=player.x
        state.player_y=player.y            
        storyboard.push("inventory")
    })

    controller.A.onEvent(ControllerButtonEvent.Pressed, function() {

        
        // determine the list of objects that are near
        let interactingItems:myItem[]=[]

        state.itemsInWorld.forEach(function(value: myItem, index: number) {
            if (inReach(player.x,player.y,value.x,value.y))
            {
                interactingItems.push(value)
            }
        })
        
        if (interactingItems.length>0)
        {
            animation.runImageAnimation(player, [sprites.castle.heroFrontAttack2, sprites.castle.heroFrontAttack3, sprites.castle.heroFrontAttack4, sprites.castle.heroFrontAttack1],200,false)

            interactingItems.forEach(function (value: myItem, index: number) {
                let [newWorldItems, newInventoryItems]: [myItem[], myItem[]] = value.interact()

                // Werfe das bisherige Objekt weg
                tiles.setTileAt(tiles.getTileLocation(value.x, value.y), assets.image`Background`)
                state.itemsInWorld.removeElement(value)

                // Fuege die neu entstandenen Objekte in die Welt ein. 
                newWorldItems.forEach(function (newValue: myItem, index: number) {
                    tiles.setTileAt(tiles.getTileLocation(newValue.x, newValue.y), newValue.img)
                    state.itemsInWorld.push(newValue)
                })

                // Fuege alle items, die nach der Interaktion ins inventar gehen, in das Inventar ein.
                newInventoryItems.forEach(function (value: myItem, index: number) {
                    state.itemsInInventory.push(value)
                })
            })
        }
    })
 }
)
storyboard.registerScene("inventory", 
    function()
    {
        const title=sprites.create(img`.`)
        title.say("inventar")  
        title.y=20
        title.x=20
 
        controller.player1.onButtonEvent(ControllerButton.B, ControllerButtonEvent.Pressed, function() {
            storyboard.pop()  
        })
    }
)
storyboard.registerScene("skills", 
    function()
    {
        const title2=sprites.create(img`.`)
        title2.say("skills")  
        title2.y=20
        title2.x=100
    }
)
storyboard.start("game")
