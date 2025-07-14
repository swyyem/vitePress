# 代码快

## 纯代码块

```java
    public class HelloWorld{
        public static void main(String[] args){
            System.out.println("hello world");
        }
    }
```

## 代码块-聚焦-单行

```java
    public class HelloWorld{
        public static void main(String[] args){
            System.out.println("hello world"); // [!code focus]
        }
    }
```

## 删除/新增标记

```java
    public class HelloWorld{
        public static void main(String[] args){ // [!code focus:3]
            System.out.println("hello world");
        }
    }
```

## 代码块-聚焦-多行

```java
    public class HelloWorld{
        public static void main(String[] args){
            System.out.println("hello world");
            System.out.println("hello world"); // [!code --]
            System.out.println("hello world");}// [!code ++]
    }
```

## 代码警告提醒

```java
    public class HelloWorld{
        public static void main(String[] args){
            System.out.println("hello world");
            System.out.println("hello world"); // [!code warning]
            System.out.println("hello world");}// [!code error]
    }
```
