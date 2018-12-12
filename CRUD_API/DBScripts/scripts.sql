USE [WebApiCSharp]
GO

/****** Object:  Table [dbo].[Personas]    Script Date: 12-12-2018 9:32:11 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Personas](
	[id] [bigint] NOT NULL,
	[nombres] [varchar](50) NOT NULL,
	[apellidoMaterno] [varchar](50) NULL,
	[apellidoPaterno] [varchar](50) NOT NULL,
	[fechaNacimiento] [date] NOT NULL,
	[email] [varchar](50) NULL,
 CONSTRAINT [PK_Personas] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO


