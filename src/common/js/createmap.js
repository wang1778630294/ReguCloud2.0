let param = {
  base: 0.5,
  canvas: null,
  ctx: null,
  img: null
};
export default {
  initCanvas: function (id, container,mapsrc) {
    let con = document.getElementById(container);
    param.canvas = document.getElementById(id);
    param.ctx = param.canvas.getContext('2d');
    param.img = new Image();
    param.canvas.width = con.clientWidth;
    param.canvas.height = con.clientHeight;
    param.img.src = require('@/'+mapsrc);
    param.img.onload = function () {
      param.base = con.clientWidth / param.img.width;
      param.ctx.drawImage(param.img, 0, 0,param.img.width*param.base,param.img.height*param.base);
    };
  },

  createMarker: function (data) {
    if (data) {
      for (let i = 0; i < data.length; i++) {
        if (data[i].position) {
          let marker = new Image();
          marker.src = require('@/common/img/map/flag.png');
          setTimeout(()=>{
            param.ctx.drawImage(marker,data[i].position.corx-15,data[i].position.cory-30,30,30);
          },1)
        }
      }
    }
  },
}



