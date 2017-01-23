function setUpHTMLFixture() {
    jasmine.getFixtures().set(' <button id="quote" href="" class="btn btn-primary">Get a quote.</button>          \
                                        <div style="max-width: 60%; margin: 20px auto;">         \
                                         <h3 id="quote-content"></h3>              \
                                        <h5 id="quote-title" style="text-align:right"></h5>\
                                        </div>   \
                                    ');
}

describe("Simple Tests", function(){
    it("Finds jQuery", function(){
        expect($).not.toBeNull();
    });
});

describe("Test Form", function(){
    // Create mock-up of form
    beforeEach(function() {
        setUpHTMLFixture();
    });
    var quoteSpy;

    // did button render?
    it("should find the quote button", function() {
        expect($('#quote')).toHaveText("Get a quote.");
    });

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


});
