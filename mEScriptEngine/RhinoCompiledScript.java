package mEScriptEngine;

import javax.script.*;
import sun.org.mozilla.javascript.internal.*;

final class RhinoCompiledScript extends CompiledScript {

   private RhinoScriptEngine engine;
   private Script script;


   RhinoCompiledScript(RhinoScriptEngine var1, Script var2) {
      this.engine = var1;
      this.script = var2;
   }

   public Object eval(ScriptContext var1) throws ScriptException {
      Object var2 = null;
      Context var3 = RhinoScriptEngine.enterContext();

      try {
         Scriptable var4 = this.engine.getRuntimeScope(var1);
         Object var5 = this.script.exec(var3, var4);
         var2 = this.engine.unwrapReturnValue(var5);
      } catch (Exception var9) {
         throw new ScriptException(var9);
      } finally {
         Context.exit();
      }

      return var2;
   }

   public ScriptEngine getEngine() {
      return this.engine;
   }
}
