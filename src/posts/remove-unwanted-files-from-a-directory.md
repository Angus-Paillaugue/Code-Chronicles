---
title: "Remove unwanted files from a directory"
description: "How to remove all the files with specific extensions from a directory"
banner: /postsAssets/remove-unwanted-files-from-a-directory.webp
date: '2024-01-03'
languages:
  - Python
categories:
  - others
published: true
---

<script>
  import { Link } from "$lib/components";
</script>


I recently started using my first compiled language for school <Link href="https://fr.wikipedia.org/wiki/Ada_(langage)">ADA</Link>. I know, nobody have ever heard of it but I have to use it for a whole semester. 

Anyways, when compiling this language (and any other compiled languages), the compiler generates plenty of files like `.o` (and in my case `.ali`, `.ali`, `.bexch`). These files are essentials for the compiler to work but when submitting my work, I have to zip my project files and those files make the zip size huge. 

At first I was deleting the files by hand and that's fine until you have files in everywhere (in nested directories etc.). 

So I wrote a simple python script that deletes all files not ending with specific extensions (except itself).

To match your use-case, you can update the `allowed_extensions` array with the file extensions you want to keep.

```python title="clean.py"
# This script cleans all directories by removing all files that end with any `allowed_extensions` extension.
import os

# Define the list of allowed extensions
allowed_extensions = [".adb", ".ads", ".gpr", ".py", ".txt", ".md", ".gitignore", ".gitkeep", ".gitconfig"]
root_directory = os.path.dirname(__file__)

# Define a function to check if a file has an allowed extension
def has_allowed_extension(filename):
    return any(filename.endswith(ext) for ext in allowed_extensions)

# Define a function to clean a directory
def clean_directory(directory):
    if "git" not in directory:
        for filename in os.listdir(directory):
            filepath = os.path.join(directory, filename)
            if os.path.isfile(filepath) and not has_allowed_extension(filepath):
                os.remove(filepath)
            elif os.path.isdir(filepath):
                clean_directory(filepath)

# Define the main function to clean all directories
def clean_all_directories():
    clean_directory(root_directory)
    for directory, subdirectories, _ in os.walk(root_directory):
        for subdirectory in subdirectories:
            clean_directory(os.path.join(directory, subdirectory))
                
    print("All directories have been cleaned.")

# Call the main function to clean all directories
if __name__ == "__main__":
    clean_all_directories()
```

I also wrote another script that does the exact opposite : delate all files (except itself) whose extension is in the `unauthorized_extensions` array. 

```python title="clean.py"
# This script cleans all directories by removing all files that doesn't end with any `allowed_extensions` extension
import os

# Define the list of unauthorized extensions
unauthorized_extensions = [".txt"]
root_directory = os.path.dirname(__file__)

# Define a function to check if a file has an unauthorized extension
def has_unauthorized_extension(filename):
    return any(filename.endswith(ext) for ext in unauthorized_extensions)

# Define a function to clean a directory and avoiding th `.git` directory
def clean_directory(directory):
    if "git" not in directory:
        for filename in os.listdir(directory):
            filepath = os.path.join(directory, filename)
            if os.path.isfile(filepath) and has_unauthorized_extension(filepath) and filepath != __file__:
                os.remove(filepath)
            elif os.path.isdir(filepath):
                clean_directory(filepath)

# Define the main function to clean all directories
def clean_all_directories():
    clean_directory(root_directory)
    for directory, subdirectories, _ in os.walk(root_directory):
        for subdirectory in subdirectories:
            clean_directory(os.path.join(directory, subdirectory))
                
    print("All directories have been cleaned.")

# Call the main function to clean all directories
if __name__ == "__main__":
    clean_all_directories()
```