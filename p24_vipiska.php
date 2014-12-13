<?php
function p24_statement($id, $pass, $cardnum, $start_date, $end_date, $country="UA"){
	$data = "<oper>cmt</oper><wait>0</wait><test>0</test><payment id=''><prop name='sd' value='$start_date' /><prop name='ed' value='$end_date' /><prop name='card' value='$cardnum' /></payment>";
	$signature = sha1(md5($data.$pass));
	$xml = "<?xml version='1.0' encoding='UTF-8'?><request version='1.0'><merchant><id>$id</id><signature>$signature</signature></merchant><data>$data</data></request>";
	$ch = curl_init("https://api.privatbank.ua/p24api/rest_fiz");
	curl_setopt($ch, CURLOPT_HEADER, 0);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER,1);
	curl_setopt($ch, CURLOPT_POST,1);
	curl_setopt($ch, CURLOPT_POSTFIELDS, $xml);
	$result=curl_exec($ch);
	$result = simplexml_load_string($result);
	return $result;
}
?>
