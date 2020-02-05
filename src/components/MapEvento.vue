<template>
  <div>
    <canvas ref="canvas" id="canvas"></canvas>
  </div>
</template>
<script>
fabric.Canvas.prototype.getItemsByName = function(name) {
  var objectList = [],
      objects = this.getObjects();

  for (var i = 0, len = this.size(); i < len; i++) {
    if (objects[i].get('name') && objects[i].get('name') === name) {
      objectList.push(objects[i]);
    }
  }

  return objectList;
};
/**
 * Item name is unique
 */
fabric.Canvas.prototype.getItemByName = function(name) {
  var objects = this.getObjects();
  for (var i = 0, len = this.size(); i < len; i++) {
    if (objects[i].get('name') && objects[i].get('name') === name) {
      return objects[i];
    }
  }
  return false;
};
import Vue from 'vue'
import { EventBus } from '../event-bus.js';
export default {
  props: ['mapa'],
  data() {
    return {
      canvas: null
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

    EventBus.$on('setHov', function(setor){
      var object = app.canvas.getItemByName(setor);
      if(typeof object.set == 'function') {
        object.set('fill', 'red')
        app.canvas.renderAll()
      }
      EventBus.$emit('setorHovered', setor)
    })

    EventBus.$on('setOut', function(setor){
      var object = app.canvas.getItemByName(setor);
      if(typeof object.set == 'function') {
        object.set('fill', 'yellow')
        app.canvas.renderAll()
      }
      EventBus.$emit('setorHovered', '')
    })

    window.addEventListener('keydown', (e) => {
      if(e.keyCode == 46) {        
        var object = app.canvas.getActiveObject()
        if(!object) return;        
        if(object._objects) {
          object._objects.forEach((object) => app.canvas.remove(object));
          return;
        }         
        app.canvas.remove(object);          
      }
    })
    this.canvas.on('mouse:over', function(e) {
      if(!e.target) return;
      e.target.set('fill', 'red');
      EventBus.$emit('setorHovered', e.target.get('name'))
      app.canvas.renderAll();
    });
    this.canvas.on('mouse:out', function(e) {
      if(!e.target) return;
      e.target.set('fill', 'yellow');
      EventBus.$emit('setorHovered', '')
      app.canvas.renderAll();
    });
    this.canvas.on('mouse:wheel', function(opt) {
      var delta = ~opt.e.deltaY;
      var pointer = app.canvas.getPointer(opt.e);
      var zoom = app.canvas.getZoom();
      zoom = zoom + delta/1000;
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
        EventBus.$emit('setorSelected', app.canvas.getActiveObject().get('name'))
      });
      object.on('selected', (e) => {
        EventBus.$emit('setorSelected', app.canvas.getActiveObject().get('name'))
      })
      object.on('deselected', (e) => {
        EventBus.$emit('setorSelected', '')
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