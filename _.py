import time
import re
import sys
import os

VERSION_PATTERN = 'VERSION_TEXT = ".*build (\d+)"'

def increaseBuildVersion():
  def upd(matchobj):
    newbuild = int(matchobj.group(1))+1
    today = time.strftime("%d %b %Y")
    print "build %d is cooking..."%(newbuild)
    return 'VERSION_TEXT = "%s, build %d"'%(today, newbuild)

  newdata = re.sub(VERSION_PATTERN, upd, data)

  f = open("mod_moreEverything/source/mod_moreEverything.java", "w")
  f.write(newdata)
  f.close()

  global buildnumber
  buildnumber += 1

def compileAndPack():
  increaseBuildVersion()
  errcode = os.system("javac -source 1.6 -target 1.6 -bootclasspath c:/things/jre6u26/lib/rt.jar -d mod_moreEverything/ -Xlint:unchecked -cp deps_modloader/*;deps_common/* mod_moreEverything/source/*.java")
  if errcode == 0:
    pack()
    print "=========\nComplete!"

def pack():
  zipfile = "mod_moreEverything.%d.zip"%(buildnumber)
  os.system("pushd mod_moreEverything & kzip /y /r ../%s * >nul & popd"%(zipfile))
  os.system("copy %s mod_moreEverything.latest.zip /y >nul"%(zipfile))
  print "Wrote %s"%(zipfile)

if __name__ == "__main__":
  f = open("mod_moreEverything/source/mod_moreEverything.java", "r")
  data = f.read()
  f.close()

  buildnumber = int(re.search(VERSION_PATTERN, data).group(1));

  if len(sys.argv) < 2:
    print "Usage: _ compile | pack"
    exit()
  if sys.argv[1] == "compile":
    compileAndPack()
  elif sys.argv[1] == "pack":
    pack()
