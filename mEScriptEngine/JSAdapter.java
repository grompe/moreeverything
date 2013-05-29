package mEScriptEngine;

import sun.org.mozilla.javascript.internal.*;

public final class JSAdapter implements Scriptable, Function {

   private Scriptable prototype;
   private Scriptable parent;
   private Scriptable adaptee;
   private boolean isPrototype;
   private static final String GET_PROP = "__get__";
   private static final String HAS_PROP = "__has__";
   private static final String PUT_PROP = "__put__";
   private static final String DEL_PROP = "__delete__";
   private static final String GET_PROPIDS = "__getIds__";


   private JSAdapter(Scriptable var1) {
      this.setAdaptee(var1);
   }

   public static void init(Context var0, Scriptable var1, boolean var2) throws RhinoException {
      JSAdapter var3 = new JSAdapter(var0.newObject(var1));
      var3.setParentScope(var1);
      var3.setPrototype(getFunctionPrototype(var1));
      var3.isPrototype = true;
      ScriptableObject.defineProperty(var1, "JSAdapter", var3, 2);
   }

   public String getClassName() {
      return "JSAdapter";
   }

   public Object get(String var1, Scriptable var2) {
      Function var3 = this.getAdapteeFunction("__get__");
      if(var3 != null) {
         return this.call(var3, new Object[]{var1});
      } else {
         var2 = this.getAdaptee();
         return var2.get(var1, var2);
      }
   }

   public Object get(int var1, Scriptable var2) {
      Function var3 = this.getAdapteeFunction("__get__");
      if(var3 != null) {
         return this.call(var3, new Object[]{new Integer(var1)});
      } else {
         var2 = this.getAdaptee();
         return var2.get(var1, var2);
      }
   }

   public boolean has(String var1, Scriptable var2) {
      Function var3 = this.getAdapteeFunction("__has__");
      if(var3 != null) {
         Object var4 = this.call(var3, new Object[]{var1});
         return Context.toBoolean(var4);
      } else {
         var2 = this.getAdaptee();
         return var2.has(var1, var2);
      }
   }

   public boolean has(int var1, Scriptable var2) {
      Function var3 = this.getAdapteeFunction("__has__");
      if(var3 != null) {
         Object var4 = this.call(var3, new Object[]{new Integer(var1)});
         return Context.toBoolean(var4);
      } else {
         var2 = this.getAdaptee();
         return var2.has(var1, var2);
      }
   }

   public void put(String var1, Scriptable var2, Object var3) {
      if(var2 == this) {
         Function var4 = this.getAdapteeFunction("__put__");
         if(var4 != null) {
            this.call(var4, new Object[]{var1, var3});
         } else {
            var2 = this.getAdaptee();
            var2.put(var1, var2, var3);
         }
      } else {
         var2.put(var1, var2, var3);
      }

   }

   public void put(int var1, Scriptable var2, Object var3) {
      if(var2 == this) {
         Function var4 = this.getAdapteeFunction("__put__");
         if(var4 != null) {
            this.call(var4, new Object[]{new Integer(var1), var3});
         } else {
            var2 = this.getAdaptee();
            var2.put(var1, var2, var3);
         }
      } else {
         var2.put(var1, var2, var3);
      }

   }

   public void delete(String var1) {
      Function var2 = this.getAdapteeFunction("__delete__");
      if(var2 != null) {
         this.call(var2, new Object[]{var1});
      } else {
         this.getAdaptee().delete(var1);
      }

   }

   public void delete(int var1) {
      Function var2 = this.getAdapteeFunction("__delete__");
      if(var2 != null) {
         this.call(var2, new Object[]{new Integer(var1)});
      } else {
         this.getAdaptee().delete(var1);
      }

   }

   public Scriptable getPrototype() {
      return this.prototype;
   }

   public void setPrototype(Scriptable var1) {
      this.prototype = var1;
   }

   public Scriptable getParentScope() {
      return this.parent;
   }

   public void setParentScope(Scriptable var1) {
      this.parent = var1;
   }

   public Object[] getIds() {
      Function var1 = this.getAdapteeFunction("__getIds__");
      if(var1 == null) {
         return this.getAdaptee().getIds();
      } else {
         Object var2 = this.call(var1, new Object[0]);
         Object[] var4;
         if(var2 instanceof NativeArray) {
            NativeArray var7 = (NativeArray)var2;
            var4 = new Object[(int)var7.getLength()];

            for(int var8 = 0; var8 < var4.length; ++var8) {
               var4[var8] = this.mapToId(var7.get(var8, var7));
            }

            return var4;
         } else if(!(var2 instanceof NativeJavaArray)) {
            return Context.emptyArgs;
         } else {
            Object var3 = ((NativeJavaArray)var2).unwrap();
            if(var3.getClass() == Object[].class) {
               Object[] var5 = (Object[])((Object[])var3);
               var4 = new Object[var5.length];

               for(int var6 = 0; var6 < var5.length; ++var6) {
                  var4[var6] = this.mapToId(var5[var6]);
               }
            } else {
               var4 = Context.emptyArgs;
            }

            return var4;
         }
      }
   }

   public boolean hasInstance(Scriptable var1) {
      if(var1 instanceof JSAdapter) {
         return true;
      } else {
         for(Scriptable var2 = var1.getPrototype(); var2 != null; var2 = var2.getPrototype()) {
            if(var2.equals(this)) {
               return true;
            }
         }

         return false;
      }
   }

   public Object getDefaultValue(Class var1) {
      return this.getAdaptee().getDefaultValue(var1);
   }

   public Object call(Context var1, Scriptable var2, Scriptable var3, Object[] var4) throws RhinoException {
      if(this.isPrototype) {
         return this.construct(var1, var2, var4);
      } else {
         Scriptable var5 = this.getAdaptee();
         if(var5 instanceof Function) {
            return ((Function)var5).call(var1, var2, var5, var4);
         } else {
            throw Context.reportRuntimeError("TypeError: not a function");
         }
      }
   }

   public Scriptable construct(Context var1, Scriptable var2, Object[] var3) throws RhinoException {
      Scriptable var4;
      if(this.isPrototype) {
         var4 = ScriptableObject.getTopLevelScope(var2);
         if(var3.length > 0) {
            JSAdapter var5 = new JSAdapter(Context.toObject(var3[0], var4));
            return var5;
         } else {
            throw Context.reportRuntimeError("JSAdapter requires adaptee");
         }
      } else {
         var4 = this.getAdaptee();
         if(var4 instanceof Function) {
            return ((Function)var4).construct(var1, var2, var3);
         } else {
            throw Context.reportRuntimeError("TypeError: not a constructor");
         }
      }
   }

   public Scriptable getAdaptee() {
      return this.adaptee;
   }

   public void setAdaptee(Scriptable var1) {
      if(var1 == null) {
         throw new NullPointerException("adaptee can not be null");
      } else {
         this.adaptee = var1;
      }
   }

   private Object mapToId(Object var1) {
      return var1 instanceof Double?new Integer(((Double)var1).intValue()):Context.toString(var1);
   }

   private static Scriptable getFunctionPrototype(Scriptable var0) {
      return ScriptableObject.getFunctionPrototype(var0);
   }

   private Function getAdapteeFunction(String var1) {
      Object var2 = ScriptableObject.getProperty(this.getAdaptee(), var1);
      return var2 instanceof Function?(Function)var2:null;
   }

   private Object call(Function var1, Object[] var2) {
      Context var3 = Context.getCurrentContext();
      Scriptable var4 = this.getAdaptee();
      Scriptable var5 = var1.getParentScope();

      try {
         return var1.call(var3, var5, var4, var2);
      } catch (RhinoException var7) {
         throw Context.reportRuntimeError(var7.getMessage());
      }
   }
}
