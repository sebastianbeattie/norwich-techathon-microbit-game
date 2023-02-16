function shootLogic () {
    bullet = game.createSprite(player.get(LedSpriteProperty.X), 4)
    radio.sendString("fire")
    for (let index = 0; index < 4; index++) {
        bullet.change(LedSpriteProperty.Y, -1)
        basic.pause(25)
    }
    if (bullet.isTouching(enemy)) {
        radio.sendString("hit")
        game.addScore(1)
        showExplosion()
    }
    bullet.delete()
}
function startGame () {
    player = game.createSprite(2, 4)
    enemy = game.createSprite(2, 0)
    game_has_started = 1
}
input.onButtonPressed(Button.A, function () {
    if (game_has_started == 1) {
        player.change(LedSpriteProperty.X, -1)
        radio.sendString("left")
    }
})
function showExplosion () {
    list = []
    list.push(images.createImage(`
        . . . . .
        . . . . .
        . . # . .
        . . . . .
        . . . . .
        `))
    list.push(images.createImage(`
        . . . . .
        . . # . .
        . # # # .
        . . # . .
        . . . . .
        `))
    list.push(images.createImage(`
        . . # . .
        . # # # .
        # # # # #
        . # # # .
        . . # . .
        `))
    list.push(images.createImage(`
        . # # # .
        # # # # #
        # # # # #
        # # # # #
        . # # # .
        `))
    list.push(images.createImage(`
        # # # # #
        # # # # #
        # # # # #
        # # # # #
        # # # # #
        `))
    for (let value of list) {
        value.showImage(0, 3)
    }
    basic.clearScreen()
}
input.onButtonPressed(Button.AB, function () {
    if (game_has_started == 1) {
        if (game.isGameOver()) {
            control.reset()
        } else {
            shootLogic()
        }
    } else {
        radio.sendString("start")
        game.startCountdown(game_duration)
        startGame()
    }
})
radio.onReceivedString(function (receivedString) {
    if (receivedString == "left") {
        enemy.change(LedSpriteProperty.X, -1)
    }
    if (receivedString == "right") {
        enemy.change(LedSpriteProperty.X, 1)
    }
    if (receivedString == "fire") {
        enemy_bullet = game.createSprite(enemy.get(LedSpriteProperty.X), 0)
        for (let index = 0; index < 4; index++) {
            enemy_bullet.change(LedSpriteProperty.Y, 1)
            basic.pause(25)
        }
        enemy_bullet.delete()
        game.addScore(-1)
    }
    if (receivedString == "hit") {
        showExplosion()
    }
    if (receivedString == "start") {
        game.startCountdown(game_duration)
        startGame()
    }
})
input.onButtonPressed(Button.B, function () {
    if (game_has_started == 1) {
        player.change(LedSpriteProperty.X, 1)
        radio.sendString("right")
    }
})
let enemy_bullet: game.LedSprite = null
let list: Image[] = []
let enemy: game.LedSprite = null
let player: game.LedSprite = null
let bullet: game.LedSprite = null
let game_duration = 0
let game_has_started = 0
radio.setGroup(69)
radio.sendString("conn_establish")
game_has_started = 0
game_duration = 5000
images.iconImage(IconNames.Ghost).showImage(0)
