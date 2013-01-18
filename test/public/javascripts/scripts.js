$(document).ready(function() {
     //makes buttons buttons
     $("button").button();
     $("button").button();

    //makes datepickers
    $( ".datepicker" ).datepicker();
    //$('#newworkout').find('input.datepicker').datepicker();
    $('.datepicker').datepicker('setDate', new Date());
    $('.datepicker').datepicker("hide");

     $("button#addExercise").click(function() {
        console.log("click!");
        var newElem = $('<li><label for="element">element[][exerciseID]<br /></label><input name="element[][exerciseID]" class="element"><button type="button" class="addSet">Add Set</button><button type="button" class="delete">Delete Exercise</button><ul class="sets"></ul></li>');
        $(newElem).appendTo('#exercises');
        $("button").button();
        $('#newworkout').trigger('sortupdate');
        });

    $(document).on('click', '.addSet',(function() {
        console.log("click! set");
        var newElem = $('<li><label for="element" >element[][split][][reps]<br /></label><input name="element[][split][][reps]" class="element"><label for="element" ><br />element[][split][][weight]<br /></label><input name="element[][split][][weight]" class="element"><button type="button" class="delete">Delete Set</button></li>');
        $(this).siblings('ul.sets').append(newElem);
        $("button").button();
        $('#newworkout').trigger('sortupdate');
        }));

     $(document).on('click', '.delete',function() {
           $(this).closest('li').remove();
           $('#newworkout').trigger('sortupdate');
     });



    $("#newworkout").bind('sortupdate', function(event, ui) {
        console.log ('sortupdate');
        $('#newworkout > ul > li').each(function(){
            var itemindex= $(this).index();
            var newname = $(this).find('input').attr('name').replace(/element\[[0-9]*\]/,'element[' + itemindex  + ']');

            $(this).children('label').html(newname);
            $(this).children('input').attr('name', newname);

                $(this).find('ul li').each(function(){
                    var itemindex2= $(this).index();
                    $(this).children('input').each(function(){
                        var newname2 = $(this).attr('name').replace(/\[split\]\[[0-9]*\]/,'[split][' + itemindex2  + ']');
                        newname2 = newname2.replace(/element\[[0-9]*\]/,'element[' + itemindex  + ']');
                        $(this).attr('name', newname2);
                      });
                     $(this).children('label').each(function(){
                         var newname2 = $(this).text.replace(/\[split\]\[[0-9]*\]/,'[split][' + itemindex2  + ']');
                         newname2 = newname2.replace(/element\[[0-9]*\]/,'element[' + itemindex  + ']');
                         $(this).text(newname2);
                       });
                });



        });
        return false;
    });

        $('#newworkout').trigger('sortupdate');

});

