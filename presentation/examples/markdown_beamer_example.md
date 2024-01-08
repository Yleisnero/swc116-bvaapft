---
title: "Padding-Oracle-Attack"
classoption: "aspectratio=169"
author: "Bernhard Fischer, Lorenz Kofler"
date: May 03, 2021
theme: "Berlin"
fontsize: 8pt
colortheme: "dolphin"
---
# Situation
- AES-CBC mit PKCS#7 Padding

# Padding: PKCS#7

- PKCS #7: Cryptographic Message Syntax[^1]
- *N* Bytes Padding, jedes Byte mit dem Wert *N*
- z.B. 16 Byte Block (AES[^2])


```coffeescript
    |   PLAINTEXT (11B)   | PADDING (5B) | = 16 Byte
    |p|p|p|p|p|p|p|p|p|p|p|05|05|05|05|05|
```

- wenn der letzte Block exakt voll ist, wird ein extra Block mit Padding angefügt
\newline
- Das Padding muss immer richtig sein!

[^1]: <https://tools.ietf.org/html/rfc5652#section-6.3>
[^2]: <https://tools.ietf.org/html/rfc3602#section-2.4>

# Vulnerability

- Padding-Oracle unterscheidet zwischen:
    - Padding **richtig**
    - Padding **falsch**
<br/>    

- wir wissen **wie das Padding ausschauen soll** (PKCS#7-Padding-Format)
- wir wissen **wann das Padding stimmt** (Antwort des Oracels)


# Padding Oracle Attack 
- **CCA** = Chosen Chiphertext Attack
- **Input**: von uns gewählter Ciphertext
- **Output**: 
  - Padding **richtig**
  - Padding **falsch**
- Durch dieses Verhalten kann der Plaintext bestimmt werden

# Beispiel 1/5: 
Cipher Block Chaining: Block Size = 6 Byte, 2 Blöcke
```java
                         CBC-Decryption: Padding Oracle Attack
       
                          BLOCK 1                       BLOCK 2
                   |c1|c2|c3|c4|c5|c6|           |c7|c8|c9|c10|c11|c12| 
                            |                             |
                            ↓ --------------              ↓
                          |DEC|            |            |DEC|
                            |              |              |
                   |d1|d2|d3|d4|d5|d6|     |     |d7|d8|d9|d10|d11|d12|        
                            ↓              |              ↓
        IV --------------> xor             ------------->xor
                            ↓                             ↓
                   |p1|p2|p3|p4|p5|p6|           |p7|p8|p9|p10|p11|p12|        
          
Cleartext mit richtigem Padding:
|p1|p2|p3|p4|p5|p6 | |p7|p8|p9|p10|p11|0x1|           |p1|p2|p3|p4|p5 |0x1
|p1|p2|p3|p4|p5|p6 | |p7|p8|p9|p10|0x2|0x2|           |p1|p2|p3|p4|0x2|0x2
|p1|p2|p3|p4|p5|p6 | |p7|p8|p9|0x3|0x3|0x3| 
```

# Beispiel 2/5
```java
                         CBC-Decryption: Padding Oracle Attack
       
                          BLOCK 1                       BLOCK 2
                   |c1|c2|c3|c4|c5|c6'|           |c7|c8|c9|c10|c11|c12| 
                            |                             |
                            ↓ --------------              ↓
                          |DEC|            |            |DEC|
                            |              |              |
                   |d1|d2|d3|d4|d5|d6|     |     |d7|d8|d9|d10|d11|d12|        
                            ↓              |              ↓
        IV --------------> xor             -------------> xor
                            ↓                             ↓
                   |p1|p2|p3|p4|p5|p6|           |p7|p8|p9|p10|p11|p12'|  

case: |p7|p8|p9|p10|p11|0x1 

c6' so lange verändern, bis wir die Antwort "Padding richtig" erhalten:
    p12' = 0x1 

p12  = d12 ^ c6                       
p12' = d12 ^ c6' = p12 ^ c6 ^ c6'  -->   p12  = p12' ^ c6 ^ c6' = 0x01 ^ c6 ^ c6'
```

# Beispiel 3/5
```java
                         CBC-Decryption: Padding Oracle Attack
       
                          BLOCK 1                       BLOCK 2
                   |c1|c2|c3|c4|c5|c6''|         |c7|c8|c9|c10|c11|c12| 
                            |                             |
                            ↓ --------------              ↓
                          |DEC|            |            |DEC|
                            |              |              |
                   |d1|d2|d3|d4|d5|d6|     |     |d7|d8|d9|d10|d11|d12|        
                            ↓              |              ↓
        IV --------------> xor             -------------> xor
                            ↓                             ↓
                   |p1|p2|p3|p4|p5|p6|           |p7|p8|p9|p10|p11|p12''|   
         
da wir p12 wissen, kann kann der Wert c6'' berechnet werden, sodass wir p12'' als
Plaintext bekommen

d12  = c6 ^ p12
d12  = c6'' ^ p12''
c6'' = c6 ^ p12 ^ p12'' = c6 ^ p12 ^ 0x2   -->  |p7|p8|p9|p10|p11|0x2|
    
```

# Beispiel 4/5
```java
                         CBC-Decryption: Padding Oracle Attack
       
                          BLOCK 1                       BLOCK 2
                   |c1|c2|c3|c4|c5'|c6''|        |c7|c8|c9|c10|c11|c12| 
                            |                             |
                            ↓ --------------              ↓
                          |DEC|            |            |DEC|
                            |              |              |
                   |d1|d2|d3|d4|d5|d6|     |     |d7|d8|d9|d10|d11|d12|        
                            ↓              |              ↓
        IV --------------> xor             -------------> xor
                            ↓                             ↓
                   |p1|p2|p3|p4|p5|p6|           |p7|p8|p9|p10|p11'|0x2|  
     
case: |p7|p8|p9|p10|0x2|0x2 

c5' so lange verändern, bis wir die Antwort "Padding richtig" erhalten:
    p11' = 0x2

p11  = p11' ^ c5 ^ c5' 
```

# Beispiel 5/5
```java
                         CBC-Decryption: Padding Oracle Attack
                  
                                        BLOCK 1               
                                 |c1|c2|c3|c4|c5|c6|  
                                          |                             
                                          ↓            
                  IV                    |DEC|               
         |i1|i2|i3|i4|i5|i6'|             |      
                  |              |d1|d2|d3|d4|d5|d6|    
                  |                       ↓          
                  ---------------------> xor   
                                          ↓         
                                 |p1|p2|p3|p4|p5|p6'|       
                         
case: |p1|p2|p3|p4|p5|0x1|

i6' so lange verändern, bis wir die Antwort "Padding richtig" erhalten:
    p6' = 0x1

p6  = p6' ^ i5 ^ i5' 
```

# Anzahl der Anfragen an das Oracle
- 2 Blöcke
- Block Size = 6 Byte
- 256 Möglichkeiten pro Byte 

Anfragen = (Blockanzahl * Block Size * 256)/2 = (2 * 6 * 256) / 2 = 4069

Der Angreifer braucht im Durchschnitt 4069 Anfragen an das Oracle, um vollständing an den Plaintext zu gelangen.
