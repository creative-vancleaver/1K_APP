document.addEventListener('DOMContentLoaded', function () {

    const selectAllCheckbox = document.querySelector('.select-all-checkbox');
    const itemCheckboxes = document.querySelectorAll('input[name$="-DELETE"]');

    selectAllCheckbox.addEventListener('change', function () {
        
        const isChecked = this.checked;
        itemCheckboxes.forEach(function (checkbox) {
            checkbox.checked = isChecked;
        });
    });
});