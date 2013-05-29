package mEScriptEngine;

import java.util.*;
import sun.org.mozilla.javascript.internal.*;

final class RhinoClassShutter implements ClassShutter {

   private static Map protectedClasses;
   private static RhinoClassShutter theInstance;


   static synchronized ClassShutter getInstance() {
      if(theInstance == null) {
         theInstance = new RhinoClassShutter();
         protectedClasses = new HashMap();
         protectedClasses.put("java.security.AccessController", Boolean.TRUE);
      }

      return theInstance;
   }

   public boolean visibleToScripts(String var1) {
      SecurityManager var2 = System.getSecurityManager();
      if(var2 != null) {
         int var3 = var1.lastIndexOf(".");
         if(var3 != -1) {
            try {
               var2.checkPackageAccess(var1.substring(0, var3));
            } catch (SecurityException var5) {
               return false;
            }
         }
      }

      return protectedClasses.get(var1) == null;
   }
}
