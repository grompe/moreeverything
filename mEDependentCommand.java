
import javax.script.*;
import org.mozilla.javascript.*;

// Temporary class till I find how to hook CommandBase
public class mEDependentCommand extends z
{
    public String c()
    {
        return "eval";
    }
    public String c(ad ad)
    {
        return "commands.eval.usage";
    }
    public void b(ad caller, String[] args)
    {
        if (args.length == 0)
        {
            caller.a(cu.e("\u00a7cUsage: /eval <JavaScript code>"));
            return;
        }
        StringBuilder sb = new StringBuilder();
        sb.append(args[0]);
        for (int i = 1; i < args.length; i++) sb.append(" ").append(args[i]);
        String command = sb.toString();
        try
        {
            String result = (String)mod_moreEverything.execString("''+eval('"+command.replaceAll("'", "\\\\'")+"')", null);
            caller.a(cu.e("\u00a77>>> "+command+"\u00a7r\n"+result));
            //inv.invokeFunction("evalCommandEvent", caller, command));
        }
        catch(RhinoException e)
        {
            String msg = mod_moreEverything.getScriptStacktrace(e);
            // Convert tabs and CRLF for Minecraft chat display
            msg = msg.replace("\t", "    ").replace("\r\n", "\n");
            caller.a(cu.e("\u00a77>>> "+command+"\u00a7c\n"+msg));
        }
    }
    public int compareTo(Object obj)
    {
        return a((ab)obj);
    }
}
