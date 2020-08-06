// pages/home/home.js
Page({
  data:{
    barTop:Number,
    contentHeight:800,
    sourceData:{
      movies:{
        title:"影院热映",
        data:[]
      },
      movieTop:{
        title:"豆瓣热门",
        data:[]
      },
      newHotData:{
        title:"近期热门剧集",
        data:[]
      }
    },
    allMovies:[
      {
        title:"影院热映",
        url:'v2/movie/in_theaters',
        movies:[]
      },
      {
        title:"新片榜",
        url:'v2/movie/new_movies',
        movies:[]
      },
      {
        title:"口碑榜",
        url:'v2/movie/weekly',
        movies:[]
      },
      {
        title:"北美票房榜",
        url:'v2/movie/us_box',
        movies:[]
      },
      {
        title:"Top250",
        url:'v2/movie/top250',
        movies:[]
      }
    ]
  },

  onLoad(){

    wx.setNavigationBarColor({
      backgroundColor: '#42BD55',
      frontColor: '#ffffff',
    })
    this.loadLocalData();
    // this.loadCity((city) => {
    //   this.loadOtherData(0,{city:city})
    // });
    // this.loadOtherData(1);
    // this.loadOtherData(2);
    // this.loadOtherData(3);
    // this.loadOtherData(4);

    // 设置内容高度
    this.setData({
      contentHeight:wx.app.contentHeight - 100,
      barTop:wx.db.barHeight * 2

    });

  },
  event:function(ev){
    console.log(ev)
    wx.db.toast('44555')
  },
  backAction:function(evt){
    wx.db.toast('6666')
  },
  loadLocalData:function(){
    for (let index = 0; index < this.data.allMovies.length; index ++) {
      const obj = this.data.allMovies[index];
      obj.movies = wx.getStorageSync(obj.title) || [];
    }
    console.log('缓存结果')
    console.log(this.data.allMovies)
    this.setData(this.data)
  },

  loadOtherData:function(idx,params){
     wx.request({
       url: wx.db.url(this.data.allMovies[idx].url),
       data:params,
       header: {'content-type':'json'},
       success: (result)=>{
        console.log(result)
         let movies =  result.data.subjects;
         let obj = this.data.allMovies[idx];
         console.log(this.data.allMovies[idx].title)
         obj.movies = []
         for (let index = 0; index < movies.length; index ++) {
           let movie = movies[index].subject || movies[index]
           console.log(movie)
           this.updateMovie(movie);
           obj.movies.push(movie)
         }
         wx.setStorage({
           key: obj.title,
           data: obj.movies
         })
          console.log(obj.title)
        //  this.data.allMovies[idx].movies = movies;
         this.setData(this.data);

       },
       fail: ()=>{
         wx.db.toast('获取数据失败' + idx)
       },
       complete: ()=>{}
     });
  },

  loadCity: function(success){
      // 获取经纬度
      wx.getLocation({
        success:(res) => {
          console.log(res.latitude, res.longitude);
          wx.request({
            url: 'https://api.map.baidu.com/reverse_geocoding/v3', //仅为示例，并非真实的接口地址
            data: {
              output:'json',
              coordtype: 'wgs84ll',
              ak:'oe6xfPUE4Q2kUw7FViPSkjxlI0GGHTrR',
              // location:res.latitude + ',' + res.longitude,
              location:`${res.latitude},${res.longitude}`

            },
      
            success (res) {
              let city =  res.data.result.addressComponent.city;
              city = city.substring(0,city.length - 1);
              success && success(city);
            },
            fail:() => {
              wx.db.toast('获取城市失败');
            }
          })
        },
        fail:() => {
          wx.db.toast('获取位置失败');
        }
      })
  },
  updateMovie:function(movie){
       let stars   = parseInt(movie.rating.stars);
       if (stars == 0) return;
      //  debugger
      //  movie.stars = [1,1,1,0.5,0]
       movie.stars = {};
       movie.stars.on = 2;
       movie.stars.half  = 1;
       movie.stars.off = 2;
      // if (movie.rating.stars == '25'){
      //   debugger
      // }
      //  movie.stars.on = parseInt(movie.rating.stars / 10);
      //  movie.stars.half  = movie.rating.stars % 10 == 0 ? 0 : 1;
      //  if (movie.stars.on + movie.stars.half > 5){
      //    debugger
      //  }
      //  movie.stars.off = 5 - movie.stars.on - movie.stars.half;
  },

  viewMore:function(evt){
    const index = evt.currentTarget.dataset.index;
    const obj   = this.data.allMovies[index];
    wx.navigateTo({
      url: `/pages/list/list?title=${ obj.title }&url=${ obj.url }`,
      success: (result)=>{
        
      },
      fail: ()=>{},
      complete: ()=>{}
    });
  },

  movieTap:function(){
     console.log('5555')
  },

  searchAction:function(){
    wx.navigateTo({
      url:'/pages/search/search'
    })
  }

 
})