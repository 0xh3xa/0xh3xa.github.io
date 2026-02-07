---
title: "Scheduling a GitHub Action to Run at Midnight on Branch Changes"
Description: "Guide to configuring a GitHub Action scheduler for midnight execution on branch changes."
date: February 14, 2025
image:
  path: /assets/img/thumbnails/github-action.png
categories: [Ops, DevOps]
tags: [gitHub_actions]
---

Setting up a GitHub Action to run every midnight upon branch changes can be highly beneficial for your team's deployment process. GitHub offers a variety of trigger events such as when a pull request is opened, merged, or closed-as well as a scheduling option that lets you specify the exact time using cron syntax.

## What is GitHub Action?
GitHub Actions is an integrated automation tool in GitHub that lets you create custom workflows to build, test, and deploy your code. By defining workflows in YAML files within your repository, you can trigger these actions based on events (like pushes, pull requests, or issues) or schedules, allowing you to automate repetitive tasks and streamline your development process. For more information https://docs.github.com/en/actions

## How to use scheduler?

If you're looking to use the scheduler in GitHub Actions, you can start with this basic example that runs every midnight. The cron expression here specifies that it triggers at 00:00 (midnight) UTC daily.

```bash
name: Midnight Scheduler

on:
  schedule:
    - cron: '0 0 * * *'

jobs:
  run-at-midnight:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v3

      - name: Run scheduled task
        run: echo "This job runs every midnight!"

```

# How can you configure it to trigger only when there are changes?

To verify if changes have occurred, add the following condition. It checks for any commits made in the past 24 hours relative to the last deployment:

{% raw %}
```bash
test -z "$(git rev-list --after="24 hours" ${{ github.sha }})"
```
{% endraw %}

As an example, here's a GitHub Action that runs every midnight (UTC). It checks for any commits made in the last 24 hours, and if new changes are found, the code-build job will be triggered.

{% raw %}
```yaml
name: Deploy to production

on:
  schedule:
    - cron: "0 0 * * *"

jobs:
  check-changes:
    runs-on: ubuntu-latest
    outputs:
      should_deploy: ${{ steps.check-changes.outputs.should_deploy }}
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4
        with:
          ref: 'master'
          fetch-depth: 2

      - name: Check for changes since last commit
        id: check-changes
        run: |
          if [[ "${{ github.event_name }}" == "schedule" ]]; then
            if test -z "$(git rev-list --after="24 hours" ${{ github.sha }})"; then
              echo "should_deploy=false" >> $GITHUB_ENV
              echo "should_deploy=false" >> $GITHUB_OUTPUT
            else
              echo "should_deploy=true" >> $GITHUB_ENV
              echo "should_deploy=true" >> $GITHUB_OUTPUT
            fi
          fi

  code-build:
    runs-on: ubuntu-latest
    if: ${{ needs.determine-branch.outputs.should_deploy == 'true' && success() }}
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4
        with:
          ref: 'master'

      - name: Install Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 16

      - name: Build backend
        run: |
          npm ci
          npm run build
```
{% endraw %}