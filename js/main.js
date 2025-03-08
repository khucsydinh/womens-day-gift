document.addEventListener('DOMContentLoaded', function() {
    const content = document.getElementById('content');
    const openButton = document.getElementById('openButton');
    const giftItems = document.querySelectorAll('.gift-item');
    let selectedCount = 0;
    const MAX_SELECTIONS = 2;
    let selectedOptions = [];

    openButton.addEventListener('click', function() {
        content.style.display = 'block';
        openButton.style.display = 'none';
    });

    giftItems.forEach(item => {
        item.addEventListener('click', function() {
            if (!this.classList.contains('revealed')) {
                if (selectedCount < MAX_SELECTIONS) {
                    const originalText = this.textContent;
                    const newText = this.getAttribute('data-text');
                    this.textContent = newText;
                    this.classList.add('revealed');
                    selectedCount++;
                    
                    // Store selected option
                    selectedOptions.push(newText);

                    // Disable other buttons if max selections reached
                    if (selectedCount >= MAX_SELECTIONS) {
                        giftItems.forEach(btn => {
                            if (!btn.classList.contains('revealed')) {
                                btn.disabled = true;
                                btn.classList.add('disabled');
                            }
                        });
                        
                        // Send email when 2 options are selected
                        sendEmail(selectedOptions);
                    }
                }
            }
        });
    });

    function sendEmail(options) {
        fetch('/send-choices', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ choices: options })
        })
        .then(response => response.text())
        .then(result => {
            console.log('Email sent:', result);
            alert('Your choices have been sent!');
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to send choices');
        });
    }
});