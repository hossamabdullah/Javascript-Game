(function(){
    function randomIntFromInterval(min,max)
    {
        return Math.floor(Math.random()*(max-min+1)+min);
    }

    function randomInt(){
    	return randomIntFromInterval(1000,1350);
    }
    
    window.Utility = {
        randomIntFromInterval : randomIntFromInterval,
        randomInt : randomInt
    };
})();