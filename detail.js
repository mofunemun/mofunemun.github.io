'use strict'

async function getShop(){  
    // 位置情報取得
    navigator.geolocation.getCurrentPosition(Success,Fail);
    async function Success(pos){
        let lat = pos.coords.latitude;
        let lng = pos.coords.longitude;

        // 検索範囲と位置情報をURLに組み込んで呼び出し
        let range = sessionStorage.getItem("rangeNum");
        let url = "http://webservice.recruit.co.jp/hotpepper/gourmet/v1/?key=5231d4b646e96da3&lat=" + lat + "&lng=" + lng + "&range=" + range + "&format=json";
        const res = await fetch(url);
        const users = await res.json();
        console.log(users);

        let keyNum = sessionStorage.getItem("keyNum");
        console.group(keyNum);
        document.getElementById("app").insertAdjacentHTML("beforeend", "<div id='answers'></div>");

        // 検索結果がなければメッセージを、あればそれをすべて出す
        let itemName = users.results.shop[keyNum].name;
        let itemPlace = users.results.shop[keyNum].address;
        let itemStation = users.results.shop[keyNum].station_name;
        let itemTime = users.results.shop[keyNum].open;
        let itemImg = users.results.shop[keyNum].photo.pc.m;

        let shopBox = "<div id='" + keyNum + "'></div>"
        let shopName = "<h2>" + itemName + "</h2>";
        let shopPlace = "<p>" + itemPlace + "</p>";
        let shopStation = "<p>" + itemStation + "</p>";
        let shopTime = "<p>" + itemTime + "</p>";
        let shopImg = "<img src='" + itemImg + "' alt='" + itemName + "の写真です'>"

        document.getElementById("answers").insertAdjacentHTML("beforeend", shopBox);
        document.getElementById(keyNum).insertAdjacentHTML("beforeend", shopName);
        document.getElementById(keyNum).insertAdjacentHTML("beforeend", shopPlace);
        document.getElementById(keyNum).insertAdjacentHTML("beforeend", shopStation);
        document.getElementById(keyNum).insertAdjacentHTML("beforeend", shopTime);
        document.getElementById(keyNum).insertAdjacentHTML("beforeend", shopImg);
    }
    // 位置情報エラー時の対応
    function Fail(error){
        if(error === 1){
            alert("エラー！位置情報を取得する権限がありません");
        }else if(error === 2){
            alert("エラー！通信上のエラーです");
        }else{
            alert("エラー！タイムアウトしました");
        }
    }
}    

getShop();
