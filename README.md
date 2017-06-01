# JS Puyo

JS Puyo is a single player modification of the classic falling-block game
Puyo Pop. The player's goal is to stack the colored blobs that fall from
the top of the screen into orderly groups that can be cleared with special
breaker blocks for points. The game is lost when the blocks reach the top
of the screen.

## Features and Technologies

The core of this game is an easeljs stage, which renders the position of
the blocks to the player and whose Ticker function handles calling the
functions that advance the game from frame to frame. Otherwise, vanilla
JS and its DOM interaction methods handle the creation of blocks, player
interaction, scoring, timekeeping and updating the score and time displays
for the player.
