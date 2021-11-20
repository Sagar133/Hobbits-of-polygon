import Phaser from "phaser";

export default class MainScene extends Phaser.Scene {
    state: any;
    socket: any;
    otherPlayers: any;
    cursors: any;
    astronaut: any;
    moving: any;

    constructor() {
        super("MainScene");
        this.state = {};
    }

    preload() {
        this.load.spritesheet("astronaut", "assets/spritesheets/astronaut3.png", {
            frameWidth: 29,
            frameHeight: 37,
        });
        this.load.image("vendingMachine", "assets/sprites/vendingMachine.png");
        this.load.image("mainroom", "assets/backgrounds/mainroom.png");
    }

    create() {
        const scene = this;
        //BACKGROUND
        this.add.image(0, 0, "mainroom").setOrigin(0);

        //CREATE SOCKET
        this.socket = io();

        //LAUNCH WAITING ROOM
        scene.scene.launch("WaitingRoom", { socket: scene.socket });

        // CREATE OTHER PLAYERS GROUP
        this.otherPlayers = this.physics.add.group();

        // JOINED ROOM - SET STATE
        this.socket.on("setState", function (state: any) {
            const { roomKey, players, numPlayers } = state;
            scene.physics.resume();

            // STATE
            scene.state.roomKey = roomKey;
            scene.state.players = players;
            scene.state.numPlayers = numPlayers;
        });

        // PLAYERS
        this.socket.on("currentPlayers", function (arg: any ) {
            const { players, numPlayers } = arg;
            scene.state.numPlayers = numPlayers;
            
            Object.keys(players).forEach(function (id) {
                if (players[id].playerId === scene.socket.id) {
                    scene.addPlayer(scene, players[id]);
                } else {
                    scene.addOtherPlayers(scene, players[id]);
                }
            });
        });

        this.socket.on("newPlayer", function (arg: any ) {
            const { playerInfo, numPlayers } = arg;
            scene.addOtherPlayers(scene, playerInfo);
            scene.state.numPlayers = numPlayers;
        });

        this.socket.on("playerMoved", function (playerInfo: any) {
            scene.otherPlayers.getChildren().forEach(function (otherPlayer: any) {
                if (playerInfo.playerId === otherPlayer.playerId) {
                    const oldX = otherPlayer.x;
                    const oldY = otherPlayer.y;
                    otherPlayer.setPosition(playerInfo.x, playerInfo.y);
                }
            });
        });

        this.socket.on("otherPlayerStopped", function (playerInfo: any) {
            scene.otherPlayers.getChildren().forEach(function (otherPlayer: any) {
                if (playerInfo.playerId === otherPlayer.playerId) {
                    otherPlayer.anims.stop(null, true);
                }
            });
        });
        this.cursors = this.input.keyboard.createCursorKeys();

        // DISCONNECT
        this.socket.on("disconnected", function (arg: any ) {
            const { playerId, numPlayers } = arg;
            scene.state.numPlayers = numPlayers;
            scene.otherPlayers.getChildren().forEach(function (otherPlayer: any) {
                if (playerId === otherPlayer.playerId) {
                    otherPlayer.destroy();
                }
            });
        });
    }

    update() {
        const scene = this;
        //MOVEMENT
        if (this.astronaut) {
            const speed = 225;
            const prevVelocity = this.astronaut.body.velocity.clone();
            // Stop any previous movement from the last frame
            this.astronaut.body.setVelocity(0);
            // Horizontal movement
            if (this.cursors.left.isDown) {
                this.astronaut.body.setVelocityX(-speed);
            } else if (this.cursors.right.isDown) {
                this.astronaut.body.setVelocityX(speed);
            }
            // Vertical movement
            if (this.cursors.up.isDown) {
                this.astronaut.body.setVelocityY(-speed);
            } else if (this.cursors.down.isDown) {
                this.astronaut.body.setVelocityY(speed);
            }
            // Normalize and scale the velocity so that astronaut can't move faster along a diagonal
            this.astronaut.body.velocity.normalize().scale(speed);

            // emit player movement
            var x = this.astronaut.x;
            var y = this.astronaut.y;
            if (
                this.astronaut.oldPosition &&
                (x !== this.astronaut.oldPosition.x ||
                y !== this.astronaut.oldPosition.y)
            ) {
                this.moving = true;
                this.socket.emit("playerMovement", {
                    x: this.astronaut.x,
                    y: this.astronaut.y,
                    roomKey: scene.state.roomKey,
                });
            }
            // save old position data
            this.astronaut.oldPosition = {
                x: this.astronaut.x,
                y: this.astronaut.y,
                rotation: this.astronaut.rotation,
            };
        }
    }

    addPlayer(scene: any, playerInfo: any) {
        scene.joined = true;
        scene.astronaut = scene.physics.add
        .sprite(playerInfo.x, playerInfo.y, "astronaut")
        .setOrigin(0.5, 0.5)
        .setSize(30, 40)
        .setOffset(0, 24);
    }

    addOtherPlayers(scene: any, playerInfo: any) {
        const otherPlayer = scene.add.sprite(
        playerInfo.x + 40,
        playerInfo.y + 40,
        "astronaut"
        );
        otherPlayer.playerId = playerInfo.playerId;
        scene.otherPlayers.add(otherPlayer);
    }
}
