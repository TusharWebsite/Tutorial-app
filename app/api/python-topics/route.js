// app/api/python-topics/route.js
export async function GET() {
    const pythonTopics = {
      topics: [
        {
          id: 1,
          title: "Python Basics",
          subtopics: [
            {
              id: 1,
              title: "Introduction to Python",
              content: "Python is a high-level, interpreted programming language created by Guido van Rossum.",
              examples: [
                {
                  code: "print('Hello, World!')",
                  description: "Your first Python program"
                }
              ]
            },
            {
              id: 2,
              title: "Syntax",
              content: "Python syntax is designed to be clean and readable, using indentation to define code blocks.",
              examples: [
                {
                  code: "if True:\n    print('Indented code')\n    print('Same block')",
                  description: "Python indentation example"
                }
              ]
            },
            {
              id: 3,
              title: "Variables",
              content: "Learn about Python variables and how to use them to store data.",
              examples: [
                {
                  code: "name = 'John'\nage = 25\nheight = 1.75",
                  description: "Different variable types in Python"
                }
              ]
            },
            {
              id: 4,
              title: "Data Types",
              content: "Explore Python's basic data types including strings, numbers, and booleans.",
              examples: [
                {
                  code: "text = 'Hello'  # string\nnumber = 42    # integer\nprice = 9.99   # float\nis_valid = True # boolean",
                  description: "Basic data types in Python"
                }
              ]
            },
            {
              id: 5,
              title: "Numbers",
              content: "Learn about different number types in Python including integers and floating-point numbers.",
              examples: [
                {
                  code: "x = 10        # integer\ny = 3.14      # float\nz = 1 + 2j    # complex",
                  description: "Number types in Python"
                }
              ]
            },
            {
              id: 6,
              title: "Strings",
              content: "Understanding string manipulation and operations in Python.",
              examples: [
                {
                  code: "text = 'Hello World'\nprint(text.upper())\nprint(text[0])\nprint(len(text))",
                  description: "String operations"
                }
              ]
            }
          ]
        },
        {
          id: 2,
          title: "Control Flow",
          subtopics: [
            {
              id: 7,
              title: "If...Else",
              content: "Control program flow using conditional statements.",
              examples: [
                {
                  code: "age = 18\nif age >= 18:\n    print('Adult')\nelse:\n    print('Minor')",
                  description: "Basic if-else statement"
                }
              ]
            },
            {
              id: 8,
              title: "While Loops",
              content: "Execute code repeatedly while a condition is true.",
              examples: [
                {
                  code: "count = 0\nwhile count < 5:\n    print(count)\n    count += 1",
                  description: "Basic while loop"
                }
              ]
            },
            {
              id: 9,
              title: "For Loops",
              content: "Iterate over sequences like lists, tuples, or strings.",
              examples: [
                {
                  code: "for i in range(5):\n    print(i)",
                  description: "Basic for loop"
                }
              ]
            },
            {
              id: 10,
              title: "Break/Continue",
              content: "Control loop execution with break and continue statements.",
              examples: [
                {
                  code: "for i in range(10):\n    if i == 5:\n        break\n    print(i)",
                  description: "Using break statement"
                }
              ]
            }
          ]
        },
        {
          id: 3,
          title: "Functions",
          subtopics: [
            {
              id: 11,
              title: "Function Basics",
              content: "Learn how to define and call functions in Python.",
              examples: [
                {
                  code: "def greet(name):\n    return f'Hello, {name}!'\n\nprint(greet('Alice'))",
                  description: "Basic function definition"
                }
              ]
            },
            {
              id: 12,
              title: "Arguments",
              content: "Understanding different types of function arguments.",
              examples: [
                {
                  code: "def greet(name, age=20):\n    return f'{name} is {age} years old'",
                  description: "Function with default argument"
                }
              ]
            },
            {
              id: 13,
              title: "Lambda",
              content: "Create small anonymous functions using lambda expressions.",
              examples: [
                {
                  code: "square = lambda x: x**2\nprint(square(5))",
                  description: "Lambda function example"
                }
              ]
            },
            {
              id: 14,
              title: "Built-in Functions",
              content: "Explore Python's built-in functions like len(), range(), print().",
              examples: [
                {
                  code: "numbers = [1, 2, 3, 4, 5]\nprint(len(numbers))\nprint(max(numbers))\nprint(sum(numbers))",
                  description: "Common built-in functions"
                }
              ]
            }
          ]
        },
        {
          id: 4,
          title: "Data Structures",
          subtopics: [
            {
              id: 15,
              title: "Lists",
              content: "Work with ordered, mutable sequences in Python.",
              examples: [
                {
                  code: "fruits = ['apple', 'banana', 'orange']\nfruits.append('grape')\nprint(fruits[0])",
                  description: "List operations"
                }
              ]
            },
            {
              id: 16,
              title: "Tuples",
              content: "Learn about immutable sequences in Python.",
              examples: [
                {
                  code: "point = (3, 4)\nx, y = point\nprint(f'X: {x}, Y: {y}')",
                  description: "Tuple unpacking"
                }
              ]
            },
            {
              id: 17,
              title: "Sets",
              content: "Work with unordered collections of unique elements.",
              examples: [
                {
                  code: "numbers = {1, 2, 3, 3, 4}\nprint(numbers)\nnumbers.add(5)",
                  description: "Set operations"
                }
              ]
            },
            {
              id: 18,
              title: "Dictionaries",
              content: "Store and retrieve key-value pairs in Python.",
              examples: [
                {
                  code: "person = {'name': 'John', 'age': 30}\nprint(person['name'])\nperson['city'] = 'New York'",
                  description: "Dictionary operations"
                }
              ]
            }
          ]
        }
      ]
    };
  
    return new Response(JSON.stringify(pythonTopics), {
      headers: { 'Content-Type': 'application/json' },
    });
  }