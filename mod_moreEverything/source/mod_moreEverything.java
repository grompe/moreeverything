// Made by Grom PE, public domain
// Contact site: http://grompe.org.ru/
// Contact XMPP/email: i@grompe.org.ru
import java.io.*;
import java.util.*;
import java.lang.reflect.*;
import java.util.regex.*;
import javax.script.*;

public class mod_moreEverything extends BaseMod
{
    public static final String VERSION_TEXT = "25 May 2013, build 228";
    public static final int WILDCARD = 32767;
    protected static Map<Integer,Integer> fuelMap = new HashMap<Integer,Integer>();
    protected static File configDir;
    protected static boolean standalone = false;
    protected static boolean loaded = false;
    protected static ScriptEngine engine;

    public static void log(String s)
    {
        System.out.println("[mod_moreEverything] "+s);
    }

    private static File getConfigDir()
    {
        if (standalone) return new File("config");
        try
        {
            Class noparams[] = {};
            Class<?> cls = Class.forName("net.minecraft.client.Minecraft");
            Method meth;
            try
            {
                meth = cls.getMethod("func_71380_b", noparams);
            }
            catch(NoSuchMethodException e)
            {
                log("func_71380_b not found, using b");
                meth = cls.getMethod("b", noparams);
            }
            return new File((File)meth.invoke(null), "config");
        }
        catch(ClassNotFoundException e)
        {
            log("Client not found, using current directory (server)");
        }
        catch(NoSuchMethodException e)
        {
            log("b not found, using current directory");
        }
        catch(IllegalAccessException e)
        {
            log("IllegalAccessException, using current directory");
        }
        catch(InvocationTargetException e)
        {
            log("InvocationTargetException, using current directory");
        }
        return new File("config");
    }
    
    public static class ScriptHandler
    {
        private static String buffer = null;

        // Get file contents in the buffer
        public static boolean __getFile(String filename)
        {
            if (buffer != null) buffer = null;
            try
            {
                File f = new File(configDir, filename);
                char[] buf = new char[(int)f.length()]; // No way someone's using gigabyte config file
                FileReader r = new FileReader(f);
                r.read(buf);
                r.close();
                buffer = new String(buf);
                return true;
            }
            catch(FileNotFoundException e)
            {
                //log(String.format("File %s not found, ignoring.", filename));
            }
            catch(IOException e)
            {
                log(String.format("Error while reading %s, ignoring.", filename));
            }
            return false;
        }

        // Search regexp against the buffer
        public static String __findMatch(String regex)
        {
            if (buffer == null)
            {
                log("Attempt to find a match with no file open.");
                return null;
            }
            if (regex.charAt(0) == '/') regex = regex.substring(1, regex.length()-1);
            Pattern pat = Pattern.compile(regex);
            Matcher mat = pat.matcher(buffer);
            if (!mat.find()) return null;
            return mat.group(1);
        }

        public static void __include(String str)
        {
            File file = new File(configDir, str);
            if (!file.exists())
            {
                if (hasResource(str))
                {
                    extractFromJar(str, configDir);
                    log(String.format("Including '%s' (extracted from jar)", str));
                } else {
                    log(String.format("Error: unable to find '%s' to include", str));
                    return;
                }
            } else {
                log(String.format("Including '%s'", str));
            }
            execConfigFile(file);
        }

        public static void __includeInternal(String str)
        {
            log(String.format("Including '%s' inside jar", str));
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

        public static Class __getClass(String s) throws Exception
        {
            return Class.forName(s);
        }

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
    }

    public static void execResource(String str)
    {
        InputStream s = mod_moreEverything.class.getResourceAsStream(str);
        if (s == null)
        {
            log(String.format("Error: unable to find '%s' to include", str));
            return;
        }
        execStream(new InputStreamReader(s), str);
    }
    
    public static void execStream(Reader reader, String name)
    {
        engine.put(ScriptEngine.FILENAME, name);
        try
        {
            engine.eval(reader);
        }
        catch(ScriptException e)
        {
            log("!SE! "+e.toString());
        }
    }

    public static void execConfigFile(File file)
    {
        try
        {
            FileReader reader = new FileReader(file);
            execStream(reader, file.toString());
            reader.close();
        }
        catch(FileNotFoundException e)
        {
            log(String.format("File %s not found, ignoring.", file.toString()));
        }
        catch(IOException e)
        {
            log("Error while reading the configuration file.");
        }
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
            log(String.format("Error: unable to extract %s.", name));
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
        configDir = getConfigDir();
        File file = new File(configDir, "mod_moreEverything.js");
        if(!file.exists()) extractDefaultConfig();

        engine = (new ScriptEngineManager()).getEngineByName("JavaScript");
        engine.put("__api", new ScriptHandler());
        // Forge moves ModLoader class during deobfuscation process, so have to save it
        engine.put("__modLoader", ModLoader.class);
        execResource("moreEverything/core.js");
        execConfigFile(file);
        Invocable inv = (Invocable) engine;
        engine.put(ScriptEngine.FILENAME, "moreEverything/core.js");
        try
        {
            inv.invokeFunction("doneLoadingEvent");
        }
        catch(ScriptException e)
        {
            log("!SE! "+e.toString());
        }
        catch(NoSuchMethodException e)
        {
            log("doneLoadingEvent() is missing from the script, did you mess it up?");
        }
        engine.put(ScriptEngine.FILENAME, null);
        loaded = true;
    }

    public int addFuel(int id, int damage)
    {
        return ScriptHandler.__getBurnTime(id, damage);
    }

    public String getVersion()
    {
        return VERSION_TEXT;
    }

    // Yay for old Minecraft support!
    public void ModsLoaded()
    {
        if (!loaded) load();
    }

    public int addFuel(int id)
    {
        return ScriptHandler.__getBurnTime(id, WILDCARD);
    }

    public int AddFuel(int id)
    {
        return ScriptHandler.__getBurnTime(id, WILDCARD);
    }

    public String Version()
    {
        return VERSION_TEXT;
    }

    public static void main(String[] args)
    {
        mod_moreEverything me = new mod_moreEverything();
        me.standalone = true;
        me.load();
    }
}
