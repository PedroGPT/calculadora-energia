@echo off
echo Ejecutando actualización de precios desde Excel...

REM Ejecutar el script de Node.js
node actualizarPrecios.js

REM Añadir los cambios al staging de Git
git add .

REM Hacer commit con mensaje automático
git commit -m "Actualizar precios desde Excel" || echo No hay cambios para commitear

REM Hacer push a GitHub
git push

REM Lanzar workflow de GitHub Actions para redeploy en Vercel
gh workflow run actualizar-precios.yml

pause
