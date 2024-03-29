//初始化echarts
var dom = document.getElementById('container');
var myChart = echarts.init(dom, null, {
   renderer: 'canvas',
   useDirtyRect: false
});


var sss;

var data1 = [];
var selected = {}; // 创建一个空对象来存储所需的字典

for (var i = 0; i < sss.length; i++) {
  var obj = sss[i];
  data1.push(obj.name);
  selected[obj.name] = false;
}

var dom = document.getElementById('container');
var myChart = echarts.init(dom, null, {
  renderer: 'canvas',
  useDirtyRect: false
});
var app = {};

var option;

option = {
  title: {
    text: '台体1.5A/H/1.0/4圈'
  },
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    data: data1,
    selected: selected
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  toolbox: {
    feature: {
      saveAsImage: {}
    }
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: data2
  },
  yAxis: {
    type: 'value'
  },
  dataZoom: [
    {
      type: 'inside',
      start: 0,
      end: 70
    },
    {
      start: 0,
      end: 10
    }
  ],
  series: sss
};


if (option && typeof option === 'object') {
  myChart.setOption(option);
}

window.addEventListener('resize', myChart.resize);