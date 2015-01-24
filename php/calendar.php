<?php
function calendar(){
//This gets today's date
$date = time();
//This puts the day, month, and year in seperate variables
$day = date('d', $date);
$month = date('m', $date);
$year = date('Y', $date);
//Here we generate the first day of the month
$first_day = mktime(0,0,0,$month, 1, $year);
//This gets us the month name
$montharray = array("СІЧНЯ", "ЛЮТОГО", "БЕРЕЗНЯ", "КВІТНЯ", "ТРАВНЯ", "ЧЕРВНЯ", "ЛИПНЯ", "СЕРПНЯ", "ВЕРЕСНЯ", "ЖОВТНЯ", "ЛИСТОПАДА", "ГРУДНЯ");
$monthname = $montharray[intval($month)-1];
//Here we find out what day of the week the first day of the month falls on
$day_of_week = date('D', $first_day);
//Once we know what day of the week it falls on, we know how many blank days occure before it.
//If the first day of the week is a Sunday then it would be zero
switch($day_of_week){
	case "Mon": $blank = 0; $dayname="ПОНЕДІЛОК"; break;
	case "Tue": $blank = 1; $dayname="ВІВТОРОК"; break;
	case "Wed": $blank = 2; $dayname="СЕРЕДА"; break;
	case "Thu": $blank = 3; $dayname="ЧЕТВЕРГ"; break;
	case "Fri": $blank = 4; $dayname="ПЯТНИЦЯ"; break;
	case "Sat": $blank = 5; $dayname="СУБОТА"; break;
	case "Sun": $blank = 6; $dayname="НЕДІЛЯ"; break;
}
//We then determine how many days are in the current month
$days_in_month = cal_days_in_month(0, $month, $year);
//Here we start building the table heads
echo"
<div class='shadowed side-calendar'>
	<table class='calendar'>
		<tr class='title'><td colspan='7'>$dayname $day $monthname $year</td></tr>
		<tr class='time'><td colspan='7'><span id='clock'></span></td></tr>
		<tr class='day-names'>
			<td>ПН</td><td>ВТ</td><td>СР</td><td>ЧТ</td><td>ПТ</td><td>СБ</td><td>НД</td></tr><tr>";
//This counts the days in the week, up to 7
$day_count = 1;
//first we take care of those blank days
while($blank > 0){
	echo"<td></td>";
	$blank = $blank-1;
	$day_count++;
}
//sets the first day of the month to 1
$day_num = 1;
//count up the days, untill we've done all of them in the month
while($day_num <= $days_in_month){
	if($day_num == date("j")){
		echo "<td class='today'>$day_num</td>";
	}
	else{ echo "<td>$day_num</td>"; }
	$day_num++;
	$day_count++;
	//Make sure we start a new row every week
	if($day_count > 7){
		echo "</tr><tr>";
		$day_count = 1;
	}
}
//Finaly we finish out the table with some blank details if needed
while($day_count >1 && $day_count <=7){
	echo "<td></td>";
	$day_count++;
}
echo "</tr></table></div>";
}
//calendar();
?>
