'use strict';

angular
    .module('myApp')
    .controller('PokemonDetailCtrl', function ($state, $stateParams, PokemonService) {

        var vm = this;

        vm.format = 'M/d/yy h:mm:ss a';

        PokemonService.getPokemon($stateParams.pokemonId)
            .then(function (pokemonData) {
                vm.pokemon = pokemonData.data;
            });

    }).component('pokemonDetail', {
        //components match only elements
        template: '<p>Вес: {{$ctrl.pokemon.weight}}, рост: {{$ctrl.pokemon.height}}</p>',
        controller: function () {
        },
        bindings: {
            pokemon: '='
        }
    })
    .directive('myCurrentTime', ['$interval', 'dateFilter', function ($interval, dateFilter) {

        function link(scope, element, attrs) {
            var format,
                timeoutId;


            function updateTime() {
                element.text(dateFilter(new Date(), format));
            }

            scope.$watch(attrs.myCurrentTime, function (value) {
                format = value;
                updateTime();
            });

            element.on('$destroy', function () {
                $interval.cancel(timeoutId);
            });

            // start the UI update process; save the timeoutId for canceling
            timeoutId = $interval(function () {
                updateTime(); // update DOM
            }, 1000);
        }

        return {
            restrict: 'A',
            link: link
        };
    }]);
