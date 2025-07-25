// Dashboard JavaScript for GitHub Pages
class StreakDashboard {
    constructor() {
        this.data = {
            currentStreak: 0,
            totalCommits: 0,
            longestStreak: 0,
            successRate: 0,
            activityData: [],
            lastUpdate: null
        };
        this.init();
    }

    async init() {
        try {
            await this.loadData();
            this.renderStats();
            this.renderHeatmap();
            this.renderStreakChart();
            this.renderRecentActivity();
            this.renderMilestones();
            this.startAutoRefresh();
        } catch (error) {
            console.error('Failed to initialize dashboard:', error);
            this.showError();
        }
    }

    async loadData() {
        try {
            // Get repository info from current URL
            const repoInfo = this.getRepoInfo();
            
            // Load data from log files via GitHub API
            const streakData = await this.fetchFile('logs/streak-count.txt');
            const activityData = await this.fetchFile('logs/daily-activity.log');
            const lastUpdateData = await this.fetchFile('logs/last-update.txt');
            
            this.parseData(streakData, activityData, lastUpdateData);
        } catch (error) {
            console.error('Error loading data:', error);
            // Use demo data for development/testing
            this.loadDemoData();
        }
    }

    getRepoInfo() {
        // Extract repository information from GitHub Pages URL
        const hostname = window.location.hostname;
        const pathname = window.location.pathname;
        
        if (hostname.includes('github.io')) {
            const parts = hostname.split('.');
            const username = parts[0];
            const repoName = pathname.split('/')[1] || hostname.split('.')[0];
            return { username, repoName };
        }
        
        return { username: 'demo', repoName: 'demo' };
    }

    async fetchFile(path) {
        // Check if we're running locally (Replit) or on GitHub Pages
        const isLocal = window.location.hostname === 'localhost' || 
                       window.location.hostname.includes('replit') ||
                       window.location.port !== '';
        
        if (isLocal) {
            // Use local API endpoints for Replit
            const apiMap = {
                'logs/streak-count.txt': '/api/streak-count',
                'logs/daily-activity.log': '/api/activity-log',
                'logs/last-update.txt': '/api/last-update',
                'logs/streak-info.txt': '/api/streak-info'
            };
            
            const apiEndpoint = apiMap[path];
            if (apiEndpoint) {
                const response = await fetch(apiEndpoint);
                if (!response.ok) {
                    throw new Error(`Failed to fetch ${path}`);
                }
                return await response.text();
            }
        } else {
            // Use GitHub API for GitHub Pages
            const repoInfo = this.getRepoInfo();
            const url = `https://api.github.com/repos/${repoInfo.username}/${repoInfo.repoName}/contents/${path}`;
            
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Failed to fetch ${path}`);
            }
            
            const data = await response.json();
            return atob(data.content); // Decode base64 content
        }
        
        throw new Error(`Unknown file path: ${path}`);
    }

    parseData(streakData, activityData, lastUpdateData) {
        // Parse current streak
        this.data.currentStreak = parseInt(streakData.trim()) || 0;
        
        // Parse activity log
        const activityLines = activityData.trim().split('\n').filter(line => line.length > 0);
        this.data.totalCommits = activityLines.length;
        
        // Calculate longest streak and success rate
        this.calculateStreakStats(activityLines);
        
        // Parse last update
        const lastUpdateLines = lastUpdateData.trim().split('\n');
        this.data.lastUpdate = lastUpdateLines[0].replace('Last updated: ', '');
        
        // Generate activity data for charts
        this.generateActivityData(activityLines);
    }

    calculateStreakStats(activityLines) {
        let longestStreak = 0;
        let currentStreak = 0;
        let lastDate = null;
        
        const dates = activityLines.map(line => {
            const match = line.match(/(\d{4}-\d{2}-\d{2})/);
            return match ? match[1] : null;
        }).filter(date => date);
        
        dates.forEach(dateStr => {
            const date = new Date(dateStr);
            if (lastDate) {
                const diffDays = Math.floor((date - lastDate) / (1000 * 60 * 60 * 24));
                if (diffDays === 1) {
                    currentStreak++;
                } else {
                    longestStreak = Math.max(longestStreak, currentStreak);
                    currentStreak = 1;
                }
            } else {
                currentStreak = 1;
            }
            lastDate = date;
        });
        
        longestStreak = Math.max(longestStreak, currentStreak);
        this.data.longestStreak = longestStreak;
        
        // Calculate success rate (assuming target is daily commits)
        const daysSinceStart = dates.length > 0 ? 
            Math.floor((new Date() - new Date(dates[0])) / (1000 * 60 * 60 * 24)) + 1 : 1;
        this.data.successRate = Math.round((dates.length / daysSinceStart) * 100);
    }

    generateActivityData(activityLines) {
        const last90Days = [];
        const today = new Date();
        
        for (let i = 89; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(date.getDate() - i);
            const dateStr = date.toISOString().split('T')[0];
            
            const hasActivity = activityLines.some(line => line.includes(dateStr));
            last90Days.push({
                date: dateStr,
                activity: hasActivity ? 1 : 0,
                level: hasActivity ? Math.floor(Math.random() * 4) + 1 : 0
            });
        }
        
        this.data.activityData = last90Days;
    }

    loadDemoData() {
        // Demo data for development/testing
        this.data = {
            currentStreak: 15,
            totalCommits: 42,
            longestStreak: 23,
            successRate: 89,
            lastUpdate: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) + ' IST',
            activityData: []
        };
        
        // Generate demo activity data
        this.generateDemoActivity();
    }

    generateDemoActivity() {
        const last90Days = [];
        const today = new Date();
        
        for (let i = 89; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(date.getDate() - i);
            const dateStr = date.toISOString().split('T')[0];
            
            // Random activity with higher probability for recent days
            const activityChance = Math.random() > (i / 120);
            last90Days.push({
                date: dateStr,
                activity: activityChance ? 1 : 0,
                level: activityChance ? Math.floor(Math.random() * 4) + 1 : 0
            });
        }
        
        this.data.activityData = last90Days;
    }

    renderStats() {
        document.getElementById('current-streak').textContent = this.data.currentStreak + ' days';
        document.getElementById('total-commits').textContent = this.data.totalCommits;
        document.getElementById('longest-streak').textContent = this.data.longestStreak + ' days';
        document.getElementById('success-rate').textContent = this.data.successRate + '%';
        document.getElementById('last-update').textContent = this.data.lastUpdate;
        
        // Add celebration animation for good streaks
        if (this.data.currentStreak >= 7) {
            document.querySelector('.current-streak').classList.add('streak-celebration');
        }
    }

    renderHeatmap() {
        const container = document.getElementById('activity-heatmap');
        container.innerHTML = '';
        
        this.data.activityData.forEach(day => {
            const dayElement = document.createElement('div');
            dayElement.className = `heatmap-day${day.level > 0 ? ' level-' + day.level : ''}`;
            dayElement.setAttribute('data-date', day.date);
            dayElement.title = `${day.date}: ${day.activity ? 'Active' : 'No activity'}`;
            container.appendChild(dayElement);
        });
    }

    renderStreakChart() {
        const ctx = document.getElementById('streak-chart').getContext('2d');
        
        // Destroy existing chart if it exists
        if (this.streakChart) {
            this.streakChart.destroy();
        }
        
        // Generate streak data for last 30 days
        const last30Days = this.data.activityData.slice(-30);
        const labels = last30Days.map(day => {
            const date = new Date(day.date);
            return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        });
        
        let streakData = [];
        let currentStreak = 0;
        
        last30Days.forEach(day => {
            if (day.activity) {
                currentStreak++;
            } else {
                currentStreak = 0;
            }
            streakData.push(currentStreak);
        });
        
        this.streakChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Daily Streak',
                    data: streakData,
                    borderColor: '#28a745',
                    backgroundColor: 'rgba(40, 167, 69, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: Math.max(...streakData) + 2,
                        ticks: {
                            stepSize: 1
                        }
                    },
                    x: {
                        ticks: {
                            maxTicksLimit: 10
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                },
                elements: {
                    point: {
                        radius: 4,
                        hoverRadius: 6
                    }
                }
            }
        });
    }

    renderRecentActivity() {
        const container = document.getElementById('activity-list');
        const recentActivities = this.data.activityData
            .filter(day => day.activity)
            .slice(-7)
            .reverse();
        
        if (recentActivities.length === 0) {
            container.innerHTML = '<p>No recent activity found.</p>';
            return;
        }
        
        container.innerHTML = recentActivities.map(day => `
            <div class="activity-item">
                <div class="activity-icon">✅</div>
                <div class="activity-content">
                    <h4>Daily commit completed</h4>
                    <p>${new Date(day.date).toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                    })}</p>
                </div>
            </div>
        `).join('');
    }

    renderMilestones() {
        const milestones = [
            { days: 7, icon: '🎯', text: '1 Week' },
            { days: 30, icon: '🏅', text: '1 Month' },
            { days: 100, icon: '💯', text: '100 Days' },
            { days: 365, icon: '🏆', text: '1 Year' }
        ];
        
        const container = document.getElementById('milestones-list');
        container.innerHTML = milestones.map(milestone => {
            const achieved = this.data.longestStreak >= milestone.days;
            return `
                <div class="milestone ${achieved ? 'achieved' : 'pending'}">
                    <div class="milestone-icon">${milestone.icon}</div>
                    <div class="milestone-text">${milestone.text}</div>
                    <div>${achieved ? 'Achieved!' : `${milestone.days - this.data.currentStreak} days to go`}</div>
                </div>
            `;
        }).join('');
    }

    startAutoRefresh() {
        // Refresh data every 5 minutes
        setInterval(() => {
            this.loadData().then(() => {
                this.renderStats();
                this.renderRecentActivity();
            }).catch(error => {
                console.log('Auto-refresh failed:', error);
            });
        }, 5 * 60 * 1000);
    }

    showError() {
        document.body.innerHTML = `
            <div style="text-align: center; padding: 50px; font-family: Arial, sans-serif;">
                <h2>⚠️ Unable to load dashboard data</h2>
                <p>Make sure your repository has the daily commit workflow set up and running.</p>
                <p>The dashboard will show demo data for now.</p>
            </div>
        `;
        this.loadDemoData();
        setTimeout(() => this.init(), 1000);
    }
}

// Initialize dashboard when page loads
document.addEventListener('DOMContentLoaded', () => {
    new StreakDashboard();
});