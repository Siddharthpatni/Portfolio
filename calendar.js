// ==========================================
// AVAILABILITY CALENDAR - GITHUB STYLE
// ==========================================
class AvailabilityCalendar {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container) {
            console.error('Calendar container not found:', containerId);
            return;
        }

        // Add the availability-section class to the container
        this.container.classList.add('availability-section');

        this.currentDate = new Date();
        this.weeks = 12; // Show 12 weeks (84 days)
        this.availability = this.generateAvailability();
        this.render();

        console.log('Calendar initialized successfully');
    }

    generateAvailability() {
        const availability = {};
        const today = new Date();

        // Generate random availability pattern for demo
        // In production, this would come from your calendar API
        for (let i = -30; i < 84; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() + i);
            const dateStr = this.formatDate(date);

            const dayOfWeek = date.getDay();
            const randomFactor = Math.random();

            // Generate more realistic availability pattern
            if (dayOfWeek >= 1 && dayOfWeek <= 5) {
                // Weekdays - mostly high availability
                if (randomFactor > 0.8) {
                    availability[dateStr] = 2; // Partial
                } else if (randomFactor > 0.1) {
                    availability[dateStr] = 4; // Fully available
                } else {
                    availability[dateStr] = 3; // Available
                }
            } else {
                // Weekends - varied availability
                if (randomFactor > 0.6) {
                    availability[dateStr] = 2; // Partial
                } else if (randomFactor > 0.3) {
                    availability[dateStr] = 3; // Available
                } else {
                    availability[dateStr] = 1; // Limited
                }
            }
        }

        return availability;
    }

    formatDate(date) {
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    }

    getWeekNumber(date) {
        const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
        const dayNum = d.getUTCDay() || 7;
        d.setUTCDate(d.getUTCDate() + 4 - dayNum);
        const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
        return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
    }

    render() {
        const today = new Date();
        const startDate = new Date(today);
        startDate.setDate(today.getDate() - 84); // Start 12 weeks ago

        const months = [];
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        // Calculate stats
        let totalDays = 0;
        let availableDays = 0;
        let currentStreak = 0;
        let longestStreak = 0;
        let tempStreak = 0;

        Object.values(this.availability).forEach((level, index) => {
            if (level > 0) {
                totalDays++;
                if (level >= 3) availableDays++;

                tempStreak++;
                if (tempStreak > longestStreak) longestStreak = tempStreak;

                // Calculate current streak (from today backwards)
                const daysFromToday = Object.keys(this.availability).length - 1 - index;
                if (daysFromToday <= 0 && level >= 3) {
                    currentStreak++;
                }
            } else {
                tempStreak = 0;
            }
        });

        let html = `
            <div class="availability-content">
                <div class="availability-header">
                    <h3 class="availability-title">
                        <i class="fas fa-chart-line"></i>
                        Availability & Engagement
                    </h3>
                    <div class="availability-status">
                        <span class="status-dot"></span>
                        <span class="status-text">Open to Opportunities</span>
                    </div>
                </div>
                
                <div class="calendar-wrapper">
                    <div class="calendar-header">
                        <span class="calendar-month">${this.weeks} weeks of availability</span>
                    </div>
                    
                    <div class="calendar-graph">
        `;

        // Generate weeks (columns)
        for (let week = 0; week < this.weeks; week++) {
            html += '<div class="calendar-column">';

            // Day labels (only show for first column)
            if (week === 0) {
                const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
                dayLabels.forEach((label, i) => {
                    if (i % 2 === 1) { // Only show Mon, Wed, Fri
                        html += `<div class="calendar-day-label">${label}</div>`;
                    } else {
                        html += '<div class="calendar-day-label"></div>';
                    }
                });
            }

            // Generate days for this week
            for (let day = 0; day < 7; day++) {
                const date = new Date(startDate);
                date.setDate(startDate.getDate() + (week * 7) + day);
                const dateStr = this.formatDate(date);
                const level = this.availability[dateStr] || 0;
                const isToday = this.formatDate(today) === dateStr;

                const monthName = monthNames[date.getMonth()];
                const dayNum = date.getDate();

                html += `
                    <div class="calendar-square level-${level} ${isToday ? 'today' : ''}" 
                         data-date="${dateStr}"
                         data-level="${level}">
                        <div class="calendar-tooltip">
                            ${this.getLevelText(level)} on ${monthName} ${dayNum}
                        </div>
                    </div>
                `;
            }

            html += '</div>';
        }

        html += `
                    </div>
                    
                    <div class="calendar-legend">
                        <span class="legend-label">Less</span>
                        <div class="legend-scale">
                            <div class="legend-square level-0"></div>
                            <div class="legend-square level-1"></div>
                            <div class="legend-square level-2"></div>
                            <div class="legend-square level-3"></div>
                            <div class="legend-square level-4"></div>
                        </div>
                        <span class="legend-label">More</span>
                    </div>
                </div>
                
                <div class="availability-stats">
                    <div class="availability-stat">
                        <div class="stat-value">${availableDays}</div>
                        <div class="stat-label">Available Days</div>
                    </div>
                    <div class="availability-stat">
                        <div class="stat-value">${currentStreak}</div>
                        <div class="stat-label">Current Streak</div>
                    </div>
                    <div class="availability-stat">
                        <div class="stat-value">${longestStreak}</div>
                        <div class="stat-label">Longest Streak</div>
                    </div>
                    <div class="availability-stat">
                        <div class="stat-value">${Math.round((availableDays / totalDays) * 100)}%</div>
                        <div class="stat-label">Availability Rate</div>
                    </div>
                </div>
                
                <div class="availability-note">
                    <i class="fas fa-calendar-alt"></i>
                    <strong>Flexible scheduling available.</strong> My calendar adapts to important projects and collaborations. Let's find a time that works for both of us!
                </div>
            </div>
        `;

        this.container.innerHTML = html;
        console.log('Calendar rendered successfully');
    }

    getLevelText(level) {
        switch (level) {
            case 0: return 'Unavailable';
            case 1: return 'Limited availability';
            case 2: return 'Partially available';
            case 3: return 'Available';
            case 4: return 'Highly available';
            default: return 'No data';
        }
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing calendar...');
    const calendar = new AvailabilityCalendar('availability-calendar');
});
