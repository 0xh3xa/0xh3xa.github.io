---
title: "Accessing a GCP Compute Engine Instance After MFA Lockout"
description: "Steps to regain access to a Compute Engine instance when locked out due to MFA issues."
date: March 19, 2025
image:
  path: /assets/img/thumbnails/cloud.png
categories: [Ops, Cloud]
tags: [gcp, ssh, mfa, troubleshooting]
---


# Introduction

Multi-Factor Authentication (MFA) enhances security, but in emergency situations, you might find yourself locked out of your Google Cloud Platform (GCP) Compute Engine instance. If you're unable to log in due to MFA issues, you can temporarily disable it using a startup script. This guide explains how to do that safely.


# Steps to Disable MFA and Regain Access

If your Compute Engine instance enforces MFA for SSH authentication, you can disable it by modifying the PAM configuration. Follow these steps:

1. Add the Startup Script

```bash
if grep -q "pam_google_authenticator.so" /etc/pam.d/sshd; then
    sudo sed -i '/pam_google_authenticator.so/s/^/#/' /etc/pam.d/sshd
fi

sudo sed -i 's/^ChallengeResponseAuthentication yes/ChallengeResponseAuthentication no/' /etc/ssh/sshd_config
sudo sed -i 's/^AuthenticationMethods publickey,keyboard-interactive/publickey/' /etc/ssh/sshd_config
sudo sed -i 's/^PasswordAuthentication no/PasswordAuthentication yes/' /etc/ssh/sshd_config

sudo systemctl restart sshd
```

2. Restart Your VM

Once the script is added, restart your Compute Engine instance:

1. Go to the GCP Console.

2. Navigate to Compute Engine > VM Instances.

3. Select the affected VM.

4. Click Stop, wait for it to shut down, and then click Start.

After the VM restarts, MFA will be disabled, allowing you to log in via SSH without being prompted for an authentication code.


# Re-enabling MFA After Login

Once you regain access, it is recommended to re-enable MFA to maintain security. You can do so by removing the comment (#) from the pam_google_authenticator.so line in /etc/pam.d/sshd and restarting the SSH service:

```bash
sudo sed -i '/#.*pam_google_authenticator.so/s/^#//' /etc/pam.d/sshd
sudo systemctl restart sshd
```

# Conclusion

This method provides a quick way to regain access to a GCP Compute Engine instance when MFA prevents login. However, MFA should only be disabled temporarily, and security best practices should be followed to minimize risks.

For more troubleshooting tips, check the GCP documentation or reach out to Google Cloud Support.