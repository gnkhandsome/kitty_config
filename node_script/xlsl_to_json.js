const xlsx = require('node-xlsx')
const fs = require('fs')


// json文件夹名称
var json_folder_name = "./ConfigJson/";

function FC_handle_xlsx(xlsData, xlsName) {
    // 读取表格的数据
    // 取出第index个 sheet 数据
    for (var sheetIndex = 0; sheetIndex < xlsData.length; sheetIndex++) {

        let sheet = xlsData[sheetIndex].data
        // 第一行标题行
        var sheetTitle = sheet[0];

        sheet.shift() //去除第一行标题
        sheet.shift() //去除第二行标题
        excel_Data = sheet;

        // json 写入文件名称
        var sheetName = xlsData[sheetIndex].name;
        var w_account_json_file = json_folder_name + xlsName + sheetName + ".json"
        // 需要写入的数据
        var json_account_data = [];
        for (var i = 0; i < excel_Data.length; i++) {
            var rowData = excel_Data[i];
            if (rowData != undefined) {
                var element = {};
                // 遍历标题
                for (var j = 0; j < sheetTitle.length; j++) {
                    var sheetTitleName = sheetTitle[j];
                    var currentRowData = rowData[j];
                    element[sheetTitleName] = currentRowData;
                }
                json_account_data.push(element)
            }
        }

        var jsonStrAccount = JSON.stringify(json_account_data)

        console.log(':', jsonStrAccount)
        // 写入 json
        fs.writeFile(w_account_json_file, jsonStrAccount, function (error) {
            if (error) {
                // console.log('写入账号 json 失败');
            } else {
                console.log('写入 json 成功了');
            }
        })
    }
}

function handleXLS() {

    // 广告
    var adsXLSData = xlsx.parse("../xlsx/ads.xlsx");

    // 探险表
    var adventureXLSData = xlsx.parse("../xlsx/adventure.xlsx");

    // 背包
    var backpackXLSData = xlsx.parse("../xlsx/backpack.xlsx");

    // 亲友团
    var friendsXLSData = xlsx.parse("../xlsx/friends_rewards_level.xlsx");

    // kitty
    var kittyXLSData = xlsx.parse("../xlsx/kitty.xlsx");

    // 升级
    var levelXLSData = xlsx.parse("../xlsx/level_reward.xlsx");

    // 转盘表
    var luckyXLSData = xlsx.parse("../xlsx/lucky_wheel.xlsx");

    // 角色
    var numRuleXLSData = xlsx.parse("../xlsx/number_display_rule.xlsx");

    // 奖励
    var rewardXLSData = xlsx.parse("../xlsx/reward.xlsx");

    // 设置
    var settingsXLSData = xlsx.parse("../xlsx/settings.xlsx");

    // 字符
    var stringsXLSData = xlsx.parse("../xlsx/strings.xlsx");

    // 解锁
    var unlockXLSData = xlsx.parse("../xlsx/unlock.xlsx");

    // 37 级合并抽奖
    var specialXLSData = xlsx.parse("../xlsx/special_kitty_random.xlsx");

    // 地图关卡
    var mapXLSData = xlsx.parse("../xlsx/map.xlsx");

    // FC_handle_xlsx(adsXLSData, "ads_");
    // FC_handle_xlsx(adventureXLSData,"adventure_");
    // FC_handle_xlsx(backpackXLSData,"backpack_");
    // FC_handle_xlsx(friendsXLSData,"friends_");
    // FC_handle_xlsx(kittyXLSData,"kitty_");
    // FC_handle_xlsx(levelXLSData,"level_reward_");
    // FC_handle_xlsx(luckyXLSData,"lucky_wheel_");
    // FC_handle_xlsx(numRuleXLSData,"number_display_rule_");
    // FC_handle_xlsx(rewardXLSData,"reward_");
    // FC_handle_xlsx(settingsXLSData,"settings_");
    FC_handle_xlsx(stringsXLSData,"string_");
    // FC_handle_xlsx(unlockXLSData,"unlock_");
    // FC_handle_xlsx(specialXLSData,"special_");
    // FC_handle_xlsx(mapXLSData,"map_");

}

// handleXLS()

var stringObj = require("./ConfigJson/string_strings_kitty_name.json");
jsonObjToStrMap(stringObj);


// json 转 map
function jsonObjToStrMap(stingObj) {
    
    let strMap = new Map();
    for (let k of Object.keys(stingObj)) {
        var jsonObj = stingObj[k];
        strMap.set(jsonObj.name, jsonObj);
    }
    // return strMap;

    let mapObj = Object.create(null);
    for (let [k, v] of strMap) {
        mapObj[k] = v;
    }

    var jsonStrAccount = JSON.stringify(mapObj)

    var w_map_file = json_folder_name + "string_strings_kitty_name_map.json"
    // 写入 json
    fs.writeFile(w_map_file, jsonStrAccount, function (error) {
        if (error) {
            // console.log('写入账号 json 失败');
        } else {
            console.log('写入 json 成功了');
        }
    })
}
