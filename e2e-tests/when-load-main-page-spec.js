describe('When load main page', function() {
    it('should automatically redirect to /view1 if location hash/fragment is empty', function() {
        browser.get('index.html');
        expect(browser.getLocationAbsUrl()).toMatch("/view1");
    });
});