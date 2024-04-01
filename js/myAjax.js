function ajaxGet(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                var response = JSON.parse(xhr.responseText);
                callback(null, response);
            } else {
                callback('请求失败: ' + xhr.status, null);
            }
        }
    };
    xhr.open('GET', url, true);
    xhr.send();
}

// 使用封装的ajaxGet函数
// ajaxGet('your_json_data_endpoint_here', function (error, response) {
//     if (error) {
//         console.error(error);
//     } else {
//         //   document.getElementById("output").innerHTML = "<pre>" + JSON.stringify(response, null, 2) + "</pre>";
//         console.log(response);
//     }
// });