
function getError(action, option, xhr) {
  let msg;
  if (xhr.response) {
    msg = `${xhr.response.error || xhr.response}`;
  } else if (xhr.responseText) {
    msg = `${xhr.responseText}`;
  } else {
    msg = `fail to post ${action} ${xhr.status}`;
  }

  const err = new Error(msg);
  err.status = xhr.status;
  err.method = 'post';
  err.url = action;
  return err;
}

function getSuffix(filename) {
  let pos = filename.lastIndexOf('.');
  return pos != -1 ? filename.substring(pos) : ''
}

function randomString (len = 32) {
  let chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
  let maxPos = chars.length;
  let pwd = '';

  for (let i = 0; i < len; i++) {
    pwd += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return pwd;
}

function getBody(xhr) {
  const text = xhr.responseText || xhr.response;
  if (!text) {
    return text;
  }

  try {
    return JSON.parse(text);
  } catch (e) {
    return text;
  }
}

function get (url) {
  var xhr = new XMLHttpRequest()
  xhr.open("GET", url, true)
  xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest')
  xhr.send(null)
  return new Promise(function (resolve, reject) {
    xhr.onload = function () {
      if (xhr.status < 200 || xhr.status >= 300) {
        return reject({ action: 'get', xhr });
      }
      resolve(getBody(xhr))
    };
    xhr.onerror = reject
  })
}

function post (url, data, onProgress) {
  var xhr = new XMLHttpRequest()
  xhr.open("POST", url, true)
  xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest')
  if (xhr.upload) {
    xhr.upload.onprogress = onProgress
  }
  xhr.send(data)
  return new Promise(function (resolve, reject) {
    xhr.onload = function () {
      if (xhr.status < 200 || xhr.status >= 300) {
        return reject({ action: 'post', xhr });
      }
      resolve(getBody(xhr))
    };
    xhr.onerror = reject
  })
}

/**
 * <form method="post" action="http://upload.qiniu.com/"
 *  enctype="multipart/form-data">
 * <input name="key" type="hidden" value="<resource_key>">
 * <input name="x:<custom_name>" type="hidden" value="<custom_value>">
 * <input name="token" type="hidden" value="<upload_token>">
 * <input name="file" type="file" />
 * <input name="crc32" type="hidden" />
 * <input name="accept" type="hidden" />
 * </form>
 * @param request
 *
 */
function getUpToken () {
  return get('/qiniu_uptoken')
}

function getUploadMock() {
  return Promise.resolve({
    uptoken: "sr4H3rnxg3fkN9bf5NBTj9V9ptPFMnW5Ryxbg_o6:CrrSyrCAQqRN1XJwidbbve_1XBY=:eyJzY29wZSI6Im1lbnV4eCIsImRlYWRsaW5lIjoxNTEyNTU2NDAwfQ=="
  })
}

/**
 * https://developer.qiniu.com/kodo/api/1312/upload
 * @param request
 */
export default function upload (option) {
  var form = new FormData()
  return getUploadMock().then(function (token) {
    form.append("key", option.data.keyPrefix + "/" + randomString(10) + getSuffix(option.file.name) )
    form.append("token", token.uptoken)
    form.append("file", option.file)
    form.append("accept", "application/json")
    return post('http://up.qiniu.com', form, function onProgress(e) {
      if (e.total > 0) {
        e.percent = e.loaded / e.total * 100;
      }
      option.onProgress(e)
    })
  }).then(function (res) {
    option.onSuccess(res)
  }, function (err) {
    option.onError(getError(err.action, option, err.xhr))
  })
}
