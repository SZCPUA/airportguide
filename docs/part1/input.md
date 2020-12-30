# Scanner的用法

## Scanner基本使用

```java
import java.util.Scanner; //导包

public class scanner {
    public static void main(String args[]){
        Scanner sc = new Scanner(System.in);  //确定变量
        int x = sc.nextInt();  //赋值
        System.out.println("x:"+x);
    }
}
```

## 判断奇偶数

&emsp;&emsp;提示输入数值，并且根据输入的数值确定奇偶性。

```java
import java.util.Scanner;
public class evenodd {
    public static void main(String args[]){
        Scanner sc = new Scanner(System.in);
        System.out.println("Please insert an Integer:");
        int x = sc.nextInt();
        String c=(x%2==0)?"Even Number":"Odd Number";
        System.out.println(c);
    }
}
```

## 升级版三个数字比大小

&emsp;&emsp;提示输入3个数值，并且根据输入的数值使用三元运算符找最大的那个。

```java
import java.util.Scanner;

public class buddna_Update {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.println("请输入第一个数：");
        int x = sc.nextInt();
        System.out.println("请输入第二个数：");
        int y = sc.nextInt();
        System.out.println("请输入第三个数：");
        int c = sc.nextInt();
        int z;
        int f;
        z = (x > y) ? x : y;
        f = (z > c) ? z : c;
        System.out.println("最大的数是：" + f);
    }
}
```

## 确定季节

&emsp;&emsp;提示输入数值，1\~12的正整数，超出范围的返回无效。12/1/2月冬季，3\~5月春季，6\~8月夏季，9\~11月秋季。

```java
import java.util.Scanner;

public class seasons {
    public static void main(String args[]) {
        Scanner sc = new Scanner(System.in);
        System.out.println("Please Insert a Month:");
        int x = sc.nextInt();
        if (x <= 0 || x >= 13) {
            System.out.println("Not Valid!");
        } else {
            int a = (x == 1 || x == 2 || x == 12) ? 1 : 0;
            int b = (x >= 3 && x <= 5) ? 1 : 0;
            int c = (x >= 6 && x <= 8) ? 1 : 0;
            int d = (x >= 9 && x <= 11) ? 1 : 0;
            if (a == 1) {
                System.out.println("Winter");
            }
            if (b == 1) {
                System.out.println("Spring");
            }
            if (c == 1) {
                System.out.println("Summer");
            }
            if (d == 1) {
                System.out.println("Autumn");
            }
        }

    }
}
```

