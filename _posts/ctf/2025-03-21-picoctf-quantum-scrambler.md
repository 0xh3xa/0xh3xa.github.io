---
title: "picoCTF: Quantum Scrambler – Walkthrough"
header:
  teaser: /assets/images/thumbnail/ctf-thumbnail.png
excerpt: "Solution for picoCTF: Quantum Scrambler"
categories:
    - CTF
tags:
    - picoctf
toc: true
toc_sticky: true
ribbon: DodgerBlue
toc_label: "Content"
date: Mar 21, 2025
---

Today, we're diving into the picoCTF challenge: `Quantum Scrambler`. Let's break it down step by step.

![alt text](/assets/images/posts/ctf/picoctf-quantum-scrambler/ctf-image.png)

### Understanding the Source Code and Solution

The provided Python script reads the contents of a flag.txt file, where each hex value is converted into a corresponding character to reveal the flag.

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
    hex_flag.append([chr(int(c, 16))])

  return hex_flag

def main():
  flag = get_flag()
  filtered_text = extract_outer_list(flag)
  print(''.join(filtered_text))

if __name__ == '__main__':
  main()
```

```bash
 python quantum_scrambler.py
```

, output

```text
picoCTF{python_is_weird9ece5f24}
```