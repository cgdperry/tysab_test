
$('.magnifying_glass_button').on('click', function(){console.log($(this).parents(".contents").attr("id"))
                                    $(this).next('.magnifying_glass_container div').show();
                                  });
$('.magnifying_glass_container span').on('click', function(){
                                   
                                  });

                                  
$('#references #close').on('click', function(evt){
                                    $('#references').toggleClass('hide_references show_references');
                                  });
                                  
$('nav a')
    .filter( function(index){ return 'ref' == $(this).text();  } )
    .on('click', function(evt){ 
                                $('#references').toggleClass('hide_references show_references');
                              } );


$('.efficacy #icon_stack span').on('click', function(evt){											
                                              var $contentsDiv = $('#container .contents'),
                                                  state = $contentsDiv.attr('class');
                                              state = state.substring(state.lastIndexOf('state-'));
                                              $contentsDiv
                                                .removeClass(state)
                                                .addClass('state-4');
                                              cur_state = 4;
                                            });
                                           