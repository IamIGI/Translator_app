@echo off

rem Get the current date in YYYY.MM.DD format
for /f "tokens=2 delims==" %%I in ('"wmic OS Get localdatetime /value"') do set datetime=%%I
set date=%datetime:~0,4%.%datetime:~4,2%.%datetime:~6,2%

rem Change directory to the 'deploy' submodule
cd deploy

rem Remove all existing files in the submodule (if any)
git rm -r *

rem Copy the build files to the submodule directory
xcopy /E /I /H /Y ..\public\* .\

rem Add changes to the submodule
git add .

rem Commit the changes with a dynamic message
git commit -m "Project deployed to Hostinger - %date%"

rem Push the changes to the deployment repository
git push origin main

rem Return to the root project directory
cd ..
