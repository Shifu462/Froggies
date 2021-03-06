<template>
    <div :class="`cell ${cellDefaultClass} ${cellPropClass}`" @drop="onDrop" @dragover.prevent>

        <div v-if="isGreenFrog || isRedFrog"
             :id="cellId"
             :class="`${frogDefaultClass} ${frogPropClass}`"
             @dragstart="dragOptions.onDragStart">

        </div>

    </div>
</template>

<script lang="ts">

    import {Component, Prop, Vue} from "vue-property-decorator";
    import CellType from "../model/CellType";
    import FrogDragOptions from '../model/FrogDragOptions';
    import Point from "../model/Point";

    @Component({})
    export default class Cell extends Vue {
        @Prop()
        readonly currentCell!: CellType;

        @Prop()
        readonly cellClass!: string;

        @Prop()
        readonly frogClass!: string;

        @Prop()
        readonly dragOptions!: FrogDragOptions;

        @Prop()
        readonly position!: Point;

        onDrop(dropEvent: any) {
            const droppedFrogId: string = dropEvent.dataTransfer.getData('frog');

            this.dragOptions.onDragEnd
                && this.dragOptions.onDragEnd({ position: this.position, droppedFrogId });
        }

        get cellId(): string {
            return 'FROG-' + this.currentCell + this.position.Y + this.position.X;
        }

        get isGreenFrog(): boolean { return this.currentCell === CellType.GreenFrog; }
        get isRedFrog(): boolean { return this.currentCell === CellType.RedFrog; }

        get cellPropClass() : string { return this.cellClass || ''; }
        get frogPropClass() : string { return this.frogClass || ''; }

        get cellDefaultClass() : string {
            switch (this.currentCell) {
                case CellType.Water:
                    return 'cell--water';
                case CellType.Empty:
                    return 'cell--empty';
                default:
                    return 'cell--with-frog';
            }
        }

        get frogDefaultClass() : string {
            switch (this.currentCell) {
                case CellType.GreenFrog:
                    return 'frog green-frog';
                case CellType.RedFrog:
                    return 'frog red-frog';
                default:
                    return '';
            }
        }
    }

</script>

<style lang="less" scoped>

    .cell {
        @cellSize: 110px;

        width: @cellSize;
        height: @cellSize;

        background: url('/Assets/lily.svg') no-repeat;
        background-size: contain;

        &--water {
            visibility: hidden;
        }

        &--empty, &--with-frog {
            filter: drop-shadow( 3px 4px 2px rgba(0, 0, 0, 0.6));
            -webkit-filter: drop-shadow( 3px 4px 2px rgba(0, 0, 0, 0.6));
        }

        vertical-align: middle;
        .frog { margin: auto; }
    }

    .red-frog, .green-frog {
        width: 81px;
        height: 91px;
        background-size: contain;
        background-repeat: no-repeat;

        filter: drop-shadow( 3px 4px 2px rgba(0, 0, 0, 0.5));
        -webkit-filter: drop-shadow( 3px 4px 2px rgba(0, 0, 0, 0.5));
    }

    .red-frog {
        background-image: url('/Assets/frog-red.svg');
    }

    .green-frog {
        background-image: url('/Assets/frog.svg');
    }

</style>
