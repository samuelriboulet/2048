@namespace
class SpriteKind:
    _TileSprite = SpriteKind.create()
    counter = SpriteKind.create()
def combineLeft():
    global iNEW, jNEW, setActionAchieved
    for i2 in range(4):
        iNEW = i2 + 1
        for j2 in range(4):
            jNEW = j2 + 1
            if not (tiles.tile_at_location_equals(tiles.get_tile_location(iNEW + 2, jNEW + 1),
                assets.tile("""
                    blankTile0
                """)) or tiles.tile_at_location_equals(tiles.get_tile_location(iNEW + 2, jNEW + 1),
                assets.tile("""
                    blankTile
                """))):
                if tiles.tile_image_at_location(tiles.get_tile_location(iNEW + 2, jNEW + 1)) == tiles.tile_image_at_location(tiles.get_tile_location(iNEW + 1, jNEW + 1)):
                    setActionAchieved = True
                    print("ActionAchieved Reason: CombineLeftSuccess")
                    tileUp(iNEW - 1, jNEW)
                    placeTile(jNEW, iNEW, 0)
def slideDown():
    global iNEW, jNEW, setActionAchieved
    for index in range(3):
        for i in range(4):
            iNEW = 4 - i
            for j in range(4):
                jNEW = 4 - j
                if not (tiles.tile_at_location_equals(tiles.get_tile_location(jNEW + 2, iNEW + 1),
                    assets.tile("""
                        blankTile0
                    """)) or tiles.tile_at_location_equals(tiles.get_tile_location(jNEW + 2, iNEW + 1),
                    assets.tile("""
                        blankTile
                    """))):
                    if tiles.tile_at_location_equals(tiles.get_tile_location(jNEW + 2, iNEW + 2),
                        assets.tile("""
                            blankTile0
                        """)):
                        setActionAchieved = True
                        print("ActionAchieved Reason: SlideDownSuccess")
                        tiles.set_tile_at(tiles.get_tile_location(jNEW + 2, iNEW + 2),
                            tiles.tile_image_at_location(tiles.get_tile_location(jNEW + 2, iNEW + 1)))
                        placeTile(iNEW, jNEW, 0)
        pause(10)
def slideLeft():
    global iNEW, jNEW, setActionAchieved
    for index2 in range(3):
        for k in range(4):
            iNEW = 4 - k
            for l in range(4):
                jNEW = 4 - l
                if not (tiles.tile_at_location_equals(tiles.get_tile_location(5 - iNEW + 2, 5 - jNEW + 1),
                    assets.tile("""
                        blankTile0
                    """)) or tiles.tile_at_location_equals(tiles.get_tile_location(5 - iNEW + 2, 5 - jNEW + 1),
                    assets.tile("""
                        blankTile
                    """))):
                    if tiles.tile_at_location_equals(tiles.get_tile_location(5 - iNEW + 1, 5 - jNEW + 1),
                        assets.tile("""
                            blankTile0
                        """)):
                        setActionAchieved = True
                        print("ActionAchieved Reason: SlideLeftSuccess")
                        tiles.set_tile_at(tiles.get_tile_location(5 - iNEW + 1, 5 - jNEW + 1),
                            tiles.tile_image_at_location(tiles.get_tile_location(5 - iNEW + 2, 5 - jNEW + 1)))
                        placeTile(5 - jNEW, 5 - iNEW, 0)
        pause(10)
def combineUp():
    global iNEW, jNEW, setActionAchieved
    for i22 in range(4):
        iNEW = i22 + 1
        for j22 in range(4):
            jNEW = j22 + 1
            if not (tiles.tile_at_location_equals(tiles.get_tile_location(jNEW + 2, iNEW + 1),
                assets.tile("""
                    blankTile0
                """)) or tiles.tile_at_location_equals(tiles.get_tile_location(jNEW + 2, iNEW + 1),
                assets.tile("""
                    blankTile
                """))):
                if tiles.tile_image_at_location(tiles.get_tile_location(jNEW + 2, iNEW + 1)) == tiles.tile_image_at_location(tiles.get_tile_location(jNEW + 2, iNEW + 0)):
                    setActionAchieved = True
                    print("ActionAchieved Reason: CombineUpSuccess")
                    tileUp(jNEW, iNEW - 1)
                    placeTile(iNEW, jNEW, 0)
def startGame():
    global palleteDisplay, highScore, highScoreText, beatHighScore, colorPallete
    Settings()
    if highScoreManual >= 0:
        blockSettings.write_number("highScore", highScoreManual)
    music.set_volume(40)
    sprites.destroy_all_sprites_of_kind(SpriteKind.text)
    palleteDisplay = textsprite.create(".")
    if not (blockSettings.read_number("highScore") >= 0):
        blockSettings.write_number("highScore", 0)
    highScore = blockSettings.read_number("highScore")
    highScoreText = textsprite.create("High Score: " + str(highScore), 0, 15)
    beatHighScore = False
    highScoreText.set_position(80, 110)
    colorPallete = blockSettings.read_string("colorPallete")
    palleteDisplay.destroy()
    updatePallete()
    info.set_score(0)
    tiles.set_current_tilemap(tilemap("""
        2048Grid-Standard
    """))
    for index3 in range(StartingTileAmount):
        spawnNewTiles()

def on_down_pressed():
    global iNEW, jNEW, setActionAchieved
    iNEW = 0
    jNEW = 0
    setActionAchieved = False
    slideDown()
    combineDown()
    slideDown()
    if setActionAchieved:
        music.stop_all_sounds()
        music.rest(5)
        music.set_volume(255)
        music.play_tone(262, music.beat(BeatFraction.EIGHTH))
        pause(100)
        for index4 in range(TileSpawnRate):
            spawnNewTiles()
controller.down.on_event(ControllerButtonEvent.PRESSED, on_down_pressed)

def slideUp():
    global iNEW, jNEW, setActionAchieved
    for index5 in range(3):
        for m in range(4):
            iNEW = 4 - m
            for n in range(4):
                jNEW = 4 - n
                if not (tiles.tile_at_location_equals(tiles.get_tile_location(5 - jNEW + 2, 5 - iNEW + 1),
                    assets.tile("""
                        blankTile0
                    """)) or tiles.tile_at_location_equals(tiles.get_tile_location(5 - jNEW + 2, 5 - iNEW + 1),
                    assets.tile("""
                        blankTile
                    """))):
                    if tiles.tile_at_location_equals(tiles.get_tile_location(5 - jNEW + 2, 5 - iNEW),
                        assets.tile("""
                            blankTile0
                        """)):
                        setActionAchieved = True
                        print("ActionAchieved Reason: SlideUpSuccess")
                        tiles.set_tile_at(tiles.get_tile_location(5 - jNEW + 2, 5 - iNEW),
                            tiles.tile_image_at_location(tiles.get_tile_location(5 - jNEW + 2, 5 - iNEW + 1)))
                        placeTile(5 - iNEW, 5 - jNEW, 0)
        pause(10)
def checkPossibleMoves():
    global testTest
    testTest = False
    for check_i in range(4):
        for check_j in range(4):
            if tiles.tile_at_location_equals(tiles.get_tile_location(check_i + 3, check_j + 2),
                assets.tile("""
                    blankTile0
                """)):
                testTest = True
            else:
                if tiles.tile_image_at_location(tiles.get_tile_location(check_i + 3, check_j + 2)) == tiles.tile_image_at_location(tiles.get_tile_location(check_i + 3, check_j + 3)):
                    testTest = True
                elif tiles.tile_image_at_location(tiles.get_tile_location(check_i + 3, check_j + 2)) == tiles.tile_image_at_location(tiles.get_tile_location(check_i + 2, check_j + 2)):
                    testTest = True
                elif tiles.tile_image_at_location(tiles.get_tile_location(check_i + 3, check_j + 2)) == tiles.tile_image_at_location(tiles.get_tile_location(check_i + 4, check_j + 2)):
                    testTest = True
                elif tiles.tile_image_at_location(tiles.get_tile_location(check_i + 3, check_j + 2)) == tiles.tile_image_at_location(tiles.get_tile_location(check_i + 3, check_j + 1)):
                    testTest = True
    if testTest == False:
        pause(1500)
        game.over(False)
def Settings():
    global StartingTileAmount, TileSpawnRate, TileSpawnSize, _512_SpawnRate_1, highScoreManual, tilemapHeightCounter
    # The amount of tiles spawned when starting a game. (Default = 2)
    StartingTileAmount = 1
    # The amount of tile spawned after every successful action. (Default = 1)
    TileSpawnRate = 1
    # The index value of tiles spawned e.g. 2**1 = 2, 2**3 = 8, 2**7 = 128 ,etc.
    # This has a 10% chance of spawning a number of twice the value as the default e.g. 2**1 has a 90% chance of spawning a 2 and a 10% chance of spawning a 4
    # 
    # (Default = 1)
    TileSpawnSize = 1
    # the tile 512 spawns 0.9 * (1 / x) . Change the variable to change x and therefore the spawn rate. Set to 1 for a 90% chance to spawn.  (Default = 100000)
    _512_SpawnRate_1 = 100000
    # The manual highScore set. If the variable < 0, then it does NOT set the highScore manually, otherwise it sets the highScore to the provided number and it behaves usuall from there on, but on every game start it sets the highScore back to the specified amount. 
    # 
    # (Default = -1)
    highScoreManual = -1
    # Sets the constant tilemapHeightCounter. Do NOT change if you have no idea what your doing.
    # 
    # (Default = 22)
    tilemapHeightCounter = 22

def on_a_pressed():
    global colorPallete
    if colorPallete == "Original":
        colorPallete = "Gray Scale"
    elif colorPallete == "Gray Scale":
        colorPallete = "Poke"
    elif colorPallete == "Poke":
        colorPallete = "D.I.Y"
    elif colorPallete == "D.I.Y":
        colorPallete = "Steam Punk"
    else:
        colorPallete = "Original"
    blockSettings.write_string("colorPallete", colorPallete)
    music.set_volume(150)
    music.thump.play()
    updatePallete()
controller.A.on_event(ControllerButtonEvent.PRESSED, on_a_pressed)

def on_up_pressed():
    global iNEW, jNEW, setActionAchieved
    iNEW = 0
    jNEW = 0
    setActionAchieved = False
    slideUp()
    combineUp()
    slideUp()
    if setActionAchieved:
        music.stop_all_sounds()
        music.rest(5)
        music.set_volume(255)
        music.play_tone(262, music.beat(BeatFraction.EIGHTH))
        pause(100)
        for index6 in range(TileSpawnRate):
            spawnNewTiles()
controller.up.on_event(ControllerButtonEvent.PRESSED, on_up_pressed)

def placeTile(row: number, column: number, tileNum: number):
    tiles.set_tile_at(tiles.get_tile_location(column + 2, row + 1),
        tiles.tile_image_at_location(tiles.get_tile_location(0, tileNum + 8)))

def on_b_pressed():
    startGame()
controller.B.on_event(ControllerButtonEvent.PRESSED, on_b_pressed)

def combineRight():
    global iNEW, jNEW, setActionAchieved
    for i23 in range(4):
        iNEW = 4 - i23
        for j23 in range(4):
            jNEW = 4 - j23
            if not (tiles.tile_at_location_equals(tiles.get_tile_location(iNEW + 2, jNEW + 1),
                assets.tile("""
                    blankTile0
                """)) or tiles.tile_at_location_equals(tiles.get_tile_location(iNEW + 2, jNEW + 1),
                assets.tile("""
                    blankTile
                """))):
                if tiles.tile_image_at_location(tiles.get_tile_location(iNEW + 2, jNEW + 1)) == tiles.tile_image_at_location(tiles.get_tile_location(iNEW + 3, jNEW + 1)):
                    setActionAchieved = True
                    print("ActionAchieved Reason: CombineRightSuccess")
                    tileUp(iNEW + 1, jNEW)
                    placeTile(jNEW, iNEW, 0)

def on_right_pressed():
    global iNEW, jNEW, setActionAchieved
    iNEW = 0
    jNEW = 0
    setActionAchieved = False
    slideRight()
    combineRight()
    slideRight()
    if setActionAchieved:
        music.stop_all_sounds()
        music.rest(5)
        music.set_volume(255)
        music.play_tone(262, music.beat(BeatFraction.EIGHTH))
        pause(100)
        for index7 in range(TileSpawnRate):
            spawnNewTiles()
controller.right.on_event(ControllerButtonEvent.PRESSED, on_right_pressed)

def loop():
    global oldhighScore, highScore, highScoreText
    if info.score() > highScore:
        oldhighScore = highScore
        highScore = info.score()
        blockSettings.write_number("highScore", info.score())
    highScoreText.destroy()
    highScoreText = textsprite.create("High Score: " + str(highScore), 0, 15)
    highScoreText.set_position(80, 110)
    checkPossibleMoves()
def updatePallete():
    global palleteDisplay
    if colorPallete == "Original":
        color.set_palette(color.original_palette)
        color.set_color(8, color.rgb(130, 90, 122))
    elif colorPallete == "Gray Scale":
        color.set_palette(color.gray_scale)
        color.set_color(15, color.rgb(120, 120, 120))
        color.set_color(1, color.rgb(20, 20, 20))
        color.set_color(3, color.rgb(55, 55, 55))
        color.set_color(10, color.rgb(30, 30, 30))
        color.set_color(12, color.rgb(12, 12, 12))
    elif colorPallete == "Poke":
        color.set_palette(color.poke)
        color.set_color(1, color.rgb(20, 20, 25))
        color.set_color(15, color.rgb(220, 220, 220))
    elif colorPallete == "D.I.Y":
        color.set_palette(color.DIY)
        color.set_color(8, color.rgb(255, 204, 0))
    elif colorPallete == "Steam Punk":
        color.set_palette(color.steam_punk)
    palleteDisplay.destroy()
    if colorPallete == "Original":
        palleteDisplay = textsprite.create("", 1, 1)
    else:
        palleteDisplay = textsprite.create(colorPallete, 1, 15)
    palleteDisplay.set_stay_in_screen(True)
    palleteDisplay.set_position(24, 25)
    palleteDisplay.set_velocity(-101000, -150)
def spawnNewTiles():
    global generatedX, generatedY, counterSpawn
    generatedX = randint(1, 4)
    generatedY = randint(1, 4)
    counterSpawn = 0
    while not (tiles.tile_at_location_equals(tiles.get_tile_location(generatedX + 2, generatedY + 1),
        assets.tile("""
            blankTile0
        """))):
        counterSpawn += 1
        generatedX = randint(1, 4)
        generatedY = randint(1, 4)
        if counterSpawn > 10000:
            break
    if randint(1, 10) == 1:
        placeTile(generatedY, generatedX, TileSpawnSize + 1)
        print("Generated A Tile_" + str(2 ** (TileSpawnSize + 1)) + " at: X: " + str(generatedX) + "Y: " + str(generatedY))
    elif randint(1, _512_SpawnRate_1) < _512_SpawnRate_1:
        placeTile(generatedY, generatedX, TileSpawnSize)
        print("Generated A Tile_" + str(2 ** TileSpawnSize) + " at: X: " + str(generatedX) + "Y: " + str(generatedY))
    else:
        placeTile(generatedY, generatedX, 9)
        print("Generated A Tile_512 at: X:" + str(generatedX) + "Y:" + str(generatedY))

def on_left_pressed():
    global iNEW, jNEW, setActionAchieved
    iNEW = 0
    jNEW = 0
    setActionAchieved = False
    slideLeft()
    combineLeft()
    slideLeft()
    if setActionAchieved:
        music.stop_all_sounds()
        music.rest(5)
        music.set_volume(255)
        music.play_tone(262, music.beat(BeatFraction.EIGHTH))
        pause(100)
        for index8 in range(TileSpawnRate):
            spawnNewTiles()
controller.left.on_event(ControllerButtonEvent.PRESSED, on_left_pressed)

def tileUp(xUP: number, yUP: number):
    index9 = 0
    while index9 <= tilemapHeightCounter - 9:
        if tiles.tile_image_at_location(tiles.get_tile_location(0, index9 + 9)) == tiles.tile_image_at_location(tiles.get_tile_location(xUP + 2, yUP + 1)):
            tiles.set_tile_at(tiles.get_tile_location(xUP + 2, yUP + 1),
                tiles.tile_image_at_location(tiles.get_tile_location(0, index9 + 10)))
            info.change_score_by(2 ** (index9 + 2))
            break
        index9 += 1
def combineDown():
    global iNEW, jNEW, setActionAchieved
    for i24 in range(4):
        iNEW = 4 - i24
        for j24 in range(4):
            jNEW = 4 - j24
            if not (tiles.tile_at_location_equals(tiles.get_tile_location(jNEW + 2, iNEW + 1),
                assets.tile("""
                    blankTile0
                """)) or tiles.tile_at_location_equals(tiles.get_tile_location(jNEW + 2, iNEW + 1),
                assets.tile("""
                    blankTile
                """))):
                if tiles.tile_image_at_location(tiles.get_tile_location(jNEW + 2, iNEW + 1)) == tiles.tile_image_at_location(tiles.get_tile_location(jNEW + 2, iNEW + 2)):
                    setActionAchieved = True
                    print("ActionAchieved Reason: CombineDownSuccess")
                    tileUp(jNEW, iNEW + 1)
                    placeTile(iNEW, jNEW, 0)
def slideRight():
    global iNEW, jNEW, setActionAchieved
    for index10 in range(3):
        for o in range(4):
            iNEW = 4 - o
            for p in range(4):
                jNEW = 4 - p
                if not (tiles.tile_at_location_equals(tiles.get_tile_location(iNEW + 2, jNEW + 1),
                    assets.tile("""
                        blankTile0
                    """)) or tiles.tile_at_location_equals(tiles.get_tile_location(iNEW + 2, jNEW + 1),
                    assets.tile("""
                        blankTile
                    """))):
                    if tiles.tile_at_location_equals(tiles.get_tile_location(iNEW + 3, jNEW + 1),
                        assets.tile("""
                            blankTile0
                        """)):
                        setActionAchieved = True
                        print("ActionAchieved Reason: SlideRightSuccess")
                        tiles.set_tile_at(tiles.get_tile_location(iNEW + 3, jNEW + 1),
                            tiles.tile_image_at_location(tiles.get_tile_location(iNEW + 2, jNEW + 1)))
                        placeTile(jNEW, iNEW, 0)
        pause(10)
counterSpawn = 0
generatedY = 0
generatedX = 0
oldhighScore = 0
tilemapHeightCounter = 0
_512_SpawnRate_1 = 0
TileSpawnSize = 0
testTest = False
TileSpawnRate = 0
StartingTileAmount = 0
colorPallete = ""
beatHighScore = False
highScoreText: TextSprite = None
highScore = 0
palleteDisplay: TextSprite = None
highScoreManual = 0
setActionAchieved = False
jNEW = 0
iNEW = 0
if blockSettings.exists("colorPallete"):
    startGame()
else:
    blockSettings.write_string("colorPallete", "Original")
    startGame()

def on_forever():
    loop()
forever(on_forever)
