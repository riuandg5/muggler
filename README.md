# Muggler
Muggler is a node.js module for using Google Drive API in a simplified way.\
\
**NOTE**: Muggler process only `multipart/form-data`. Use attribute `enctype='multipart/form-data'` in form.

## Before you start
Create project on [Google Cloud Platform](https://cloud.google.com) and enable Google Drive API.\
Check [this](tutorial.md) for step by step tutorial.

## Getting started

### Installation
```shell
$ npm install muggler --save
```
### Requiring module
```js
const config  = require('../path/to/secret/config.json');
const muggler = require('muggler')({
  email: config.client_email,
  key: config.private_key
});
```
### Methods

**listAll**
```js
app.get('/', function (req, res) {
  muggler.listAll({infolder: 'folderid'}, function (err, resp) {
    if (err) {
      console.log(err);
    }
    res.send(resp);
  })
})
```
> + `infolder` accepts 'string' and 'array' value only.
> + for root folder of drive use `root` as 'folderid'.
> + infolder: [folder1id, folder2id] will get files whose parent folder is either folder1 or folder2 that is, all files inside folder1 and folder2 will be in response.
```js
// Response structure
{
  status: 'status of operation',
  mug: [
    {
      kind: 'kind of file',
      id: 'id of file',
      name: 'name of file',
      mimeType: 'type of file'
    },
    {
      kind: 'kind of file',
      id: 'id of file',
      name: 'name of file',
      mimeType: 'type of file'
    }
  ]
}
```

**upOne**
```js
app.post('/', function (req, res) {
  muggler.upOne({fromfield: 'fieldname', infolder: 'folderid'}, req, function (err, resp) {
    if (err) {
      console.log(err);
    }
    res.send(resp);
  })
})
```
> + `fromfield` accepts 'string' value only.
> + fieldname should be name of the input field which will accept file in form.
> + `infolder` accepts 'string' and 'array' value only.
> + for root folder of drive use `root` as 'folderid'.
> + infolder: [folder1id, folder2id] will upload file to folder1 and folder2 both with same id.
```js
// Response structure
{
  file: {
    fieldname: "name of input field",
    originalname: "original name of file",
    encoding: "encoding type",
    mimetype: "type of file",
    destination: "temporary destination",
    filename: "changed name of file",
    path: "tempporary location of file",
    size: 'size of file'
  },
  status: "status of operation",
  mug: {
    id: "id of file",
    name: "name of file",
    mimeType: "type of file",
    size: 'size of file',
    parents: [
      "parent folder id"
    ],
    url: "url of file"
  },
  body: {
    otherFormField: "value in field"
  }
}
```

**delOne**
```js
app.post('/', function (req, res) {
  muggler.delOne({fileid: 'id of file'}, req, function (err, resp) {
    if (err) {
      console.log(err);
    }
    res.send(resp);
  })
})
```
> + `fileid` accepts 'string' value only.
```js
// Response structure
{
  status: "status of operation",
  mug: []
}
```

## Something to note
+ Service Account has its own Google Drive storage so files uploaded using Muggler will not be there in your own Google Drive.
+ Create folder in your Google Drive manually and share it with Service Account using `client_email`.
  + Open that folder and looking into its URL for its ID.
  + Files uploaded using Muggler into this folder will be visible in your own Google Drive now but storage of Service Account's Google Drive will be used. That is, originally file is created in Service Account's Google Drive as it is uploaded by Service Account but its reference is visible in your own Google Drive also because folder is shared.
  + If you manually delete any file from this shared folder then it will just delete the reference and original file will remain unaffected. To delete that file permanently use Service Account that is, using Muggler.