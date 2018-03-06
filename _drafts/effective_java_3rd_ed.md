# 1: Static factory methods

1. Allows you to instantiate without necessarily creating an object
2. Arguments shape how the object is created
3. Generally can be indicated as to what you want to do by selecting good args
   to indicate purpose.

# 2: Builders for many params

Bad alternatives are to do a telescoping constructor, where you have
a constructor per set of possible args, and / or "JavaBeans" style, where you
call methods for each attribute setter.

Kwarg-like behavior can be achieved using builders. The builder is a thing that
returns itself and can be chained together. Pretty interesting approach.

Useful for hierarchical builds.

# 3: Enforce the singleton property with a private constructor or enum type

Private constructor can be done by using the `final` type. It's useful because
it shows that it should be the terminus of the class.

Single element enum is often the best way to implement a singleton.


# 4: Enforce noninstantiability with a private constructor


