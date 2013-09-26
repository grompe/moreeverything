// Made by Grom PE, public domain
// Contact site: http://grompe.org.ru/
// Contact XMPP/email: i@grompe.org.ru
import java.io.*;
import java.util.*;
import java.lang.reflect.*;
import java.util.regex.*;
import javax.script.*;
import org.mozilla.javascript.*;

public class mod_moreEverything extends BaseMod
{
    public static final String VERSION_TEXT = "@version@";
    public static final int WILDCARD = 32767;
    protected static Map<Integer,Integer> fuelMap = new HashMap<Integer,Integer>();
    protected static File configDir;
    protected static boolean standalone = false;
    protected static boolean loaded = false;
    protected static Scriptable scope;
    protected static int warnings = 0;
    protected static int errors = 0;

    public static void log(String s)
    {
        System.out.println("[mod_moreEverything] "+s);
    }

    public static void log(String s, Object... fmt)
    {
        log(String.format(s, fmt));
    }

    private static File getConfigDir()
    {
        if (standalone) return new File("config");
        try
        {
            Class<?> cls = Class.forName("net.minecraft.client.Minecraft");
            Method meth;
            try
            {
                meth = cls.getMethod("func_71380_b", (Class<?>[])null);
            }
            catch(NoSuchMethodException e)
            {
                log("func_71380_b() not found, using b().");
                meth = cls.getMethod("b", (Class<?>[])null);
            }
            return new File((File)meth.invoke(null), "config");
        }
        catch(ClassNotFoundException e)
        {
            try
            {
                Class<?> cls = Class.forName("net.minecraft.client.main.Main");
                log("Have Minecraft 1.6+, trying to get its working directory from the command line.");
                String cmd = System.getProperty("sun.java.command");
                if (cmd != null)
                {
                    Pattern p = Pattern.compile("-workDir ((?:\"[^\"]+\")|(?:'[^']+')|(?:[^ ]+))");
                    Matcher m = p.matcher(cmd);
                    if (m.find())
                    {
                        String workDir = m.group(1);
                        if ((workDir.charAt(0) == '"') || (workDir.charAt(0) == '\''))
                        {
                            workDir = workDir.substring(1, workDir.length()-1);
                        }
                        return new File(workDir, "config");
                    } else {
                        System.out.println("Couldn't get workDir, using current directory.");
                    }
                } else {
                    System.out.println("Couldn't get command line arguments, using current directory.");
                }
            }
            catch(ClassNotFoundException e2)
            {
                log("Client not found, using current directory (server).");
            }
        }
        catch(NoSuchMethodException e)
        {
            log("b() not found, using current directory.");
        }
        catch(IllegalAccessException e)
        {
            log("IllegalAccessException, using current directory.");
        }
        catch(InvocationTargetException e)
        {
            log("InvocationTargetException, using current directory.");
        }
        return new File("config");
    }
    
    public static class ScriptHandler
    {
        public static String __getConfigDir()
        {
            return configDir.toString();
        }

        public static void __include(String str) throws RhinoException
        {
            File file = new File(configDir, str);
            if (!file.exists())
            {
                if (hasResource(str))
                {
                    extractFromJar(str, configDir);
                    log("Including '%s' (extracted from jar)", str);
                } else {
                    log("Error: unable to find '%s' to include", str);
                    return;
                }
            } else {
                log("Including '%s'", str);
            }
            execConfigFile(file);
        }

        public static void __includeInternal(String str) throws RhinoException, IOException
        {
            log("Including '%s' inside jar", str);
            execResource(str);
        }

        // if running without Minecraft
        public static boolean __isStandalone()
        {
            return standalone;
        }

        public static void __addFuel(int id, int damage, int burnTime)
        {
            if (damage == -1) damage = WILDCARD;
            // As itemIDs and damage values are in range 1-32767, 
            // can pack them in a single integer value
            fuelMap.put(id + damage << 16, burnTime);
        }

        public static int __getBurnTime(int id, int damage)
        {
            int index = id + damage << 16;
            if (fuelMap.containsKey(index)) return fuelMap.get(index);
            index = id + WILDCARD << 16;
            if (fuelMap.containsKey(index)) return fuelMap.get(index);
            return 0;
        }

        // Java 6 doesn't like to provide these deep-code-digging functions
        // to JavaScript, so have to provide it with the following few helpers

        public static Method __getMethod(Class<?> c, String name, Class... paramtypes) throws Exception
        {
           return c.getMethod(name, paramtypes);
        }

        public static Object __newInstance(Constructor c, Object... initargs) throws Exception
        {
           return c.newInstance(initargs);
        }

        public static Constructor<?> __getConstructor(Class<?> c, Class... paramtypes) throws Exception
        {
           return c.getConstructor(paramtypes);
        }

        public static String __getMethodName(Method meth)
        {
            return meth.getName();
        }

        public static Class[] __getParameterTypes(Method meth)
        {
            return meth.getParameterTypes();
        }

        public static Class __getReturnType(Method meth)
        {
            return meth.getReturnType();
        }

        public static Object __invoke(Method meth, Object o, Object... args) throws Exception
        {
            return meth.invoke(o, args);
        }

        public static Object __invokeStatic(Method meth, Object... args) throws Exception
        {
            return meth.invoke(null, args);
        }

        // Various utility functions

        public static Object __unwrap(Object o)
        {
            return o;
        }
        
        public static void __testException() throws Exception
        {
            throw new IllegalArgumentException("O_O");
        }

        public static int __incWarnings(int amount)
        {
            return warnings += amount;
        }

        public static int __incErrors(int amount)
        {
            return errors += amount;
        }
    
    }

    public static void logRhinoException(RhinoException ex)
    {
        log("!SE! " + getScriptStacktrace(ex));
    }

    public static String getScriptStacktrace(RhinoException ex)
    {
        errors += 1;
        /*
        CharArrayWriter ca = new CharArrayWriter();
        ex.printStackTrace(new PrintWriter(ca));
        String boring = "sun\\.org\\.mozilla\\.javascript\\.internal\\.";
        return ca.toString().replaceAll("\tat "+boring+"[^\n]+\n", "").replaceFirst(boring, "");
        //*/
        return ex.details() + "\n" + ex.getScriptStackTrace();
    }

    public static Object execResource(String str) throws RhinoException, IOException
    {
        InputStream s = mod_moreEverything.class.getResourceAsStream(str);
        /*
        if (s == null)
        {
            log("Error: unable to find '%s' to include", str);
            return null;
        }
        */
        return execStream(new InputStreamReader(s), str);
    }
    
    public static Object execStream(Reader reader, String name) throws RhinoException, IOException
    {
        Object result = null;
        Context ctx = Context.enter();
        try
        {
            result = ctx.evaluateReader(scope, reader, name, 1, null);
        }
        finally
        {
            Context.exit();
        }
        return result;
    }

    public static Object execString(String code, String name) throws RhinoException
    {
        Object result = null;
        Context ctx = Context.enter();
        try
        {
            result = ctx.evaluateString(scope, code, name, 1, null);
        }
        finally
        {
            Context.exit();
        }
        return result;
    }

    public static Object execConfigFile(File file) throws RhinoException
    {
        Object result = null;
        try
        {
            InputStreamReader reader = new InputStreamReader(new FileInputStream(file), "UTF-8");
            result = execStream(reader, file.toString());
            reader.close();
        }
        catch(FileNotFoundException e)
        {
            log("File %s not found, ignoring.", file.toString());
        }
        catch(IOException e)
        {
            log("Error while reading the configuration file.");
        }
        return result;
    }

    public static boolean hasResource(String name)
    {
        InputStream s = mod_moreEverything.class.getResourceAsStream(name);
        if (s == null) return false;
        try
        {
            s.close();
        }
        catch(IOException e){}
        return true;
    }
    
    public static void extractFromJar(String name, File outdir)
    {
        try
        {
            InputStream s = mod_moreEverything.class.getResourceAsStream(name);
            BufferedReader br = new BufferedReader(new InputStreamReader(s));
            File f = new File(outdir, name);
            File pf = f.getParentFile();
            if (pf != null) pf.mkdirs();
            FileOutputStream fos = new FileOutputStream(f);
            byte[] buffer = new byte[8192];
            int bytesRead;
            while ((bytesRead = s.read(buffer)) != -1) fos.write(buffer, 0, bytesRead);
            fos.close();
            br.close();
            s.close();
        }
        catch(IOException e)
        {
            log("Error: unable to extract %s.", name);
            log(e.toString());
        }
    }

    private static void extractDefaultConfig()
    {
        log("Extracting default configuration file.");
        configDir.mkdir();
        extractFromJar("mod_moreEverything.js", configDir);
    }

    public void load()
    {
    }

    // Need to load after all other mods...
    public void modsLoaded()
    {
        configDir = getConfigDir();
        File file = new File(configDir, "mod_moreEverything.js");
        if(!file.exists()) extractDefaultConfig();

        Context ctx = Context.enter();
        try
        {
            scope = ctx.initStandardObjects();
            scope.put("__api", scope, this);
            execResource("moreEverything/core.js");
            execConfigFile(file);
        }
        catch(RhinoException e)
        {
            logRhinoException(e);
        }
        catch(IOException e)
        {
            e.printStackTrace();
        }
        finally
        {
            Context.exit();
        }
        /*
        engine.put(ScriptEngine.FILENAME, "moreEverything/core.js");
        try
        {
            engine.invokeFunction("doneLoadingEvent");
        }
        catch(RhinoException e)
        {
            logRhinoException(e);
        }
        catch(NoSuchMethodException e)
        {
            log("doneLoadingEvent() is missing from the script, did you mess it up?");
        }
        */
        loaded = true;
        log("Script load complete. "+warnings+" warnings, "+errors+" errors.");
    }

    public int addFuel(int id, int damage)
    {
        return ScriptHandler.__getBurnTime(id, WILDCARD);
        //return __getBurnTime(id, WILDCARD);
    }

    public String getVersion()
    {
        return VERSION_TEXT;
    }

    // Yay for old Minecraft support!
    public void ModsLoaded()
    {
        if (!loaded) modsLoaded();
    }

    public int addFuel(int id)
    {
        return ScriptHandler.__getBurnTime(id, WILDCARD);
        //return __getBurnTime(id, WILDCARD);
    }

    public int AddFuel(int id)
    {
        return ScriptHandler.__getBurnTime(id, WILDCARD);
        //return __getBurnTime(id, WILDCARD);
    }

    public String Version()
    {
        return VERSION_TEXT;
    }

    public static void main(String[] args)
    {
        mod_moreEverything me = new mod_moreEverything();
        me.standalone = true;
        me.modsLoaded();
    }
}
