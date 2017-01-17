describe('When load view2 page', function() {

    beforeEach(function() {
        browser.get('index.html#!/view2');
    });

    it('should have a test DIV', function() {
        expect(element.all($$('.for-test')).count()).toEqual(1);
    });

});