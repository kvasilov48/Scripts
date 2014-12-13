<?php
function p24_balance($id, $pass, $cardnum, $country="UA"){
	$data = "<oper>cmt</oper><wait>0</wait><test>0</test><payment id=''><prop name='cardnum' value='$cardnum' /><prop name='country' value='$country' /></payment>";
	$signature = sha1(md5($data.$pass));
	$xml = "<?xml version='1.0' encoding='UTF-8'?><request version='1.0'><merchant><id>$id</id><signature>$signature</signature></merchant><data>$data</data></request>";
	$ch = curl_init("https://api.privatbank.ua/p24api/balance");
	curl_setopt($ch, CURLOPT_HEADER, 0);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER,1);
	curl_setopt($ch, CURLOPT_POST,1);
	curl_setopt($ch, CURLOPT_POSTFIELDS, $xml);
	$result=curl_exec($ch);
	$result = simplexml_load_string($result);
	return $result;
}
?>
