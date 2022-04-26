<?php
/*
Usage:
$string = [
	'content' => 'Enter string text here...',	//(Required)(string) content to be checked
	'length' => 10,					//(Optional)(integer) length to compare string to
	'max' => 10,					//(Optional)(integer) max length allowed
	'min' => 0					//(Optional)(integer) minlength allowed
];
*/
function check_string($string) {
	if (!isset($string->content))
		return false;

	if (
		gettype($string->content) !== 'string' &&
		ctype_space($string->content) === true //Check if string is only whitespaces
	) return false;

	$string_length = strlen($string->content);
	if (
		isset($string->length) &&
		$string_length === $string->length
	) return true;
	
	if (
		isset($string->max) &&
		isset($string->min) &&
		$string_length <= $string->max &&
		$string_length >= $string->min
	) return true;

	if (
		isset($string->min) &&
		$string_length >= $string->min
	) return true;

	if (
		isset($string->max) &&
		$string_length <= $string->max
	) return true;

	if (
		!isset($string->length) &&
		!isset($string->max_length) &&
		!isset($string->min_length)
	) return true;
	return false;
}
?>
