# 面向对象编程

```python
class Animal:
    def __init__(self, name):
        self.name = name

    def speak(self):
        raise NotImplementedError

class Dog(Animal):  # 继承
    def speak(self):
        return "Woof!"

# 使用类
my_dog = Dog("Buddy")
print(my_dog.speak())
```
