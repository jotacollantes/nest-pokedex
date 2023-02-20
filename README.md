<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>


# Ejecutar en Desarrollo

1. Clonar el repo
2. Ejecutar:
```
yarn
```
3. Tener Nest CLI instalado
```
yarn global add @nestjs/cli
```
4. Levantar la base de datos (archivo de configuracion ./docker-compose.yaml)
```
docker-compose up -d
```
5. Clonar el archivo __.env.template__ y renombrar a __.env__

6. llenar lar variables de entorno en el ```.env```

7. Ejecutar la aplicacion con:
```
yarn start:dev
```

8. Reconstruir base de datos
```
http://localhost:3000/api/v2/seed
```

# Stack Usado
NestJS

MongoDB

# Notas
Heroku redeploy sin cambios:
```
git commit --allow-empty -m "Trigger Heroki deploy"
git push heroku main
```
