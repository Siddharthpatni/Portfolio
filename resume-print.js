/**
 * Resume Print Functionality
 * Handles print/PDF download for the resume section
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {
    // Get the print button
    const printButton = document.getElementById('resume-print-btn');

    if (printButton) {
        printButton.addEventListener('click', function () {
            // Trigger browser print dialog
            window.print();
        });
    }

    // Smooth scroll to resume section when clicking resume nav link
    const resumeNavLink = document.querySelector('a[href="#resume"]');

    if (resumeNavLink) {
        resumeNavLink.addEventListener('click', function (e) {
            e.preventDefault();
            const resumeSection = document.getElementById('resume');

            if (resumeSection) {
                resumeSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                // Update URL hash without jumping
                history.pushState(null, null, '#resume');
            }
        });
    }

    // Optional: Add print before/after events for additional control
    window.addEventListener('beforeprint', function () {
        console.log('Preparing to print resume...');
        // You can add any pre-print preparation here
    });

    window.addEventListener('afterprint', function () {
        console.log('Print dialog closed');
        // You can add any post-print cleanup here
    });
});
