---
title: "PicoCTF: Quantum Scrambler Solution"
description: "A step-by-step solution for the PicoCTF Quantum Scrambler challenge."
date: Mar 21, 2025
image:
  path: /assets/img/thumbnails/ctf.png
categories: [Cybersecurity, CTF]
tags: [picoctf, reversing]
---

Today, we're diving into the picoCTF challenge: `Quantum Scrambler` 2025. Let's break it down step by step.

![alt text](/assets/img/posts/ctf/picoctf-quantum-scrambler/ctf-image.png)

## 📊 Challenge Overview

The provided Python script reads the contents of a flag.txt file, where each hex value is converted into a corresponding character to reveal the flag.

## 🔑 Solution

To obtain the `flag.txt` file, you need to connect to the server using netcat with the following command:

```bash
nc verbal-sleep.picoctf.net 53222 > flag.txt
```

Once you've saved the flag.txt, the process to decode the flag is quite simple. The hint suggests using `eval()` to convert the flag into a list of strings. Once the list is converted, a second hint directs you to focus only on the outer list, which can be achieved through the function `extract_outer_list()`.

```python
def extract_outer_list(array):
  return [item for inner in array for item in inner if isinstance(item, str)]

def get_flag():
  flag = []
  with open('flag.txt', 'r') as file:
    flag = file.read()
  
  list_string = eval(flag)
  flag = extract_outer_list(list_string)

  hex_flag = []
  for c in flag:
    hex_flag.append(chr(int(c, 16)))

  return hex_flag

def main():
  flag = get_flag()
  print(''.join(flag))
```

```bash
 python quantum_scrambler.py
```

## 🚩 Flag Capture

```plaintext
picoCTF{python_is_weird9ece5f24}
```