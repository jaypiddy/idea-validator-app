
# ☁️ How to Deploy to Google Cloud Run

We have configured your project for **Google Cloud Run**, a serverless platform that automatically scales your containerized Next.js app.

## Prerequisites
- [ ] A Google Cloud Account (console.cloud.google.com)
- [ ] Your code pushed to a GitHub repository

---

## Step 1: Open Your Google Cloud Project
1.  Go to your project dashboard:
    > [**Link: gen-lang-client-0804834480 Console**](https://console.cloud.google.com/welcome?project=gen-lang-client-0804834480)
2.  **Enable Billing** for this project if you haven't already (Cloud Run requires it, even for the free tier).

## Step 2: Push Your Code to GitHub
Ensure your latest changes (including the new `Dockerfile` and `next.config.ts`) are pushed to your GitHub repository.

```bash
git add .
git commit -m "chore: configure for cloud run"
git push
```

## Step 3: Connect to Cloud Run (Continuous Deployment)
This is the easiest way to set up "Sync between Local and Cloud". Every time you push to GitHub, Google will rebuild and deploy your app.

1.  Go to **Cloud Run** in the Google Cloud Console.
2.  Click **Create Service**.
3.  **Source**: Select **"Continuously deploy new revisions from a source repository"**.
4.  **Click "Set up with Cloud Build"**.
    -   **Repository Provider**: GitHub.
    -   **Repository**: Select **`jaypiddy/idea-validator-app`** (you may need to click "Manage Connected Repositories" if it's not listed).
    -   **Branch**: `^main$` (or master).
    -   **Build Type**: Select **"Dockerfile"** (it should auto-detect the one we just made).
    -   Click **Save**.
5.  **Service Name**: `idea-validator-app`.
6.  **Region**: Choose one close to your users (e.g., `us-central1`).
7.  **Container Port**: Change `8080` to **`3000`** (Next.js default).
8.  **Authentication**: Select **"Allow unauthenticated invocations"**.
9.  **Environment Variables** (under "Variables & Secrets"):
    -   Click **"Add variable"** for each key:
    -   **Name**: `GEMINI_API_KEY` | **Value**: (Paste your key)
    -   **Name**: `RESEND_API_KEY` | **Value**: (Paste your key)
    -   **Name**: `RESEND_FROM_EMAIL` | **Value**: `Rapid MVP Validator <mvp.validator@mailupdates.powershifter.com>`
10. Click **Create**.

## Step 4: Adding Your Custom Domain
To map `rapidmvp.powershifter.com` to your Cloud Run service:

1.  Go to the [Google Cloud Run Console](https://console.cloud.google.com/run).
2.  Click **Manage Custom Domains** (top bar).
3.  Click **Add Mapping**.
4.  Select your service: `idea-validator-app`.
5.  Select **"Verify a new domain"** (or select `powershifter.com` if already there).
6.  Enter the subdomain: `rapidmvp.powershifter.com`.
7.  Click **Continue**.
8.  **Copy the DNS record** Google provides (it will be a Type `CNAME` or `A`, and a Value like `ghs.googlehosted.com`).
9.  Go to your DNS Provider (AWS Route 53) and add that record.

## 🔄 How to Sync (Updates)
Since we set up **Continuous Deployment**, "syncing" is now just `git push`.

1.  Make changes locally.
2.  `git add .`
3.  `git commit -m "update feature"`
4.  `git push`

Google Cloud Build will detect the push, build the Docker container, and rollout the new version automatically (usually takes 2-3 minutes).

---

> [!TIP]
> **Troubleshooting**: If a build fails, check the "Cloud Build" history in the Google Cloud Console to see the error logs.
