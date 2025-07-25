# Daily Repository Activity Automation

🤖 **Complete automated solution for maintaining daily GitHub repository activity**

This repository contains everything you need to automatically keep your GitHub repository active with daily commits. Just copy this entire repository structure to your GitHub repo and it will start working immediately!

## 📋 What's Included

This complete package contains:
- ✅ **GitHub Actions workflow** (`.github/workflows/daily-commit.yml`)
- ✅ **Complete documentation** (this README)
- ✅ **Setup script** for easy installation
- ✅ **Log management system** (auto-creates `logs/` directory)

## 🚀 Quick Setup (Copy & Paste Ready)

### Method 1: Complete Repository Copy
1. **Download or clone this entire repository**
2. **Copy all files** to your target GitHub repository
3. **Commit and push** to your repository
4. **Done!** The workflow activates automatically

### Method 2: Manual File Copy
If you prefer to copy files individually:

1. **Copy the workflow file:**
   - Copy `.github/workflows/daily-commit.yml` to your repo
   
2. **Copy this README.md** (optional but recommended)

3. **Commit and push** the files

4. **Verify permissions** (see below)

## ⚙️ Permission Setup

After copying the files, ensure your repository has the right permissions:

1. Go to your repository **Settings** → **Actions** → **General**
2. Under "Workflow permissions":
   - Select **"Read and write permissions"**
   - Check **"Allow GitHub Actions to create and approve pull requests"**
3. **Save** the changes

## 🧪 Testing Your Setup

Test that everything works:

1. Go to your repository's **Actions** tab
2. Find **"Daily Repository Activity"** workflow
3. Click **"Run workflow"** button
4. Select your branch and click **"Run workflow"**
5. Watch it run successfully!

## 📊 What Happens Daily

Every day at 7:30 AM IST (Indian Standard Time), the workflow automatically:

1. **Wakes up** and checks out your repository
2. **Calculates streak** - counts consecutive days of commits
3. **Creates/updates** log files with current timestamp in IST and day count
4. **Commits** the changes with streak info in the message
5. **Pushes** to keep your repository active
6. **Reports** success in the Actions tab

## 🔥 Streak Tracking Features

Your automation now includes smart streak counting:
- **Daily counter**: Each commit shows which day number it is (Day 1, Day 2, etc.)
- **Streak detection**: Automatically detects if you missed a day and resets the count
- **Streak info**: Shows when your current streak started
- **Commit messages**: Include streak info like "Daily activity update (Day 15)"

## 📁 Files Created

The workflow creates and maintains:
- `logs/daily-activity.log` - Running log of all daily activities with streak info
- `logs/last-update.txt` - Most recent update timestamp and current streak
- `logs/streak-count.txt` - Current consecutive day count
- `logs/streak-info.txt` - Streak start date and details

## 🛠️ Customization Options

### Change the Schedule
Edit the cron time in `.github/workflows/daily-commit.yml`:
```yaml
schedule:
  - cron: '0 2 * * *'  # 7:30 AM IST daily (2:00 AM UTC)
```

Common alternatives for IST:
- `'0 6 * * *'` - 11:30 AM IST daily
- `'30 18 * * *'` - 12:00 AM IST daily (midnight)
- `'30 0 * * 1-5'` - 6:00 AM IST on weekdays only

### Change Commit Messages
Modify the commit message in the workflow file:
```yaml
git commit -m "🤖 Daily activity update - $TIMESTAMP"
```

### Change Log Location
Update the directory path in the workflow:
```bash
mkdir -p logs  # Change "logs" to your preferred directory
```

## 🔍 Monitoring & Troubleshooting

### Check if it's working:
- **Actions tab**: See workflow runs and their status
- **Commits**: Look for daily automated commits
- **Logs directory**: Check for updated files

### Common issues:
- **No commits appearing**: Check repository permissions
- **Workflow failing**: Review the Actions tab for error details
- **Wrong timezone**: Adjust the cron schedule

## 📈 Benefits

- ✅ **Zero maintenance** - Fully automated
- ✅ **Minimal footprint** - Only adds timestamp entries
- ✅ **Reliable** - Uses GitHub's built-in infrastructure
- ✅ **Customizable** - Easy to modify schedule and behavior
- ✅ **Transparent** - All activity visible in Actions tab

## 💡 Pro Tips

- The workflow creates all necessary directories automatically
- Manual triggers are available for testing anytime
- All changes are minimal to avoid repository bloat
- Works with both public and private repositories
- No external dependencies or API keys needed

---

**Ready to use!** Just copy this repository structure to your GitHub repo and enjoy automated daily activity! 🎉
