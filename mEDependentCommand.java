
import javax.script.*;
import sun.org.mozilla.javascript.internal.*;
import mEScriptEngine.*;

// Temporary class till I find how to hook CommandBase
public class mEDependentCommand extends x
{
    public String c()
    {
        return "eval";
    }
    public void b(ab caller, String[] args)
    {
        if (args.length == 0)
        {
            caller.a("\u00a7cUsage: /eval <JavaScript code>");
            return;
        }
        StringBuilder sb = new StringBuilder();
        sb.append(args[0]);
        for (int i = 1; i < args.length; i++) sb.append(" ").append(args[i]);
        String command = sb.toString();
        mod_moreEverything.engine.put(ScriptEngine.FILENAME, "chat");
        try
        {
            String result = (String)mod_moreEverything.engine.eval("''+eval('"+command.replaceAll("'", "\\\\'")+"')");
            caller.a("\u00a77>>> "+command+"\u00a7r\n"+result);
            //inv.invokeFunction("evalCommandEvent", caller, command));
        }
        catch(RhinoException e)
        {
            String msg = mod_moreEverything.getScriptStacktrace(e);
            // Leave only the interesting part of the message
            msg = msg.substring(0, msg.indexOf("\tat mEScriptEngine.")-2).replace("\t", "    ").replace("\r\n", "\n");
            caller.a("\u00a77>>> "+command+"\u00a7c\n"+msg);
        }
    }
    public int compareTo(Object obj)
    {
        return a((z)obj);
    }
}