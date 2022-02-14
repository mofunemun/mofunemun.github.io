'use strict'

async function getShop(){
    // 位置情報取得
    navigator.geolocation.getCurrentPosition(Success,Fail);
    async function Success(pos){
        let lat = pos.coords.latitude;
        let lng = pos.coords.longitude;

        // 検索範囲を指定したときの処理
        document.getElementById('range').onsubmit = async function(event){
            // アクションによる再読み込みを防止する
            event.preventDefault();

            // 前回の検索結果を消去
            let lastItems = document.getElementById("answers");
            lastItems.remove();

            // 検索範囲と位置情報をURLに組み込んで呼び出し
            const range = document.getElementById("range").rangeNum.value;
            let url = "http://webservice.recruit.co.jp/hotpepper/gourmet/v1/?key=5231d4b646e96da3&lat=" + lat + "&lng=" + lng + "&range=" + range + "&format=json";
            const res = await fetch(url);
            const users = await res.json();

            // 検索結果がなければメッセージを、あればそれをすべて出す
            document.getElementById("app").insertAdjacentHTML("beforeend", "<ul style='display: flex; flex-direction:column; list-style:none;' id='answers'></ul>");
            let shopNum = users.results.shop.length;
            document.getElementById("shopNum").innerHTML = shopNum;
            if(shopNum === 0){
                document.getElementById("answers").insertAdjacentHTML("beforeend", "<p style='text-align:center;'>大変申し訳ありません。検索した範囲内に店舗がありません。</p>");
            }else{
                for (let i=0; i < shopNum; i++){
                    let itemName = users.results.shop[i].name;
                    let itemPlace = users.results.shop[i].address;
                    let itemStation = users.results.shop[i].station_name;
                    let itemImg = users.results.shop[i].photo.pc.m;

                    let shopBox = "<li style='width:60%; border:solid 1px black; margin:10px auto; padding: 10px 20px;' id='" + i + "'></li>";
                    let shopBoxText = "<div id='text" + i + "' style='display:flex; justify-content:space-between;'></div>";
                    let shopBoxCon = "<div id='con" + i + "' style='display:flex; flex-direction: column; width:60%;'></div>"
                    let shopName = "<h2>" + itemName + "</h2>";
                    let shopPlace = "<p>" + itemPlace + "</p>";
                    let shopStation = "<p>" + itemStation + "</p>";
                    let shopImg = "<img src='" + itemImg + "' alt='" + itemName + "の写真です'>"

                    document.getElementById("answers").insertAdjacentHTML("beforeend", shopBox);
                    document.getElementById(i).insertAdjacentHTML("beforeend", shopName);
                    document.getElementById(i).insertAdjacentHTML("beforeend", shopBoxText);
                    document.getElementById("text" + i).insertAdjacentHTML("beforeend", shopBoxCon);
                    document.getElementById("con" + i).insertAdjacentHTML("beforeend", shopPlace);
                    document.getElementById("con" + i).insertAdjacentHTML("beforeend", shopStation);
                    document.getElementById("text" + i).insertAdjacentHTML("beforeend", shopImg);
                }
            }

            const itemList = document.getElementById("answers");
            for(let j = 0; j < itemList.childElementCount; j++){
                let item = itemList.children[j];
                item.addEventListener('click', () => {
                    sessionStorage.setItem('keyNum',j);
                    sessionStorage.setItem('rangeNum',document.getElementById("range").rangeNum.value);
                    window.location.href = './detail.html';
                })
            }

        }

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





