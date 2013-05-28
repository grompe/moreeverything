import time
import sys
import os

def increaseBuildVersion():
  global buildnumber
  buildnumber += 1

  f = open("mod_moreEverything.java", "rb")
  data = f.read()
  f.close()

  newdata = data.replace("@version@", "%s, build %d"%(time.strftime("%d %b %Y"), buildnumber))

  f = open("buildnumber", "wb")
  f.write(str(buildnumber))
  f.close()

  f = open("mod_moreEverything/source/mod_moreEverything.java", "wb")
  f.write(newdata)
  f.close()

def compileAndPack():
  os.system(r"copy *.java mod_moreEverything\source\ /y >nul")
  increaseBuildVersion()
  errcode = os.system("javac -source 1.6 -target 1.6 -bootclasspath c:/things/jre6u26/lib/rt.jar -d mod_moreEverything/ -Xlint:unchecked -cp deps_modloader/*;deps_common/* mod_moreEverything/source/*.java")
  if errcode == 0:
    pack()
    print "=========\nComplete!"

def pack():
  zipfile = "mod_moreEverything.%d.zip"%(buildnumber)
  os.system("pushd mod_moreEverything & kzip /y /r ../%s * >nul & popd"%(zipfile))
  print "Wrote %s"%(zipfile)

if __name__ == "__main__":
  if len(sys.argv) < 2:
    print "Usage: _ compile | pack"
    exit()

  f = open("buildnumber", "rb")
  buildnumber = int(f.read())
  f.close()

  if sys.argv[1] == "compile":
    compileAndPack()
  elif sys.argv[1] == "pack":
    pack()
