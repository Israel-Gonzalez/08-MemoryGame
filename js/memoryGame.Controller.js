(function() {
    'use strict';

    angular
        .module('memoryGameApp')
        .controller('memoryGameController', memoryGameController);

    memoryGameController.$inject = ['$timeout'];

    /* @ngInject */
    function memoryGameController($timeout) {
        var vm = this;
        var gridSize = 6 * 6;

        vm.cards = [];
        vm.currentCards = [];

        // Fisher - Yates(algorithm) shuffle function
        function shuffle(array) {
            var m = array.length,
                t, i;

            // While there remain elements to shuffle 
            while (m) {

                // Pick a remaining element
                i = Math.floor(Math.random() * m--);

                // Swap remaining element with current element 
                t = array[m];
                array[m] = array[i];
                array[i] = t;
            }
            return array;
        }

        // This will reset the game completely
        vm.reset = function() {
            vm.cards = [];
            vm.currentCards = [];
        };

        vm.createCards = function() {

            for (var i = 0; i < gridSize; i++) {
                vm.cards.push({
                    id: i, // unique id
                    flipped: false, // ng-show/ng-hide
                    // ternary statement <bool> ? <if_true> : <if_false>
                    value: i % 2 == 0 ? i : i - 1, // pair value 
                    disabled: false // once a matching pair is found, disable card
                });

                vm.cards = shuffle(vm.cards);
            }
        };

        // Flipping the card 

        vm.flipCard = function(card) {
            var cardAlreadySelected = false;

            vm.currentCards.forEach(function(eachCard) {
                if (card.id === eachCard.id) {
                    cardAlreadySelected = true;
                }

            });
            if (!cardAlreadySelected && vm.currentCards.length < 2 && !card.disabled) {}

            // 1. Flip the card over
            card.flipped = !card.flipped;

            // 2. Add cards to "currently flipped" array
            vm.currentCards.push(card);

            // 3. Check if 2 cards have been flipped over 
            if (vm.currentCards.length === 2) {
                // True
                // 1. Check if the value of the 2 flipped cards match eachother
                if (vm.currentCards[0].value === vm.currentCards[1].value) {

                    //  Disable both of these cards so that they remain uncovered 
                    vm.currentCards[0].disabled = true;
                    vm.currentCards[1].disabled = true;
                    // 3. Clear the "currently flipped" array
                    vm.currentCards = [];

                    var gameOver = vm.cards.every(function() {
                        return eachCard.disabled;
                    });
                    if (gameOver) {
                        alert('End of Game!')
                        vm.reset();
                    }

                } else {

                    $timeout(function() {
                        vm.currentCards[0].flipped = false;
                        vm.currentCards[1].flipped = false;
                        vm.currentCards = [];
                    }, 1000);
                }

            }
            // False
            // After one second 
            // Set both cards in the "currently flipped" array to unflipped 
            // Clear the currently flipped array 
        };
        vm.createCards();
    }
})();
