# Applications 1

## 水仙花数

&emsp;&emsp;水仙花数（Narcissistic number）也被称为超完全数字不变数（pluperfect digital invariant, PPDI）、自恋数、自幂数、阿姆斯壮数或阿姆斯特朗数（Armstrong number），水仙花数是指一个 3 位数，它的每个位上的数字的 3次幂之和等于它本身（例如：1^3 + 5^3+ 3^3 = 153）。

```java
public class waterflower {
    public static void main(String args[]) {
        int b, s, g, count;
        count = 0;
        System.out.println("水仙花数:");
        for (int n = 100; n < 1000; n++) {
            g = n % 10;    //取到个位数
            s = n / 10 % 10;//取到十位数
            b = n / 100;  //取到百位数
            if (g * g * g + s * s * s + b * b * b == n) {
                System.out.println(n + "\t");
                count++;
            }
        }
        System.out.println("水仙花个数:" + count);
    }
}
```

## 三元运算符

&emsp;&emsp;比较三个数的最大值，并且输出。`?:`称为条件运算符。`?:`就是表示`?`前的表达式的值是否为真，是的话取`:`前的值，否则取`:`后的值。

```java
public class buddna {
    public static void main(String[] args) {
        int x = 5;
        int y = 10;
        int c = 15;
        int z;
        int f;
        z = (x > y) ? x : y;
        f = (z > c) ? z : c;
        System.out.println(f);
    }
}
```

