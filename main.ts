function inReach (a_x: number, a_y: number, b_x: number, b_y: number):boolean {

    let _b_x = b_x*16+8
    let _b_y = b_y*16+8

    // console.logValue("_b_x", _b_x)
    // console.logValue("a_x", a_x)
    // console.logValue("_b_y", _b_y)
    // console.logValue("a_y", a_y)

    if (Math.abs(_b_x-a_x)<=8)
    {
        if (Math.abs(_b_y - a_y) <= 8)
        {
            // console.log("true")
            return true
        }
    }
    // console.log("false")
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
                tiles.setTileAt(tiles.getTileLocation(value.x, value.y),assets.image`Background`)
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


let menuItemIndex = 0
let menuItemIndexOld = 0

let row: int16 = 0
let column: int16 = 0
let rowStart: int16 = 30
let columnOffset: int16 = 30
let columnNumbers: int16 = 3
let rowNumbers: int16 = 6
let rowHeight: int16 = (scene.screenHeight() - rowStart) / rowNumbers
let columnWidth: int16 = scene.screenWidth() / columnNumbers

function menuPositionCalcReset() {
    row = -1
    column = 0
}

function menuTextPositionCalcNext(): [number, number] {
    row = row + 1
    if (row == rowNumbers) {
        row = 0
        column = column + 1
    }
    let x = column * columnWidth + columnOffset
    let y = rowStart + row * rowHeight
    
    console.logValue("menuTextPositionCalcNext:x", x)
    console.logValue("menuTextPositionCalcNext:y", y)
    return [x, y]
}

let rowIndex: int16
let columnIndex: int16

function menuCaretPosition(entryNumber: number): [number, number] {
    rowIndex = entryNumber % rowNumbers
    columnIndex = entryNumber / rowNumbers
    let x = columnIndex * columnWidth
    let y = rowStart + rowIndex * rowHeight
    console.logValue("entryNumber", entryNumber)
    console.logValue("rowIndex", rowIndex)
    console.logValue("columnIndex", columnIndex)
    console.logValue("x", x)
    console.logValue("y", y)
    return [x, y]
}


storyboard.registerScene("inventory", 
    function()
    {
        const title=sprites.create(img`.`)
        title.say("Inventory")  
        title.left=0
        title.top=0


        let itemGroups: myItem[][] = []
        let group: myItem[] =[]

        state.itemsInInventory.sort((v1,v2)=>v1.name.compare(v2.name))

        let name:string = 'None'
        state.itemsInInventory.forEach(function (value: myItem, index: number) {
            if (name.compare(value.name)!=0)
            {
                if (group.length>0)
                {
                    itemGroups.push(group)
                    group = []
                }
                name = value.name
            }    
            group.push(value)
        })
        if (group.length > 0) {
            itemGroups.push(group)
            group = []
        }


        console.logValue("itemGroups.length", itemGroups.length)


        menuPositionCalcReset()
        itemGroups.forEach(function ( value:myItem[], index:number){
            let [x,y] = menuTextPositionCalcNext()
            const entry = sprites.create(img`.`)
            entry.say(value[0].name + " " + value.length)
            entry.left = x
            entry.top = y
        })


        // This cursor will indicate which menu item is selected
        const cursor = sprites.create(img`
        4 . . .
        . 4 . .
        . . 4 .
        . . . 4
        . . 4 .
        . 4 . .
        4 . . .
        `)
        
        menuItemIndex=0
        let [x, y] = menuCaretPosition(menuItemIndex)
        cursor.left = x
        cursor.top = y

        controller.player1.onButtonEvent(ControllerButton.Up,ControllerButtonEvent.Pressed, function()
        {
            if (menuItemIndex>0)
            {
                menuItemIndex=menuItemIndex-1
                let [x, y] = menuCaretPosition(menuItemIndex)
                cursor.left = x
                cursor.top = y
            }
        })

        controller.player1.onButtonEvent(ControllerButton.Down, ControllerButtonEvent.Pressed, function () {
            if (menuItemIndex < itemGroups.length-1) {
                menuItemIndex = menuItemIndex +1 
                let [x, y] = menuCaretPosition(menuItemIndex)
                cursor.left = x
                cursor.top = y
            }
        })

        controller.player1.onButtonEvent(ControllerButton.B, ControllerButtonEvent.Pressed, function() {
            storyboard.pop()  
        })
    }
)
storyboard.start("game")
