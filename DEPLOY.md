
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
6.  **Region**: Choose one close to your users (e.g., `us-central1` or `us-east1`).
7.  **Authentication**: Select **"Allow unauthenticated invocations"** (so the public can visit your site).
8.  **Environment Variables**:
    -   Expand "Container, Networking, Security".
    -   Click **"Variables & Secrets"**.
    -   Add your `GEMINI_API_KEY` and `RESEND_API_KEY` here.
9.  Click **Create**.

## Step 4: Adding Your Custom Domain (Optional)
If you have a domain (e.g., `validate.justshift.it`):
1.  Go to **Cloud Run > Manage Custom Domains**.
2.  Click **Add Mapping**.
3.  Select your service and follow the DNS instructions.

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
