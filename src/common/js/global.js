let pathName = window.location.pathname.substring(1);
let webName = pathName == '' ? '' : pathName.substring(0, pathName.indexOf('/'));
let path;
if (webName == "") {
  path = window.location.protocol + '//' + window.location.host;
}
else {
  path = window.location.protocol + '//' + window.location.host + '/' + webName+'/';
}
// export const localurl =  path;
export const localurl = 'http://123.56.216.54:8080/user_monitor/';
