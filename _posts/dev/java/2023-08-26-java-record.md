---
title: "What Is a Java Record in JDK 14?"
description: "An introduction to Java Records introduced in JDK 14."
date: July 27, 2020
image:
  path: /assets/img/thumbnails/java.png
categories: [Dev, Java]
tags: [record]
---


Records provide a compact syntax for declaring classes which are transparent holders for `shallowly` `immutable` data. This is a preview language feature in `JDK 14`.

## What Is a Java Record? 

> One of the most common complaints about Java is that you need to write a lot of code for a class to be useful. Quite often you need to write the following: `toString()`, `hashCode()`, `equals()`, `Getter-methods` and `public constructor`

> For simple domain classes, these methods are usually boring, repetitive, and the kind of thing that could easily be generated mechanically (and IDEs often provide this capability), but as of now, the language itself doesn’t provide any way to do this.

> The goal of records is to extend the Java language syntax and create a way to say that a class is “the fields, just the fields, and nothing but the fields.” By you making that statement about a class, the compiler can help by creating all the methods automatically and having all the fields participate in methods such as hashCode().

## What is especial about records?

The records come with a default implementation for `public constructor`, `hashCode()`, `equals()` and `toString()`, and accessor methods like `max`, `min` for all attributes inside the record.

## What are the record's characteristics?

* Records can not be abstract
* Records can not extends classes
* All declared field are `private` and `final`, once you declare the records value you can not change it. Similar to tuple in Python


## How to declare a record and use it?

From Java 14 you declare the records with a keyword `record`

```java
public record Author(int id, String name) { }
```

**Usage**

```java

public record Author(int id, String name) { }

public class Example {
    public static void main(String[] args) {
      Author author1 = new Author(187, "author");
      System.out.println(author1);
    }
}
```

, **output**

```bash
Author[id=187, name=author]
```

## How to run and enable feature preview?

* You can run the following command

```bash
javac --enable-preview -source 14 ClassName.java
```

* Configure the IntelliJ IDEA to enable feature preview:

**File** &#8594; **Project structure** &#8594; **Project SDK** &#8594; **choose the Project language level as ‘14 (Preview) - Records, patterns, text blocks’ for your Project and Modules settings**

## Compare the records with old fashion pojo class

Before you were declaring the pojo class like this, define the attributes, getter, setter, hashCode(), equals(), toString():

```java
public class Author {

    private int id;
    private String name;

    public Author(int id, String name) {
        this.id = id;
        this.name = name;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Author author = (Author) o;
        return id == author.id &&
                Objects.equals(name, author.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name);
    }
}
```
, But from JDK-14 you can just define the record and it's internally provides default implementation `public constructor`, `hashCode()`, `equals()`, `toString()`:

```java
record Author(int id, String name) { }
```

## Difference between A Class and Record?

|diff|class|record|
|----|-----|------|
|data immutability|No/Yes|Yes|
|Extends|class/abstract class|No|
|Implement|interface|interface|
|can be abstract|Yes|No|

## What is the default implementation of hashCode()?

The record will use the hash code of all attributes inside the record

## What is the default implementation of equals()?

The record will use all attributes to decide if tow records are equals or not

So any hash implementations e.g. HashSet, LinkedHashSet, HashMap, LinkedHashMap,

etc will use `hashCode()` and in-case of any collision will use `equals()`
