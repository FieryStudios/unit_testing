var Setup = {
    init : function(){
        $('#quote').on('click', function(e) {
            e.preventDefault();

            $.getJSON( {

                url:"http://quotesondesign.com/wp-json/posts",
                success: function(data) {
                    //console.log(data);
                    var post = data.shift(); // The data is an array of posts. Grab the first one.

                    //console.log(post);
                    $('#quote-content').html(post.content);

                    // If the Source is available, use it. Otherwise hide it.
                    if (post.link) {
                        $('#quote-title').html('<a href="' + post.link + '" target="_blank"> -- ' + post.title + '</a>');
                    }
                    else{
                        $('#quote-title').html('-- ' + post.title);
                    }
                },
                cache: false
            });


        });
    },
    helloWorld : function(){
        return "Hello, World!"
    }
};

