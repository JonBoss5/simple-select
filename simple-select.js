(function($){

    $.fn.simpleSelect = function(){

        var $allSelects = $(this);

        $allSelects.each(function(){
            initSimpleSelect(this);
        });

    };

    //INITIALIZE SELECT FUNCTIONALITY
    function initSimpleSelect(selectElement){

        //GET THE SELECT ELEMENT'S STYLE PROPERTIES
        var selectStyles = getSelectStyles(selectElement);
        
        //WRAP THE SELECT BOX IN CONTAINING DIV
        var $container = $('<div class="simpleSelectContainer"></div>');
        $container.css(selectStyles);
        $container.on('click', showSimpleSelect);
        $(selectElement).wrap($container);

        //ADD CLASS TO THE SELECT ELEMENT
        $(selectElement).addClass('simpleSelected');

        //CREATE simpleSelectDropdown
        var $dropdown = $('<div class="simpleSelectDropdown"></div>');
        var $simpleSelectValue = $('<div class="simpleSelectValue">- SELECT -</div><span class="simpleSelectArrow"></span>');
        $dropdown.append($simpleSelectValue);

        //GET OPTIONS
        var $options = $('<div class="simpleSelectOptions"></div>');
        $(selectElement).find('option').each(function(){
            $options = simpleSelectAddOptions($options, this);
        });

        //APPEND OPTIONS TO DROPDOWN
        $dropdown.append($options);

        //APPEND DROPDOWN TO THE DOM
        $(selectElement).after($dropdown);
    }

    //ADD OPTION TO THE SELECT BOX
    function simpleSelectAddOptions($options, option){
        $thisOption = $('<div class="simpleSelectOption" data-value="'+ $(option).val() +'">'+ $(option).html() +'</div>');
        $thisOption.on('click', simpleSelectValue);
        $options.append($thisOption);
        return $options;
    }
    
    //EVENT MANAGEMENT
    function showSimpleSelect(){
        $(this).find('.simpleSelectOptions').toggle();
    }

    function simpleSelectValue(){
        var selectedOption = $(this).data().value;
        var $container = $(this).closest('.simpleSelectContainer');
        var $thisControl = $container.find('.simpleSelected');
        $thisControl.val(selectedOption).trigger('change');
        $container.find('.simpleSelectValue').html( $thisControl.find('option[value="'+ selectedOption +'"]').html() );
        $container.find('.wasSelected').removeClass('wasSelected');
        $(this).addClass('wasSelected');
    }

    //APPLY SELECT STYLES TO SIMPLESELECT
    function getSelectStyles(selectElement){
        return {
            width:$(selectElement).width() + 'px',
            height:$(selectElement).height() + 'px'
        }
    }

})(jQuery);