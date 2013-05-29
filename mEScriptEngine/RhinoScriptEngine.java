package mEScriptEngine;

import java.io.*;
import java.util.*;
import javax.script.*;
import java.lang.reflect.*;
import sun.org.mozilla.javascript.internal.*;
import com.sun.script.util.InterfaceImplementor;

public final class RhinoScriptEngine extends AbstractScriptEngine implements Invocable, Compilable
{
   private static final boolean DEBUG = false;
   private RhinoTopLevel topLevel;
   private Map indexedProps;
   private InterfaceImplementor implementor;

   public RhinoScriptEngine()
   {
      Context var1 = enterContext();
      try
      {
         this.topLevel = new RhinoTopLevel(var1, this);
      } finally {
         Context.exit();
      }
      this.indexedProps = new HashMap();
      this.implementor = new InterfaceImplementor(this)
      {
         protected Object convertResult(Method method, Object obj) throws ScriptException
         {
            Class class1 = method.getReturnType();
            if(class1 == Void.TYPE) return null;
            else return Context.jsToJava(obj, class1);
         }
      };
   }

   public Object eval(Reader var1, ScriptContext var2) throws ScriptException
   {
      Context var4 = enterContext();

      Object var3;
      try
      {
         Scriptable var5 = this.getRuntimeScope(var2);
         String var14 = (String)this.get("javax.script.filename");
         var14 = var14 == null?"<Unknown source>":var14;
         var3 = var4.evaluateReader(var5, var1, var14, 1, (Object)null);
      }
      catch (RhinoException var11)
      {
         int var6 = (var6 = var11.lineNumber()) == 0?-1:var6;
         throw new ScriptException(var11.toString(), var11.sourceName(), var6);
      }
      catch (IOException var12)
      {
         throw new ScriptException(var12);
      }
      finally
      {
         Context.exit();
      }

      return this.unwrapReturnValue(var3);
   }

   public Object eval(String var1, ScriptContext var2) throws ScriptException
   {
      if(var1 == null)
      {
         throw new NullPointerException("null script");
      } else {
         return this.eval((Reader)(new StringReader(var1)), var2);
      }
   }

   public Bindings createBindings()
   {
      return new SimpleBindings();
   }

   public Object invokeFunction(String var1, Object ... var2) throws ScriptException, NoSuchMethodException
   {
      return this.invoke((Object)null, var1, var2);
   }

   public Object invokeMethod(Object var1, String var2, Object ... var3) throws ScriptException, NoSuchMethodException
   {
      if(var1 == null)
      {
         throw new IllegalArgumentException("script object can not be null");
      } else {
         return this.invoke(var1, var2, var3);
      }
   }

   private Object invoke(Object var1, String var2, Object ... var3) throws ScriptException, NoSuchMethodException
   {
      Context var4 = enterContext();

      Object var11;
      try
      {
         if(var2 == null)
         {
            throw new NullPointerException("method name is null");
         }

         if(var1 != null && !(var1 instanceof Scriptable))
         {
            var1 = Context.toObject(var1, this.topLevel);
         }

         Scriptable var5 = this.getRuntimeScope(this.context);
         Scriptable var17 = var1 != null?(Scriptable)var1:var5;
         Object var7 = ScriptableObject.getProperty(var17, var2);
         if(!(var7 instanceof Function))
         {
            throw new NoSuchMethodException("no such method: " + var2);
         }

         Function var8 = (Function)var7;
         Scriptable var9 = var8.getParentScope();
         if(var9 == null)
         {
            var9 = var5;
         }

         Object var10 = var8.call(var4, var9, var17, this.wrapArguments(var3));
         var11 = this.unwrapReturnValue(var10);
      }
      catch (RhinoException var15)
      {
         int var6 = (var6 = var15.lineNumber()) == 0?-1:var6;
         throw new ScriptException(var15.toString(), var15.sourceName(), var6);
      }
      finally
      {
         Context.exit();
      }

      return var11;
   }

   public Object getInterface(Class var1)
   {
      try
      {
         return this.implementor.getInterface((Object)null, var1);
      }
      catch (ScriptException var3)
      {
         return null;
      }
   }

   public Object getInterface(Object var1, Class var2)
   {
      if(var1 == null)
      {
         throw new IllegalArgumentException("script object can not be null");
      } else {
         try
         {
            return this.implementor.getInterface(var1, var2);
         }
         catch (ScriptException var4)
         {
            return null;
         }
      }
   }

   Scriptable getRuntimeScope(ScriptContext var1)
   {
      if(var1 == null)
      {
         throw new NullPointerException("null script context");
      } else {
         ExternalScriptable var2 = new ExternalScriptable(var1, this.indexedProps);
         var2.setPrototype(this.topLevel);
         return var2;
      }
   }

   public CompiledScript compile(String var1) throws ScriptException
   {
      return this.compile((Reader)(new StringReader(var1)));
   }

   public CompiledScript compile(Reader var1) throws ScriptException
   {
      RhinoCompiledScript var2 = null;
      Context var3 = enterContext();

      try
      {
         String var4 = (String)this.get("javax.script.filename");
         if(var4 == null)
         {
            var4 = "<Unknown Source>";
         }

         Scriptable var5 = this.getRuntimeScope(this.context);
         Script var6 = var3.compileReader(var5, var1, var4, 1, (Object)null);
         var2 = new RhinoCompiledScript(this, var6);
      }
      catch (Exception var10)
      {
         throw new ScriptException(var10);
      }
      finally
      {
         Context.exit();
      }

      return var2;
   }

   static Context enterContext()
   {
      return Context.enter();
   }

   Object[] wrapArguments(Object[] var1)
   {
      if(var1 == null)
      {
         return Context.emptyArgs;
      } else {
         Object[] var2 = new Object[var1.length];

         for(int var3 = 0; var3 < var2.length; ++var3)
         {
            var2[var3] = Context.javaToJS(var1[var3], this.topLevel);
         }

         return var2;
      }
   }

   Object unwrapReturnValue(Object var1)
   {
      if(var1 instanceof Wrapper)
      {
         var1 = ((Wrapper)var1).unwrap();
      }

      return var1 instanceof Undefined?null:var1;
   }

   public ScriptEngineFactory getFactory()
   {
      return null; // Shut up!
   }

   static
   {
      ContextFactory.initGlobal(new ContextFactory()
      {
         protected Context makeContext()
         {
            Context context = super.makeContext();
            context.setWrapFactory(RhinoWrapFactory.getInstance());
            return context;
         }

         public boolean hasFeature(Context context, int i)
         {
            if(i == 6) return false;
            else return super.hasFeature(context, i);
         }
      });
   }
}
