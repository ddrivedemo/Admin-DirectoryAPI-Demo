/**
 * Note that our recommendations, report, and code samples being shared
 * (“Samples”) are not Ddrive products,and Ddrive will not support such Samples.
 * Samples are offered on as-is basis, and designed only to provide you with
 * certain examples of how such code samples could be utilized. Ddrive does not
 * provide any representation and warranty in relation to Samples.
 *
 * By implementing any of Samples, you agree to solely assume all responsibility
 * for any consequences that arise from such implementation.
 *
 * It is your responsibility to check that the form and content of your property
 * meet all applicable technical, security, legal, and any other compliance
 * requirements.
 */


/**
* グループ一覧の取得
*/
function getGroupList() {

  // シート名を指定してスプレッドシートを取得
  let spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName('Group');

  // シート内のコンテンツをクリア
  sheet.getDataRange().clear();

  // 1行目 - ヘッダー出力
  let line = [
    'id',
    'email',
    'name',
    'description',
    'directMemberCount',
    'kind',
  ];
  let range = sheet.getRange(2, 1, 1, line.length);
  range.setValues([line]);

  // 自カスタマー内の最大200グループを取得
  let param = {
    'customer': 'my_customer',
    'maxResulsts': 200,
  };

  // グループ一覧を取得
  let response = AdminDirectory.Groups.list(param);
  if ( response ) {

    // レスポンスからグループ一覧を取得
    let groupList = response.groups;

    if (groupList) {

      for (let listIndex=0; listIndex<groupList.length; listIndex++) {
        // 結果をシートに出力
        let groupInfo = groupList[listIndex];
        line = [
          groupInfo.id, // グループID
          groupInfo.email, // グループアドレス
          groupInfo.name, // グループ名
          groupInfo.description, // 説明
          groupInfo.directMemberCount, // メンバー数
          groupInfo.kind,
        ];
        range = sheet.getRange(3+listIndex, 1, 1, line.length);
        range.setValues([line]);
      }
    }
  }
}


/**
* ChromeOSデバイス一覧の取得
*/
function getChromeList() {

  // シート名を指定してスプレッドシートを取得
  let spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName('Chrome');

  // シート内のコンテンツをクリア
  sheet.getDataRange().clear();

  // 1行目 - ヘッダー出力
  let line = [
    'deviceId',
    'serialNumber',
    'status',
    'model',
    'osVersion',
    'macAddress',
    'orgUnitPath',
  ];
  let range = sheet.getRange(2, 1, 1, line.length);
  range.setValues([line]);

  // 取得件数を指定
  let param = {
    'maxResulsts': 9999,
  };

  // ChromeOSデバイス一覧を取得
  let response = AdminDirectory.Chromeosdevices.list ('my_customer', param);
  if (response) {

    // レスポンスからChromeOSデバイス一覧を取得.
    let chromeList = response.chromeosdevices;

    if ( chromeList ) {
      for (let listIndex=0; listIndex<chromeList.length; listIndex++) {
        // 結果をシートに出力
        let chromeInfo = chromeList[listIndex];
        line = [
          chromeInfo.deviceId,
          chromeInfo.serialNumber,
          chromeInfo.status,
          chromeInfo.model,
          chromeInfo.osVersion,
          chromeInfo.macAddress,
          chromeInfo.orgUnitPath,
        ];
        range = sheet.getRange(3+listIndex, 1, 1, line.length);
        range.setValues([line]);
      }
    }
  }
}
