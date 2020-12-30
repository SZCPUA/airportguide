# 实例1

## Hello World!

```java
public class hello {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
```



## 三位数确定各位数字

&emsp;&emsp;要求：随机生成800以内的正整数，判断各位上的数字。

```java
public class FindNumbers {
    public static void main(String args[]) {
        int a = (int) (Math.random() * 800);
        int b = a / 100;
        int c = a / 10 % 10;
        int d = a % 10;
        System.out.println("所取随机数=" + a);
        System.out.println("它的百位数字=" + b);
        System.out.println("它的十位数字=" + c);
        System.out.println("它的个位数字=" + d);
    }
}

```



## 整数并判断奇偶性

&emsp;&emsp;要求：随机生成50~200以内的整数，判断奇偶性，奇数则计算算术平方根，偶数则除以2。

```java
public class hello {
    public static void main(String[] args) {
        int x = (int) (50 + (Math.random() * 150));
        System.out.println("随机数字是：" + x);

        if ((x % 2) == 1) {
            System.out.println("奇数，算术平方根是：" + Math.sqrt(x));
        } else {
            System.out.println("偶数，除以2是" + (x / 2));
        }
    }
}

```

## 移位运算符

&emsp;&emsp;<<左移	>>右移

```java
public class yiwei {
    public static void main(String[] args) {
        int a = 2 << 3;
        System.out.println(a);
    }
}
```

## 定义字符型变量

&emsp;&emsp;char用于C或C++中定义字符型变量，只占一个字节，取值范围为 -128 ~ +127（-2^7~2^7-1）。C语言中如int、long、short等不指定signed或unsigned时都默认为signed，但char在标准中不指定为signed或unsigned，编译器可以编译为带符号的，也可以编译为不带符号的。

```java
public class Q {
    public static void main(String[] args) {
        int i = 10;
        char c = 'A';
        c = 'a';
        System.out.println(i + c);
    }
}
```



## 字符串与整型相加

```java
public class main {
    public static void main(String args[]) {
        System.out.println("Li" + "boyang");
        System.out.println("Liboyang" + 666);
        System.out.println("Liboyang" + 66 + 6);
        System.out.println(666 + "Liboyang");
        System.out.println(6 + 66 + "Liboyang");
    }
}
```

```
"C:\Program Files\Java\jdk-13.0.1\bin\java.exe" "-javaagent:F:\data\IntelliJ IDEA Community Edition 2020.1.4\lib\idea_rt.jar=3305:F:\data\IntelliJ IDEA Community Edition 2020.1.4\bin" -Dfile.encoding=UTF-8 -classpath "D:\高中阶段资料\汇点\AP Computer Science A\AP Computer Science\out\production\AP Computer Science" main
Liboyang
Liboyang666
Liboyang666
666Liboyang
72Liboyang

Process finished with exit code 0
```

