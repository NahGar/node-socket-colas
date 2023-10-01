--Para sacar archivo de git 
git rm .env --cached
git commit -m "Stopped tracking .env File"

--Reset
git fetch origin
git reset --hard origin/main

--Inicializar
git remote add origin https://github.com/NahGar/xxx.git
git branch -M main
git push -u origin main