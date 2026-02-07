---
title: "Granting Tomcat 9 Access to External Files"
description: "A guide to configuring Tomcat 9 for access to files outside its default directory."
date: August 08, 2020
image:
  path: /assets/img/thumbnails/linux.png
categories: [Ops, Linux]
tags: [tomcat]
---

## Granting Tomcat 9 Access to External Files

Sometimes, you may need Tomcat 9 to access files located in different directories on your Linux system. This requires adjusting file and directory permissions on the Linux side without modifying Tomcat’s internal configuration.

## Steps to Grant Access

1. Create a user group and add Tomcat to it

First, create a group named webserver and add the Tomcat 9 user to this group:

```bash
sudo groupadd webserver

sudo usermod -a -G webserver tomcat9
```

2. Change group ownership of the required files

Update the group ownership of the file that Tomcat needs to access:

```bash
sudo chgrp webserver configuration.yaml
```

Grant read and write permissions to the webserver group:

```bash
sudo chmod g=rw configuration.yaml
```

3. Restart Tomcat to apply changes

```bash
sudo systemctl restart tomcat9
```

4. Update group ownership and permissions for directories

If tomcats needs access to entire directories, update their group ownership and permissions:

```bash
sudo chgrp webserver /opt/internal/data/

sudo chgrp webserver /opt/internal/
```

Grant read, write, and execute permissions to the webserver group:

```bash
sudo chmod g=rwx /opt/internal/data/

sudo chmod g=rwx /opt/internal/
```

Following these steps will ensure Tomcat 9 has the necessary permissions to access files and directories as required.