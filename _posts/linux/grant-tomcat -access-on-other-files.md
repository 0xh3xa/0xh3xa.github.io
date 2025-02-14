---
title: "How to grant Tomcat 9 access on other files"
classes: wide
header:
  teaser: /assets/images/thumbnail/post-thumbnail.jpg
categories:
    - Linux
tags:
    - Tomcat
    - Configuration
toc: true
toc_label: "Content"
date: August 08, 2020
---

## How to grant Tomcat 9 access on other files

Sometime you will need to access files from the tomcat either the in the same directory or other directories. This need to configure from Linux side without any configuration to the Tomcat 

#### Steps

Add the tomcat to a group and grant this group to the required access to that files, by creating a group called `webserver`. Then restart tomcat and try again

```sh
sudo groupadd webserver
```

```sh
sudo usermod -a -G webserver tomcat9
```

```sh
sudo chgrp webserver configuration.yaml
```

```sh
sudo chmod g=rw configuration.yaml
```

```sh
sudo systemctl restart tomcat9
```

, Update the group ownership of the directories add permission to the group

```sh
sudo chgrp webserver /opt/internal/data/
```

```sh
sudo chgrp webserver /opt/internal/
```

```sh
sudo chmod g=rwx /opt/internal/data/
```

```sh
sudo chmod g=rwx /opt/internal/
```