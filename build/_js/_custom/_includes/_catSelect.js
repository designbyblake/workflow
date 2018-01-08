var catSelect = {
    select: null,
    init: function() {
        this.select = $('#selectCategory');
        this.select.on('change', function() {
            window.location = $(this).val() + '/';
        })
    },
}
catSelect.init();
module.exports = catSelect;