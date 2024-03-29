//初始化echarts
var dom = document.getElementById('container');
var myChart = echarts.init(dom, null, {
   renderer: 'canvas',
   useDirtyRect: false
});

var option;
var dataX = []
var dataY1 = [];
var dataY2 = [];

option = {
   title: {
      text: '实时数据'
   },
   legend: {
      selected: { "台体1": true, "台体2": true }
   },
   tooltip: {
      trigger: 'axis',
   },
   xAxis: {
      type: 'category',
      data: dataX,
      splitLine: {
         show: false
      }
   },
   yAxis: {
      type: 'value',
      boundaryGap: [0, '100%'],
      splitLine: {
         show: false
      }
   }, toolbox: {
      feature: {
         saveAsImage: {}
      }
   },
   series: [
      {
         name: '台体1',
         type: 'line',
         showSymbol: false,
         data: dataY1
      },
      {
         name: '台体2',
         type: 'line',
         showSymbol: false,
         data: dataY2
      }
   ]
};


if (option && typeof option === 'object') {
   myChart.setOption(option);
}

//关于websocket部分
let socket = new WebSocket("ws://127.0.0.1:4060");

socket.onopen = function (e) {
   console.log("websocket初始化成功");
};

socket.onmessage = function (event) {

   console.log("收到数据", event.data);
   var temp = event.data.split(',');
   if (dataX.length > 200) {
      dataX.shift();
      dataY1.shift();
      dataY2.shift();
   }

   dataX.push(temp[0]);
   dataY1.push({
      name: temp[0],
      value: [
         temp[0],
         temp[1]
      ]
   });

   dataY2.push({
      name: temp[0],
      value: [
         temp[0],
         temp[2]
      ]
   });

   myChart.setOption({
      xAxis: {
         data: dataX,
      },
      series: [
         {
            data: dataY1
         },
         {
            data: dataY2
         }
      ]
   });
};

socket.onclose = function (event) {
   if (event.wasClean) {
      console.log(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
   } else {
      // 例如服务器进程被杀死或网络中断
      // 在这种情况下，event.code 通常为 1006
      console.log('[close] Connection died');
   }
};

socket.onerror = function (error) {
   console.log(`[error] ${error.message}`);
};


window.addEventListener('resize', myChart.resize);