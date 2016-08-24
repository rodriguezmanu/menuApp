(function() {
    var jsonData = 'assets/data/data.json'

    init();

    function init() {
        getData();
        listeners();
    }

    function getData() {
        $.getJSON(jsonData)
            .done(function(response) {
                createMenuDropdown(response);
                createMealsMenu(response, 0);
            })
            .fail(function(response) {
                console.log('error');
            });
    }

    function createMenuDropdown(data) {
        var $dropdown = $('.dropdown-menu');

        $.each(data, function(index, value) {
            $dropdown.append(
                '<li data-key="' + index + '">' +
                    '<a href="#">' + value.title + '</a>' +
                '</li>');
        });
    }
    function createMealsMenu(data, index) {
        var $meals = $('.meals ul'),
            currentMeal = data[index].meals,
            titleMenu = data[index].title;

        $('.menu-title').text(titleMenu);

        $meals.empty();

        $.each(currentMeal, function(index, value) {
            $meals.append(
                '<li data-key="' + index + '">' +
                    '<a href="#">' + value + '</a>' +
                '</li>');
        });
    }

    function listeners() {
        downButton();
        upButton();
        changeDataMenu();
    }

    function changeDataMenu() {
        $('.dropdown-menu').on('click', 'li', function() {
            var index = $('.dropdown-menu li').index($(this));

            $.getJSON(jsonData)
                .done(function(response) {
                    createMealsMenu(response, index);
                })
                .fail(function(response) {
                    console.log('error');
                });
        });
    }

    function upButton(argument) {
        $('.options .up').click(function() {
            console.log('up');
        });
    }

    function downButton(argument) {
        $('.options .down').click(function() {
            console.log('down');
        });
    }
})();
