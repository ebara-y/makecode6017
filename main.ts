radio.onReceivedString(function (receivedString) {
    if (前回の命令 == receivedString) {
        if (receivedString == "F1") {
            sinamon.car_derection(sinamon.direction.forward, 20)
        }
        if (receivedString == "F2") {
            sinamon.car_derection(sinamon.direction.forward, 100)
        }
        if (receivedString == "B1") {
            sinamon.car_derection(sinamon.direction.backward, 20)
        }
        if (receivedString == "B2") {
            sinamon.car_derection(sinamon.direction.backward, 100)
        }
        if (receivedString == "R1") {
            sinamon.car_derection(sinamon.direction.right_rotation, 20)
        }
        if (receivedString == "R2") {
            sinamon.car_derection(sinamon.direction.right_rotation, 100)
        }
        if (receivedString == "L1") {
            sinamon.car_derection(sinamon.direction.left_rotation, 20)
        }
        if (receivedString == "L2") {
            sinamon.car_derection(sinamon.direction.left_rotation, 100)
        }
        if (receivedString == "S") {
            sinamon.car_derection(sinamon.direction.Stop, 42)
        }
    }
    if (receivedString == "G") {
        sinamon.car_derection(sinamon.direction.Stop, 42)
        basic.pause(10)
        if (前時間 + 1000 < input.runningTime()) {
            strip.showColor(neopixel.colors(NeoPixelColors.Red))
            // music._playDefaultBackground(music.builtInPlayableMelody(Melodies.Chase), music.PlaybackMode.InBackground)
            pins.servoWritePin(AnalogPin.P8, 115)
            basic.pause(500)
            サーボ角度 = 115
            for (let index = 0; index < 25; index++) {
                pins.servoWritePin(AnalogPin.P8, サーボ角度)
                サーボ角度 += -2
                basic.pause(10)
            }
            basic.pause(10)
            strip.showColor(neopixel.colors(NeoPixelColors.Orange))
            前時間 = input.runningTime()
        }
    }
    前回の命令 = receivedString
})
let 左右 = 0
let 前後 = 0
let サーボ角度 = 0
let 前時間 = 0
let 前回の命令 = ""
let strip: neopixel.Strip = null
radio.setGroup(6)
pins.servoWritePin(AnalogPin.P8, 60)
strip = neopixel.create(DigitalPin.P9, 2, NeoPixelMode.RGB)
strip.showColor(neopixel.colors(NeoPixelColors.Orange))
basic.forever(function () {
    前後 = input.rotation(Rotation.Pitch)
    左右 = input.rotation(Rotation.Roll)
    if (前後 > 40) {
        radio.sendString("B2")
    } else {
        if (前後 > 20 && 前後 <= 40) {
            radio.sendString("B1")
        } else {
            if (前後 < -20 && 前後 >= -40) {
                radio.sendString("F1")
            } else {
                if (前後 < -40) {
                    radio.sendString("F2")
                } else {
                    if (左右 > 20 && 左右 <= 40) {
                        radio.sendString("R1")
                    } else {
                        if (左右 > 40) {
                            radio.sendString("R2")
                        } else {
                            if (左右 < -20 && 左右 >= -40) {
                                radio.sendString("L1")
                            } else {
                                if (左右 < -40) {
                                    radio.sendString("L2")
                                } else {
                                    radio.sendString("S")
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    if (input.buttonIsPressed(Button.A) || input.buttonIsPressed(Button.B) || input.buttonIsPressed(Button.AB)) {
        radio.sendString("G")
    }
})
