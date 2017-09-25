# Chat Privado con nodejs y SQLServer

Aplicación con nodejs para un chat privado de persona a persona con conexión a sql server


## Configuración


* Para que la aplicacion funcione correctamente deben tener sql server 2008 instalado o superior (Incluye la version express gratuita de Microsoft)


* Se debe crear la siguinte tabla:

```SQL
CREATE TABLE [dbo].[Chat](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[UsuarioEmisor] [varchar](100) NULL,
	[UsuarioReceptor] [varchar](100) NULL,
	[Mensaje] [text] NULL,
	[FechaHora] [datetime] NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

```

* Se debe crear el siguiente procedimiento almacenado:

```SQL
CREATE PROCEDURE [dbo].[spIns_Chat_RegistraChat]
	@UsuarioEmisor VARCHAR(100),
    @UsuarioReceptor VARCHAR(100),
    @Mensaje TEXT
AS
BEGIN

	INSERT INTO [dbo].[Chat]
           ([UsuarioEmisor]
           ,[UsuarioReceptor]
           ,[Mensaje]
           ,[FechaHora])
     VALUES
           (@UsuarioEmisor,
           @UsuarioReceptor,
           @Mensaje,
           GETDATE())

END
```

* Finalmente para correr la aplicacion ejecutar:

```javascript
npm install

node main.js
```

## Probando la aplicación

Se debe ingresar al sitio web

[http://localhost:8080/?usuario=NombreQueUsaras](http://localhost:8080/?usuario=NombreQueUsaras)
