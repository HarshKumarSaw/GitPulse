# GitPulse - Daily Commit Dashboard 🚀

A beautiful, automated GitHub Actions dashboard that tracks your coding consistency and builds lasting habits. Features real-time activity heatmaps, streak tracking, and colorful visualizations - all updating automatically for years without maintenance!

![Dashboard Preview](https://img.shields.io/badge/Dashboard-Live%20Demo-brightgreen)
![GitHub Actions](https://img.shields.io/badge/GitHub%20Actions-Automated-blue)
![Zero Maintenance](https://img.shields.io/badge/Maintenance-Zero-orange)

## ✨ Features

- 🎨 **Beautiful Dashboard**: Colorful gradients, smooth animations, mobile-responsive design
- 📊 **Activity Heatmap**: 90-day GitHub-style contribution graph with proper color coding
- 🔥 **Streak Tracking**: Current streak, best streak, total commits, and success rate
- 🤖 **Fully Automated**: Daily commits at 2:00 AM UTC + automatic dashboard updates
- 🌐 **GitHub Pages Ready**: Zero-config deployment with intelligent data loading
- 📱 **Mobile Optimized**: Responsive design that works perfectly on all devices
- 🛠️ **Self-Healing**: Error recovery, data validation, and automatic maintenance
- ⚡ **Lightning Fast**: Loads in milliseconds with optimized performance

## 🚀 Quick Deploy (2 minutes)

### 1. Repository Setup
```bash
# Clone or fork this repository
git clone [your-repo-url]
cd [your-repo-name]
```

### 2. Enable GitHub Pages
1. Go to **Settings** → **Pages**
2. Set **Source** to "**GitHub Actions**"
3. Save changes

### 3. Configure Permissions
1. Go to **Settings** → **Actions** → **General**
2. Select "**Read and write permissions**"
3. Enable "**Allow GitHub Actions to create and approve pull requests**"
4. Save changes

### 4. Deploy!
```bash
git push origin main
```

**That's it!** Your dashboard will be live at: `https://[username].github.io/[repository-name]`

## 📊 Dashboard Features

### Statistics Cards
- **Current Streak**: Orange gradient with fire animation
- **Total Commits**: Green gradient with growth animation  
- **Best Streak**: Purple gradient with achievement animation
- **Success Rate**: Pink gradient with percentage display

### Activity Heatmap
- **90 days** on desktop, **42 days** on mobile
- **GitHub-style** green color progression (Less → More)
- **Hover effects** with date and activity details
- **Responsive grid** that adapts to screen size

### Real-time Updates
- **Live data** from GitHub Actions automation
- **Smart loading** detects GitHub Pages vs local development
- **Fallback system** ensures dashboard always works
- **Error handling** with graceful degradation

## 🔧 Technical Architecture

### Frontend
- **Pure JavaScript**: No frameworks, lightning-fast performance
- **CSS Grid/Flexbox**: Modern responsive layout
- **SVG Graphics**: Crisp icons and visual elements
- **Progressive Enhancement**: Works without JavaScript

### Backend
- **GitHub Actions**: Enterprise-grade automation platform
- **File-based Storage**: Simple, reliable data persistence
- **Git History**: Complete audit trail and backup system
- **Python Server**: Local development environment

### Data Flow
1. **Daily Trigger**: GitHub Actions cron job (2:00 AM UTC)
2. **Update Logs**: Append timestamps and update counters
3. **Git Commit**: Atomic commit with retry logic
4. **Deploy Pages**: Automatic deployment to GitHub Pages
5. **Dashboard Update**: Real-time data loading and display

## 🛡️ Long-term Reliability

### Zero-Maintenance Design
- **Self-healing**: Automatic error recovery and data validation
- **Size management**: Log rotation prevents repository bloat
- **Timeout protection**: Prevents hanging workflows
- **Retry logic**: Handles temporary failures gracefully

### Expected Longevity
- **5+ years**: Built on GitHub's stable infrastructure
- **Minimal resources**: Uses <3% of free GitHub Actions quota
- **No dependencies**: Pure web standards, no external APIs
- **Future-proof**: Versioned actions and stable APIs

### Monitoring Built-in
- **Workflow status**: Visible in GitHub Actions tab
- **Live dashboard**: Real-time health indicators
- **Email alerts**: Optional failure notifications
- **Git history**: Complete activity audit trail

## 📁 Project Structure

```
├── index.html              # Dashboard homepage
├── dashboard.css           # Responsive styles and animations
├── dashboard.js            # Interactive dashboard logic
├── server.py              # Local development server
├── .github/workflows/
│   └── daily-commit.yml   # Automation workflow
├── logs/                  # Activity data (auto-created)
│   ├── daily-activity.log # Cumulative activity record
│   ├── streak-count.txt   # Current streak counter
│   └── last-update.txt    # Latest update timestamp
└── docs/                  # Setup and maintenance guides
```

## 🎨 Customization

### Colors and Themes
Edit `dashboard.css` to customize:
- Gradient colors for stat cards
- Heatmap color schemes
- Animation effects and timings
- Mobile responsiveness breakpoints

### Workflow Schedule
Edit `.github/workflows/daily-commit.yml`:
```yaml
on:
  schedule:
    - cron: '0 2 * * *'  # Change time here (UTC)
```

### Dashboard Content
Edit `index.html` to modify:
- Page title and branding
- Stat card labels and icons
- Footer content and links

## 🔍 Troubleshooting

### Dashboard Not Loading Data
1. Check GitHub Pages is enabled with "GitHub Actions" source
2. Verify workflow permissions are "Read and write"
3. Look for errors in the Actions tab

### Workflow Failing
1. Check workflow permissions in repository settings
2. Ensure main branch protection isn't blocking commits
3. Review error logs in Actions tab for specific issues

### Local Development
```bash
python server.py
# Dashboard available at http://localhost:5000
```

## 📜 License

Open source project available under standard licensing terms.

---

<div align="center">

**🎯 Set it up once, enjoy forever!**

*Built with ❤️ for developers who love consistency*

[![Deploy to GitHub Pages](https://img.shields.io/badge/Deploy-GitHub%20Pages-blue?style=for-the-badge)](https://docs.github.com/en/pages)

</div>