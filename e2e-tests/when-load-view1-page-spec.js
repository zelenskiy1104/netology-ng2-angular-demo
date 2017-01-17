describe('When load view1 page', function() {

    beforeEach(function() {
        browser.get('index.html#!/view1');
    });

    it('should render view1 when user navigates to /view1', function() {
        expect(browser.getLocationAbsUrl()).toMatch("/view1");
    });

    it('should render list of 5 pokemons', function() {
        var todoList = element.all(by.repeater('pokemon in pokemons'));
        expect(todoList.count()).toEqual(5);
    });
    
});