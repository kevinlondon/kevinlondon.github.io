# Chapter 2: Creating and Destroying Objects

## 1: Static factory methods

1. Allows you to instantiate without necessarily creating an object
2. Arguments shape how the object is created
3. Generally can be indicated as to what you want to do by selecting good args
   to indicate purpose.

## 2: Builders for many params

Bad alternatives are to do a telescoping constructor, where you have
a constructor per set of possible args, and / or "JavaBeans" style, where you
call methods for each attribute setter.

Kwarg-like behavior can be achieved using builders. The builder is a thing that
returns itself and can be chained together. Pretty interesting approach.

Useful for hierarchical builds.

## 3: Enforce the singleton property with a private constructor or enum type

Private constructor can be done by using the `final` type. It's useful because
it shows that it should be the terminus of the class.

Single element enum is often the best way to implement a singleton.

## 4: Enforce noninstantiability with a private constructor

Constructors are public by default but not always meant to be instantiated.
Declaring the constructor as private to prevent it from being instantiated can
help ensure that no one misuses your class by mistake.

## 5: Prefer dependency injection to hardwiring resources

Instead of using `final` or a class as singleton, can allow for setting some
values at instantiation time, such as the dictionary. Dependency injection can
get complicated with larger projects, so look into using Guice or something like
it.

## 6: Avoid creating unnecessary objects

Strings, for example, do not need to be instantiated with `new String("word")`
since `"word"` is already a string. Prefer using static factory methods instead
of direct instantation. In another case, recommending to use a compiled form of
regex instead of instantiating the pattern for every use of it. Final example
would be `Long` vs `long`. Generally, prefer primitives over boxed primitives.

## 7: Eliminate obsolete object references

Memory management is not free in Java, even though it is easier. If you're
maintaining a stack, remember to clear out objects when you're done with them
and shrinking the stack's size. Think reference counting. This is hard to
isolate in a program if it happens without your knowledge.

"Whenever a class manages its own memory, the programmer should be alert for
memory leaks."

## 8: Avoid finalizers and cleaners

Java 9 deprecated finalizers. The new implementation is called a cleaner and it,
too, should be avoided. Finalizers / cleaners do not have a way to ensure
timeliness when executing. Time elapses between when an object becomes
unreachable and when it gets cleaned / finalized. They may not be run at all!

Finalizers allow for a security issue via "finalizer attacks". For nonfinal
classes, protect them by implementing a `final finalize` method that does
nothing. Implement AutoCloseable instead if you need to perform cleanup (think
context managers in Python).

## 9: Prefer `try-with-resources` to `try-finally`

`try-finally` looks okay when only one resource to close. Once you reach two,
feels bad.

To use `try-with-resources`, introduced in Java 7, the resource must implement
the `AutoCloseable` interface. That interface exposes a `close` method with
a void return.

# Chapter 3: Methods Common to All Objects

## 10: Obey the general contract when overriding `equals`

Ideally should try to avoid overriding `equals` at all. It makes sense to
override equals when the class you're implementing is a _value class_. For
example, Integer & String.

When you override `equals`, be sure to follow the equivalence relation,
including properties such as reflexive, symmetric, transitive, consistent, and
null-comparable.

For symmetry, only compare against objects you know you can compare to. Going
beyond can make symmetry weird (example: string vs CaseInsensitiveString).

With consistency, it's important to make sure there's no noise in the
comparison, for example checking a port or host IP.

In regards to nullity, checking if something is an instance of your desired
comparison class can fix potential null fall throughs.

Main questions to ask when done implementing an `equals` method:

1. Is it symmetric?
2. Is it transitive?
3. Is it consistent?

## 11: Always override `hashCode` when you override `equals`

`hashCode` reflects the state of the `equals` method. This can come back to bite
you in hash implementations when you're trying to fetch an instance of something
based on its class. To implement, hash each field that is important for
comparison purposes and add it to a result value. It's worth checking that your
`hashCode` values, when equal, will also work with `equals` methods. Think about
multiplying each item by 31 (a prime, and bitshiftable).

## 12: Always override `toString`

General contract says that the returned string should be concise but informative
representation. Providing a good `toString` method makes testing / debugging easier.
Ideally, we want to see all of the interesting information included in the
object as long as that space is reasonable in scope.

Whether or not you document the returned value, you will be looking at
tradeoffs. Either way you should document the choice you've made so consumers
know whether or not the behavior may shift over time.

Provide accessors for anything that's shown in the `toString` method so that
developers don't need to parse the output.


## 13: Override `clone` judiciously

`Cloneable` does not implement the `clone` method. That belongs to the base
object and cannot be modified without reflection. "In practice, a class
implementing `Cloneable` is expected to provide a properly functioning public
`clone` method." Call super's clone and cast it to an object of the right type.

Immutable classes do not need a clone method. You may need to call it
recursively on an element array to prevent the possibility of inflicting harm on
the original objects. Cloneable does not work with `final`.

## 14: Consider implementing `Comparable`

`compareTo` comes from the `Comparable` interface. Sorting uses `compareTo`.
`compareTo` returns negative integer, zero, or positive if the object is less
than, equal to, or greater than the specified object. No need to implement this
behavior to compare classes of different types (you can throw
`ClassCastException`).

Avoid the use of `>` or `<` operators and prefer using the static `compare`
method on boxed primitive classes.

# Chapter 4: Classes and Interfaces

## 15: Minimize the accessibility of classes and members

Hide implementation details in classes. It decouples components and allows them
to be tested and developed in isolation. "Make each class or member as
inaccessible as possible."

Package private means it can only be accessed within the package. Public means
it's part of the exported API and should maintain its contract with API
consumers.

In terms of increasing accessibility: `private`, `package-private`, `protected`,
`public`. Protected members must be supported forever and should not be set
lightly. Private -> package-private is okay to facilitate testing if done
judiciously. Go no further.
