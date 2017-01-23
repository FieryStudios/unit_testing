Setup = {
    init : function(){
        $('#quote').on('click', function(e) {
            e.preventDefault();
            $.getJSON( {

                url:"http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&callback=",
                success: function(data) {

                    var post = data.shift(); // The data is an array of posts. Grab the first one.
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
    }
};