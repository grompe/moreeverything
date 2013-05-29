package mEScriptEngine;

import java.lang.reflect.*;
import sun.org.mozilla.javascript.internal.*;
import sun.security.util.*;

final class RhinoWrapFactory extends WrapFactory {

   private static class RhinoJavaObject extends NativeJavaObject
   {
      RhinoJavaObject(Scriptable var1, Object var2, Class var3)
      {
         super(var1, (Object)null, var3);
         this.javaObject = var2;
      }
   }

   private static RhinoWrapFactory theInstance;

   static synchronized WrapFactory getInstance() {
      if(theInstance == null) {
         theInstance = new RhinoWrapFactory();
      }

      return theInstance;
   }

   public Scriptable wrapAsJavaObject(Context var1, Scriptable var2, Object var3, Class var4) {
      SecurityManager var5 = System.getSecurityManager();
      if(var3 instanceof ClassLoader) {
         if(var5 != null) {
            var5.checkPermission(SecurityConstants.GET_CLASSLOADER_PERMISSION);
         }

         return super.wrapAsJavaObject(var1, var2, var3, var4);
      } else {
         String var7 = null;
         if(var3 instanceof Class) {
            var7 = ((Class)var3).getName();
         } else if(var3 instanceof Member) {
            Member var8 = (Member)var3;
            if(var5 != null && !Modifier.isPublic(var8.getModifiers())) {
               return null;
            }

            var7 = var8.getDeclaringClass().getName();
         }

         if(var7 != null) {
            return super.wrapAsJavaObject(var1, var2, var3, var4);
         } else {
            Class var10 = var3.getClass();
            String var11 = var10.getName();
            return super.wrapAsJavaObject(var1, var2, var3, var4);
         }
      }
   }

}
