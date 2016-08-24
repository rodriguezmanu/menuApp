(function() {
    var jsonData = 'assets/data/data.json',
        dropdownMenu = '.dropdown-menu',
        mealsList = '.meals ul',
        $downButton = $('.options .down'),
        $upButton = $('.options .up'),
        $iconDropdown = $('.dropdown .menu-title + i')

    init();

    function init() {
        getData();
        listeners();
        checkButtonsAvail();
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
        var $dropdown = $(dropdownMenu);

        $.each(data, function(index, value) {
            var classAttr = (index === 0) ? 'class="selected"' : '';

            $dropdown.append(
                '<li data-key="' + index + '" ' + classAttr + '>' +
                    '<a href="#">' + value.title + '</a>' +
                    '<i class="fa fa-cog" aria-hidden="true"></i>' +
                '</li>');
        });
    }
    function createMealsMenu(data, index) {
        var $meals = $(mealsList),
            currentMeal = data[index].meals,
            titleMenu = data[index].title;

        $('.menu-title').text(titleMenu);

        $meals.empty();

        $.each(currentMeal, function(index, value) {
            $meals.append(
                '<li data-key="' + index + '">' +
                    '<a href="#">' + value + '</a>' +
                    '<i class="fa fa-pencil" aria-hidden="true"></i>' +
                '</li>');
        });
        checkButtonsAvail();
    }

    function listeners() {
        downButton();
        upButton();
        changeDataMenu();
        selectMeal();
        dropdownEvents();
    }

    function selectMeal() {
        $(mealsList).on('click', 'li', function() {

            $(mealsList + ' > li').removeClass('selected');
            $(this).addClass('selected');
            checkButtonsAvail();
        });
    }

    function checkButtonsMenuAvail() {
        var menuListN = $('.dropdown .dropdown-menu li').length - 1,
            menuSelectedIndex =  $('.dropdown .dropdown-menu li.selected').index();

        if (menuSelectedIndex === -1) {
            $downButton.addClass('disabled');
            $upButton.addClass('disabled');
        } else if (menuSelectedIndex === 0) {
            $upButton.addClass('disabled');
            $downButton.removeClass('disabled');
        } else if (menuListN === menuSelectedIndex) {
            $downButton.addClass('disabled');
            $upButton.removeClass('disabled');
        } else {
            $upButton.removeClass('disabled');
            $downButton.removeClass('disabled');
        }
    }

    function checkButtonsAvail() {
        var mealsListN = $(mealsList + ' > li').length - 1,
            mealSelectedIndex = $('.meals ul li.selected').index();

        if (mealSelectedIndex === -1) {
            $downButton.addClass('disabled');
            $upButton.addClass('disabled');
        } else if (mealSelectedIndex === 0) {
            $upButton.addClass('disabled');
            $downButton.removeClass('disabled');
        } else if (mealsListN === mealSelectedIndex) {
            $downButton.addClass('disabled');
            $upButton.removeClass('disabled');
        } else {
            $upButton.removeClass('disabled');
            $downButton.removeClass('disabled');
        }
    }

    function changeDataMenu() {
        $(dropdownMenu).on('click', 'li', function() {
            var index = $(dropdownMenu + ' li').index($(this));

            $(dropdownMenu + ' li').removeClass('selected');
            $(this).addClass('selected');

            $.getJSON(jsonData)
                .done(function(response) {
                    createMealsMenu(response, index);
                })
                .fail(function(response) {
                    console.log('error');
                });
        });
    }

    function upButton() {
        $upButton.click(function(event) {
            event.stopPropagation();
            if ($('.dropdown.open').length) {
                var $menuSelected =  $('.dropdown.open .dropdown-menu li.selected');

                $menuSelected.insertBefore($menuSelected.prev());
                checkButtonsMenuAvail();
            } else {
                var $mealSelected = $('.meals ul li.selected');

                $mealSelected.insertBefore($mealSelected.prev());
                checkButtonsAvail();
            }
        });
    }

    function downButton() {
        $downButton.click(function(event) {
            event.stopPropagation();
            if ($('.dropdown.open').length) {
                var $menuSelected =  $('.dropdown.open .dropdown-menu li.selected');

                $menuSelected.insertAfter($menuSelected.next());
                checkButtonsMenuAvail();
            } else {
                var $mealSelected = $('.meals ul li.selected');

                $mealSelected.insertAfter($mealSelected.next());
                checkButtonsAvail();
            }
        });
    }

    function dropdownEvents() {
        $('.dropdown').on('show.bs.dropdown', function() {
            $(mealsList).addClass('disabled');
            $iconDropdown.removeClass('fa-chevron-down');
            $iconDropdown.addClass('fa-chevron-up');
            $(this).find(dropdownMenu).first().stop(true, true).slideDown();
            checkButtonsMenuAvail();
        });
        $('.dropdown').on('hide.bs.dropdown', function() {
            $(mealsList).removeClass('disabled');
            $iconDropdown.addClass('fa-chevron-down');
            $iconDropdown.removeClass('fa-chevron-up');
            $(this).find(dropdownMenu).first().stop(true, true).slideUp();
            checkButtonsAvail();
        });
    }
})();
