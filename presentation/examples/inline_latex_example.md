---
title: "Avoid undefined behavior when using restrict-qualified pointers"
author: "Kofler Lorenz"
date: May 05, 2021
theme: "Berlin"
fontsize: 9pt
classoption: "aspectratio=169"
institute: "SIB: SIP4UE"
colortheme: "dolphin"
---
# restrict-qualified pointers
- seit C99 Standard
- keine neue Funktionalität
- informiert den Compiler über mögliche Optimierungen

- wird *restrict* mit einem Pointer *ptr* verwendet, ist der Pointer *ptr*, der einzige Weg um das Objekt an dieser Speicherstelle referenziert

# Risiken und Probleme

- richtige Nutzung liegt in der Verantwortung des Programmierers

- wird die Bedingung nicht eingehalten kommt es zu undefiniertem Verhalten

 - z.B. wenn neben einem restrict Pointer noch andere Pointer vorhanden sind welche die selbe Speicherstelle referenzieren

- Verhalten eines Programms kann sich ändern je nach Optimierungslevel

# Undefined Behavior (laut C FAQ\footnote{http://c-faq.com/ansi/undef.html})
Anything at all can happen; the Standard imposes no requirements. The program may fail to compile, or it may execute incorrectly (either crashing or silently generating incorrect results), or it may do exactly what the programmer intended.

# Erklärung *restrict* 1/2: ohne Verwendung von restrict
```{=latex}
\begin{columns}
\begin{column}{0.5\textwidth}
```
**C-Code**
```c
void f(int* a, int* b, int* x) {
  *a += *x; // a = a + x
  *b += *x; // b = b + x
}
int main(void){
  int a = 0, b = 1, c = 2;
  f(&a, &b, &c);
  return 0;
}
```
```{=latex}
\end{column}
\begin{column}{0.5\textwidth}  %%<--- here
```
**Assembly**
```asm
void f(int* a, int* b, int* x) {
  *a += *x;
   0:	8b 02      mov (%rdx),%eax
   2:	01 07      add %eax,(%rdi)
  *b += *x;
   4:	8b 02      mov (%rdx),%eax
   6:	01 06      add %eax,(%rsi)
}
   8:	c3         ret
```
```{=latex}
\end{column}
\end{columns}
```

gcc -g -std=c99 -O3 main.c -o main

# Erklärung *restrict* 2/2: mit Verwendung von restrict
```{=latex}
\begin{columns}
\begin{column}{0.5\textwidth}
```
**C-Code**
```c
void f(int* a, int* b, int* restrict x) {
  *a += *x; // a = a + x
  *b += *x; // b = b + x
}
int main(void){
  int a = 0, b = 1, c = 2;
  f(&a, &b, &c);
  return 0;
}
```
```{=latex}
\end{column}
\begin{column}{0.5\textwidth}  %%<--- here
```
**Assembly**
```asm
void f(int* a, int * b, int * restrict x) {
  *a += *x;
   0:	8b 02     mov (%rdx),%eax
   2:	01 07     add %eax,(%rdi)
  *b += *x;
   4:	01 06     add %eax,(%rsi)
}
   6:	c3        ret
```
```{=latex}
\end{column}
\end{columns}
```

gcc -g -std=c99 -O3 main.c -o main


# Undefined behavior

- *restrict-qualified pointer*: Compiler geht davon aus, dass dieser Pointer der einzige Pointer ist, welcher das Objekt an der Stelle referenziert

- Verletzung der Bedingung:
  - zweiter Pointer vorhanden, welcher die gleiche Speicherstelle referenziert
  - es kommt zu undefiniertem Verhalten

# Nichtkonformes Code-Beispiel 1/2

```C
#include <stdio.h>

void f(int * a, int * b, int * restrict x, int * x_2) {
  /* undefined behavior */
  *a += *x;  // a = 0 + x =
  *x_2 = 20; // x = 20
  *b += *x;  // b = 1 + x =
}

int main(void){
  int a = 0, b = 1, x = 2;
  f(&a, &b, &x, &x);
  printf("a:%d, b:%d, x:%d\n", a, b, x);
  return 0;
}
```

# Nichtkonformes Code-Beispiel 2/2

```C
#include <stdio.h>

void f(int * a, int * b, int * restrict x, int * x_2) {
  /* undefined behavior */
  *a += *x;  // a = 0 + 2 = 2
  *x_2 = 20; // x = 20
  *b += *x;  // b = 1 + 2 = 3
}

int main(void){
  int a = 0, b = 1, x = 2;
  f(&a, &b, &x, &x);
  printf("a:%d, b:%d, x:%d\n", a, b, x);
  return 0;
}
```
Output:
```bash
a:2, b:3, x:20
```

# Konformes Code-Beispiel 1/2

```C
#include <stdio.h>

void f(int* a, int* b, int* restrict x) {
  *a += *x;  // a = 0 + 2 = 2
  *x = 20; // x = 20
  *b += *x;  // b = 1 + 20 = 21
}

int main(void){
  int a = 0, b = 1, x = 2;
  f(&a, &b, &x);
  printf("%d, %d, %d\n", a, b, x);
  return 0;
}
```

# Konformes Code-Beispiel 2/2

```C
#include <stdio.h>

void f(int* a, int* b, int* restrict x) {
  *a += *x;  // a = 0 + 2 = 2
  *x = 20; // x = 20
  *b += *x;  // b = 1 + 20 = 21
}

int main(void){
  int a = 0, b = 1, x = 2;
  f(&a, &b, &x);
  printf("%d, %d, %d\n", a, b, x);
  return 0;
}
```
Output:
```bash
a:2, b:21, c:20
```

# Secure Coding Rule
- *restrict-defined pointers* dürfen nur verwendet werden, wenn kein weiterer Pointer vorhanden ist, welcher das selbe Objekt referenziert, ansonsten kann es zu undefiniertem Verhalten kommen.



