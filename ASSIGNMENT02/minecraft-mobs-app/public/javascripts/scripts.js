// Deletion confirmation box
function deleteConfirmation() {
    return confirm("Are you sure you want to delete this mob?");
}

// Look for the summon button and add a click event listener
document.addEventListener('DOMContentLoaded', function () {
    var clipboard = new ClipboardJS('.summon-button', {
        text: function(trigger) {
        return trigger.getAttribute('data-command');
        }
    });

    // Alert the user if the command was copied successfully or failed
    clipboard.on('success', function(e) {
        alert('Summon command copied to clipboard!');
        e.clearSelection();
    });

    clipboard.on('error', function(e) {
        alert('Failed to copy summon command');
    });
});