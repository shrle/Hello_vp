<template lang="html">
<main>
</main>
</template>

<script lang="ts">
import {Component, Emit, Prop, Vue} from "vue-property-decorator";
import * as PIXI from "pixi.js";

@Component
export default class Canvas extends Vue{
    app: any;
    container: any;
    niwatori: any;

    public mounted(){

        this.app = new PIXI.Application({
            width: 300,
            height: 200,
            backgroundColor: 0x1099bb
        });
        (document.querySelector('main') as HTMLInputElement).appendChild(this.app.view);

        this.app.stop();


        PIXI.loader
        .add('spritesheet', require('../assets/spritesheet/tori.json'))
        .load(this.onAssetsLoaded);

        this.container = new PIXI.Container();

        this.app.stage.interactive = true;
        this.app.stage.addChild(this.container);
    }

    private onAssetsLoaded(){
        const imgName: string = 'niwatori.png';
        this.niwatori =  PIXI.Sprite.fromFrame(imgName); // Uncaught Error: The frameId "niwatori.png" does not exist in the texture cache
        this.niwatori.x = 100;
        this.niwatori.y = 110;
        this.niwatori.width = 100;
        this.niwatori.height = 50;
        this.container.addChild(this.niwatori);

        this.app.start();
    }
}
</script>