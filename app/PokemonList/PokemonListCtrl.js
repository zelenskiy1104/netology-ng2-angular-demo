'use strict';

angular
    .module('myApp')
    .controller('PokemonListCtrl', function(PokemonService) {

    var vm = this;

    vm.myOrderProperty = 'weight';
    vm.myQuery = '';

    PokemonService.getPokemons().then(function(pokemonData) {
        console.log(pokemonData);
        vm.pokemons = pokemonData.data;
    });

}).directive('ndInlineEdit', function ($compile, $templateRequest) {

        'use strict';

        /*
         * This directive should be used on an element wrapping the original element that you want to replace
         * with an input field. The directive is made to have as small a footprint as possible to be able to use
         * it in longer lists.
         * The directive will not apply more scope watchers until the trigger expression evaluates to true.
         */

        return {
            restrict: 'A',
            scope: {
                ndModel: '=', // The string model to edit
                ndTrigger: '=', // The property to watch to decide when to trigger the input field.
                ndSaveFn: '=', // The ctrl function to call to save the update. Expects a promise to be returned.
                ndCancel: '=', // Function to call when cancel is clicked. Can be toggle function as it won't pass anything
                mbValidationConfig: '=?' //Object containing settings for validation config
            },
            link: function (scope, element) {

                var originalValue = angular.copy(scope.mbModel);
                var originalContent;
                var initialized = false;
                var childScope;
                var editValue = '';

                function getInnerElement() {
                    return angular.element(element.children()[0]);
                }

                function cancel() {
                    if (initialized) {
                        editValue = '';
                        getInnerElement().replaceWith($compile(originalContent)(scope.$parent));
                        scope.mbCancel();
                        initialized = false;
                        childScope.$destroy();
                    }
                }

                function save(form) {

                    if (originalValue === form.input.$viewValue) {
                        cancel();
                        return;
                    }

                    if (form.$valid) {
                        scope.mbSaveFn(childScope.editValue).finally(function () {
                            cancel();
                        });
                    }
                }

                function initInput() {

                    originalValue = angular.copy(scope.mbModel);
                    $templateRequest('components/mb-inline-edit.html').then(function (template) {
                        editValue = originalValue;
                        childScope = scope.$new();
                        angular.extend(childScope, {
                            save: save,
                            cancel: cancel,
                            editValue: editValue
                        });

                        originalContent = getInnerElement().replaceWith($compile(template)(childScope));
                        element.find('input').focus();
                        initialized = true;
                    });
                }

                var triggerListener = scope.$watch('mbTrigger', function () {
                    if (scope.mbTrigger) {
                        initInput();
                    } else {
                        cancel();
                    }
                });

                scope.hasError = function (errors) {
                    return !_.isEmpty(errors);
                };

                scope.$on('$destroy', function () {
                    triggerListener();
                });
            }
        };
    });
