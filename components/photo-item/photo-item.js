// components/photo-item/photo-item.js

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    source:{
      type:Object,
      value:{}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
     
  },

  /**
   * 组件的方法列表
   */
  methods: {
    tapAction:function(){
      console.log(this.properties.source)
    }
  },

})
