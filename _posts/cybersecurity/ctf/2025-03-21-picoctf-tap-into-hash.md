---
title: "PicoCTF: Tap into Hash"
description: "A step-by-step solution for the PicoCTF Tap into Hash challenge."
date: Mar 21, 2025
image:
  path: /assets/img/thumbnails/ctf.png
categories: [Cybersecurity, CTF]
tags: [picoctf, reversing]
---

Today, we're diving into the picoCTF challenge: `Tap into Hash` 2025. Let's break it down step by step and decrypt the given ciphertext.

![alt text](/assets/img/posts/ctf/picoctf-tap-into-hash/ctf-image.png)


## 📊 Challenge Overview

The provided Python script accepts an argument and runs a main function that displays the encrypted string. Before writing a decryption function, let's first analyze how the encryption process works.

## 🔑 Solution

### Breaking Down the Encryption Function

The encrypt function takes three parameters:

1. `plaintext`: The original message
2. `inner_txt`: A string inserted in between
3. `key`: The encryption key

### Encryption Process

  1. Splitting the Plaintext: the function finds the midpoint of plaintext, splits it into first and second, then inserts `inner_txt` in between.

  2. Padding the Text: the modified plaintext is processed in 16-byte blocks. If it's shorter, padding is added.

  3. Hashing the Key: the key is hashed using SHA-256 to ensure a fixed length.

  4. XOR Encryption: the function iterates over the plaintext in 16-byte blocks and XORs each block with `key_hash`.
  
  5. The result is stored in ciphertext.


```python
def encrypt(plaintext, inner_txt, key):
    midpoint = len(plaintext) // 2

    first_part = plaintext[:midpoint]
    second_part = plaintext[midpoint:]
    modified_plaintext = first_part + inner_txt + second_part
    block_size = 16
    plaintext = pad(modified_plaintext, block_size)
    key_hash = hashlib.sha256(key).digest()

    ciphertext = b''

    for i in range(0, len(plaintext), block_size):
        block = plaintext[i:i + block_size]
        cipher_block = xor_bytes(block, key_hash)
        ciphertext += cipher_block

    return ciphertext
```

### Decrypt function

Since the encryption method is XOR-based, decryption is straightforward:

- XOR the encrypted string with the same key → This will recover the plaintext.

```python
import ast
import re

def decrypt(plaintext, key):
    block_size = 16
    key_hash = hashlib.sha256(key).digest()

    ciphertext = b''

    for i in range(0, len(plaintext), block_size):
        block = plaintext[i:i + block_size]
        cipher_block = xor_bytes(block, key_hash)
        ciphertext += cipher_block

    return ciphertext
    
def main(token):

    with open(token, "r") as file:
        data = {}
        for line in file:
            if ":" in line:
                key, value = line.split(":", 1)
                key = key.strip()
                value = value.strip()
                try:
                    data[key] = ast.literal_eval(value)
                except (SyntaxError, ValueError):
                    data[key] = value

    plain_text = decrypt(data['Encrypted Blockchain'], data['Key'])

    pattern = r"picoCTF\{.*?\}"

    match = re.search(pattern, str(plain_text))
    if match:
        print(match.group())
    else:
        print("No picoCTF flag found.")
```

```bash
 python block_chain.py enc_flag
```

## 🚩 Flag Capture

```plaintext
picoCTF{block_3SRhViRbT1qcX_XUjM0r49cH_qCzmJZzBK_8bb7bc38}
```