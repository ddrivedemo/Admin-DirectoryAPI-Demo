# Directory API サンプルコード

Google Apps Scriptのコードを記載しています。
Google Workspaceのグループ、Chromebookデバイスの情報を取得するサンプルを紹介します。

## ファイル構成
```
トップ
│
├ README.md .. このファイル
│
└ directoryapi_demo.gs .. サンプルコード
```

## API に関するドキュメント

・Directory API Groups<br/>
 https://developers.google.com/admin-sdk/directory/reference/rest/v1/groups

・Directory API Chrome OS Devices<br/>
 https://developers.google.com/admin-sdk/directory/reference/rest/v1/chromeosdevices


## サンプルコード

### グループ操作

#### グループ一覧の取得
グループの一覧は AdminDirectory.Groups.list で取得します。
```
// Parameter for list groups.
let param = {
  'customer': 'my_customer',
  'maxResulsts': 200,
};

// List groups.
let response = AdminDirectory.Groups.list(param);
if (response) {

  // Get group list from response.
  let groupList = response.groups;

  if (groupList) {
    for (let listIndex=0; listIndex<groupList.length; listIndex++) {

      // Get group info.
      let groupInfo = groupList[listIndex];
      ...

      // Get group email address.
      let groupEmail = groupInfo.email;
      ...
    }
  }
}
```
AdminDirectory.Groups.list によりグループ情報の配列が取得できます。


### クローム端末の情報取得

#### クローム端末一覧の取得
クローム端末の一覧は AdminDirectory.Chromeosdevices.list で取得します。
```
// Parameter for list chrome os devices.
let param = {
  'maxResulsts': 9999,
};

// List chrome os devices.
let response = AdminDirectory.Chromeosdevices.list ('my_customer', param);
if (response) {

  // Get chrome os devices from response.
  let chromeList = response.chromeosdevices;

  if ( chromeList ) {
    for (let listIndex=0; listIndex<chromeList.length; listIndex++) {

      // Get chrome os device info.
      let chromeSerialNumber = chromeList[listIndex].serialNumber;
      ...
    }
  }
}
```
AdminDirectory.Chromeosdevices.list によりクローム端末情報の配列が取得できます。
