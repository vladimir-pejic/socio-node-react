// Delete Article
$('.delete-article').on('click', function() {
let id = $(this).attr('data-id');
    $.ajax({
        type: 'DELETE',
        url: '/articles/'+id,
        success: (res) => {
            window.location.href='/';
        },
        error: (err) => {
            console.log(err);
        }
    });
});



