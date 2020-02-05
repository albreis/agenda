<template>
  <div>
    <canvas ref="canvas" id="canvas"></canvas>
  </div>
</template>
<script>
import Vue from 'vue'
import { EventBus } from '../event-bus.js';
export default {
  props: ['mapa'],
  data() {
    return {
      canvas: null,
    }
  },

  mounted() {

    var app = this

    this.canvas = new fabric.Canvas(this.$refs.canvas, {
      freeDrawingCursor: true,
      width: 700,
      height: 600,
      backgroundVpt: true,
      defaultCursor: true,
      stopContextMenu: true
    });

    this.canvas.on('mouse:wheel', function(opt) {
      var delta = ~opt.e.deltaY;
      var pointer = app.canvas.getPointer(opt.e);
      var zoom = app.canvas.getZoom();
      zoom = zoom + delta/1000;
      console.log(zoom)
      if (zoom > 5) zoom = 5;
      if (zoom < 0.1) zoom = 0.1;
      app.canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
      opt.e.preventDefault();
      opt.e.stopPropagation();
    });

    if(this.mapa){
      this.canvas.loadFromJSON(this.mapa, this.canvas.renderAll.bind(this.canvas), (o, object) => {
        if(o.type == 'image') {
          this.image = new Image()
          this.image.src = object.src
          app.addImageEvents(object)
        }
        if(o.type == 'rect' || o.type == 'group') {
          app.addRectEvents(object)
        }
      })
    }

  },

  methods: {

    addImageEvents(object) {
      object.set({ 
        x: (this.canvas.getWidth() / 2) - (object.width / 2), 
        y: (this.canvas.getHeight() / 2) - (object.height / 2), 
        left: (this.canvas.getWidth() / 2) - (object.width / 2), 
        top: (this.canvas.getHeight() / 2) - (object.height / 2), 
        hasControls: false, 
        hasBorders: false,
        selectable: false,
        hoverCursor: 'default'
      });
      this.canvas.zoomToPoint(new fabric.Point(this.canvas.width / 2, this.canvas.height / 2), (this.canvas.height / object.height));
      this.canvas.renderAll();
      object.onSelect(function(e){
        e.preventDefault()
        return false
      })
      //this.canvas.set({width: this.image.width, height: this.image.height, centeredScaling: true});
      return object;
    },

    addRectEvents(object) {

      var app = this

      object.set({
        hasControls: false,
        lockUniScaling: true,
        lockMovementX: true,
        lockMovementY: true
      })

      object.on('mousedown', (e) => {
        var activeObject = app.canvas.getActiveObject()
        app.name = activeObject.get('name')
        if(activeObject.get('reservado')) {
          activeObject.set('reservado', false)
          activeObject.set('fill', 'yellow')
        } else {
          activeObject.set('reservado', true)
          activeObject.set('fill', 'red')
        }
        var objs = []
        app.canvas.getObjects().forEach(function(o) {
          if(o.get('reservado') == true) {
            return objs.push({qty:1, code: o.get('name')});
          }
        });
        app.canvas.discardActiveObject();
        app.canvas.requestRenderAll();
        console.log(objs)
        EventBus.$emit('reservaSelected', objs)
      });
      object.on('selected', (e) => {
        var activeObject = app.canvas.getActiveObject()
        app.name = activeObject.get('name')
      })
      object.on('deselected', (e) => {
        app.name =''
        EventBus.$emit('entradaSelected', app.name)
      })
      object.on('mouseover', (e) => {
        e.target.set('opacity', 0.9)
      })
      object.on('mouseout', (e) => {
        e.target.set('opacity', 0.5)
      })
      return object;
    }

  }
}
</script>
<style lang="stylus" scoped>
canvas
  width 400px
  height 400px
  background #ddd
</style>