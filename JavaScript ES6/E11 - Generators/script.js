window.onload = function(){

    genWrapper(function* generator(){
        var tweets = yield $.getJSON("data/tweets.json");
        console.log(tweets);

        var friends = yield $.getJSON("data/fb-friends.json");
        console.log(friends);

        var ytVids = yield $.getJSON("data/yt-vids.json");
        console.log(ytVids);
    });

    function genWrapper(generator){
        //set up generator / iterator
        var myGen = generator();

        //create function to handle the yielded value
        function handle(yielded){
            if(!yielded.done){
                yielded.value.then(function(data){
                    return handle(myGen.next(data));
                });
            }
        }//end handle

        //return handle function, passing in myGen.next
        return handle(myGen.next());

    }//end genWrapper

}
