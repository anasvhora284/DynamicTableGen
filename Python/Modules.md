# 1️⃣ Math Module

## Introduction

The `math` module in Python provides mathematical functions, constants, and utilities for performing arithmetic, trigonometric, logarithmic, and other mathematical operations.

## Importing the Math Module

Before using any function from the `math` module, you must import it:

```python
import math
```

## Mathematical Constants

| Constant   | Description                  |
| ---------- | ---------------------------- |
| `math.pi`  | Value of π (pi)              |
| `math.e`   | Euler’s number (e)           |
| `math.tau` | τ (tau), which is 2π         |
| `math.inf` | Represents positive infinity |
| `math.nan` | Not-a-Number (NaN)           |

Example:

```python
import math
print(math.pi)  # Output: 3.141592653589793
print(math.e)   # Output: 2.718281828459045
```

## Basic Arithmetic Functions

| Function            | Description                        |
| ------------------- | ---------------------------------- |
| `math.ceil(x)`      | Rounds up to the nearest integer   |
| `math.floor(x)`     | Rounds down to the nearest integer |
| `math.trunc(x)`     | Truncates decimal part             |
| `math.fabs(x)`      | Absolute value                     |
| `math.factorial(n)` | Factorial of `n`                   |

Example:

```python
print(math.ceil(4.3))    # Output: 5
print(math.floor(4.7))   # Output: 4
print(math.factorial(5)) # Output: 120
```

## Power and Logarithmic Functions

| Function         | Description                     |
| ---------------- | ------------------------------- |
| `math.pow(x, y)` | Returns `x` raised to `y` (x^y) |
| `math.sqrt(x)`   | Square root of `x`              |
| `math.exp(x)`    | `e^x` (exponential function)    |
| `math.log(x)`    | Natural logarithm (ln x)        |
| `math.log10(x)`  | Logarithm base 10               |

Example:

```python
print(math.pow(2, 3))  # Output: 8.0
print(math.sqrt(16))   # Output: 4.0
print(math.log10(100)) # Output: 2.0
```

## Trigonometric Functions

| Function          | Description                 |
| ----------------- | --------------------------- |
| `math.sin(x)`     | Sine of `x` (in radians)    |
| `math.cos(x)`     | Cosine of `x` (in radians)  |
| `math.tan(x)`     | Tangent of `x` (in radians) |
| `math.degrees(x)` | Convert radians to degrees  |
| `math.radians(x)` | Convert degrees to radians  |

Example:

```python
print(math.sin(math.pi/2))   # Output: 1.0
print(math.degrees(math.pi)) # Output: 180.0
```

## Hyperbolic Functions

| Function       | Description               |
| -------------- | ------------------------- |
| `math.sinh(x)` | Hyperbolic sine of `x`    |
| `math.cosh(x)` | Hyperbolic cosine of `x`  |
| `math.tanh(x)` | Hyperbolic tangent of `x` |

Example:

```python
print(math.sinh(1))  # Output: 1.1752011936438014
```

## Greatest Common Divisor (GCD)

Finds the greatest common divisor of two numbers:

```python
print(math.gcd(48, 18))  # Output: 6
```

## Sum and Product Functions

| Function              | Description                           |
| --------------------- | ------------------------------------- |
| `math.fsum(iterable)` | Sum of all elements (float precision) |
| `math.prod(iterable)` | Product of all elements               |

Example:

```python
print(math.fsum([0.1, 0.2, 0.3])) # Output: 0.6
print(math.prod([1, 2, 3, 4]))    # Output: 24
```

# 2️⃣ Random Module

## Introduction

The `random` module in Python provides functions to generate random numbers, select random elements, shuffle sequences, and perform other randomization tasks.

## Importing the Random Module

Before using any function from the `random` module, you must import it:

```python
import random
```

## Generating Random Numbers

| Function                              | Description                                                       |
| ------------------------------------- | ----------------------------------------------------------------- |
| `random.random()`                     | Returns a random float between 0 and 1                            |
| `random.uniform(a, b)`                | Returns a random float between `a` and `b`                        |
| `random.randint(a, b)`                | Returns a random integer between `a` and `b` (inclusive)          |
| `random.randrange(start, stop, step)` | Returns a random integer from the range (`start`, `stop`, `step`) |

Example:

```python
print(random.random())       # Output: Random float between 0 and 1
print(random.uniform(1, 10)) # Output: Random float between 1 and 10
print(random.randint(1, 100))# Output: Random integer between 1 and 100
```

## Random Choice from a Sequence

| Function                        | Description                                            |
| ------------------------------- | ------------------------------------------------------ |
| `random.choice(sequence)`       | Returns a random element from a sequence               |
| `random.choices(sequence, k=n)` | Returns a list of `n` random elements with replacement |
| `random.sample(sequence, n)`    | Returns a list of `n` unique random elements           |

Example:

```python
options = ['apple', 'banana', 'cherry', 'date']
print(random.choice(options)) # Output: Random element from the list
print(random.choices(options, k=2)) # Output: List of 2 random elements (with replacement)
print(random.sample(options, 2))   # Output: List of 2 unique random elements
```

## Shuffling a Sequence

| Function                   | Description              |
| -------------------------- | ------------------------ |
| `random.shuffle(sequence)` | Shuffles a list in place |

Example:

```python
nums = [1, 2, 3, 4, 5]
random.shuffle(nums)
print(nums)  # Output: Shuffled list
```

## Random Boolean and Bytes

| Function                       | Description                                   |
| ------------------------------ | --------------------------------------------- |
| `random.getrandbits(n)`        | Returns a random integer with `n` random bits |
| `random.choice([True, False])` | Returns a random boolean value                |

Example:

```python
print(random.getrandbits(8)) # Output: Random integer with 8 bits
print(random.choice([True, False])) # Output: Random True or False
```

## Seeding the Random Generator

Seeding allows generating the same random values for reproducibility.

Example:

```python
random.seed(42)
print(random.randint(1, 100))  # Output will be the same every run
```

# 3️⃣ Datetime Modul

## Introduction

The `datetime` module in Python provides classes for manipulating dates and times. It allows working with dates, times, intervals, and formatting options.

## Importing the Datetime Module

Before using any function from the `datetime` module, you must import it:

```python
import datetime
```

## Getting the Current Date and Time

| Function                  | Description                       |
| ------------------------- | --------------------------------- |
| `datetime.datetime.now()` | Returns the current date and time |
| `datetime.date.today()`   | Returns the current date          |

Example:

```python
print(datetime.datetime.now())  # Output: Current date and time
print(datetime.date.today())    # Output: Current date
```

## Creating Date and Time Objects

| Function                                                    | Description               |
| ----------------------------------------------------------- | ------------------------- |
| `datetime.datetime(year, month, day, hour, minute, second)` | Creates a datetime object |
| `datetime.date(year, month, day)`                           | Creates a date object     |
| `datetime.time(hour, minute, second)`                       | Creates a time object     |

Example:

```python
dt = datetime.datetime(2024, 2, 12, 15, 30, 45)
d = datetime.date(2024, 2, 12)
t = datetime.time(15, 30, 45)
print(dt)  # Output: 2024-02-12 15:30:45
print(d)   # Output: 2024-02-12
print(t)   # Output: 15:30:45
```

## Formatting and Parsing Dates

| Function                        | Description                                      |
| ------------------------------- | ------------------------------------------------ |
| `strftime(format)`              | Converts a datetime object to a formatted string |
| `strptime(date_string, format)` | Parses a string into a datetime object           |

Example:

```python
dt = datetime.datetime.now()
formatted_date = dt.strftime("%Y-%m-%d %H:%M:%S")
print(formatted_date)  # Output: 2024-02-12 15:30:45

parsed_date = datetime.datetime.strptime("2024-02-12 15:30:45", "%Y-%m-%d %H:%M:%S")
print(parsed_date)  # Output: 2024-02-12 15:30:45
```

## Date Arithmetic (Timedelta)

| Function                                            | Description                |
| --------------------------------------------------- | -------------------------- |
| `datetime.timedelta(days, hours, minutes, seconds)` | Represents a time duration |

Example:

```python
dt = datetime.datetime.now()
future_date = dt + datetime.timedelta(days=10)
past_date = dt - datetime.timedelta(days=5)
print(future_date)  # Output: Current date + 10 days
print(past_date)    # Output: Current date - 5 days
```

## Getting Date Components

| Attribute | Description                        |
| --------- | ---------------------------------- |
| `year`    | Gets the year from a date object   |
| `month`   | Gets the month from a date object  |
| `day`     | Gets the day from a date object    |
| `hour`    | Gets the hour from a time object   |
| `minute`  | Gets the minute from a time object |
| `second`  | Gets the second from a time object |

Example:

```python
dt = datetime.datetime.now()
print(dt.year, dt.month, dt.day, dt.hour, dt.minute, dt.second)
```

# 4️⃣ Regular Expressions (re Module)

## Introduction

The `re` module in Python provides support for working with regular expressions. Regular expressions (regex) are powerful tools for string searching, matching, and manipulation.

## Importing the re Module

Before using any function from the `re` module, you must import it:

```python
import re
```

## Commonly Used Functions

| Function                               | Description                                                        |
| -------------------------------------- | ------------------------------------------------------------------ |
| `re.match(pattern, string)`            | Checks if the string starts with the pattern                       |
| `re.search(pattern, string)`           | Searches the string for the first match of the pattern             |
| `re.findall(pattern, string)`          | Returns all matches of the pattern in the string as a list         |
| `re.finditer(pattern, string)`         | Returns an iterator of match objects for all matches in the string |
| `re.sub(pattern, replacement, string)` | Replaces occurrences of the pattern with a replacement string      |
| `re.split(pattern, string)`            | Splits the string by occurrences of the pattern                    |

## Example Usage

### 1. Matching at the Start of a String

```python
pattern = r"hello"
text = "hello world"
match = re.match(pattern, text)
print(match)  # Output: <re.Match object; span=(0, 5), match='hello'>
```

### 2. Searching in a String

```python
pattern = r"world"
text = "hello world"
match = re.search(pattern, text)
print(match.group())  # Output: world
```

### 3. Finding All Matches

```python
pattern = r"\d+"  # Matches numbers
text = "Order 42, item 53, quantity 100"
matches = re.findall(pattern, text)
print(matches)  # Output: ['42', '53', '100']
```

### 4. Using finditer

```python
pattern = r"\b\w{3}\b"  # Matches three-letter words
text = "The cat ran fast."
matches = re.finditer(pattern, text)
for match in matches:
    print(match.group())  # Output: The cat ran
```

### 5. Replacing Text

```python
pattern = r"apple"
text = "I like apple pie."
new_text = re.sub(pattern, "banana", text)
print(new_text)  # Output: I like banana pie.
```

### 6. Splitting Strings

```python
pattern = r"[,\s]+"  # Split by commas or spaces
text = "apple, banana, orange"
result = re.split(pattern, text)
print(result)  # Output: ['apple', 'banana', 'orange']
```

## Special Characters and Meta Characters

| Character | Description                                              |
| --------- | -------------------------------------------------------- |
| `.`       | Matches any character except newline                     |
| `^`       | Matches the start of a string                            |
| `$`       | Matches the end of a string                              |
| `*`       | Matches 0 or more repetitions                            |
| `+`       | Matches 1 or more repetitions                            |
| `?`       | Matches 0 or 1 repetition                                |
| `{n,m}`   | Matches between `n` and `m` repetitions                  |
| `\d`      | Matches any digit (0-9)                                  |
| `\D`      | Matches any non-digit character                          |
| `\w`      | Matches any word character (letters, digits, underscore) |
| `\W`      | Matches any non-word character                           |
| `\s`      | Matches any whitespace character                         |
| `\S`      | Matches any non-whitespace character                     |

Example:

```python
pattern = r"\d+"
text = "There are 24 apples and 5 bananas."
matches = re.findall(pattern, text)
print(matches)  # Output: ['24', '5']
```

# 5️⃣ Time Module

## Introduction

The `time` module in Python provides functions to work with time-related operations, such as measuring execution time, sleeping, and retrieving the current time.

## Importing the time Module

Before using any function from the `time` module, you must import it:

```python
import time
```

## Commonly Used Functions

| Function                             | Description                                                          |
| ------------------------------------ | -------------------------------------------------------------------- |
| `time.time()`                        | Returns the current time in seconds since the epoch (Unix timestamp) |
| `time.sleep(seconds)`                | Pauses execution for the given number of seconds                     |
| `time.localtime([secs])`             | Converts a timestamp to a time structure in local time               |
| `time.gmtime([secs])`                | Converts a timestamp to a time structure in UTC                      |
| `time.strftime(format, time_object)` | Formats a time object into a string                                  |
| `time.strptime(string, format)`      | Parses a time string into a time object                              |
| `time.ctime([secs])`                 | Converts a timestamp to a readable string                            |
| `time.monotonic()`                   | Returns the value of a monotonic clock (cannot go backward)          |
| `time.perf_counter()`                | Returns a high-resolution performance counter                        |
| `time.process_time()`                | Returns the CPU time of the process                                  |

## Example Usage

### 1. Getting the Current Time

```python
current_time = time.time()
print("Current Timestamp:", current_time)
```

### 2. Sleeping for a Given Time

```python
print("Start")
time.sleep(2)  # Pauses for 2 seconds
print("End")
```

### 3. Converting Timestamps to Readable Time

```python
timestamp = time.time()
local_time = time.ctime(timestamp)
print("Local Time:", local_time)
```

### 4. Formatting Time

```python
current_time = time.localtime()
formatted_time = time.strftime("%Y-%m-%d %H:%M:%S", current_time)
print("Formatted Time:", formatted_time)
```

### 5. Parsing a Time String

```python
time_string = "2024-02-12 15:30:00"
time_object = time.strptime(time_string, "%Y-%m-%d %H:%M:%S")
print("Parsed Time:", time_object)
```

### 6. Measuring Execution Time

```python
start_time = time.time()
# Some computation here
time.sleep(1)
end_time = time.time()
print("Execution Time:", end_time - start_time, "seconds")
```

## Special Time Formatting Codes

| Code | Description                      |
| ---- | -------------------------------- |
| `%Y` | Year (e.g., 2024)                |
| `%m` | Month (01-12)                    |
| `%d` | Day (01-31)                      |
| `%H` | Hour (00-23)                     |
| `%M` | Minute (00-59)                   |
| `%S` | Second (00-59)                   |
| `%A` | Full weekday name (e.g., Monday) |
| `%B` | Full month name (e.g., February) |
| `%p` | AM or PM                         |

Example:

```python
current_time = time.localtime()
formatted_time = time.strftime("%A, %B %d, %Y %I:%M:%S %p", current_time)
print("Formatted Time:", formatted_time)
```

# 6️⃣ json Module

## Introduction

The `json` module in Python provides functions to encode and decode JSON data, allowing easy serialization and deserialization of Python objects.

## Importing the json Module

Before using any function from the `json` module, you must import it:

```python
import json
```

## Commonly Used Functions

| Function                  | Description                                               |
| ------------------------- | --------------------------------------------------------- |
| `json.dump(obj, file)`    | Serializes `obj` to a JSON file                           |
| `json.dumps(obj)`         | Serializes `obj` to a JSON-formatted string               |
| `json.load(file)`         | Deserializes JSON data from a file into a Python object   |
| `json.loads(json_string)` | Deserializes JSON data from a string into a Python object |
| `json.JSONEncoder`        | Custom encoder class for JSON serialization               |
| `json.JSONDecoder`        | Custom decoder class for JSON deserialization             |

## Example Usage

### 1. Converting a Python Object to a JSON String

```python
data = {"name": "John", "age": 30, "city": "New York"}
json_string = json.dumps(data)
print("JSON String:", json_string)
```

### 2. Writing JSON Data to a File

```python
data = {"name": "Alice", "age": 25, "city": "London"}
with open("data.json", "w") as file:
    json.dump(data, file)
```

### 3. Reading JSON Data from a File

```python
with open("data.json", "r") as file:
    data = json.load(file)
print("Loaded Data:", data)
```

### 4. Converting a JSON String to a Python Object

```python
json_string = '{"name": "Bob", "age": 22, "city": "Paris"}'
data = json.loads(json_string)
print("Python Object:", data)
```

### 5. Using Custom Encoding and Decoding

```python
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

def person_encoder(obj):
    if isinstance(obj, Person):
        return {"name": obj.name, "age": obj.age}
    raise TypeError("Object is not JSON serializable")

person = Person("Eve", 28)
json_data = json.dumps(person, default=person_encoder)
print("Custom JSON:", json_data)
```

## Formatting and Indentation

To format JSON output, use the `indent` parameter:

```python
data = {"name": "David", "age": 35, "city": "Berlin"}
formatted_json = json.dumps(data, indent=4)
print(formatted_json)
```

# 7️⃣ requests Module

## Introduction

The `requests` module in Python is used to send HTTP requests easily. It supports common methods like GET, POST, PUT, and DELETE.

## Installing the requests Module

If you haven't installed the `requests` module, install it using pip:

```sh
pip install requests
```

## Importing the requests Module

```python
import requests
```

## Commonly Used Functions

| Function                        | Description                              |
| ------------------------------- | ---------------------------------------- |
| `requests.get(url)`             | Sends a GET request                      |
| `requests.post(url, json=data)` | Sends a POST request with JSON data      |
| `requests.put(url, json=data)`  | Sends a PUT request to update a resource |
| `requests.delete(url)`          | Sends a DELETE request                   |
| `requests.Response`             | Stores response data                     |

## Example Usage

### 1. Sending a GET Request

```python
response = requests.get("https://jsonplaceholder.typicode.com/posts/1")
print(response.json())
```

### 2. Sending a POST Request

```python
data = {"title": "foo", "body": "bar", "userId": 1}
response = requests.post("https://jsonplaceholder.typicode.com/posts", json=data)
print(response.json())
```

### 3. Sending a PUT Request

```python
data = {"title": "updated title", "body": "updated body", "userId": 1}
response = requests.put("https://jsonplaceholder.typicode.com/posts/1", json=data)
print(response.json())
```

### 4. Sending a DELETE Request

```python
response = requests.delete("https://jsonplaceholder.typicode.com/posts/1")
print("Deleted!", response.status_code)
```

### 5. Handling Headers

```python
headers = {"User-Agent": "my-app"}
response = requests.get("https://jsonplaceholder.typicode.com/posts/1", headers=headers)
print(response.headers)
```

### 6. Using Query Parameters

```python
params = {"userId": 1}
response = requests.get("https://jsonplaceholder.typicode.com/posts", params=params)
print(response.json())
```

# 8️⃣ Python os Module Documentation

## Introduction

The `os` module in Python provides functions for interacting with the operating system, such as file and directory manipulation, environment variables, and process management.

## Importing the os Module

```python
import os
```

## Commonly Used Functions

| Function                     | Description                                       |
| ---------------------------- | ------------------------------------------------- |
| `os.getcwd()`                | Returns the current working directory             |
| `os.chdir(path)`             | Changes the current working directory             |
| `os.listdir(path)`           | Lists files and directories in the specified path |
| `os.mkdir(path)`             | Creates a new directory                           |
| `os.rmdir(path)`             | Removes an empty directory                        |
| `os.remove(path)`            | Deletes a file                                    |
| `os.rename(old, new)`        | Renames a file or directory                       |
| `os.environ`                 | Retrieves environment variables                   |
| `os.path.exists(path)`       | Checks if a file or directory exists              |
| `os.path.join(path1, path2)` | Joins multiple path components                    |

## Example Usage

### 1. Get the Current Working Directory

```python
import os
print(os.getcwd())
```

### 2. Change Directory

```python
os.chdir("/path/to/directory")
print("Changed to:", os.getcwd())
```

### 3. List Files and Directories

```python
print(os.listdir("."))  # Lists files in the current directory
```

### 4. Create and Remove a Directory

```python
os.mkdir("new_folder")
os.rmdir("new_folder")
```

### 5. Rename a File

```python
os.rename("old_name.txt", "new_name.txt")
```

### 6. Check If a File or Directory Exists

```python
if os.path.exists("file.txt"):
    print("File exists!")
```

### 7. Work with Environment Variables

```python
print(os.environ["HOME"])  # Get the home directory path
```

# 9️⃣ sys Module Documentation

## Introduction

The `sys` module in Python provides access to system-specific parameters and functions, such as command-line arguments, standard input/output handling, and interpreter information.

## Importing the sys Module

```python
import sys
```

## Commonly Used Functions

| Function             | Description                                                  |
| -------------------- | ------------------------------------------------------------ |
| `sys.argv`           | Returns a list of command-line arguments                     |
| `sys.exit(code)`     | Exits the program with a status code                         |
| `sys.version`        | Returns the Python version                                   |
| `sys.platform`       | Returns the platform identifier                              |
| `sys.path`           | Returns a list of directories where Python looks for modules |
| `sys.stdout.write()` | Writes output to standard output                             |
| `sys.stdin.read()`   | Reads input from standard input                              |
| `sys.getsizeof(obj)` | Returns the memory size of an object                         |

## Example Usage

### 1. Get Command-Line Arguments

```python
import sys
print("Arguments passed:", sys.argv)
```

### 2. Exit the Program

```python
sys.exit(0)  # Exit with status code 0 (success)
```

### 3. Get Python Version

```python
print("Python version:", sys.version)
```

### 4. Get Platform Information

```python
print("Platform:", sys.platform)
```

### 5. Get Module Search Path

```python
print("Module search paths:", sys.path)
```

### 6. Redirect Output

```python
sys.stdout.write("Hello, World!\n")
```

### 7. Read from Standard Input

```python
input_data = sys.stdin.read()
print("Input received:", input_data)
```

### 8. Get Object Size in Memory

```python
x = [1, 2, 3, 4, 5]
print("Size of x:", sys.getsizeof(x), "bytes")
```
