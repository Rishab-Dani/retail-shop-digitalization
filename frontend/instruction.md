🧩 Step-by-Step: Continue Your Existing GitHub Project on New PC
1️⃣ Install & Configure Git (One Time)

First, make sure Git is installed:

git --version


If not installed, download Git for Windows.

Then set your identity (important for commits):

git config --global user.name "Ravivarma"
git config --global user.email "your-email@example.com"

2️⃣ Clone Your Repository (First Real Step)

Go to the folder where you want your project:

cd D:\Projects


Clone your repo:

git clone https://github.com/USERNAME/REPO_NAME.git


Example:

git clone https://github.com/ravivarma/retail-digital-store.git


➡️ This downloads all branches + full history

3️⃣ Go Into Project Folder
cd retail-digital-store


Check branches:

git branch -a

4️⃣ Checkout Your Frontend Branch

Since you said your latest work is in frontend branch:

git checkout frontend


If it doesn’t exist locally yet:

git checkout -b frontend origin/frontend

5️⃣ Pull Latest Changes (Always Do This First)
git pull origin frontend


Now your PC has exactly your latest frontend code ✅

From Now On — Daily Workflow (Push / PR / Pull)
🔁 Before You Start Coding (VERY Important)

Always:

git pull origin frontend

💻 After You Make Changes

Check what changed:

git status


Stage files:

git add .


Commit:

git commit -m "Add checkout flow UI and bug fixes"


Push to your branch:

git push origin frontend


🔀 Creating PR (Frontend → Main/Develop)

On GitHub website:

Go to your repo

Click Compare & Pull Request

Base = main (or develop)

Compare = frontend

Create PR