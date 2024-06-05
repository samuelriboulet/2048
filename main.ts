namespace SpriteKind {
    export const _TileSprite = SpriteKind.create()
    export const counter = SpriteKind.create()
}

function combineLeft() {
    
    for (let i2 = 0; i2 < 4; i2++) {
        iNEW = i2 + 1
        for (let j2 = 0; j2 < 4; j2++) {
            jNEW = j2 + 1
            if (!(tiles.tileAtLocationEquals(tiles.getTileLocation(iNEW + 2, jNEW + 1), assets.tile`
                    blankTile0
                `) || tiles.tileAtLocationEquals(tiles.getTileLocation(iNEW + 2, jNEW + 1), assets.tile`
                    blankTile
                `))) {
                if (tiles.tileImageAtLocation(tiles.getTileLocation(iNEW + 2, jNEW + 1)) == tiles.tileImageAtLocation(tiles.getTileLocation(iNEW + 1, jNEW + 1))) {
                    setActionAchieved = true
                    console.log("ActionAchieved Reason: CombineLeftSuccess")
                    tileUp(iNEW - 1, jNEW)
                    placeTile(jNEW, iNEW, 0)
                }
                
            }
            
        }
    }
}

function slideDown() {
    
    for (let index = 0; index < 3; index++) {
        for (let i = 0; i < 4; i++) {
            iNEW = 4 - i
            for (let j = 0; j < 4; j++) {
                jNEW = 4 - j
                if (!(tiles.tileAtLocationEquals(tiles.getTileLocation(jNEW + 2, iNEW + 1), assets.tile`
                        blankTile0
                    `) || tiles.tileAtLocationEquals(tiles.getTileLocation(jNEW + 2, iNEW + 1), assets.tile`
                        blankTile
                    `))) {
                    if (tiles.tileAtLocationEquals(tiles.getTileLocation(jNEW + 2, iNEW + 2), assets.tile`
                            blankTile0
                        `)) {
                        setActionAchieved = true
                        console.log("ActionAchieved Reason: SlideDownSuccess")
                        tiles.setTileAt(tiles.getTileLocation(jNEW + 2, iNEW + 2), tiles.tileImageAtLocation(tiles.getTileLocation(jNEW + 2, iNEW + 1)))
                        placeTile(iNEW, jNEW, 0)
                    }
                    
                }
                
            }
        }
        pause(10)
    }
}

function slideLeft() {
    
    for (let index2 = 0; index2 < 3; index2++) {
        for (let k = 0; k < 4; k++) {
            iNEW = 4 - k
            for (let l = 0; l < 4; l++) {
                jNEW = 4 - l
                if (!(tiles.tileAtLocationEquals(tiles.getTileLocation(5 - iNEW + 2, 5 - jNEW + 1), assets.tile`
                        blankTile0
                    `) || tiles.tileAtLocationEquals(tiles.getTileLocation(5 - iNEW + 2, 5 - jNEW + 1), assets.tile`
                        blankTile
                    `))) {
                    if (tiles.tileAtLocationEquals(tiles.getTileLocation(5 - iNEW + 1, 5 - jNEW + 1), assets.tile`
                            blankTile0
                        `)) {
                        setActionAchieved = true
                        console.log("ActionAchieved Reason: SlideLeftSuccess")
                        tiles.setTileAt(tiles.getTileLocation(5 - iNEW + 1, 5 - jNEW + 1), tiles.tileImageAtLocation(tiles.getTileLocation(5 - iNEW + 2, 5 - jNEW + 1)))
                        placeTile(5 - jNEW, 5 - iNEW, 0)
                    }
                    
                }
                
            }
        }
        pause(10)
    }
}

function combineUp() {
    
    for (let i22 = 0; i22 < 4; i22++) {
        iNEW = i22 + 1
        for (let j22 = 0; j22 < 4; j22++) {
            jNEW = j22 + 1
            if (!(tiles.tileAtLocationEquals(tiles.getTileLocation(jNEW + 2, iNEW + 1), assets.tile`
                    blankTile0
                `) || tiles.tileAtLocationEquals(tiles.getTileLocation(jNEW + 2, iNEW + 1), assets.tile`
                    blankTile
                `))) {
                if (tiles.tileImageAtLocation(tiles.getTileLocation(jNEW + 2, iNEW + 1)) == tiles.tileImageAtLocation(tiles.getTileLocation(jNEW + 2, iNEW + 0))) {
                    setActionAchieved = true
                    console.log("ActionAchieved Reason: CombineUpSuccess")
                    tileUp(jNEW, iNEW - 1)
                    placeTile(iNEW, jNEW, 0)
                }
                
            }
            
        }
    }
}

function startGame() {
    
    Settings()
    if (highScoreManual >= 0) {
        blockSettings.writeNumber("highScore", highScoreManual)
    }
    
    music.setVolume(40)
    sprites.destroyAllSpritesOfKind(SpriteKind.Text)
    palleteDisplay = textsprite.create(".")
    if (!(blockSettings.readNumber("highScore") >= 0)) {
        blockSettings.writeNumber("highScore", 0)
    }
    
    highScore = blockSettings.readNumber("highScore")
    highScoreText = textsprite.create("High Score: " + ("" + highScore), 0, 15)
    beatHighScore = false
    highScoreText.setPosition(80, 110)
    colorPallete = blockSettings.readString("colorPallete")
    palleteDisplay.destroy()
    updatePallete()
    info.setScore(0)
    tiles.setCurrentTilemap(tilemap`
        2048Grid-Standard
    `)
    for (let index3 = 0; index3 < StartingTileAmount; index3++) {
        spawnNewTiles()
    }
}

controller.down.onEvent(ControllerButtonEvent.Pressed, function on_down_pressed() {
    
    iNEW = 0
    jNEW = 0
    setActionAchieved = false
    slideDown()
    combineDown()
    slideDown()
    if (setActionAchieved) {
        music.stopAllSounds()
        music.rest(5)
        music.setVolume(255)
        music.playTone(262, music.beat(BeatFraction.Eighth))
        pause(100)
        for (let index4 = 0; index4 < TileSpawnRate; index4++) {
            spawnNewTiles()
        }
    }
    
})
function slideUp() {
    
    for (let index5 = 0; index5 < 3; index5++) {
        for (let m = 0; m < 4; m++) {
            iNEW = 4 - m
            for (let n = 0; n < 4; n++) {
                jNEW = 4 - n
                if (!(tiles.tileAtLocationEquals(tiles.getTileLocation(5 - jNEW + 2, 5 - iNEW + 1), assets.tile`
                        blankTile0
                    `) || tiles.tileAtLocationEquals(tiles.getTileLocation(5 - jNEW + 2, 5 - iNEW + 1), assets.tile`
                        blankTile
                    `))) {
                    if (tiles.tileAtLocationEquals(tiles.getTileLocation(5 - jNEW + 2, 5 - iNEW), assets.tile`
                            blankTile0
                        `)) {
                        setActionAchieved = true
                        console.log("ActionAchieved Reason: SlideUpSuccess")
                        tiles.setTileAt(tiles.getTileLocation(5 - jNEW + 2, 5 - iNEW), tiles.tileImageAtLocation(tiles.getTileLocation(5 - jNEW + 2, 5 - iNEW + 1)))
                        placeTile(5 - iNEW, 5 - jNEW, 0)
                    }
                    
                }
                
            }
        }
        pause(10)
    }
}

function checkPossibleMoves() {
    
    testTest = false
    for (let check_i = 0; check_i < 4; check_i++) {
        for (let check_j = 0; check_j < 4; check_j++) {
            if (tiles.tileAtLocationEquals(tiles.getTileLocation(check_i + 3, check_j + 2), assets.tile`
                    blankTile0
                `)) {
                testTest = true
            } else if (tiles.tileImageAtLocation(tiles.getTileLocation(check_i + 3, check_j + 2)) == tiles.tileImageAtLocation(tiles.getTileLocation(check_i + 3, check_j + 3))) {
                testTest = true
            } else if (tiles.tileImageAtLocation(tiles.getTileLocation(check_i + 3, check_j + 2)) == tiles.tileImageAtLocation(tiles.getTileLocation(check_i + 2, check_j + 2))) {
                testTest = true
            } else if (tiles.tileImageAtLocation(tiles.getTileLocation(check_i + 3, check_j + 2)) == tiles.tileImageAtLocation(tiles.getTileLocation(check_i + 4, check_j + 2))) {
                testTest = true
            } else if (tiles.tileImageAtLocation(tiles.getTileLocation(check_i + 3, check_j + 2)) == tiles.tileImageAtLocation(tiles.getTileLocation(check_i + 3, check_j + 1))) {
                testTest = true
            }
            
        }
    }
    if (testTest == false) {
        pause(1500)
        game.over(false)
    }
    
}

function Settings() {
    
    //  The amount of tiles spawned when starting a game. (Default = 2)
    StartingTileAmount = 1
    //  The amount of tile spawned after every successful action. (Default = 1)
    TileSpawnRate = 1
    //  The index value of tiles spawned e.g. 2**1 = 2, 2**3 = 8, 2**7 = 128 ,etc.
    //  This has a 10% chance of spawning a number of twice the value as the default e.g. 2**1 has a 90% chance of spawning a 2 and a 10% chance of spawning a 4
    //  
    //  (Default = 1)
    TileSpawnSize = 1
    //  the tile 512 spawns 0.9 * (1 / x) . Change the variable to change x and therefore the spawn rate. Set to 1 for a 90% chance to spawn.  (Default = 100000)
    _512_SpawnRate_1 = 100000
    //  The manual highScore set. If the variable < 0, then it does NOT set the highScore manually, otherwise it sets the highScore to the provided number and it behaves usuall from there on, but on every game start it sets the highScore back to the specified amount. 
    //  
    //  (Default = -1)
    highScoreManual = -1
    //  Sets the constant tilemapHeightCounter. Do NOT change if you have no idea what your doing.
    //  
    //  (Default = 22)
    tilemapHeightCounter = 22
}

controller.A.onEvent(ControllerButtonEvent.Pressed, function on_a_pressed() {
    
    if (colorPallete == "Original") {
        colorPallete = "Gray Scale"
    } else if (colorPallete == "Gray Scale") {
        colorPallete = "Poke"
    } else if (colorPallete == "Poke") {
        colorPallete = "D.I.Y"
    } else if (colorPallete == "D.I.Y") {
        colorPallete = "Steam Punk"
    } else {
        colorPallete = "Original"
    }
    
    blockSettings.writeString("colorPallete", colorPallete)
    music.setVolume(150)
    music.thump.play()
    updatePallete()
})
controller.up.onEvent(ControllerButtonEvent.Pressed, function on_up_pressed() {
    
    iNEW = 0
    jNEW = 0
    setActionAchieved = false
    slideUp()
    combineUp()
    slideUp()
    if (setActionAchieved) {
        music.stopAllSounds()
        music.rest(5)
        music.setVolume(255)
        music.playTone(262, music.beat(BeatFraction.Eighth))
        pause(100)
        for (let index6 = 0; index6 < TileSpawnRate; index6++) {
            spawnNewTiles()
        }
    }
    
})
function placeTile(row: number, column: number, tileNum: number) {
    tiles.setTileAt(tiles.getTileLocation(column + 2, row + 1), tiles.tileImageAtLocation(tiles.getTileLocation(0, tileNum + 8)))
}

controller.B.onEvent(ControllerButtonEvent.Pressed, function on_b_pressed() {
    startGame()
})
function combineRight() {
    
    for (let i23 = 0; i23 < 4; i23++) {
        iNEW = 4 - i23
        for (let j23 = 0; j23 < 4; j23++) {
            jNEW = 4 - j23
            if (!(tiles.tileAtLocationEquals(tiles.getTileLocation(iNEW + 2, jNEW + 1), assets.tile`
                    blankTile0
                `) || tiles.tileAtLocationEquals(tiles.getTileLocation(iNEW + 2, jNEW + 1), assets.tile`
                    blankTile
                `))) {
                if (tiles.tileImageAtLocation(tiles.getTileLocation(iNEW + 2, jNEW + 1)) == tiles.tileImageAtLocation(tiles.getTileLocation(iNEW + 3, jNEW + 1))) {
                    setActionAchieved = true
                    console.log("ActionAchieved Reason: CombineRightSuccess")
                    tileUp(iNEW + 1, jNEW)
                    placeTile(jNEW, iNEW, 0)
                }
                
            }
            
        }
    }
}

controller.right.onEvent(ControllerButtonEvent.Pressed, function on_right_pressed() {
    
    iNEW = 0
    jNEW = 0
    setActionAchieved = false
    slideRight()
    combineRight()
    slideRight()
    if (setActionAchieved) {
        music.stopAllSounds()
        music.rest(5)
        music.setVolume(255)
        music.playTone(262, music.beat(BeatFraction.Eighth))
        pause(100)
        for (let index7 = 0; index7 < TileSpawnRate; index7++) {
            spawnNewTiles()
        }
    }
    
})
function loop() {
    
    if (info.score() > highScore) {
        oldhighScore = highScore
        highScore = info.score()
        blockSettings.writeNumber("highScore", info.score())
    }
    
    highScoreText.destroy()
    highScoreText = textsprite.create("High Score: " + ("" + highScore), 0, 15)
    highScoreText.setPosition(80, 110)
    checkPossibleMoves()
}

function updatePallete() {
    
    if (colorPallete == "Original") {
        color.setPalette(color.originalPalette)
        color.setColor(8, color.rgb(130, 90, 122))
    } else if (colorPallete == "Gray Scale") {
        color.setPalette(color.GrayScale)
        color.setColor(15, color.rgb(120, 120, 120))
        color.setColor(1, color.rgb(20, 20, 20))
        color.setColor(3, color.rgb(55, 55, 55))
        color.setColor(10, color.rgb(30, 30, 30))
        color.setColor(12, color.rgb(12, 12, 12))
    } else if (colorPallete == "Poke") {
        color.setPalette(color.Poke)
        color.setColor(1, color.rgb(20, 20, 25))
        color.setColor(15, color.rgb(220, 220, 220))
    } else if (colorPallete == "D.I.Y") {
        color.setPalette(color.DIY)
        color.setColor(8, color.rgb(255, 204, 0))
    } else if (colorPallete == "Steam Punk") {
        color.setPalette(color.SteamPunk)
    }
    
    palleteDisplay.destroy()
    if (colorPallete == "Original") {
        palleteDisplay = textsprite.create("", 1, 1)
    } else {
        palleteDisplay = textsprite.create(colorPallete, 1, 15)
    }
    
    palleteDisplay.setStayInScreen(true)
    palleteDisplay.setPosition(24, 25)
    palleteDisplay.setVelocity(-101000, -150)
}

function spawnNewTiles() {
    
    generatedX = randint(1, 4)
    generatedY = randint(1, 4)
    counterSpawn = 0
    while (!tiles.tileAtLocationEquals(tiles.getTileLocation(generatedX + 2, generatedY + 1), assets.tile`
            blankTile0
        `)) {
        counterSpawn += 1
        generatedX = randint(1, 4)
        generatedY = randint(1, 4)
        if (counterSpawn > 10000) {
            break
        }
        
    }
    if (randint(1, 10) == 1) {
        placeTile(generatedY, generatedX, TileSpawnSize + 1)
        console.log("Generated A Tile_" + ("" + 2 ** (TileSpawnSize + 1)) + " at: X: " + ("" + generatedX) + "Y: " + ("" + generatedY))
    } else if (randint(1, _512_SpawnRate_1) < _512_SpawnRate_1) {
        placeTile(generatedY, generatedX, TileSpawnSize)
        console.log("Generated A Tile_" + ("" + 2 ** TileSpawnSize) + " at: X: " + ("" + generatedX) + "Y: " + ("" + generatedY))
    } else {
        placeTile(generatedY, generatedX, 9)
        console.log("Generated A Tile_512 at: X:" + ("" + generatedX) + "Y:" + ("" + generatedY))
    }
    
}

controller.left.onEvent(ControllerButtonEvent.Pressed, function on_left_pressed() {
    
    iNEW = 0
    jNEW = 0
    setActionAchieved = false
    slideLeft()
    combineLeft()
    slideLeft()
    if (setActionAchieved) {
        music.stopAllSounds()
        music.rest(5)
        music.setVolume(255)
        music.playTone(262, music.beat(BeatFraction.Eighth))
        pause(100)
        for (let index8 = 0; index8 < TileSpawnRate; index8++) {
            spawnNewTiles()
        }
    }
    
})
function tileUp(xUP: number, yUP: number) {
    let index9 = 0
    while (index9 <= tilemapHeightCounter - 9) {
        if (tiles.tileImageAtLocation(tiles.getTileLocation(0, index9 + 9)) == tiles.tileImageAtLocation(tiles.getTileLocation(xUP + 2, yUP + 1))) {
            tiles.setTileAt(tiles.getTileLocation(xUP + 2, yUP + 1), tiles.tileImageAtLocation(tiles.getTileLocation(0, index9 + 10)))
            info.changeScoreBy(2 ** (index9 + 2))
            break
        }
        
        index9 += 1
    }
}

function combineDown() {
    
    for (let i24 = 0; i24 < 4; i24++) {
        iNEW = 4 - i24
        for (let j24 = 0; j24 < 4; j24++) {
            jNEW = 4 - j24
            if (!(tiles.tileAtLocationEquals(tiles.getTileLocation(jNEW + 2, iNEW + 1), assets.tile`
                    blankTile0
                `) || tiles.tileAtLocationEquals(tiles.getTileLocation(jNEW + 2, iNEW + 1), assets.tile`
                    blankTile
                `))) {
                if (tiles.tileImageAtLocation(tiles.getTileLocation(jNEW + 2, iNEW + 1)) == tiles.tileImageAtLocation(tiles.getTileLocation(jNEW + 2, iNEW + 2))) {
                    setActionAchieved = true
                    console.log("ActionAchieved Reason: CombineDownSuccess")
                    tileUp(jNEW, iNEW + 1)
                    placeTile(iNEW, jNEW, 0)
                }
                
            }
            
        }
    }
}

function slideRight() {
    
    for (let index10 = 0; index10 < 3; index10++) {
        for (let o = 0; o < 4; o++) {
            iNEW = 4 - o
            for (let p = 0; p < 4; p++) {
                jNEW = 4 - p
                if (!(tiles.tileAtLocationEquals(tiles.getTileLocation(iNEW + 2, jNEW + 1), assets.tile`
                        blankTile0
                    `) || tiles.tileAtLocationEquals(tiles.getTileLocation(iNEW + 2, jNEW + 1), assets.tile`
                        blankTile
                    `))) {
                    if (tiles.tileAtLocationEquals(tiles.getTileLocation(iNEW + 3, jNEW + 1), assets.tile`
                            blankTile0
                        `)) {
                        setActionAchieved = true
                        console.log("ActionAchieved Reason: SlideRightSuccess")
                        tiles.setTileAt(tiles.getTileLocation(iNEW + 3, jNEW + 1), tiles.tileImageAtLocation(tiles.getTileLocation(iNEW + 2, jNEW + 1)))
                        placeTile(jNEW, iNEW, 0)
                    }
                    
                }
                
            }
        }
        pause(10)
    }
}

let counterSpawn = 0
let generatedY = 0
let generatedX = 0
let oldhighScore = 0
let tilemapHeightCounter = 0
let _512_SpawnRate_1 = 0
let TileSpawnSize = 0
let testTest = false
let TileSpawnRate = 0
let StartingTileAmount = 0
let colorPallete = ""
let beatHighScore = false
let highScoreText : TextSprite = null
let highScore = 0
let palleteDisplay : TextSprite = null
let highScoreManual = 0
let setActionAchieved = false
let jNEW = 0
let iNEW = 0
if (blockSettings.exists("colorPallete")) {
    startGame()
} else {
    blockSettings.writeString("colorPallete", "Original")
    startGame()
}

forever(function on_forever() {
    loop()
})
