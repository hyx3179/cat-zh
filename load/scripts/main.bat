@echo off &TITLE è�������߱������нű� by hyx3179

:main
cls
if {%1}=={install} goto install
if {%1}=={start} goto start
if {%1}=={updrade} goto updrade
echo è�������߱������нű� by hyx3179
echo=
echo main Options
echo=
echo      start        �������ط�����
echo      install      ��װ�����������������
echo      updrade      ������Ϸ����Ҫgit������ûд��
echo      autostart    ��������������ûд��
echo=
pause
exit

:install
if not exist %~dp0..\tmp mkdir %~dp0..\tmp
if not exist %~dp0..\tmp\node.7z PowerShell Invoke-WebRequest ^
    -uri https://nodejs.org/dist/latest-gallium/node-v16.14.0-win-x64.7z -OutFile %~dp0..\tmp\node.7z
if not exist %~dp0..\tmp\yarn.tgz PowerShell Invoke-WebRequest ^
    -uri https://registry.yarnpkg.com/yarn/-/yarn-1.22.17.tgz#bf910747d22497b573131f7341c0e1d15c74036c -OutFile %~dp0..\tmp\yarn.tgz
if not exist %~dp0..\node\node.exe %~dp0..\7z\7za.exe e %~dp0..\tmp\node.7z node-v16.14.0-win-x64\node.exe -o%~dp0..\node
if not exist %~dp0..\tmp\yarn.tar %~dp0..\7z\7za.exe x %~dp0..\tmp\yarn.tgz -o%~dp0..\tmp
if not exist %~dp0..\node\yarn-v1.22.17\bin\yarn.js %~dp0..\7z\7za.exe x %~dp0..\tmp\yarn.tar -o%~dp0..\node
cd /d %~dp0..\..
%~dp0..\node\node.exe %~dp0..\node\yarn-v1.22.17\bin\yarn.js install
echo ��װ��� ��� start ��ݷ�ʽ����
pause
exit

:start
cd /d %~dp0..
%~dp0..\node\node.exe %~dp0..\node\yarn-v1.22.17\bin\yarn.js start