$(function() {
    // The taskHtml method takes in a JavaScript representation
    //of the task and produces an HTML representation using
    // <li> tags
    function taskHtml(task) {
        var checkedStatus = task.done ? "checked" : "";
        var liClass = task.done ? "completed" : "";
        var liElement = '<li id="listItem-' + task.id +'" class="' + liClass + '">' +
          '<div class="view"><input class="toggle" type="checkbox"' +
          " data-id='" + task.id + "'" +
            checkedStatus +
            '><label>' +
            task.title +
            '</label></div></li>';

        return liElement;
    }

    // toggleTask takes in an HTML representation of the completion status of
    //an event that fires from an HTML representation of 
    //the toggle checkbox and performs an API request to toggle 
    //the value of the 'done' field
    function toggleTask(e) {
        var itemId = $(e.target).data("id");

        var doneValue = Boolean($(e.target).is(':checked'));

        $.post("/tasks/" + itemId, {
            _method: "PUT",
            task: {
             done: doneValue
            }
         }).success(function(data) {
    		refetch();
         } );
      }

    // Create a full method to refetch tasks
    function refetch() {
        $.get("/tasks").success( function( data ) {
            var htmlString = "";

            $.each(data, function(index,  task) {
                htmlString += taskHtml(task);   
            });
            var ulTodos = $('.todo-list');
            ulTodos.html(htmlString);

            $('.toggle').change(toggleTask);

        });
    }
  refetch();

        $('#new-form').submit(function(event) {
        event.preventDefault();
        var textbox = $('.new-todo');
        var payload = {
            task: {
                title: textbox.val()
            }
        };
        $.post("/tasks", payload).success(function(data) {
		refetch();
        });
        $('.new-todo').(val'')
    });

        $('.completed').click (function() {
            $.get("/tasks").success( function( data ) {
                var htmlString = "";

                $.each(data, function(index,  task) {
                    if(task.done) {
                    htmlString += taskHtml(task);
                    }       
                });
                var ulTodos = $('.todo-list');
                ulTodos.html(htmlString);

                $('.toggle').change(toggleTask);

            });
        }); 

        $('.active').click (function() {
            $.get("/tasks").success( function( data ) {
                var htmlString = "";

                $.each(data, function(index,  task) {
                    if(task.done===false) {
                    htmlString += taskHtml(task);
                    }       
                });
                var ulTodos = $('.todo-list');
                ulTodos.html(htmlString);

                $('.toggle').change(toggleTask);

            });
        }); 

        $('.all').click (function() {
            $.get("/tasks").success( function( data ) {
                var htmlString = "";

                $.each(data, function(index,  task) {
                    if(task.done===false) {
                    htmlString += taskHtml(task);
                    } 
                    if(task.done) {
                        htmlString += taskHtml(task);
                    }              
                });
                var ulTodos = $('.todo-list');
                ulTodos.html(htmlString);

                $('.toggle').change(toggleTask);

            });
        }); 



        

});
