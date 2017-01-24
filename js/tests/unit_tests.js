// Can set up code snippet, or use imported html file.

//function setUpHTMLFixture() {
//    jasmine.getFixtures().set(' <button id="quote" class="btn btn-primary">Get a quote.</button>          \
//                                        <div style="max-width: 60%; margin: 20px auto;">         \
//                                         <h3 id="quote-content"></h3>              \
//                                        <h5 id="quote-title" style="text-align:right"></h5>\
//                                        </div>   \
//                                    ');
//}
//
// beforeEach(function() {
//setUpHTMLFixture();
//});



describe("Simple Tests", function(){
    it("Finds jQuery", function(){
        expect($).not.toBeNull();
    });
});

describe("Test Form", function(){

    var quoteSpy;

    // Create mock-up of form
    jasmine.getFixtures().fixturesPath = 'base/spec/javascripts/fixtures/';
    beforeEach(function() {
        loadFixtures('index.html');

    });


    // did button render?
    it("should find the quote button", function() {
        expect($('#quote')).toHaveText("Get a quote.");
    });

    // these two tests work before Setup.init() is called, but not after.
    // I think it has to do with the binding of the click event after Setup.init() is called.

    it("should have triggered a click", function() {

        quoteSpy = spyOnEvent('#quote', 'click');
        $('#quote').click();
        expect('click').toHaveBeenTriggeredOn('#quote');
    });

    it("should find the spy event", function() {
        quoteSpy = spyOnEvent('#quote', 'click');
        $('#quote').click();
        expect(quoteSpy).toHaveBeenTriggered();
    });

// this test only works if the helloWorld() function is called outside of the ajax block,
    // not in the success call, for some reason.

	//it("Should find the Helloworld function if button is clicked", function() {
     //   spyOn(Setup, "helloWorld").and.callThrough();
     //   Setup.init();
     //   $('#quote').click();
     //   expect(Setup.helloWorld).toHaveBeenCalled();
	//});


    it("Should monitor the ajax call if button is clicked", function() {
        spyOn($, "ajax").and.callThrough();
        Setup.init();
        $('#quote').click();
        expect($.ajax).toHaveBeenCalled();
        console.log($.ajax.calls.mostRecent().args[0]); // show args for the heck of it
    });

    it("Should populate the container with fake data if provided", function() {
        spyOn($, "ajax").and.callThrough();
        Setup.init();
        $('#quote').click();
        $.ajax.calls.mostRecent().args[0].success([{
            ID: 2439,
            title: "Achille Castiglioni",
            content: "<p>Delete, delete, delete and at the end find the ‘core aspect of the design’.</p>"
        }]); // fake quote

        expect('#quote-content').toContainText("Delete");
    });
});
