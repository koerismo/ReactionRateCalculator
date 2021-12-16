/*
Just a quick warning, this code is janky and should not be branched from.
The majority of this was thrown together in less than 2 hours.
*/

const vas = {
	'#i-unit-a': '.o-unit-a',
	'#i-unit-b': '.o-unit-b',
	
	'#i-value-1a': '.o-value-1a',
	'#i-value-2a': '.o-value-2a',
	
	'#i-value-1b': '.o-value-1b',
	'#i-value-2b': '.o-value-2b',
	
	'#i-result-1': '.o-result-1',
	'#i-result-2': '.o-result-2',
	'#i-result-3': '.o-result-3'
}
	
const vals = {}

Object.keys(vas).map((x)=>{
	const [key, value] = [x,vas[x]];
	$(key).on('input',function(){
		$('table '+value).attr('value',this.value)
		$('#output '+value).text(this.value)
		vals[key] = Number(this.value) || 0
		
		evalEqs()
	})
})

/*
	TABLE LAYOUT
	————————————————————————————————
	| Trial |  A   |  B   |  Rate  |
	|   1   |  1A  | 2A   |   1    |
	|   2   |  1A  | 2B   |   2    |
	|   3   |  1B  | 2A   |   3    |
	————————————————————————————————
*/

function evalEqs() {
	function get(v) { return vals[v] || 0 }
	function defaultZero(x) { return (Math.abs(x) == Infinity) ? 0 : x }
	const xVal = defaultZero(Math.round(10000*(
		Math.log(get('#i-result-3')/get('#i-result-1')) / 
		Math.log(get('#i-value-1b')/get('#i-value-1a'))
	))/10000)
	const yVal = defaultZero(Math.round(10000*(
		Math.log(get('#i-result-2')/get('#i-result-1')) / 
		Math.log(get('#i-value-2b')/get('#i-value-2a'))
	))/10000)
	const kVal = defaultZero(Math.round(10000*(
		get('#i-result-1') / (get('#i-value-1a')**xVal * get('#i-value-2a') ** yVal)
	))/10000)

	$('#eq-repr-a').attr('hidden',xVal == 0)
	$('#eq-repr-b').attr('hidden',yVal == 0)
	
	$('.eval-x').text(xVal)
	$('.eval-y').text(yVal)
	$('.eval-k').text(kVal)
}