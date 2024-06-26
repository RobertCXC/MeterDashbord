//初始化echarts
var dom = document.getElementById('container');
var myChart = echarts.init(dom, null, {
  renderer: 'canvas',
  useDirtyRect: false
});

//一些使用的变量
var myTitle = "title";//图表的标题

var mySeries = [];//图表的数据集
var myData = [];//x轴的数据

var option = {
  title: {
    text: myTitle
  },
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    data: ["表1Max", "表2Max", "表1Min", "表2Min", "表1Avg", "表2Avg"],
    // selected: { "表1Max": false, "表2Max": false, "表1Min": false, "表2Min": false, "表1Avg": false, "表2Avg": false }//默认不勾选
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
    data: myData
  },
  yAxis: {
    type: 'value'
  },
  dataZoom: [
    {
      type: 'inside',
      start: 0,
      end: 100
    },
    {
      start: 0,
      end: 10
    }
  ],
  series: mySeries
};

if (option && typeof option === 'object') {
  myChart.setOption(option);
}

window.addEventListener('resize', myChart.resize);

//这个是求折线图数据的
function GetSerials() {
  //收尾两个时间
  var inputDateStart = document.getElementById('datepickerStart').value.replace(/\//g, "");
  var inputDateEnd = document.getElementById('datepickerEnd').value.replace(/\//g, "");
  console.log(inputDateStart < inputDateEnd);
  //pointID
  var id=0;

  const radioList = document.getElementById('radioList');
  const selectedRadio = radioList.querySelector('input[type="radio"]:checked');

  if (selectedRadio) {
    id = selectedRadio.id;
    console.log('选中的项的ID:', id);
  } else {
    console.log('没有选中的项');
  }
  var url="?id="+id+"&start="+inputDateStart+"&end="+inputDateEnd;
  console.log(url);
  
  //请求
  ajaxGet('http://'+globalUrl+'/timeinterval'+url, function (error, response) {
    if (error) {
      console.error(error);
    } else {
      console.log(response)

      myChart.setOption({
        series: response.mySeries,
        xAxis: {
          data: response.time
        },
      });
    }
  });
}
//获取所有的点位的

ajaxGet('http://'+globalUrl+'/plans', function (error, response) {
  if (error) {
    console.log('http://'+globalUrl+'/plans');
    console.error(error);
  } else {
    // 获取 <ul> 元素
    const radioList = document.getElementById('radioList');

    // 示例数据
    const data = response;

    // 生成 HTML 字符串
    const html = data.map(item => `
    <li class="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
    <div class="flex items-center ps-3">
       <input id="${item.PIndex}" type="radio" value="" name="list-radio"
          class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500  focus:ring-2 ">
       <label for="${item.PIndex}"
          class="w-full py-3 ms-2 text-sm font-medium text-gray-900">${item.PInfo}
       </label>
    </div>
    </li>
    `).join('');

    radioList.innerHTML = html;
  }
});