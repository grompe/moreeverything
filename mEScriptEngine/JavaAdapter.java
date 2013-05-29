package mEScriptEngine;

import javax.script.*;
import sun.org.mozilla.javascript.internal.*;

final class JavaAdapter extends ScriptableObject implements Function {

   private Invocable engine;


   private JavaAdapter(Invocable var1) {
      this.engine = var1;
   }

   static void init(Context var0, Scriptable var1, boolean var2) throws RhinoException {
      RhinoTopLevel var3 = (RhinoTopLevel)var1;
      RhinoScriptEngine var4 = var3.getScriptEngine();
      JavaAdapter var5 = new JavaAdapter(var4);
      var5.setParentScope(var1);
      var5.setPrototype(getFunctionPrototype(var1));
      ScriptableObject.putProperty(var3, "JavaAdapter", var5);
   }

   public String getClassName() {
      return "JavaAdapter";
   }

   public Object call(Context var1, Scriptable var2, Scriptable var3, Object[] var4) throws RhinoException {
      return this.construct(var1, var2, var4);
   }

   public Scriptable construct(Context var1, Scriptable var2, Object[] var3) throws RhinoException {
      if(var3.length == 2) {
         Class var4 = null;
         Object var5 = var3[0];
         if(var5 instanceof Wrapper) {
            Object var6 = ((Wrapper)var5).unwrap();
            if(var6 instanceof Class && ((Class)var6).isInterface()) {
               var4 = (Class)var6;
            }
         } else if(var5 instanceof Class && ((Class)var5).isInterface()) {
            var4 = (Class)var5;
         }

         if(var4 == null) {
            throw Context.reportRuntimeError("JavaAdapter: first arg should be interface Class");
         } else {
            Scriptable var7 = ScriptableObject.getTopLevelScope(var2);
            return Context.toObject(this.engine.getInterface(var3[1], var4), var7);
         }
      } else {
         throw Context.reportRuntimeError("JavaAdapter requires two arguments");
      }
   }
}
